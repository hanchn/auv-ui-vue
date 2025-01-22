import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes.js';
// 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes]
});
export default router;