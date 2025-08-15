export type RoomStatus = "available" | "occupied" | "maintenance" | "cleaning" | "out-of-order"
export type ReservationStatus = "confirmed" | "checked-in" | "checked-out" | "cancelled" | "no-show"
export type PaymentStatus = "pending" | "partial" | "paid" | "refunded"
export type GuestRequestStatus = "pending" | "in-progress" | "completed" | "cancelled"

export interface Room {
  id: string
  number: string
  type: string
  floor: number
  capacity: number
  baseRate: number
  amenities: string[]
  status: RoomStatus
  lastCleaned?: string
  maintenanceNotes?: string
  currentGuest?: string
  checkOutTime?: string
  nextReservation?: string
  createdAt: string
  updatedAt: string
}

export interface Guest {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  idType: "passport" | "national-id" | "drivers-license"
  idNumber: string
  address: string
  city: string
  country: string
  dateOfBirth?: string
  company?: string
  vipStatus: boolean
  preferences?: string[]
  totalStays: number
  totalSpent: number
  lastStay?: string
  createdAt: string
  updatedAt: string
}

export interface Reservation {
  id: string
  reservationNumber: string
  guestId: string
  guestName: string
  guestEmail: string
  guestPhone: string
  roomId: string
  roomNumber: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  nights: number
  adults: number
  children: number
  ratePerNight: number
  subtotal: number
  taxes: number
  totalAmount: number
  status: ReservationStatus
  paymentStatus: PaymentStatus
  paidAmount: number
  remainingAmount: number
  specialRequests?: string
  source: string
  createdBy: string
  checkedInBy?: string
  checkedOutBy?: string
  createdAt: string
  checkedInAt?: string
  checkedOutAt?: string
  updatedAt: string
}

export interface GuestRequest {
  id: string
  guestId: string
  guestName: string
  roomNumber: string
  type: "housekeeping" | "maintenance" | "room-service" | "concierge" | "other"
  priority: "low" | "medium" | "high" | "urgent"
  description: string
  status: GuestRequestStatus
  assignedTo?: string
  requestedAt: string
  completedAt?: string
  notes?: string
  estimatedCost?: number
  actualCost?: number
}

export interface RoomService {
  id: string
  guestId: string
  guestName: string
  roomNumber: string
  items: {
    name: string
    quantity: number
    price: number
    total: number
  }[]
  subtotal: number
  serviceCharge: number
  taxes: number
  totalAmount: number
  status: "ordered" | "preparing" | "delivered" | "cancelled"
  orderedAt: string
  deliveredAt?: string
  deliveredBy?: string
  specialInstructions?: string
}

export interface Folio {
  id: string
  reservationId: string
  guestId: string
  guestName: string
  roomNumber: string
  checkInDate: string
  checkOutDate: string
  charges: FolioCharge[]
  payments: FolioPayment[]
  subtotal: number
  taxes: number
  totalCharges: number
  totalPayments: number
  balance: number
  status: "open" | "closed"
  createdAt: string
  updatedAt: string
}

export interface FolioCharge {
  id: string
  date: string
  description: string
  category: "room" | "food" | "beverage" | "service" | "tax" | "other"
  amount: number
  quantity: number
  total: number
  postedBy: string
  reference?: string
}

export interface FolioPayment {
  id: string
  date: string
  method: "cash" | "card" | "bank-transfer" | "mobile-money"
  amount: number
  reference: string
  processedBy: string
  notes?: string
}

export const ROOM_TYPES = [
  "Standard Single",
  "Standard Double",
  "Deluxe Single",
  "Deluxe Double",
  "Executive Suite",
  "Presidential Suite",
  "Family Room",
  "Connecting Rooms",
]

export const ROOM_AMENITIES = [
  "Air Conditioning",
  "WiFi",
  "TV",
  "Mini Bar",
  "Safe",
  "Balcony",
  "Ocean View",
  "City View",
  "Kitchenette",
  "Jacuzzi",
  "Work Desk",
  "Room Service",
]

export const GUEST_REQUEST_TYPES = [
  { value: "housekeeping", label: "Housekeeping" },
  { value: "maintenance", label: "Maintenance" },
  { value: "room-service", label: "Room Service" },
  { value: "concierge", label: "Concierge" },
  { value: "other", label: "Other" },
]

export const RESERVATION_SOURCES = [
  "Walk-in",
  "Phone",
  "Email",
  "Website",
  "Booking.com",
  "Expedia",
  "Agoda",
  "Corporate",
  "Travel Agent",
  "Repeat Guest",
]
