import fs from 'fs';
import path from 'path';

// 定义路径
const viewsDir = path.resolve('src/views');
const routerFilePath = path.resolve('src/router/routes.ts');

// 确保目录存在的工具函数
const ensureDirectoryExistence = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 生成路由脚本
const generateRoutes = () => {
  if (!fs.existsSync(viewsDir)) {
    console.error(`Views directory not found: ${viewsDir}`);
    return;
  }

  const routes = [];
  const directories = fs.readdirSync(viewsDir, { withFileTypes: true });

  // 遍历 views 下的一级目录
  directories.forEach((dir) => {
    if (dir.isDirectory()) {
      const indexVuePath = path.join(viewsDir, dir.name, 'index.vue');
      if (fs.existsSync(indexVuePath)) {
        const routePath = `/${dir.name}/index.vue`;
        const routeName = dir.name;
        const routeComponent = dir.name.charAt(0).toUpperCase() + dir.name.slice(1);
        routes.push(
          `  {
    path: '${routePath}',
    name: '${routeName}',
    component: ${routeComponent}
  }`
        );
      }
    }
  });

  // 生成文件内容
  const fileContent = `// Auto-generated routes
import { defineAsyncComponent } from 'vue';

${routes
  .map((route) => {
    const componentName = route.match(/component: (\w+)/)[1];
    return `const ${componentName} = defineAsyncComponent(() => import('@/views/${componentName}/index.vue'));`;
  })
  .join('\n')}

const routes = [
${routes.join(',\n')}
];

export default routes;
`;

  // 确保路由文件目录存在
  ensureDirectoryExistence(routerFilePath);

  // 写入到文件
  fs.writeFileSync(routerFilePath, fileContent, 'utf8');
  console.log(`Routes file has been generated at: ${routerFilePath}`);
};

// 执行脚本
generateRoutes();
