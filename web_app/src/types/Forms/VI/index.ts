/* eslint-disable @typescript-eslint/class-name-casing */

import { cityInfoType, impoundLotOperatorsInfoType, jurisdictionInfoType, provinceInfoType, vehicleColourInfoType, vehicleInfoType } from "@/types/Common";

export interface viFormInfoType {
    component: string;
    form_type: string;
    form_id: string;
    full_name: string;
    label: string;
    lease_expiry: string;
    description: string;
    fullName: string;
    documents: viFormDocumentsInfoType;
    disabled: boolean;
    check_digit: boolean;
    printed_timestamp: string;
    data?: viFormDataInfoType;
}

export interface viFormDocumentsInfoType {
    all: viFormAllDocumentsInfoType;
}

export interface viFormAllDocumentsInfoType {
    name: string;
    reprint: boolean;
    variants: string[];
}


export interface viFormDataInfoType {
    
    ownerFirstName?: string;
    ownerLastName?: string;
    ownerDob?: string;
    ownerOrganization?: boolean;
    ownerOrganizationName?: string;
    //corp_owner_false {owner_dob:string; owners_first_name: string; owners_last_name:string }
    //corp_owner_true {name: string;}

    ownerAddress?: string; //owners_address1:"123 st"
    ownerCity?: string; //owners_city:"Victoria"
    ownerEmail?: string; //owners_email?: string
    ownerPhoneNumber?: string; //owners_phone:"435-345-6465"
    ownerPostalCode?: string; //owners_postal:"V0F 0F1"
    ownerProvince?: string; //owners_province:provinceInfoType;
    driverIsOwner?: boolean;
    //driver_is_owner_true
    //driver_is_owner_false
    dlClass?: string; //dl_class: string;
    driver_gender: string; //driver_gender: string; // 
    driversNumber?: string;//drivers_number?: string;
    dlExpiryYear?: string;//expiry_year
    givenName: string; //first_name: string;
    lastName: string; //last_name: string;
    dob: string;
    driversLicenceJurisdiction: jurisdictionInfoType; //drivers_licence_jurisdiction: jurisdictionInfoType;
   
    plateProvince: provinceInfoType;//plate_province: provinceInfoType;
    plateNumber: string; //plate_number: string;

    registrationNumber: string; //registration_number
    vehicleYear: string; //vehicle_year: string;
    vehicleMake: vehicleInfoType; //vehicle_make: vehicleInfoType;
    vehicleColor: vehicleColourInfoType[]; //vehicle_color: vehicleColourInfoType[];

    vin_number?: string;


    impountLot?: impoundLotOperatorsInfoType; //impound_lot_operator: impoundLotOperatorsInfoType;
    impoundedDate?: string //impounded_dt
    incidentDetails: string; //incident_details: string;

    offenceAddress: string; //offence_address: string;
    offenceCity: cityInfoType; //offence_city: cityInfoType;
    agencyFileNumber: string; //file_number: string;
    prohibitionStartDate: string; //prohibition_start_date: string;
    prohibitionStartTime: string; //prohibition_start_time: string;

    agency: string;
    badge_number: string;
    officer_name: string;

    submitted: boolean;

    isNSC?:boolean //  is_nsc_nsc: {}

    irp?: boolean;
    iprNumber?: string
    irpType?: string
    // irp_yes{
    //     duration_3-day
    //     duration_7-day
    //     duration_30-day
    //     ipr_number     
    // }
    //irp_no

    linkage?: string[] //
    keyLinkageLocation?: string; //
    // linkage_keys_true{ note: string }
    // linkage_other_true
    // linkage_owner_aware_true
    // linkage_owner_within_true
    // linkage_principal_operator_true
    // linkage_transfer_true

    impoundReason?: string[]; //Excessive Speed||￼Prohibited||Suspended ||Street Racing||Stunt Driving||Motorcycle (seating) ||Motorcycle (restrictions) ||Unlicensed (UL) 
    excessiveSpeedConfirmationType?: string;//Laser||Radar||Other 
    excessiveSpeedEstimationType?: string; // Visual ||Pacing 
    unlicensedBcResident?: boolean;
    unlicensedProhibitionNumber?: string; 
    // reason_excessive_speed_true{
    //     speed_confirmed_other:{},
    //     speed_confirmed_radar:{},
    //     speed_confirmed_laser:{},
    //     speed_estimated_visual:{},
    //     speed_estimated_pacing:{},
    //     speed_limit: string;
    //     vehicle_speed: string;
    // },
    // reason_motorcycle_restrictions_true:{},
    // reason_motorcycle_seating_true:{},
    // reason_prohibited_true:{},
    // reason_racing_true:{},
    // reason_stunt_true:{},
    // reason_suspended_true:{},
    // reason_unlicensed_true{
    //     suspected_bc_resident_no:{},
    //     suspected_bc_resident_yes:{},
    //     ul_prohibition_number: string,
    // },


}