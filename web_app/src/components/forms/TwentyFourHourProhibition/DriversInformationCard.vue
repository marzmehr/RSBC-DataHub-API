<template>
	<form-card title="Driver's Information">
		<form-row>
		<driver-licence-number id="drivers_number" :path="path"  :rules="bcdlNumberRules">Driver's Licence Number</driver-licence-number>
		<jurisdiction-field id="drivers_licence_jurisdiction" :path=path fg_class="col-sm-3">Prov / State / International</jurisdiction-field>
		</form-row>
		<form-row>
		<text-field id="last_name" :path=path fg_class="col-sm-4" placeholder="Last Name" rules="required|max:20">Last Name</text-field>
		<text-field id="first_name" :path=path fg_class="col-sm-4" placeholder="Given Names" rules="max:20">Given Names</text-field>
		<dob-field id="dob" :path=path fg_class="col-sm-4">Date of Birth</dob-field>
		</form-row>
		<form-row>
		<text-field id="address1" :path=path fg_class="col-sm-12" placeholder="Address" rules="required|max:25">Address</text-field>
		</form-row>
		<form-row>
		<text-field id="city" :path=path fg_class="col-sm-6" rules="required|max:15">City</text-field>
		<province-field id="province" :path=path fg_class="col-sm-2" rules="required">Prov / State</province-field>
		<text-field id="postal" :path=path fg_class="col-sm-4">Postal / Zip</text-field>
		</form-row>

		<b-card header-tag="header" bg-variant="gov-accent-grey" border-variant="light" class="mx-auto">
			<b-card-header header-bg-variant="light" header-border-variant="secondary" header-text-variant="dark">            
				<b>Driver's Information</b>      
			</b-card-header>
			<b-card border-variant="light" bg-variant="light" class="my-2">

				<b-row>
					<b-col class="pr-2" cols="2">
						<label class="ml-1 m-0 p-0"> Driver's Licence Number</label>
						<b-form-input
							placeholder="Driver's Licence Number">
						</b-form-input>                                
					</b-col>
					<b-col class="p-0 pt-1" cols="1">
						<b-button 
							class="bg-primary text-white mt-4"
							style="opacity:1;"
							@click="triggerDriversLookup">
							<span style="font-size: 0.875rem;">ICBC Prefill</span>
						</b-button>  
					</b-col>
					<b-col class="p-0 pt-1" cols="1">
						<b-button 
							class="bg-primary text-white mt-4"
							style="opacity:1;"
							@click="launchDlScanner">
							<span style="font-size: 0.875rem;">Scan DL</span>
						</b-button>  
					</b-col>
					<b-col cols="2">
						<label class="ml-1 m-0 p-0"> Prov / State / International </label>
						<b-form-select							
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
						<b-form-input>
						</b-form-input>                                
					</b-col>
					<b-col >
						<label class="ml-1 m-0 p-0"> Given Names </label>
						<b-form-input>
						</b-form-input>  
					</b-col>
					<b-col >
						<label class="ml-1 m-0 p-0"> Date of Birth <span class="text-secondary" style="font-size: 9pt;">YYYYMMDD</span>{{age}}</label>
						<b-form-input
							@change="validateDate"
							type="date"
							placeholder="YYYYMMDD">
						</b-form-input>                                 
					</b-col>
				</b-row>
				<b-row class="px-4">					
					<label class="ml-1 m-0 p-0"> Address <span class="text-danger">*</span></label>
					<b-form-input>
					</b-form-input>
				</b-row>
				<b-row>
					<b-col cols="6" >
						<label class="ml-1 m-0 p-0"> City <span class="text-danger">*</span></label>
						<b-form-input>
						</b-form-input>                                
					</b-col>
					<b-col cols="2">
						<label class="ml-1 m-0 p-0"> Prov / State <span class="text-danger">*</span></label>
						<b-form-select							
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
						<b-form-input>
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
			
	</form-card>
</template>

<script>
import CardsCommon from "@/components/forms/CardsCommon";
export default {
  name: "DriversInformationCard",
  mixins: [CardsCommon],
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
