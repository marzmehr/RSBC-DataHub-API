/* eslint-disable @typescript-eslint/class-name-casing */

import { cityInfoType, impoundLotOperatorsInfoType, jurisdictionInfoType, provinceInfoType, vehicleColourInfoType, vehicleInfoType, vehicleStyleInfoType } from "@/types/Common";

export interface twentyFourHourFormInfoType {
    component: string;
    form_type: string;
    form_id: string;
    full_name: string;
    label: string;
    lease_expiry: string;
    description: string;
    fullName: string;
    documents: twentyFourHourFormDocumentsInfoType;
    disabled: boolean;
    check_digit: boolean;
    printed_timestamp: string;
    data?: twentyFourHourFormDataInfoType;
}

export interface twentyFourHourFormDocumentsInfoType {
    all: twentyFourHourFormAllDocumentsInfoType;
}

export interface twentyFourHourFormAllDocumentsInfoType {
    name: string;
    reprint: boolean;
    variants: string[];
}

export interface twentyFourHourFormDataInfoType {
    
    ownerFirstName?: string;
    ownerLastName?: string;
    ownerOrganization?: boolean;
    ownerOrganizationName?: string;
    //corp_owner_false {owners_first_name: string; owners_last_name:string }
    //corp_owner_true {name: string;}

    ownerAddress?: string; //owners_address1:"123 st"
    ownerCity?: string; //owners_city:"Victoria"
    ownerPhoneNumber?: string; //owners_phone:"435-345-6465"
    ownerPostalCode?: string; //owners_postal:"V0F 0F1"
    ownerProvince?: string; //owners_province:provinceInfoType;


    driversNumber?: string;//drivers_number?: string;
    givenName: string; //first_name: string;
    lastName: string; //last_name: string;
    dob: string;
    driversLicenceJurisdiction: jurisdictionInfoType; //drivers_licence_jurisdiction: jurisdictionInfoType;
    address: string// address1: string;    

    driverCity: string; //city: string;

    driverProvince?: provinceInfoType; //province: provinceInfoType;
    driverPostalCode: string; //postal: string;
    plateProvince: provinceInfoType;//plate_province: provinceInfoType;
    plateNumber: string; //plate_number: string;
    plateValTag?: string;//plate_val_tag: string;
    plateYear?: string; //plate_year: string;
    puj_code: provinceInfoType;
    nscNumber: string; //nsc_number: string;
    registrationNumber: string; //registration_number
    vehicleYear: string; //vehicle_year: string;
    vehicleMake: vehicleInfoType; //vehicle_make: vehicleInfoType;
    vehicleColor: vehicleColourInfoType[]; //vehicle_color: vehicleColourInfoType[];
    vehicleType: vehicleStyleInfoType;// vehicle_type: vehicleStyleInfoType;
    vin_number?: string;

    vehicleImpounded: boolean; 
    impountLot?: impoundLotOperatorsInfoType;
    locationOfKeys?: string; // With vehicle￼|| With driver
    notImpoundingReason?: string; //Released to other driver || Left at roadside || Private tow || Seized for investigation
    releasedDate?: string;
    releasedTime?: string;
    vehicleReleasedTo?: string;
    // vehicle_impounded_yes?:{
    //     impounded_lot_operator: impoundLotOperatorsInfoType;
    //     location_of_keys_vehicle: string;        
    // } ;

    // vehicle_impounded_no?: {
    //    reason_for_not_impounding_roadside,
    //    reason_for_not_impounding_private,
    //    reason_for_not_impounding_investigation,
    //    reason_for_not_impounding_released:
    //    {
    //      released_date: string;
    //      released_time: string;
    //      vehicle_released_to: string;
    //    }
    // };

    offenceAddress: string; //offence_address: string;
    offenceCity: cityInfoType; //offence_city: cityInfoType;
    agencyFileNumber: string; //file_number: string;
    prohibitionStartDate: string; //prohibition_start_date: string;
    prohibitionStartTime: string; //prohibition_start_time: string;

    agency: string;
    badge_number: string;
    officer_name: string;

    submitted: boolean;
    reasonableGrounds: string[]; //Witnessed by officer || Admission by driver || ￼Independent witness || Video surveillance || Other
    reasonableGroundsOther?: string;
    //operating_grounds_admission
    //operating_grounds_officer
    //operating_grounds_other:{operating_ground_other}
    //operating_grounds_video
    //operating_grounds_witness

    prescribedTest?: boolean;
    prescribedTestDate?: string;
    prescribedTestTime?: string;
    prescribedNoTestReason?: string;
    //prescribed_device_yes {test_date, test_time}
    //prescribed_device_no {reason_prescribed_test_not_used:string} //Refused by driver ||Opinion formed the driver was affected by alcohol and/or drugs

    prohibitionType: string; //Drugs || Alcohol 
    //prohibition_type_drugs?: any; 
    //prohibition_type_alcohol?: {
    //  test_administered_sfst,
    //  test_administered_instrument: {test_result_bac: string},
    //  test_administered_asd: {asd_expiry_date,  result_alcohol_under, result_alcohol_over }
    //}    
    alcoholTest?: string;// Alco-Sensor FST (ASD) || Approved Instrument || Prescribed Physical Coordination Test (SFST)
    asd?: {
        expiryDate :string;
        result?: string; //under || over
    }
    BacResult?: string;
    // prohibition_type_drugs{
    //     test_administered_adse {positive_adse_cocaine, positive_adse_thc},
    //     test_administered_sfst,
    //     test_administered_dre
    // }
    drugsTest?: string;//Approved Drug Screening Equipment || Prescribed Physical Coordination Test (SFST) || Prescribed Physical Coordination Test (DRE)
    approvedDrugScreeningEquipment?: string[]; //THC ||/&& Cocaine


}