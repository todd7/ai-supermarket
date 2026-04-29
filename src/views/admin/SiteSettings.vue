<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">站点设置</h1>
      <button
        @click="saveSettings"
        class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        保存设置
      </button>
    </div>
    
    <!-- Site Info -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">网站信息</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label for="siteName" class="block text-sm font-medium text-gray-700 mb-1">网站名称 <span class="text-red-500">*</span></label>
          <input
            type="text"
            id="siteName"
            v-model="settings.siteName"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入网站名称"
          />
        </div>
        <div>
          <label for="siteLogo" class="block text-sm font-medium text-gray-700 mb-1">网站Logo</label>
          <div class="flex items-center space-x-4">
            <div v-if="settings.siteLogo" class="relative">
              <img :src="settings.siteLogo" class="h-16 w-16 object-cover rounded-md" alt="网站Logo">
              <button
                @click="settings.siteLogo = ''"
                class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            <div v-else class="h-16 w-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
              <span class="text-gray-500">点击上传</span>
            </div>
            <input
              type="file"
              @change="handleLogoUpload($event)"
              class="hidden"
              id="siteLogo"
            />
            <label
              for="siteLogo"
              class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              选择图片
            </label>
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="siteDescription" class="block text-sm font-medium text-gray-700 mb-1">网站描述</label>
          <textarea
            id="siteDescription"
            v-model="settings.siteDescription"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入网站描述"
          ></textarea>
        </div>
      </div>
    </div>
    
    <!-- Contact Info -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">联系方式</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label for="customerServicePhone" class="block text-sm font-medium text-gray-700 mb-1">客服电话</label>
          <input
            type="tel"
            id="customerServicePhone"
            v-model="settings.customerServicePhone"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入客服电话"
          />
        </div>
        <div>
          <label for="customerServiceEmail" class="block text-sm font-medium text-gray-700 mb-1">客服邮箱</label>
          <input
            type="email"
            id="customerServiceEmail"
            v-model="settings.customerServiceEmail"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入客服邮箱"
          />
        </div>
        <div>
          <label for="wechatQrCode" class="block text-sm font-medium text-gray-700 mb-1">微信二维码</label>
          <div class="flex items-center space-x-4">
            <div v-if="settings.wechatQrCode" class="relative">
              <img :src="settings.wechatQrCode" class="h-32 w-32 object-cover rounded-md" alt="微信二维码">
              <button
                @click="settings.wechatQrCode = ''"
                class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            <div v-else class="h-32 w-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
              <span class="text-gray-500">点击上传</span>
            </div>
            <input
              type="file"
              @change="handleWechatQrCodeUpload($event)"
              class="hidden"
              id="wechatQrCode"
            />
            <label
              for="wechatQrCode"
              class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              选择图片
            </label>
          </div>
        </div>
        <div>
          <label for="workingHours" class="block text-sm font-medium text-gray-700 mb-1">工作时间</label>
          <input
            type="text"
            id="workingHours"
            v-model="settings.workingHours"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入工作时间"
          />
        </div>
      </div>
    </div>
    
    <!-- Footer Info -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">页脚信息</h2>
      <div class="grid grid-cols-1 gap-4 sm:col-span-2">
        <div>
          <label for="footerCopyright" class="block text-sm font-medium text-gray-700 mb-1">版权信息</label>
          <input
            type="text"
            id="footerCopyright"
            v-model="settings.footerCopyright"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入版权信息"
          />
        </div>
        <div>
          <label for="footerIcp" class="block text-sm font-medium text-gray-700 mb-1">备案号</label>
          <input
            type="text"
            id="footerIcp"
            v-model="settings.footerIcp"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入备案号"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 站点设置
const settings = ref({
  siteName: 'AI模板超市',
  siteLogo: '',
  siteDescription: '提供可一键部署的AI应用和日常应用模板，以及自定义应用的代部署技术服务',
  customerServicePhone: '400-123-4567',
  customerServiceEmail: 'support@aitemplateshop.com',
  wechatQrCode: '',
  workingHours: '周一至周五 9:00-18:00',
  footerCopyright: '© 2026 AI模板超市. 保留所有权利.',
  footerIcp: '京ICP备12345678号'
})

// 处理Logo上传
const handleLogoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    // 模拟上传，实际项目中需要调用上传接口
    const file = target.files[0]
    settings.value.siteLogo = URL.createObjectURL(file)
  }
}

// 处理微信二维码上传
const handleWechatQrCodeUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    // 模拟上传，实际项目中需要调用上传接口
    const file = target.files[0]
    settings.value.wechatQrCode = URL.createObjectURL(file)
  }
}

// 保存设置
const saveSettings = () => {
  if (!settings.value.siteName) {
    alert('请填写网站名称')
    return
  }
  
  // 模拟保存操作
  console.log('Save site settings:', settings.value)
  alert('设置保存成功')
}

onMounted(() => {
  // 加载站点设置
  console.log('Site settings loaded')
})
</script>

<style scoped>
/* SiteSettings component styles */
</style>