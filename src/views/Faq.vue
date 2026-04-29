<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <span class="text-2xl font-bold text-blue-600">AI模板超市</span>
            </router-link>
            <nav class="hidden md:ml-6 md:flex md:space-x-8">
              <router-link to="/templates" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                应用模板
              </router-link>
              <router-link to="/deployment" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                代部署服务
              </router-link>
            </nav>
          </div>
          <div class="flex items-center">
            <router-link to="/cart" class="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </router-link>
            <router-link to="/user-center" class="ml-4 p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">常见问题</h1>
          
          <!-- 搜索框 -->
          <div class="mb-8">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                v-model="searchQuery"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="搜索问题..."
              />
            </div>
          </div>
          
          <!-- 问题分类 -->
          <div class="mb-8">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="selectedCategory = category.id"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ category.name }}
              </button>
            </div>
          </div>
          
          <!-- 问题列表 -->
          <div class="space-y-4">
            <div
              v-for="faq in filteredFaqs"
              :key="faq.id"
              class="border rounded-md overflow-hidden"
            >
              <button
                @click="toggleFaq(faq.id)"
                class="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span class="font-medium text-gray-900">{{ faq.question }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 transition-transform"
                  :class="{ 'transform rotate-180': faqOpen[faq.id] }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="faqOpen[faq.id]" class="p-4 border-t">
                <p class="text-gray-700">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
          
          <!-- 无结果提示 -->
          <div v-if="filteredFaqs.length === 0" class="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">未找到相关问题</h3>
            <p class="mt-2 text-gray-500">请尝试其他关键词或联系客服</p>
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
import { ref, computed } from 'vue'

// 搜索关键词
const searchQuery = ref('')

// 选中的分类
const selectedCategory = ref('all')

// FAQ展开状态
const faqOpen = ref<Record<number, boolean>>({})

// 问题分类
const categories = [
  { id: 'all', name: '全部' },
  { id: 'order', name: '订单相关' },
  { id: 'deployment', name: '部署问题' },
  { id: 'template', name: '模板问题' },
  { id: 'account', name: '账号问题' },
  { id: 'other', name: '其他问题' }
]

// FAQ数据
const faqs = ref([
  {
    id: 1,
    category: 'order',
    question: '如何购买模板？',
    answer: '浏览模板超市，选择您需要的模板，点击「立即购买」按钮，完成支付后即可下载模板交付物。'
  },
  {
    id: 2,
    category: 'order',
    question: '如何查看我的订单？',
    answer: '登录后进入个人中心，点击「我的订单」即可查看所有订单记录。'
  },
  {
    id: 3,
    category: 'order',
    question: '如何申请售后？',
    answer: '在「我的订单」页面，找到需要售后的订单，点击「申请售后」按钮，填写售后原因和问题描述，我们会在24小时内处理。'
  },
  {
    id: 4,
    category: 'deployment',
    question: '模板如何部署？',
    answer: '每个模板都包含详细的部署教程，您可以按照教程步骤进行部署。如果遇到问题，可以选择我们的代部署服务。'
  },
  {
    id: 5,
    category: 'deployment',
    question: '代部署服务包含哪些内容？',
    answer: '我们的代部署服务包括环境配置、应用部署、模型配置、调试等，具体内容根据您选择的套餐不同而有所差异。'
  },
  {
    id: 6,
    category: 'template',
    question: '模板是否支持定制？',
    answer: '是的，我们提供模板定制服务，您可以联系客服详细咨询定制需求。'
  },
  {
    id: 7,
    category: 'template',
    question: '模板是否可以二次开发？',
    answer: '是的，购买模板后您可以根据自己的需求进行二次开发，我们提供完整的源代码。'
  },
  {
    id: 8,
    category: 'account',
    question: '如何修改密码？',
    answer: '登录后进入个人中心，点击「账号设置」，在密码修改部分填写旧密码和新密码即可。'
  },
  {
    id: 9,
    category: 'account',
    question: '如何绑定手机号？',
    answer: '登录后进入个人中心，点击「账号设置」，在个人信息部分可以绑定或修改手机号。'
  },
  {
    id: 10,
    category: 'other',
    question: '客服工作时间是多久？',
    answer: '我们的客服工作时间是工作日9:00-18:00，您可以通过电话、微信或邮箱联系我们。'
  }
])

// 筛选后的FAQ
const filteredFaqs = computed(() => {
  return faqs.value.filter(faq => {
    const categoryMatch = selectedCategory.value === 'all' || faq.category === selectedCategory.value
    const searchMatch = searchQuery.value === '' || 
      faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
    return categoryMatch && searchMatch
  })
})

// 切换FAQ展开状态
const toggleFaq = (id: number) => {
  faqOpen.value[id] = !faqOpen.value[id]
}
</script>

<style scoped>
/* Faq component styles */
</style>