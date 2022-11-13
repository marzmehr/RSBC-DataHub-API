<template>
    <div class="card border-light bg-secondary">
      <div class="card-header text-white text-left font-weight-bold small pl-3 pt-1 pb-1 bg-primary">
        {{ form.full_name }}
      </div>
      <div class="card-body bg-light">
      <p class="card-text text-dark">{{ form.description }}</p>
      <p class="card-text">
        <small class="text-muted">
          IDs available: {{ getFormTypeCountInfo()[form.form_type] }}
        </small>
      </p>

          <router-link class="text-white" v-if="isFormAvailable" :to="{
            name: form.form_type,
            params: { id: getNextAvailableUniqueIdByType(form.form_type)}}">
              <button type="submit" class="btn btn-primary" :id="form.full_name">
                New {{ form.label }} Form
              </button>
          </router-link>
          <button type="submit" class="btn btn-primary" v-if="! isFormAvailable" :disabled="! isFormAvailable" :id="form.full_name">
            New {{ form.label }} Form
          </button>

    </div>
    </div>
</template>

<script>

import {mapGetters} from "vuex";
import {getFormTypeCount} from "@/utils/forms"

export default {
  name: "ProhibitionCard",
  props: {
      form: {}
  },
  computed: {
    // ...mapGetters(["getNextAvailableUniqueIdByType"]),
    isFormAvailable() {
      return getFormTypeCount()[this.form.form_type] > 0 && ! this.form.disabled
    }
  },
  methods: {
    getNextAvailableUniqueIdByType(form_type) {
        console.log("inside getNextAvailableUniqueIdByType()", form_type)
        for (const form_id in this.$store.state.forms[form_type]) {
            if( ! ("data" in this.$store.state.forms[form_type][form_id])) {
                return form_id
            }
        }
    },
    getFormTypeCountInfo(){
      return getFormTypeCount()
    }
  }
}
</script>
