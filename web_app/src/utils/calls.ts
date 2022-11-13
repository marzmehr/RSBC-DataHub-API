import constants from "../config/constants";
import {rsiStore} from "@/store/store.js"
import {apiHeader} from "@/utils/auth"

export async function  fetchStaticLookupTables(payload) {

    let url = ''
    if (payload.admin) {
        url = constants.API_ROOT_URL + "/api/v1/admin/" + payload.resource
    } else if (payload.static) {
        url = constants.API_ROOT_URL + "/api/v1/static/" + payload.resource
    } else {
        url = constants.API_ROOT_URL + "/api/v1/" + payload.resource
    }

    console.log("fetchStaticLookupTables()", url)

    return await new Promise((resolve, reject) => {
        fetch(url, {
        "method": 'GET',
        "headers": apiHeader()})
        .then( response => {
            return response.json()
        })
        .then( data => {
            const admin_prefix = payload.admin ? 'admin_' : ''
            rsiStore.commit("populateStaticLookupTables", { "type": admin_prefix + payload.resource, "data": data })
            resolve(data)
        })
        .catch((error) => {
            console.log("fetchStaticLookupTables network fetch failed")
            reject(error)
        })
    })

}



export function downloadLookupTables() {
    fetchStaticLookupTables({"resource": "agencies", "admin": false, "static": true})    
    .then(() => {
        rsiStore.commit("resourceLoaded", "agencies")
    })

    fetchStaticLookupTables({"resource": "impound_lot_operators", "admin": false, "static": true})
    .then(() => {
        rsiStore.commit("resourceLoaded", "impound_lot_operators")
    })

    fetchStaticLookupTables({"resource": "countries", "admin": false, "static": true})
    .then(() => {
        rsiStore.commit("resourceLoaded", "countries")
    })

    fetchStaticLookupTables({"resource": "jurisdictions", "admin": false, "static": true})
    .then(() => {
        rsiStore.commit("resourceLoaded", "jurisdictions")
    })

    fetchStaticLookupTables({"resource": "provinces", "admin": false, "static": true})
    .then(() => {
        rsiStore.commit("resourceLoaded", "provinces")
    })  

    fetchStaticLookupTables({"resource": "cities", "admin": false, "static": true})
    .then(() => {
        rsiStore.commit("resourceLoaded", "cities")
    })

    fetchStaticLookupTables({"resource": "vehicles", "admin": false, "static": true})
    .then(() => {
        rsiStore.commit("resourceLoaded", "vehicles")
    })

    fetchStaticLookupTables({"resource": "vehicle_styles", "admin": false, "static": true})
    .then(() => {
        rsiStore.commit("resourceLoaded", "vehicle_styles")
    })

    fetchStaticLookupTables({"resource": "configuration", "admin": false, "static": true})
    .then(() => {
        rsiStore.commit("resourceLoaded", "configuration")
    })

}