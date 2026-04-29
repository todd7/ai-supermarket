<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">模板管理</h1>
      <router-link
        to="/admin/templates/create"
        class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        新增模板
      </router-link>
    </div>
    
    <!-- Filter Section -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">筛选条件</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">模板名称</label>
          <input
            type="text"
            id="name"
            v-model="filters.name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入模板名称"
          />
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">分类</label>
          <select
            id="category"
            v-model="filters.category"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">全部分类</option>
            <option value="ai">AI应用模板</option>
            <option value="daily">日常应用模板</option>
          </select>
        </div>
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">上架状态</label>
          <select
            id="status"
            v-model="filters.status"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">全部状态</option>
            <option value="1">已上架</option>
            <option value="0">未上架</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="searchTemplates"
            class="w-full px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            搜索
          </button>
        </div>
      </div>
    </div>
    
    <!-- Template List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                模板ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                封面图
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                模板名称
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                分类
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                价格
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                销量
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                上架状态
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                创建时间
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="template in templates" :key="template.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ template.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  :src="template.coverImage"
                  class="h-12 w-12 object-cover rounded-md"
                  :alt="template.name"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ template.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ template.category }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ¥{{ template.price }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ template.sales }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    template.status === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ template.status === 1 ? '已上架' : '未上架' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ template.createdAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <router-link
                  :to="`/admin/templates/edit/${template.id}`"
                  class="text-blue-600 hover:text-blue-500 mr-3"
                >
                  编辑
                </router-link>
                <button
                  @click="toggleStatus(template)"
                  class="text-gray-600 hover:text-gray-500 mr-3"
                >
                  {{ template.status === 1 ? '下架' : '上架' }}
                </button>
                <button
                  @click="deleteTemplate(template.id)"
                  class="text-red-600 hover:text-red-500"
                >
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            上一页
          </button>
          <button
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            下一页
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              显示第 <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> 到 <span class="font-medium">{{ Math.min(currentPage * pageSize, total) }}</span> 条，共 <span class="font-medium">{{ total }}</span> 条记录
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">上一页</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                v-for="page in totalPages"
                :key="page"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">下一页</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 筛选条件
const filters = ref({
  name: '',
  category: '',
  status: ''
})

// 模板列表
const templates = ref([
  {
    id: 1,
    coverImage: 'https://picsum.photos/200/150?random=1',
    name: 'AI客服系统模板',
    category: 'AI应用模板',
    price: 299,
    sales: 256,
    status: 1,
    createdAt: '2026-01-01 10:00:00'
  },
  {
    id: 2,
    coverImage: 'https://picsum.photos/200/150?random=2',
    name: '企业知识库模板',
    category: 'AI应用模板',
    price: 399,
    sales: 189,
    status: 1,
    createdAt: '2026-01-02 14:30:00'
  },
  {
    id: 3,
    coverImage: 'https://picsum.photos/200/150?random=3',
    name: '个人博客模板',
    category: '日常应用模板',
    price: 199,
    sales: 156,
    status: 1,
    createdAt: '2026-01-03 09:15:00'
  },
  {
    id: 4,
    coverImage: 'https://picsum.photos/200/150?random=4',
    name: 'AI文案生成工具',
    category: 'AI应用模板',
    price: 249,
    sales: 128,
    status: 1,
    createdAt: '2026-01-04 16:45:00'
  },
  {
    id: 5,
    coverImage: 'https://picsum.photos/200/150?random=5',
    name: '进销存管理系统',
    category: '日常应用模板',
    price: 299,
    sales: 98,
    status: 1,
    createdAt: '2026-01-05 11:20:00'
  },
  {
    id: 6,
    coverImage: 'https://picsum.photos/200/150?random=6',
    name: '预约表单系统',
    category: '日常应用模板',
    price: 149,
    sales: 76,
    status: 0,
    createdAt: '2026-01-06 13:50:00'
  }
])

// 分页信息
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

// 搜索模板
const searchTemplates = () => {
  // 模拟搜索功能
  console.log('Searching templates with filters:', filters.value)
}

// 切换模板状态
const toggleStatus = (template: any) => {
  template.status = template.status === 1 ? 0 : 1
  console.log('Toggle template status:', template.id, template.status)
}

// 删除模板
const deleteTemplate = (id: number) => {
  if (confirm('确定要删除这个模板吗？')) {
    templates.value = templates.value.filter(t => t.id !== id)
    console.log('Delete template:', id)
  }
}

onMounted(() => {
  // 加载模板列表
  console.log('Template list loaded')
})
</script>

<style scoped>
/* TemplateList component styles */
</style>