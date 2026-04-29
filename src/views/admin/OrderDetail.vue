<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">订单详情</h1>
      <router-link
        to="/admin/orders"
        class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        返回列表
      </router-link>
    </div>
    
    <!-- Order Info -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">订单基本信息</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p class="text-sm text-gray-500">订单编号</p>
          <p class="text-sm font-medium text-gray-900">{{ order.orderId }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">订单类型</p>
          <p class="text-sm font-medium text-gray-900">{{ order.orderType === 'template' ? '模板订单' : '代部署订单' }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">订单状态</p>
          <span
            :class="[
              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
              getStatusClass(order.orderStatus)
            ]"
          >
            {{ getStatusText(order.orderStatus) }}
          </span>
        </div>
        <div>
          <p class="text-sm text-gray-500">创建时间</p>
          <p class="text-sm font-medium text-gray-900">{{ order.createdAt }}</p>
        </div>
      </div>
    </div>
    
    <!-- User Info -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">用户信息</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p class="text-sm text-gray-500">用户名</p>
          <p class="text-sm font-medium text-gray-900">{{ order.userName }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">手机号</p>
          <p class="text-sm font-medium text-gray-900">{{ order.phone }}</p>
        </div>
        <div v-if="order.wechat">
          <p class="text-sm text-gray-500">微信</p>
          <p class="text-sm font-medium text-gray-900">{{ order.wechat }}</p>
        </div>
      </div>
    </div>
    
    <!-- Product Info -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">商品信息</h2>
      <div class="border-t border-gray-200 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div v-if="order.productImage" class="flex-shrink-0">
              <img :src="order.productImage" class="h-12 w-12 object-cover rounded-md" :alt="order.productName">
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">{{ order.productName }}</p>
              <p class="text-sm text-gray-500">{{ order.productDescription }}</p>
            </div>
          </div>
          <div class="text-sm font-medium text-gray-900">
            ¥{{ order.amount }}
          </div>
        </div>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <div class="text-sm font-medium text-gray-900">合计</div>
        <div class="text-sm font-medium text-gray-900">¥{{ order.amount }}</div>
      </div>
    </div>
    
    <!-- Payment Info -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">支付信息</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p class="text-sm text-gray-500">支付状态</p>
          <span
            :class="[
              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
              order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            ]"
          >
            {{ order.paymentStatus === 'paid' ? '已支付' : '待支付' }}
          </span>
        </div>
        <div v-if="order.paymentTime">
          <p class="text-sm text-gray-500">支付时间</p>
          <p class="text-sm font-medium text-gray-900">{{ order.paymentTime }}</p>
        </div>
        <div v-if="order.paymentMethod">
          <p class="text-sm text-gray-500">支付方式</p>
          <p class="text-sm font-medium text-gray-900">{{ order.paymentMethod }}</p>
        </div>
        <div v-if="order.transactionId">
          <p class="text-sm text-gray-500">交易号</p>
          <p class="text-sm font-medium text-gray-900">{{ order.transactionId }}</p>
        </div>
      </div>
    </div>
    
    <!-- Deployment Info (for deployment orders) -->
    <div v-if="order.orderType === 'deployment'" class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">部署需求</h2>
      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-500">应用类型</p>
          <p class="text-sm font-medium text-gray-900">{{ order.applicationType }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">部署需求描述</p>
          <p class="text-sm font-medium text-gray-900">{{ order.requirementDescription }}</p>
        </div>
        <div v-if="order.attachments && order.attachments.length > 0">
          <p class="text-sm text-gray-500">上传附件</p>
          <ul class="mt-2 space-y-2">
            <li v-for="(attachment, index) in order.attachments" :key="index" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span class="text-sm text-gray-900">{{ attachment.name }}</span>
              <button class="ml-2 text-blue-600 hover:text-blue-500 text-sm">下载</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Delivery Info -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">交付信息</h2>
      <div v-if="order.deliveryStatus === 'delivered'" class="space-y-4">
        <div>
          <p class="text-sm text-gray-500">交付状态</p>
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            已交付
          </span>
        </div>
        <div>
          <p class="text-sm text-gray-500">交付时间</p>
          <p class="text-sm font-medium text-gray-900">{{ order.deliveryTime }}</p>
        </div>
        <div v-if="order.deliveryItems && order.deliveryItems.length > 0">
          <p class="text-sm text-gray-500">交付物</p>
          <ul class="mt-2 space-y-2">
            <li v-for="(item, index) in order.deliveryItems" :key="index" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span class="text-sm text-gray-900">{{ item.name }}</span>
              <button class="ml-2 text-blue-600 hover:text-blue-500 text-sm">下载</button>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <p class="text-sm text-gray-500">交付状态</p>
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
          未交付
        </span>
      </div>
    </div>
    
    <!-- Order Operations -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">订单操作</h2>
      <div class="flex flex-wrap gap-4">
        <button
          v-if="order.orderStatus === 'pending'"
          @click="confirmPayment"
          class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          确认收款
        </button>
        <button
          v-if="order.orderType === 'deployment' && order.orderStatus === 'paid'"
          @click="updateStatus('processing')"
          class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          标记为处理中
        </button>
        <button
          v-if="order.orderType === 'deployment' && order.orderStatus === 'processing'"
          @click="showDeliveryModal = true"
          class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          上传交付物
        </button>
        <button
          v-if="order.orderStatus === 'delivered'"
          @click="updateStatus('completed')"
          class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          标记为已完成
        </button>
        <button
          v-if="order.orderStatus !== 'cancelled'"
          @click="cancelOrder"
          class="px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          取消订单
        </button>
      </div>
    </div>
    
    <!-- Delivery Modal -->
    <div v-if="showDeliveryModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">上传交付物</h3>
        <form @submit.prevent="uploadDelivery">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">交付物文件</label>
              <input
                type="file"
                @change="handleDeliveryUpload"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                multiple
              />
            </div>
            <div>
              <label for="deliveryNote" class="block text-sm font-medium text-gray-700 mb-1">交付备注</label>
              <textarea
                id="deliveryNote"
                v-model="deliveryForm.note"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入交付备注"
              ></textarea>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="showDeliveryModal = false"
              class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              确认交付
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = computed(() => route.params.id as string)

// 订单数据
const order = ref({
  id: 1,
  orderId: '202601020002',
  userName: '李四',
  phone: '13900139002',
  wechat: 'lisi123',
  productName: '高级代部署服务',
  productDescription: '应用部署 + 模型配置 + 调试 + 7天售后',
  productImage: 'https://picsum.photos/200/150?random=1',
  orderType: 'deployment',
  amount: 399,
  paymentStatus: 'paid',
  paymentTime: '2026-01-02 15:00:00',
  paymentMethod: '微信支付',
  transactionId: '4200001234567890',
  orderStatus: 'processing',
  deliveryStatus: 'pending',
  createdAt: '2026-01-02 14:30:00',
  applicationType: 'AI应用',
  requirementDescription: '需要部署一个AI客服系统，要求能够对接企业知识库，支持多轮对话',
  attachments: [
    { id: 1, name: 'AI客服系统源码.zip' },
    { id: 2, name: '需求文档.pdf' }
  ],
  deliveryItems: []
})

// 交付表单
const showDeliveryModal = ref(false)
const deliveryForm = ref({
  note: '',
  files: [] as File[]
})

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

// 确认收款
const confirmPayment = () => {
  if (confirm('确定要确认收款吗？')) {
    order.value.paymentStatus = 'paid'
    order.value.orderStatus = 'paid'
    order.value.paymentTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    console.log('Confirm payment for order:', order.value.orderId)
  }
}

// 更新订单状态
const updateStatus = (status: string) => {
  order.value.orderStatus = status
  if (status === 'delivered') {
    order.value.deliveryStatus = 'delivered'
    order.value.deliveryTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
  console.log('Update order status:', order.value.orderId, status)
}

// 取消订单
const cancelOrder = () => {
  if (confirm('确定要取消这个订单吗？')) {
    order.value.orderStatus = 'cancelled'
    console.log('Cancel order:', order.value.orderId)
  }
}

// 处理交付物上传
const handleDeliveryUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    deliveryForm.value.files = Array.from(target.files)
  }
}

// 上传交付物
const uploadDelivery = () => {
  // 模拟上传
  order.value.deliveryItems = deliveryForm.value.files.map(file => ({
    id: Date.now() + Math.random(),
    name: file.name
  }))
  order.value.orderStatus = 'delivered'
  order.value.deliveryStatus = 'delivered'
  order.value.deliveryTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
  showDeliveryModal.value = false
  console.log('Upload delivery items for order:', order.value.orderId)
}

onMounted(() => {
  // 加载订单详情
  console.log('Loading order detail:', orderId.value)
  // 模拟加载数据
})
</script>

<style scoped>
/* OrderDetail component styles */
</style>