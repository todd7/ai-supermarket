<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <Navbar />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">自定义应用代部署服务</h1>
      
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">服务套餐</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              v-for="pkg in packages"
              :key="pkg.id"
              @click="selectedPackage = pkg.id"
              :class="[
                'border rounded-lg p-6 cursor-pointer transition-all',
                selectedPackage === pkg.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              ]"
            >
              <h3 class="text-lg font-medium text-gray-900">{{ pkg.name }}</h3>
              <div class="mt-2">
                <span class="text-2xl font-bold text-gray-900">¥{{ pkg.price }}</span>
              </div>
              <p class="mt-1 text-sm text-gray-500">{{ pkg.deliveryTime }}</p>
              <ul class="mt-4 space-y-2">
                <li v-for="feature in pkg.features" :key="feature" class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-xl font-semibold text-gray-900 mb-4">部署需求</h2>
          
          <form @submit.prevent="submitOrder">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">联系人姓名 *</label>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">手机号 *</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="form.phone"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label for="wechat" class="block text-sm font-medium text-gray-700 mb-1">微信 *</label>
                <input
                  type="text"
                  id="wechat"
                  v-model="form.wechat"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label for="appType" class="block text-sm font-medium text-gray-700 mb-1">应用类型 *</label>
                <select
                  id="appType"
                  v-model="form.appType"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">请选择</option>
                  <option value="ai">AI 应用</option>
                  <option value="daily">日常应用</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>
            
            <div class="mb-6">
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">部署需求描述 *</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请详细描述您的部署需求，包括应用类型、技术栈、功能要求等（不少于20字）"
                required
                minlength="20"
              ></textarea>
            </div>
            
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">应用代码/材料上传 *</label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>上传文件</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" multiple />
                    </label>
                    <p class="pl-1">或拖放文件</p>
                  </div>
                  <p class="text-xs text-gray-500">
                    支持压缩包、链接上传，最大500MB
                  </p>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label for="expectedDelivery" class="block text-sm font-medium text-gray-700 mb-1">期望交付时间</label>
                <input
                  type="date"
                  id="expectedDelivery"
                  v-model="form.expectedDelivery"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">备注信息</label>
                <input
                  type="text"
                  id="notes"
                  v-model="form.notes"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="其他需要说明的信息"
                />
              </div>
            </div>
            
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                提交订单并支付
              </button>
            </div>
          </form>
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
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const router = useRouter()

const selectedPackage = ref(1)

const packages = [
  {
    id: 1,
    name: '基础代部署',
    price: 199,
    deliveryTime: '1个工作日交付',
    features: [
        '单应用部署',
        '环境配置',
        '基础部署文档',
        '7天技术支持'
      ]
  },
  {
    id: 2,
    name: '高级代部署',
    price: 399,
    deliveryTime: '2个工作日交付',
    features: [
        '应用部署',
        '模型配置',
        '调试',
        '7天售后',
        '详细部署文档'
      ]
  },
  {
    id: 3,
    name: '一站式定制',
    price: 599,
    deliveryTime: '3个工作日交付',
    features: [
        '模板+部署',
        '定制化配置',
        '15天售后',
        '完整部署文档',
        '性能优化'
      ]
  }
]

const form = ref({
  name: '',
  phone: '',
  wechat: '',
  appType: '',
  description: '',
  expectedDelivery: '',
  notes: ''
})

const submitOrder = () => {
  // 表单验证
  if (!form.value.name || !form.value.phone || !form.value.wechat || !form.value.appType || !form.value.description || form.value.description.length < 20) {
    alert('请填写所有必填字段，并且部署需求描述不少于20字')
    return
  }
  
  // 生成订单并跳转到支付结果页
  alert('订单提交成功，即将跳转到支付页面')
  router.push('/payment-result?status=success')
}
</script>

<style scoped>
/* DeploymentService component styles */
</style>