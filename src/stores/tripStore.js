// src/stores/tripStore.js
import { defineStore } from 'pinia'
import { tripService } from '../services/tripService'

export const useTripStore = defineStore('trip', {
  state: () => ({
    trips: [],
    loading: false,
    error: null,
  }),
  
  getters: {
    getTripById: (state) => (id) => {
      return state.trips.find(trip => trip.id === id)
    },
    
    getTripsByCustomer: (state) => (customerName) => {
      return state.trips.filter(trip => 
        trip.customerName.toLowerCase().includes(customerName.toLowerCase())
      )
    },
    
    getTripsByStatus: (state) => (status) => {
      return state.trips.filter(trip => trip.status === status)
    },
    
    getTotalRevenue: (state) => {
      return state.trips
        .filter(trip => trip.status === 'confirmed')
        .reduce((sum, trip) => sum + trip.totalPrice, 0)
    }
  },
  
  actions: {
    async fetchTrips() {
      this.loading = true
      this.error = null
      
      try {
        const response = await tripService.getTrips()
        this.trips = response.data
        // 임시 데이터
        this.trips = [
          {
            id: 1,
            customerName: '김철수',
            customerPhone: '010-1234-5678',
            destination: '제주도',
            participants: 4,
            startDate: '2024-07-15',
            endDate: '2024-07-18',
            items: [
              { name: '항공료', price: 800000 },
              { name: '숙박비', price: 600000 },
              { name: '식비', price: 400000 },
              { name: '관광지 입장료', price: 200000 }
            ],
            totalPrice: 2000000,
            status: 'confirmed',
            memo: '가족 여행, 아이 2명 포함',
            createdAt: '2024-06-01T10:30:00Z'
          },
          {
            id: 2,
            customerName: '이영희',
            customerPhone: '010-9876-5432',
            destination: '오사카',
            participants: 2,
            startDate: '2024-08-10',
            endDate: '2024-08-14',
            items: [
              { name: '항공료', price: 600000 },
              { name: '숙박비', price: 500000 },
              { name: '식비', price: 300000 },
              { name: '관광지 입장료', price: 100000 }
            ],
            totalPrice: 1500000,
            status: 'pending',
            memo: '비행기 예약 필요',
            createdAt: '2024-06-02T14:45:00Z'
          }
        ]
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
      }
    },
  },
})