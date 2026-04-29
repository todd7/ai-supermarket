<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">用户管理</h1>
    </div>
    
    <!-- Filter Section -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">筛选条件</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">手机号</label>
          <input
            type="text"
            id="phone"
            v-model="filters.phone"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入手机号"
          />
        </div>
        <div>
          <label for="nickname" class="block text-sm font-medium text-gray-700 mb-1">昵称</label>
          <input
            type="text"
            id="nickname"
            v-model="filters.nickname"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="请输入昵称"
          />
        </div>
        <div class="flex items-end">
          <button
            @click="searchUsers"
            class="w-full px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            搜索
          </button>
        </div>
      </div>
    </div>
    
    <!-- User List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                用户ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                昵称
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                手机号
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                注册时间
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                累计订单数
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                累计消费金额
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最后登录时间
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user.nickname }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.phone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.registerTime }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.orderCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ¥{{ user.totalSpent }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.lastLoginTime }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <router-link
                  :to="`/admin/users/${user.id}`"
                  class="text-blue-600 hover:text-blue-500 mr-3"
                >
                  查看详情
                </router-link>
                <button
                  @click="toggleStatus(user)"
                  class="text-gray-600 hover:text-gray-500 mr-3"
                >
                  {{ user.status === 1 ? '禁用' : '启用' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            上一页
          </button>
          <button
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            下一页
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              显示第 <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> 到 <span class="font-medium">{{ Math.min(currentPage * pageSize, total) }}</span> 条，共 <span class="font-medium">{{ total }}</span> 条记录
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">上一页</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                v-for="page in totalPages"
                :key="page"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">下一页</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 筛选条件
const filters = ref({
  phone: '',
  nickname: ''
})

// 用户列表
const users = ref([
  {
    id: 1,
    nickname: '张三',
    phone: '13800138001',
    registerTime: '2026-01-01 10:00:00',
    orderCount: 5,
    totalSpent: 1299,
    lastLoginTime: '2026-01-10 14:30:00',
    status: 1
  },
  {
    id: 2,
    nickname: '李四',
    phone: '13900139002',
    registerTime: '2026-01-02 14:30:00',
    orderCount: 3,
    totalSpent: 899,
    lastLoginTime: '2026-01-09 09:15:00',
    status: 1
  },
  {
    id: 3,
    nickname: '王五',
    phone: '13700137003',
    registerTime: '2026-01-03 09:15:00',
    orderCount: 1,
    totalSpent: 399,
    lastLoginTime: '2026-01-08 16:45:00',
    status: 1
  },
  {
    id: 4,
    nickname: '赵六',
    phone: '13600136004',
    registerTime: '2026-01-04 16:45:00',
    orderCount: 2,
    totalSpent: 599,
    lastLoginTime: '2026-01-07 11:20:00',
    status: 0
  },
  {
    id: 5,
    nickname: '钱七',
    phone: '13500135005',
    registerTime: '2026-01-05 11:20:00',
    orderCount: 4,
    totalSpent: 999,
    lastLoginTime: '2026-01-06 10:00:00',
    status: 1
  }
])

// 分页信息
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

// 搜索用户
const searchUsers = () => {
  // 模拟搜索功能
  console.log('Searching users with filters:', filters.value)
}

// 切换用户状态
const toggleStatus = (user: any) => {
  user.status = user.status === 1 ? 0 : 1
  console.log('Toggle user status:', user.id, user.status)
}

onMounted(() => {
  // 加载用户列表
  console.log('User list loaded')
})
</script>

<style scoped>
/* UserList component styles */
</style>