<template>
    <div v-if="dataReady">        
        <div class="row lineheight0-25" style="font-size:11pt; margin:0.75rem 0 0 0;   line-height:1rem;"><b>2) Reasonable Grounds</b></div>
        <div style="text-align:justify; font-size:9pt; line-height:0.85rem; margin:0 1rem 0 1.5rem; ">
            Was a prescribed Approved Screening Device (ASD), Approved Instrument
            or prescribed physical coordination test used to form reasonable grounds
            to believe that the driver’s ability to drive a motor vehicle was affected by
            alcohol or a drug?           
        </div>
       
        
        <div class="row margin-top-0" style="font-size:9pt; margin:0.4rem 0 0 0;">
            <table class="border-0 border-dark text-left" style="width:100%; line-height:0.5rem;">
                
                <tr style="height:0.01rem; line-height:0.01rem;">
                    <td v-for="inx in Array(100)" :key="inx" class="border-0 border-dark" style="width:1%;" />                                                                                
                </tr>

<!-- <YES-NO> -->
                <tr style="height:0.5rem;  line-height:1rem;">
                    <td class="" style="" colspan="3"></td>                 
                    <td class="" style="" colspan="5">
                        <check-box
                            shiftBox="20px,-2px"
                            shiftmark="0px,-1px"                                   
                            checkColor="#2134AB"
                            boxSize="1.25em" 
                            :check="true"
                            checkFontSize="16pt"
                            text="" />
                    </td>
                    <td class="" style="" colspan="7">Yes</td>
                    <td class="" style="" colspan="5">
                        <check-box
                            shiftBox="20px,-2px"
                            shiftmark="0px,-1px"                                   
                            checkColor="#2134AB"
                            boxSize="1.25em" 
                            :check="true"
                            checkFontSize="16pt"
                            text="" />
                    </td>
                    <td class="" style="" colspan="25">No</td>
                    <td class="" style="" colspan="29"> </td>                                               
                </tr>

                <tr style="height:1.5rem;  line-height:1.5rem;">
                     <td class="" style="" colspan="4"></td>
                    <td class="" style="" colspan="96">
                        If yes, which test was administered?
                    </td>
                </tr>

<!-- <ALCO> -->
                <tr style="height:0.5rem;  line-height:1rem;">
                    <td class="" style="" colspan="3"></td>                 
                    <td class="" style="" colspan="5">
                        <check-box
                            shiftBox="20px,-2px"
                            shiftmark="0px,-1px"                                   
                            checkColor="#2134AB"
                            boxSize="1.25em" 
                            :check="true"
                            checkFontSize="16pt"
                            text="" />
                    </td>
                    <td class="" style="" colspan="30">Alco-Sensor FST</td>
                    
                    <td class="" style="" colspan="22">ASD Expiry Date</td>
                    <td class="" style="border-bottom:1px solid black;" colspan="40"></td>
                                            
                </tr>
<!-- <APPROVED INSTRUMENT> -->
                <tr style="height:0.5rem;  line-height:1rem;">
                    <td class="" style="" colspan="3"></td>                 
                    <td class="" style="" colspan="5">
                        <check-box
                            shiftBox="20px,-2px"
                            shiftmark="0px,-1px"                                   
                            checkColor="#2134AB"
                            boxSize="1.25em" 
                            :check="true"
                            checkFontSize="16pt"
                            text="" />
                    </td>
                    <td class="" style="" colspan="37">Approved Instrument (specify)</td>
                    <td class="" style="border-bottom:1px solid black;" colspan="55"></td>                                            
                </tr>
<!-- <PRESCRIBED> -->
                <tr style="height:0.5rem;  line-height:1rem;">
                    <td class="" style="" colspan="3"></td>                 
                    <td class="" style="" colspan="5">
                        <check-box
                            shiftBox="20px,-2px"
                            shiftmark="0px,-1px"                                   
                            checkColor="#2134AB"
                            boxSize="1.25em" 
                            :check="true"
                            checkFontSize="16pt"
                            text="" />
                    </td>
                    <td class="" style="" colspan="92">Prescribed Physical Coordination Test</td>
                </tr>

