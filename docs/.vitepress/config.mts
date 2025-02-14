import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  themeConfig: {
    logo: '/images/logo.jpg',
    // 页脚
    // sidebar: [
    //   {
    //     text: 'Guide',
    //     items: [
    //       { text: 'Introduction', link: '/introduction' },
    //       { text: 'Getting Started', link: '/getting-started' },
    //     ]
    //   }
    // ],
    // 社交
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xulinzheng' },
      { icon: 'x', link: 'https://x.com/ZXL767693432' },
    ],
    // 搜索框
    search: {
      provider: 'local'
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en',
      title: "XL's house",
      themeConfig: {
        nav: [
          { text: 'Work', link: '/en/work-list' },
          { text: 'Life', link: '/en/life-list' },
        ],
      }
    },
    zh: {
      label: '中文',
      lang: 'zh',
      link: '/zh',
      title: "XL的小屋",
      themeConfig: {
        nav: [
          { text: '工作', link: '/zh/work-list' },
          { text: '生活', link: '/zh/life-list' },
        ],
        // sidebar: [
        //   {
        //     text: '指引',
        //     items: [
        //       { text: '工作', link: '/zh/work-list' },
        //       { text: '生活', link: '/zh/life-list' },
        //     ]
        //   }
        // ]
      },

    }
  }
})