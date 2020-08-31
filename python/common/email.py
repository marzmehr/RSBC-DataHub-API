from keycloak import KeycloakOpenID
from python.common.config import Config
import requests
import json
import logging
from jinja2 import Environment, PackageLoader, select_autoescape

logging.basicConfig(level=Config.LOG_LEVEL)


def application_accepted(**args):
    config = args.get('config')
    message = args.get('message')
    prohibition_number = get_prohibition_number(message)
    subject = 'Re: Driving Prohibition Review - Application Accepted  - {}'.format(prohibition_number)
    template = get_jinja2_env().get_template('application_accepted.html')
    return send_email(
        [get_email_address(message)],
        subject,
        config,
        template.render(
            full_name=get_full_name(message),
            prohibition_number=prohibition_number,
            subject=subject),
        config.COMM_SERV_API_ROOT_URL,
        get_common_services_access_token(config)), args


def send_email_to_admin(**args):
    subject = args.get('subject')
    config = args.get('config')
    message = args.get('message')
    body = args.get('body')
    template = get_jinja2_env().get_template('admin_notice.html')
    return send_email(
        [config.ADMIN_EMAIL_ADDRESS],
        subject,
        config,
        template.render(subject=subject, body=body, message=json.dumps(message)),
        config.COMM_SERV_API_ROOT_URL,
        get_common_services_access_token(config)), args


def applicant_prohibition_served_more_than_7_days_ago(**args):
    config = args.get('config')
    message = args.get('message')
    prohibition_number = get_prohibition_number(message)
    subject = 'Re: Driving Prohibition Review - 7-day Application Window Missed - {}'.format(prohibition_number)
    template = get_jinja2_env().get_template('application_not_received_in_time.html')
    return send_email(
        [get_email_address(message)],
        subject,
        config,
        template.render(
            full_name=get_full_name(message),
            prohibition_number=prohibition_number,
            subject=subject),
        config.COMM_SERV_API_ROOT_URL,
        get_common_services_access_token(config)), args


def applicant_licence_not_seized(**args):
    config = args.get('config')
    message = args.get('message')
    prohibition_number = get_prohibition_number(message)
    subject = 'Re: Driving Prohibition Review - Licence Not Returned - {}'.format(prohibition_number)
    template = get_jinja2_env().get_template('licence_not_seized.html')
    return send_email(
        [get_email_address(message)],
        subject,
        config,
        template.render(
            full_name=get_full_name(message),
            prohibition_number=prohibition_number,
            subject=subject),
        config.COMM_SERV_API_ROOT_URL,
        get_common_services_access_token(config)), args


def applicant_prohibition_not_found(**args):
    config = args.get('config')
    message = args.get('message')
    prohibition_number = get_prohibition_number(message)
    subject = 'Re: Driving Prohibition Review - Not Found - {}'.format(prohibition_number)
    template = get_jinja2_env().get_template('application_not_found.html')
    return send_email(
        [get_email_address(message)],
        subject,
        config,
        template.render(
            full_name=get_full_name(message),
            prohibition_number=prohibition_number,
            subject=subject),
        config.COMM_SERV_API_ROOT_URL,
        get_common_services_access_token(config)), args


def applicant_last_name_mismatch(**args):
    config = args.get('config')
    message = args.get('message')
    prohibition_number = get_prohibition_number(message)
    subject = "Re: Driving Prohibition Review - Prohibition Number and Name Don't Match - {}".format(prohibition_number)
    template = get_jinja2_env().get_template('last_name_mismatch.html')
    return send_email(
        [get_email_address(message)],
        subject,
        config,
        template.render(
            full_name=get_full_name(message),
            prohibition_number=prohibition_number,
            subject=subject),
        config.COMM_SERV_API_ROOT_URL,
        get_common_services_access_token(config)), args


def applicant_prohibition_not_yet_in_vips(**args):
    config = args.get('config')
    message = args.get('message')
    prohibition_number = get_prohibition_number(message)
    subject = 'Re: Driving Prohibition Review - Not Entered Yet - {}'.format(prohibition_number)
    logger = args.get('logger')
    logger.info('Re: Driving Prohibition Review - Not Yet in VIPS')
    template = get_jinja2_env().get_template('application_not_yet_in_vips.html')
    return send_email(
        [get_email_address(message)],
        subject,
        config,
        template.render(
            full_name=get_full_name(message),
            prohibition_number=prohibition_number,
            subject=subject),
        config.COMM_SERV_API_ROOT_URL,
        get_common_services_access_token(config)), args


def send_email(to: list, subject: str, config, template, api_root_url: str, token: str) -> bool:
    payload = {
        "bodyType": "html",
        "body": template,
        "from": config.REPLY_EMAIL_ADDRESS,
        "bcc": config.BCC_EMAIL_ADDRESSES.split(','),
        "encoding": "utf-8",
        "subject": subject,
        "to": to
    }
    logging.info('Sending email to: {} - {}'.format(to, subject))
    auth_header = {"Authorization": "Bearer {}".format(token)}
    try:
        response = requests.post(api_root_url + '/api/v1/email', headers=auth_header, json=payload)
    except AssertionError as error:
        logging.critical('No response from BC Common Services: {}'.format(json.dumps(error)))
        return False
    data = response.json()
    logging.debug('response from common services: {}'.format(json.dumps(data)))
    return "msgId" in data['messages'][0]


def get_common_services_access_token(config):
    # Configure Keycloak client
    keycloak_openid = KeycloakOpenID(server_url=config.COMM_SERV_AUTH_URL,
                                     client_id=config.COMM_SERV_CLIENT_ID,
                                     realm_name=config.COMM_SERV_REALM,
                                     client_secret_key=config.COMM_SERV_CLIENT_SECRET)
    # Get Token
    token = keycloak_openid.token('', '', 'client_credentials')
    return token['access_token']


def get_jinja2_env():
    return Environment(
        loader=PackageLoader('python', 'common/templates'),
        autoescape=select_autoescape(['html', 'xml'])
    )


def get_email_address(message: dict) -> str:
    event_type = message['event_type']
    return message[event_type]['form']['identification-information']['driver-email-address']


def get_full_name(message: dict) -> str:
    event_type = message['event_type']
    first_name = message[event_type]['form']['identification-information']['driver-first-name']
    last_name = message[event_type]['form']['identification-information']['driver-last-name']
    return "{} {}".format(first_name, last_name)


def get_prohibition_number(message: dict) -> str:
    event_type = message['event_type']
    return message[event_type]['form']['prohibition-information']['control-prohibition-number']