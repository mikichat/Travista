<!-- src/pages/Customers.vue -->
<template>
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">고객 관리</h2>
        <button @click="showAddForm = true" class="btn-primary">
          새 고객 추가
        </button>
      </div>
  
      <!-- 고객 추가/수정 폼 -->
      <div v-if="showAddForm" class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 class="text-lg font-semibold mb-4">
          {{ editingCustomer ? '고객 정보 수정' : '새 고객 등록' }}
        </h3>
        
        <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="form-label">이름 *</label>
            <input 
              type="text" 
              v-model="form.name" 
              class="form-input"
              required
            >
          </div>
          
          <div>
            <label class="form-label">전화번호 *</label>
            <input 
              type="tel" 
              v-model="form.phone" 
              class="form-input"
              required
            >
          </div>
          
          <div>
            <label class="form-label">이메일</label>
            <input 
              type="email" 
              v-model="form.email" 
              class="form-input"
            >
          </div>
          
          <div>
            <label class="form-label">생년월일</label>
            <input 
              type="date" 
              v-model="form.birthDate" 
              class="form-input"
            >
          </div>
          
          <div class="md:col-span-2">
            <label class="form-label">주소</label>
            <input 
              type="text" 
              v-model="form.address" 
              class="form-input"
            >
          </div>
          
          <div class="md:col-span-2">
            <label class="form-label">메모</label>
            <textarea 
              v-model="form.memo" 
              class="form-input"
              rows="3"
            ></textarea>
          </div>
          
          <div class="md:col-span-2 flex justify-end space-x-2">
            <button type="button" @click="cancelForm" class="btn-secondary">
              취소
            </button>
            <button type="submit" class="btn-primary">
              {{ editingCustomer ? '수정' : '등록' }}
            </button>
          </div>
        </form>
      </div>
  
      <!-- 고객 목록 -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-4 border-b">
          <h3 class="text-lg font-semibold">고객 목록</h3>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이름
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  전화번호
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이메일
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  등록일
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="customer in customerStore.customers" :key="customer.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ customer.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ customer.phone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ customer.email || '-' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(customer.createdAt) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button @click="editCustomer(customer)" class="text-blue-600 hover:text-blue-900">
                    수정
                  </button>
                  <button @click="deleteCustomer(customer.id)" class="text-red-600 hover:text-red-900">
                    삭제
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="customerStore.customers.length === 0" class="text-center py-8 text-gray-500">
            등록된 고객이 없습니다.
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { useCustomerStore } from '../stores/customerStore'
  
  const customerStore = useCustomerStore()
  
  const showAddForm = ref(false)
  const editingCustomer = ref(null)
  
  const form = reactive({
    name: '',
    phone: '',
    email: '',
    birthDate: '',
    address: '',
    memo: ''
  })
  
  const resetForm = () => {
    form.name = ''
    form.phone = ''
    form.email = ''
    form.birthDate = ''
    form.address = ''
    form.memo = ''
  }
  
  const submitForm = () => {
    if (editingCustomer.value) {
      customerStore.updateCustomer(editingCustomer.value.id, { ...form })
    } else {
      customerStore.addCustomer({ ...form })
    }
    
    cancelForm()
  }
  
  const cancelForm = () => {
    showAddForm.value = false
    editingCustomer.value = null
    resetForm()
  }
  
  const editCustomer = (customer) => {
    editingCustomer.value = customer
    form.name = customer.name
    form.phone = customer.phone
    form.email = customer.email || ''
    form.birthDate = customer.birthDate || ''
    form.address = customer.address || ''
    form.memo = customer.memo || ''
    showAddForm.value = true
  }
  
  const deleteCustomer = (id) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      customerStore.deleteCustomer(id)
    }
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
  }
  
  onMounted(() => {
    customerStore.fetchCustomers()
  })
  </script>