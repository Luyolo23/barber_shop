# Rand & Razor Barber Co.

A complete website for a fictional Johannesburg barber shop with a gold-rush heritage, built with React and TypeScript. It includes a multi-step online booking system with real availability rules and calendar export (Google Calendar and Apple/Outlook `.ics`).

**Live site:** https://barber-shop-seven-hazel.vercel.app/


---

## Features

- **Booking flow:** service, barber, date, time slot, then customer details, ending in a confirmation "appointment card" with a booking reference
- **Availability rules:**
  - closed days (Sunday and Monday) cannot be selected
  - past times are blocked, with a 30-minute lead time
  - appointments must finish before closing time
  - overlapping bookings are blocked, based on service duration
  - the slot is re-checked at the moment of booking to prevent double-booking
- **Calendar integration:** "Add to Google Calendar" link and a downloadable `.ics` file (Apple Calendar, Outlook and Google-compatible), both generated from the customer's actual booking
- **Time zone safe:** "now" is calculated in `Africa/Johannesburg`, so the correct slots are shown regardless of the visitor's device time zone
- **First-visit offer modal:** appears after a short delay; closes via the X button, "No thanks", the Escape key or a backdrop click; stays dismissed once closed
- **Pages:** Home, Services, About, Book & Contact, Terms & Conditions, and a 404 page
- **Full Terms & Conditions**, with a table of contents and a privacy section referencing POPIA
- **Responsive design** across mobile, tablet and desktop, with a working mobile menu
- **Accessibility:** skip link, visible focus states, labelled form fields with error messages, ARIA attributes on interactive controls, and keyboard-operable booking and modal
- **Per-page document titles** and meta tags

## Tech stack

| Area | Choice |
|---|---|
| Framework | React 19 with TypeScript |
| Build tool | Vite |
| Routing | React Router |
| Styling | Tailwind CSS v4 (custom theme via `@theme`) |
| Forms and validation | react-hook-form, zod, @hookform/resolvers |
| Dates | date-fns |
| Hosting | Vercel |

## Getting started

**Prerequisites:** Node.js 20.19+ or 22.12+ and npm.

```bash
# Clone and install
git clone https://github.com/Luyolo23/barber_shop.git
cd barber_shop
npm install

# Start the dev server
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  components/    Header, Footer, Layout, Logo, PageHeader, OfferModal,
                 BarberCard, BookingFlow, BookingConfirmation, AddToCalendar
  pages/         Home, Services, About, Booking, Terms, NotFound
  data/          shop.ts (business details, hours, nav), services.ts, barbers.ts
  services/      availability.ts, bookingService.ts, calendar.ts
  hooks/         useDocumentTitle.ts
  types/         Shared TypeScript types (Service, Barber, Booking)
public/
  images/        Photography (hero, barbers, gallery, about)
  favicon.svg
vercel.json      SPA rewrite so deep links and refreshes don't 404
```

All business information lives in `src/data/shop.ts`, so the header, footer, contact section, Terms page and calendar events all read from a single source of truth.

## How the booking system works

1. **`availability.ts`** holds the rules: opening hours, slot generation in 30-minute steps, overlap detection, and Johannesburg-time "now".
2. **`bookingService.ts`** handles storage. Every function is `async`, so the storage layer can be replaced with `fetch()` calls to a real API without changing any UI code.
3. **`BookingFlow.tsx`** is the UI. Each step is revealed once the previous one is chosen, and changing an earlier choice clears the selected time.
4. **`calendar.ts`** builds the calendar outputs from the saved booking.

### Calendar handling

South Africa observes no daylight saving, so Johannesburg is always UTC+2.

- The **`.ics`** file writes `DTSTART` and `DTEND` in UTC, which every calendar app interprets correctly. A 3:00 PM booking is written as `T130000Z` and shows as 3:00 PM in Johannesburg.
- The **Google Calendar** link sends the local time together with `ctz=Africa/Johannesburg`.
- Each event includes the shop name, service, barber, start and end time, location, booking reference and a one-hour reminder.
- The event `UID` is the booking reference, so re-importing the same booking updates the event rather than duplicating it.

### Known limitations

- **Bookings are stored in the visitor's browser** (`localStorage`), so they are not shared between devices or users. Double-booking is prevented per browser only.
- **Some existing appointments are simulated.** `demoBookings()` in `bookingService.ts` generates a deterministic set of "existing customer" bookings so the diary looks like a busy shop. Remove it once a real backend supplies the data.
- **No confirmation emails are sent**, and the confirmation screen is worded accordingly.

## Design system

| Role | Colour | Hex |
|---|---|---|
| Primary | Bottle green | `#1F3A2E` |
| Background | Warm cream | `#F3EAD8` |
| Accent | Brass gold | `#B8893B` |
| Secondary accent | Oxblood | `#6E1F24` |
| Text / dark sections | Charcoal | `#1C1B19` |

- **Headings:** Playfair Display
- **Body:** Source Sans 3
- **Logo:** custom SVG badge (crossed razor and comb), with a compact header version and a simplified favicon
- **Signature details:** barber-pole divider, price-board style service menu with dotted leaders, coupon-style modal, and an appointment-card confirmation

Contrast note: brass is used for buttons and ornaments (with charcoal text on top) or as text on green and charcoal backgrounds only, never as body text on cream.

## Deployment

The site is deployed on Vercel. Every push to `main` triggers a new deployment.

1. Push the repository to GitHub
2. Import it in Vercel (**Add New, then Project**)
3. Keep the auto-detected Vite settings and deploy

`vercel.json` rewrites all routes to `index.html` so that refreshing pages such as `/booking` or `/terms#privacy` works.

## Testing checklist

The full journey below was tested on desktop and mobile:

**Home, Services, Book this, choose a barber, choose a date, choose a time, enter details, confirm, add to calendar**

Also checked:

- Navigation, footer links, social links and legal links
- Mobile menu (link click, close button, Escape)
- Modal (all close methods, and not reappearing after dismissal)
- Closed days, past times, fully booked days and overlapping slots
- Form validation (empty form, bad email, bad phone number, unchecked terms)
- Calendar output for different services, dates and barbers, with the `.ics` imported into a real calendar
- Responsive layouts at 360px, 768px, 1024px and 1440px
- Clean browser console, no broken images, and a successful `npm run build`

## Roadmap

- **Spring Boot API** with Postgres (`GET /availability`, `POST /bookings`) for shared bookings and true double-booking prevention, deployed with Docker
- Confirmation and reminder emails
- Booking cancellation and rescheduling via reference code
- Automated tests (Vitest for the availability and calendar logic, Playwright for the booking journey)

## Credits

- Photography from [Unsplash](https://unsplash.com) (free licence). Add photographer credits here.
- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) and [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) via Google Fonts
- Logo and favicon: designed for this project

## Author

Built by Luyolo Tuta as a practical assessment project.

- GitHub: https://github.com/Luyolo23
- LinkedIn: https://linkedin.com/in/luyolo-tuta-2927a0236