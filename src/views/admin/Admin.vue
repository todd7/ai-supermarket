<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <span class="text-2xl font-bold text-blue-600">AI模板超市 - 管理后台</span>
          </div>
          <div class="flex items-center">
            <button class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
              退出登录
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row md:items-start">
        <!-- Sidebar -->
        <div class="md:w-64 md:mr-8">
          <div class="bg-white rounded-lg shadow p-4">
            <nav class="space-y-1">
              <router-link
                to="/admin/templates"
                class="block px-4 py-2 text-sm font-medium rounded-md transition-colors"
                :class="$route.path === '/admin/templates' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'"
              >
                模板管理
              </router-link>
              <router-link
                to="/admin/orders"
                class="block px-4 py-2 text-sm font-medium rounded-md transition-colors"
                :class="$route.path === '/admin/orders' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'"
              >
                订单管理
              </router-link>
              <router-link
                to="/admin/users"
                class="block px-4 py-2 text-sm font-medium rounded-md transition-colors"
                :class="$route.path === '/admin/users' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'"
              >
                客户管理
              </router-link>
            </nav>
          </div>
        </div>

        <!-- Content -->
        <div class="mt-6 md:mt-0 md:flex-1">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Admin component
</script>

<style scoped>
/* Admin component styles */
</style>