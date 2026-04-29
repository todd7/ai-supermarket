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
    <main class="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-8 text-center">
          <!-- 支付成功 -->
          <div v-if="paymentStatus === 'success'" class="mb-8">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">支付成功</h1>
            <p class="text-gray-600 mb-6">您的订单已支付成功，感谢您的购买！</p>
            <div class="bg-gray-50 p-4 rounded-md text-left mb-6">
              <p class="text-sm text-gray-600 mb-2"><span class="font-medium">订单编号：</span>{{ orderId }}</p>
              <p class="text-sm text-gray-600 mb-2"><span class="font-medium">支付金额：</span>¥{{ amount }}</p>
              <p class="text-sm text-gray-600"><span class="font-medium">支付时间：</span>{{ paymentTime }}</p>
            </div>
          </div>
          
          <!-- 支付失败 -->
          <div v-else-if="paymentStatus === 'failed'" class="mb-8">
            <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">支付失败</h1>
            <p class="text-gray-600 mb-6">您的支付未完成，请重试或选择其他支付方式。</p>
            <div class="bg-gray-50 p-4 rounded-md text-left mb-6">
              <p class="text-sm text-gray-600 mb-2"><span class="font-medium">订单编号：</span>{{ orderId }}</p>
              <p class="text-sm text-gray-600 mb-2"><span class="font-medium">支付金额：</span>¥{{ amount }}</p>
              <p class="text-sm text-gray-600"><span class="font-medium">失败原因：</span>{{ failureReason }}</p>
            </div>
          </div>
          
          <!-- 支付处理中 -->
          <div v-else class="mb-8">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">支付处理中</h1>
            <p class="text-gray-600 mb-6">我们正在处理您的支付，请稍候...</p>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              v-if="paymentStatus === 'success'"
              to="/user-center/orders"
              class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              查看订单
            </router-link>
            <router-link
              v-else-if="paymentStatus === 'failed'"
              to="/cart"
              class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              重新支付
            </router-link>
            <router-link
              to="/"
              class="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              返回首页
            </router-link>
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
import { ref, onMounted } from 'vue'

// 支付状态：success, failed, processing
const paymentStatus = ref('success')
// 订单信息
const orderId = ref('202601010001')
const amount = ref('199.00')
const paymentTime = ref('2026-01-01 12:00:00')
const failureReason = ref('支付超时，请重新支付')

onMounted(() => {
  // 从URL参数获取支付状态和订单信息
  const urlParams = new URLSearchParams(window.location.search)
  const status = urlParams.get('status')
  const id = urlParams.get('orderId')
  const amt = urlParams.get('amount')
  
  if (status) {
    paymentStatus.value = status
  }
  if (id) {
    orderId.value = id
  }
  if (amt) {
    amount.value = amt
  }
})
</script>

<style scoped>
/* PaymentResult component styles */
</style>