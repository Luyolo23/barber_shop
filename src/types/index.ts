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