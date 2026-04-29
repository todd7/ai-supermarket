<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <Navbar />

    <!-- Banner轮播 -->
    <section class="relative overflow-hidden">
      <div class="relative" style="height: 600px;">
        <div 
          v-for="(banner, index) in banners" 
          :key="banner.id"
          class="absolute inset-0 transition-opacity duration-1000" 
          :class="{ 'opacity-100': currentBanner === index, 'opacity-0': currentBanner !== index }"
        >
          <img 
            :src="banner.image" 
            :alt="banner.title" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 flex items-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div class="max-w-2xl">
                <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                  {{ banner.title }}
                </h1>
                <p class="mt-3 max-w-3xl mx-auto text-xl text-white sm:mt-5">
                  一站式获取可一键部署的AI应用模板，以及专业的代部署服务
                </p>
                <div class="mt-10 max-w-lg">
                  <a 
                    :href="banner.link" 
                    class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
                  >
                    了解详情
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 轮播指示器 -->
        <div class="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          <button 
            v-for="(banner, index) in banners" 
            :key="banner.id"
            @click="currentBanner = index"
            class="w-3 h-3 rounded-full transition-colors"
            :class="currentBanner === index ? 'bg-white' : 'bg-white/50'"
          ></button>
        </div>
      </div>
    </section>

    <!-- 核心业务入口 -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <router-link to="/templates" class="block bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white hover:shadow-xl transition-shadow">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div class="ml-6">
                <h3 class="text-2xl font-bold">模板超市</h3>
                <p class="mt-2 text-blue-100">浏览和购买可一键部署的AI应用模板</p>
              </div>
            </div>
          </router-link>
          <router-link to="/deployment" class="block bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-8 text-white hover:shadow-xl transition-shadow">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div class="ml-6">
                <h3 class="text-2xl font-bold">代部署服务</h3>
                <p class="mt-2 text-green-100">专业的应用部署服务，解决个性化需求</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 爆款模板推荐 -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            爆款模板推荐
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            高销量、高热度的AI应用模板
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="template in hotTemplates"
            :key="template.id"
            class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="h-48 overflow-hidden">
              <img :src="template.coverImage" :alt="template.name" class="w-full h-full object-cover transition-transform hover:scale-105" />
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {{ template.category }}
                </span>
                <span class="text-xs text-gray-500">销量: {{ template.sales }}</span>
              </div>
              <h3 class="text-lg font-medium text-gray-900">{{ template.name }}</h3>
              <p class="mt-2 text-sm text-gray-500">{{ template.description }}</p>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-xl font-bold text-gray-900">¥{{ template.price }}</span>
                <router-link
                  :to="`/template/${template.id}`"
                  class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  查看详情
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 模板分类导航 -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            模板分类
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            快捷筛选模板品类
          </p>
        </div>

        <div class="mt-12">
          <div class="mb-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">AI 应用模板</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <router-link to="/templates?category=ai-knowledge" class="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center">
                企业知识库
              </router-link>
              <router-link to="/templates?category=ai-customer-service" class="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center">
                AI 客服
              </router-link>
              <router-link to="/templates?category=ai-content" class="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center">
                AI 文案生成
              </router-link>
              <router-link to="/templates?category=ai-office" class="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center">
                AI 办公助手
              </router-link>
              <router-link to="/templates?category=ai-industry" class="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center">
                垂直行业 AI 工具
              </router-link>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">日常应用模板</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <router-link to="/templates?category=blog" class="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center">
                个人博客 / 作品集
              </router-link>
              <router-link to="/templates?category=podcast" class="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center">
                播客网站
              </router-link>
              <router-link to="/templates?category=inventory" class="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center">
                进销存系统
              </router-link>
              <router-link to="/templates?category=booking" class="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center">
                预约 / 表单系统
              </router-link>
              <router-link to="/templates?category=other" class="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center">
                其他管理系统
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 常见问题 FAQ -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            常见问题
          </h2>
          <p class="mt-4 text-xl text-gray-500">
            高频问题前置解答
          </p>
        </div>

        <div class="mt-12 space-y-4">
          <div v-for="faq in faqs" :key="faq.id" class="bg-white rounded-lg shadow overflow-hidden">
            <button
              @click="toggleFaq(faq.id)"
              class="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
            >
              <span class="text-lg font-medium text-gray-900">{{ faq.question }}</span>
              <svg
                :class="[`h-6 w-6 text-gray-400 transition-transform`, { 'transform rotate-180': expandedFaq === faq.id }]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="expandedFaq === faq.id" class="px-6 py-4 border-t border-gray-200">
              <p class="text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <div class="mt-8 text-center">
          <router-link to="/faq" class="inline-flex items-center text-blue-600 hover:text-blue-800">
            查看更多问题
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 联系客服入口 -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
        @click="showCustomerService = !showCustomerService"
        class="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      <div v-if="showCustomerService" class="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 w-64">
        <h3 class="text-lg font-medium text-gray-900 mb-4">联系客服</h3>
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-600">微信</p>
            <div class="mt-1 bg-gray-100 p-2 rounded text-center">
              <span class="text-sm">ai-market-service</span>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-600">电话</p>
            <div class="mt-1 bg-gray-100 p-2 rounded text-center">
              <span class="text-sm">400-123-4567</span>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-600">工作时间</p>
            <div class="mt-1 bg-gray-100 p-2 rounded text-center">
              <span class="text-sm">周一至周五 9:00-18:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            核心优势
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            为个人开发者、中小微企业和实体店主提供便捷的应用部署解决方案
          </p>
        </div>

        <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div class="bg-gray-50 p-6 rounded-lg shadow">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-medium text-gray-900">
              一键部署
            </h3>
            <p class="mt-2 text-base text-gray-500">
              提供完整的部署脚本和教程，即使不懂技术也能轻松上线应用
            </p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg shadow">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-medium text-gray-900">
              专业服务
            </h3>
            <p class="mt-2 text-base text-gray-500">
              提供自定义应用代部署服务，解决个性化部署需求
            </p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg shadow">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="mt-5 text-lg font-medium text-gray-900">
              全流程闭环
            </h3>
            <p class="mt-2 text-base text-gray-500">
              实现浏览、下单、支付、交付、售后全流程自动化
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Template Categories -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            模板分类
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            涵盖多种类型的AI应用模板，满足不同场景需求
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <router-link to="/templates?category=ai-tools" class="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div class="h-32 bg-blue-100 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
              AI工具
            </h3>
            <p class="mt-2 text-base text-gray-500">
              文案生成、聊天机器人、图像识别等AI应用模板
            </p>
          </router-link>

          <router-link to="/templates?category=business" class="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div class="h-32 bg-green-100 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
              商业应用
            </h3>
            <p class="mt-2 text-base text-gray-500">
              客服系统、知识库、进销存、预约系统等商用模板
            </p>
          </router-link>

          <router-link to="/templates?category=personal" class="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div class="h-32 bg-purple-100 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
              个人工具
            </h3>
            <p class="mt-2 text-base text-gray-500">
              博客、播客、简历工具、AI办公助手等个人应用模板
            </p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-blue-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            开始使用AI应用模板
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-blue-100">
            选择适合您的模板，快速部署上线，提升工作效率
          </p>
          <div class="mt-8">
            <router-link to="/templates" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
              立即浏览
            </router-link>
          </div>
        </div>
      </div>
    </section>

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
              <li><router-link to="/faq" class="text-base text-gray-300 hover:text-white">常见问题</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              资源
            </h3>
            <ul class="mt-4 space-y-2">
              <li><a href="#" class="text-base text-gray-300 hover:text-white">帮助中心</a></li>
              <li><a href="#" class="text-base text-gray-300 hover:text-white">部署教程</a></li>
              <li><a href="#" class="text-base text-gray-300 hover:text-white">联系客服</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              公司
            </h3>
            <ul class="mt-4 space-y-2">
              <li><a href="#" class="text-base text-gray-300 hover:text-white">关于我们</a></li>
              <li><a href="#" class="text-base text-gray-300 hover:text-white">联系方式</a></li>
              <li><a href="#" class="text-base text-gray-300 hover:text-white">开源提示</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              法律
            </h3>
            <ul class="mt-4 space-y-2">
              <li><router-link to="/privacy" class="text-base text-gray-300 hover:text-white">隐私政策</router-link></li>
              <li><router-link to="/terms" class="text-base text-gray-300 hover:text-white">服务条款</router-link></li>
              <li><a href="#" class="text-base text-gray-300 hover:text-white">合规声明</a></li>
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
          <div class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            <p>&copy; 2026 AI模板超市. 保留所有权利.</p>
            <p class="mt-2 text-sm">联系方式：contact@aimarket.com | 电话：400-123-4567</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'

