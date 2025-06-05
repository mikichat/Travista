<!-- src/App.vue -->
<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">소규모 여행사 관리자</h1>
      <nav class="space-x-4">
        <RouterLink to="/" class="text-blue-600 hover:underline">홈</RouterLink>
        <RouterLink to="/trips" class="text-blue-600 hover:underline">여행 견적</RouterLink>
        <RouterLink to="/customers" class="text-blue-600 hover:underline">고객 관리</RouterLink>
      </nav>
    </header>
    
    <main class="p-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<style>
/* 전역 스타일이 필요하면 여기에 추가 가능 */
</style>
