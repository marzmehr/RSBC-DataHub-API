import { jurisdictionInfoType, provinceInfoType, vehicleInfoType, vehicleStyleInfoType } from "@/types/Common";

/* eslint-disable @typescript-eslint/class-name-casing */
export interface twelveHourFormDataInfoType {
    
    driversNumber?: string;
    givenName: string;
    lastName: string;
    dob: string;
    driversLicenceJurisdiction: jurisdictionInfoType;
    address: string;
    driverPhoneNumber?: string;
    driverCity: string;
    driverProvince?: provinceInfoType;
    driverPostalCode: string;
    plateProvince: provinceInfoType;
    plateNumber: string;    
    nscProvince: provinceInfoType;
    nscNumber: string;
    registrationNumber: string;   
    vehicleYear: string;
    vehicleMake: vehicleInfoType;
    vehicleColor: string[];
    vehicleTowed: boolean;    
    keysOnVehicle?: boolean;
    impountLotName?: string;
    impoundLotAddress?: string;
    impoundLotCity?: string;
    impoundLotPhone?: string;
    notTowingReasonOtherDriver?: boolean;
    otherDriverName?: string;
    releasedDate?: string;
    releasedTime?: string;
    prohibitionAlcohol: boolean;
    offenceAddress: string;
    offenceCity: string;
    agencyFileNumber: string;
    offenceDate: string;
    offenceTime: string;
    agency: string;
    badgeNumber: string;
    officerName: string;
    province: provinceInfoType;
    submitted: boolean;    
}

export interface twelveHourFormJsonInfoType {
    component: string;
    form_type: string;
    form_id: string;
    label: string;
    lease_expiry: string;
    description: string;
    data?: twelveHourFormDataInfoType;
    full_name: string;
    printedTimestamp: string;
    documents: twelveHourFormDocumentsInfoType;
    disabled: boolean;
    adminOnly: boolean;
    showCertificate: boolean;
    checkDigit: boolean;
}

export interface twelveHourFormDocumentsInfoType {
    all: twelveHourFormAllDocumentsInfoType;
}

export interface twelveHourFormAllDocumentsInfoType {
    name: string;
    reprint: boolean;
    variants: string[];
}

export interface twelveHourFormStatesInfoType {
    driversNumber: null | boolean;
    givenName: null | boolean;
    lastName: null | boolean;
    dob: null | boolean;   
    address: null | boolean;
    driverPhoneNumber: null | boolean;
    driverCity: null | boolean;
    driverProvince: null | boolean;
    driverPostalCode: null | boolean;
    agency: null | boolean;
    badgeNumber: null | boolean;
    driversLicenceJurisdiction: null | boolean;
    officerName: null | boolean;
    plateProvince: null | boolean;    
    plateNumber: null | boolean;
    nscProvince: null | boolean; 
    nscNumber: null | boolean; 
    registrationNumber: null | boolean; 
    vehicleYear: null | boolean;
    vehicleMake: null | boolean; 
    vehicleColor: null | boolean;
    vehicleTowed: null | boolean;    
    keysOnVehicle: null | boolean;
    impountLotName: null | boolean;
    impoundLotAddress: null | boolean;
    impoundLotCity: null | boolean;
    impoundLotPhone: null | boolean;
    notTowingReasonOtherDriver: null | boolean;
    otherDriverName: null | boolean;
    releasedDate: null | boolean;
    releasedTime: null | boolean;
    prohibitionAlcohol: null | boolean;
    offenceAddress: null | boolean;
    offenceCity: null | boolean;
    agencyFileNumber: null | boolean;
    offenceDate: null | boolean;
    offenceTime: null | boolean;    
    province: null | boolean;
    submitted: null | boolean;    
}