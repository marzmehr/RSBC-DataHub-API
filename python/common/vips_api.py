import requests
import logging
import json
import uuid
import python.common.prohibitions as pro
from datetime import datetime, timedelta
from iso8601 import parse_date
from unicodedata import normalize
from python.common.config import Config
import base64

logging.basicConfig(level=Config.LOG_LEVEL)


def get_invoice_details(prohibition_number, config) -> tuple:
    logging.info("inside get_invoice_details()")
    correlation_id = generate_correlation_id()
    is_status_success, vips_status = status_get(prohibition_number, config, correlation_id)
    # TODO - waiting on NTT to provide application_id in the status response
    # TODO - call application_get to retrieve missing data
    service_date = vips_str_to_datetime(vips_status['data']['status']['effectiveDt'])
    logging.info("current prohibition status: {}".format(json.dumps(vips_status)))
    if is_status_success:
        return True, dict({
            "amount": 00.02,
            "prohibition_period": "[Prohib. Period]",
            "service_date": service_date.strftime("%b %-d, %Y"),
            "notice_type_code": vips_status['data']['status']['noticeTypeCd'],
            "oral_or_written": "[oral / written]"
        })
    return False, dict({})


def is_application_ready_for_payment(prohibition_number, last_name, config) -> tuple:
    logging.info("inside is_application_ready_for_payment()")
    correlation_id = generate_correlation_id()
    is_status_success, vips_status = status_get(prohibition_number, config, correlation_id)
    logging.info("current prohibition status: {}".format(json.dumps(vips_status)))
    if is_last_name_match(vips_status, last_name):
        logging.info('last name matches')
        is_payment_success, vips_payment = payment_get(prohibition_number, config, correlation_id)
        logging.info('current payment status: {}'.format(json.dumps(vips_payment)))
        is_form_submitted = vips_status['data']['status']['reviewCreatedYn'] == 'Y'
        is_not_paid = vips_payment['resp'] == 'fail'
        return (is_status_success and is_payment_success), (is_form_submitted and is_not_paid)
    return is_status_success, False


def review_schedule_dates(prohibition_number, last_name, config) -> tuple:
    logging.info("inside is_application_ready_for_scheduling()")
    correlation_id = generate_correlation_id()
    is_response, vips_status = status_get(prohibition_number, config, correlation_id)
    is_status_success = is_response and 'resp' in vips_status and vips_status['resp'] == 'success'
    logging.info("current prohibition status: {}".format(json.dumps(vips_status)))
    presentation_type = ''
    if is_last_name_match(vips_status, last_name):
        if 'applicationId' in vips_status['data']['status']:
            application_id = vips_status['data']['status']['applicationId']
            is_application, application = application_get(application_id, config, correlation_id)
            logging.info("current application status: {}".format(json.dumps(application)))
            if 'data' in application:
                presentation_type = application['data']['applicationInfo']['presentationTypeCd']
        prohibition = pro.prohibition_factory(vips_status['data']['status']['noticeTypeCd'])
        service_date = vips_str_to_datetime(vips_status['data']['status']['effectiveDt'])
        return is_status_success, dict({
            "presentation_type": presentation_type,
            "is_paid": "receiptNumberTxt" in vips_status['data']['status'],
            "notice_type": vips_status['data']['status']['noticeTypeCd'],
            "max_review_date": prohibition.get_max_review_date(service_date).strftime("%Y-%m-%d"),
        })
    logging.info('prohibition not found')
    return False, dict({})


def list_of_dates_between(start: datetime, end: datetime) -> list:
    results = list()
    delta = end - start
    for i in range(delta.days + 1):
        day = start + timedelta(days=i)
        results.append(day.strftime("%Y-%m-%d"))
    return results


def status_get(prohibition_id: str, config, correlation_id: str) -> tuple:
    endpoint = build_endpoint(config.VIPS_API_ROOT_URL, prohibition_id, 'status', correlation_id)
    is_response_successful, data = get(endpoint, config.VIPS_API_USERNAME, config.VIPS_API_PASSWORD, correlation_id)
    is_success = 'resp' in data and data['resp'] == 'success'
    is_not_found = 'error' in data and data['error']['message'] == 'Record not found'
    return is_success or is_not_found, data


