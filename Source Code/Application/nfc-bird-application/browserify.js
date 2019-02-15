var papaparse = require('papaparse');
window.papaparse = papaparse;

var Paginate = require('vuejs-paginate');
Vue.component('paginate', Paginate);

var Datepicker = require('vue-bootstrap-datetimepicker');
Vue.component('datepicker', Datepicker);