<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">用户详情</h1>
      <router-link
        to="/admin/users"
        class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        返回列表
      </router-link>
    </div>
    
    <!-- User Info -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">基本信息</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p class="text-sm text-gray-500">用户ID</p>
          <p class="text-sm font-medium text-gray-900">{{ user.id }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">昵称</p>
          <p class="text-sm font-medium text-gray-900">{{ user.nickname }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">手机号</p>
          <p class="text-sm font-medium text-gray-900">{{ user.phone }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">状态</p>
          <span
            :class="[
              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
              user.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            ]"
          >
            {{ user.status === 1 ? '正常' : '禁用' }}
          </span>
        </div>
        <div>
          <p class="text-sm text-gray-500">注册时间</p>
          <p class="text-sm font-medium text-gray-900">{{ user.registerTime }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">最后登录时间</p>
          <p class="text-sm font-medium text-gray-900">{{ user.lastLoginTime }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">累计订单数</p>
          <p class="text-sm font-medium text-gray-900">{{ user.orderCount }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">累计消费金额</p>
          <p class="text-sm font-medium text-gray-900">¥{{ user.totalSpent }}</p>
        </div>
      </div>
    </div>
    
    <!-- User Orders -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">历史订单</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                订单编号
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品名称
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                金额
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
            <tr v-for="order in userOrders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ order.orderId }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.productName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ¥{{ order.amount }}
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
                  class="text-blue-600 hover:text-blue-500"
                >
                  查看详情
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- User Downloads -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">下载记录</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                模板名称
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                订单编号
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                下载时间
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="download in userDownloads" :key="download.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ download.templateName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ download.orderId }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ download.downloadTime }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- User Operations -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">用户操作</h2>
      <div class="flex flex-wrap gap-4">
        <button
          @click="toggleUserStatus"
          :class="[
            'px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            user.status === 1 ? 'bg-red-600 border-red-600 text-white hover:bg-red-700' : 'bg-green-600 border-green-600 text-white hover:bg-green-700'
          ]"
        >
          {{ user.status === 1 ? '禁用账号' : '启用账号' }}
        </button>
        <button
          @click="unlockDeliverables"
          class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          手动解锁交付物
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = computed(() => route.params.id as string)

// 用户数据
const user = ref({
  id: 1,
  nickname: '张三',
  phone: '13800138001',
  registerTime: '2026-01-01 10:00:00',
  lastLoginTime: '2026-01-10 14:30:00',
  orderCount: 5,
  totalSpent: 1299,
  status: 1
})

// 用户订单
const userOrders = ref([
  {
    id: 1,
    orderId: '202601010001',
    productName: 'AI客服系统模板',
    amount: 299,
    orderStatus: 'completed',
    createdAt: '2026-01-01 10:00:00'
  },
  {
    id: 2,
    orderId: '202601030003',
    productName: '企业知识库模板',
    amount: 399,
    orderStatus: 'completed',
    createdAt: '2026-01-03 09:15:00'
  },
  {
    id: 3,
    orderId: '202601050005',
    productName: '个人博客模板',
    amount: 199,
    orderStatus: 'completed',
    createdAt: '2026-01-05 11:20:00'
  },
  {
    id: 4,
    orderId: '202601070007',
    productName: 'AI文案生成工具',
    amount: 249,
    orderStatus: 'completed',
    createdAt: '2026-01-07 16:45:00'
  },
  {
    id: 5,
    orderId: '202601090009',
    productName: '进销存管理系统',
    amount: 154,
    orderStatus: 'completed',
    createdAt: '2026-01-09 14:30:00'
  }
])

// 用户下载记录
const userDownloads = ref([
  {
    id: 1,
    templateName: 'AI客服系统模板',
    orderId: '202601010001',
    downloadTime: '2026-01-01 10:30:00'
  },
  {
    id: 2,
    templateName: '企业知识库模板',
    orderId: '202601030003',
    downloadTime: '2026-01-03 09:45:00'
  },
  {
    id: 3,
    templateName: '个人博客模板',
    orderId: '202601050005',
    downloadTime: '2026-01-05 11:40:00'
  }
])

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

// 切换用户状态
const toggleUserStatus = () => {
  if (confirm(`确定要${user.value.status === 1 ? '禁用' : '启用'}这个账号吗？`)) {
    user.value.status = user.value.status === 1 ? 0 : 1
    console.log('Toggle user status:', user.value.id, user.value.status)
  }
}

// 手动解锁交付物
const unlockDeliverables = () => {
  if (confirm('确定要为用户手动解锁所有交付物吗？')) {
    // 模拟解锁操作
    console.log('Unlock deliverables for user:', user.value.id)
    alert('交付物已解锁')
  }
}

onMounted(() => {
  // 加载用户详情
  console.log('Loading user detail:', userId.value)
  // 模拟加载数据
})
</script>

<style scoped>
/* UserDetail component styles */
</style>