<!-- <Time of test> -->                
                <tr style="height:0.5rem;  line-height:0.8rem;"><td></td></tr>
                <tr style="height:0.85rem;  line-height:0.8rem;">
                    <td class="" style="" colspan="4"></td>                                     
                    <td class="" style="" colspan="16">Time of Test</td>
                    <td class="" style="border-bottom:1px solid black;" colspan="20"></td> 
                    <td class="" style="" colspan="60"></td>                                          
                </tr>
                <tr style="height:0.25rem;  line-height:0.8rem;"></tr>
  <!-- <Result: Alcohol> -->                 
                <tr style="height:0.5rem;  line-height:1.2rem;">
                    <td class="" style="" colspan="4"></td>                                     
                    <th class="" style="text-decoration:underline" colspan="26">Result: Alcohol</th>
                </tr>              
                <tr style="height:0.5rem;  line-height:1rem; border-top:0px solid;">
                    <td class="" style="" colspan="3"></td>                 
                    <td class="" style="" colspan="5">
                        <check-box
                            shiftBox="20px,-2px"
                            shiftmark="0px,-1px"                                   
                            checkColor="#2134AB"
                            boxSize="1.25em" 
                            :check="true"
                            checkFontSize="16pt"
                            text="" />
                    </td>
                    <td class="" style="" colspan="20">51–99 mg%</td>
                    <td class="" style="" colspan="5">
                        <check-box
                            shiftBox="20px,-2px"
                            shiftmark="0px,-1px"                                   
                            checkColor="#2134AB"
                            boxSize="1.25em" 
                            :check="true"
                            checkFontSize="16pt"
                            text="" />
                    </td>
                    <td class="" style="" colspan="20">Over 99 mg%</td>
                    <td class="" style="" colspan="5">
                        <check-box
                            shiftBox="20px,-2px"
                            shiftmark="0px,-1px"                                   
                            checkColor="#2134AB"
                            boxSize="1.25em" 
                            :check="true"
                            checkFontSize="16pt"
                            text="" />
                    </td>
                    <td class="" style="" colspan="7">BAC</td>
                    <td class="" style="border-bottom:1px solid black;" colspan="35"></td>
                </tr>

<!-- <Result: Drug> -->                 
                <tr style="height:0.5rem;  line-height:1.2rem;">
                    <td class="" style="" colspan="4"></td>                                     
                    <th class="" style="text-decoration:underline" colspan="26">Result: Drug</th>
                </tr>              
                <tr style="height:0.5rem;  line-height:1rem; border-top:0px solid;">
                    <td class="" style="" colspan="3"></td>                 
                    <td class="" style="" colspan="5">
                        <check-box
                            shiftBox="20px,-2px"
                            shiftmark="0px,-1px"                                   
                            checkColor="#2134AB"
                            boxSize="1.25em" 
                            :check="true"
                            checkFontSize="16pt"
                            text="" />
                    </td>
                    <td class="" style="" colspan="92">Ability to drive affected by a drug</td>
                </tr>

                
            </table>
        </div>
    </div>           
</template>     
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


import CheckBox from "./pdfUtil/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class FormOfficerReport2 extends Vue {

    // @Prop({required:true})
    // result!: form20DataInfoType;

    dataReady = false;
    driver=['D','R','I','V','E','R']

    mounted(){
        this.dataReady = false;
        // this.extractInfo();
        this.dataReady = true;
    }

    // public extractInfo(){

    //     if (this.result.withdrawingLawyerName == 'Other'){
    //         this.lawyerName = this.result.withdrawingLawyerNameOther;
    //     } else {
    //         this.lawyerName = this.result.withdrawingLawyerName;
    //     }

    //     const index = this.result.objectingParties.indexOf('Other')

    //     if (index != -1){

    //         const partiesList = this.result.objectingParties.splice(index, 1);
    //         partiesList.push(this.result.objectingPartiesOther);
    //         this.parties = partiesList.join(', ');

    //     } else {
    //         this.parties = this.result.objectingParties.join(', ');
    //     }     
           
    // }

    
}

</script>

<style scoped>

.answer {
    color: rgb(3, 19, 165);
    font-size: 7pt;
    font-weight: 600;
}

.lineheight0-25{
    line-height:0.25rem !important;
}
.lineheight0-50{
    line-height:0.5rem !important;
}
.lineheight0-75{
    line-height:0.75rem !important;
}

.margin-top-0{
    margin-top: 0rem !important;
}

</style>