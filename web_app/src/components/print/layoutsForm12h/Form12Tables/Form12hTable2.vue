<template>
    <div v-if="dataReady">

        <div class="row notice_class" style="font-size:7pt; margin:0.25rem 0 0 0; padding:0rem;">

            <table class="text-left" style="width:100%; border:2px solid #151515; line-height:0.5rem;">
                
                <tr style="height:0.01rem; line-height:0.01rem;">                    
                    <td v-for="inx in Array(100)" :key="inx" class="" style="width:1%;" />                                                                                   
                </tr>
                <tr style="height:0.5rem;line-height:0.5rem;">
                    <td class="" colspan="100" />
                </tr>              

<!-- <ROW1> -->                
                <tr style="height:1.0rem;line-height:0.75rem;">
                    <td class="" colspan="100"> 
                        <div style="margin:0 0.5rem; font-size:8.5pt; text-align:justify;"> 
                            This suspension from driving will be recorded on your British
                            Columbia driving record and may be considered by the
                            Superintendent of Motor Vehicles when reviewing your driving
                            record. 
                        </div>
                    </td>                                                                          
                </tr>
                <tr style="height:0.5rem;line-height:0.5rem;">
                    <td class="" colspan="100" />
                </tr>

<!-- <ROW2> -->                
                <tr style="height:1.0rem;line-height:0.75rem;">
                    <td class="" colspan="100"> 
                        <div style="margin:0 0.5rem; font-size:8.5pt; text-align:justify;"> 
                            YOUR LICENCE TO DRIVE IS HEREBY SUSPENDED UNDER
                            SECTION 90.3 OF THE MOTOR VEHICLE ACT FOR A PERIOD OF
                            12 HOURS COMMENCING AT:
                        </div>
                    </td>                                                                          
                </tr>
                <tr style="height:0.75rem;line-height:0.75rem;">
                    <td class="" colspan="100" />
                </tr>
<!-- <ROW3> --> 
                <tr style="height:1.0rem;line-height:0.75rem;">
                    <td class="" style="border-bottom:1px solid white;" colspan="3" />
                    <td class="text-center answer" style="border-bottom:1px solid #151515;" colspan="12">10:00</td>
                    <td class="text-center"  style="border-bottom:1px solid white;" colspan="18">hours on the</td>
                    <td class="text-center answer" style="border-bottom:1px solid #151515;" colspan="10">25</td>
                    <td class="text-center"  style="border-bottom:1px solid white;" colspan="12">day of </td>
                    <td class="text-center answer" style="border-bottom:1px solid #151515;" colspan="24">NOVEMBER</td>
                    <td class="text-center"  style="border-bottom:1px solid white;" colspan="8">year </td>
                    <td class="text-center answer" style="border-bottom:1px solid #151515;" colspan="10">2022</td>
                    <td class=""  style="border-bottom:1px solid white;" colspan="3"></td>
                </tr>
                <tr style="height:1.5rem;line-height:0.75rem;">
                    <td class="" colspan="3" />
                    <td class="" style="border-bottom:1px solid #151515;" colspan="94" />
                    <td class="" colspan="3" />
                </tr>
                <tr class="lineheight0-5" style="height:0.5rem; line-height:0.95rem;">
                    <td class="text-center" style="font-size:6pt;" colspan="100">SIGNATURE OF PERSON ACKNOWLEDGING SUSPENSION</td>
                </tr>


            </table>
        </div>
    </div>           
</template>     
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


import CheckBox from "../../pdfUtil/CheckBox.vue";

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form12hTable2 extends Vue {

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

.notice_class{
    margin: 0 0 !important;
    padding: 0 0.2rem !important;
}

</style>