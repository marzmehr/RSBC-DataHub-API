import logging
import requests
from datetime import datetime
from flask import make_response
import base64
from python.prohibition_web_svc.config import Config


def get_icbc_api_authorization_header(**kwargs) -> tuple:
    username = kwargs.get('username')
    try:
        encoded_bytes = base64.b64encode("{}:{}".format(Config.ICBC_API_USERNAME, Config.ICBC_API_PASSWORD).encode('utf-8'))
        kwargs['icbc_header'] = {
            "Authorization": 'Basic {}'.format(str(encoded_bytes, "utf-8")),
            "loginUserId": username
        }
    except Exception as e:
        logging.warning("error creating ICBC authorization header")
        return False, kwargs
    return True, kwargs


def get_icbc_driver(**kwargs) -> tuple:
    url = "{}/drivers/{}".format(Config.ICBC_API_ROOT, kwargs.get('dl_number'))
    try:
        icbc_response = requests.get(url, headers=kwargs.get('icbc_header'))
        kwargs['response'] = make_response(icbc_response.json(), icbc_response.status_code)
    except Exception as e:
        return False, kwargs
    return True, kwargs


def get_icbc_vehicle(**kwargs) -> tuple:
    url = "{}/vehicles".format(Config.ICBC_API_ROOT)
    url_parameters = {
        "plateNumber": kwargs.get('plate_number'),
        # TODO - removed effectiveDate for debugging purposes
        # "effectiveDate": datetime.now().astimezone().replace(microsecond=0).isoformat()
    }
    try:
        icbc_response = requests.get(url, headers=kwargs.get('icbc_header'), params=url_parameters)
        logging.warning("icbc url:" + icbc_response.url)
        kwargs['response'] = make_response(icbc_response.json(), icbc_response.status_code)
    except Exception as e:
        return False, kwargs
    return True, kwargs


def splunk_get_driver(**kwargs) -> tuple:
    kwargs['splunk_data'] = {
        "event": "icbc_get_driver",
        "username": kwargs.get('username'),
        "user_guid": kwargs.get('user_guid'),
        "queried_bcdl": kwargs.get("dl_number")
    }
    return True, kwargs


def splunk_get_vehicle(**kwargs) -> tuple:
    kwargs['splunk_data'] = {
        "event": "icbc_get_vehicle",
        "username": kwargs.get('username'),
        "user_guid": kwargs.get('user_guid'),
        "queried_plate": kwargs.get('plate_number')
    }
    return True, kwargs


def get_icbc_payload(**kwargs) -> tuple:
    base64_encode_pdf_string = 'abc'
    kwargs['icbc_payload'] = create_icbc_payload(kwargs['payload']['data'],kwargs['payload']['form_id'], base64_encode_pdf_string)
    return True, kwargs


def create_icbc_payload(data, form_id, base64_encode_pdf_string) -> dict:

    payload = {
        "dlNumber":'',
        "dlJurisdiction": data['drivers_licence_jurisdiction']['objectCd'],
        "lastName": data['last_name'],
        "firstName": '',
        "birthdate": '',
        "plateJurisdiction": '',
        "plateNumber": '',
        "pujCode": '',
        "nscNumber": '',
        "section": "215.2",
        "violationLocation": data['offence_city']['objectCd'].upper(),
        "noticeNumber": "VA" + form_id[2:8],
        "violationDate": data['prohibition_start_date'],
        "violationTime": data['prohibition_start_time'],
        "officerDetachment": data['agency'],        
        "officerNumber": data['province']['objectCd']+ data['badge_number'],
        "officerName": data['officer_name'],
        "pdf": base64_encode_pdf_string,        
    }

    if 'drivers_number' in data: payload["dlNumber"]=data['drivers_number']
    if 'dob' in data: payload["birthdate"]=data['dob']    
    if 'first_name' in data: payload["firstName"]=data['first_name']
    if 'plate_province' in data: payload["plateJurisdiction"]=data['plate_province']['objectCd']    
    if 'plate_number' in data: payload["plateNumber"]=data['plate_number']    
    if 'puj_code' in data: payload["pujCode"]=data['puj_code']['objectCd']    
    if 'nsc_number' in data: payload["nscNumber"]=data['nsc_number']
    
    return {"icbc_submission":payload, "event_type":"icbc_submission", "event_version":"1.5"}
