<template>	
	<b-card header-tag="header" bg-variant="gov-accent-grey" border-variant="light">
		<b-card-header header-bg-variant="light" header-border-variant="bright" header-text-variant="dark">            
			<b>Driver's Information</b>      
		</b-card-header>
		<b-card border-variant="bright" bg-variant="bright" text-variant="dark" class="my-2">

			<b-row>
				<b-col class="pr-2" cols="2">
					<label class="m-0 p-0"> Driver's Licence Number</label>
					<b-form-input
						v-model="driverInfo.driversNumber"
						:disabled="formPrinted"
                        :state="mv2906InfoStates.driversNumber"
						@change="update"
						placeholder="Driver's Licence Number">
					</b-form-input>                                
				</b-col>
				<b-col class="p-0 pt-1" cols="1">
					<b-button 
						class="bg-primary text-white mt-4"
						style="opacity:1;"
						:disabled="formPrinted || !displayIcbcLicenceLookup"
						@click="triggerDriversLookup">
						<spinner color="#FFF" v-if="searchingLookup" style="margin:0; padding: 0; transform:translate(-12px,-22px);"/>
						<span style="font-size: 0.875rem;" v-else>ICBC Prefill</span>
					</b-button>  
				</b-col>
				<b-col class="p-0 pt-1" cols="1">
					<b-button 
						class="bg-primary text-white mt-4"
						style="opacity:1;"
						@click="launchDlScanner">
						<spinner color="#FFF" v-if="searchingDl" style="margin:0; padding: 0; transform:translate(-12px,-22px);"/>
						<span style="font-size: 0.875rem;" v-else>Scan DL</span>
					</b-button>  
				</b-col>
				<b-col cols="2">
					<label class="ml-1 m-0 p-0"> Prov / State / International </label>
					<b-form-select	
						v-model="driverInfo.driversLicenceJurisdiction"
						@change="update"
						:disabled="formPrinted"
						:state="mv2906InfoStates.driversLicenceJurisdiction"						
						placeholder="Search for a Jurisdiction"
						style="display: block;">
							<b-form-select-option
								v-for="jurisdiction in jurisdictions" 
								:key="jurisdiction.objectCd"
								:value="jurisdiction">
									{{jurisdiction.objectDsc}}
							</b-form-select-option>    
					</b-form-select>                          
				</b-col>
			</b-row>
			<b-row>
				<b-col >
					<label class="ml-1 m-0 p-0"> Last Name <span class="text-danger">*</span></label>
					<b-form-input
						placeholder="Last Name"
						v-model="driverInfo.lastName"
						:disabled="formPrinted"
						@change="update"
						:state="mv2906InfoStates.lastName">
					</b-form-input>                                
				</b-col>
				<b-col >
					<label class="ml-1 m-0 p-0"> Given Names </label>
					<b-form-input
						placeholder="Given Names"
						v-model="driverInfo.givenName"
						:disabled="formPrinted"
						@change="update"
						:state="mv2906InfoStates.givenName">
					</b-form-input>  
				</b-col>
				<b-col >
					<label class="ml-1 m-0 p-0"> Date of Birth <span class="text-muted" style="font-size: 9pt;">YYYYMMDD ({{age}} yrs)</span></label>
					
					<b-input-group class="mb-3">
						<b-form-input
							id="dob"
							v-model="driverInfo.dob"
							type="text"
							:disabled="formPrinted"
							placeholder="YYYYMMDD"
							autocomplete="off"
						></b-form-input>
						<b-input-group-append>
							<b-form-datepicker
								v-model="driverInfo.dob"
								:disabled="formPrinted"
								button-only
								right
								:allowed-dates="allowedDates"
								locale="en-US"
								aria-controls="dob"
								@change="update"
							></b-form-datepicker>
						</b-input-group-append>
					</b-input-group>                              
				</b-col>
			</b-row>
			<b-row>
				<b-col cols="8">					
					<label class="ml-1 m-0 p-0"> Address <span class="text-danger">*</span></label>
					<b-form-input
						placeholder="Address"
						:disabled="formPrinted"
						v-model="driverInfo.address"
						@change="update"
						:state="mv2906InfoStates.address">
					</b-form-input>
				</b-col>
				<b-col>
					<label class="ml-1 m-0 p-0"> Phone </label>
					<b-form-input						
						v-model="driverInfo.driverPhoneNumber"						
						@change="update"
						:disabled="formPrinted"
						:state="mv2906InfoStates.driverPhoneNumber">
					</b-form-input>  
					<div
                        v-if="(mv2906InfoStates.driverPhoneNumber != null)" 
                        style="font-size: 0.75rem; margin-top:-0.75rem;" 
                        class="bg-white text-danger is-invalid"><b-icon-exclamation-circle/>
                        Invalid Phone number. <i>(If you provide phone number, It must be valid e.g. 123-456-7890)</i>
                    </div> 

				</b-col>
			</b-row>
			<b-row>
				<b-col cols="6" >
					<label class="ml-1 m-0 p-0"> City <span class="text-danger">*</span></label>
					<b-form-input						
						v-model="driverInfo.driverCity"						
						@change="update"
						:disabled="formPrinted"
						:state="mv2906InfoStates.driverCity">
					</b-form-input>                                
				</b-col>
				<b-col cols="2">
					<label class="ml-1 m-0 p-0"> Prov / State <span class="text-danger">*</span></label>
					<b-form-select	
						v-model="driverInfo.driverProvince"
						:disabled="formPrinted"
						@change="update"
						:state="mv2906InfoStates.driverProvince"							
						placeholder="Search for a Province or State"
						style="display: block;">
							<b-form-select-option
								v-for="province in provinces" 
								:key="province.objectCd"
								:value="province">
									{{province.objectDsc}}
							</b-form-select-option>    
					</b-form-select>   
				</b-col>
				<b-col >
					<label class="ml-1 m-0 p-0"> Postal / Zip</label>
					<b-form-input						
						v-model="driverInfo.driverPostalCode"						
						@change="update"
						:disabled="formPrinted"
						:state="mv2906InfoStates.driverPostalCode">
					</b-form-input>                                  
				</b-col>
			</b-row>	
			<div class="fade-out alert alert-danger mt-4" v-if="error">{{error}}</div>			
		</b-card>

		<b-modal v-model="showScannerMessage" id="bv-modal-scanner" header-class="bg-warning text-light">            
			<template v-slot:modal-title>					               
				<h2 class="mb-0 text-light"> Driver's Licence Scanner </h2>                                 
			</template>
			<div v-if="scannerOpened">
				<div>Please scan the BC Driver's licence</div>
				<br />
				<b-spinner></b-spinner>

			</div>
			<div class="alert-warning pt-2 pb-2" v-if=" ! scannerOpened">
				<div>Requesting access to the scanner</div>
				<div class="small">
					{{ scannerMessage }}
				</div>
			</div>
			<template v-slot:modal-footer>
				<b-button 
					variant="primary" 
					@click="closeScannner()">
					Cancel
				</b-button>
			</template>            
			<template v-slot:modal-header-close>                 
				<b-button variant="outline-warning" class="text-light closeButton" @click="$bvModal.hide('bv-modal-scanner')"
				>&times;</b-button>
			</template>
		</b-modal>   
		

	</b-card>
	

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
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
import {lookupDriverFromICBC} from "@/utils/icbc";
import {lookupDriverProvince} from "@/utils/lookups";
import dlScanner from "@/helpers/dlScanner";

