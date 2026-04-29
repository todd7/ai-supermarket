<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">{{ isEdit ? '编辑模板' : '新增模板' }}</h1>
      <div class="flex space-x-4">
        <router-link
          to="/admin/templates"
          class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          取消
        </router-link>
        <button
          @click="saveTemplate"
          class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          保存
        </button>
      </div>
    </div>
    
    <!-- Template Form -->
    <div class="bg-white shadow rounded-lg p-6 space-y-6">
      <!-- 基础信息 -->
      <div>
        <h2 class="text-lg font-medium text-gray-900 mb-4">基础信息</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">模板名称 <span class="text-red-500">*</span></label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="请输入模板名称"
            />
          </div>
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">分类 <span class="text-red-500">*</span></label>
            <select
              id="category"
              v-model="form.category"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">请选择分类</option>
              <option value="ai">AI应用模板</option>
              <option value="daily">日常应用模板</option>
            </select>
          </div>
          <div>
            <label for="tags" class="block text-sm font-medium text-gray-700 mb-1">标签</label>
            <input
              type="text"
              id="tags"
              v-model="form.tags"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="请输入标签，用逗号分隔"
            />
          </div>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-1">价格 <span class="text-red-500">*</span></label>
            <input
              type="number"
              id="price"
              v-model.number="form.price"
              required
              min="0"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="请输入价格"
            />
          </div>
          <div>
            <label for="originalPrice" class="block text-sm font-medium text-gray-700 mb-1">划线价</label>
            <input
              type="number"
              id="originalPrice"
              v-model.number="form.originalPrice"
              min="0"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="请输入原价"
            />
          </div>
          <div>
            <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">排序权重</label>
            <input
              type="number"
              id="sort"
              v-model.number="form.sort"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="请输入排序权重"
            />
          </div>
        </div>
      </div>
      
      <!-- 图片上传 -->
      <div>
        <h2 class="text-lg font-medium text-gray-900 mb-4">图片上传</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">封面图 <span class="text-red-500">*</span></label>
            <div class="flex items-center space-x-4">
              <div v-if="form.coverImage" class="relative">
                <img :src="form.coverImage" class="h-24 w-32 object-cover rounded-md" alt="封面图">
                <button
                  @click="form.coverImage = ''"
                  class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              <div v-else class="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                <span class="text-gray-500">点击上传</span>
              </div>
              <input
                type="file"
                @change="handleFileUpload('coverImage', $event)"
                class="hidden"
                id="coverImage"
              />
              <label
                for="coverImage"
                class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                选择图片
              </label>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">轮播图（最多5张）</label>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-5">
              <div
                v-for="(image, index) in form.carouselImages"
                :key="index"
                class="relative"
              >
                <img :src="image" class="h-24 w-full object-cover rounded-md" alt="轮播图">
                <button
                  @click="form.carouselImages.splice(index, 1)"
                  class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              <div
                v-if="form.carouselImages.length < 5"
                class="h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
                @click="$refs.carouselInput.click()"
              >
                <span class="text-gray-500">+ 上传</span>
              </div>
              <input
                type="file"
                ref="carouselInput"
                @change="handleCarouselUpload($event)"
                class="hidden"
                multiple
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- 详情内容 -->
      <div>
        <h2 class="text-lg font-medium text-gray-900 mb-4">详情内容</h2>
        <div class="space-y-4">
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">详细介绍</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="请输入模板详细介绍"
            ></textarea>
          </div>
          <div>
            <label for="features" class="block text-sm font-medium text-gray-700 mb-1">核心功能清单</label>
            <textarea
              id="features"
              v-model="form.features"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="请输入核心功能清单，每行一个功能"
            ></textarea>
          </div>
          <div>
            <label for="requirements" class="block text-sm font-medium text-gray-700 mb-1">部署环境要求</label>
            <textarea
              id="requirements"
              v-model="form.requirements"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="请输入部署环境要求"
            ></textarea>
          </div>
          <div>
            <label for="openSource" class="block text-sm font-medium text-gray-700 mb-1">开源合规声明</label>
            <textarea
              id="openSource"
              v-model="form.openSource"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="请输入开源来源和许可协议"
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- 交付物上传 -->
      <div>
        <h2 class="text-lg font-medium text-gray-900 mb-4">交付物上传</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">部署脚本</label>
            <div class="flex items-center space-x-4">
              <div v-if="form.deliveryFiles.script" class="flex items-center space-x-2">
                <span class="text-sm text-gray-500">{{ form.deliveryFiles.script.name }}</span>
                <button
                  @click="form.deliveryFiles.script = null"
                  class="text-red-500 hover:text-red-700"
                >
                  删除
                </button>
              </div>
              <input
                type="file"
                @change="handleFileUpload('script', $event)"
                class="hidden"
                id="script"
              />
              <label
                for="script"
                class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                选择文件
              </label>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">教程</label>
            <div class="flex items-center space-x-4">
              <div v-if="form.deliveryFiles.tutorial" class="flex items-center space-x-2">
                <span class="text-sm text-gray-500">{{ form.deliveryFiles.tutorial.name }}</span>
                <button
                  @click="form.deliveryFiles.tutorial = null"
                  class="text-red-500 hover:text-red-700"
                >
                  删除
                </button>
              </div>
              <input
                type="file"
                @change="handleFileUpload('tutorial', $event)"
                class="hidden"
                id="tutorial"
              />
              <label
                for="tutorial"
                class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                选择文件
              </label>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">源码包</label>
            <div class="flex items-center space-x-4">
              <div v-if="form.deliveryFiles.source" class="flex items-center space-x-2">
                <span class="text-sm text-gray-500">{{ form.deliveryFiles.source.name }}</span>
                <button
                  @click="form.deliveryFiles.source = null"
                  class="text-red-500 hover:text-red-700"
                >
                  删除
                </button>
              </div>
              <input
                type="file"
                @change="handleFileUpload('source', $event)"
                class="hidden"
                id="source"
              />
              <label
                for="source"
                class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                选择文件
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 上架设置 -->
      <div>
        <h2 class="text-lg font-medium text-gray-900 mb-4">上架设置</h2>
        <div class="flex items-center space-x-4">
          <input
            type="checkbox"
            id="isPublished"
            v-model="form.isPublished"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="isPublished" class="block text-sm font-medium text-gray-700">
            立即上架
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const carouselInput = ref<HTMLInputElement>()