def disclosure_get(document_id: str, config, correlation_id: str):
    endpoint = build_endpoint(config.VIPS_API_ROOT_URL, document_id, 'disclosure', correlation_id)
    return get(endpoint, config.VIPS_API_USERNAME, config.VIPS_API_PASSWORD, correlation_id)


def payment_get(prohibition_id: str, config, correlation_id: str):
    endpoint = build_endpoint(config.VIPS_API_ROOT_URL, prohibition_id, 'payment', 'status', correlation_id)
    return get(endpoint, config.VIPS_API_USERNAME, config.VIPS_API_PASSWORD, correlation_id)


def application_get(application_id: str, config, correlation_id: str) -> tuple:
    endpoint = build_endpoint(config.VIPS_API_ROOT_URL, application_id, 'application', correlation_id)
    return get(endpoint, config.VIPS_API_USERNAME, config.VIPS_API_PASSWORD, correlation_id)


def application_create(form_type: str, prohibition_id: str, config, correlation_id: str, **args):
    endpoint = build_endpoint(config.VIPS_API_ROOT_URL, form_type, prohibition_id, 'application', correlation_id)
    payload = {
        "applicationInfo": {
            "email": args.get('email'),
            "faxNo": args.get('fax'),
            "firstGivenNm": args.get('first_name'),
            "formData": args.get('form_date'),
            "manualEntryYN": args.get('manual_entry', 'N'),
            "noticeSubjectCd": args.get('notice_subject_type', 'PERS'),
            "phoneNo": args.get('phone'),
            "presentationTypeCd": args.get('presentation_type'),
            "reviewRoleTypeCd": args.get('applicant_role'),
            "secondGivenNm": args.get('middle_name'),
            "surnameNm": args.get('last_name'),
        }
    }
    return create(endpoint, config.VIPS_API_USERNAME, config.VIPS_API_PASSWORD, payload, correlation_id)


def application_update(guid: str, config, correlation_id: str):
    endpoint = build_endpoint(config.VIPS_API_ROOT_URL, guid, 'application', correlation_id)
    return get(endpoint, config.VIPS_API_USERNAME, config.VIPS_API_PASSWORD, correlation_id)


def schedule_get(notice_type_code: str, review_date: str, config) -> tuple:
    correlation_id = generate_correlation_id()
    endpoint = build_endpoint(
        config.VIPS_API_ROOT_URL,
        notice_type_code,
        "ORAL",
        review_date,
        'review',
        'availableTimeSlot',
        correlation_id)
    logging.debug("get VIPS schedule endpoint: {}".format(endpoint))
    is_successful, data = get(endpoint, config.VIPS_API_USERNAME, config.VIPS_API_PASSWORD, correlation_id)
    if is_successful and data['resp'] == 'success':
        return True, data
    logging.warning('Cannot GET VIPS schedule: {}'.format(json.dumps(data)))
    return False, {}


def health_get(config) -> tuple:
    endpoint = build_endpoint(config.VIPS_API_ROOT_URL, 'api', 'utility', 'ping')
    return get(endpoint, config.VIPS_API_USERNAME, config.VIPS_API_PASSWORD)


def build_endpoint(*args) -> str:
    delimiter = '/'
    return delimiter.join(args)


def get(endpoint: str, user: str, password: str, correlation_id='ABC') -> tuple:
    logging.debug('vips_get_api_endpoint: {}'.format(endpoint))
    try:
        response = requests.get(endpoint, auth=(user, password))
    except AssertionError as error:
        logging.warning('no response from the VIPS API')
        return False, error

    data = response.json()
    # Note: VIPS response could be either record found or record not found
    logging.debug('VIPS API response: {} correlation_id: {}'.format(json.dumps(data), correlation_id))
    return 'resp' in data, data


