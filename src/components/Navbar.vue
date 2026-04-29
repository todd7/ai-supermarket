<template>
  <header class="header bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <h1 class="text-xl font-bold text-blue-600">AI模板超市</h1>
        <nav class="hidden md:flex space-x-6">
          <router-link to="/" class="text-gray-700 hover:text-blue-600 transition-colors">首页</router-link>
          <router-link to="/templates" class="text-gray-700 hover:text-blue-600 transition-colors">模板超市</router-link>
          <router-link to="/deployment" class="text-gray-700 hover:text-blue-600 transition-colors">代部署服务</router-link>
          <router-link to="/faq" class="text-gray-700 hover:text-blue-600 transition-colors">常见问题</router-link>
        </nav>
      </div>
      <div class="flex items-center space-x-4">
        <router-link to="/cart" class="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </router-link>
        <router-link to="/orders" class="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </router-link>
        <div v-if="isLoggedIn" class="ml-4 flex items-center space-x-4">
          <div class="relative">
            <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              <span>{{ userInfo.username }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <router-link to="/user-center" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                个人中心
              </router-link>
              <router-link to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                我的订单
              </router-link>
              <router-link to="/user-center/downloads" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                下载中心
              </router-link>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                退出登录
              </button>
            </div>
          </div>
        </div>
        <div v-else class="ml-4 space-x-2">
          <router-link to="/login" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
            登录
          </router-link>
          <router-link to="/register" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            注册
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 登录状态
const isLoggedIn = ref(false)
const userInfo = ref({ username: '', phone: '' })
const showUserMenu = ref(false)

// 检查登录状态
const checkLoginStatus = () => {
  const token = localStorage.getItem('userToken')
  if (token) {
    isLoggedIn.value = true
    const userInfoStr = localStorage.getItem('userInfo')
    if (userInfoStr) {
      userInfo.value = JSON.parse(userInfoStr)
    }
  } else {
    isLoggedIn.value = false
  }
}

// 退出登录
const logout = () => {
  localStorage.removeItem('userToken')
  localStorage.removeItem('userInfo')
  isLoggedIn.value = false
  userInfo.value = { username: '', phone: '' }
  showUserMenu.value = false
  router.push('/')
}

// 组件挂载时检查登录状态
onMounted(() => {
  checkLoginStatus()
})

// 监听路由变化，每次页面切换时检查登录状态
watch(() => route.path, () => {
  checkLoginStatus()
})
</script>

<style scoped>
/* Navbar component styles */
</style>