<template>
  <b-card header-tag="header" bg-variant="light" border-variant="primary" class="mx-auto p-0">
	<b-card-header header-bg-variant="secondary" header-border-variant="dark" header-text-variant="white">            
		<h4>Notice of 12 Hour Licence Suspension</h4>      
	</b-card-header>
	<b-card no-body v-if="dataReady" border-variant="light" bg-variant="light" class="my-0 mx-auto p-0" :key="updatedInfo">
        <b-row class="pt-2 pb-0 text-danger border-light">            
            <h4 style="float: right;">{{id}}</h4>      
        </b-row>
        
		<drivers-information-card @recheckStates="recheckStates()"></drivers-information-card>
		<vehicle-information-card @recheckStates="recheckStates()"></vehicle-information-card>
		<vehicle-impoundment-card @recheckStates="recheckStates()"></vehicle-impoundment-card>
		<prohibition-information-card @recheckStates="recheckStates()"></prohibition-information-card>
		<officer-details-card @recheckStates="recheckStates()"></officer-details-card>
        

	</b-card>
	<!-- <form-container title="Notice of 12 Hour Licence Suspension" :form_object="formObject" >
		
		
		<b-card title="Generate PDF for Printing">
			<div class="d-flex justify-content-between">
	
				<print-documents				
				:show_certificate="isCertificateOfServiceEnabled(getPath)"
				:path="getPath"
				:form_object="getCurrentlyEditedForm"
				:validate="validate"
				:variants="variants">
				Print All Copies
			</print-documents>
			</div>
		</b-card>

	</form-container> -->
  </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

import DriversInformationCard from "@/components/forms/TwelveHourSuspension/DriversInformationCard.vue";
import OfficerDetailsCard from "@/components/forms/OfficerDetailsCard.vue";
import VehicleInformationCard from "@/components/forms/TwelveHourSuspension/VehicleInformationCard.vue";
import PrintDocuments from "../PrintDocuments.vue";
import ProhibitionInformationCard from "@/components/forms/TwelveHourSuspension/ProhibitionInformationCard.vue";
import VehicleImpoundmentCard from "@/components/forms/TwelveHourSuspension/VehicleImpoundmentCard.vue";
import {mapGetters} from "vuex";

import { twelveHourFormDataInfoType, twelveHourFormJsonInfoType, twelveHourFormStatesInfoType } from '@/types/Forms/MV2906';
import { currentlyEditingFormObjectInfoType, formsInfoType } from '@/types/Common';

import { namespace } from "vuex-class";
import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/forms/mv2906";
const mv2906State = namespace("MV2906");

@Component({
	components:{        
        PrintDocuments,
		ProhibitionInformationCard,
		DriversInformationCard,
		OfficerDetailsCard,
		VehicleInformationCard,
		VehicleImpoundmentCard
    }
})
export default class TwelveHourProhibition extends Vue {  

	@mv2906State.State
    public mv2906Info: twelveHourFormJsonInfoType;
	
	@mv2906State.State
    public mv2906InfoStates: twelveHourFormStatesInfoType;

	@commonState.State
    public formsInfo: formsInfoType;

	@commonState.Action
    public UpdateCurrentlyEditingFormObject!: (newCurrentlyEditingFormObject: currentlyEditingFormObjectInfoType) => void	

	@mv2906State.Action
    public UpdateMV2906Info!: (newMV2906Info: twelveHourFormJsonInfoType) => void

    @mv2906State.Action
    public UpdateMV2906InfoStates!: (newMV2906StatesInfo: twelveHourFormStatesInfoType) => void

	
	name = '12Hour'; 
	updatedInfo = 0;
    dataReady = false;
    fieldStates = {} as twelveHourFormStatesInfoType;

	id = '';
	movedToPrintPage = false;
	twelveHourFormData = {} as twelveHourFormJsonInfoType;

	variants = ["icbc", "driver", "police"];

	mounted() {		
		this.id = this.$route.params?.id;
		const payload = {form_type: this.name, form_id: this.id}
		
		this.UpdateCurrentlyEditingFormObject(payload);
		this.extractCurrentlyEditedFormData();		
		
	}

	public extractCurrentlyEditedFormData() {
		console.log(this.id)
		this.twelveHourFormData = this.$store.state.forms['12Hour'][this.id];//this.formsInfo.TwelveHour[this.id];
        if (!this.twelveHourFormData.data){
            this.twelveHourFormData.data = {} as twelveHourFormDataInfoType;
        }
		if (!this.twelveHourFormData.data?.driversLicenceJurisdiction){
            this.twelveHourFormData.data.driversLicenceJurisdiction = {"objectCd":"BC","objectDsc":"BRITISH COLUMBIA"};
		}	
        if (!this.twelveHourFormData.data?.plateProvince){
            this.twelveHourFormData.data.plateProvince = {"objectCd":"BC","objectDsc":"BRITISH COLUMBIA"};
		}	
		
		this.UpdateMV2906Info(this.twelveHourFormData);
		this.dataReady = true;			

	}

