"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Edit,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Star,
  AlertCircle,
  Calculator,
  ChefHat,
  Clock,
  Users,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

// Sample menu data
const menuItems = [
  {
    id: 1,
    name: "Jollof Rice with Chicken",
    category: "Main Courses",
    price: 45,
    cost: 18.5,
    margin: 58.9,
    popularity: 92,
    status: "active",
    description: "Traditional jollof rice with grilled chicken breast",
    allergens: ["None"],
    prepTime: 25,
    difficulty: "Medium",
    recipe: {
      ingredients: [
        { name: "Jasmine Rice", quantity: 200, unit: "g", cost: 2.5 },
        { name: "Chicken Breast", quantity: 150, unit: "g", cost: 12.0 },
        { name: "Tomato Paste", quantity: 50, unit: "g", cost: 1.2 },
        { name: "Onions", quantity: 80, unit: "g", cost: 0.8 },
        { name: "Spices Mix", quantity: 10, unit: "g", cost: 2.0 },
      ],
      instructions: [
        "Marinate chicken with spices for 30 minutes",
        "Prepare jollof rice base with tomato paste and onions",
        "Cook rice with chicken stock for 20 minutes",
        "Grill chicken breast until golden brown",
        "Serve hot with garnish",
      ],
    },
  },
  {
    id: 2,
    name: "Banku with Tilapia",
    category: "Main Courses",
    price: 55,
    cost: 22.0,
    margin: 60.0,
    popularity: 78,
    status: "active",
    description: "Fresh tilapia with traditional banku and pepper sauce",
    allergens: ["Fish"],
    prepTime: 35,
    difficulty: "Hard",
    recipe: {
      ingredients: [
        { name: "Fresh Tilapia", quantity: 300, unit: "g", cost: 15.0 },
        { name: "Corn Flour", quantity: 100, unit: "g", cost: 1.5 },
        { name: "Cassava Flour", quantity: 50, unit: "g", cost: 1.0 },
        { name: "Pepper Sauce", quantity: 80, unit: "ml", cost: 2.5 },
        { name: "Vegetables", quantity: 100, unit: "g", cost: 2.0 },
      ],
      instructions: [
        "Clean and season tilapia with local spices",
        "Prepare banku by mixing corn and cassava flour",
        "Cook banku for 45 minutes, stirring continuously",
        "Grill tilapia until crispy outside, tender inside",
        "Serve with hot pepper sauce and vegetables",
      ],
    },
  },
  {
    id: 3,
    name: "Kelewele",
    category: "Appetizers",
    price: 20,
    cost: 6.5,
    margin: 67.5,
    popularity: 95,
    status: "active",
    description: "Spiced fried plantain cubes - a local favorite",
    allergens: ["None"],
    prepTime: 15,
    difficulty: "Easy",
    recipe: {
      ingredients: [
        { name: "Ripe Plantain", quantity: 2, unit: "pieces", cost: 4.0 },
        { name: "Ginger", quantity: 10, unit: "g", cost: 0.5 },
        { name: "Pepper", quantity: 5, unit: "g", cost: 0.5 },
        { name: "Vegetable Oil", quantity: 100, unit: "ml", cost: 1.5 },
      ],
      instructions: [
        "Peel and cube ripe plantains",
        "Mix with ginger, pepper, and spices",
        "Heat oil to 180°C",
        "Fry plantain cubes until golden brown",
        "Serve hot as appetizer or side dish",
      ],
    },
  },
  {
    id: 4,
    name: "Grilled Salmon",
    category: "Main Courses",
    price: 85,
    cost: 45.0,
    margin: 47.1,
    popularity: 65,
    status: "active",
    description: "Atlantic salmon with vegetables and jasmine rice",
    allergens: ["Fish"],
    prepTime: 20,
    difficulty: "Medium",
    recipe: {
      ingredients: [
        { name: "Atlantic Salmon", quantity: 200, unit: "g", cost: 35.0 },
        { name: "Jasmine Rice", quantity: 150, unit: "g", cost: 2.0 },
        { name: "Mixed Vegetables", quantity: 120, unit: "g", cost: 3.5 },
        { name: "Lemon", quantity: 1, unit: "piece", cost: 1.5 },
        { name: "Herbs & Seasoning", quantity: 10, unit: "g", cost: 3.0 },
      ],
      instructions: [
        "Season salmon with herbs and lemon",
        "Prepare jasmine rice with light seasoning",
        "Steam mixed vegetables until tender-crisp",
        "Grill salmon for 6-8 minutes per side",
        "Plate with rice and vegetables, garnish with lemon",
      ],
    },
  },
]

