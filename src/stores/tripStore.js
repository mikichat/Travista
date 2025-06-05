// src/stores/tripStore.js
import { defineStore } from 'pinia'

export const useTripStore = defineStore('trip', {
  state: () => ({
    trips: [],
  }),
  actions: {
    async fetchTrips() {
      // API로부터 여행 목록 가져오기
    },
    addTrip(trip) {
      this.trips.push(trip)
    },
  },
})
