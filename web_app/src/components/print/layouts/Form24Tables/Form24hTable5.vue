<template>
    <div v-if="dataReady">

        <div class="row margin-top-n0-40" style="font-size:7pt; margin:0.25rem 0 0 0;">

            <table class="text-left" style="width:100%; border:0px solid; line-height:0.5rem;">
                <tr style="height:0.01rem; line-height:0.01rem;">                    
                    <td v-for="inx in Array(100)" :key="inx" class="border-0 border-dark" style="width:1%;" />                                                                                   
                </tr>              
<!-- <ROW1> -->
                <tr style="height:0.25rem; line-height:0.75rem;">
                    <td class="text-center" style="font-size:9pt" colspan="100"><b>VEHICLE IMPOUNDMENT OR DISPOSITION</b></td>                                                                        
                </tr>
<!-- <CHECKBOX 1> -->
                <tr style="height:1.0rem;line-height:0.75rem;">     
                    <td style="" colspan="4">
                        <check-box
                            shiftBox="15px,-5px"
                            shiftmark="-1px,-2px"                                   
                            checkColor="#2134AB"
                            boxSize="1.3em" 
                            :check="true"
                            checkFontSize="16pt"
                            text="" />
                    </td>                    
                    <td class="" style="" colspan="30">Vehicle not impounded. Explain </td>
                    <td class="answer" style="border-bottom:1px solid black;" colspan="66">LEFT AT ROADSIDE</td>
                </tr>
                <tr style="height:0.2rem;line-height:0.25rem;"> <td></td></tr>
<!-- <CHECKBOX 2> -->
                <tr style="height:0.8rem;line-height:0.65rem;">     
                    <td class="" style="" colspan="4">
                        <check-box
                            shiftBox="15px,-4px"
                            shiftmark="-1px,-2px"                                   
                            checkColor="#2134AB"
                            boxSize="1.3em" 
                            :check="true"
                            checkFontSize="16pt"
                            text="" />
                    </td>                    
                    <td class="font-8-3"  style="font-size:7.3pt" colspan="97">
                        Under the provisions of section 215.4 of the Motor Vehicle Act the vehicle referred to above is 
                    </td>                    
                </tr>
                <tr style="height:0.8rem;line-height:0.65rem;">     
                    <td class="" style="" colspan="4"></td>                    
                    <td class="font-8-3"  style="font-size:7.3pt" colspan="97">
                        impounded for a period of 24 hours commencing at the time set out in the Notice of Driving                         
                    </td>                    
                </tr>
                <tr style="height:0.8rem;line-height:0.65rem;">     
                    <td class="" style="" colspan="4"></td>                    
                    <td class="font-8-2"  style="font-size:7.2pt" colspan="46">
                        Prohibition, and is stored at IMPOUND LOT
                    </td>
                    <td class="answer" style="border-bottom:1px solid black;" colspan="51">VANCOUVER TERMINAL</td>                   
                </tr>
                <tr style="height:1rem;line-height:0.75rem;">     
                    <td class="answer" style="border-bottom:1px solid black;" colspan="40">1000 TERMINAL AVE</td>
                    <td class="answer" style="border-bottom:1px solid black;" colspan="29">VANCOUVER</td>
                    <td class="" style="border-bottom:1px solid black;" colspan="6">, BC</td>
                    <td class="" style="" colspan="2"></td>
                    <td class="answer" style="border-bottom:1px solid black;" colspan="24">(800) 900-1000</td>                   
                </tr>
                <tr style="height:1rem;line-height:0.75rem;font-size:6pt">     
                    <td class="" style="" colspan="40">(ADDRESS)</td>
                    <td class="" style="" colspan="29">(CITY)</td>
                    <td class="" style="" colspan="6"></td>
                    <td class="" style="" colspan="2"></td>
                    <td class="" style="" colspan="24">(PHONE)</td>                   
                </tr>

                <tr style="height:1.0rem;line-height:0.6rem;font-size:6.5pt;">
                    <td class="" colspan="100"> 
                        <div style="margin:0 0.05rem; text-align:justify;"> 
                            The registered owner or a person authorized by the owner may obtain the release of the 
                            vehicle 24 hours after the commencement of this driving prohibition and after paying all 
                            costs and charges for towing, care and storage of the motor vehicle referred to in 
                            section 215.4(6) of the Motor Vehicle Act.                            
                        </div>
                    </td>                                                                          
                </tr>
            </table>
        </div>
    </div>           
</template>     
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


import CheckBox from "../pdfUtil/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form24hTable5 extends Vue {

    // @Prop({required:true})
    // result!: form20DataInfoType;

    dataReady = false;


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

.margin-top-n0-40{
    margin-top: -0.4rem !important;
}

.margin-top-n0-25{
    margin-top: -0.25rem !important;
}

.font-8-3{
    font-size: 8.3pt !important;
}
.font-8-2{
    font-size: 8.2pt !important;
}

</style>