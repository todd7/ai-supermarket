<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">分类管理</h1>
      <button
        @click="showAddModal = true"
        class="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        新增分类
      </button>
    </div>
    
    <!-- Category List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                分类ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                分类名称
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                父分类
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
            <tr v-for="category in categories" :key="category.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ category.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ category.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ category.parentName || '无' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ category.sort }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    category.status === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ category.status === 1 ? '启用' : '禁用' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editCategory(category)"
                  class="text-blue-600 hover:text-blue-500 mr-3"
                >
                  编辑
                </button>
                <button
                  @click="toggleStatus(category)"
                  class="text-gray-600 hover:text-gray-500 mr-3"
                >
                  {{ category.status === 1 ? '禁用' : '启用' }}
                </button>
                <button
                  @click="deleteCategory(category.id)"
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
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">{{ showEditModal ? '编辑分类' : '新增分类' }}</h3>
        <form @submit.prevent="saveCategory">
          <div class="space-y-4">
            <div>
              <label for="categoryName" class="block text-sm font-medium text-gray-700 mb-1">分类名称 <span class="text-red-500">*</span></label>
              <input
                type="text"
                id="categoryName"
                v-model="categoryForm.name"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入分类名称"
              />
            </div>
            <div>
              <label for="parentId" class="block text-sm font-medium text-gray-700 mb-1">父分类</label>
              <select
                id="parentId"
                v-model="categoryForm.parentId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="0">无（一级分类）</option>
                <option
                  v-for="cat in parentCategories"
                  :key="cat.id"
                  :value="cat.id"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">排序</label>
              <input
                type="number"
                id="sort"
                v-model.number="categoryForm.sort"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入排序"
              />
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
import { ref, computed, onMounted } from 'vue'

// 分类列表
const categories = ref([
  {
    id: 1,
    name: 'AI应用模板',
    parentId: 0,
    parentName: null,
    sort: 10,
    status: 1
  },
  {
    id: 2,
    name: '日常应用模板',
    parentId: 0,
    parentName: null,
    sort: 20,
    status: 1
  },
  {
    id: 3,
    name: '企业知识库',
    parentId: 1,
    parentName: 'AI应用模板',
    sort: 10,
    status: 1
  },
  {
    id: 4,
    name: 'AI客服',
    parentId: 1,
    parentName: 'AI应用模板',
    sort: 20,
    status: 1
  },
  {
    id: 5,
    name: '个人博客/作品集',
    parentId: 2,
    parentName: '日常应用模板',
    sort: 10,
    status: 1
  },
  {
    id: 6,
    name: '播客网站',
    parentId: 2,
    parentName: '日常应用模板',
    sort: 20,
    status: 1
  }
])

// 父分类列表（一级分类）
const parentCategories = computed(() => {
  return categories.value.filter(cat => cat.parentId === 0)
})

// 模态框状态
const showAddModal = ref(false)
const showEditModal = ref(false)

// 分类表单
const categoryForm = ref({
  id: 0,
  name: '',
  parentId: 0,
  sort: 0
})

// 编辑分类
const editCategory = (category: any) => {
  categoryForm.value = { ...category }
  showEditModal.value = true
}

// 取消编辑
const cancelEdit = () => {
  showAddModal.value = false
  showEditModal.value = false
  categoryForm.value = {
    id: 0,
    name: '',
    parentId: 0,
    sort: 0
  }
}

// 保存分类
const saveCategory = () => {
  if (!categoryForm.value.name) {
    alert('请输入分类名称')
    return
  }
  
  if (showEditModal.value) {
    // 编辑分类
    const index = categories.value.findIndex(cat => cat.id === categoryForm.value.id)
    if (index !== -1) {
      categories.value[index] = { ...categoryForm.value }
    }
  } else {
    // 新增分类
    const newCategory = {
      id: categories.value.length + 1,
      name: categoryForm.value.name,
      parentId: categoryForm.value.parentId,
      parentName: categoryForm.value.parentId === 0 ? null : categories.value.find(cat => cat.id === categoryForm.value.parentId)?.name,
      sort: categoryForm.value.sort,
      status: 1
    }
    categories.value.push(newCategory)
  }
  
  cancelEdit()
}

// 切换分类状态
const toggleStatus = (category: any) => {
  category.status = category.status === 1 ? 0 : 1
  console.log('Toggle category status:', category.id, category.status)
}

// 删除分类
const deleteCategory = (id: number) => {
  if (confirm('确定要删除这个分类吗？删除后该分类下的模板将无法正常显示。')) {
    // 检查是否有子分类
    const hasChildren = categories.value.some(cat => cat.parentId === id)
    if (hasChildren) {
      alert('该分类下有子分类，无法删除')
      return
    }
    
    categories.value = categories.value.filter(cat => cat.id !== id)
    console.log('Delete category:', id)
  }
}

onMounted(() => {
  // 加载分类列表
  console.log('Category list loaded')
})
</script>

<style scoped>
/* CategoryList component styles */
</style>