def create(endpoint: str, user: str, password: str,  payload: dict, correlation_id='ABC') -> tuple:
    logging.debug('vips_api_endpoint: {}'.format(endpoint))
    try:
        response = requests.post(endpoint, json=payload, auth=(user, password))
    except AssertionError as error:
        logging.warning('no response from the VIPS API')
        return False, error

    data = response.json()
    # Note: VIPS response could be either record found or record not found
    logging.info('VIPS API response: {} correlation_id: {}'.format(json.dumps(data), correlation_id))
    return True, data


def remove_accents(input_str):
    nfkd_form = normalize('NFKD', input_str)
    only_ascii = nfkd_form.encode('ASCII', 'ignore')
    return only_ascii


def is_last_name_match(vips_response: dict, last_name: str) -> bool:
    if 'data' in vips_response:
        vips_last_name = vips_response['data']['status']['surnameNm']
        logging.debug('compare last name: {} and {}'.format(vips_last_name, last_name))
        return bool(remove_accents(vips_last_name).upper() == remove_accents(last_name).upper())
    return False


def has_been_paid(vips_payment_status: dict) -> tuple:
    is_paid = 'data' in vips_payment_status and 'transactionInfo' in vips_payment_status['data']
    valid_response = 'resp' in vips_payment_status
    return valid_response, is_paid


def vips_str_to_datetime(vips_date_time: str) -> datetime:
    """
    This utility takes a VIPS datetime string and
    converts it to a Python datetime object.
    VIPS uses a non-standard datetime format.
    Like this: 2019-01-02 17:30:00 -08:00
    """
    date_string = vips_date_time[0:10]
    time_string = vips_date_time[11:19]
    offset_hour = vips_date_time[20:23]
    offset_minute = vips_date_time[24:26]
    iso8601_string = "{}T{}{}:{}".format(date_string, time_string, offset_hour, offset_minute)
    return parse_date(iso8601_string)


def vips_str_to_friendly_time(vips_date_time: str) -> str:
    """
    This function returns a friendly time "10:00am" when
    given a VIPS date_time string
    """
    # TODO - test to make sure this works correctly
    #  over a change to / from daylight savings time
    date_time_object = vips_str_to_datetime(vips_date_time)
    return date_time_object.strftime("%-I:%M%p")


def _time_slot_to_friendly_time(time_slot: dict) -> dict:
    start_time = time_slot['reviewStartDtm']
    end_time = time_slot['reviewEndDtm']
    return {
        "label": "{} to {}".format(
            vips_str_to_friendly_time(start_time),
            vips_str_to_friendly_time(end_time)),
        "value": encode_time_slot(time_slot)
    }


def encode_time_slot(time_slot: dict) -> str:
    start_time = time_slot['reviewStartDtm']
    end_time = time_slot['reviewEndDtm']
    return bytes.decode(base64.b64encode(str.encode(start_time + "|" + end_time)))


def decode_time_slot(encode_string: str) -> dict:
    decoded_bytes = base64.b64decode(encode_string)
    start_end = bytes.decode(decoded_bytes).split("|")
    return {
        "reviewStartDtm": start_end[0],
        "reviewEndDtm": start_end[1]
    }


def schedule_to_friendly_times(time_slots: dict) -> list:
    """
    This function takes a list of timeslots as returned
    by VIPS GET schedule and returns a list of
    dictionary objects with friendly labels and base64
    encoded VIPS date time string
    {
        label: "10:00am to 11:30am"
        value: "ZGF0YSB0byBiZSBlbmNvZGVk"
    }
    """
    return list(map(_time_slot_to_friendly_time, time_slots))


def vips_datetime(date_time: datetime) -> str:
    """
    This utility takes a Python datetime object and
    converts it to a datetime string for VIPS.
    VIPS uses a non-standard datetime format.
    Like this: 2019-01-02 17:30:00 -08:00
    """
    dt_string = date_time.strftime("%Y-%m-%d %H:%M:%S %z")
    return dt_string[0:23] + ':' + dt_string[23:25]


def generate_correlation_id():
    return str(uuid.uuid4())
