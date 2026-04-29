<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
          后台管理系统
        </h2>
        <p class="mt-2 text-sm text-center text-gray-600">
          请登录您的管理员账号
        </p>
      </div>
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">账号</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              v-model="form.username"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="请输入管理员账号"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              v-model="form.password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="请输入密码"
            />
          </div>
          <div class="flex items-center space-x-2">
            <div class="flex-1">
              <label for="captcha" class="sr-only">验证码</label>
              <input
                id="captcha"
                name="captcha"
                type="text"
                required
                v-model="form.captcha"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="请输入验证码"
              />
            </div>
            <div class="w-32">
              <img
                :src="captchaImage"
                @click="refreshCaptcha"
                class="h-10 w-full object-cover cursor-pointer rounded-md"
                alt="验证码"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="form.remember"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              记住我
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
              忘记密码？
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
            登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const captchaImage = ref('https://picsum.photos/120/40')

const form = ref({
  username: 'admin',
  password: 'admin123',
  captcha: '',
  remember: false
})

// 生成随机验证码
const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let captcha = ''
  for (let i = 0; i < 4; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return captcha
}

// 生成验证码图片
const generateCaptchaImage = (captcha: string) => {
  // 创建canvas元素
  const canvas = document.createElement('canvas')
  canvas.width = 120
  canvas.height = 40
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    // 绘制背景
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 绘制验证码
    ctx.font = '20px Arial'
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(captcha, canvas.width / 2, canvas.height / 2)
    
    // 添加干扰线
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.strokeStyle = '#ccc'
      ctx.stroke()
    }
    
    // 添加干扰点
    for (let i = 0; i < 50; i++) {
      ctx.beginPath()
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2)
      ctx.fillStyle = '#ddd'
      ctx.fill()
    }
    
    return canvas.toDataURL('image/png')
  }
  return ''
}

// 刷新验证码
const currentCaptcha = ref('')
const refreshCaptcha = () => {
  currentCaptcha.value = generateCaptcha()
  captchaImage.value = generateCaptchaImage(currentCaptcha.value)
}

// 处理登录
const handleLogin = async () => {
  loading.value = true
  
  try {
    // 验证验证码
    if (form.value.captcha.toLowerCase() !== currentCaptcha.value.toLowerCase()) {
      alert('验证码错误')
      refreshCaptcha()
      return
    }
    
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 登录成功，存储token
    localStorage.setItem('adminToken', 'mock-admin-token')
    
    // 跳转到控制台
    router.push('/admin/dashboard')
  } catch (error) {
    alert('登录失败，请检查账号密码和验证码')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped>
/* Login component styles */
</style>