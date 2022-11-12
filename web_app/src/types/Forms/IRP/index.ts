/* eslint-disable @typescript-eslint/class-name-casing */

export interface irpFormInfoType {
    component: string;
    formType: string;
    label: string;
    description: string;
    fullName: string;
    documents: irpFormDocumentsInfoType;
    disabled: boolean;
    adminOnly: boolean;
    showCertificate: boolean;
    checkDigit: boolean;
}

export interface irpFormDocumentsInfoType {
    all: irpFormAllDocumentsInfoType;
}

export interface irpFormAllDocumentsInfoType {
    name: string;
    reprint: boolean;
    variants: string[];
}