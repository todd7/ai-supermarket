<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <Navbar />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">购物车</h1>
      
      <div v-if="cartItems.length > 0" class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">商品清单</h2>
        </div>
        
        <div class="divide-y divide-gray-200">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="px-6 py-4 flex items-center"
          >
            <div class="flex-shrink-0">
              <div class="h-24 w-24 bg-gray-200 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
                <span class="text-lg font-medium text-gray-900">¥{{ item.price }}</span>
              </div>
              <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
            </div>
            <div class="ml-4">
              <button
                @click="removeFromCart(item.id)"
                class="px-3 py-1 text-sm text-red-600 hover:text-red-800"
              >
                删除
              </button>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <span class="text-lg font-medium text-gray-900">总计</span>
            <span class="text-xl font-bold text-gray-900">¥{{ totalPrice }}</span>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200">
          <div class="flex flex-col space-y-4">
            <h3 class="text-lg font-medium text-gray-900">支付方式</h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <input
                  type="radio"
                  id="wechat"
                  name="payment"
                  v-model="paymentMethod"
                  value="wechat"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label for="wechat" class="ml-2 text-gray-700">微信支付</label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  id="alipay"
                  name="payment"
                  v-model="paymentMethod"
                  value="alipay"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label for="alipay" class="ml-2 text-gray-700">支付宝</label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  id="card"
                  name="payment"
                  v-model="paymentMethod"
                  value="card"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label for="card" class="ml-2 text-gray-700">银行卡</label>
              </div>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            @click="checkout"
            class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            结算
          </button>
        </div>
      </div>
      
      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">购物车为空</h3>
          <p class="mt-2 text-gray-500">您的购物车中还没有商品</p>
          <router-link
            to="/templates"
            class="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            去购物
          </router-link>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const router = useRouter()

interface CartItem {
  id: number
  name: string
  description: string
  price: number
}

const cartItems = ref<CartItem[]>([
  {
    id: 1,
    name: 'AI文案生成工具',
    description: '基于大语言模型的文案生成工具',
    price: 99
  },
  {
    id: 3,
    name: '个人博客模板',
    description: '简洁美观的个人博客模板',
    price: 49
  }
])

const paymentMethod = ref('wechat')

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price, 0)
})

const removeFromCart = (id: number) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id)
}

const checkout = () => {
  // Checkout logic
  alert('支付成功，订单已生成')
  router.push('/orders')
}
</script>

<style scoped>
/* Cart component styles */
</style>