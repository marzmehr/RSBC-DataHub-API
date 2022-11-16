<template>
<form-card title="Vehicle information">
  <form-row>
    <jurisdiction-field id="plate_province" :path=path fg_class="col-sm-3">Jurisdiction</jurisdiction-field>
    <plate-number id="plate_number" :path=path fg_class="col-sm-6">Plate Number</plate-number>
  </form-row>
  <form-row>
    <text-field id="plate_year" :path=path rules="plate_year" fg_class="col-sm-4">Plate Year</text-field>
    <text-field id="plate_val_tag" :path=path input_type="number" fg_class="col-sm-4">Plate Val Tag</text-field>
    <text-field id="registration_number" :path=path fg_class="col-sm-4">Registration Number</text-field>
  </form-row>
  <form-row>
    <vehicle-year :path=path rules="vehicleYear" fg_class="col-sm-2">Vehicle Year</vehicle-year>
    <vehicle-make-model :path="path" fg_class="col-sm-3"></vehicle-make-model>
    <vehicle-style :path=path fg_class="col-sm-4"></vehicle-style>
    <vehicle-colour :path=path fg_class="col-sm-3"></vehicle-colour>
  </form-row>
	<form-row>
		<text-field id="vin_number" :path=path fg_class="col-sm-5" rules="max:20">VIN Number</text-field>
		<province-field id="puj_code" :path=path fg_class="col-sm-3" :default-to-bc=false>NSC Prov / State</province-field>
		<text-field id="nsc_number" :path=path fg_class="col-sm-4" rules="max:14">NSC Number</text-field>
	</form-row>
	<b-card header-tag="header" bg-variant="gov-accent-grey" border-variant="light" class="mx-auto">
		<b-card-header header-bg-variant="light" header-border-variant="secondary" header-text-variant="dark">            
			<b>Vehicle information</b>      
		</b-card-header>
		<b-card border-variant="light" bg-variant="light" class="my-2">

			<b-row>				
				
				<b-col cols="3">
					<label class="ml-1 m-0 p-0"> Jurisdiction </label>
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
				<b-col class="pr-2" cols="4">
					<label class="ml-1 m-0 p-0"> Plate Number</label>
					<b-form-input
						placeholder="Plate">
					</b-form-input>                                
				</b-col>
				<b-col class="p-0 pt-1" cols="1">
					<b-button 
						class="bg-primary text-white mt-4"
						style="opacity:1;"
						@click="triggerPlateLookup">
						<b style="font-size: 0.875rem;">ICBC Prefill</b>
					</b-button>  
				</b-col>
			</b-row>
			<b-row>
				<b-col >
					<label class="ml-1 m-0 p-0"> Plate Year </label>
					<b-form-input>
					</b-form-input>                                
				</b-col>
				<b-col >
					<label class="ml-1 m-0 p-0"> Plate Val Tag </label>
					<b-form-input
					type="number">
					</b-form-input>  
				</b-col>
				<b-col >
					<label class="ml-1 m-0 p-0"> Registration Number</label>
					<b-form-input>
					</b-form-input>                                 
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
					<label class="ml-1 m-0 p-0"> Vehicle Style</label>
					<b-form-input>
					</b-form-input>                                 
				</b-col>
				<b-col >
					<label class="ml-1 m-0 p-0"> Vehicle Colour(s)</label>
					<b-form-input>
					</b-form-input>                                 
				</b-col>
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
  name: "VehicleInformationCard",
  mixins: [CardsCommon],
}
</script>

<style scoped>

</style>