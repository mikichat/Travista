// src/stores/customerStore.js
import { defineStore } from 'pinia'
import { customerService } from '../services/customerService'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    loading: false,
    error: null,
  }),
  
  getters: {
    getCustomerById: (state) => (id) => {
      return state.customers.find(customer => customer.id === id)
    },
    
    getCustomersByName: (state) => (name) => {
      return state.customers.filter(customer => 
        customer.name.toLowerCase().includes(name.toLowerCase())
      )
    }
  },
  
  actions: {
    async fetchCustomers() {
      this.loading = true
      this.error = null
      
      try {
        // API 호출 대신 임시 데이터 사용
        // const response = await customerService.getCustomers()
        // this.customers = response.data
        
        // 임시 데이터
        this.customers = [
          {
            id: 1,
            name: '김철수',
            phone: '010-1234-5678',
            email: 'kim@example.com',
            birthDate: '1985-05-15',
            address: '서울시 강남구 역삼동',
            memo: 'VIP 고객',
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            id: 2,
            name: '이영희',
            phone: '010-9876-5432',
            email: 'lee@example.com',
            birthDate: '1990-08-22',
            address: '부산시 해운대구',
            memo: '가족 여행 선호',
            createdAt: '2024-02-20T14:15:00Z'
          }
        ]
      } catch (error) {
        this.error = error.message
        console.error('고객 목록 조회 실패:', error)
      } finally {
        this.loading = false
      }
    },
    
    async addCustomer(customerData) {
      this.loading = true
      this.error = null
      
      try {
        // API 호출 대신 임시 로직 사용
        // const response = await customerService.createCustomer(customerData)
        // this.customers.push(response.data)
        
        // 임시 로직
        const newCustomer = {
          id: Math.max(...this.customers.map(c => c.id), 0) + 1,
          ...customerData,
          createdAt: new Date().toISOString()
        }
        this.customers.push(newCustomer)
        
        console.log('고객 추가 완료:', newCustomer)
      } catch (error) {
        this.error = error.message
        console.error('고객 추가 실패:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async updateCustomer(id, customerData) {
      this.loading = true
      this.error = null
      
      try {
        // API 호출 대신 임시 로직 사용
        // const response = await customerService.updateCustomer(id, customerData)
        
        const index = this.customers.findIndex(customer => customer.id === id)
        if (index !== -1) {
          this.customers[index] = {
            ...this.customers[index],
            ...customerData,
            updatedAt: new Date().toISOString()
          }
        }
        
        console.log('고객 정보 수정 완료:', id)
      } catch (error) {
        this.error = error.message
        console.error('고객 정보 수정 실패:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async deleteCustomer(id) {
      this.loading = true
      this.error = null
      
      try {
        // API 호출 대신 임시 로직 사용
        // await customerService.deleteCustomer(id)
        
        const index = this.customers.findIndex(customer => customer.id === id)
        if (index !== -1) {
          this.customers.splice(index, 1)
        }
        
        console.log('고객 삭제 완료:', id)
      } catch (error) {
        this.error = error.message
        console.error('고객 삭제 실패:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})