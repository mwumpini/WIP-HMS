export interface GuestData {
  id: string
  name: string
  email: string
  phone: string
  roomNumber?: string
  checkInDate?: Date
  checkOutDate?: Date
  status: "checked-in" | "checked-out" | "reserved" | "no-show"
  preferences: string[]
  vipStatus: boolean
}

export interface RoomData {
  id: string
  number: string
  type: "standard" | "deluxe" | "suite"
  status: "available" | "occupied" | "maintenance" | "cleaning" | "out-of-order"
  guestId?: string
  housekeepingStatus: "clean" | "dirty" | "inspected" | "maintenance"
  lastCleaned?: Date
  nextMaintenance?: Date
}

export interface OrderData {
  id: string
  guestId?: string
  roomNumber?: string
  type: "dine-in" | "room-service" | "takeaway"
  items: Array<{
    name: string
    quantity: number
    price: number
    specialInstructions?: string
  }>
  status: "pending" | "preparing" | "ready" | "delivered" | "completed"
  total: number
  createdAt: Date
}

export interface IncidentData {
  id: string
  type: "security" | "maintenance" | "guest-complaint" | "emergency"
  severity: "low" | "medium" | "high" | "critical"
  location: string
  description: string
  reportedBy: string
  assignedTo?: string
  status: "open" | "in-progress" | "resolved" | "closed"
  createdAt: Date
  resolvedAt?: Date
}

// Integration Hub for cross-module communication
export class IntegrationHub {
  private static instance: IntegrationHub
  private subscribers: Map<string, Array<(data: any) => void>> = new Map()
  private guestData: Map<string, GuestData> = new Map()
  private roomData: Map<string, RoomData> = new Map()
  private orderData: Map<string, OrderData> = new Map()
  private incidentData: Map<string, IncidentData> = new Map()
  private isConnected = true
  private lastError: string | null = null

  static getInstance(): IntegrationHub {
    if (!IntegrationHub.instance) {
      IntegrationHub.instance = new IntegrationHub()
    }
    return IntegrationHub.instance
  }

  getConnectionStatus(): { connected: boolean; lastError: string | null } {
    return {
      connected: this.isConnected,
      lastError: this.lastError,
    }
  }

  private handleError(operation: string, error: any) {
    console.error(`[IntegrationHub] Error in ${operation}:`, error)
    this.lastError = `${operation}: ${error.message || "Unknown error"}`
    this.broadcast("integration-error", { operation, error: this.lastError })
  }

  subscribe(event: string, callback: (data: any) => void) {
    try {
      if (!this.subscribers.has(event)) {
        this.subscribers.set(event, [])
      }
      this.subscribers.get(event)?.push(callback)
    } catch (error) {
      this.handleError("subscribe", error)
    }
  }

  broadcast(event: string, data: any) {
    try {
      const callbacks = this.subscribers.get(event) || []
      callbacks.forEach((callback) => {
        try {
          callback(data)
        } catch (error) {
          console.error(`[IntegrationHub] Error in callback for event ${event}:`, error)
        }
      })
    } catch (error) {
      this.handleError("broadcast", error)
    }
  }

  updateGuest(guestData: GuestData) {
    try {
      if (!guestData.id || !guestData.name) {
        throw new Error("Guest data must have id and name")
      }
      this.guestData.set(guestData.id, guestData)
      this.broadcast("guest-updated", guestData)
    } catch (error) {
      this.handleError("updateGuest", error)
    }
  }

  getGuest(guestId: string): GuestData | undefined {
    return this.guestData.get(guestId)
  }

  getGuestByRoom(roomNumber: string): GuestData | undefined {
    return Array.from(this.guestData.values()).find((guest) => guest.roomNumber === roomNumber)
  }

  updateRoom(roomData: RoomData) {
    try {
      if (!roomData.id || !roomData.number) {
        throw new Error("Room data must have id and number")
      }
      this.roomData.set(roomData.id, roomData)
      this.broadcast("room-updated", roomData)
    } catch (error) {
      this.handleError("updateRoom", error)
    }
  }

