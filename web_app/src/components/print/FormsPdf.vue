<template>
    <div v-if="dataReady">
        <b-card id="print-btn" class="bg-light"> 
            <b-button  @click="print()">Print</b-button>
        </b-card>

        <div v-if="form24">
            <form24h-layout  v-for="(value, inx) in ['DRIVER COPY','POLICE COPY','SEND TO ICBC']" v-bind:key="inx" :copyType="value"  />      
        </div>
        <div v-if="form12">
            <form12h-layout  v-for="(value, inx) in ['DRIVER COPY','POLICE COPY','SEND TO ICBC']"  v-bind:key="inx" :copyType="value"  />
        </div>
        <div v-if="formVI">
            <form-vi-layout  v-for="(value, inx) in ['DRIVER COPY', 'DRIVER INFO', 'ILO COPY', 'POLICE/SUPERINTENDENT COPY', 'SUPERINTENDENT/POLICE COPY']"  v-bind:key="inx" :copyType="value"  />
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Form24hLayout from "./layoutsForm24h/Form24hLayout.vue"
import Form12hLayout from "./layoutsForm12h/Form12hLayout.vue"
import FormViLayout from "./layoutsFormVI/FormViLayout.vue"

import {tellApiFormIsPrinted} from "@/utils/forms"

import { namespace } from "vuex-class";
import "@/store/modules/common";
const commonState = namespace("Common");

import { currentlyEditingFormObjectInfoType } from '@/types/Common';


@Component({
    components:{       
        Form24hLayout,
        Form12hLayout,
        FormViLayout
    }
})
export default class FormsPdf extends Vue {

    @commonState.State
    public currently_editing_form_object: currentlyEditingFormObjectInfoType;
    
    dataReady=false;
    form12=false;
    form24=false;
    formVI=false;

    mounted(){
        this.dataReady=false;       
        const formType = this.currently_editing_form_object.form_type
        this.form12=(formType=="12Hour");
        this.form24=(formType=="24Hour");
        this.formVI=(formType=="VI");
        this.dataReady=true;
    }

    print(){
        const payload = {form_type:"VI", form_id:"22100070"}
        const el= document.getElementsByName("print");
        if(el.length>0){
            const html= el.length==1? el[0].innerHTML : (el[0].innerHTML+el[1].innerHTML)
            const pdfhtml = Vue.filter('printPdf')(html, payload.form_type)
            this.$store.commit("addHtmlToForm",{payload:payload, html:pdfhtml})
            // console.log(pdfhtml)
            tellApiFormIsPrinted(payload)
        }
        
        window.print()
    }
// <script>

// import Form24hLayout from "./layouts/Form24hLayout.vue"

// export default {
//   name: "Form24",
//   components: {     
//     Form24hLayout
//   }
// }
}
</script>


<style type="text/css">




@media print {

    #roadsafety-header {
        display: none;
    }
    #debug-component {
        display: none;
    }
    #not-authenticated-banner {
        display: none;
    }

    #print-btn{
        display: none;
    }

    #app{
        margin:0;
        padding:0;
    }

    #router-container{
        margin:0;
        padding:0;
    }

}

</style>

