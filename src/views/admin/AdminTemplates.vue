<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h2 class="text-lg font-medium text-gray-900">模板管理</h2>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        添加模板
      </button>
    </div>
    
    <div class="px-6 py-4">
      <div class="flex items-center justify-between mb-4">
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
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
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
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="template in filteredTemplates" :key="template.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ template.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ template.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ template.category }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ¥{{ template.price }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-blue-600 hover:text-blue-800 mr-3">
                  编辑
                </button>
                <button class="text-red-600 hover:text-red-800">
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="filteredTemplates.length === 0" class="text-center py-8">
        <p class="text-gray-500">未找到模板</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Template {
  id: number
  name: string
  category: string
  price: number
}

const templates = ref<Template[]>([
  {
    id: 1,
    name: 'AI文案生成工具',
    category: 'AI工具',
    price: 99
  },
  {
    id: 2,
    name: '智能客服系统',
    category: '商业应用',
    price: 199
  },
  {
    id: 3,
    name: '个人博客模板',
    category: '个人工具',
    price: 49
  },
  {
    id: 4,
    name: 'AI知识库',
    category: '商业应用',
    price: 299
  },
  {
    id: 5,
    name: '简历生成工具',
    category: '个人工具',
    price: 39
  },
  {
    id: 6,
    name: '图像识别应用',
    category: 'AI工具',
    price: 149
  }
])

const searchQuery = ref('')

const filteredTemplates = computed(() => {
  return templates.value.filter(template => 
    template.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<style scoped>
/* AdminTemplates component styles */
</style>