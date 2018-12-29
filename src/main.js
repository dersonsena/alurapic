import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import VeeValidate from 'vee-validate';
import msg from './pt_BR';
import './directives/Transform';
//import 'bootstrap/dist/css/bootstrap.css';
// import './assets/teste.css';

Vue.use(VueResource);
Vue.http.options.root = (proccess.env.API_URL ? proccess.env.API_URL : 'http://localhost:3000');

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
