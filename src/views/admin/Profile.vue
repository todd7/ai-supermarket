<template>
  <div class="profile-page">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">个人资料</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex flex-col md:flex-row md:items-center md:space-x-8">
        <div class="flex-shrink-0 mb-6 md:mb-0">
          <div class="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <span class="text-2xl font-bold text-gray-700">管</span>
          </div>
        </div>
        
        <div class="flex-1">
          <h2 class="text-xl font-semibold text-gray-900">管理员</h2>
          <p class="text-gray-500 mt-1">系统管理员账号</p>
          
          <div class="mt-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <p class="text-gray-900">admin</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <p class="text-gray-900">admin@example.com</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">最后登录时间</label>
              <p class="text-gray-900">{{ lastLoginTime }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-8 border-t pt-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">修改密码</h3>
        
        <form @submit.prevent="handlePasswordChange" class="space-y-4">
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">当前密码</label>
            <input
              type="password"
              id="currentPassword"
              v-model="passwordForm.currentPassword"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入当前密码"
            />
          </div>
          
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">新密码</label>
            <input
              type="password"
              id="newPassword"
              v-model="passwordForm.newPassword"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入新密码"
            />
          </div>
          
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="passwordForm.confirmPassword"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请再次输入新密码"
            />
          </div>
          
          <div class="pt-4">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              保存修改
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const lastLoginTime = ref('2026-03-10 10:00:00')

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const handlePasswordChange = () => {
  // 验证表单
  if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    alert('请填写完整信息')
    return
  }
  
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  
  // 模拟密码修改
  alert('密码修改成功')
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

onMounted(() => {
  // 这里可以从后端获取管理员信息
  // 暂时使用模拟数据
})
</script>

<style scoped>
/* Profile component styles */
</style>