// Banner数据
const banners = ref([])

// 当前Banner索引
const currentBanner = ref(0)
let bannerInterval: number | null = null

// 获取Banner数据
const fetchBanners = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/banners')
    const data = await response.json()
    banners.value = data
  } catch (error) {
    console.error('Error fetching banners:', error)
  }
}

// 自动轮播
const startBannerLoop = () => {
  bannerInterval = window.setInterval(() => {
    if (banners.value.length > 0) {
      currentBanner.value = (currentBanner.value + 1) % banners.value.length
    }
  }, 5000)
}

onMounted(async () => {
  // 获取Banner数据
  await fetchBanners()
  // 开始自动轮播
  startBannerLoop()
})

onUnmounted(() => {
  // 清除轮播定时器
  if (bannerInterval) {
    clearInterval(bannerInterval)
  }
})

// 爆款模板数据
const hotTemplates = ref([])

// 获取爆款模板数据
const fetchHotTemplates = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/templates')
    const data = await response.json()
    // 按销量排序，取前4个作为爆款模板
    hotTemplates.value = data
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4)
  } catch (error) {
    console.error('Error fetching hot templates:', error)
  }
}

onMounted(async () => {
  // 获取Banner数据
  await fetchBanners()
  // 获取爆款模板数据
  await fetchHotTemplates()
  // 开始自动轮播
  startBannerLoop()
})

