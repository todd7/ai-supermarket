<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <Navbar />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">应用模板</h1>
        <div class="mt-4 md:mt-0">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="搜索模板..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Sorting -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-4">
          <span class="text-sm font-medium text-gray-700">排序：</span>
          <select 
            v-model="sortBy" 
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="default">综合排序</option>
            <option value="sales">销量优先</option>
            <option value="price-asc">价格从低到高</option>
            <option value="price-desc">价格从高到低</option>
            <option value="newest">最新上架</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Sidebar - Categories -->
        <div class="lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">分类筛选</h2>
            
            <!-- AI 应用模板 -->
            <div class="mb-6">
              <h3 class="text-md font-medium text-gray-700 mb-3">AI 应用模板</h3>
              <ul class="space-y-2">
                <li>
                  <button
                    @click="selectCategory('ai-knowledge')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedCategory === 'ai-knowledge' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    企业知识库
                  </button>
                </li>
                <li>
                  <button
                    @click="selectCategory('ai-customer-service')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedCategory === 'ai-customer-service' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    AI 客服
                  </button>
                </li>
                <li>
                  <button
                    @click="selectCategory('ai-content')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedCategory === 'ai-content' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    AI 文案生成
                  </button>
                </li>
                <li>
                  <button
                    @click="selectCategory('ai-office')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedCategory === 'ai-office' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    AI 办公助手
                  </button>
                </li>
                <li>
                  <button
                    @click="selectCategory('ai-industry')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedCategory === 'ai-industry' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    垂直行业 AI 工具
                  </button>
                </li>
              </ul>
            </div>
            
            <!-- 日常应用模板 -->
            <div>
              <h3 class="text-md font-medium text-gray-700 mb-3">日常应用模板</h3>
              <ul class="space-y-2">
                <li>
                  <button
                    @click="selectCategory('blog')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedCategory === 'blog' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    个人博客 / 作品集
                  </button>
                </li>
                <li>
                  <button
                    @click="selectCategory('podcast')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedCategory === 'podcast' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    播客网站
                  </button>
                </li>
                <li>
                  <button
                    @click="selectCategory('inventory')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedCategory === 'inventory' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    进销存系统
                  </button>
                </li>
                <li>
                  <button
                    @click="selectCategory('booking')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedCategory === 'booking' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    预约 / 表单系统
                  </button>
                </li>
                <li>
                  <button
                    @click="selectCategory('other')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                      selectedCategory === 'other' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    ]"
                  >
                    其他管理系统
                  </button>
                </li>
              </ul>
            </div>
            
            <button 
              @click="selectedCategory = 'all'"
              class="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              清除筛选
            </button>
          </div>
        </div>
        
        <!-- Main Content - Templates -->
        <div class="flex-1">
          <!-- Templates Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="template in paginatedTemplates"
              :key="template.id"
              class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div class="h-48 overflow-hidden">
                <img :src="template.coverImage || `https://picsum.photos/400/300?random=${template.id}`" :alt="template.name" class="w-full h-full object-cover transition-transform hover:scale-105" />
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {{ template.categoryName }}
                  </span>
                  <span class="text-xs text-gray-500">销量: {{ template.sales }}</span>
                </div>
                <h3 class="text-lg font-medium text-gray-900">{{ template.name }}</h3>
                <p class="mt-2 text-sm text-gray-500">{{ template.description }}</p>
                <div class="mt-4 flex items-center justify-between">
                  <span class="text-xl font-bold text-gray-900">¥{{ template.price }}</span>
                  <router-link
                    :to="`/template/${template.id}`"
                    class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    查看详情
                  </router-link>
                </div>
                <div class="mt-2 text-xs text-gray-500">
                  上架时间: {{ template.uploadTime }}
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="paginatedTemplates.length === 0" class="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">未找到模板</h3>
            <p class="mt-2 text-gray-500">尝试调整搜索条件或选择其他分类</p>
          </div>

          <!-- Pagination -->
          <div v-if="paginatedTemplates.length > 0" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <span class="px-3 py-1">
                {{ currentPage }} / {{ totalPages }}
              </span>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              产品
            </h3>
            <ul class="mt-4 space-y-2">
              <li><router-link to="/templates" class="text-base text-gray-300 hover:text-white">应用模板</router-link></li>
              <li><router-link to="/deployment" class="text-base text-gray-300 hover:text-white">代部署服务</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              资源
            </h3>
            <ul class="mt-4 space-y-2">
              <li><router-link to="/faq" class="text-base text-gray-300 hover:text-white">帮助中心</router-link></li>
              <li><a href="#" class="text-base text-gray-300 hover:text-white">部署教程</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              公司
            </h3>
            <ul class="mt-4 space-y-2">
              <li><a href="#" class="text-base text-gray-300 hover:text-white">关于我们</a></li>
              <li><a href="#" class="text-base text-gray-300 hover:text-white">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              法律
            </h3>
            <ul class="mt-4 space-y-2">
              <li><router-link to="/privacy" class="text-base text-gray-300 hover:text-white">隐私政策</router-link></li>
              <li><router-link to="/terms" class="text-base text-gray-300 hover:text-white">服务条款</router-link></li>
            </ul>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <div class="flex space-x-6 md:order-2">
            <a href="#" class="text-gray-400 hover:text-white">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2026 AI模板超市. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'

