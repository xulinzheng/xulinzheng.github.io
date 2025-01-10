<template>
  <div id="giscus-comments"></div>
</template>

<script>
import { useData, useRoute } from 'vitepress';
import { onUnmounted, watch, onMounted } from 'vue';

export default {
  setup() {
    const { isDark } = useData();
    const route = useRoute(); // 获取当前路由

    let giscusScript = null;
    let giscusIframe = null;

    const loadGiscus = () => {
      giscusScript = document.createElement('script');
      giscusScript.src = 'https://giscus.app/client.js';
      giscusScript.setAttribute('data-repo', 'xulinzheng/xulinzheng.github.io');
      giscusScript.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkzNDgxOTEzMjI=');
      giscusScript.setAttribute('data-category', 'Announcements');
      giscusScript.setAttribute('data-category-id', 'DIC_kwDOFMD6Ws4ClwVI');
      giscusScript.setAttribute('data-mapping', 'pathname');
      giscusScript.setAttribute('data-reactions-enabled', '1');
      giscusScript.setAttribute('data-emit-metadata', '0');
      giscusScript.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
      giscusScript.setAttribute('crossorigin', 'anonymous');
      giscusScript.async = true;

      // 监听脚本加载完成事件
      giscusScript.onload = () => {
        console.log('Giscus script loaded!');
        giscusIframe = document.querySelector('iframe.giscus-frame');
        if (giscusIframe) {
          console.log('Giscus iframe found!');
        }
      };

      document.getElementById('giscus-comments').appendChild(giscusScript);
    };

    // 向 Giscus 发送主题更新消息
    const updateGiscusTheme = (theme) => {
      if (giscusIframe) {
        giscusIframe.contentWindow.postMessage(
          {
            giscus: {
              setConfig: {
                theme: theme,
              },
            },
          },
          'https://giscus.app'
        );
        console.log('Giscus theme updated to:', theme);
      } else {
        console.error('Giscus iframe not found!');
      }
    };

    // 监听主题变化
    watch(isDark, () => {
      const theme = isDark.value ? 'dark' : 'light';
      updateGiscusTheme(theme);
    });

    // 监听路由变化
    watch(
      () => route.path, // 监听路由路径
      () => {
        // 移除旧的 Giscus 脚本
        const existingScript = document.querySelector('script[src*="giscus.app"]');
        if (existingScript) {
          existingScript.remove();
        }
        // 重新加载 Giscus
        loadGiscus();
      }
    );

    // 初始化加载 Giscus
    onMounted(() => {
      loadGiscus();
    });

    // 清理脚本
    onUnmounted(() => {
      if (giscusScript) {
        giscusScript.remove();
      }
    });

    return { isDark };
  }
};
</script>