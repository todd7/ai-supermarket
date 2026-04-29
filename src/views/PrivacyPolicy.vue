<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <span class="text-2xl font-bold text-blue-600">AI模板超市</span>
            </router-link>
            <nav class="hidden md:ml-6 md:flex md:space-x-8">
              <router-link to="/templates" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                应用模板
              </router-link>
              <router-link to="/deployment" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                代部署服务
              </router-link>
            </nav>
          </div>
          <div class="flex items-center">
            <router-link to="/cart" class="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </router-link>
            <router-link to="/user-center" class="ml-4 p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">隐私政策</h1>
          
          <div class="prose max-w-none">
            <p class="mb-4">本隐私政策描述了AI模板超市如何收集、使用、存储和保护您的个人信息。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">1. 收集的信息</h2>
            <p class="mb-4">我们收集以下类型的个人信息：</p>
            <ul class="list-disc pl-5 mb-4">
              <li>个人身份信息：姓名、手机号、邮箱、微信等联系方式</li>
              <li>账户信息：用户名、密码（加密存储）</li>
              <li>订单信息：购买的模板、服务、支付记录等</li>
              <li>浏览信息：访问的页面、搜索的内容、停留时间等</li>
              <li>设备信息：IP地址、浏览器类型、操作系统等</li>
            </ul>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">2. 使用目的</h2>
            <p class="mb-4">我们使用收集的信息用于以下目的：</p>
            <ul class="list-disc pl-5 mb-4">
              <li>提供和维护我们的服务</li>
              <li>处理订单和支付</li>
              <li>与您沟通，包括发送订单确认、服务更新等</li>
              <li>改进我们的网站和服务</li>
              <li>预防和检测欺诈行为</li>
              <li>遵守法律法规</li>
            </ul>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">3. 信息存储</h2>
            <p class="mb-4">我们采取以下措施保护您的个人信息：</p>
            <ul class="list-disc pl-5 mb-4">
              <li>使用加密技术保护敏感信息</li>
              <li>限制对个人信息的访问</li>
              <li>定期备份数据</li>
              <li>使用安全的服务器存储数据</li>
            </ul>
            <p class="mb-4">我们会在法律要求的时间内保留您的个人信息，或在实现收集目的所需的时间内保留。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">4. 信息共享</h2>
            <p class="mb-4">我们不会向第三方出售您的个人信息。我们可能会在以下情况下共享您的信息：</p>
            <ul class="list-disc pl-5 mb-4">
              <li>获得您的明确同意</li>
              <li>遵守法律法规</li>
              <li>保护我们的权利和财产</li>
              <li>与我们的服务提供商共享，这些提供商必须按照我们的要求保护您的信息</li>
            </ul>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">5. 您的权利</h2>
            <p class="mb-4">您有权：</p>
            <ul class="list-disc pl-5 mb-4">
              <li>访问和查看您的个人信息</li>
              <li>修改或更新您的个人信息</li>
              <li>删除您的个人信息</li>
              <li>限制我们使用您的个人信息</li>
              <li>撤回您的同意</li>
            </ul>
            <p class="mb-4">要行使这些权利，请联系我们的客服。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">6.  Cookie 和追踪技术</h2>
            <p class="mb-4">我们使用Cookie和其他追踪技术来：</p>
            <ul class="list-disc pl-5 mb-4">
              <li>记住您的登录状态</li>
              <li>分析网站使用情况</li>
              <li>提供个性化内容和广告</li>
            </ul>
            <p class="mb-4">您可以在浏览器设置中禁用Cookie，但这可能会影响网站的功能。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">7. 儿童隐私</h2>
            <p class="mb-4">我们的服务不面向18岁以下的儿童。如果我们发现收集了18岁以下儿童的个人信息，我们会立即删除这些信息。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">8. 隐私政策更新</h2>
            <p class="mb-4">我们可能会不时更新本隐私政策。更新后的政策将在网站上公布，并在必要时通知您。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">9. 联系我们</h2>
            <p class="mb-4">如果您对本隐私政策有任何疑问，请联系我们：</p>
            <ul class="list-disc pl-5 mb-4">
              <li>邮箱：support@aitemplateshop.com</li>
              <li>电话：400-123-4567</li>
              <li>微信：ai_template_shop</li>
            </ul>
            
            <p class="mt-8 text-sm text-gray-500">本隐私政策生效日期：2026年1月1日</p>
          </div>
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
              <li><router-link to="/faq" class="text-base text-gray-300 hover:text-white">帮助中心</router-link></li>
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
              <li><router-link to="/privacy" class="text-base text-gray-300 hover:text-white">隐私政策</router-link></li>
              <li><router-link to="/terms" class="text-base text-gray-300 hover:text-white">服务条款</router-link></li>
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
// PrivacyPolicy component
</script>

<style scoped>
/* PrivacyPolicy component styles */
</style>