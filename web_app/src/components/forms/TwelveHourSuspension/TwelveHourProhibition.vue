<template>
  <b-card header-tag="header" bg-variant="light" border-variant="primary" class="mx-auto p-0">
	<b-card-header header-bg-variant="secondary" header-border-variant="dark" header-text-variant="white">            
		<h4>Notice of 12 Hour Licence Suspension</h4>      
	</b-card-header>
	<b-card no-body v-if="dataReady" border-variant="light" bg-variant="light" class="my-0 mx-auto p-0" :key="'m12-'+updatedInfo">
        <b-row class="pt-2 pb-0 text-danger border-light">            
            <div class="ml-auto mr-2 h4">{{id}}</div>      
        </b-row>
        
		<drivers-information-card :driverInfo="twelveHourData" :driverState="fieldStates" @recheckStates="recheckStates()" />
		<vehicle-information-card :vehicleInfo="twelveHourData" :vehicleState="fieldStates" @recheckStates="recheckStates()"/>
		<vehicle-disposition-card :vdInfo="twelveHourData" :vdState="fieldStates" @recheckStates="recheckStates()"/>
		<prohibition-information-card :prohibitionInfo="twelveHourData" :prohibitionState="fieldStates" @recheckStates="recheckStates()"/>
		<officer-details-card :officerInfo="twelveHourData" :officerState="fieldStates" @recheckStates="recheckStates()"/>

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
import OfficerDetailsCard from "@/components/forms/TwelveHourSuspension/OfficerDetailsCard.vue";
import VehicleInformationCard from "@/components/forms/TwelveHourSuspension/VehicleInformationCard.vue";
import PrintDocuments from "../PrintDocuments.vue";
import ProhibitionInformationCard from "@/components/forms/TwelveHourSuspension/ProhibitionInformationCard.vue";
import VehicleDispositionCard from "@/components/forms/TwelveHourSuspension/VehicleDispositionCard.vue";

import { twelveHourFormDataInfoType, twelveHourFormJsonInfoType, twelveHourFormStatesInfoType } from '@/types/Forms/MV2906';
import { cityInfoType, currentlyEditingFormObjectInfoType, formsInfoType, impoundLotOperatorsInfoType } from '@/types/Common';

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
		VehicleDispositionCard
    }
})
export default class TwelveHourProhibition extends Vue {  

	@mv2906State.State
    public mv2906Info: twelveHourFormJsonInfoType;
	
	@commonState.State
    public formsInfo: formsInfoType;

    @commonState.State
    public currently_editing_form_object: currentlyEditingFormObjectInfoType;

	@commonState.Action
    public UpdateCurrentlyEditingFormObject!: (newCurrentlyEditingFormObject: currentlyEditingFormObjectInfoType) => void	

	@mv2906State.Action
    public UpdateMV2906Info!: (newMV2906Info: twelveHourFormJsonInfoType) => void


	
	name = '12Hour'; 
	updatedInfo = 0;
    dataReady = false;
    fieldStates = {} as twelveHourFormStatesInfoType;

	id = '';
	movedToPrintPage = false;
	twelveHourFormData = {} as twelveHourFormJsonInfoType;
    twelveHourData = {} as twelveHourFormDataInfoType;

	variants = ["icbc", "driver", "police"];

	mounted() {		
		this.id = this.currently_editing_form_object.form_id;
		// const payload = {form_type: this.name, form_id: this.id}
		this.clearStates()
		// this.UpdateCurrentlyEditingFormObject(payload);
        const formData = this.$store.state.forms[this.name][this.id]
        //console.log(formData)
        this.UpdateMV2906Info(formData)

		this.extractCurrentlyEditedFormData();        		
		
	}

	public extractCurrentlyEditedFormData() {

        //console.log(this.mv2906Info)

        if(this.mv2906Info?.data?.driversLicenceJurisdiction?.objectCd){
            //console.log('updateData')
            this.twelveHourFormData = this.mv2906Info            
        }else{
            //console.log('init')
            this.prepopulateDefaultValues()            
            this.recheckStates()
        }  
        this.twelveHourData = this.twelveHourFormData.data      
		this.dataReady = true;
	}

