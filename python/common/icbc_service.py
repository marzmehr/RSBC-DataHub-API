import requests
from requests.auth import HTTPBasicAuth
from python.common.config import Config
import time

def submit_to_icbc(**kwargs) -> tuple:
    print("___ICBC__")
    url = "{}".format(Config.ICBC_API_ROOT)
    try:
        payload = kwargs['message']['icbc_submission']
        # TODO remove for oc
        # print("___Wait")
        # time.sleep(10)
        # print("_Done_")        
        icbc_response = requests.post(url, json=payload, timeout=5, auth=HTTPBasicAuth(Config.ICBC_API_USERNAME, Config.ICBC_API_PASSWORD))
        # kwargs['response'] = make_response(icbc_response.text, icbc_response.status_code)        
        print(icbc_response.text)
        print(icbc_response.status_code)
    except Exception as e:
        return False, kwargs
    return True, kwargs
