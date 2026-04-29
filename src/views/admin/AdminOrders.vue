<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-lg font-medium text-gray-900">订单管理</h2>
    </div>
    
    <div class="px-6 py-4">
      <div class="flex items-center justify-between mb-4">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索订单..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div>
          <select
            v-model="statusFilter"
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部状态</option>
            <option value="待处理">待处理</option>
            <option value="已支付">已支付</option>
            <option value="已交付">已交付</option>
            <option value="已完成">已完成</option>
          </select>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                订单ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                客户信息
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                订单类型
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                总价
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                下单时间
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in filteredOrders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ order.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ order.customerName }}</div>
                <div class="text-gray-500">{{ order.customerEmail }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ order.type === 'template' ? '模板购买' : '代部署服务' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ¥{{ order.totalPrice }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusClass(order.status)">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ order.createdAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-blue-600 hover:text-blue-800 mr-3">
                  查看
                </button>
                <button v-if="order.status === '待处理'" class="text-green-600 hover:text-green-800 mr-3">
                  处理
                </button>
                <button v-if="order.status === '已支付' && order.type === 'deployment'" class="text-purple-600 hover:text-purple-800">
                  上传交付物
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="filteredOrders.length === 0" class="text-center py-8">
        <p class="text-gray-500">未找到订单</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Order {
  id: number
  customerName: string
  customerEmail: string
  type: 'template' | 'deployment'
  totalPrice: number
  status: string
  createdAt: string
}

const orders = ref<Order[]>([
  {
    id: 1001,
    customerName: '张三',
    customerEmail: 'zhangsan@example.com',
    type: 'template',
    totalPrice: 99,
    status: '已完成',
    createdAt: '2026-03-01 10:30:00'
  },
  {
    id: 1002,
    customerName: '李四',
    customerEmail: 'lisi@example.com',
    type: 'deployment',
    totalPrice: 199,
    status: '待处理',
    createdAt: '2026-03-05 14:20:00'
  },
  {
    id: 1003,
    customerName: '王五',
    customerEmail: 'wangwu@example.com',
    type: 'template',
    totalPrice: 49,
    status: '已交付',
    createdAt: '2026-03-08 09:15:00'
  },
  {
    id: 1004,
    customerName: '赵六',
    customerEmail: 'zhaoliu@example.com',
    type: 'deployment',
    totalPrice: 399,
    status: '已支付',
    createdAt: '2026-03-09 11:45:00'
  }
])

const searchQuery = ref('')
const statusFilter = ref('all')

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = order.id.toString().includes(searchQuery.value) ||
                        order.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        order.customerEmail.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || order.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

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
</script>

<style scoped>
/* AdminOrders component styles */
</style>