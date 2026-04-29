<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Banner管理</h1>
      <button
        @click="showAddModal = true"
        class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        新增Banner
      </button>
    </div>
    
    <!-- Banner List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                图片
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                标题
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                跳转链接
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                排序
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="banner in banners" :key="banner.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ banner.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img :src="banner.image" class="h-16 w-32 object-cover rounded-md" :alt="banner.title">
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ banner.title }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                <a :href="banner.link" target="_blank" class="text-blue-600 hover:text-blue-500">{{ banner.link }}</a>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ banner.sort }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    banner.status === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ banner.status === 1 ? '启用' : '禁用' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editBanner(banner)"
                  class="text-blue-600 hover:text-blue-500 mr-3"
                >
                  编辑
                </button>
                <button
                  @click="toggleStatus(banner)"
                  class="text-gray-600 hover:text-gray-500 mr-3"
                >
                  {{ banner.status === 1 ? '禁用' : '启用' }}
                </button>
                <button
                  @click="deleteBanner(banner.id)"
                  class="text-red-600 hover:text-red-500"
                >
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 overflow-hidden">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">{{ showEditModal ? '编辑Banner' : '新增Banner' }}</h3>
        <form @submit.prevent="saveBanner">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">图片 <span class="text-red-500">*</span></label>
              <div class="flex items-center space-x-4">
                <div v-if="bannerForm.image" class="relative">
                  <img :src="bannerForm.image" class="h-32 w-64 object-cover rounded-md" alt="Banner图片">
                  <button
                    @click="bannerForm.image = ''"
                    class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
                <div v-else class="h-32 w-64 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                  <span class="text-gray-500">点击上传</span>
                </div>
                <input
                  type="file"
                  @change="handleFileUpload($event)"
                  class="hidden"
                  id="bannerImage"
                />
                <label
                  for="bannerImage"
                  class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  选择图片
                </label>
              </div>
              <p class="mt-1 text-xs text-gray-500">建议尺寸：1920×600px</p>
            </div>
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-1">标题</label>
              <input
                type="text"
                id="title"
                v-model="bannerForm.title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入Banner标题"
              />
            </div>
            <div>
              <label for="link" class="block text-sm font-medium text-gray-700 mb-1">跳转链接</label>
              <input
                type="text"
                id="link"
                v-model="bannerForm.link"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入跳转链接"
              />
            </div>
            <div>
              <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">排序</label>
              <input
                type="number"
                id="sort"
                v-model.number="bannerForm.sort"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入排序"
              />
            </div>
            <div>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="bannerForm.status"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <span class="ml-2 block text-sm text-gray-700">启用</span>
              </label>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="cancelEdit"
              class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Banner列表
const banners = ref([
  {
    id: 1,
    image: 'https://picsum.photos/1920/600?random=1',
    title: 'AI客服系统模板',
    link: '/templates/1',
    sort: 10,
    status: 1
  },
  {
    id: 2,
    image: 'https://picsum.photos/1920/600?random=2',
    title: '企业知识库模板',
    link: '/templates/2',
    sort: 20,
    status: 1
  },
  {
    id: 3,
    image: 'https://picsum.photos/1920/600?random=3',
    title: '代部署服务',
    link: '/deployment',
    sort: 30,
    status: 1
  }
])

// 模态框状态
const showAddModal = ref(false)
const showEditModal = ref(false)

// Banner表单
const bannerForm = ref({
  id: 0,
  image: '',
  title: '',
  link: '',
  sort: 0,
  status: true
})

// 处理文件上传
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    // 模拟上传，实际项目中需要调用上传接口
    const file = target.files[0]
    bannerForm.value.image = URL.createObjectURL(file)
  }
}

// 编辑Banner
const editBanner = (banner: any) => {
  bannerForm.value = { ...banner }
  showEditModal.value = true
}

// 取消编辑
const cancelEdit = () => {
  showAddModal.value = false
  showEditModal.value = false
  bannerForm.value = {
    id: 0,
    image: '',
    title: '',
    link: '',
    sort: 0,
    status: true
  }
}

// 保存Banner
const saveBanner = () => {
  if (!bannerForm.value.image) {
    alert('请上传Banner图片')
    return
  }
  
  if (showEditModal.value) {
    // 编辑Banner
    const index = banners.value.findIndex(banner => banner.id === bannerForm.value.id)
    if (index !== -1) {
      banners.value[index] = { ...bannerForm.value }
    }
  } else {
    // 新增Banner
    const newBanner = {
      id: banners.value.length + 1,
      image: bannerForm.value.image,
      title: bannerForm.value.title,
      link: bannerForm.value.link,
      sort: bannerForm.value.sort,
      status: bannerForm.value.status ? 1 : 0
    }
    banners.value.push(newBanner)
  }
  
  cancelEdit()
}

// 切换Banner状态
const toggleStatus = (banner: any) => {
  banner.status = banner.status === 1 ? 0 : 1
  console.log('Toggle banner status:', banner.id, banner.status)
}

// 删除Banner
const deleteBanner = (id: number) => {
  if (confirm('确定要删除这个Banner吗？')) {
    banners.value = banners.value.filter(banner => banner.id !== id)
    console.log('Delete banner:', id)
  }
}

onMounted(() => {
  // 加载Banner列表
  console.log('Banner list loaded')
})
</script>

<style scoped>
/* BannerList component styles */
</style>