<template>

	<b-card v-if="dataReady" header-tag="header" bg-variant="gov-accent-grey" border-variant="light" >		
		<b-card-header header-bg-variant="light" header-border-variant="bright" header-text-variant="dark">            
			<b>Vehicle Disposition</b>      
		</b-card-header>
		<b-card border-variant="light" bg-variant="time" text-variant="dark" class="my-0">

            <b-row>   
                <b-col cols="3"> 
                    <label class="ml-1 m-0 p-0"> Vehicle Towed? <span class="text-danger">*</span></label>
                    <b-form-radio-group 
                        stacked
                        v-model="vdInfo.vehicleTowed"                    
                        :options="responseOptions"
                        @change="update"
						:disabled="formPrinted"
						:state="vdState.vehicleTowed">                   
                    </b-form-radio-group> 
                </b-col>                
            </b-row>
            <b-card no-body v-if="vdInfo.vehicleTowed">
                <b-row>   
                    <b-col cols="3"> 
                        <label class="ml-1 m-0 p-0"> Location of Keys? <span class="text-danger">*</span></label>
                        <b-form-radio-group 
                            stacked
                            v-model="vdInfo.keysOnVehicle"                    
                            :options="keyLocationOptions"
                            @change="update"
                            :disabled="formPrinted"
                            :state="vdState.keysOnVehicle">                   
                        </b-form-radio-group> 
                    </b-col>                
                </b-row>
                





            </b-card>
		

		




		</b-card>

	</b-card>



  <!-- <form-card title="Vehicle Disposition">
    
    <div>
      <form-row>
        <radio-field id="vehicle_impounded" :path="path"
                     fg_class="col-sm-6"
                     rules="required"
                     :options='[["yes", "Yes"], ["no", "No"]]'>Vehicle Towed?</radio-field>
      </form-row>
      <vehicle-towed-card :path="path + '/vehicle_impounded_yes'" v-if="doesAttributeExist(this.path, 'vehicle_impounded_yes')">

      </vehicle-towed-card>
      <vehicle-not-towed-card :path="path + '/vehicle_impounded_no'" v-if="doesAttributeExist(this.path, 'vehicle_impounded_no')">

      </vehicle-not-towed-card>
    </div>
  </form-card> -->
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import moment from 'moment-timezone';

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/forms/mv2906";
const mv2906State = namespace("MV2906");

import rsiStore from "@/store";

import { jurisdictionInfoType, provinceInfoType } from '@/types/Common';
import { twelveHourFormStatesInfoType, twelveHourFormDataInfoType, twelveHourFormJsonInfoType } from '@/types/Forms/MV2906';
import Spinner from "@/components/utils/Spinner.vue";

@Component({
    components: {           
        Spinner
    }        
}) 
export default class VehicleDispositionCard extends Vue {   

	@commonState.State
    public jurisdictions: jurisdictionInfoType[];

	@commonState.State
    public provinces: provinceInfoType[];	

	@mv2906State.State
    public mv2906Info: twelveHourFormJsonInfoType;

	@Prop({required: true})
    vdInfo!: twelveHourFormDataInfoType;
	
	@Prop({required: true})
	vdState!: twelveHourFormStatesInfoType;

	dataReady = false;

	error = '';
	path = '';
	formPrinted = false;

    responseOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    keyLocationOptions = [
        {text: 'With vehicle', value: true},
        {text: 'With driver', value: false}
    ];


	mounted() { 
        this.dataReady = false;				        
		this.formPrinted = Boolean(this.mv2906Info.printedTimestamp);
        this.extractFields();
        this.dataReady = true;
    }

	public extractFields(){
		
		this.path = 'forms/' + this.mv2906Info.form_type + '/' + this.mv2906Info.form_id + '/data'

	}


	public updateFormFields(data: any){
		// this.driverInfo.driversNumber = data.number;		
        // this.driverInfo.address = data['address']['street'];
        // this.driverInfo.driverCity = data['address']['city'];
        // this.driverInfo.driverPostalCode = data['address']['postalCode'];
        // this.driverInfo.dob = data['dob'];
        // this.driverInfo.givenName = data['name']['given'];
        // this.driverInfo.lastName = data['name']['surname'];		
	}

	public update(){
        this.recheckStates()
    }

	public recheckStates(){
        this.$emit('recheckStates')
    }

	// public validateDate(){
	// 	const validDate = true;
	// 	if (validDate){
	// 		this.age = moment().diff(moment(this.driverInfo.dob), 'years');			
	// 	}
	// 	this.update();
	// }

	public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');           
        return (date < day);           
    }
 
}
</script>




<style scoped>

</style>