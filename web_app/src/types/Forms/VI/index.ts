/* eslint-disable @typescript-eslint/class-name-casing */

export interface viFormInfoType {
    component: string;
    formType: string;
    label: string;
    description: string;
    fullName: string;
    documents: viFormDocumentsInfoType;
    disabled: boolean;
    adminOnly: boolean;
    showCertificate: boolean;
    checkDigit: boolean;
}

export interface viFormDocumentsInfoType {
    all: viFormAllDocumentsInfoType;
}

export interface viFormAllDocumentsInfoType {
    name: string;
    reprint: boolean;
    variants: string[];
}