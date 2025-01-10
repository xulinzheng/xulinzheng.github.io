import DefaultTheme from 'vitepress/theme';
import Giscus from './Giscus.vue';
import ArticleList from './ArticleList.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册 Giscus
    app.component('Giscus', Giscus); 
    // 注册 Element Plus
    app.use(ElementPlus); // 全局注册 Element Plus
    //
    app.component('ArticleList', ArticleList)
  }
};