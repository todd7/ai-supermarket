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
          <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">服务协议</h1>
          
          <div class="prose max-w-none">
            <p class="mb-4">本服务协议（以下简称「协议」）是您与AI模板超市之间关于使用我们的服务所达成的法律协议。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">1. 协议接受</h2>
            <p class="mb-4">通过注册、登录或使用我们的服务，您表示您已阅读、理解并同意受本协议的约束。如果您不同意本协议的任何条款，您应立即停止使用我们的服务。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">2. 服务内容</h2>
            <p class="mb-4">我们提供以下服务：</p>
            <ul class="list-disc pl-5 mb-4">
              <li>应用模板售卖：提供可一键部署的AI应用和日常应用模板</li>
              <li>代部署服务：为客户提供自定义应用的部署服务</li>
            </ul>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">3. 账户注册与管理</h2>
            <p class="mb-4">3.1 您需要注册一个账户才能使用我们的部分服务。您应提供真实、准确、完整的个人信息，并在信息变更时及时更新。</p>
            <p class="mb-4">3.2 您应妥善保管账户密码，对使用您账户的所有行为负责。如果发现账户被未经授权使用，您应立即通知我们。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">4. 模板购买与使用</h2>
            <p class="mb-4">4.1 您购买模板后，获得的是模板的使用权，而非所有权。</p>
            <p class="mb-4">4.2 您可以：</p>
            <ul class="list-disc pl-5 mb-4">
              <li>在您的项目中使用模板</li>
              <li>根据需要对模板进行修改和定制</li>
              <li>将使用模板开发的应用用于商业目的</li>
            </ul>
            <p class="mb-4">4.3 您不得：</p>
            <ul class="list-disc pl-5 mb-4">
              <li>重新分发或出售模板本身</li>
              <li>将模板用于非法目的</li>
              <li>侵犯他人的知识产权</li>
            </ul>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">5. 代部署服务</h2>
            <p class="mb-4">5.1 您应提供完整、准确的部署需求和相关材料。</p>
            <p class="mb-4">5.2 我们将按照您选择的服务套餐提供相应的部署服务。</p>
            <p class="mb-4">5.3 服务完成后，我们会提供部署结果和相关文档。</p>
            <p class="mb-4">5.4 您应在收到部署结果后及时验收，如有问题应在3个工作日内提出。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">6. 支付与退款</h2>
            <p class="mb-4">6.1 您应按照我们的价格体系支付相应的费用。</p>
            <p class="mb-4">6.2 对于模板购买，一旦您下载了模板交付物，我们不提供退款。</p>
            <p class="mb-4">6.3 对于代部署服务，在服务开始前，您可以申请退款；服务开始后，我们不提供退款。</p>
            <p class="mb-4">6.4 如因我们的原因导致服务无法完成，我们将全额退款。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">7. 知识产权</h2>
            <p class="mb-4">7.1 我们拥有网站和服务的所有知识产权。</p>
            <p class="mb-4">7.2 模板的知识产权归原作者所有，我们仅提供使用权。</p>
            <p class="mb-4">7.3 您在使用我们的服务过程中产生的内容，其知识产权归您所有。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">8. 免责声明</h2>
            <p class="mb-4">8.1 我们不对服务的可用性、可靠性或准确性做出任何保证。</p>
            <p class="mb-4">8.2 我们不对因使用或无法使用我们的服务而导致的任何直接或间接损失负责。</p>
            <p class="mb-4">8.3 我们不对模板的适用性或功能做出任何保证，模板的使用风险由您自行承担。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">9. 服务变更与终止</h2>
            <p class="mb-4">9.1 我们有权随时变更或终止部分或全部服务。</p>
            <p class="mb-4">9.2 如果您违反本协议，我们有权终止您的账户和服务。</p>
            <p class="mb-4">9.3 服务终止后，我们将停止为您提供服务，但您仍需支付已发生的费用。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">10. 法律适用与争议解决</h2>
            <p class="mb-4">10.1 本协议的订立、执行、解释及争议的解决均适用中华人民共和国法律。</p>
            <p class="mb-4">10.2 如发生争议，双方应友好协商解决；协商不成的，任何一方均有权向有管辖权的人民法院提起诉讼。</p>
            
            <h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">11. 其他条款</h2>
            <p class="mb-4">11.1 本协议的任何条款被视为无效或不可执行，不影响其他条款的效力。</p>
            <p class="mb-4">11.2 我们有权不时修改本协议，修改后的协议将在网站上公布，您继续使用我们的服务视为接受修改后的协议。</p>
            
            <p class="mt-8 text-sm text-gray-500">本服务协议生效日期：2026年1月1日</p>
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
// TermsOfService component
</script>

<style scoped>
/* TermsOfService component styles */
</style>