@Component({
    components: {           
        Spinner
    }        
}) 
export default class DriversInformationCard extends Vue {   

	@commonState.State
    public jurisdictions: jurisdictionInfoType[];

	@commonState.State
    public provinces: provinceInfoType[];
	
	@mv2906State.State
    public mv2906InfoStates: twelveHourFormStatesInfoType;

	@mv2906State.State
    public mv2906Info: twelveHourFormJsonInfoType;

	@mv2906State.Action
    public UpdateMV2906Info!: (newMV2906Info: twelveHourFormJsonInfoType) => void

	dataReady = false;
    driverInfo = {} as twelveHourFormDataInfoType;
	age = 0;
	error = '';
	path = '';
	showScannerMessage = false;
	scannerOpened = false;
	scannerMessage = '';
	searchingLookup = false;
	searchingDl = false;
	formPrinted = false;


	mounted() { 
        this.dataReady = false;
        this.driverInfo = this.mv2906Info.data;
		this.formPrinted = Boolean(this.mv2906Info.printedTimestamp);
        this.extractFields();
        this.dataReady = true;
    }

	public extractFields(){
		this.age = 0;
		this.path = 'forms/' + this.mv2906Info.form_type + '/' + this.mv2906Info.form_id + '/data'

	}

	public triggerDriversLookup(){
		console.log("inside triggerDriversLookup()")
		this.error = ''
		this.searchingLookup = true;
		lookupDriverFromICBC([this.path, this.mv2906Info.data.driversNumber])
			.then(() => {
				const data = this.$store.state.forms['12Hour'][this.mv2906Info.form_id]
				this.updateFormFields(data);
				this.searchingLookup = false;
			})
			.catch( error => {
				console.log("error", error)
				this.searchingLookup = false;
				this.error = error.description;
			})
	}

