import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xulinzheng' }
    ]
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en',
      themeConfig: {
        nav: [
          { text: 'zzzz', link: '/en' },
          { text: 'Work', link: '/en/work-list' },
          { text: 'Life', link: '/en/life-list' },
        ],
      }
    },
    zh: {
      label: '中文',
      lang: 'zh',
      link: '/zh',
      themeConfig: {
        nav: [
          { text: 'zzzz', link: '/zh' },
          { text: '工作', link: '/zh/work-list' },
          { text: '生活', link: '/zh/life-list' },
        ],
      }
      // 其余 locale 特定属性...
    }
  }

})
