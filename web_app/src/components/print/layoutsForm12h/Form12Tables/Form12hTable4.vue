<template>
    <div v-if="dataReady">

        <div class="row margin-top-n0-25" style="margin:0.5rem 0 0 0; line-height:0.25rem;">
            <div class="text-center" style="font-size:9pt; width:100%;"><b>DISPOSITION OF VEHICLE</b></div>            
        </div>

        <div class="row margin-top-n0-40" style="font-size:6pt; margin:0.35rem 0 0 0;">
            <table class="border border-dark text-left" style="width:100%; line-height:0.5rem;">
                <tr style="height:0.01rem; line-height:0.01rem; border-right:1px solid #151515;">                   
                    <td v-for="inx in Array(100)" :key="inx" class="border-0 border-dark" style="width:1%;" />                                                                                                     
                </tr>

<!-- <ROW1> -->
                <tr style="height:0.25rem;  line-height:0.75rem; border-top:0px solid;">                                      
                    <td class="" style="" colspan="1" />
                    <td class="" style="" colspan="8">YEAR</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="14">MAKE</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="19">MODEL</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>                    
                    <td class="" style="" colspan="19">COLOUR</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="14">PROV/STATE</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="20">VEHICLE LIC. NO.</td>                                                          
                </tr>
                <tr style="height:0.95rem; line-height:0.65rem;">                    
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="8">2000</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="14">CORSA</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="19">2022</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="19">BLK</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="14">ALTA</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="20">98789798K</td>                                          
                </tr>


<!-- <ROW2> -->
                <tr style="height:0.25rem; line-height:0.75rem; border-top:1px solid;">                    
                    <td class="" style="" colspan="1"> </td>
                    <td class="" style="" colspan="99">LOCATION OF KEYS</td> 
                                                                            
                </tr>
                <tr style="height:0.95rem; line-height:0.65rem;">                    
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="99">With Driver</td>                                                                                
                </tr>

<!-- <ROW3> -->
                <tr style="height:0.25rem; line-height:0.75rem; border-top:1px solid;">                    
                    <td class="" style="" colspan="1"> </td>
                    <td class="" style="" colspan="99">LOCATION OF VEHICLE</td> 
                                                                            
                </tr>
                <tr style="height:0.95rem; line-height:0.65rem;">                    
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="99">Lot 4536 vancouver</td>                                                                                
                </tr>

<!-- <ROW4> -->
                <tr style="height:0.25rem; line-height:0.75rem; border-top:1px solid;">                    
                    <td class="" style="" colspan="1"> </td>
                    <td class="" style="" colspan="99">VEHICLE RELEASED TO (PLEASE PRINT)</td> 
                                                                            
                </tr>
                <tr style="height:0.95rem; line-height:0.65rem;">                    
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="99">Driver Name</td>                                                                                
                </tr>



<!-- <ROW2> -->
                <tr style="height:0.25rem; line-height:0.75rem; border-top:1px solid;">                    
                    <td class="" style="" colspan="1" />
                    <td class="" style="" colspan="58">SIGNATURE OF PERSON RECEIVING VEHICLE</td>
                    <td class=""  style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="40">DATE AND TIME RELEASED</td>
                                                     
                </tr>
                <tr style="height:0.95rem; line-height:0.65rem;">                    
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="58">Signature</td>
                    <td class=""  style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="26">2020-01-01</td>
                    <td class=""  style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="13">10:00 AM</td>                                               
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
export default class Form12hTable4 extends Vue {

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