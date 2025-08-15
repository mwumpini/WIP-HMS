"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Plus, Edit, Trash2, Shield } from "lucide-react"
import Link from "next/link"

interface Authoriser {
  id: string
  name: string
  position: string
  email: string
  signature?: string
  isActive: boolean
  createdAt: string
}

export default function AuthorisersPage() {
  const [authorisers, setAuthorisers] = useState<Authoriser[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAuthoriser, setEditingAuthoriser] = useState<Authoriser | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    signature: "",
  })

  const positions = [
    "HR Manager",
    "Accountant",
    "Payroll Officer",
    "Director",
    "General Manager",
    "Finance Manager",
    "Operations Manager",
    "CEO",
    "CFO",
    "COO",
  ]

  useEffect(() => {
    // Load authorisers from localStorage
    const storedAuthorisers = localStorage.getItem("companyAuthorizers")
    if (storedAuthorisers) {
      setAuthorisers(JSON.parse(storedAuthorisers))
    }
  }, [])

  const handleSaveAuthoriser = () => {
    if (!formData.name || !formData.position || !formData.email) {
      alert("Please fill in all required fields")
      return
    }

    const newAuthoriser: Authoriser = {
      id: editingAuthoriser?.id || Date.now().toString(),
      name: formData.name,
      position: formData.position,
      email: formData.email,
      signature: formData.signature,
      isActive: editingAuthoriser?.isActive ?? false,
      createdAt: editingAuthoriser?.createdAt || new Date().toISOString(),
    }

    let updatedAuthorisers
    if (editingAuthoriser) {
      updatedAuthorisers = authorisers.map((auth) => (auth.id === editingAuthoriser.id ? newAuthoriser : auth))
    } else {
      updatedAuthorisers = [...authorisers, newAuthoriser]
    }

    setAuthorisers(updatedAuthorisers)
    localStorage.setItem("companyAuthorizers", JSON.stringify(updatedAuthorisers))

    // Reset form
    setFormData({ name: "", position: "", email: "", signature: "" })
    setShowAddForm(false)
    setEditingAuthoriser(null)
  }

  const handleEditAuthoriser = (authoriser: Authoriser) => {
    setEditingAuthoriser(authoriser)
    setFormData({
      name: authoriser.name,
      position: authoriser.position,
      email: authoriser.email,
      signature: authoriser.signature || "",
    })
    setShowAddForm(true)
  }

  const handleDeleteAuthoriser = (id: string) => {
    if (confirm("Are you sure you want to delete this authoriser?")) {
      const updatedAuthorisers = authorisers.filter((auth) => auth.id !== id)
      setAuthorisers(updatedAuthorisers)
      localStorage.setItem("companyAuthorizers", JSON.stringify(updatedAuthorisers))
    }
  }

  const handleToggleActive = (id: string) => {
    const updatedAuthorisers = authorisers.map((auth) => ({
      ...auth,
      isActive: auth.id === id ? !auth.isActive : false, // Only one can be active
    }))
    setAuthorisers(updatedAuthorisers)
    localStorage.setItem("companyAuthorizers", JSON.stringify(updatedAuthorisers))
  }

  const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData({ ...formData, signature: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const filteredAuthorisers = authorisers.filter((authoriser) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      (authoriser.name || "").toLowerCase().includes(searchLower) ||
      (authoriser.position || "").toLowerCase().includes(searchLower) ||
      (authoriser.email || "").toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/users">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Authorisers Management</h1>
          <p className="text-gray-600">Manage document authorisers and signatures</p>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingAuthoriser ? "Edit Authoriser" : "Add New Authoriser"}</CardTitle>
            <CardDescription>
              {editingAuthoriser ? "Update authoriser information" : "Add a new authoriser to the system"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="position">Position *</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => setFormData({ ...formData, position: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="signature">Signature Upload</Label>
                <div className="space-y-2">
                  <Input id="signature" type="file" accept="image/*" onChange={handleSignatureUpload} />
                  {formData.signature && (
                    <div className="border rounded p-2">
                      <img
                        src={formData.signature || "/placeholder.svg"}
                        alt="Signature Preview"
                        className="h-16 w-32 object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingAuthoriser(null)
                  setFormData({ name: "", position: "", email: "", signature: "" })
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveAuthoriser} className="bg-emerald-600 hover:bg-emerald-700">
                {editingAuthoriser ? "Update" : "Add"} Authoriser
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Document Authorisers</CardTitle>
              <CardDescription>{filteredAuthorisers.length} authorisers found</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search authorisers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={() => setShowAddForm(true)} className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Authoriser
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAuthorisers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p>No authorisers found.</p>
              <p className="text-sm mt-2">
                {searchQuery ? "Try adjusting your search criteria." : "Add your first authoriser to get started."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Position</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Signature</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Created</th>
                    <th className="text-center p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAuthorisers.map((authoriser) => (
                    <tr key={authoriser.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{authoriser.name}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">
                          {authoriser.position}
                        </Badge>
                      </td>
                      <td className="p-3 text-gray-600">{authoriser.email}</td>
                      <td className="p-3">
                        {authoriser.signature ? (
                          <img
                            src={authoriser.signature || "/placeholder.svg"}
                            alt="Signature"
                            className="h-8 w-16 object-contain"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">No signature</span>
                        )}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={authoriser.isActive ? "default" : "secondary"}
                          className={`text-xs cursor-pointer ${
                            authoriser.isActive
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                          onClick={() => handleToggleActive(authoriser.id)}
                        >
                          {authoriser.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="p-3 text-gray-600 text-xs">
                        {new Date(authoriser.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditAuthoriser(authoriser)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAuthoriser(authoriser.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