  getRoom(roomId: string): RoomData | undefined {
    return this.roomData.get(roomId)
  }

  getRoomByNumber(roomNumber: string): RoomData | undefined {
    return Array.from(this.roomData.values()).find((room) => room.number === roomNumber)
  }

  createOrder(orderData: OrderData) {
    try {
      if (!orderData.id || !orderData.items || orderData.items.length === 0) {
        throw new Error("Order data must have id and items")
      }
      this.orderData.set(orderData.id, orderData)
      this.broadcast("order-created", orderData)
    } catch (error) {
      this.handleError("createOrder", error)
    }
  }

  updateOrder(orderId: string, updates: Partial<OrderData>) {
    try {
      const order = this.orderData.get(orderId)
      if (!order) {
        throw new Error(`Order ${orderId} not found`)
      }
      const updatedOrder = { ...order, ...updates }
      this.orderData.set(orderId, updatedOrder)
      this.broadcast("order-updated", updatedOrder)
    } catch (error) {
      this.handleError("updateOrder", error)
    }
  }

  // Incident management
  createIncident(incidentData: IncidentData) {
    this.incidentData.set(incidentData.id, incidentData)
    this.broadcast("incident-created", incidentData)
  }

  updateIncident(incidentId: string, updates: Partial<IncidentData>) {
    const incident = this.incidentData.get(incidentId)
    if (incident) {
      const updatedIncident = { ...incident, ...updates }
      this.incidentData.set(incidentId, updatedIncident)
      this.broadcast("incident-updated", updatedIncident)
    }
  }

  chargeRoomForOrder(orderId: string, roomNumber: string) {
    try {
      const order = this.orderData.get(orderId)
      const guest = this.getGuestByRoom(roomNumber)

      if (!order) {
        throw new Error(`Order ${orderId} not found`)
      }
      if (!guest) {
        throw new Error(`No guest found in room ${roomNumber}`)
      }

      this.broadcast("room-charge-created", {
        guestId: guest.id,
        roomNumber,
        orderId,
        amount: order.total,
        description: `F&B Order #${orderId}`,
        timestamp: new Date(),
      })
    } catch (error) {
      this.handleError("chargeRoomForOrder", error)
    }
  }

  requestHousekeeping(roomNumber: string, priority: "low" | "medium" | "high" = "medium") {
    this.broadcast("housekeeping-requested", {
      roomNumber,
      priority,
      requestedBy: "front-desk",
      timestamp: new Date(),
    })
  }

  reportSecurityIncident(location: string, description: string, severity: "low" | "medium" | "high" | "critical") {
    const incident: IncidentData = {
      id: `SEC-${Date.now()}`,
      type: "security",
      severity,
      location,
      description,
      reportedBy: "system",
      status: "open",
      createdAt: new Date(),
    }
    this.createIncident(incident)
  }
}

export function useIntegration() {
  const hub = IntegrationHub.getInstance()

  return {
    hub,
    connectionStatus: hub.getConnectionStatus(),
    subscribeToEvent: (event: string, callback: (data: any) => void) => {
      hub.subscribe(event, callback)
    },
    updateGuest: (guest: GuestData) => hub.updateGuest(guest),
    updateRoom: (room: RoomData) => hub.updateRoom(room),
    createOrder: (order: OrderData) => hub.createOrder(order),
    chargeRoom: (orderId: string, roomNumber: string) => hub.chargeRoomForOrder(orderId, roomNumber),
    requestHousekeeping: (roomNumber: string, priority?: "low" | "medium" | "high") =>
      hub.requestHousekeeping(roomNumber, priority),
    reportIncident: (location: string, description: string, severity: "low" | "medium" | "high" | "critical") =>
      hub.reportSecurityIncident(location, description, severity),
  }
}