// 模板数据
const templates = ref([])

// 获取模板数据
const fetchTemplates = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/templates')
    const data = await response.json()
    templates.value = data
  } catch (error) {
    console.error('Error fetching templates:', error)
  }
}

onMounted(async () => {
  await fetchTemplates()
})

// 原有模板数据（作为备份）
const backupTemplates = [
  {
    id: 1,
    name: 'AI文案生成工具',
    description: '基于大语言模型的文案生成工具，支持多种场景的文案创作',
    price: 99,
    category: 'ai-content',
    categoryName: 'AI 文案生成',
    sales: 1280,
    uploadTime: '2024-01-15',
    coverImage: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 2,
    name: '智能客服系统',
    description: '基于AI的智能客服系统，支持自动回复和问题处理',
    price: 199,
    category: 'ai-customer-service',
    categoryName: 'AI 客服',
    sales: 950,
    uploadTime: '2024-01-10',
    coverImage: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: 3,
    name: '个人博客模板',
    description: '简洁美观的个人博客模板，支持Markdown编辑',
    price: 49,
    category: 'blog',
    categoryName: '个人博客 / 作品集',
    sales: 820,
    uploadTime: '2024-01-08',
    coverImage: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: 4,
    name: 'AI知识库',
    description: '基于向量数据库的智能知识库，支持自然语言查询',
    price: 299,
    category: 'ai-knowledge',
    categoryName: '企业知识库',
    sales: 680,
    uploadTime: '2024-01-05',
    coverImage: 'https://picsum.photos/400/300?random=4'
  },
  {
    id: 5,
    name: 'AI办公助手',
    description: '智能办公助手，帮助你提高工作效率',
    price: 149,
    category: 'ai-office',
    categoryName: 'AI 办公助手',
    sales: 560,
    uploadTime: '2024-01-03',
    coverImage: 'https://picsum.photos/400/300?random=5'
  },
  {
    id: 6,
    name: '垂直行业AI工具',
    description: '针对特定行业的AI解决方案',
    price: 399,
    category: 'ai-industry',
    categoryName: '垂直行业 AI 工具',
    sales: 420,
    uploadTime: '2024-01-01',
    coverImage: 'https://picsum.photos/400/300?random=6'
  },
  {
    id: 7,
    name: '播客网站模板',
    description: '专业的播客网站模板，支持音频上传和播放',
    price: 89,
    category: 'podcast',
    categoryName: '播客网站',
    sales: 380,
    uploadTime: '2023-12-28',
    coverImage: 'https://picsum.photos/400/300?random=7'
  },
  {
    id: 8,
    name: '进销存系统',
    description: '简单易用的进销存管理系统',
    price: 199,
    category: 'inventory',
    categoryName: '进销存系统',
    sales: 320,
    uploadTime: '2023-12-25',
    coverImage: 'https://picsum.photos/400/300?random=8'
  },
  {
    id: 9,
    name: '预约系统',
    description: '在线预约系统，支持日历和时间选择',
    price: 149,
    category: 'booking',
    categoryName: '预约 / 表单系统',
    sales: 280,
    uploadTime: '2023-12-20',
    coverImage: 'https://picsum.photos/400/300?random=9'
  },
  {
    id: 10,
    name: '其他管理系统',
    description: '通用的管理系统模板',
    price: 129,
    category: 'other',
    categoryName: '其他管理系统',
    sales: 250,
    uploadTime: '2023-12-15',
    coverImage: 'https://picsum.photos/400/300?random=10'
  },
  {
    id: 11,
    name: 'AI图像生成工具',
    description: '基于AI的图像生成工具，支持多种风格',
    price: 199,
    category: 'ai-content',
    categoryName: 'AI 文案生成',
    sales: 220,
    uploadTime: '2023-12-10',
    coverImage: 'https://picsum.photos/400/300?random=11'
  },
  {
    id: 12,
    name: '个人作品集网站',
    description: '展示个人作品的专业网站模板',
    price: 69,
    category: 'blog',
    categoryName: '个人博客 / 作品集',
    sales: 190,
    uploadTime: '2023-12-05',
    coverImage: 'https://picsum.photos/400/300?random=12'
  }
]

const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('default')
const currentPage = ref(1)
const itemsPerPage = 16

// 选择分类
const selectCategory = (category: string) => {
  selectedCategory.value = category
  currentPage.value = 1 // 重置到第一页
}

// 排序和筛选后的模板
const sortedAndFilteredTemplates = computed(() => {
  let result = templates.value.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        template.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || template.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })

  // 排序
  switch (sortBy.value) {
    case 'sales':
      result.sort((a, b) => b.sales - a.sales)
      break
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      result.sort((a, b) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime())
      break
    default:
      // 综合排序（默认）
      result.sort((a, b) => {
        // 优先按销量，其次按价格
        if (b.sales !== a.sales) {
          return b.sales - a.sales
        }
        return a.price - b.price
      })
  }

  return result
})

// 分页后的模板
const paginatedTemplates = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedAndFilteredTemplates.value.slice(start, end)
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(sortedAndFilteredTemplates.value.length / itemsPerPage)
})

// 上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// 监听搜索和分类变化，重置到第一页
watch([searchQuery, selectedCategory, sortBy], () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* Templates component styles */
</style>