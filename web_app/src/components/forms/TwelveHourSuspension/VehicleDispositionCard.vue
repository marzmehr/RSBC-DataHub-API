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
                        v-model="vdInfo.vehicleImpounded"                    
                        :options="responseOptions"
                        @change="update"
						:disabled="formPrinted"
						:state="vdState.vehicleImpounded">                   
                    </b-form-radio-group> 
                </b-col>                
            </b-row>
            <b-card no-body v-if="vdInfo.vehicleImpounded">
                <b-row>   
                    <b-col cols="3"> 
                        <label class="ml-1 m-0 p-0"> Location of Keys? <span class="text-danger">*</span></label>
                        <b-form-radio-group 
                            stacked
                            v-model="vdInfo.locationOfKeys"                    
                            :options="keyLocationOptions"
                            @change="update"
                            :disabled="formPrinted"
                            :state="vdState.locationOfKeys">                   
                        </b-form-radio-group> 
                    </b-col>                
                </b-row>
                <b-row class="mx-3">
                    <label class="ml-1 m-0 p-0"></label>
                    <b-form-select	
                        v-model="vdInfo.impountLot"
                        :disabled="formPrinted"
                        @change="update"                        							
                        placeholder="Search for an Impound Lot Operator"
                        style="display: block;">
                            <b-form-select-option
                                v-for="lot,inx in impound_lot_operators" 
                                :key="'vd-lot-'+lot.name+inx"
                                :value="lot">
                                    {{lot.name}}, {{lot.lot_address}}, {{lot.city}}, {{lot.phone}}
                            </b-form-select-option>    
                    </b-form-select> 
                </b-row>

                <b-row class="mx-3">
                    <label class="ml-1 m-0 p-0"> Impound Lot Operator Name <span class="text-danger">*</span></label>
                    <b-form-input						
						:disabled="formPrinted"
						v-model="vdInfo.impountLot.name"
						@input="update"
						:state="vdState.impountLotName">
					</b-form-input> 
                </b-row>

                <b-row class="mx-3">
                    <b-col>
                        <label class="ml-1 m-0 p-0"> Public lot address <span class="text-danger">*</span></label>
                        <b-form-input
                            placeholder="Public lot address"
                            v-model="vdInfo.impountLot.lot_address"
                            :disabled="formPrinted"
                            @input="update"
                            :state="vdState.impoundLotAddress">
                        </b-form-input>                                
                    </b-col>
				<b-col >
					<label class="ml-1 m-0 p-0"> City <span class="text-danger">*</span></label>
					<b-form-input
						placeholder="City"
						v-model="vdInfo.impountLot.city"
						:disabled="formPrinted"
						@input="update"
						:state="vdState.impoundLotCity">
					</b-form-input>  
				</b-col>
				<b-col >					
					<label class="ml-1 m-0 p-0"> Public phone <span class="text-danger">*</span></label>
					<b-form-input
						placeholder="Public phone"
						v-model="vdInfo.impountLot.phone"
						:disabled="formPrinted"
						@input="update"
						:state="vdState.impoundLotPhone">
					</b-form-input>                             
				</b-col>
			</b-row>


                





            </b-card>
            <b-card no-body v-else>
                <b-row>   
                    <b-col cols="4"> 
                        <label class="ml-1 m-0 p-0"> Reason for not towing? <span class="text-danger">*</span></label>
                        <b-form-radio-group 
                            stacked
                            v-model="vdInfo.notImpoundingReason"                    
                            :options="notImpoundingOptions"
                            @change="update"
                            :disabled="formPrinted"
                            :state="vdState.notImpoundingReason">                   
                        </b-form-radio-group> 
                    </b-col>                
                </b-row> 
                <b-row v-if="vdInfo.notImpoundingReason == 'Released to other driver'" class="mx-3">
                    <b-col >
                        <label class="ml-1 m-0 p-0"> Vehicle Released To <span class="text-danger">*</span></label>
                        <b-form-input                            
                            v-model="vdInfo.vehicleReleasedTo"
                            :disabled="formPrinted"
                            @input="update"
                            :state="vdState.vehicleReleasedTo">
                        </b-form-input>                                
                    </b-col>
                    <b-col >
                        <label 
                            class="ml-1 m-0 p-0"> Date Released 
                            <span class="text-danger">*</span>
                            <span class="text-muted" style="font-size: 9pt;"> YYYYMMDD</span>
                        </label>
                        <b-input-group class="mb-3">
                            <b-form-input
                                :key="updateDate"
                                id="dr"
                                v-model="vdInfo.releasedDate"
                                type="text"
                                @input="validateDate(false)"
                                :disabled="formPrinted"
                                :state="vdState.releasedDate"
                                placeholder="YYYYMMDD"
                                autocomplete="off"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-form-datepicker
                                    v-model="dateReleased"
                                    :disabled="formPrinted"
                                    button-only
                                    right
                                    :allowed-dates="allowedDates"
                                    locale="en-US"
                                    aria-controls="dateReleased"
                                    @context="validateDate(true)"
                                ></b-form-datepicker>
                            </b-input-group-append>
                        </b-input-group>   
                        <div v-if="dateError" style="font-size:10pt;" class="text-danger text-left m-0 mt-n3 p-0">{{dateError}}</div>
                    </b-col>
                    <b-col>					
                        <label 
                            class="ml-1 m-0 p-0"> Time 
                            <span class="text-danger">*</span>
                            <span class="text-muted" style="font-size: 9pt;"> HHMM in Pacific Time</span>
                        </label>
                        <b-form-input
                            placeholder="HHMM"
                            v-model="vdInfo.impountLot.phone"
                            :disabled="formPrinted"
                            @input="update"
                            :state="vdState.impoundLotPhone">
                        </b-form-input>                             
                    </b-col>
                </b-row>
            </b-card>
		</b-card>
	</b-card>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import moment from 'moment-timezone';

