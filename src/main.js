import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Buefy from 'buefy';
import moment from 'moment'

Vue.use(Buefy);

Vue.config.productionTip = false;


Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
