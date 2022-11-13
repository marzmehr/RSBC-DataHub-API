import {rsiStore} from "@/store/store.js"

export function updateRichCheckBox (payload) {
    console.log("inside updateRichCheckBox()", payload)
    if(payload.event.checked) {
        rsiStore.commit('addItemToCheckboxList', payload)
    } else {
        rsiStore.commit('removeItemFromCheckboxList', payload)
    }
}