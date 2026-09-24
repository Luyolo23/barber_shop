export type Service = {
  id: string
  name: string
  price: number // in rand
  duration: number // minutes, drives the calendar end time
  description: string
  category: 'cuts' | 'beard' | 'packages'
}

export type Barber = {
  id: string
  name: string
  title: string
  specialty: string
  years: number
  bio: string
  image: string
}

export type Booking = {
  reference: string
  serviceId: string
  barberId: string
  date: string // yyyy-MM-dd, shop-local
  time: string // HH:mm (24h), shop-local
  duration: number // minutes
  customer: {
    name: string
    phone: string
    email: string
    notes?: string
  }
  createdAt: string
}