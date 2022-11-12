/* eslint-disable @typescript-eslint/class-name-casing */

export interface twentyFourHourFormInfoType {
    component: string;
    formType: string;
    label: string;
    description: string;
    fullName: string;
    documents: twentyFourHourFormDocumentsInfoType;
    disabled: boolean;
    adminOnly: boolean;
    showCertificate: boolean;
    checkDigit: boolean;
}

export interface twentyFourHourFormDocumentsInfoType {
    all: twentyFourHourFormAllDocumentsInfoType;
}

export interface twentyFourHourFormAllDocumentsInfoType {
    name: string;
    reprint: boolean;
    variants: string[];
}