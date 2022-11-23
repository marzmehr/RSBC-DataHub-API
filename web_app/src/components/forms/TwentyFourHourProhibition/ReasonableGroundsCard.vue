<template>
    <b-card v-if="dataReady" header-tag="header" bg-variant="gov-accent-grey" border-variant="light" >		
		<b-card-header header-bg-variant="light" header-border-variant="bright" header-text-variant="dark">            
			<b>Reasonable Grounds</b>      
		</b-card-header>
		<b-card v-if="rgInfo.prohibitionType.length > 0" border-variant="light" bg-variant="time" text-variant="dark" class="my-0">

            <b-row>   
                <b-col cols="10"> 
                    <label class="ml-1 m-0 p-0"> 
                        The driver was operating a motor vehicle or had care and 
                        control of a motor vehicle for the purposes of MVA section 
                        215(1) based on (select at least one):
                    </label>
                    <b-form-checkbox-group 
                        stacked
                        v-model="rgInfo.reasonableGrounds"                    
                        :options="reasonableGroundsOptions"
                        @change="update"
						:disabled="formPrinted"
						:state="rgState.reasonableGrounds">                   
                    </b-form-checkbox-group> 
                </b-col>                
            </b-row>

			<b-row v-if="rgInfo.reasonableGrounds.includes('Other')">   
                <b-col>
                    <label class="ml-1 m-0 p-0"> Other </label>
                    <b-form-input
                        v-model="rgInfo.reasonableGroundsOther"
                        :disabled="formPrinted"
                        @input="update"
                        :state="rgState.reasonableGroundsOther">
                    </b-form-input> 
				</b-col>  
                             
            </b-row>

            <b-row>   
                <b-col cols="4"> 
                    <label class="ml-1 m-0 p-0"> Was a prescribed test used to form reasonable grounds?</label>
                    <b-form-radio-group 
                        stacked
                        v-model="rgInfo.prescribedTest"                    
                        :options="responseOptions"
                        @change="update"
						:disabled="formPrinted"
						:state="rgState.prescribedTest">                   
                    </b-form-radio-group> 
                </b-col>                
            </b-row>            
            <b-row v-if="rgInfo.prescribedTest" class="mx-3"> 
                <b-col cols="4">
                    <label 
                        class="ml-1 m-0 p-0"> Date of test  
                        <span class="text-danger">*</span>
                        <span class="text-muted" style="font-size: 9pt;"> YYYYMMDD</span>
                    </label>
                    <b-input-group class="mb-3">
                        <b-form-input
                            :key="updateDate"
                            id="prohibition-state-date"
                            v-model="rgInfo.prescribedTestDate"
                            type="text"
                            @input="validateDate(false)"
                            :disabled="formPrinted"
                            :state="rgState.prescribedTestDate"
                            placeholder="YYYYMMDD"
                            autocomplete="off"
                        ></b-form-input>
                        <b-input-group-append>
                            <b-form-datepicker
                                v-model="prescribedTestDate"
                                :disabled="formPrinted"
                                button-only
                                right
                                :allowed-dates="allowedDates"
                                locale="en-US"
                                aria-controls="prescribedTestDate"
                                @context="validateDate(true)"
                            ></b-form-datepicker>
                        </b-input-group-append>
                    </b-input-group>   
                    <div v-if="dateError" style="font-size:10pt;" class="text-danger text-left m-0 mt-n3 p-0">{{dateError}}</div>
                </b-col>
                <b-col cols="4">					
                    <label 
                        class="ml-1 m-0 p-0"> Time 
                        <span class="text-danger">*</span>
                        <span class="text-muted" style="font-size: 9pt;"> HHMM in Pacific Time</span>
                    </label>
                    <b-form-input
                        placeholder="HHMM"
                        v-model="rgInfo.prescribedTestTime"
                        :disabled="formPrinted"
                        @input="update"
                        :state="rgState.prescribedTestTime">
                    </b-form-input>                             
                </b-col>
            </b-row>

            <b-row v-else-if="rgInfo.prescribedTest != null" >   
                <b-col cols="6"> 
                    <label class="ml-1 m-0 p-0"> Why was a prescribed test not used?</label>
                    <b-form-radio-group 
                        stacked
                        v-model="rgInfo.prescribedNoTestReason"                    
                        :options="prescribedTestNotUsedOptions"
                        @change="update"
						:disabled="formPrinted"
						:state="rgState.prescribedNoTestReason">                   
                    </b-form-radio-group> 
                </b-col>                
            </b-row> 


		</b-card>
	</b-card>

