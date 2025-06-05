<!-- src/pages/Trips.vue -->
<template>
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">여행 견적 관리</h2>
        <button @click="showAddForm = true" class="btn-primary">
          새 견적 작성
        </button>
      </div>
  
      <!-- 견적 작성/수정 폼 -->
      <div v-if="showAddForm" class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 class="text-lg font-semibold mb-4">
          {{ editingTrip ? '견적 수정' : '새 견적 작성' }}
        </h3>
        
        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- 기본 정보 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="form-label">고객명 *</label>
              <input 
                type="text" 
                v-model="form.customerName" 
                class="form-input"
                required
              >
            </div>
            
            <div>
              <label class="form-label">연락처 *</label>
              <input 
                type="tel" 
                v-model="form.customerPhone" 
                class="form-input"
                required
              >
            </div>
            
            <div>
              <label class="form-label">여행지 *</label>
              <input 
                type="text" 
                v-model="form.destination" 
                class="form-input"
                required
              >
            </div>
            
            <div>
              <label class="form-label">인원수 *</label>
              <input 
                type="number" 
                v-model="form.participants" 
                class="form-input"
                min="1"
                required
              >
            </div>
            
            <div>
              <label class="form-label">출발일 *</label>
              <input 
                type="date" 
                v-model="form.startDate" 
                class="form-input"
                required
              >
            </div>
            
            <div>
              <label class="form-label">도착일 *</label>
              <input 
                type="date" 
                v-model="form.endDate" 
                class="form-input"
                required
              >
            </div>
          </div>
  
          <!-- 견적 항목들 -->
          <div>
            <h4 class="text-md font-semibold mb-3">견적 항목</h4>
            
            <div class="space-y-3">
              <div v-for="(item, index) in form.items" :key="index" 
                   class="flex items-center space-x-2 p-3 border rounded">
                <input 
                  type="text" 
                  v-model="item.name" 
                  placeholder="항목명"
                  class="form-input flex-1"
                >
                <input 
                  type="number" 
                  v-model="item.price" 
                  placeholder="가격"
                  class="form-input w-32"
                  min="0"
                >
                <button 
                  type="button" 
                  @click="removeItem(index)"
                  class="btn-danger text-sm"
                >
                  삭제
                </button>
              </div>
            </div>
            
            <button 
              type="button" 
              @click="addItem" 
              class="mt-3 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm"
            >
              항목 추가
            </button>
          </div>
  
          <!-- 총 금액 -->
          <div class="bg-gray-50 p-4 rounded">
            <div class="text-lg font-semibold">
              총 견적 금액: {{ formatPrice(totalPrice) }}원
            </div>
          </div>
  
          <!-- 메모 -->
          <div>
            <label class="form-label">메모</label>
            <textarea 
              v-model="form.memo" 
              class="form-input"
              rows="3"
              placeholder="특별 요청사항이나 메모를 입력하세요"
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-2">
            <button type="button" @click="cancelForm" class="btn-secondary">
              취소
            </button>
            <button type="submit" class="btn-primary">
              {{ editingTrip ? '수정' : '저장' }}
            </button>
          </div>
        </form>
      </div>
  
      <!-- 견적 목록 -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-4 border-b">
          <h3 class="text-lg font-semibold">견적 목록</h3>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객명
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  여행지
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  일정
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  인원
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  견적금액
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="trip in tripStore.trips" :key="trip.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ trip.customerName }}</div>
                  <div class="text-sm text-gray-500">{{ trip.customerPhone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ trip.destination }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ formatDate(trip.startDate) }} ~ {{ formatDate(trip.endDate) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ trip.participants }}명</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatPrice(trip.totalPrice) }}원</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(trip.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ getStatusText(trip.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button @click="editTrip(trip)" class="text-blue-600 hover:text-blue-900">
                    수정
                  </button>
                  <button @click="deleteTrip(trip.id)" class="text-red-600 hover:text-red-900">
                    삭제
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="tripStore.trips.length === 0" class="text-center py-8 text-gray-500">
            등록된 견적이 없습니다.
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useTripStore } from '../stores/tripStore'
  
  const tripStore = useTripStore()
  
  const showAddForm = ref(false)
  const editingTrip = ref(null)
  
  const form = reactive({
    customerName: '',
    customerPhone: '',
    destination: '',
    participants: 1,
    startDate: '',
    endDate: '',
    items: [
      { name: '항공료', price: 0 },
      { name: '숙박비', price: 0 },
      { name: '식비', price: 0 }
    ],
    memo: '',
    status: 'pending'
  })
  
  const totalPrice = computed(() => {
    return form.items.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
  })
  
  const resetForm = () => {
    form.customerName = ''
    form.customerPhone = ''
    form.destination = ''
    form.participants = 1
    form.startDate = ''
    form.endDate = ''
    form.items = [
      { name: '항공료', price: 0 },
      { name: '숙박비', price: 0 },
      { name: '식비', price: 0 }
    ]
    form.memo = ''
    form.status = 'pending'
  }
  
  const addItem = () => {
    form.items.push({ name: '', price: 0 })
  }
  
  const removeItem = (index) => {
    form.items.splice(index, 1)
  }
  
  const submitForm = () => {
    const tripData = {
      ...form,
      totalPrice: totalPrice.value
    }
    
    if (editingTrip.value) {
      tripStore.updateTrip(editingTrip.value.id, tripData)
    } else {
      tripStore.addTrip(tripData)
    }
    
    cancelForm()
  }
  
  const cancelForm = () => {
    showAddForm.value = false
    editingTrip.value = null
    resetForm()
  }
  
  const editTrip = (trip) => {
    editingTrip.value = trip
    form.customerName = trip.customerName
    form.customerPhone = trip.customerPhone
    form.destination = trip.destination
    form.participants = trip.participants
    form.startDate = trip.startDate
    form.endDate = trip.endDate
    form.items = [...trip.items]
    form.memo = trip.memo || ''
    form.status = trip.status
    showAddForm.value = true
  }
  
  const deleteTrip = (id) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      tripStore.deleteTrip(id)
    }
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
  }
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }
  
  const getStatusClass = (status) => {
    const classes = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
  }
  
  const getStatusText = (status) => {
    const texts = {
      pending: '대기중',
      confirmed: '확정',
      cancelled: '취소'
    }
    return texts[status] || '알 수 없음'
  }
  
  onMounted(() => {
    tripStore.fetchTrips()
  })
  </script>