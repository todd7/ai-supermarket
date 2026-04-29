<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">系统设置</h1>
    </div>
    
    <!-- Admin Accounts -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-900">管理员账号管理</h2>
        <button
          @click="showAddAdminModal = true"
          class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          新增管理员
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                账号
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                角色
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
            <tr v-for="admin in admins" :key="admin.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ admin.username }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ admin.role }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ admin.createdAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="resetPassword(admin.id)"
                  class="text-blue-600 hover:text-blue-500 mr-3"
                >
                  重置密码
                </button>
                <button
                  v-if="admin.role !== '超级管理员'"
                  @click="deleteAdmin(admin.id)"
                  class="text-red-600 hover:text-red-500"
                >
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Payment Settings -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">支付配置</h2>
      <div class="space-y-6">
        <!-- 线下支付 -->
        <div>
          <h3 class="text-md font-medium text-gray-900 mb-2">线下支付</h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="wechatPayQrCode" class="block text-sm font-medium text-gray-700 mb-1">微信收款码</label>
              <div class="flex items-center space-x-4">
                <div v-if="paymentSettings.wechatPayQrCode" class="relative">
                  <img :src="paymentSettings.wechatPayQrCode" class="h-32 w-32 object-cover rounded-md" alt="微信收款码">
                  <button
                    @click="paymentSettings.wechatPayQrCode = ''"
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
                  @change="handleWechatPayQrCodeUpload($event)"
                  class="hidden"
                  id="wechatPayQrCode"
                />
                <label
                  for="wechatPayQrCode"
                  class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  选择图片
                </label>
              </div>
            </div>
            <div>
              <label for="alipayQrCode" class="block text-sm font-medium text-gray-700 mb-1">支付宝收款码</label>
              <div class="flex items-center space-x-4">
                <div v-if="paymentSettings.alipayQrCode" class="relative">
                  <img :src="paymentSettings.alipayQrCode" class="h-32 w-32 object-cover rounded-md" alt="支付宝收款码">
                  <button
                    @click="paymentSettings.alipayQrCode = ''"
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
                  @change="handleAlipayQrCodeUpload($event)"
                  class="hidden"
                  id="alipayQrCode"
                />
                <label
                  for="alipayQrCode"
                  class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  选择图片
                </label>
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="paymentDescription" class="block text-sm font-medium text-gray-700 mb-1">支付说明</label>
              <textarea
                id="paymentDescription"
                v-model="paymentSettings.paymentDescription"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入支付说明"
              ></textarea>
            </div>
          </div>
        </div>
        
        <!-- 在线支付 -->
        <div>
          <h3 class="text-md font-medium text-gray-900 mb-2">在线支付（预留）</h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="wechatPayAppId" class="block text-sm font-medium text-gray-700 mb-1">微信支付AppID</label>
              <input
                type="text"
                id="wechatPayAppId"
                v-model="paymentSettings.wechatPayAppId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入微信支付AppID"
              />
            </div>
            <div>
              <label for="wechatPayMchId" class="block text-sm font-medium text-gray-700 mb-1">微信支付商户号</label>
              <input
                type="text"
                id="wechatPayMchId"
                v-model="paymentSettings.wechatPayMchId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入微信支付商户号"
              />
            </div>
            <div>
              <label for="alipayAppId" class="block text-sm font-medium text-gray-700 mb-1">支付宝AppID</label>
              <input
                type="text"
                id="alipayAppId"
                v-model="paymentSettings.alipayAppId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入支付宝AppID"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            @click="savePaymentSettings"
            class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            保存支付配置
          </button>
        </div>
      </div>
    </div>
    
    <!-- Backup and Logs -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Backup -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">备份功能</h2>
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 mb-2">定期备份可以防止数据丢失，建议每周至少备份一次。</p>
          </div>
          <div class="flex space-x-4">
            <button
              @click="backupDatabase"
              class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              备份数据库
            </button>
            <button
              @click="backupFiles"
              class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              备份文件
            </button>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-2">备份历史</h3>
            <ul class="space-y-2">
              <li v-for="backup in backupHistory" :key="backup.id" class="flex items-center justify-between">
                <span class="text-sm text-gray-900">{{ backup.name }}</span>
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-500 text-sm">下载</button>
                  <button class="text-red-600 hover:text-red-500 text-sm">删除</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Logs -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">日志管理</h2>
        <div class="space-y-4">
          <div class="flex space-x-4">
            <button
              @click="viewLoginLogs"
              class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              登录日志
            </button>
            <button
              @click="viewOperationLogs"
              class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              操作日志
            </button>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-2">最近操作</h3>
            <ul class="space-y-2">
              <li v-for="log in recentLogs" :key="log.id" class="text-sm text-gray-900">
                <span>{{ log.action }}</span>
                <span class="text-gray-500 ml-2">{{ log.time }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Add Admin Modal -->
    <div v-if="showAddAdminModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">新增管理员</h3>
        <form @submit.prevent="addAdmin">
          <div class="space-y-4">
            <div>
              <label for="adminUsername" class="block text-sm font-medium text-gray-700 mb-1">账号 <span class="text-red-500">*</span></label>
              <input
                type="text"
                id="adminUsername"
                v-model="adminForm.username"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入账号"
              />
            </div>
            <div>
              <label for="adminPassword" class="block text-sm font-medium text-gray-700 mb-1">密码 <span class="text-red-500">*</span></label>
              <input
                type="password"
                id="adminPassword"
                v-model="adminForm.password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入密码"
              />
            </div>
            <div>
              <label for="adminRole" class="block text-sm font-medium text-gray-700 mb-1">角色</label>
              <select
                id="adminRole"
                v-model="adminForm.role"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="管理员">管理员</option>
                <option value="操作员">操作员</option>
              </select>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="showAddAdminModal = false"
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

// 管理员列表
const admins = ref([
  {
    id: 1,
    username: 'admin',
    role: '超级管理员',
    createdAt: '2026-01-01 10:00:00'
  }
])

// 支付设置
const paymentSettings = ref({
  wechatPayQrCode: '',
  alipayQrCode: '',
  paymentDescription: '请将款项支付至以下二维码，支付完成后请等待系统自动确认。',
  wechatPayAppId: '',
  wechatPayMchId: '',
  alipayAppId: ''
})

// 备份历史
const backupHistory = ref([
  {
    id: 1,
    name: '2026-01-10 10:00:00 数据库备份.sql',
    size: '10MB'
  },
  {
    id: 2,
    name: '2026-01-09 10:00:00 数据库备份.sql',
    size: '9MB'
  }
])

// 最近操作日志
const recentLogs = ref([
  {
    id: 1,
    action: '管理员 admin 登录系统',
    time: '2026-01-10 10:00:00'
  },
  {
    id: 2,
    action: '管理员 admin 修改了模板 AI客服系统模板',
    time: '2026-01-10 09:30:00'
  },
  {
    id: 3,
    action: '管理员 admin 新增了Banner 企业知识库模板',
    time: '2026-01-09 16:00:00'
  }
])

// 模态框状态
const showAddAdminModal = ref(false)

// 管理员表单
const adminForm = ref({
  username: '',
  password: '',
  role: '管理员'
})

// 处理微信支付二维码上传
const handleWechatPayQrCodeUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    // 模拟上传，实际项目中需要调用上传接口
    const file = target.files[0]
    paymentSettings.value.wechatPayQrCode = URL.createObjectURL(file)
  }
}

