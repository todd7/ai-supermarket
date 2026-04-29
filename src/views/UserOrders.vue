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
              <router-link to="/user-center/orders" class="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md">
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
              <router-link to="/user-center/support" class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
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
            <h2 class="text-xl font-semibold text-gray-900 mb-6">我的订单</h2>
            
            <!-- 筛选条件 -->
            <div class="flex flex-wrap items-center gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">订单类型</label>
                <select v-model="orderType" class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">全部类型</option>
                  <option value="template">模板订单</option>
                  <option value="deployment">代部署订单</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">订单状态</label>
                <select v-model="orderStatus" class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">全部状态</option>
                  <option value="pending">待支付</option>
                  <option value="paid">已支付</option>
                  <option value="delivered">已交付</option>
                  <option value="completed">已完成</option>
                  <option value="cancelled">已取消</option>
                </select>
              </div>
              <div class="ml-auto">
                <button @click="resetFilters" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                  重置筛选
                </button>
              </div>
            </div>
            
            <!-- 订单列表 -->
            <div class="space-y-6">
              <div v-for="order in filteredOrders" :key="order.id" class="border rounded-md">
                <div class="p-4 border-b">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-base font-medium text-gray-900">订单 #{{ order.id }}</p>
                      <p class="text-sm text-gray-500">创建时间：{{ order.createTime }}</p>
                    </div>
                    <div>
                      <span :class="[
                        'px-3 py-1 rounded-full text-sm font-medium',
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      ]">
                        {{ order.statusText }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="p-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-base font-medium text-gray-900">{{ order.productName }}</p>
                      <p class="text-sm text-gray-500">{{ order.productType === 'template' ? '模板订单' : '代部署服务订单' }}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-lg font-bold text-gray-900">¥{{ order.amount }}</p>
                    </div>
                  </div>
                </div>
                <div class="p-4 border-t flex justify-end space-x-3">
                  <button v-if="order.status === 'pending'" @click="payOrder(order.id)" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                    去支付
                  </button>
                  <button v-if="order.status === 'delivered'" @click="confirmReceipt(order.id)" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                    确认验收
                  </button>
                  <button v-if="order.status === 'paid' || order.status === 'delivered'" @click="downloadDeliverable(order.id)" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm">
                    下载交付物
                  </button>
                  <button @click="viewOrderDetail(order.id)" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                    查看详情
                  </button>
                  <button @click="applyAfterSales(order.id)" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                    申请售后
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 无订单提示 -->
            <div v-if="filteredOrders.length === 0" class="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 class="mt-4 text-lg font-medium text-gray-900">暂无订单</h3>
              <p class="mt-2 text-gray-500">您还没有任何订单记录</p>
              <router-link
                to="/templates"
                class="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                去选购模板
              </router-link>
            </div>
            
            <!-- 分页 -->
            <div v-if="filteredOrders.length > 0" class="mt-8 flex justify-center">
              <nav class="flex items-center space-x-2">
                <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" :disabled="currentPage === 1">
                  上一页
                </button>
                <button class="px-3 py-1 border border-blue-500 bg-blue-50 text-sm font-medium text-blue-600 rounded-md">
                  {{ currentPage }}
                </button>
                <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  下一页
                </button>
              </nav>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const router = useRouter()

// 订单类型和状态筛选
const orderType = ref('all')
const orderStatus = ref('all')
const currentPage = ref(1)

// 订单数据
const orders = ref([
  {
    id: 10001,
    createTime: '2024-01-15 10:30:00',
    productName: 'AI文案生成工具',
    productType: 'template',
    amount: 99,
    status: 'pending',
    statusText: '待支付'
  },
  {
    id: 10002,
    createTime: '2024-01-14 15:20:00',
    productName: '高级代部署服务',
    productType: 'deployment',
    amount: 399,
    status: 'delivered',
    statusText: '已交付'
  },
  {
    id: 10003,
    createTime: '2024-01-13 09:15:00',
    productName: '智能客服系统',
    productType: 'template',
    amount: 199,
    status: 'completed',
    statusText: '已完成'
  },
  {
    id: 10004,
    createTime: '2024-01-12 14:45:00',
    productName: '基础代部署',
    productType: 'deployment',
    amount: 199,
    status: 'paid',
    statusText: '已支付'
  },
  {
    id: 10005,
    createTime: '2024-01-11 11:20:00',
    productName: '个人博客模板',
    productType: 'template',
    amount: 49,
    status: 'completed',
    statusText: '已完成'
  }
])

// 筛选后的订单
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const typeMatch = orderType.value === 'all' || order.productType === orderType.value
    const statusMatch = orderStatus.value === 'all' || order.status === orderStatus.value
    return typeMatch && statusMatch
  })
})

// 重置筛选
const resetFilters = () => {
  orderType.value = 'all'
  orderStatus.value = 'all'
}

// 支付订单
const payOrder = (orderId: number) => {
  router.push('/payment-result?status=success')
}

// 确认验收
const confirmReceipt = (orderId: number) => {
  alert('验收成功')
  // 更新订单状态
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.status = 'completed'
    order.statusText = '已完成'
  }
}

// 下载交付物
const downloadDeliverable = (orderId: number) => {
  alert('开始下载交付物')
}

// 查看订单详情
const viewOrderDetail = (orderId: number) => {
  // 跳转到订单详情页
  alert(`查看订单 ${orderId} 的详情`)
}

// 申请售后
const applyAfterSales = (orderId: number) => {
  alert('申请售后成功，我们将尽快处理')
}
</script>

<style scoped>
/* UserOrders component styles */
</style>