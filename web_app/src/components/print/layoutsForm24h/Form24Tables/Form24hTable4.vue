<template>
    <div v-if="dataReady">

        <div class="row margin-top-n0-25" style="margin:0.5rem 0 0 0; line-height:0.25rem;">
            <div class="text-center" style="font-size:9pt; width:100%;"><b>VEHICLE INFORMATION</b></div>            
        </div>

        <div class="row margin-top-n0-40" style="font-size:6pt; margin:0.35rem 0 0 0;">
            <table class="border border-dark text-left" style="width:100%; line-height:0.5rem;">
                <tr style="height:0.01rem; line-height:0.01rem; border-right:1px solid #151515;">
                    <td class="bg-dark" style="width:1%;"/>
                    <td class="bg-dark" style="width:1%;"/>
                    <td class="" style="width:1%;"/>
                    <td v-for="inx in Array(100)" :key="inx" class="border-0 border-dark" style="width:1%;" />                                                                                                     
                </tr>
<!-- <ROW1> -->
                <tr style="height:0.25rem; line-height:0.5rem; border-top:0px solid;">
                    <td class="bg-dark text-white"  style="" colspan="2"><b>O</b></td>
                    <td class="" style="" colspan="1"> </td>
                    <td class="" style="" colspan="50">SURNAME (print)</td> 
                    <td class="" style="" colspan="50">GIVEN</td>                                                           
                </tr>
                <tr style="height:0.85rem; line-height:0.65rem;">
                    <td class="bg-dark text-white"  style="" colspan="2"><b>W</b></td>
                    <td class="" style="" colspan="1" />
                    <td class="answer"    style="" colspan="50">SOME</td> 
                    <td class="answer" style="" colspan="50">GUY</td>                                                           
                </tr>
<!-- <ROW2> -->
                <tr style="height:0.25rem; line-height:0.5rem; border-top:1px solid;">
                    <td class="bg-dark text-white"  style="" colspan="2"><b>N</b></td>
                    <td class="" style="" colspan="1" />
                    <td class="" style="" colspan="35">ADDRESS</td>
                    <td class="" style="" colspan="29">CITY</td>
                    <td class=""  style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="15">PROV/STATE</td>
                    <td class=""  style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="19">POSTAL CODE</td>                                                          
                </tr>
                <tr style="height:0.85rem; line-height:0.65rem;">
                    <td class="bg-dark text-white"  style="line-height:0.5rem;" colspan="2"><b>E R</b></td>
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="35">800 Hornby St</td> 
                    <td class="answer" style="" colspan="29">PRINCE GEORGE</td>
                    <td class=""  style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="15">BC</td>
                    <td class=""  style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="19">V1R 1R1</td>                                               
                </tr>
<!-- <ROW3> -->                
                <tr style="height:0.25rem;  line-height:0.5rem; border-top:1px solid;">
                    <td class="bg-dark text-white"  style="" colspan="2"><b></b></td>
                    <td class="" style="" colspan="1" />
                    <td class="" style="" colspan="18">LICENCE NUMBER</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="11">PROV/STATE</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="7">L/YEAR</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="18">VAL TAG NUMBER</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="24">REGISTRATION NUMBER</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="17">VEHICLE TYPE</td>                                                          
                </tr>
                <tr style="height:0.85rem; line-height:0.65rem;">
                    <td class="bg-dark text-white"  style="line-height:0.5rem;" colspan="2"><b>V E</b></td>
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="18">ABC DEF</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="11">BC</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="7">2022</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="18">823477346</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="24">2346856698</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="17">TRUCK</td>                                          
                </tr>

                
<!-- <ROW4> -->
                <tr style="height:0.25rem;  line-height:0.5rem; border-top:1px solid;">
                    <td class="bg-dark text-white"  style="" colspan="2"><b>H</b></td>                   
                    <td class="" style="" colspan="1" />
                    <td class="" style="" colspan="18">VEHICLE MAKE</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="14">MODEL</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="7">YEAR</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="17">COLOUR</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="16">PUJ CODE</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="23">NSC NUMBER</td>                                                          
                </tr>
                <tr style="height:0.85rem; line-height:0.65rem;">
                    <td class="bg-dark text-white"  style="" colspan="2"><b>I</b></td>
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="18">OPEL</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="14">CORSA</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="7">2022</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="17">BLK</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="16">ALTA</td>
                    <td class="" style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="23">98789798K</td>                                          
                </tr>