// 处理支付宝二维码上传
const handleAlipayQrCodeUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    // 模拟上传，实际项目中需要调用上传接口
    const file = target.files[0]
    paymentSettings.value.alipayQrCode = URL.createObjectURL(file)
  }
}

// 保存支付配置
const savePaymentSettings = () => {
  // 模拟保存操作
  console.log('Save payment settings:', paymentSettings.value)
  alert('支付配置保存成功')
}

// 备份数据库
const backupDatabase = () => {
  // 模拟备份操作
  console.log('Backup database')
  alert('数据库备份成功')
}

// 备份文件
const backupFiles = () => {
  // 模拟备份操作
  console.log('Backup files')
  alert('文件备份成功')
}

// 查看登录日志
const viewLoginLogs = () => {
  console.log('View login logs')
  alert('查看登录日志')
}

// 查看操作日志
const viewOperationLogs = () => {
  console.log('View operation logs')
  alert('查看操作日志')
}

// 重置密码
const resetPassword = (id: number) => {
  if (confirm('确定要重置该管理员的密码吗？')) {
    console.log('Reset password for admin:', id)
    alert('密码已重置为默认密码：123456')
  }
}

// 删除管理员
const deleteAdmin = (id: number) => {
  if (confirm('确定要删除该管理员吗？')) {
    admins.value = admins.value.filter(admin => admin.id !== id)
    console.log('Delete admin:', id)
  }
}

// 新增管理员
const addAdmin = () => {
  if (!adminForm.value.username || !adminForm.value.password) {
    alert('请填写账号和密码')
    return
  }
  
  const newAdmin = {
    id: admins.value.length + 1,
    username: adminForm.value.username,
    role: adminForm.value.role,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
  admins.value.push(newAdmin)
  showAddAdminModal.value = false
  console.log('Add admin:', newAdmin)
  alert('管理员添加成功')
}

onMounted(() => {
  // 加载系统设置
  console.log('System settings loaded')
})
</script>

<style scoped>
/* SystemSettings component styles */
</style>