<template>
  <div class="form-group" :class="fg_class">
    <label :for="id">Vehicle Year</label>
    <multiselect :value="getAttributeValue(path, id)"
                   :id="id"
                   @input="updateVehicle"
                   tag-placeholder="That year isn't found"
                   placeholder="Select a vehicle year"
                   :options="getArrayOfVehicleYearsOptions">
    </multiselect>
  </div>
</template>

<script>

import FieldCommon from "@/components/questions/FieldCommon";
import {mapGetters} from "vuex";

import {getArrayOfVehicleYears} from "@/utils/vehicle"

export default {
  name: "VehicleYear",
  mixins: [FieldCommon],
  props: {
    id: {
      type: String,
      default: 'vehicle_year'
    }
  },
  computed: {
    // ...mapGetters(["getArrayOfVehicleYears"])
    getArrayOfVehicleYearsOptions(){
      return getArrayOfVehicleYears()
    }
  },
  methods: {
    updateVehicle(event) {
      console.log("updateVehicle()", event)
      const payload = {
        "target": {
          "path": this.path,
          "id": this.id,
          "value": event
        }
      }
      this.updateFormField(payload)
    }
  }

}
</script>

<style scoped>

.form-group label {
  padding-bottom: 0.7em;
}

</style>