// 检查是否为编辑模式
const isEdit = computed(() => !!route.params.id)

// 表单数据
const form = ref({
  name: '',
  category: '',
  tags: '',
  price: 0,
  originalPrice: 0,
  sort: 0,
  coverImage: '',
  carouselImages: [] as string[],
  description: '',
  features: '',
  requirements: '',
  openSource: '',
  deliveryFiles: {
    script: null as File | null,
    tutorial: null as File | null,
    source: null as File | null
  },
  isPublished: false
})

// 处理文件上传
const handleFileUpload = (field: string, event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    // 模拟上传，实际项目中需要调用上传接口
    const file = target.files[0]
    if (field === 'coverImage') {
      form.value.coverImage = URL.createObjectURL(file)
    } else if (field in form.value.deliveryFiles) {
      form.value.deliveryFiles[field as keyof typeof form.value.deliveryFiles] = file
    }
  }
}

// 处理轮播图上传
const handleCarouselUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    for (let i = 0; i < target.files.length && form.value.carouselImages.length < 5; i++) {
      const file = target.files[i]
      form.value.carouselImages.push(URL.createObjectURL(file))
    }
  }
}

// 保存模板
const saveTemplate = () => {
  // 验证表单
  if (!form.value.name || !form.value.category || !form.value.price || !form.value.coverImage) {
    alert('请填写必填字段')
    return
  }
  
  // 模拟保存操作
  console.log('Saving template:', form.value)
  
  // 保存成功后跳转回模板列表
  router.push('/admin/templates')
}

onMounted(() => {
  if (isEdit.value) {
    // 模拟加载模板数据
    form.value = {
      name: 'AI客服系统模板',
      category: 'ai',
      tags: 'AI,客服,聊天',
      price: 299,
      originalPrice: 399,
      sort: 10,
      coverImage: 'https://picsum.photos/200/150?random=1',
      carouselImages: [
        'https://picsum.photos/200/150?random=2',
        'https://picsum.photos/200/150?random=3'
      ],
      description: 'AI客服系统模板，支持智能问答、多轮对话、知识库集成等功能',
      features: '智能问答\n多轮对话\n知识库集成\n自定义意图\n数据分析',
      requirements: 'Node.js 14+\nMongoDB 4.0+\nRedis\nDocker',
      openSource: '基于开源项目 ChatGPT API 构建，使用 MIT 许可证',
      deliveryFiles: {
        script: null,
        tutorial: null,
        source: null
      },
      isPublished: true
    }
  }
})
</script>

<style scoped>
/* TemplateForm component styles */
</style>