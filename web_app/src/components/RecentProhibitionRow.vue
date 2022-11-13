<template>
  <tr v-if="prohibition">
    <td>
      {{ prohibition.data.last_name }},
      {{ prohibition.data.first_name }}
      ({{ prohibition.data.drivers_number }})
    </td>
    <td>{{ prohibition.form_type }}</td>
    <td>{{ getServedStatus(prohibition) }}</td>
    <td><span class="text-muted text-secondary">{{ prohibition.form_id }}</span></td>
    <td>
      <h6 v-if="isFormEditable(prohibition)">
        <b-icon-trash variant="danger" @click="deleteSpecificFormFromTable(prohibition)"></b-icon-trash>&nbsp;
        <router-link :to="{ name: prohibition.form_type, params: { id: prohibition.form_id}}">
          <b-icon-pen variant="primary"></b-icon-pen>
        </router-link>
      </h6>
      <div v-if="! isFormEditable(prohibition)">
        <div v-for="(document, index) in getDocumentsToPrint(prohibition.form_type)" v-bind:key="index">
          <print-documents
            v-if="document.reprint"
            :form_object="prohibition"
            :validate="() => { return true }"
            :variants="document.variants">
            Print again
          </print-documents>
        </div>

      </div>
    </td>
  </tr>
</template>

<script>

import { mapMutations, mapGetters, mapActions } from 'vuex';
import PrintDocuments from "@/components/forms/PrintDocuments";

import {deleteSpecificForm} from "@/utils/forms"

export default {
  name: "RecentProhibitionRow",
  props: {
    prohibition: {}
  },
  data() {
    return {
      display_spinner: false
    }
  },
  computed: {
    //...mapGetters([
      // "isFormEditable", 
      // "getServedStatus", 
      //"getDocumentsToPrint"])
  },
  methods: {
    ...mapMutations(["editExistingForm"]),
    ...mapActions(["saveFormAndGeneratePDF"]),
    deleteSpecificFormFromTable(form){
      deleteSpecificForm(form)
    },
    isFormEditable(form_object){
        return ! (this.$store.state.forms[form_object.form_type][form_object.form_id].printed_timestamp)
    },
    getServedStatus(form_object){
        if (this.$store.state.forms[form_object.form_type][form_object.form_id].printed_timestamp) {
            return "Printed";
        }
        return "Not Printed"
    },
    getDocumentsToPrint(form_type){
        return this.$store.state.form_schemas.forms[form_type].documents;
    },
  },
  components: {
    PrintDocuments
  }
}
</script>
