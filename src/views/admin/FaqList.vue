<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">FAQ管理</h1>
      <button
        @click="showAddModal = true"
        class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        新增问题
      </button>
    </div>
    
    <!-- FAQ List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                分类
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                问题
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
            <tr v-for="faq in faqs" :key="faq.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ faq.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ faq.category }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ faq.question }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ faq.sort }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    faq.status === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ faq.status === 1 ? '启用' : '禁用' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editFaq(faq)"
                  class="text-blue-600 hover:text-blue-500 mr-3"
                >
                  编辑
                </button>
                <button
                  @click="toggleStatus(faq)"
                  class="text-gray-600 hover:text-gray-500 mr-3"
                >
                  {{ faq.status === 1 ? '禁用' : '启用' }}
                </button>
                <button
                  @click="deleteFaq(faq.id)"
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
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">{{ showEditModal ? '编辑问题' : '新增问题' }}</h3>
        <form @submit.prevent="saveFaq">
          <div class="space-y-4">
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700 mb-1">分类</label>
              <select
                id="category"
                v-model="faqForm.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="模板购买">模板购买</option>
                <option value="代部署服务">代部署服务</option>
                <option value="技术支持">技术支持</option>
                <option value="其他">其他</option>
              </select>
            </div>
            <div>
              <label for="question" class="block text-sm font-medium text-gray-700 mb-1">问题 <span class="text-red-500">*</span></label>
              <input
                type="text"
                id="question"
                v-model="faqForm.question"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入问题"
              />
            </div>
            <div>
              <label for="answer" class="block text-sm font-medium text-gray-700 mb-1">答案 <span class="text-red-500">*</span></label>
              <textarea
                id="answer"
                v-model="faqForm.answer"
                required
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入答案"
              ></textarea>
            </div>
            <div>
              <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">排序</label>
              <input
                type="number"
                id="sort"
                v-model.number="faqForm.sort"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入排序"
              />
            </div>
            <div>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="faqForm.status"
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

// FAQ列表
const faqs = ref([
  {
    id: 1,
    category: '模板购买',
    question: '如何购买模板？',
    answer: '您可以在模板详情页点击「立即购买」按钮，按照提示完成支付即可。',
    sort: 10,
    status: 1
  },
  {
    id: 2,
    category: '模板购买',
    question: '购买后如何下载模板？',
    answer: '购买完成后，您可以在「个人中心 - 下载中心」页面下载模板交付物。',
    sort: 20,
    status: 1
  },
  {
    id: 3,
    category: '代部署服务',
    question: '代部署服务包含哪些内容？',
    answer: '我们的代部署服务包含应用部署、环境配置、模型配置、调试和售后支持等内容。',
    sort: 10,
    status: 1
  },
  {
    id: 4,
    category: '代部署服务',
    question: '代部署服务的交付周期是多久？',
    answer: '根据服务套餐不同，交付周期为1-3个工作日。',
    sort: 20,
    status: 1
  },
  {
    id: 5,
    category: '技术支持',
    question: '如何获取技术支持？',
    answer: '您可以通过联系客服按钮获取技术支持，我们的客服人员会在工作时间内为您解答问题。',
    sort: 10,
    status: 1
  }
])

// 模态框状态
const showAddModal = ref(false)
const showEditModal = ref(false)

// FAQ表单
const faqForm = ref({
  id: 0,
  category: '模板购买',
  question: '',
  answer: '',
  sort: 0,
  status: true
})

// 编辑FAQ
const editFaq = (faq: any) => {
  faqForm.value = { ...faq }
  showEditModal.value = true
}

// 取消编辑
const cancelEdit = () => {
  showAddModal.value = false
  showEditModal.value = false
  faqForm.value = {
    id: 0,
    category: '模板购买',
    question: '',
    answer: '',
    sort: 0,
    status: true
  }
}

// 保存FAQ
const saveFaq = () => {
  if (!faqForm.value.question || !faqForm.value.answer) {
    alert('请填写问题和答案')
    return
  }
  
  if (showEditModal.value) {
    // 编辑FAQ
    const index = faqs.value.findIndex(faq => faq.id === faqForm.value.id)
    if (index !== -1) {
      faqs.value[index] = { ...faqForm.value }
    }
  } else {
    // 新增FAQ
    const newFaq = {
      id: faqs.value.length + 1,
      category: faqForm.value.category,
      question: faqForm.value.question,
      answer: faqForm.value.answer,
      sort: faqForm.value.sort,
      status: faqForm.value.status ? 1 : 0
    }
    faqs.value.push(newFaq)
  }
  
  cancelEdit()
}

// 切换FAQ状态
const toggleStatus = (faq: any) => {
  faq.status = faq.status === 1 ? 0 : 1
  console.log('Toggle faq status:', faq.id, faq.status)
}

// 删除FAQ
const deleteFaq = (id: number) => {
  if (confirm('确定要删除这个问题吗？')) {
    faqs.value = faqs.value.filter(faq => faq.id !== id)
    console.log('Delete faq:', id)
  }
}

onMounted(() => {
  // 加载FAQ列表
  console.log('FAQ list loaded')
})
</script>

<style scoped>
/* FaqList component styles */
</style>