<template>
  <div class="article-list">
    <ul>
      <span class="head"> 美好的生活 </span>
    </ul>
    <!-- 文章列表 -->
    <ul class="article-ul">
      <li
        v-for="article in displayedArticles"
        :key="article.frontmatter.title"
        class="article-item"
      >
        <a :href="article.url" class="article-link">
          <span class="bullet">•</span> <!-- 圆点 -->
          <span class="date">{{ article.frontmatter.formattedDate }}</span> <!-- 日期 -->
          <span class="add">{{ "--" }}</span> <!-- 连接符 -->
          <span class="title">{{ article.frontmatter.title }}</span> <!-- 标题 -->
        </a>
      </li>
    </ul>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="articles.length"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElPagination } from 'element-plus'; // 局部引入 Element Plus 组件
import { data } from '../data/zh/life.data.js'; // 导入数据

// 初始化 articles
const articles = ref([]);

// 在组件挂载后加载数据
onMounted(() => {
  try {
    console.log('加载后的数据:', data); // 打印加载后的数据
    articles.value = data; // 直接使用 lifeData
  } catch (error) {
    console.error('加载数据失败:', error);
  }
});

// 分页相关状态
const pageSize = 10; // 每页显示的文章数量
const currentPage = ref(1);

// 计算当前页显示的文章
const displayedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return articles.value.slice(start, end);
});

// 处理分页切换
const handlePageChange = (page) => {
  currentPage.value = page;
};
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

.article-ul {
  margin-top: 20px; /* 可选：设置文章列表的上边距 */
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