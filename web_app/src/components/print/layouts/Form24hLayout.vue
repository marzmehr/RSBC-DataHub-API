<template>
    <b-card v-if="dataReady" id="print"  bg-variant="white" class="pdf-container bg-white" no-body>
        <div style="font-size:1pt;color:#FFF;"><b>i</b></div>
            <div class="row mx-0">
                <div class="col  ml-0">                
                    <form24h-table1 />
                    <form24h-table2 />
                    <form24h-table3 />
                    <form24h-table4 />
                    <form24h-table5 />
                    <form24h-table6 />
                    <form24h-table7 />
                    <form24h-table8 :formType="formType"/>
                </div>

                <div class="col ml-0">
                    <div v-if="formType=='DRIVER COPY'">
                        <form-notice />
                    </div>
                    <div v-else>
                        <form-officer-report1 />
                        <form-officer-report2 />
                        <form-officer-report3 />
                    </div>
                </div>
            </div>

    </b-card>
</template>     
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


import CheckBox from "./pdfUtil/CheckBox.vue";
import Form24hTable1 from "./Form24Tables/Form24hTable1.vue";
import Form24hTable2 from "./Form24Tables/Form24hTable2.vue";
import Form24hTable3 from "./Form24Tables/Form24hTable3.vue";
import Form24hTable4 from "./Form24Tables/Form24hTable4.vue";
import Form24hTable5 from "./Form24Tables/Form24hTable5.vue";
import Form24hTable6 from "./Form24Tables/Form24hTable6.vue";
import Form24hTable7 from "./Form24Tables/Form24hTable7.vue";
import Form24hTable8 from "./Form24Tables/Form24hTable8.vue";

import FormNotice from "./FormNotice.vue"

import FormOfficerReport1 from "./FormOfficerReport1.vue"
import FormOfficerReport2 from "./FormOfficerReport2.vue"
import FormOfficerReport3 from "./FormOfficerReport3.vue"

@Component({
    components:{       
        CheckBox,
        Form24hTable1,
        Form24hTable2,
        Form24hTable3, 
        Form24hTable4,
        Form24hTable5,
        Form24hTable6,
        Form24hTable7,
        Form24hTable8,
        FormNotice,
        FormOfficerReport1,
        FormOfficerReport2,
        FormOfficerReport3,
    }
})
export default class Form24hLayout extends Vue {
    
    @Prop({required:true})
    formType!: string;

    dataReady = false;

    mounted(){
        this.dataReady = false;
        // this.extractInfo();
        this.dataReady = true;
    }

    // public extractInfo(){
           
    // }

    
}

</script>

<style scoped>
.answer {
    color: rgb(3, 19, 165);
    font-size: 7pt;
}

.pdf-container {
    padding: 0px !important; 
    margin-right: 0 !important;
    margin-left: 0 !important;
    width: 100% !important;
    max-width: 980px !important;
    min-width: 980px !important;
    font-size: 10pt !important;
    font-family: BCSans;
    color: #313132 !important;
    border: 0px solid;
}
</style>