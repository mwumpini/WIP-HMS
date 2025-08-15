import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Copy, Trash2 } from "lucide-react"
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

const templates = [
  {
    id: 1,
    name: "Modern Luxury",
    description: "Clean, modern design perfect for luxury hotels",
    preview: "/placeholder.svg?height=200&width=300&text=Modern+Luxury+Template",
    category: "Luxury",
    isDefault: true,
  },
  {
    id: 2,
    name: "Classic Business",
    description: "Traditional business invoice template",
    preview: "/placeholder.svg?height=200&width=300&text=Classic+Business+Template",
    category: "Business",
    isDefault: false,
  },
  {
    id: 3,
    name: "Boutique Style",
    description: "Elegant design for boutique hotels",
    preview: "/placeholder.svg?height=200&width=300&text=Boutique+Style+Template",
    category: "Boutique",
    isDefault: false,
  },
  {
    id: 4,
    name: "Resort Paradise",
    description: "Tropical theme for resort properties",
    preview: "/placeholder.svg?height=200&width=300&text=Resort+Paradise+Template",
    category: "Resort",
    isDefault: false,
  },
  {
    id: 5,
    name: "Minimalist",
    description: "Simple, clean design with focus on content",
    preview: "/placeholder.svg?height=200&width=300&text=Minimalist+Template",
    category: "Modern",
    isDefault: false,
  },
  {
    id: 6,
    name: "Corporate Blue",
    description: "Professional blue theme for corporate hotels",
    preview: "/placeholder.svg?height=200&width=300&text=Corporate+Blue+Template",
    category: "Corporate",
    isDefault: false,
  },
]

export default function TemplatesPage() {
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
                <BreadcrumbPage>Templates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Invoice Templates</h2>
              <p className="text-gray-600">Choose from various invoice templates for your hotel</p>
            </div>
            <Button>Create Custom Template</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  {template.isDefault && <Badge className="absolute top-2 right-2">Default</Badge>}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    {!template.isDefault && (
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
