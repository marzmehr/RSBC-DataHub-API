import Common from '@/store/modules/common';
import {plugins} from "@/store/plugins";

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

const rsiStore = new Vuex.Store({
	modules: {
		Common
	},

	plugins: plugins
})

export default rsiStore