</template>


<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from "vuex-class";
import moment from 'moment-timezone';

import "@/store/modules/forms/mv2634";
const mv2634State = namespace("MV2634");

import { twentyFourHourFormStatesInfoType, twentyFourHourFormDataInfoType, twentyFourHourFormJsonInfoType } from '@/types/Forms/MV2634';
import Spinner from "@/components/utils/Spinner.vue";

@Component({
    components: {           
        Spinner
    }        
}) 
export default class ReasonableGroundsCard extends Vue {	

	@mv2634State.State
    public mv2634Info: twentyFourHourFormJsonInfoType;

	@Prop({required: true})
    rgInfo!: twentyFourHourFormDataInfoType;
	
	@Prop({required: true})
	rgState!: twentyFourHourFormStatesInfoType;

	dataReady = false;
    updateDate=0;
    prescribedTestDate = '';
    dateError = '';
	error = '';
	path = '';
	formPrinted = false;    

    reasonableGroundsOptions = [
        {text: 'Witnessed by officer', value: 'Witnessed by officer'},
        {text: 'Admission by driver', value: 'Admission by driver'},
		{text: 'Independent witness', value: 'Independent witness'},
        {text: 'Video surveillance', value: 'Video surveillance'},
        {text: 'Other', value: 'Other'}
    ];

	responseOptions = [
        {text: 'Yes', value: true},
        {text: 'No', value: false}
    ];

	prescribedTestNotUsedOptions = [
        {text: 'Refused by driver', value: 'Refused by driver'},
        {
			text: 'Opinion formed the driver was affected by alcohol and/or drugs', 
			value: 'Opinion formed the driver was affected by alcohol and/or drugs'
		}
    ];

	mounted() { 
        this.dataReady = false;				        
		this.formPrinted = Boolean(this.mv2634Info.printed_timestamp);        
        this.dataReady = true;
    }	

	public update(){
        this.recheckStates()
    }

	public recheckStates(){
        this.$emit('recheckStates')
    }

	public validateDate(datePicker?){
		if(datePicker){			
			let prescribedTestDate=this.prescribedTestDate.replace('-','')
			prescribedTestDate=prescribedTestDate.replace('-','')
			this.rgInfo.prescribedTestDate=prescribedTestDate
			this.updateDate++;
		}
		
		if(!this.rgInfo.prescribedTestDate) return

		if(!Number(this.rgInfo?.prescribedTestDate)||this.rgInfo?.prescribedTestDate?.length!=8){
			this.dateError="The selected date is invalid!"
			this.rgState.prescribedTestDate=false
		}
		else{ 
						
			const date = moment(this.rgInfo.prescribedTestDate)
			const currentDate = moment() 
			
			
			if(!date.isValid()){
				this.dateError="The selected date is invalid!"
				this.rgState.prescribedTestDate=false
			}
			else if(currentDate.format("YYYYMMDD")<this.rgInfo.prescribedTestDate){
				this.dateError="The selected date is in the future!"
				this.rgState.prescribedTestDate=false
			}			
			else{ 
				this.dateError=""
				if(!datePicker){
					const year = this.rgInfo.prescribedTestDate.slice(0,4)
					const month = this.rgInfo.prescribedTestDate.slice(4,6)
					const day = this.rgInfo.prescribedTestDate.slice(6)
					this.prescribedTestDate = year+'-'+month+'-'+day
				}
				this.rgState.prescribedTestDate=null
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