	public updateFormFields(data: any){
		this.driverInfo.driversNumber = data.number;		
        this.driverInfo.address = data['address']['street'];
        this.driverInfo.driverCity = data['address']['city'];
        this.driverInfo.driverPostalCode = data['address']['postalCode'];
        this.driverInfo.dob = data['dob'];
        this.driverInfo.givenName = data['name']['given'];
        this.driverInfo.lastName = data['name']['surname'];		
	}

	public handledScannedBarCode(event) {
		const { data, device, reportId } = event;
		dlScanner.readFromScanner(device, reportId, data)
		.then( dlData => {
			rsiStore.commit("populateDriverFromBarCode", dlData)
			this.updateFormFields(dlData)
			return dlData['address']['province']
		})
		.then( provinceCode => {
			lookupDriverProvince([this.path, provinceCode])
		})
		.then( () => {
			this.$bvModal.hide('dl-scanner')
		})
	}

	async launchDlScanner() {
      console.log('inside launchDlScanner')
      this.$bvModal.show('dl-scanner')

      const scanner = await dlScanner.openScanner();

      scanner.addEventListener("inputreport", this.handledScannedBarCode);

      this.scannerOpened = !!scanner.opened;

    }

	public closeScannner(){
		this.showScannerMessage = false;
	}

	public update(){     
		// console.log(this.driverInfo) 
		const mv2906 = this.mv2906Info
		mv2906.data = this.driverInfo
        this.UpdateMV2906Info(mv2906);
        this.recheckStates()
    }

	public recheckStates(){
        this.$emit('recheckStates')
    }

	get displayIcbcLicenceLookup(){

        return this.mv2906Info.data.driversLicenceJurisdiction.objectCd == "BC" && this.$store.state.isUserAuthorized;
    }

	public validateDate(){
		//TODO: ensure it's over 10 years old
		const validDate = true;
		if (validDate){
			this.age = moment().diff(moment(this.driverInfo.dob), 'years');			
		}
		this.update();
	}

	public allowedDates(date){
        const day = moment().startOf('day').format('YYYY-MM-DD');           
        return (date < day);           
    }
 
}
</script>

<style scoped lang="scss">

	.fade-out {
		animation: fadeOut ease 8s;
		-webkit-animation: fadeOut ease 8s;
		-moz-animation: fadeOut ease 8s;
		-o-animation: fadeOut ease 8s;
		-ms-animation: fadeOut ease 8s;
	}
	@keyframes fadeOut {
		0% {
			opacity:1;
		}
		100% {
			opacity:0;
		}
	}

	@-moz-keyframes fadeOut {
		0% {
			opacity:1;
		}
		100% {
			opacity:0;
		}
	}

	@-webkit-keyframes fadeOut {
		0% {
			opacity:1;
		}
		100% {
			opacity:0;
		}
	}

	@-o-keyframes fadeOut {
		0% {
			opacity:1;
		}
		100% {
			opacity:0;
		}
	}

	@-ms-keyframes fadeOut {
		0% {
			opacity:1;
		}
		100% {
			opacity:0;
		}
	}

</style>
