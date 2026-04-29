<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <span class="text-3xl font-bold text-blue-600">AI模板超市</span>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          登录账号
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          或
          <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500">
            注册新账号
          </router-link>
        </p>
      </div>

      <!-- 登录方式切换 -->
      <div class="flex items-center justify-center">
        <button 
          @click="loginMethod = 'phone'" 
          class="px-4 py-2 rounded-l-md transition-colors"
          :class="loginMethod === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
        >
          手机号登录
        </button>
        <button 
          @click="loginMethod = 'password'" 
          class="px-4 py-2 rounded-r-md transition-colors"
          :class="loginMethod === 'password' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
        >
          账号密码登录
        </button>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md -space-y-px">
          <!-- 手机号登录表单 -->
          <template v-if="loginMethod === 'phone'">
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">
                手机号
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                v-model="form.phone"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="请输入手机号"
              />
            </div>

            <div class="mt-4">
              <label for="code" class="block text-sm font-medium text-gray-700">
                验证码
              </label>
              <div class="flex space-x-2">
                <input
                  id="code"
                  name="code"
                  type="text"
                  v-model="form.code"
                  required
                  class="flex-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="请输入验证码"
                />
                <button
                  type="button"
                  @click="sendCode"
                  :disabled="countdown > 0"
                  class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {{ countdown > 0 ? `${countdown}秒后重发` : '获取验证码' }}
                </button>
              </div>
            </div>
          </template>

          <!-- 账号密码登录表单 -->
          <template v-else>
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">
                账号
              </label>
              <input
                id="username"
                name="username"
                type="text"
                v-model="form.username"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="请输入账号"
              />
            </div>

            <div class="mt-4">
              <label for="password" class="block text-sm font-medium text-gray-700">
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                v-model="form.password"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="请输入密码"
              />
            </div>
          </template>
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
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            登录
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            登录即表示您同意我们的
            <router-link to="/terms" class="font-medium text-blue-600 hover:text-blue-500">
              服务条款
            </router-link>
            和
            <router-link to="/privacy" class="font-medium text-blue-600 hover:text-blue-500">
              隐私政策
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginMethod = ref('phone') // 'phone' 或 'password'

const form = ref({
  phone: '',
  code: '',
  username: '',
  password: '',
  remember: false
})

const countdown = ref(0)

const sendCode = () => {
  // 验证手机号
  if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
    alert('请输入正确的手机号')
    return
  }
  
  // 模拟发送验证码
  alert('验证码已发送')
  
  // 开始倒计时
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const handleLogin = async () => {
  // 验证表单
  if (loginMethod.value === 'phone') {
    if (!form.value.phone || !form.value.code) {
      alert('请填写完整信息')
      return
    }
    // 手机号登录暂时使用模拟逻辑
    alert('手机号登录功能开发中，请使用账号密码登录')
    return
  } else {
    if (!form.value.username || !form.value.password) {
      alert('请填写完整信息')
      return
    }
  }
  
  try {
    // 调用后端登录API
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: form.value.username,
        password: form.value.password
      })
    })
    
    const data = await response.json()
    
    if (response.ok && data.success) {
      // 登录成功
      alert('登录成功')
      
      // 存储登录状态
      localStorage.setItem('userToken', data.token)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      
      // 跳转到首页
      router.push('/')
    } else {
      // 登录失败
      alert(data.error || '登录失败')
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('登录失败，请稍后重试')
  }
}
</script>

<style scoped>
/* Login component styles */
</style>