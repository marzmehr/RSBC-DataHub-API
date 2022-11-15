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
    // plateValTag: string;
    // plateYear: string;
    nscProvince: string;
    nscNumber: string;
    registrationNumber: string;
    // vehicleStyle: vehicleStyleInfoType;
    vehicleYear: string;
    vehicleMake: vehicleInfoType;
    vehicleColor: string[];
    // vinNumber: string;
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
    // plateValTag: null | boolean; 
    // plateYear: null | boolean; 
    nscProvince: null | boolean; 
    nscNumber: null | boolean; 
    registrationNumber: null | boolean; 
    vehicleYear: null | boolean;
    // vehicleStyle: null | boolean; 
    vehicleMake: null | boolean; 
    vehicleColor: null | boolean;
    // vinNumber: null | boolean; 
    province: null | boolean;
    submitted: null | boolean;    
}