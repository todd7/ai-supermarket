<template>
  <div class="template-detail">
    <!-- 导航栏 -->
    <Navbar />

    <!-- 模板基础信息 -->
    <section class="basic-info bg-white py-8 border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- 轮播图 -->
          <div class="w-full md:w-3/5">
            <div class="relative rounded-lg overflow-hidden shadow-md">
              <div class="aspect-w-16 aspect-h-9">
                <img 
                  v-for="(img, index) in templateImgs" 
                  :key="index" 
                  :src="img" 
                  class="w-full h-full object-cover" 
                  :alt="`${templateInfo.name} - 图片${index + 1}`"
                  v-show="activeSlide === index"
                />
              </div>
              <!-- 轮播指示器 -->
              <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                <button 
                  v-for="(img, index) in templateImgs" 
                  :key="index"
                  @click="activeSlide = index"
                  class="w-3 h-3 rounded-full transition-colors"
                  :class="activeSlide === index ? 'bg-blue-600' : 'bg-white bg-opacity-50'"
                ></button>
              </div>
              <!-- 轮播控制按钮 -->
              <button 
                @click="prevSlide" 
                class="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-30 rounded-full flex items-center justify-center text-white hover:bg-opacity-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                @click="nextSlide" 
                class="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-30 rounded-full flex items-center justify-center text-white hover:bg-opacity-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- 模板信息 -->
          <div class="w-full md:w-2/5">
            <div class="space-y-4">
              <div>
                <span class="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-2">
                  {{ templateInfo.category }}
                </span>
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {{ templateInfo.name }}
                </h1>
                <div class="flex items-center text-sm text-gray-500 space-x-4">
                  <span>销量: {{ templateInfo.sales }}</span>
                  <span>更新: {{ templateInfo.updateTime }}</span>
                </div>
              </div>
              
              <div class="flex items-baseline space-x-3">
                <span class="text-3xl font-bold text-orange-500">¥{{ templateInfo.price }}</span>
                <span class="text-sm text-gray-500 line-through">¥{{ templateInfo.originalPrice }}</span>
                <span class="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
                  省¥{{ templateInfo.originalPrice - templateInfo.price }}
                </span>
              </div>
              
              <p class="text-gray-600 leading-relaxed">
                {{ templateInfo.shortDesc }}
              </p>
              
              <div class="space-y-3">
                <div class="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  购买后可永久下载
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  包含部署脚本和教程
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  7天售后支持
                </div>
              </div>
              
              <div class="flex flex-col sm:flex-row gap-3 pt-2">
                <button 
                  @click="buyTemplate" 
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  立即购买
                </button>
                <button 
                  @click="collectTemplate" 
                  class="flex-1 border border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  加入收藏
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 模板详情介绍 -->
    <section class="detail-content py-10 bg-gray-50">
      <div class="container mx-auto px-4">
        <!-- 标签导航 -->
        <div class="bg-white rounded-t-lg shadow-sm">
          <div class="flex border-b border-gray-200">
            <button 
              v-for="(tab, index) in tabs" 
              :key="index"
              @click="activeTab = index"
              class="px-6 py-4 font-medium text-sm transition-colors relative"
              :class="activeTab === index ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'"
            >
              {{ tab }}
              <div 
                v-if="activeTab === index" 
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              ></div>
            </button>
          </div>
        </div>
        
        <!-- 标签内容 -->
        <div class="bg-white rounded-b-lg shadow-sm p-6">
          <!-- 功能介绍 -->
          <div v-if="activeTab === 0" class="space-y-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">核心功能</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="(func, index) in templateInfo.functions" 
                  :key="index"
                  class="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                >
                  <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                    {{ index + 1 }}
                  </div>
                  <div class="text-gray-700">{{ func }}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">适用场景</h3>
              <p class="text-gray-700 leading-relaxed">
                {{ templateInfo.scenario }}
              </p>
            </div>
            
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">模板亮点</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="p-4 border border-gray-200 rounded-lg text-center">
                  <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 class="font-medium text-gray-900 mb-2">易于部署</h4>
                  <p class="text-sm text-gray-600">提供详细的部署文档和脚本，一键部署</p>
                </div>
                <div class="p-4 border border-gray-200 rounded-lg text-center">
                  <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 class="font-medium text-gray-900 mb-2">功能强大</h4>
                  <p class="text-sm text-gray-600">集成了丰富的功能模块，满足多种需求</p>
                </div>
                <div class="p-4 border border-gray-200 rounded-lg text-center">
                  <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 class="font-medium text-gray-900 mb-2">持续更新</h4>
                  <p class="text-sm text-gray-600">定期更新功能和修复问题，确保系统稳定</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 部署要求 -->
          <div v-if="activeTab === 1" class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">部署环境要求</h3>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="bg-gray-50">
                    <th class="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">项目</th>
                    <th class="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">要求</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-200 px-4 py-3 text-sm text-gray-900 font-medium">服务器配置</td>
                    <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{ templateInfo.serverConfig }}</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-200 px-4 py-3 text-sm text-gray-900 font-medium">运行环境</td>
                    <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{ templateInfo.env }}</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-200 px-4 py-3 text-sm text-gray-900 font-medium">部署方式</td>
                    <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">{{ templateInfo.deployWay }}</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-200 px-4 py-3 text-sm text-gray-900 font-medium">网络要求</td>
                    <td class="border border-gray-200 px-4 py-3 text-sm text-gray-700">需要外网访问权限</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 class="font-medium text-blue-800 mb-1">部署提示</h4>
                  <p class="text-sm text-blue-700">
                    如果您对部署过程不熟悉，可以选择我们的代部署服务，专业技术人员将为您完成部署配置。
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 交付物清单 -->
          <div v-if="activeTab === 2" class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">交付物清单</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="(item, index) in templateInfo.deliveryList" 
                :key="index"
                class="flex items-center p-4 border border-gray-200 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">{{ item }}</span>
              </div>
            </div>
            
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">交付方式</h4>
              <p class="text-sm text-gray-600 mb-2">
                购买后，您将在订单页面收到下载链接，所有交付物将通过压缩包形式提供。
              </p>
              <p class="text-sm text-gray-600">
                下载链接永久有效，您可以随时重新下载。
              </p>
            </div>
          </div>
          
          <!-- 合规声明 -->
          <div v-if="activeTab === 3" class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">开源合规声明</h3>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p class="text-gray-700 leading-relaxed mb-4">
                {{ templateInfo.license }}
              </p>
              <div class="mt-4 pt-4 border-t border-gray-200">
                <h4 class="font-medium text-gray-900 mb-2">开源协议</h4>
                <p class="text-sm text-gray-600">
                  本模板基于 {{ templateInfo.openSourceLicense }} 开源协议，您可以在遵守协议的前提下自由使用、修改和分发。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 相关推荐 -->
    <section class="related-templates py-10 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">相关推荐</h2>
          <a href="/templates" class="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
            查看更多
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="item in relatedList" 
            :key="item.id"
            class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="relative">
              <img :src="item.coverImage" class="w-full h-48 object-cover" :alt="item.name">
              <span class="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                {{ item.category }}
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-gray-900 mb-2 line-clamp-2">{{ item.name }}</h3>
              <div class="flex items-center justify-between">
                <span class="text-orange-500 font-bold">¥{{ item.price }}</span>
                <span class="text-sm text-gray-500">销量: {{ item.sales }}</span>
              </div>
              <a 
                :href="`/template/${item.id}`" 
                class="mt-3 inline-block w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-center rounded transition-colors"
              >
                查看详情
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer bg-gray-900 text-white py-10">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">AI模板超市</h3>
            <p class="text-gray-400 text-sm">
              提供优质的AI应用模板和代部署服务，助力企业数字化转型。
            </p>
          </div>
          <div>
            <h4 class="font-medium mb-4">快速链接</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="/" class="hover:text-white transition-colors">首页</a></li>
              <li><a href="/templates" class="hover:text-white transition-colors">模板超市</a></li>
              <li><a href="/deployment" class="hover:text-white transition-colors">代部署服务</a></li>
              <li><a href="/faq" class="hover:text-white transition-colors">常见问题</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium mb-4">法律信息</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="/privacy" class="hover:text-white transition-colors">隐私政策</a></li>
              <li><a href="/terms" class="hover:text-white transition-colors">服务协议</a></li>
              <li><a href="/terms" class="hover:text-white transition-colors">售后规则</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium mb-4">联系我们</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>邮箱: support@aimoban.com</li>
              <li>电话: 400-123-4567</li>
              <li>工作时间: 周一至周五 9:00-18:00</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© 2026 AI模板超市. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const route = useRoute()

