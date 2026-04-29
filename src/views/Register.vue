<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <span class="text-3xl font-bold text-blue-600">AI模板超市</span>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          注册账号
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          或
          <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
            登录已有账号
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md -space-y-px">
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

          <div class="mt-4">
            <label for="password" class="block text-sm font-medium text-gray-700">
              设置密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="form.password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="请设置密码"
            />
          </div>

          <div class="mt-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              确认密码
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              v-model="form.confirmPassword"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="请确认密码"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            v-model="form.terms"
            required
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-900">
            我同意
            <router-link to="/terms" class="font-medium text-blue-600 hover:text-blue-500">
              服务条款
            </router-link>
            和
            <router-link to="/privacy" class="font-medium text-blue-600 hover:text-blue-500">
              隐私政策
            </router-link>
          </label>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            注册
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  phone: '',
  code: '',
  password: '',
  confirmPassword: '',
  terms: false
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

const handleRegister = async () => {
  // 验证表单
  if (!form.value.phone || !form.value.code || !form.value.password || !form.value.confirmPassword) {
    alert('请填写完整信息')
    return
  }
  
  if (form.value.password !== form.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  
  if (form.value.password.length < 6) {
    alert('密码长度不能少于6位')
    return
  }
  
  if (!form.value.terms) {
    alert('请同意服务条款和隐私政策')
    return
  }
  
  try {
    // 调用后端注册API
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: form.value.phone, // 用手机号作为默认用户名
        phone: form.value.phone,
        password: form.value.password,
        email: ''
      })
    })
    
    const data = await response.json()
    
    if (response.ok && data.success) {
      // 注册成功
      alert('注册成功')
      
      // 存储登录状态
      localStorage.setItem('userToken', data.token)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      
      // 跳转到首页
      router.push('/')
    } else {
      // 注册失败
      alert(data.error || '注册失败')
    }
  } catch (error) {
    console.error('Register error:', error)
    alert('注册失败，请稍后重试')
  }
}
</script>

<style scoped>
/* Register component styles */
</style>