<template>
  <b-card v-if="isMounted" header-tag="header" bg-variant="light" border-variant="white" class="mx-auto">
	<b-card-header header-bg-variant="primary" header-border-variant="dark" header-text-variant="white">            
		<h4>Notice of 12 Hour Licence Suspension</h4>      
	</b-card-header>
	<b-card border-variant="light" bg-variant="light" class="my-2" :key="updatedInfo">

	</b-card>
	<form-container title="Notice of 12 Hour Licence Suspension" :form_object="formObject" >
		<!-- <validation-observer v-slot="{handleSubmit, validate}"> -->
		<!-- <form @submit.prevent="handleSubmit(onSubmit(validate))"> -->
		<drivers-information-card :path="getPath"></drivers-information-card>
		<vehicle-information-card :path="getPath"></vehicle-information-card>
  <!--        <return-of-licence-card :path="getPath"></return-of-licence-card>-->
		<vehicle-impoundment-card :path="getPath"></vehicle-impoundment-card>
		<prohibition-information-card :path="getPath"></prohibition-information-card>
		<officer-details-card :path="getPath"></officer-details-card>
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
		<!-- </form> -->
		<!-- </validation-observer> -->
	</form-container>
  </b-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

// import FormsCommon from "@/components/forms/FormsCommon.vue";
import DriversInformationCard from "@/components/forms/TwelveHourSuspension/DriversInformationCard.vue";
import OfficerDetailsCard from "@/components/forms/OfficerDetailsCard.vue";
import VehicleInformationCard from "@/components/forms/TwelveHourSuspension/VehicleInformationCard.vue";
import PrintDocuments from "../PrintDocuments.vue";
import ProhibitionInformationCard from "@/components/forms/TwelveHourSuspension/ProhibitionInformationCard.vue";
import VehicleImpoundmentCard from "@/components/forms/TwelveHourSuspension/VehicleImpoundmentCard.vue";
import {mapGetters} from "vuex";

import { twelveHourFormDataInfoType, twelveHourFormStatesInfoType } from '@/types/Forms/MV2906';
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
export default class TwelveTwentyFour extends Vue {  

	@mv2906State.State
    public fmv2906Info: twelveHourFormDataInfoType;
	
	@mv2906State.State
    public mv2906InfoStates: twelveHourFormStatesInfoType;

	@commonState.Action
    public formsInfo: formsInfoType;

	@commonState.Action
    public UpdateCurrentlyEditingFormObject!: (newCurrentlyEditingFormObject: currentlyEditingFormObjectInfoType) => void	

	@mv2906State.Action
    public UpdateMV2906Info!: (newMV2906Info: twelveHourFormDataInfoType) => void

    @mv2906State.Action
    public UpdateMV2906InfoStates!: (newMV2906StatesInfo: twelveHourFormStatesInfoType) => void

	
	name = '12Hour'; 
	// mixins: [FormsCommon];
	isMounted = false;

	id = '';
	movedToPrintPage = false;
	twelveHourFormData = {} as twelveHourFormDataInfoType;

	variants = ["icbc", "driver", "police"];


/*  id: {
      type: String
    }
   movedToPrintPage: {
      type: Boolean,
      default: false
    }*/

/*  data() {
    return {
      form_object: {
        "formid": this.id,
        "formtype": this.name,
        "movedToPrintPage": false
      }
    }
  },*/

	mounted() {		
		this.id = this.$route.params?.id;
		const payload = {formType: this.name, formId: this.id}
		this.isMounted = true
		this.UpdateCurrentlyEditingFormObject(payload);
		this.extractCurrentlyEditedFormData();		
		this.isMounted = true
	}

	public extractCurrentlyEditedFormData() {
		
		this.twelveHourFormData = this.formsInfo.TwelveHour[this.id];		

	}

	

  /*  destroyed: function() {
    console.log("inside created")
    localStorage.setItem('movedToPrintPage', true)
    //window.addEventListener('unload', this.movedToPrintPageStatus)
  },*/
//   computed: {
//     ...mapGetters([
//       "getCurrentlyEditedFormObject",
//       //"getDocumentsToPrint",
//       //"getPdfFileNameString",
//       "getCurrentlyEditedForm"]),
//   },
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