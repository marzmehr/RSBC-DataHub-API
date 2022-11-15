<template>
    <div v-if="dataReady">

        <div class="row margin-top-n0-25" style="margin:0.65rem 0 0 0; line-height:0.25rem;">
            <div class="text-center" style="font-size:9pt; width:100%;"><b>RETURN OF DRIVER'S LICENCE</b></div>            
        </div>

        <div class="row margin-top-n0-40" style="font-size:5.9pt; margin:0.45rem 0 0 0;">

            <table class="border border-dark text-left" style="width:100%; line-height:0.5rem;">

                <tr style="height:0.01rem; line-height:0.01rem; border-right:1px solid black;">                                                         
                    <td v-for="inx in Array(101)" :key="inx" class="border-0 border-dark" style="width:1%;" />                                                                                   
                </tr>              
<!-- <ROW1> -->
                <tr style="height:0.25rem; line-height:0.65rem;">                    
                    <td class="" style="border-right:1px solid;" colspan="25">DATE AND TIME OF RETURN</td>
                    <td class="" style="" colspan="3">
                        <check-box
                            shiftBox="18px,1px"
                            shiftmark="-1px,-3px"                                   
                            checkColor="#2134AB"
                            boxSize="1.2em" 
                            :check="true"
                            checkFontSize="12pt"
                            text="" />
                    </td>
                    <td class="" style="border-right:1px solid;" colspan="11">PERSONALLY</td>
                    <td class="" style="border-right:1px solid;" colspan="22">RETURNING OFFICER</td>
                    <td class="" style="" colspan="40">RECEIPT OF LICENCE ACKNOWLEDGED</td>
                </tr>
                <tr style="height:0.85rem; line-height:0.65rem;">
                    <td class="answer" style="border-right:1px solid black;" colspan="25">2020-01-01 10:15</td>
                    <td class="" style="" colspan="3">
                        <check-box
                            shiftBox="18px,0px"
                            shiftmark="-1px,-3px"                                   
                            checkColor="#2134AB"
                            boxSize="1.2em" 
                            :check="true"
                            checkFontSize="12pt"
                            text="" />
                    </td>
                    <td class="" style="border-right:1px solid;" colspan="11">MAIL</td>
                    <td class="answer" style="border-right:1px solid black;" colspan="22">ADMIN</td>
                    <td class="answer" style="" colspan="40">ACK</td>
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
export default class Form24hTable7 extends Vue {

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

</style>