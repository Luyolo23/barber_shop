import type { Barber } from '../types'

export const barbers: Barber[] = [
  {
    id: 'thabo',
    name: 'Thabo Mokoena',
    title: 'Senior Barber',
    specialty: 'Fades & hair design',
    years: 12,
    bio: 'Thabo trained under the shop’s original masters and is known for his razor-clean skin fades.',
    image: '/images/barber-thabo.jpg',
  },
  {
    id: 'johan',
    name: 'Johan van der Merwe',
    title: 'Master Barber',
    specialty: 'Classic cuts & razor shaves',
    years: 20,
    bio: 'A traditionalist with a steady hand. Johan’s hot towel shave is the shop’s signature.',
    image: '/images/barber-johan.jpg',
  },
  {
    id: 'sipho',
    name: 'Sipho Dlamini',
    title: 'Barber',
    specialty: 'Beards & The Full Service',
    years: 8,
    bio: 'Sipho shapes beards with an architect’s eye and runs our Full Service like clockwork.',
    image: '/images/barber-sipho.jpg',
  },
]