const menuCategories = ["All", "Appetizers", "Main Courses", "Desserts", "Beverages"]

const menuEngineering = [
  { category: "Stars", description: "High popularity, High margin", color: "bg-green-100 text-green-800", count: 8 },
  {
    category: "Plowhorses",
    description: "High popularity, Low margin",
    color: "bg-yellow-100 text-yellow-800",
    count: 5,
  },
  { category: "Puzzles", description: "Low popularity, High margin", color: "bg-blue-100 text-blue-800", count: 3 },
  { category: "Dogs", description: "Low popularity, Low margin", color: "bg-red-100 text-red-800", count: 2 },
]

export default function MenuRecipeManagement() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState(null)
  const [showRecipeDialog, setShowRecipeDialog] = useState(false)
  const [showNewItemDialog, setShowNewItemDialog] = useState(false)

  const filteredItems =
    selectedCategory === "All" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const getMarginColor = (margin) => {
    if (margin >= 60) return "text-green-600"
    if (margin >= 45) return "text-yellow-600"
    return "text-red-600"
  }

  const getPopularityColor = (popularity) => {
    if (popularity >= 80) return "bg-green-500"
    if (popularity >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <header className="flex h-16 shrink-0 items-center gap-2 bg-white border-b border-orange-200">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/fnb">F&B Management</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/fnb/menu">Menu & Recipe Management</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center space-x-4 px-4">
          <Dialog open={showNewItemDialog} onOpenChange={setShowNewItemDialog}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
                <DialogDescription>Create a new menu item with recipe and costing information</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Item Name</Label>
                    <Input id="name" placeholder="Enter item name" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appetizers">Appetizers</SelectItem>
                        <SelectItem value="mains">Main Courses</SelectItem>
                        <SelectItem value="desserts">Desserts</SelectItem>
                        <SelectItem value="beverages">Beverages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Selling Price (GH₵)</Label>
                    <Input id="price" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="prep-time">Prep Time (minutes)</Label>
                    <Input id="prep-time" type="number" placeholder="15" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe the dish" />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="allergens">Allergens</Label>
                    <Input id="allergens" placeholder="None, Fish, Nuts, etc." />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setShowNewItemDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700">Create Item</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6">
        {/* Menu Engineering Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {menuEngineering.map((category, index) => (
            <Card key={index} className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className={category.color}>{category.category}</Badge>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{category.count}</p>
                    <p className="text-xs text-gray-500">items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="recipes">Recipe Management</TabsTrigger>
            <TabsTrigger value="costing">Cost Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            {/* Category Filter */}
            <div className="flex space-x-2">
              {menuCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "border-orange-200 hover:bg-orange-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="border-orange-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription>{item.category}</CardDescription>
                      </div>
                      <Badge
                        variant={item.status === "active" ? "default" : "secondary"}
                        className="bg-green-100 text-green-800"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Price:</span>
                        <span className="font-bold text-green-600">GH₵{item.price}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Food Cost:</span>
                        <span className="text-sm">GH₵{item.cost}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Margin:</span>
                        <span className={`font-semibold ${getMarginColor(item.margin)}`}>
                          {item.margin.toFixed(1)}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Popularity:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getPopularityColor(item.popularity)}`}
                              style={{ width: `${item.popularity}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{item.popularity}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Prep Time:</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{item.prepTime} min</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Difficulty:</span>
                        <Badge className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-orange-200 hover:bg-orange-50 bg-transparent"
                        onClick={() => {
                          setSelectedItem(item)
                          setShowRecipeDialog(true)
                        }}
                      >
                        <ChefHat className="w-4 h-4 mr-1" />
                        Recipe
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-orange-200 hover:bg-orange-50 bg-transparent"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ChefHat className="mr-2 h-5 w-5" />
                  Recipe Database
                </CardTitle>
                <CardDescription>Manage standardized recipes and cooking instructions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {menuItems.slice(0, 2).map((item) => (
                    <div key={item.id} className="p-4 border border-orange-200 rounded-lg">
                      <h4 className="font-semibold text-lg mb-3">{item.name}</h4>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium mb-2">Ingredients:</h5>
                          <div className="space-y-1">
                            {item.recipe.ingredients.map((ingredient, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                                </span>
                                <span className="text-gray-600">GH₵{ingredient.cost.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Instructions:</h5>
                          <ol className="list-decimal list-inside space-y-1 text-sm">
                            {item.recipe.instructions.map((instruction, index) => (
                              <li key={index} className="text-gray-700">
                                {instruction}
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-orange-200">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{item.prepTime} min</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span>1 serving</span>
                            </div>
                          </div>
                          <Badge className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Cost Analysis
                  </CardTitle>
                  <CardDescription>Food cost breakdown and margin analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {menuItems.slice(0, 4).map((item) => (
                      <div key={item.id} className="p-3 border border-orange-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge
                            className={
                              item.margin >= 60
                                ? "bg-green-100 text-green-800"
                                : item.margin >= 45
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {item.margin.toFixed(1)}% margin
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Selling Price</p>
                            <p className="font-semibold">GH₵{item.price}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Food Cost</p>
                            <p className="font-semibold">GH₵{item.cost}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Profit</p>
                            <p className="font-semibold text-green-600">GH₵{(item.price - item.cost).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>Menu performance and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-5 h-5 text-green-600" />
                        <h4 className="font-medium text-green-800">Top Performer</h4>
                      </div>
                      <p className="text-sm text-green-700">
                        Kelewele has 95% popularity and 67.5% margin - promote as signature dish
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <h4 className="font-medium text-yellow-800">Needs Attention</h4>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Grilled Salmon has low popularity (65%) - consider price adjustment or promotion
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium text-blue-800">Cost Optimization</h4>
                      </div>
                      <p className="text-sm text-blue-700">
                        Average food cost: 23.5% - Target: 25-30% for optimal profitability
                      </p>
                    </div>

                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingDown className="w-5 h-5 text-red-600" />
                        <h4 className="font-medium text-red-800">Review Required</h4>
                      </div>
                      <p className="text-sm text-red-700">
                        2 items classified as "Dogs" - consider removal or recipe modification
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Recipe Detail Dialog */}
        <Dialog open={showRecipeDialog} onOpenChange={setShowRecipeDialog}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedItem?.name} - Recipe Details</DialogTitle>
              <DialogDescription>Complete recipe with ingredients, instructions, and costing</DialogDescription>
            </DialogHeader>
            {selectedItem && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Ingredients & Costing</h4>
                  <div className="space-y-2">
                    {selectedItem.recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">
                          {ingredient.quantity} {ingredient.unit} {ingredient.name}
                        </span>
                        <span className="text-sm font-medium">GH₵{ingredient.cost.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center p-2 bg-orange-100 rounded font-semibold">
                      <span>Total Cost:</span>
                      <span>GH₵{selectedItem.cost}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Cooking Instructions</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedItem.recipe.instructions.map((instruction, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Prep Time:</span>
                        <span className="ml-2 font-medium">{selectedItem.prepTime} minutes</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Difficulty:</span>
                        <Badge className={`ml-2 ${getDifficultyColor(selectedItem.difficulty)}`}>
                          {selectedItem.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