    public prepopulateDefaultValues(){
        const twelveHourData = {} as twelveHourFormDataInfoType

        twelveHourData.driversNumber=null;
        twelveHourData.givenName='';
        twelveHourData.lastName='';
        twelveHourData.dob='';
        twelveHourData.driversLicenceJurisdiction= {"objectCd":"BC","objectDsc":"BRITISH COLUMBIA"};
        twelveHourData.address='';
        twelveHourData.driverPhoneNumber='';
        twelveHourData.driverCity='';
        twelveHourData.driverProvince= {"objectCd":null,"objectDsc":null};
        twelveHourData.driverPostalCode='';
        twelveHourData.plateProvince= {"objectCd":"BC","objectDsc":"BRITISH COLUMBIA"};
        twelveHourData.plateNumber='';
        
        twelveHourData.puj_code= {"objectCd":null,"objectDsc":null};
        twelveHourData.nscNumber='';
                
        twelveHourData.vehicleYear='';
        twelveHourData.vehicleMake={md:'', mk:'', search:''};
        twelveHourData.vehicleColor=[];
        
        twelveHourData.prohibitionType='';
           
        twelveHourData.vehicleImpounded=null; 
        twelveHourData.impountLot= {} as impoundLotOperatorsInfoType;
        twelveHourData.locationOfKeys='';
        twelveHourData.notImpoundingReason='';
        twelveHourData.releasedDate='';
        twelveHourData.releasedTime='';
        twelveHourData.vehicleReleasedTo='';

        twelveHourData.offenceAddress='';
        twelveHourData.offenceCity = {} as cityInfoType; 
        twelveHourData.agencyFileNumber='';
        twelveHourData.prohibitionStartDate='';
        twelveHourData.prohibitionStartTime='';


        twelveHourData.agency='';
        twelveHourData.badge_number='';
        twelveHourData.officer_name='';
        
        twelveHourData.submitted=false;
        
        this.twelveHourFormData = this.mv2906Info
        this.twelveHourFormData.data = twelveHourData
        
    }

	public clearStates(){
        const twelveHourFormStates = {} as twelveHourFormStatesInfoType;        
        twelveHourFormStates.driversNumber=null
        twelveHourFormStates.givenName=null
        twelveHourFormStates.lastName=null
        twelveHourFormStates.dob=null   
        twelveHourFormStates.address=null
        twelveHourFormStates.driverPhoneNumber=null
        twelveHourFormStates.driverCity=null
        twelveHourFormStates.driverProvince=null
        twelveHourFormStates.driverPostalCode=null
        twelveHourFormStates.agency=null
        twelveHourFormStates.badgeNumber=null
        twelveHourFormStates.driversLicenceJurisdiction=null
        twelveHourFormStates.officerName=null
        twelveHourFormStates.plateProvince=null    
        twelveHourFormStates.plateNumber=null         
        twelveHourFormStates.puj_code=null 
        twelveHourFormStates.nscNumber=null 
        twelveHourFormStates.registrationNumber=null 
        twelveHourFormStates.vehicleYear=null
        twelveHourFormStates.vehicleMake=null 
        twelveHourFormStates.vehicleColor=null        
        twelveHourFormStates.submitted=null    

        this.fieldStates = twelveHourFormStates;
        this.dataReady = true
    }

	public recheckStates(){
        this.UpdateMV2906Info(this.twelveHourFormData)
        this.$store.commit("updateFormInRoot",this.twelveHourFormData)
        console.log('check')
        const specialFields = ['dob']
        for(const field of Object.keys(this.fieldStates)){
            if(this.fieldStates[field]==false && !specialFields.includes(field)){
                this.checkStates()
                return 
            }
        }  
    }

	public checkStates(){
        const data = this.twelveHourFormData.data
                
        this.fieldStates.driverPhoneNumber = Vue.filter('verifyPhone')( data.driverPhoneNumber)? null:false;
        this.fieldStates.driverProvince = data.driverProvince?.objectCd? null:false;
        this.fieldStates.driverPostalCode = Vue.filter('verifyPostCode')(data.driverPostalCode, data.driverProvince?.objectCd)? null:false;      

        for(const field of Object.keys(this.fieldStates)){
            if(this.fieldStates[field]==false){
                // Vue.filter('findInvalidFields')()
                return false
            }                
        }       

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