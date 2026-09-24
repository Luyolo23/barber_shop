import type { Service } from '../types'

export const services: Service[] = [
  { id: 'classic-cut', name: 'Classic Cut', price: 180, duration: 30, category: 'cuts', description: 'Scissor and clipper cut, finished with a neck shave and styling.' },
  { id: 'skin-fade', name: 'Skin Fade', price: 200, duration: 45, category: 'cuts', description: 'A sharp, seamless fade blended to your preferred length.' },
  { id: 'kids-cut', name: 'Kids Cut (under 12)', price: 120, duration: 30, category: 'cuts', description: 'Patient, friendly cuts for the little gentlemen.' },
  { id: 'beard-trim', name: 'Beard Trim & Shape', price: 120, duration: 30, category: 'beard', description: 'Sculpted lines, trimmed and finished with beard oil.' },
  { id: 'hot-towel-shave', name: 'Hot Towel Shave', price: 180, duration: 30, category: 'beard', description: 'A traditional straight-razor shave with hot towels.' },
  { id: 'scalp-treatment', name: 'Scalp Treatment', price: 100, duration: 15, category: 'beard', description: 'A cleansing, relaxing scalp massage and treatment.' },
  { id: 'full-service', name: 'The Full Service', price: 350, duration: 75, category: 'packages', description: 'Cut, beard shape and hot towel shave. The full works.' },
  { id: 'father-son', name: 'Father & Son', price: 300, duration: 60, category: 'packages', description: 'Two classic cuts, back to back, for you and your boy.' },
]

export const formatPrice = (n: number) => `R${n}`