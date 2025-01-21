<template>
  <div class="article-list">
    <!-- 按年份分组的文章列表 -->
    <div v-for="(group, year) in groupedArticles" :key="year" class="year-group">
      <h2 class="year-title">{{ year }}年</h2> <!-- 年份标题，格式化为 "2024年" -->
      <ul class="article-ul">
        <li
          v-for="article in group"
          :key="article.frontmatter.title"
          class="article-item"
        >
          <a :href="article.url" class="article-link">
            <span class="bullet">•</span> <!-- 圆点 -->
            <span class="date">{{ article.frontmatter.formattedDate }}</span> <!-- 完整日期 -->
            <span class="add">{{ "--" }}</span> <!-- 连接符 -->
            <span class="title">{{ article.frontmatter.title }}</span> <!-- 标题 -->
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  src: String // 接收文件路径
})

// 初始化 articles
const articles = ref([]);

onMounted(async () => {
  try {
    const module = await import(/* @vite-ignore */ props.src)
    articles.value = module.data
  } catch (error) {
    console.error('加载数据失败:', error)
  }
})

// 按年份分组文章
const groupedArticles = computed(() => {
  const groups = {};
  articles.value.forEach((article) => {
    const date = article.frontmatter.formattedDate; // 获取完整日期，例如 "2024/12/31"
    const year = date.split('/')[0]; // 提取年份部分
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(article);
  });
  return groups;
});
</script>

<style scoped>
.article-list {
  max-width: 500px;
  margin: 0 auto;
}

ul {
  list-style: none; /* 移除默认的列表样式 */
  padding: 0;
}

.head {
  display: block; /* 确保 span 是块级元素 */
  margin-top: 50px; /* 设置 head 与顶部的距离 */
  margin-bottom: 50px; /* 设置 head 与文章列表的间距 */
  font-size: 50px;
  text-align: center; /* 居中显示 */
}

.year-group {
  margin-bottom: 20px; /* 每个年份组之间的间距 */
}

.year-title {
  font-size: 24px;
  color: #333; /* 年份标题颜色 */
  margin-bottom: 10px; /* 年份标题与文章列表的间距 */
  padding-bottom: 5px; /* 分隔线与文字的间距 */
}

.article-ul {
  margin-top: 10px; /* 可选：设置文章列表的上边距 */
}

.article-item {
  margin-bottom: 10px;
  font-size: 16px;
}

.article-link {
  display: flex;
  align-items: center;
  text-decoration: none; /* 移除下划线 */
  color: inherit; /* 继承父元素颜色 */
}

.article-link:hover {
  color:rgb(14, 66, 42); /* 悬停颜色 */
}

.bullet {
  margin-right: 8px; /* 圆点与日期的间距 */
  color: #666; /* 圆点颜色 */
}

.add {
  margin-right: 10px; 
  color: #666; 
}

.date {
  margin-right: 10px; /* 日期与标题的间距 */
  color: #666; /* 日期颜色 */
}

.title {
  color: #666; /* 日期颜色 */
}
</style>