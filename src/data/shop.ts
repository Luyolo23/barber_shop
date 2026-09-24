export const shop = {
  name: 'Rand & Razor Barber Co.',
  tagline: 'Classic cuts. Proper shaves.',
  established: 1952,
  phone: '+27 11 555 0142',
  phoneHref: 'tel:+27115550142',
  email: 'hello@randandrazor.co.za',
  address: {
    street: '24 Fox Street',
    suburb: 'Marshalltown',
    city: 'Johannesburg',
    postalCode: '2001',
  },
  timezone: 'Africa/Johannesburg',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/' },
  ],
}

export const fullAddress = `${shop.address.street}, ${shop.address.suburb}, ${shop.address.city}, ${shop.address.postalCode}`

// dayOfWeek uses JS numbering: 0 = Sunday ... 6 = Saturday
// Booking logic will reuse this later.
export const openingHours = [
  { label: 'Monday', days: [1], open: null, close: null },
  { label: 'Tuesday - Friday', days: [2, 3, 4, 5], open: '09:00', close: '18:00' },
  { label: 'Saturday', days: [6], open: '08:00', close: '16:00' },
  { label: 'Sunday', days: [0], open: null, close: null },
]

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/booking', label: 'Contact' },
]