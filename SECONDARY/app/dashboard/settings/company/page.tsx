"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Building2, Save, Plus, X, Palette, Upload } from "lucide-react"
import Link from "next/link"
import Cropper from "react-easy-crop"

interface CompanyInfo {
  name: string
  address: string
  city: string
  region: string
  postalCode: string
  phone: string
  email: string
  website: string
  taxId: string
  registrationNumber: string
  logo: string
  customServiceTypes: string[]
  preferredColors: string[]
  staffNumberFormat: string
}

const defaultColors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316"]

export default function CompanySettingsPage() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    taxId: "",
    registrationNumber: "",
    logo: "",
    customServiceTypes: [],
    preferredColors: defaultColors,
    staffNumberFormat: "STF{YEAR}{###}",
  })
  const [loading, setLoading] = useState(false)
  const [newServiceType, setNewServiceType] = useState("")
  const [newColor, setNewColor] = useState("#10b981")
  const [showColorDialog, setShowColorDialog] = useState(false)
  const [showCropDialog, setShowCropDialog] = useState(false)
  const [imageSrc, setImageSrc] = useState("")
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  useEffect(() => {
    const storedInfo = localStorage.getItem("companyInfo")
    if (storedInfo) {
      const parsed = JSON.parse(storedInfo)
      setCompanyInfo({
        ...parsed,
        customServiceTypes: parsed.customServiceTypes || [],
        preferredColors: parsed.preferredColors || defaultColors,
      })
    }
  }, [])

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string)
        setShowCropDialog(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener("load", () => resolve(image))
      image.addEventListener("error", (error) => reject(error))
      image.setAttribute("crossOrigin", "anonymous")
      image.src = url
    })

  const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<string> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("No 2d context")
    }

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    )

    return canvas.toDataURL("image/jpeg")
  }

  const handleCropSave = async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
        setCompanyInfo({ ...companyInfo, logo: croppedImage })
        setShowCropDialog(false)
        setImageSrc("")
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleSave = () => {
    setLoading(true)
    try {
      localStorage.setItem("companyInfo", JSON.stringify(companyInfo))
      alert("Company information saved successfully!")
    } catch (error) {
      alert("Error saving company information")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo({ ...companyInfo, [field]: value })
  }

  const addServiceType = () => {
    if (newServiceType.trim() && !companyInfo.customServiceTypes.includes(newServiceType.trim().toUpperCase())) {
      setCompanyInfo({
        ...companyInfo,
        customServiceTypes: [...companyInfo.customServiceTypes, newServiceType.trim().toUpperCase()],
      })
      setNewServiceType("")
    }
  }

  const removeServiceType = (serviceType: string) => {
    setCompanyInfo({
      ...companyInfo,
      customServiceTypes: companyInfo.customServiceTypes.filter((type) => type !== serviceType),
    })
  }

  const addColor = () => {
    if (newColor && !companyInfo.preferredColors.includes(newColor)) {
      setCompanyInfo({
        ...companyInfo,
        preferredColors: [...companyInfo.preferredColors, newColor],
      })
      setShowColorDialog(false)
      setNewColor("#10b981")
    }
  }

  const removeColor = (color: string) => {
    if (companyInfo.preferredColors.length > 1) {
      setCompanyInfo({
        ...companyInfo,
        preferredColors: companyInfo.preferredColors.filter((c) => c !== color),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Company Settings</h1>
          <p className="text-gray-600">Manage your company information and preferences</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Company Information</span>
            </CardTitle>
            <CardDescription>Update your company details for documents and reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo Upload */}
            <div>
              <Label htmlFor="logo">Company Logo</Label>
              <div className="mt-2 space-y-4">
                <div className="flex items-center space-x-4">
                  <Input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} className="flex-1" />
                  <Button variant="outline" onClick={() => document.getElementById("logo")?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
                {companyInfo.logo && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
                    <img
                      src={companyInfo.logo || "/placeholder.svg"}
                      alt="Company Logo"
                      className="h-20 w-auto object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={companyInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={companyInfo.registrationNumber}
                  onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                  placeholder="Enter registration number"
                />
              </div>
            </div>

            {/* Address Information */}
            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={companyInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter company address"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={companyInfo.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div>
                <Label htmlFor="region">Region *</Label>
                <Input
                  id="region"
                  value={companyInfo.region}
                  onChange={(e) => handleInputChange("region", e.target.value)}
                  placeholder="Enter region"
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={companyInfo.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  placeholder="Enter postal code"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={companyInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={companyInfo.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="Enter website URL"
              />
            </div>

            {/* Tax Information */}
            <div>
              <Label htmlFor="taxId">Tax Identification Number (TIN) *</Label>
              <Input
                id="taxId"
                value={companyInfo.taxId}
                onChange={(e) => handleInputChange("taxId", e.target.value)}
                placeholder="Enter TIN"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <div className="space-y-6">
          {/* Custom Service Types */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Service Types</CardTitle>
              <CardDescription>Add custom service/product types for your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter new service type"
                  value={newServiceType}
                  onChange={(e) => setNewServiceType(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addServiceType()}
                />
                <Button onClick={addServiceType}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {companyInfo.customServiceTypes.map((serviceType) => (
                  <Badge key={serviceType} variant="secondary" className="flex items-center space-x-1">
                    <span>{serviceType}</span>
                    <button onClick={() => removeServiceType(serviceType)} className="ml-1 hover:text-red-600">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Color Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Color Preferences</span>
              </CardTitle>
              <CardDescription>Customize the color scheme for reports and charts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => setShowColorDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Color
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {companyInfo.preferredColors.map((color, index) => (
                  <div key={color} className="relative group">
                    <div
                      className="w-full h-12 rounded-lg border-2 border-gray-200 cursor-pointer relative"
                      style={{ backgroundColor: color }}
                    >
                      {companyInfo.preferredColors.length > 1 && (
                        <button
                          onClick={() => removeColor(color)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-center mt-1 text-gray-600">{color}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Save Company Information"}
        </Button>
      </div>

      {/* Color Picker Dialog */}
      <Dialog open={showColorDialog} onOpenChange={setShowColorDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Color</DialogTitle>
            <DialogDescription>Choose a color to add to your preferred color palette</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="colorPicker">Color</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="colorPicker"
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-lg border-2 border-gray-200" style={{ backgroundColor: newColor }} />
              <span className="text-sm text-gray-600">Preview</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowColorDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addColor}>Add Color</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Crop Dialog */}
      <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Crop Logo</DialogTitle>
            <DialogDescription>Adjust the crop area for your company logo</DialogDescription>
          </DialogHeader>
          <div className="relative h-64 w-full">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="zoom">Zoom</Label>
            <input
              id="zoom"
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCropDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCropSave}>Save Logo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
