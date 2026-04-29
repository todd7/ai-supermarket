<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">协议管理</h1>
    </div>
    
    <!-- Agreement List -->
    <div class="space-y-6">
      <!-- 隐私政策 -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-medium text-gray-900">隐私政策</h2>
          <button
            @click="editAgreement('privacy')"
            class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            编辑
          </button>
        </div>
        <div class="prose max-w-none">
          <p v-if="!agreements.privacy" class="text-gray-500">暂无内容</p>
          <div v-else v-html="agreements.privacy"></div>
        </div>
      </div>
      
      <!-- 服务协议 -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-medium text-gray-900">服务协议</h2>
          <button
            @click="editAgreement('terms')"
            class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            编辑
          </button>
        </div>
        <div class="prose max-w-none">
          <p v-if="!agreements.terms" class="text-gray-500">暂无内容</p>
          <div v-else v-html="agreements.terms"></div>
        </div>
      </div>
      
      <!-- 售后规则 -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-medium text-gray-900">售后规则</h2>
          <button
            @click="editAgreement('afterSales')"
            class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            编辑
          </button>
        </div>
        <div class="prose max-w-none">
          <p v-if="!agreements.afterSales" class="text-gray-500">暂无内容</p>
          <div v-else v-html="agreements.afterSales"></div>
        </div>
      </div>
    </div>
    
    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">{{ currentAgreement === 'privacy' ? '编辑隐私政策' : currentAgreement === 'terms' ? '编辑服务协议' : '编辑售后规则' }}</h3>
        <form @submit.prevent="saveAgreement">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">内容</label>
              <textarea
                v-model="agreementForm.content"
                rows="10"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入协议内容"
              ></textarea>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="cancelEdit"
              class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 协议内容
const agreements = ref({
  privacy: `
    <h2>隐私政策</h2>
    <p>本隐私政策描述了AI模板超市如何收集、使用、存储和保护您的个人信息。</p>
    <h3>1. 收集的信息</h3>
    <p>我们收集以下类型的个人信息：</p>
    <ul>
      <li>个人身份信息：姓名、手机号、邮箱、微信等联系方式</li>
      <li>账户信息：用户名、密码（加密存储）</li>
      <li>订单信息：购买的模板、服务、支付记录等</li>
      <li>浏览信息：访问的页面、搜索的内容、停留时间等</li>
      <li>设备信息：IP地址、浏览器类型、操作系统等</li>
    </ul>
    <h3>2. 使用目的</h3>
    <p>我们使用收集的信息用于以下目的：</p>
    <ul>
      <li>提供和维护我们的服务</li>
      <li>处理订单和支付</li>
      <li>与您沟通，包括发送订单确认、服务更新等</li>
      <li>改进我们的网站和服务</li>
      <li>预防和检测欺诈行为</li>
      <li>遵守法律法规</li>
    </ul>
  `,
  terms: `
    <h2>服务协议</h2>
    <p>本服务协议（以下简称「协议」）是您与AI模板超市之间关于使用我们的服务所达成的法律协议。</p>
    <h3>1. 协议接受</h3>
    <p>通过注册、登录或使用我们的服务，您表示您已阅读、理解并同意受本协议的约束。如果您不同意本协议的任何条款，您应立即停止使用我们的服务。</p>
    <h3>2. 服务内容</h3>
    <p>我们提供以下服务：</p>
    <ul>
      <li>应用模板售卖：提供可一键部署的AI应用和日常应用模板</li>
      <li>代部署服务：为客户提供自定义应用的部署服务</li>
    </ul>
    <h3>3. 账户注册与管理</h3>
    <p>3.1 您需要注册一个账户才能使用我们的部分服务。您应提供真实、准确、完整的个人信息，并在信息变更时及时更新。</p>
    <p>3.2 您应妥善保管账户密码，对使用您账户的所有行为负责。如果发现账户被未经授权使用，您应立即通知我们。</p>
  `,
  afterSales: `
    <h2>售后规则</h2>
    <h3>1. 模板购买售后</h3>
    <p>1.1 模板购买后，如发现模板存在质量问题，您可以在7天内申请退款。</p>
    <p>1.2 模板购买后，我们提供30天的技术支持，帮助您解决部署过程中遇到的问题。</p>
    <h3>2. 代部署服务售后</h3>
    <p>2.1 代部署服务完成后，我们提供7-15天的售后支持，具体以服务套餐为准。</p>
    <p>2.2 如因我们的原因导致部署失败，我们将全额退款。</p>
    <h3>3. 售后申请流程</h3>
    <p>3.1 您可以在「个人中心 - 我的订单」页面提交售后申请。</p>
    <p>3.2 我们会在24小时内响应您的售后申请，并在3个工作日内给出处理结果。</p>
  `
})

// 模态框状态
const showEditModal = ref(false)
const currentAgreement = ref('')

// 协议表单
const agreementForm = ref({
  content: ''
})

// 编辑协议
const editAgreement = (type: string) => {
  currentAgreement.value = type
  agreementForm.value.content = agreements.value[type as keyof typeof agreements.value] || ''
  showEditModal.value = true
}

// 取消编辑
const cancelEdit = () => {
  showEditModal.value = false
  currentAgreement.value = ''
  agreementForm.value.content = ''
}

// 保存协议
const saveAgreement = () => {
  if (currentAgreement.value) {
    agreements.value[currentAgreement.value as keyof typeof agreements.value] = agreementForm.value.content
    console.log('Save agreement:', currentAgreement.value)
    cancelEdit()
  }
}

onMounted(() => {
  // 加载协议内容
  console.log('Agreement list loaded')
})
</script>

<style scoped>
/* AgreementList component styles */
</style>