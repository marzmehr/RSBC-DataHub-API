<template>
  <span v-if="displayCheckDigit" id="check-digit">{{ checkDigit }}</span>
</template>

<script>
import {mapGetters} from "vuex";
import checkDigit from "@/helpers/checkDigit";

export default {
  name: "CheckDigit",
  props: {
    form_object: Object
  },
  computed: {
    // ...mapGetters(["getFormIdCheckDigit"]),
    checkDigit() {
      return this.getFormIdCheckDigit(this.form_object);
    },
    displayCheckDigit() {
      return this.checkDigit !== ''
    }
  },
  methods: {
    getFormIdCheckDigit(form_object){
        if ( this.$store.state.form_schemas.forms[form_object.form_type].check_digit) {
            const sixDigitString = form_object.form_id.substr(2,7)
            return checkDigit.checkDigit(sixDigitString).toString()
        } else {
            return ''
        }
    },
  }
}
</script>

<style scoped>

</style>