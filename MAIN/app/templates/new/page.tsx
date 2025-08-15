"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Save, Eye, Upload, Palette, Type, Layout, ImageIcon } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { InvoiceTemplatePreview } from "@/components/invoice-template-preview"

export default function NewTemplatePage() {
  const [templateData, setTemplateData] = useState({
    name: "",
    description: "",
    category: "",
    type: "invoice",
    isDefault: false,
    colors: {
      primary: "#1f2937",
      secondary: "#f3f4f6",
      accent: "#3b82f6",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    layout: {
      headerStyle: "modern",
      footerStyle: "minimal",
      logoPosition: "left",
    },
    content: {
      companyName: "Your Hotel Name",
      address: "123 Hotel Street, City, State 12345",
      phone: "+1 (555) 123-4567",
      email: "info@yourhotel.com",
      website: "www.yourhotel.com",
      taxId: "TAX123456789",
      footerText: "Thank you for choosing our hotel!",
      paymentTerms: "Payment due within 30 days",
    },
  })

  const colorPresets = [
    { name: "Modern Blue", primary: "#1f2937", secondary: "#f3f4f6", accent: "#3b82f6" },
    { name: "Luxury Gold", primary: "#7c2d12", secondary: "#fef7ed", accent: "#ea580c" },
    { name: "Professional Green", primary: "#374151", secondary: "#f9fafb", accent: "#059669" },
    { name: "Resort Teal", primary: "#065f46", secondary: "#ecfdf5", accent: "#10b981" },
    { name: "Boutique Purple", primary: "#581c87", secondary: "#faf5ff", accent: "#a855f7" },
    { name: "Classic Black", primary: "#000000", secondary: "#ffffff", accent: "#6b7280" },
  ]

  const applyColorPreset = (preset: any) => {
    setTemplateData({
      ...templateData,
      colors: {
        primary: preset.primary,
        secondary: preset.secondary,
        accent: preset.accent,
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/templates">Templates</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Template</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create Custom Template</h2>
              <p className="text-gray-600">Design professional invoice and document templates</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Template
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="basic" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <Card>
                    <CardHeader>
                      <CardTitle>Template Information</CardTitle>
                      <CardDescription>Basic details about your template</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="template-name">Template Name *</Label>
                        <Input
                          id="template-name"
                          value={templateData.name}
                          onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                          placeholder="e.g., Luxury Hotel Invoice"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={templateData.description}
                          onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                          placeholder="Describe the template's purpose and style"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={templateData.category}
                            onValueChange={(value) => setTemplateData({ ...templateData, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="luxury">Luxury</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="boutique">Boutique</SelectItem>
                              <SelectItem value="resort">Resort</SelectItem>
                              <SelectItem value="modern">Modern</SelectItem>
                              <SelectItem value="classic">Classic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="type">Document Type</Label>
                          <Select
                            value={templateData.type}
                            onValueChange={(value) => setTemplateData({ ...templateData, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="invoice">Invoice</SelectItem>
                              <SelectItem value="proforma">Proforma Invoice</SelectItem>
                              <SelectItem value="receipt">Receipt</SelectItem>
                              <SelectItem value="quote">Quote</SelectItem>
                              <SelectItem value="booking_confirmation">Booking Confirmation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="default-template"
                          checked={templateData.isDefault}
                          onCheckedChange={(checked) => setTemplateData({ ...templateData, isDefault: checked })}
                        />
                        <Label htmlFor="default-template">Set as default template</Label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="design">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Palette className="h-5 w-5" />
                          <span>Color Scheme</span>
                        </CardTitle>
                        <CardDescription>Choose colors that match your brand</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="mb-3 block">Color Presets</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {colorPresets.map((preset, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                className="h-auto p-3 bg-transparent"
                                onClick={() => applyColorPreset(preset)}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="flex space-x-1">
                                    <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.primary }}></div>
                                    <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }}></div>
                                  </div>
                                  <span className="text-sm">{preset.name}</span>
                                </div>
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="primary-color">Primary Color</Label>
                            <div className="flex space-x-2">
                              <Input
                                id="primary-color"
                                type="color"
                                value={templateData.colors.primary}
                                onChange={(e) =>
                                  setTemplateData({
                                    ...templateData,
                                    colors: { ...templateData.colors, primary: e.target.value },
                                  })
                                }
                                className="w-12 h-10 p-1"
                              />
                              <Input
                                value={templateData.colors.primary}
                                onChange={(e) =>
                                  setTemplateData({
                                    ...templateData,
                                    colors: { ...templateData.colors, primary: e.target.value },
                                  })
                                }
                                placeholder="#1f2937"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="secondary-color">Secondary Color</Label>
                            <div className="flex space-x-2">
                              <Input
                                id="secondary-color"
                                type="color"
                                value={templateData.colors.secondary}
                                onChange={(e) =>
                                  setTemplateData({
                                    ...templateData,
                                    colors: { ...templateData.colors, secondary: e.target.value },
                                  })
                                }
                                className="w-12 h-10 p-1"
                              />
                              <Input
                                value={templateData.colors.secondary}
                                onChange={(e) =>
                                  setTemplateData({
                                    ...templateData,
                                    colors: { ...templateData.colors, secondary: e.target.value },
                                  })
                                }
                                placeholder="#f3f4f6"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="accent-color">Accent Color</Label>
                            <div className="flex space-x-2">
                              <Input
                                id="accent-color"
                                type="color"
                                value={templateData.colors.accent}
                                onChange={(e) =>
                                  setTemplateData({
                                    ...templateData,
                                    colors: { ...templateData.colors, accent: e.target.value },
                                  })
                                }
                                className="w-12 h-10 p-1"
                              />
                              <Input
                                value={templateData.colors.accent}
                                onChange={(e) =>
                                  setTemplateData({
                                    ...templateData,
                                    colors: { ...templateData.colors, accent: e.target.value },
                                  })
                                }
                                placeholder="#3b82f6"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Type className="h-5 w-5" />
                          <span>Typography</span>
                        </CardTitle>
                        <CardDescription>Select fonts for headings and body text</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="heading-font">Heading Font</Label>
                            <Select
                              value={templateData.fonts.heading}
                              onValueChange={(value) =>
                                setTemplateData({
                                  ...templateData,
                                  fonts: { ...templateData.fonts, heading: value },
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Inter">Inter</SelectItem>
                                <SelectItem value="Roboto">Roboto</SelectItem>
                                <SelectItem value="Open Sans">Open Sans</SelectItem>
                                <SelectItem value="Lato">Lato</SelectItem>
                                <SelectItem value="Montserrat">Montserrat</SelectItem>
                                <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="body-font">Body Font</Label>
                            <Select
                              value={templateData.fonts.body}
                              onValueChange={(value) =>
                                setTemplateData({
                                  ...templateData,
                                  fonts: { ...templateData.fonts, body: value },
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Inter">Inter</SelectItem>
                                <SelectItem value="Roboto">Roboto</SelectItem>
                                <SelectItem value="Open Sans">Open Sans</SelectItem>
                                <SelectItem value="Lato">Lato</SelectItem>
                                <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="layout">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Layout className="h-5 w-5" />
                        <span>Layout Options</span>
                      </CardTitle>
                      <CardDescription>Configure the structure and positioning</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="header-style">Header Style</Label>
                          <Select
                            value={templateData.layout.headerStyle}
                            onValueChange={(value) =>
                              setTemplateData({
                                ...templateData,
                                layout: { ...templateData.layout, headerStyle: value },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="modern">Modern</SelectItem>
                              <SelectItem value="classic">Classic</SelectItem>
                              <SelectItem value="minimal">Minimal</SelectItem>
                              <SelectItem value="bold">Bold</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="footer-style">Footer Style</Label>
                          <Select
                            value={templateData.layout.footerStyle}
                            onValueChange={(value) =>
                              setTemplateData({
                                ...templateData,
                                layout: { ...templateData.layout, footerStyle: value },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="minimal">Minimal</SelectItem>
                              <SelectItem value="detailed">Detailed</SelectItem>
                              <SelectItem value="centered">Centered</SelectItem>
                              <SelectItem value="split">Split</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="logo-position">Logo Position</Label>
                        <Select
                          value={templateData.layout.logoPosition}
                          onValueChange={(value) =>
                            setTemplateData({
                              ...templateData,
                              layout: { ...templateData.layout, logoPosition: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="content">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Information</CardTitle>
                      <CardDescription>Details that will appear on your documents</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input
                          id="company-name"
                          value={templateData.content.companyName}
                          onChange={(e) =>
                            setTemplateData({
                              ...templateData,
                              content: { ...templateData.content, companyName: e.target.value },
                            })
                          }
                          placeholder="Your Hotel Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={templateData.content.address}
                          onChange={(e) =>
                            setTemplateData({
                              ...templateData,
                              content: { ...templateData.content, address: e.target.value },
                            })
                          }
                          placeholder="123 Hotel Street, City, State 12345"
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={templateData.content.phone}
                            onChange={(e) =>
                              setTemplateData({
                                ...templateData,
                                content: { ...templateData.content, phone: e.target.value },
                              })
                            }
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            value={templateData.content.email}
                            onChange={(e) =>
                              setTemplateData({
                                ...templateData,
                                content: { ...templateData.content, email: e.target.value },
                              })
                            }
                            placeholder="info@yourhotel.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={templateData.content.website}
                            onChange={(e) =>
                              setTemplateData({
                                ...templateData,
                                content: { ...templateData.content, website: e.target.value },
                              })
                            }
                            placeholder="www.yourhotel.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="tax-id">Tax ID</Label>
                          <Input
                            id="tax-id"
                            value={templateData.content.taxId}
                            onChange={(e) =>
                              setTemplateData({
                                ...templateData,
                                content: { ...templateData.content, taxId: e.target.value },
                              })
                            }
                            placeholder="TAX123456789"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="footer-text">Footer Text</Label>
                        <Textarea
                          id="footer-text"
                          value={templateData.content.footerText}
                          onChange={(e) =>
                            setTemplateData({
                              ...templateData,
                              content: { ...templateData.content, footerText: e.target.value },
                            })
                          }
                          placeholder="Thank you for choosing our hotel!"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="payment-terms">Payment Terms</Label>
                        <Input
                          id="payment-terms"
                          value={templateData.content.paymentTerms}
                          onChange={(e) =>
                            setTemplateData({
                              ...templateData,
                              content: { ...templateData.content, paymentTerms: e.target.value },
                            })
                          }
                          placeholder="Payment due within 30 days"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="advanced">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <ImageIcon className="h-5 w-5" />
                          <span>Logo & Branding</span>
                        </CardTitle>
                        <CardDescription>Upload your logo and set branding elements</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Company Logo</Label>
                          <div className="mt-2 flex items-center space-x-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                              <Button variant="outline" size="sm">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Logo
                              </Button>
                              <p className="text-sm text-muted-foreground mt-1">Recommended: PNG or SVG, max 2MB</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label>Watermark (Optional)</Label>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Watermark
                            </Button>
                            <p className="text-sm text-muted-foreground mt-1">Semi-transparent background image</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Custom CSS</CardTitle>
                        <CardDescription>Advanced styling options for developers</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <Label htmlFor="custom-css">Custom CSS Code</Label>
                          <Textarea
                            id="custom-css"
                            placeholder="/* Add your custom CSS here */"
                            rows={8}
                            className="font-mono text-sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>See how your template will look</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <InvoiceTemplatePreview
                      template={templateData.name || "custom-template"}
                      invoiceData={{
                        number: "INV-001",
                        date: new Date().toLocaleDateString(),
                        client: {
                          name: "John Doe",
                          email: "john@example.com",
                          address: "456 Client Ave, City, State 67890",
                        },
                        items: [{ description: "Deluxe Suite - 3 nights", quantity: 3, rate: 150, amount: 450 }],
                        subtotal: 450,
                        tax: 45,
                        total: 495,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Template Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Save Template
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    Full Preview
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Save as Draft
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Template Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Category:</span>
                    <Badge variant="outline">{templateData.category || "Not set"}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Type:</span>
                    <Badge variant="outline">{templateData.type}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Default:</span>
                    <Badge variant={templateData.isDefault ? "default" : "secondary"}>
                      {templateData.isDefault ? "Yes" : "No"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
