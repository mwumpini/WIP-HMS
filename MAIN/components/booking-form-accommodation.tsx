"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, Users, Bed, AlertCircle, Plus, Minus } from "lucide-react"
import { format, differenceInDays } from "date-fns"

interface AccommodationBookingFormProps {
  onSubmit?: (data: any) => void
  clientData?: any
}

export function AccommodationBookingForm({ onSubmit, clientData }: AccommodationBookingFormProps) {
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [rooms, setRooms] = useState([{ type: "", adults: 2, children: 0, rate: 0, specialRequests: "" }])
  const [bookingData, setBookingData] = useState({
    guestName: clientData?.name || "",
    email: clientData?.email || "",
    phone: clientData?.phone || "",
    company: clientData?.company || "",
    nationality: clientData?.nationality || "",
    idType: clientData?.idType || "",
    idNumber: clientData?.idNumber || "",
    arrivalTime: "",
    departureTime: "",
    purpose: "",
    groupSize: 1,
    specialRequests: clientData?.preferences?.specialRequests || "",
    accessibilityNeeds: clientData?.preferences?.accessibilityNeeds || "",
    dietaryRestrictions: clientData?.preferences?.dietaryRestrictions || "",
    earlyCheckIn: false,
    lateCheckOut: false,
    airportTransfer: false,
    parkingRequired: false,
  })

  const addRoom = () => {
    setRooms([...rooms, { type: "", adults: 2, children: 0, rate: 0, specialRequests: "" }])
  }

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter((_, i) => i !== index))
    }
  }

  const updateRoom = (index: number, field: string, value: any) => {
    const updated = [...rooms]
    updated[index] = { ...updated[index], [field]: value }
    setRooms(updated)
  }

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      return differenceInDays(checkOutDate, checkInDate)
    }
    return 0
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    const roomTotal = rooms.reduce((sum, room) => sum + room.rate * nights, 0)
    const extras = 0 // Add extra services cost
    return roomTotal + extras
  }

  const handleSubmit = () => {
    const formData = {
      ...bookingData,
      checkInDate,
      checkOutDate,
      rooms,
      nights: calculateNights(),
      total: calculateTotal(),
      submittedAt: new Date(),
    }

    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <div className="space-y-6">
      {/* Guest Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Guest Information</span>
          </CardTitle>
          <CardDescription>Primary guest details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guest-name">Guest Name *</Label>
              <Input
                id="guest-name"
                value={bookingData.guestName}
                onChange={(e) => setBookingData({ ...bookingData, guestName: e.target.value })}
                placeholder="Full name as per ID"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={bookingData.email}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                placeholder="guest@example.com"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                value={bookingData.company}
                onChange={(e) => setBookingData({ ...bookingData, company: e.target.value })}
                placeholder="Company name"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Select
                value={bookingData.nationality}
                onValueChange={(value) => setBookingData({ ...bookingData, nationality: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="id-type">ID Type</Label>
              <Select
                value={bookingData.idType}
                onValueChange={(value) => setBookingData({ ...bookingData, idType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="drivers_license">Driver's License</SelectItem>
                  <SelectItem value="national_id">National ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="id-number">ID Number</Label>
              <Input
                id="id-number"
                value={bookingData.idNumber}
                onChange={(e) => setBookingData({ ...bookingData, idNumber: e.target.value })}
                placeholder="ID number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stay Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Stay Details</span>
          </CardTitle>
          <CardDescription>Check-in and check-out dates with timing preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Check-in Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "PPP") : "Select check-in date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Check-out Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, "PPP") : "Select check-out date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    disabled={(date) => date <= (checkInDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {checkInDate && checkOutDate && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                Duration: {calculateNights()} night{calculateNights() !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="arrival-time">Expected Arrival Time</Label>
              <Select
                value={bookingData.arrivalTime}
                onValueChange={(value) => setBookingData({ ...bookingData, arrivalTime: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select arrival time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                  <SelectItem value="evening">Evening (6 PM - 10 PM)</SelectItem>
                  <SelectItem value="late">Late Night (After 10 PM)</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="departure-time">Expected Departure Time</Label>
              <Select
                value={bookingData.departureTime}
                onValueChange={(value) => setBookingData({ ...bookingData, departureTime: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select departure time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="early">Early Morning (Before 8 AM)</SelectItem>
                  <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                  <SelectItem value="evening">Evening (After 6 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="purpose">Purpose of Visit</Label>
            <Select
              value={bookingData.purpose}
              onValueChange={(value) => setBookingData({ ...bookingData, purpose: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="leisure">Leisure/Vacation</SelectItem>
                <SelectItem value="conference">Conference/Event</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="family">Family Visit</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Room Requirements */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Bed className="h-5 w-5" />
                <span>Room Requirements</span>
              </CardTitle>
              <CardDescription>Specify room types and occupancy details</CardDescription>
            </div>
            <Button onClick={addRoom} size="sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rooms.map((room, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Room {index + 1}</h4>
                  {rooms.length > 1 && (
                    <Button variant="outline" size="sm" onClick={() => removeRoom(index)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Room Type</Label>
                    <Select value={room.type} onValueChange={(value) => updateRoom(index, "type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Room - $120/night</SelectItem>
                        <SelectItem value="deluxe">Deluxe Suite - $250/night</SelectItem>
                        <SelectItem value="presidential">Presidential Suite - $500/night</SelectItem>
                        <SelectItem value="family">Family Room - $180/night</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Adults</Label>
                    <Select
                      value={room.adults.toString()}
                      onValueChange={(value) => updateRoom(index, "adults", Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Adult</SelectItem>
                        <SelectItem value="2">2 Adults</SelectItem>
                        <SelectItem value="3">3 Adults</SelectItem>
                        <SelectItem value="4">4 Adults</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Children</Label>
                    <Select
                      value={room.children.toString()}
                      onValueChange={(value) => updateRoom(index, "children", Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 Children</SelectItem>
                        <SelectItem value="1">1 Child</SelectItem>
                        <SelectItem value="2">2 Children</SelectItem>
                        <SelectItem value="3">3 Children</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Special Requests for this Room</Label>
                  <Textarea
                    value={room.specialRequests}
                    onChange={(e) => updateRoom(index, "specialRequests", e.target.value)}
                    placeholder="Connecting rooms, high floor, quiet area, etc."
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>Special Requirements & Services</span>
          </CardTitle>
          <CardDescription>Additional services and accessibility needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>General Special Requests</Label>
            <Textarea
              value={bookingData.specialRequests}
              onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
              placeholder="Any special requests or instructions for the front office staff..."
              rows={3}
            />
          </div>

          <div>
            <Label>Accessibility Requirements</Label>
            <Textarea
              value={bookingData.accessibilityNeeds}
              onChange={(e) => setBookingData({ ...bookingData, accessibilityNeeds: e.target.value })}
              placeholder="Wheelchair accessible room, hearing assistance, visual assistance, etc."
              rows={2}
            />
          </div>

          <div>
            <Label>Dietary Restrictions</Label>
            <Textarea
              value={bookingData.dietaryRestrictions}
              onChange={(e) => setBookingData({ ...bookingData, dietaryRestrictions: e.target.value })}
              placeholder="Vegetarian, vegan, gluten-free, allergies, etc."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label>Additional Services</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="early-checkin"
                    checked={bookingData.earlyCheckIn}
                    onCheckedChange={(checked) => setBookingData({ ...bookingData, earlyCheckIn: checked })}
                  />
                  <Label htmlFor="early-checkin">Early Check-in (before 3 PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="late-checkout"
                    checked={bookingData.lateCheckOut}
                    onCheckedChange={(checked) => setBookingData({ ...bookingData, lateCheckOut: checked })}
                  />
                  <Label htmlFor="late-checkout">Late Check-out (after 11 AM)</Label>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Transportation & Parking</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="airport-transfer"
                    checked={bookingData.airportTransfer}
                    onCheckedChange={(checked) => setBookingData({ ...bookingData, airportTransfer: checked })}
                  />
                  <Label htmlFor="airport-transfer">Airport Transfer Service</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="parking"
                    checked={bookingData.parkingRequired}
                    onCheckedChange={(checked) => setBookingData({ ...bookingData, parkingRequired: checked })}
                  />
                  <Label htmlFor="parking">Parking Required</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Guest:</span>
              <span className="font-medium">{bookingData.guestName || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span>Stay Duration:</span>
              <span className="font-medium">
                {calculateNights()} night{calculateNights() !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Rooms:</span>
              <span className="font-medium">{rooms.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Guests:</span>
              <span className="font-medium">{rooms.reduce((sum, room) => sum + room.adults + room.children, 0)}</span>
            </div>
            {calculateTotal() > 0 && (
              <>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Estimated Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 flex space-x-3">
            <Button onClick={handleSubmit} className="flex-1">
              Create Accommodation Booking
            </Button>
            <Button variant="outline" className="bg-transparent">
              Save as Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
