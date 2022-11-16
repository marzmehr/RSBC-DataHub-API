import Vue from 'vue'

Vue.filter('verifyPhone', function(phone){	
    const phoneFormat = /^[0-9]{3}[-. ][0-9]{3}[-. ][0-9]{4}((\s\x[0-9]{4})|)?$/;
    return phoneFormat.test(phone?.trim())
})

Vue.filter('verifyPostCode', function(postcode, stateCd){

    const statesCAN=["ALTA","BC","MAN","NB","NFLD","NS","NVT","NWT","ONT","PEI","QUE","SASK","YT"]
    const statesOTH=["UK","OTH","MX","INTL","EUR"]
    const postcodeFormatUSA = /(^\d{5}?$)|(^\d{5}-\d{4}?$)/;	
    const postcodeFormatCAN = /^(([A-Z][0-9][A-Z] [0-9][A-Z][0-9])|([a-z][0-9][a-z] [0-9][a-z][0-9]))?$/;

    if(statesCAN.includes(stateCd))
        return postcodeFormatCAN.test(postcode?.trim())
    if(statesOTH.includes(stateCd))
        return true
    else
        return postcodeFormatUSA.test(postcode?.trim())
})

Vue.filter('printPdf', function(html){
    

    const body = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>		
        <meta charset="UTF-8">
        <title>Court Of Appeal</title>`+
        `<style>`+
            `@page {
                size: 11in  8.5in  !important;
                margin: 0.4in 0.2in 0.2in 0.2in !important;
                font-size: 5pt !important;				
            }`+
            `@media print{               
                .pdf-container {
                    padding: 0px !important; 
                    margin-right: 0 !important;
                    margin-left: 0 !important;
                    width: 100% !important;
                    max-width: 980px !important;
                    min-width: 980px !important;
                    font-size: 10pt !important;
                    font-family: BCSans;
                    color: #313132 !important;
                }
            }`+
            `@page label{font-size: 9pt;}
            .pdf-container {
                padding: 0px !important; 
                margin-right: 0 !important;
                margin-left: 0 !important;
                width: 100% !important;
                max-width: 980px !important;
                min-width: 980px !important;
                font-size: 10pt !important;
                font-family: BCSans;
                color: #313132 !important;
            }
            .answer { color: rgb(3, 19, 165); font-size: 7pt; font-weight: 600;}
            `+                       
            `
            body{				
                font-family: BCSans;
            }
            `+
        `</style>
        </head>
        <body>
            
                <div class="container">
                    `+html+
        `</div></body></html>`	 
    
    return body
})