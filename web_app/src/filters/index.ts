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

Vue.filter('findInvalidFields',function(){
	Vue.nextTick(()=>{
		const el = document.getElementsByClassName('is-invalid')
		if(el[0]) el[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start'});
	})
})

Vue.filter('printPdf', function(html, form_type){
    const pageSize = (form_type=='12Hour'||form_type=='24Hour')?`11in  8.5in` : `8.5in 11in`

    const body = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>		
        <meta charset="UTF-8">
        <title>Court Of Appeal</title>`+
        `<style>`+
            `@page {
                size: `+ pageSize + ` !important;                         
                margin: 0.4in 0.2in 0.2in 0.2in !important;
                font-size: 7pt !important;				
            }`+
            `@media print{                                               
            }`+
            `@page label{font-size: 9pt;}
            .pdf-none{ display: none !important; }
            .answer { color: rgb(3, 19, 165) !important; font-size: 7pt; font-weight: 600 !important;}
            .answer2 { color: rgb(3, 19, 165) !important; font-size: 10pt; font-weight: 600 !important; padding-left:0.25rem; }
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