import Vue from 'vue'

import dataTable from "@/components/GlobalComponents/DataTable";
import selectBox from "@/components/GlobalComponents/SelectBox";
import progressForm from "@/components/GlobalComponents/ProgressForm";
import multiSelect from "@/components/GlobalComponents/MultipleSelectWithInput";
import progressFormComponent from "@/components/GlobalComponents/ProgressFormComponent";
import tabs from "@/components/GlobalComponents/TabComponent";
import tabsWindow from "@/components/GlobalComponents/TabWindow";
import loader from "@/components/GlobalComponents/Loader";

Vue.component('fd-table', dataTable);
Vue.component('fd-select', selectBox);
Vue.component('fd-multiselect', multiSelect);
Vue.component('progress-form-component', progressFormComponent);
Vue.component('progress-form', progressForm);
Vue.component('fd-tab', tabs);
Vue.component('tab-window', tabsWindow);
Vue.component('fd-loader', loader);