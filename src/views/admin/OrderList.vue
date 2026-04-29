<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">订单管理</h1>
      <div class="flex space-x-4">
        <button class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          导出订单
        </button>
      </div>
    </div>
    
    <!-- Filter Section -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">筛选条件</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label for="orderId" class="block text-sm font-medium text-gray-700 mb-1">订单编号</label>
          <input
            type="text"
            id="orderId"
            v-model="filters.orderId"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入订单编号"
          />
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">手机号</label>
          <input
            type="text"
            id="phone"
            v-model="filters.phone"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入手机号"
          />
        </div>
        <div>
          <label for="orderType" class="block text-sm font-medium text-gray-700 mb-1">订单类型</label>
          <select
            id="orderType"
            v-model="filters.orderType"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">全部类型</option>
            <option value="template">模板订单</option>
            <option value="deployment">代部署订单</option>
          </select>
        </div>
        <div>
          <label for="orderStatus" class="block text-sm font-medium text-gray-700 mb-1">订单状态</label>
          <select
            id="orderStatus"
            v-model="filters.orderStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">全部状态</option>
            <option value="pending">待支付</option>
            <option value="paid">已支付</option>
            <option value="delivered">已交付</option>
            <option value="completed">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button
          @click="searchOrders"
          class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          搜索
        </button>
      </div>
    </div>
    
    <!-- Order List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                订单编号
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                用户信息
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品名称
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                订单类型
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                金额
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                支付状态
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                订单状态
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
            <tr v-for="order in orders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ order.orderId }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>{{ order.userName }}</div>
                <div class="text-xs text-gray-400">{{ order.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.productName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.orderType === 'template' ? '模板订单' : '代部署订单' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ¥{{ order.amount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ order.paymentStatus === 'paid' ? '已支付' : '待支付' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    getStatusClass(order.orderStatus)
                  ]"
                >
                  {{ getStatusText(order.orderStatus) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.createdAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <router-link
                  :to="`/admin/orders/${order.id}`"
                  class="text-blue-600 hover:text-blue-500 mr-3"
                >
                  查看详情
                </router-link>
                <button
                  v-if="order.orderStatus === 'pending'"
                  @click="cancelOrder(order.id)"
                  class="text-red-600 hover:text-red-500"
                >
                  取消订单
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
  orderId: '',
  phone: '',
  orderType: '',
  orderStatus: ''
})

// 订单列表
const orders = ref([
  {
    id: 1,
    orderId: '202601010001',
    userName: '张三',
    phone: '13800138001',
    productName: 'AI客服系统模板',
    orderType: 'template',
    amount: 299,
    paymentStatus: 'paid',
    orderStatus: 'completed',
    createdAt: '2026-01-01 10:00:00'
  },
  {
    id: 2,
    orderId: '202601020002',
    userName: '李四',
    phone: '13900139002',
    productName: '高级代部署服务',
    orderType: 'deployment',
    amount: 399,
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    createdAt: '2026-01-02 14:30:00'
  },
  {
    id: 3,
    orderId: '202601030003',
    userName: '王五',
    phone: '13700137003',
    productName: '企业知识库模板',
    orderType: 'template',
    amount: 399,
    paymentStatus: 'pending',
    orderStatus: 'pending',
    createdAt: '2026-01-03 09:15:00'
  },
  {
    id: 4,
    orderId: '202601040004',
    userName: '赵六',
    phone: '13600136004',
    productName: '一站式定制服务',
    orderType: 'deployment',
    amount: 599,
    paymentStatus: 'paid',
    orderStatus: 'processing',
    createdAt: '2026-01-04 16:45:00'
  },
  {
    id: 5,
    orderId: '202601050005',
    userName: '钱七',
    phone: '13500135005',
    productName: '个人博客模板',
    orderType: 'template',
    amount: 199,
    paymentStatus: 'paid',
    orderStatus: 'completed',
    createdAt: '2026-01-05 11:20:00'
  }
])

// 分页信息
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

// 获取状态文本
const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待支付',
    paid: '已支付',
    processing: '处理中',
    delivered: '已交付',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || status
}

// 获取状态样式
const getStatusClass = (status: string) => {
  const classMap: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

// 搜索订单
const searchOrders = () => {
  // 模拟搜索功能
  console.log('Searching orders with filters:', filters.value)
}

// 取消订单
const cancelOrder = (id: number) => {
  if (confirm('确定要取消这个订单吗？')) {
    const order = orders.value.find(o => o.id === id)
    if (order) {
      order.orderStatus = 'cancelled'
    }
    console.log('Cancel order:', id)
  }
}

onMounted(() => {
  // 加载订单列表
  console.log('Order list loaded')
})
</script>

<style scoped>
/* OrderList component styles */
</style>