import "@/store/modules/common";
const commonState = namespace("Common");

import "@/store/modules/forms/mv2906";
const mv2906State = namespace("MV2906");

import { impoundLotOperatorsInfoType, jurisdictionInfoType, provinceInfoType } from '@/types/Common';
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

    @commonState.State
    public impound_lot_operators: impoundLotOperatorsInfoType[];	

	@mv2906State.State
    public mv2906Info: twelveHourFormJsonInfoType;

	@Prop({required: true})
    vdInfo!: twelveHourFormDataInfoType;
	
	@Prop({required: true})
	vdState!: twelveHourFormStatesInfoType;

	dataReady = false;
    updateDate=0;
    dateReleased = '';
    dateError = '';
	error = '';
	path = '';
	formPrinted = false;

    responseOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

    keyLocationOptions = [
        {text: 'With vehicle', value: 'With vehicle'},
        {text: 'With driver', value: 'With driver'}
    ];

    notImpoundingOptions = [
        {text: 'Released to other driver', value: 'Released to other driver'},
        {text: 'Left at roadside', value: 'Left at roadside'}
    ];

	mounted() { 
        this.dataReady = false;				        
		this.formPrinted = Boolean(this.mv2906Info.printed_timestamp);
        this.extractFields();
        this.dataReady = true;
    }

	public extractFields(){
		
		this.path = 'forms/' + this.mv2906Info.form_type + '/' + this.mv2906Info.form_id + '/data'

	}

	public update(){
        this.recheckStates()
    }

	public recheckStates(){
        this.$emit('recheckStates')
    }

	public validateDate(datePicker?){
		if(datePicker){			
			let dateReleased=this.dateReleased.replace('-','')
			dateReleased=dateReleased.replace('-','')
			this.vdInfo.releasedDate=dateReleased
			this.updateDate++;
		}
		
		if(!this.vdInfo.releasedDate) return

		if(!Number(this.vdInfo?.releasedDate)||this.vdInfo?.releasedDate?.length!=8){
			this.dateError="The selected date is invalid!"
			this.vdState.releasedDate=false
		}
		else{ 
						
			const date = moment(this.vdInfo.releasedDate)
			const currentDate = moment() 
			
			
			if(!date.isValid()){
				this.dateError="The selected date is invalid!"
				this.vdState.releasedDate=false
			}
			else if(currentDate.format("YYYYMMDD")<this.vdInfo.releasedDate){
				this.dateError="The selected date is in the future!"
				this.vdState.releasedDate=false
			}			
			else{ 
				this.dateError=""
				if(!datePicker){
					const year = this.vdInfo.releasedDate.slice(0,4)
					const month = this.vdInfo.releasedDate.slice(4,6)
					const day = this.vdInfo.releasedDate.slice(6)
					this.dateReleased = year+'-'+month+'-'+day
				}
				this.vdState.releasedDate=null
			}
		}
		this.update();
	}

	public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');           
        return (date < day);           
    }
 
}
</script>




<style scoped>

</style>