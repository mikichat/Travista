// src/services/tripService.js
import axios from 'axios'

const API_BASE = 'http://localhost:3000/api/trips'

export const getTrips = () => axios.get(API_BASE)
export const createTrip = (data) => axios.post(API_BASE, data)