	public clearStates(){
        const twelveHourFormStates = {} as twelveHourFormStatesInfoType;
        this.UpdateMV2906InfoStates(twelveHourFormStates); 
        this.fieldStates = {} as twelveHourFormStatesInfoType;
        this.dataReady = true; 
    }

	public recheckStates(){
        //console.log('check')
        for(const field of Object.keys(this.fieldStates)){
            if(this.fieldStates[field]==false){
                this.checkStates()
                return 
            }
        }  
    }

	public checkStates(){
        
        this.fieldStates = this.mv2906InfoStates; 
        
        // this.fieldStates.tribunalType = null;
           
                        
		// this.fieldStates.tribunalDateOfOrder = null;
		// this.fieldStates.tribunalOriginalDecisionMaker = null;
        
        
        // this.fieldStates.cityOfOrder = !this.form1Info.cityOfOrder? false : null;

      
        // this.fieldStates.lowerCourtFileNo = !this.form1Info.lowerCourtFileNo? false : null;            
        
        
       
        // this.fieldStates.lowerCourtRegistryId = null;

        // const durationValue = this.form1Info.trialDurationDays?.trim().toLowerCase();
        // const includesIdentifier = durationValue?.includes('day') || durationValue?.includes('hour')
        // this.fieldStates.appearanceDays = !(this.form1Info.trialDurationDays && includesIdentifier)? false : null;
        // this.fieldStates.applyLeave = !(this.form1Info.applyLeave != null)? false : null;
        // this.fieldStates.amending = !(this.form1Info.amending != null)? false : null; 
        // this.fieldStates.appealInvolvesChild = !(this.form1Info.appealInvolvesChild != null)? false : null;        
        // this.fieldStates.respondents = !(this.form1Info.respondents && this.form1Info.respondents.length > 0 )? false : null;
        // this.fieldStates.appellants = !(this.form1Info.appellants && this.form1Info.appellants.length > 0 )? false : null;
        // this.fieldStates.appealFrom = !this.form1Info.appealFrom? false : null;
        // this.fieldStates.wasSupremeAppeal = !(this.form1Info.wasSupremeAppeal != null)? false : null;
        // this.fieldStates.decisionMaker = (this.form1Info.wasSupremeAppeal && !this.form1Info.decisionMaker)? false : null;        
        // this.fieldStates.involves = !(this.form1Info.involves && this.form1Info.involves.length > 0)? false : null;
        // this.fieldStates.orderSought = !this.form1Info.orderSought? false : null;

        // this.fieldStates.orderSealed = !(this.form1Info.orderSealed != null)? false : null;
        // this.fieldStates.dateSealed = (this.form1Info.orderSealed && !this.form1Info.dateSealed)? false : null;
        // this.fieldStates.orderBan = !(this.form1Info.orderBan != null)? false : null;
        // this.fieldStates.dateBan = (this.form1Info.orderBan && !this.form1Info.dateBan)? false : null;
      
        // this.fieldStates.mainAppellant = !this.form1Info.appealingFirm? false : null;
        
        // this.fieldStates.driverPhoneNumber = !(this. && this.verifyPhoneNumbers()
        //                             && this.form1Info.phoneNumbers.length == this.form1Info.appellants.length)? false : null;
        
        // const verifiedAddresses = this.verifyAddresses()
        // this.fieldStates.addresses = verifiedAddresses.valid;
        // this.fieldStates.nonBcAddress = verifiedAddresses.nonBC;       
      
        // this.fieldStates.emails = this.verifyEmails()? null: false;

        this.UpdateMV2906InfoStates(this.fieldStates);
        this.updatedInfo ++;

        for(const field of Object.keys(this.fieldStates)){
            if(this.fieldStates[field]==false){
                Vue.filter('findInvalidFields')()
                return false
            }                
        }       

        return true;            
    }

	public verifyPhoneNumber(phoneNumber: string){
            
		if(!Vue.filter('verifyPhone')(phoneNumber))
			return false;
      
        return true;
    }

	

}
</script>

<style scoped>
  .lightgray {
    background-color: lightgray;
  }
  .prohibition_number {
    color: red;
  }
</style>