// FAQ数据
const faqs = ref([
  {
    id: 1,
    question: '模板购买后如何部署？',
    answer: '购买模板后，您将获得部署脚本和详细的操作教程。根据教程步骤，您可以在自己的服务器或云平台上一键部署应用。如果遇到问题，您可以联系客服获得技术支持。'
  },
  {
    id: 2,
    question: '代部署服务包含哪些内容？',
    answer: '我们的代部署服务包括环境配置、应用部署、基础调试等。根据套餐不同，还可能包含模型配置、定制化调整和售后支持等服务。具体内容请查看服务套餐详情。'
  },
  {
    id: 3,
    question: '模板是否支持定制化修改？',
    answer: '是的，购买模板后您可以根据自己的需求进行定制化修改。我们提供的模板源代码是完整的，您可以自由修改和扩展功能。如果需要专业的定制服务，您可以联系我们的客服咨询。'
  },
  {
    id: 4,
    question: '购买后可以退款吗？',
    answer: '由于模板和代部署服务的特殊性，一旦购买并交付，我们不提供退款服务。在购买前，您可以通过模板详情页了解模板的功能和部署要求，确保它符合您的需求。'
  },
  {
    id: 5,
    question: '模板的更新和维护政策是什么？',
    answer: '我们会定期对模板进行更新和维护，修复bug并添加新功能。购买模板后，您可以免费获取一年的更新服务。一年后，您可以选择续费继续获得更新，或者继续使用当前版本。'
  },
  {
    id: 6,
    question: '如何获取技术支持？',
    answer: '您可以通过页面右下角的客服按钮联系我们，或者发送邮件到contact@aimarket.com。我们的客服工作时间是周一至周五9:00-18:00，通常会在24小时内回复您的问题。'
  }
])

// FAQ展开状态
const expandedFaq = ref<number | null>(null)

// 切换FAQ展开状态
const toggleFaq = (id: number) => {
  expandedFaq.value = expandedFaq.value === id ? null : id
}

// 客服弹窗状态
const showCustomerService = ref(false)
</script>

<style scoped>
/* Home component styles */
</style>