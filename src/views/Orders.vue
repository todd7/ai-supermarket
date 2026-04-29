<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <Navbar />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">我的订单</h1>
      
      <div v-if="orders.length > 0" class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">订单列表</h2>
        </div>
        
        <div class="divide-y divide-gray-200">
          <div
            v-for="order in orders"
            :key="order.id"
            class="px-6 py-4"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">订单 #{{ order.id }}</h3>
                <p class="mt-1 text-sm text-gray-500">下单时间: {{ order.createdAt }}</p>
              </div>
              <div class="text-right">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusClass(order.status)">
                  {{ order.status }}
                </span>
                <p class="mt-1 text-sm font-medium text-gray-900">总计: ¥{{ order.totalPrice }}</p>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex flex-col space-y-2">
                <div
                  v-for="item in order.items"
                  :key="item.id"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center">
                    <div class="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                      <p class="text-xs text-gray-500">{{ item.description }}</p>
                    </div>
                  </div>
                  <div class="text-sm font-medium text-gray-900">¥{{ item.price }}</div>
                </div>
              </div>
            </div>
            <div class="mt-4 flex justify-end space-x-3">
              <button
                v-if="order.status === '已支付' && order.type === 'template'"
                @click="downloadDeliverables(order.id)"
                class="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
              >
                下载交付物
              </button>
              <button
                v-if="order.status === '已交付' && order.type === 'deployment'"
                @click="confirmReceipt(order.id)"
                class="px-4 py-2 text-sm text-green-600 hover:text-green-800"
              >
                确认验收
              </button>
              <button
                @click="viewOrderDetails(order.id)"
                class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                查看详情
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">暂无订单</h3>
          <p class="mt-2 text-gray-500">您还没有任何订单</p>
          <router-link
            to="/templates"
            class="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            去购物
          </router-link>
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
              <li><a href="#" class="text-base text-gray-300 hover:text-white">帮助中心</a></li>
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
              <li><a href="#" class="text-base text-gray-300 hover:text-white">隐私政策</a></li>
              <li><a href="#" class="text-base text-gray-300 hover:text-white">服务条款</a></li>
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

interface OrderItem {
  id: number
  name: string
  description: string
  price: number
}

interface Order {
  id: number
  createdAt: string
  status: string
  totalPrice: number
  type: 'template' | 'deployment'
  items: OrderItem[]
}

const orders = ref<Order[]>([
  {
    id: 1001,
    createdAt: '2026-03-01 10:30:00',
    status: '已完成',
    totalPrice: 99,
    type: 'template',
    items: [
      {
        id: 1,
        name: 'AI文案生成工具',
        description: '基于大语言模型的文案生成工具',
        price: 99
      }
    ]
  },
  {
    id: 1002,
    createdAt: '2026-03-05 14:20:00',
    status: '已支付',
    totalPrice: 199,
    type: 'deployment',
    items: [
      {
        id: 2,
        name: '标准部署服务',
        description: '复杂应用部署',
        price: 199
      }
    ]
  },
  {
    id: 1003,
    createdAt: '2026-03-08 09:15:00',
    status: '已交付',
    totalPrice: 49,
    type: 'template',
    items: [
      {
        id: 3,
        name: '个人博客模板',
        description: '简洁美观的个人博客模板',
        price: 49
      }
    ]
  }
])

const getStatusClass = (status: string) => {
  switch (status) {
    case '待处理':
      return 'bg-yellow-100 text-yellow-800'
    case '已支付':
      return 'bg-blue-100 text-blue-800'
    case '已交付':
      return 'bg-green-100 text-green-800'
    case '已完成':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const downloadDeliverables = (orderId: number) => {
  // Download deliverables logic
  alert('开始下载交付物')
}

const confirmReceipt = (orderId: number) => {
  // Confirm receipt logic
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.status = '已完成'
    alert('验收成功')
  }
}

const viewOrderDetails = (orderId: number) => {
  // View order details logic
  alert(`查看订单 ${orderId} 详情`)
}
</script>

<style scoped>
/* Orders component styles */
</style>