import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Buefy from 'buefy';
import moment from 'moment';
import { Titlebar, Color } from 'custom-electron-titlebar';
const { Menu } = require('electron').remote;

Vue.use(Buefy);

Vue.config.productionTip = false;

new Titlebar({
  backgroundColor: Color.fromHex('#2f3b52'),
  enableMnemonics: false,
  menu: new Menu(),
});

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
