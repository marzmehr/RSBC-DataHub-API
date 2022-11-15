<template>
  <div> 
    <form24h-layout v-for="(value, inx) in ['DRIVER COPY','POLICE COPY','SEND TO ICBC']" v-bind:key="inx" :formType="value"  class="svg-wrapper"/>      
  </div>
</template>

<script>

import Form24hLayout from "./layouts/Form24hLayout.vue"

export default {
  name: "Form24",
  components: {     
    Form24hLayout
  }
}
</script>

<style type="text/css">

   .fontText {
       font-size: 3pt;
   }

   .svg-wrapper {
     border-bottom: darkblue solid 1px;
   }

  @media print {
     #roadsafety-header {
       display: none;
     }
     #debug-component {
       display: none;
     }
     #not-authenticated-banner {
       display: none;
     }

     #print-btn{
       display: none;
     }

    .svg-wrapper {
      margin-top: 25mm;
      border: none;
    }

    @page {
      margin: 0;

    }
  }

</style>

<style scoped type="text/css">

@media print {

  @page {
    size: letter;
    margin: 0;
  }

  html {
    margin: 0;
  }

  body {
    margin: 0;
  }

  #roadsafety-header {
   display: none;
  }
  #debug-component {
   display: none;
  }
  #not-authenticated-banner {
   display: none;
  }

  .svg-wrapper {
    page-break-before:always;
    transform: rotate(-90deg) scale(1.3) translate(-200px);
  }
}


</style>