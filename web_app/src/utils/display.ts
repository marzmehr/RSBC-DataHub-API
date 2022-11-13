import {rsiStore} from "@/store/store.js"
import {getFormTypeCount} from "@/utils/forms"


export function allResourcesLoaded(){
    let status = true;
    for (const key in rsiStore.state.loaded) {
        if ( ! rsiStore.state.loaded[key]) {
            status = false
        }
    }
    return status;
}


export function isUserHasAtLeastOneFormId(){
    
    const form_types = getFormTypeCount();
    for (const row in form_types) {
            if (form_types[row] > 0) {
                return true
            }
        }
    return false
}


export function isDisplayUserNotAuthorizedBanner(){
    return rsiStore.getters.isUserAuthenticated && rsiStore.state.isUserAuthorized === false && rsiStore.state.keycloak.ready;
}

export function isDisplayIssueProhibitions(){
    return allResourcesLoaded  && (rsiStore.state.isUserAuthorized || isUserHasAtLeastOneFormId());
}

export function isDisplayFeedbackBanner(){
    return rsiStore.state.isUserAuthorized;
}

export function isDisplayNotLoggedInBanner(){
    return ! rsiStore.getters.isUserAuthenticated && rsiStore.state.isOnline && isUserHasAtLeastOneFormId();
}

// export function isDisplaySearchRecentProhibition(){
//     return rsiStore.state.isUserAuthorized;
// }

export function isDisplayWelcomeLoginCard(){
    return ! isUserHasAtLeastOneFormId() && ! rsiStore.getters.isUserAuthenticated && rsiStore.state.keycloak.ready;
}