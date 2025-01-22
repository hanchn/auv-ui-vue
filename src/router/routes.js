// Auto-generated routes
import { defineAsyncComponent } from 'vue';

const AAA = defineAsyncComponent(() => import('@/views/AAA/index.vue'));
const Home = defineAsyncComponent(() => import('@/views/Home/index.vue'));

const routes = [
  {
    path: '/AAA',
    name: 'AAA',
    component: AAA
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  }
];

export default routes;