// 轮播图状态
const activeSlide = ref(0)

// 标签页状态
const activeTab = ref(0)
const tabs = ['功能介绍', '部署要求', '交付物清单', '合规声明']

// 模板图片
const templateImgs = ref([
  'https://picsum.photos/800/450?random=1',
  'https://picsum.photos/800/450?random=2',
  'https://picsum.photos/800/450?random=3'
])

// 模板信息
const templateInfo = ref({
  name: 'AI客服系统模板',
  category: 'AI应用模板',
  sales: 256,
  updateTime: '2026-03-01',
  price: 299,
  originalPrice: 399,
  shortDesc: '基于最新AI技术的智能客服系统，支持多轮对话、知识库集成、智能意图识别等功能，可快速部署到企业现有系统中。',
  functions: [
    '智能问答：支持自然语言理解，准确回答用户问题',
    '多轮对话：支持上下文理解，实现流畅的对话体验',
    '知识库集成：可导入企业知识库，提升回答准确性',
    '自定义意图：支持根据业务需求自定义意图和回复',
    '数据分析：提供对话数据分析，优化客服策略',
    '多渠道接入：支持网站、APP、微信等多渠道接入'
  ],
  scenario: '适用于企业客服中心、在线咨询、产品售前售后支持等场景，可有效减少人工客服压力，提高客户满意度。',
  serverConfig: '2核4G内存，50G存储空间',
  env: 'Node.js 14+, MongoDB 4.0+, Redis',
  deployWay: 'Docker容器部署，支持一键安装脚本',
  deliveryList: [
    '部署脚本：一键安装配置',
    '使用教程：详细的操作指南',
    '源码包：完整的系统源码',
    'API文档：接口使用说明',
    '常见问题： troubleshooting指南'
  ],
  license: '本模板基于开源项目构建，遵循开源协议要求，已获得相关授权。我们承诺所有代码来源合法合规，不会侵犯任何第三方知识产权。',
  openSourceLicense: 'MIT License'
})