<!-- <ROW5> -->
                <tr style="height:0.25rem; line-height:0.5rem; border-top:1px solid;">
                    <td class="bg-dark text-white"  style="" colspan="2"><b>C</b></td>
                    <td class="" style="" colspan="1" />
                    <td class="" style="" colspan="59">VEHICLE IDENTIFICATION (SERIAL) NUMBER</td>
                    <td class=""  style="border-left:1px solid;" colspan="1"></td>
                    <td class="" style="" colspan="40">OWNER CONTACT NUMBER</td>                                                        
                </tr>
                <tr style="height:0.85rem; line-height:0.65rem;">
                    <td class="bg-dark text-white"  style="line-height:0.5rem;" colspan="2"><b>L E</b></td>
                    <td class="" style="" colspan="1" />
                    <td class="answer" style="" colspan="59">FF432DSF45</td> 
                    <td class=""  style="border-left:1px solid;" colspan="1"></td>
                    <td class="answer" style="" colspan="40">(800) 900-1000</td>                                       
                </tr>            

            </table>
        </div>
    </div>           
</template>     
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from "vuex-class";

import "@/store/modules/forms/mv2634";
const mv2634State = namespace("MV2634");

import CheckBox from "../../pdfUtil/CheckBox.vue";
import { twentyFourHourFormJsonInfoType } from '@/types/Forms/MV2634';

@Component({
    components:{       
        CheckBox           
    }
})
export default class Form24hTable4 extends Vue {

    @mv2634State.State
    public mv2634Info: twentyFourHourFormJsonInfoType;   

    dataReady = false;

    formData;

    mounted(){
        this.dataReady = false;
        this.extractInfo();
        this.dataReady = true;
    }

    public extractInfo(){

        const form12 = this.mv2634Info.data

        this.formData = {
            vehicleYear: '',
            vehicleMake:'',
            vehicleModel: '',
            vehicleColor: '',
            plateProvince: '',
            plate: '',
            pujCode: '',
            nscNumber: '',
            locationOfKeys: '',
            locationOfVehicle: '',
            vehicleReleasedTo: '',
            dateReleased: '',
            timeReleased: ''            
        }

        let vehicleLocationInfo = '';
        let vehicleReleasedTo = '';
        let locationOfKeys = '';
        let dateReleased = '';
        let timeReleased = '';
        
        if (form12.vehicleImpounded){
            const lineAddress = form12.impoundLot?.lot_address?form12.impoundLot.lot_address.toUpperCase()+', ':'';
            const city = form12.impoundLot?.city?form12.impoundLot.city.toUpperCase()+ ', ':'';
            const phone = form12.impoundLot?.phone?form12.impoundLot.phone:'';
            vehicleLocationInfo = lineAddress + city + phone;
            vehicleReleasedTo = form12.impoundLot?.name?form12.impoundLot.name.toUpperCase():'';
            locationOfKeys = form12.locationOfKeys?form12.locationOfKeys.toUpperCase():'';
            dateReleased = '';
            timeReleased = '';
        } else {
            if (form12.notImpoundingReason == 'Left at roadside'){
                vehicleLocationInfo = 'LEFT AT ROADSIDE'
                vehicleReleasedTo = '';
                locationOfKeys = '';
                dateReleased = '';
                timeReleased = '';
            } else {
                vehicleLocationInfo = ''
                vehicleReleasedTo = form12.vehicleReleasedTo?form12.vehicleReleasedTo.toUpperCase():'';
                locationOfKeys = '';
                dateReleased = Vue.filter('format-date-dash')(form12.releasedDate);
                timeReleased = form12.releasedTime.substr(0,2)+ ':' + form12.releasedTime.substr(2,2);
            }
            
        }

        const colorList = form12.vehicleColor?form12.vehicleColor.map( o => o.code):[];
    
        this.formData.vehicleYear = form12.vehicleYear?form12.vehicleYear.toUpperCase():'';
        this.formData.vehicleMake = form12.vehicleMake?.mk?form12.vehicleMake.mk.toUpperCase():'';
        this.formData.vehicleModel = form12.vehicleMake?.md?form12.vehicleMake.md.toUpperCase():'';
        this.formData.vehicleColor = colorList.length>0?colorList.toString():'';
        this.formData.plateProvince = form12.plateProvince?.objectCd?form12.plateProvince.objectCd.toUpperCase():'';
        this.formData.plate = form12.plateNumber?form12.plateNumber.toUpperCase():'';
        this.formData.locationOfKeys = locationOfKeys?locationOfKeys:'';
        this.formData.locationOfVehicle = vehicleLocationInfo?vehicleLocationInfo:'';
        this.formData.vehicleReleasedTo = vehicleReleasedTo?vehicleReleasedTo:'';
        this.formData.dateReleased = dateReleased?dateReleased:'';
        this.formData.timeReleased = timeReleased?timeReleased:''; 
    }

    // public extractInfo(){

    //     if (this.result.withdrawingLawyerName == 'Other'){
    //         this.lawyerName = this.result.withdrawingLawyerNameOther;
    //     } else {
    //         this.lawyerName = this.result.withdrawingLawyerName;
    //     }

    //     const index = this.result.objectingParties.indexOf('Other')

    //     if (index != -1){
// this.formData.pujCode = form24.puj_code?.objectCd?form24.puj_code.objectCd.toUpperCase():'';
        // this.formData.nscNumber = form24.nscNumber?form24.nscNumber.toUpperCase():'';
        
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