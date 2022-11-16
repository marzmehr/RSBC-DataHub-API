<template>

	<b-card header-tag="header" bg-variant="gov-accent-grey" border-variant="light">
		<b-card-header header-bg-variant="light" header-border-variant="bright" header-text-variant="dark">            
			<b>Vehicle information</b>      
		</b-card-header>
		<b-card border-variant="bright" bg-variant="bright" text-variant="dark" class="my-2">
			<b-row>
				<b-col cols="3">
					<label class="ml-1 m-0 p-0"> Jurisdiction </label>
					<b-form-select		
						v-model="driverInfo.plateProvince"
						@change="update"
						:disabled="formPrinted"
						:state="mv2906InfoStates.plateProvince"
						placeholder="Search for a Jurisdiction"
						style="display: block;">
							<b-form-select-option
								v-for="jurisdiction,inx in jurisdictions" 
								:key="'jurisdiction-'+jurisdiction.objectCd+inx"
								:value="jurisdiction">
									{{jurisdiction.objectDsc}}
							</b-form-select-option>    
					</b-form-select>                          
				</b-col>
				<b-col class="pr-2" cols="4">
					<label class="ml-1 m-0 p-0"> Plate Number</label>
					<b-form-input
						v-model="driverInfo.plateNumber"
						:disabled="formPrinted"
                        :state="mv2906InfoStates.plateNumber"
						@change="update"
						placeholder="Plate">
					</b-form-input>                                
				</b-col>
				<b-col class="p-0 pt-1" cols="1">
					<b-button 
						class="bg-primary text-white mt-4"
						style="opacity:1;"
						:disabled="formPrinted || !displayIcbcPlateLookup"
						@click="triggerPlateLookup">
						<spinner 
							color="#FFF" 
							v-if="searchingLookup" 
							style="margin:0; padding: 0; transform:translate(-12px,-22px);"/>
						<b style="font-size: 0.875rem;">ICBC Prefill</b>
					</b-button>  
				</b-col>
			</b-row>
			<b-row>
				<b-col >
					<label class="ml-1 m-0 p-0"> Vehicle Year </label>
					<b-form-input>
					</b-form-input>                                
				</b-col>
				<b-col >
					<label class="ml-1 m-0 p-0"> Vehicle Make and Model </label>
					<b-form-input
					type="number">
					</b-form-input>  
				</b-col>
				
				<b-col >
					<label class="ml-1 m-0 p-0"> Vehicle Colour(s)</label>
					<b-form-select	
						v-model="driverInfo.vehicleColor"
						:disabled="formPrinted"
						@change="update"
						:state="mv2906InfoStates.vehicleColor"							
						placeholder="Search for a Province or State"
						style="display: block;">
							<b-form-select-option
								v-for="colour,inx in vehicleColours" 
								:key="'color-code-'+colour.code+inx"
								:value="colour">
									{{colour.displayName}}
							</b-form-select-option>    
					</b-form-select>                                 
				</b-col>
			</b-row>
			<b-row>				
				<b-col cols="3">
					<label class="ml-1 m-0 p-0"> Prov / State <span class="text-danger">*</span></label>
					<b-form-select							
						placeholder="Search for a Province or State"
						style="display: block;">
							<b-form-select-option
								v-for="province,inx in provinces" 
								:key="'province-'+province.objectCd+inx"
								:value="province">
									{{province.objectDsc}}
							</b-form-select-option>    
					</b-form-select>   
				</b-col>
				<b-col cols="7">
					<label class="ml-1 m-0 p-0"> Postal / Zip</label>
					<b-form-input>
					</b-form-input>                                 
				</b-col>
			</b-row>	
			<div class="fade-out alert alert-danger mt-4" v-if="error">{{error}}</div>			
		</b-card>
		

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

import { jurisdictionInfoType, provinceInfoType, vehicleColourInfoType, vehicleInfoType, vehicleStyleInfoType } from '@/types/Common';
import { twelveHourFormStatesInfoType, twelveHourFormDataInfoType, twelveHourFormJsonInfoType } from '@/types/Forms/MV2906';
import Spinner from "@/components/utils/Spinner.vue";
import {lookupDriverProvince} from "@/utils/lookups";
import dlScanner from "@/helpers/dlScanner";
import { lookupPlateFromICBC } from '@/utils/icbc';

@Component({
    components: {           
        Spinner
    }        
}) 
export default class VehicleInformationCard extends Vue {   

	@commonState.State
    public jurisdictions: jurisdictionInfoType[];

	@commonState.State
    public provinces: provinceInfoType[];

	@commonState.State
    public vehicles: vehicleInfoType[];

	@commonState.State
    public vehicle_styles: vehicleStyleInfoType[];

	@commonState.State
    public vehicleColours: vehicleColourInfoType[];
	
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

	public triggerPlateLookup(){		
		this.error = ''
		this.searchingLookup = true;
		lookupPlateFromICBC([this.mv2906Info.data.plateNumber, this.path ])
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

	get displayIcbcPlateLookup(){

        return this.mv2906Info.data.plateProvince.objectCd == "BC" && this.$store.state.isUserAuthorized;
    }

	public validateDate(){
		const validDate = true;
		if (validDate){
			this.age = moment().diff(moment(this.driverInfo.dob), 'years');			
		}
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
