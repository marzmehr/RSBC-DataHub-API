import { jurisdictionInfoType, provinceInfoType } from "@/types/Common";

/* eslint-disable @typescript-eslint/class-name-casing */
export interface twelveHourFormDataInfoType {
    agency: string;
    badgeNumber: string;
    driversLicenceJurisdiction: jurisdictionInfoType;
    officerName: string;
    plateProvince: provinceInfoType;
    province: provinceInfoType;
    submitted: boolean;
    vehicleColor: string[];
}

export interface twelveHourFormJsonInfoType {
    component: string;
    formType: string;
    label: string;
    description: string;
    data?: twelveHourFormDataInfoType;
    fullName: string;
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
    agency: null | boolean;
    badgeNumber: null | boolean;
    driversLicenceJurisdiction: null | boolean;
    officerName: null | boolean;
    plateProvince: null | boolean;
    province: null | boolean;
    submitted: null | boolean;
    vehicleColor: null | boolean;
}