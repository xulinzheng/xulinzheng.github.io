import { createContentLoader } from 'vitepress';

export default createContentLoader('/eg/life/*.md', {
  includeSrc: true,
  excerpt: true,
  transform(rawData) {
    // 定义日期格式化函数
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear(); // 获取年份
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 获取月份（注意：月份从 0 开始，需要 +1）
      const day = String(date.getDate()).padStart(2, '0'); // 获取日期
      return `${year}/${month}/${day}`; // 拼接字符串
    }

    // 对数据进行排序和格式化
    const articles = rawData
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date);
      })
      .map(post => {
        return {
          ...post,
          frontmatter: {
            ...post.frontmatter,
            formattedDate: formatDate(post.frontmatter.date), // 添加格式化后的日期
          },
        };
      });

    return articles; // 直接返回 articles 数组
  }
});