<template>
    <div v-if="dataReady">

        <div class="row officer_class" style="font-size:6pt; margin:0.25rem 0 0 0;">

            <table class="border border-dark text-left" style="width:100%; line-height:0.5rem;">

                <tr style="height:0.01rem; line-height:0.01rem; border-right:1px solid black;">
                    <td class="" style="width:1%;" colspan="1" />                 
                    <td v-for="inx in Array(100)" :key="inx" class="border-0 border-dark" style="width:1%;" />                                                                                   
                </tr>              
<!-- <ROW1> -->
                <tr style="height:0.25rem; line-height:0.5rem;">
                    <td class="" style="" colspan="1" />
                    <td class="" style="" colspan="98">LOCATION OF PEACE OFFICER'S REQUEST FOR SURRENDER OF DRIVER'S LICENCE</td>
                    <td class="" style="" colspan="2" />
                </tr>
                <tr style="height:0.85rem; line-height:0.65rem;">
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="98">1000 ST, VAN, BC, V1R 1R1</td>
                    <td class="" style="" colspan="2" />
                </tr>
<!-- <ROW2> -->
                <tr style="height:0.25rem; line-height:0.5rem; border-top:1px solid;">
                    <td class="" style="" colspan="1" />
                    <td class="" style="" colspan="70">SIGNATURE OF PEACE OFFICER SERVING PROHIBITION NOTICE</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="29">BADGE NUMBER</td>
                </tr>
                <tr style="height:0.85rem; line-height:0.65rem;">
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="70">ADMINISTRATOR</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="29">0000</td>
                </tr>
<!-- <ROW3> -->
                <tr style="height:0.25rem; line-height:0.5rem; border-top:1px solid;">
                    <td class="" style="" colspan="1" />
                    <td class="" style="" colspan="60">POLICE AGANCY OR RCMP UNIT</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="39">AGANCY FILE NUMBER</td>
                </tr>
                <tr style="height:0.85rem; line-height:0.65rem;">
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="60">ROADSAFETY</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="39">7689</td>
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
export default class Form24hTable3 extends Vue {

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

.officer_class{
    margin: 0 0 !important;
}

</style>