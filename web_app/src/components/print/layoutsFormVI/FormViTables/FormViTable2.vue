<template>
    <div v-if="dataReady">

        <div class="row outer_table_class" style="font-size:6pt; margin:0.25rem 0 0 0; padding:0rem;">

            <table class="text-left" style="border:2px solid #151515; width:100%; line-height:0.5rem;">
                
                <tr style="height:0.01rem; line-height:0.01rem;">                    
                    <td v-for="inx in Array(100)" :key="inx" class="border-0" style="width:1% !important;" />                                                                                   
                </tr>
<!-- <ROW1> -->
                <tr class="spacer-high" style="color:#FFF; height:0.15rem;  line-height:0.15rem;"><td colspan="100">.</td></tr>
                <tr style="height:0.05rem;  line-height:0.05rem; border-top:0px solid;">
                    <td class="side-name" style="font-size:8pt; transform:rotate(-90deg) translate(-36px,-5px)" colspan="5"><b>OWNER</b></td>                                                                                                
                    <td colspan="95" />
                </tr>                
                <tr style="height:1rem;  line-height:1rem; border-top:0px solid;">                  
                    <td class="" style="" colspan="4" />
                    <td class="" style="" colspan="2">
                        <check-box
                            shiftBox="16px,-3px"
                            shiftmark="-1px,-4px"                                   
                            checkColor="#2134AB"
                            boxSize="1.5em" 
                            :check="formData.driverIsOwner"
                            checkFontSize="15pt"
                            text="" />
                    </td>
                    <td class="" style="" colspan="30">THE DRIVER IS THE REGISTERED OWNER</td>
                    
                    <td class="" style="" colspan="64" />                                                           
                </tr>
                <tr style="color:#FFF; height:0.15rem; line-height:0.25rem;"><td colspan="100">.</td></tr>
                <tr style="height:0.5rem;  line-height:0.5rem; border-top:0px solid;">                    
                    <td class="" style="" colspan="4" />
                    <td class="" style="" colspan="73">REGISTERED OWNER(S) SURNAME(S), GIVEN NAME(S) (OR OTHER ENTITY NAME)</td> 
                    <td class="" style="" colspan="1" />
                    <td class="" style="" colspan="21">BIRTH DATE (YYYY/MM/DD)</td>
                    <td class="" style="" colspan="1" />                                                            
                </tr>
                <tr class="spacer-low" style="color:#FFF; height:0.15rem; line-height:0.15rem;"><td colspan="100"></td></tr>
                <tr style="height:1.9rem;  line-height:1rem; border-top:0px solid;">                    
                    <td class="" style="" colspan="4" />
                    <td class="answer2" style="border:1px solid #656565;" colspan="73">{{formData.fullName}}</td>
                    <td class="" style="" colspan="1" />                    
                    <td class="answer2" style="border:1px solid #656565;" colspan="21">{{formData.dob}}</td>
                    <td class="" style="" colspan="1" />                                                       
                </tr>
                <tr style="color:#FFF; height:0.5rem; line-height:0.25rem;"><td colspan="100">.</td></tr>

            </table>
        </div>
    </div>           
</template>     
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/vi";
const viState = namespace("VI");

import { viFormJsonInfoType } from '@/types/Forms/VI';

import CheckBox from "../../pdfUtil/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class FormViTable2 extends Vue {

    @viState.State
    public viInfo: viFormJsonInfoType;   

    dataReady = false;

    formData;

    mounted(){
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;
    }

    public extractInfo(){

        const viForm = this.viInfo.data;

        this.formData = {            
            fullName:'',
            dob: '',
            driverIsOwner: false            
        }

        if (viForm.ownerOrganization){
            this.formData.fullName = viForm.ownerOrganizationName?viForm.ownerOrganizationName.toUpperCase():'';
            this.formData.dob = '';
            this.formData.driverIsOwner = false;
        } else {
            const surName = viForm.ownerLastName?viForm.ownerLastName.toUpperCase():'';
            const givenName = viForm.ownerFirstName?viForm.ownerFirstName.toUpperCase():'';
            this.formData.fullName = surName + ', ' + givenName;
            this.formData.dob = viForm.ownerDob?Vue.filter('format-date-slash')(viForm.ownerDob):'';
            this.formData.driverIsOwner = viForm.driverIsOwner;
        }        
    }
    
}

</script>

<style scoped>

.answer2 {
    color: rgb(3, 19, 165);
    font-size: 10pt;
    font-weight: 600;
    padding-left:0.25rem;
}


.side-name{
    transform:rotate(-90deg) translate(-34px,-5px) !important;
}

.spacer-low{
    line-height:0.05rem !important;
    font-size: 1pt !important;
    height: 0.01rem !important;
}

.spacer-high{
    line-height:0.15rem !important;
    font-size: 1pt !important;
    height: 0.15rem !important;
}

.outer_table_class{
    margin: 0.5rem 0 0 0 !important;
    padding: 0 0.2rem !important;
}

</style>