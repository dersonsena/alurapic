import Cadastro from './components/cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';

export const routes = [
  { name: 'home', path: '/', component: Home, title: 'Home', menu: true },
  { name: 'cadastro', path: '/cadastro', component: Cadastro, title: 'Cadastro', menu: true },
  { name: 'alterar', path: '/cadastro/:id', component: Cadastro, title: 'Cadastro', menu: false },
  { path: '*', component: Home, menu: false }
];
