var papaparse = require('papaparse');
window.papaparse = papaparse;

var moment = require('moment');
window.moment = moment;

var Paginate = require('vuejs-paginate');
Vue.component('paginate', Paginate);

var Datepicker = require('vue-bootstrap-datetimepicker');
Vue.component('datepicker', Datepicker);