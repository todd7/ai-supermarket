<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <Navbar />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧导航 -->
        <div class="lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-6">
              <div class="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-900">用户名</h3>
                <p class="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
            <nav class="space-y-1">
              <router-link to="/user-center" class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                个人中心
              </router-link>
              <router-link to="/user-center/orders" class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                我的订单
              </router-link>
              <router-link to="/user-center/collections" class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                我的收藏
              </router-link>
              <router-link to="/user-center/downloads" class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载中心
              </router-link>
              <router-link to="/user-center/settings" class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                账号设置
              </router-link>
              <router-link to="/user-center/support" class="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                联系客服
              </router-link>
            </nav>
          </div>
        </div>

        <!-- 右侧内容区 -->
        <div class="flex-1">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">联系客服</h2>
            
            <!-- 客服信息 -->
            <div class="mb-8">
              <h3 class="text-lg font-medium text-gray-900 mb-4">客服信息</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-gray-50 p-4 rounded-md text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <h4 class="font-medium text-gray-900 mb-1">联系电话</h4>
                  <p class="text-gray-600">400-123-4567</p>
                  <p class="text-xs text-gray-500 mt-1">工作日 9:00-18:00</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-md text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h4 class="font-medium text-gray-900 mb-1">微信客服</h4>
                  <p class="text-gray-600">ai_template_shop</p>
                  <div class="mt-2 flex justify-center">
                    <div class="w-24 h-24 bg-gray-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-md text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-orange-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h4 class="font-medium text-gray-900 mb-1">邮箱</h4>
                  <p class="text-gray-600">support@aitemplateshop.com</p>
                  <p class="text-xs text-gray-500 mt-1">24小时内回复</p>
                </div>
              </div>
            </div>
            
            <!-- 在线咨询 -->
            <div class="mb-8">
              <h3 class="text-lg font-medium text-gray-900 mb-4">在线咨询</h3>
              <form @submit.prevent="submitMessage">
                <div class="mb-4">
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">咨询主题</label>
                  <select
                    id="subject"
                    v-model="message.subject"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">请选择</option>
                    <option value="order">订单问题</option>
                    <option value="deployment">部署问题</option>
                    <option value="template">模板问题</option>
                    <option value="account">账号问题</option>
                    <option value="other">其他问题</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label for="content" class="block text-sm font-medium text-gray-700 mb-1">咨询内容</label>
                  <textarea
                    id="content"
                    v-model="message.content"
                    rows="4"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请详细描述您的问题"
                    required
                  ></textarea>
                </div>
                <div class="flex justify-end">
                  <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    提交咨询
                  </button>
                </div>
              </form>
            </div>
            
            <!-- 常见问题 -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">常见问题</h3>
              <div class="space-y-4">
                <div class="border rounded-md">
                  <button @click="toggleFaq(1)" class="w-full flex justify-between items-center p-4 text-left">
                    <span class="font-medium text-gray-900">如何购买模板？</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 transition-transform" :class="{ 'transform rotate-180': faqOpen[1] }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div v-if="faqOpen[1]" class="p-4 border-t">
                    <p class="text-gray-700">浏览模板超市，选择您需要的模板，点击「立即购买」按钮，完成支付后即可下载模板交付物。</p>
                  </div>
                </div>
                <div class="border rounded-md">
                  <button @click="toggleFaq(2)" class="w-full flex justify-between items-center p-4 text-left">
                    <span class="font-medium text-gray-900">模板如何部署？</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 transition-transform" :class="{ 'transform rotate-180': faqOpen[2] }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div v-if="faqOpen[2]" class="p-4 border-t">
                    <p class="text-gray-700">每个模板都包含详细的部署教程，您可以按照教程步骤进行部署。如果遇到问题，可以选择我们的代部署服务。</p>
                  </div>
                </div>
                <div class="border rounded-md">
                  <button @click="toggleFaq(3)" class="w-full flex justify-between items-center p-4 text-left">
                    <span class="font-medium text-gray-900">如何申请售后？</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 transition-transform" :class="{ 'transform rotate-180': faqOpen[3] }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div v-if="faqOpen[3]" class="p-4 border-t">
                    <p class="text-gray-700">在「我的订单」页面，找到需要售后的订单，点击「申请售后」按钮，填写售后原因和问题描述，我们会在24小时内处理。</p>
                  </div>
                </div>
              </div>
              <div class="mt-4 text-center">
                <router-link to="/faq" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  查看更多常见问题
                </router-link>
              </div>
            </div>
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
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'

// 咨询信息
const message = ref({
  subject: '',
  content: ''
})

// FAQ展开状态
const faqOpen = ref({
  1: false,
  2: false,
  3: false
})

// 切换FAQ展开状态
const toggleFaq = (id: number) => {
  faqOpen.value[id] = !faqOpen.value[id]
}

// 提交咨询
const submitMessage = () => {
  if (!message.value.subject || !message.value.content) {
    alert('请填写咨询主题和内容')
    return
  }
  alert('咨询提交成功，我们将尽快回复您')
  // 清空表单
  message.value = {
    subject: '',
    content: ''
  }
}
</script>

<style scoped>
/* UserSupport component styles */
</style>