// 相关推荐
const relatedList = ref([
  {
    id: 2,
    name: '企业知识库模板',
    category: 'AI应用模板',
    price: 399,
    sales: 189,
    coverImage: 'https://picsum.photos/400/300?random=4'
  },
  {
    id: 3,
    name: '个人博客模板',
    category: '日常应用模板',
    price: 199,
    sales: 156,
    coverImage: 'https://picsum.photos/400/300?random=5'
  },
  {
    id: 4,
    name: 'AI文案生成工具',
    category: 'AI应用模板',
    price: 249,
    sales: 128,
    coverImage: 'https://picsum.photos/400/300?random=6'
  },
  {
    id: 5,
    name: '进销存管理系统',
    category: '日常应用模板',
    price: 299,
    sales: 98,
    coverImage: 'https://picsum.photos/400/300?random=7'
  }
])

// 获取模板详情
const fetchTemplateDetail = async () => {
  const templateId = route.params.id
  try {
    const response = await fetch(`http://localhost:3000/api/templates/${templateId}`)
    if (response.ok) {
      const data = await response.json()
      templateInfo.value = data
      // 更新模板图片
      templateImgs.value = [
        data.coverImage || `https://picsum.photos/800/450?random=${templateId}`,
        `https://picsum.photos/800/450?random=${parseInt(templateId as string) + 1}`,
        `https://picsum.photos/800/450?random=${parseInt(templateId as string) + 2}`
      ]
    } else {
      console.error('Failed to fetch template detail')
    }
  } catch (error) {
    console.error('Error fetching template detail:', error)
  }
}

// 轮播图控制
const prevSlide = () => {
  activeSlide.value = (activeSlide.value - 1 + templateImgs.value.length) % templateImgs.value.length
}

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % templateImgs.value.length
}

// 购买模板
const buyTemplate = () => {
  console.log('购买模板:', templateInfo.value.name)
  // 跳转到订单确认页
  window.location.href = '/cart'
}

// 收藏模板
const collectTemplate = () => {
  console.log('收藏模板:', templateInfo.value.name)
  alert('模板已加入收藏')
}

onMounted(() => {
  // 获取模板详情
  fetchTemplateDetail()
  
  // 自动轮播
  setInterval(() => {
    nextSlide()
  }, 5000)
})
</script>

<style scoped>
/* 自定义样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .template-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .template-list {
    grid-template-columns: 1fr;
  }
  
  .buy-actions {
    flex-direction: column;
  }
}
</style>