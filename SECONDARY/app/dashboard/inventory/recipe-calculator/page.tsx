"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Calculator, ChefHat, DollarSign, Percent, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { InventoryItem } from "@/types/inventory"

interface Recipe {
  id: string
  name: string
  category: string
  description?: string
  servings: number
  prepTime: number // minutes
  cookTime: number // minutes
  difficulty: "Easy" | "Medium" | "Hard"
  ingredients: RecipeIngredient[]
  instructions: string[]
  totalCost: number
  costPerServing: number
  suggestedPrice: number
  profitMargin: number
  createdDate: string
  lastUpdated: string
}

interface RecipeIngredient {
  itemId: string
  itemName: string
  quantity: number
  unit: string
  costPerUnit: number
  totalCost: number
  notes?: string
}

const RECIPE_CATEGORIES = [
  "Appetizers",
  "Main Course",
  "Desserts",
  "Beverages",
  "Salads",
  "Soups",
  "Sides",
  "Breakfast",
  "Snacks",
  "Cocktails",
  "Other",
]

export default function RecipeCalculator() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [showNewRecipe, setShowNewRecipe] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({
    servings: 1,
    prepTime: 30,
    cookTime: 30,
    difficulty: "Medium",
    ingredients: [],
    instructions: [""],
    profitMargin: 65, // 65% profit margin
  })
  const [selectedIngredient, setSelectedIngredient] = useState("")
  const [ingredientQuantity, setIngredientQuantity] = useState("")
  const [ingredientNotes, setIngredientNotes] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]")
    const savedItems = JSON.parse(localStorage.getItem("inventoryItems") || "[]")
    setRecipes(savedRecipes)
    setInventoryItems(savedItems)
  }

  const addIngredientToRecipe = () => {
    if (!selectedIngredient || !ingredientQuantity) return

    const item = inventoryItems.find((i) => i.id === selectedIngredient)
    if (!item) return

    const quantity = Number.parseFloat(ingredientQuantity)
    const totalCost = quantity * item.costPrice

    const ingredient: RecipeIngredient = {
      itemId: item.id,
      itemName: item.name,
      quantity,
      unit: item.unit,
      costPerUnit: item.costPrice,
      totalCost,
      notes: ingredientNotes,
    }

    setNewRecipe((prev) => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), ingredient],
    }))

    setSelectedIngredient("")
    setIngredientQuantity("")
    setIngredientNotes("")
  }

  const removeIngredientFromRecipe = (index: number) => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients?.filter((_, i) => i !== index) || [],
    }))
  }

  const calculateRecipeCosts = () => {
    const totalCost = newRecipe.ingredients?.reduce((sum, ing) => sum + ing.totalCost, 0) || 0
    const costPerServing = totalCost / (newRecipe.servings || 1)
    const profitMargin = newRecipe.profitMargin || 65
    const suggestedPrice = costPerServing / (1 - profitMargin / 100)

    return { totalCost, costPerServing, suggestedPrice }
  }

  const addInstruction = () => {
    setNewRecipe((prev) => ({
      ...prev,
      instructions: [...(prev.instructions || []), ""],
    }))
  }

  const updateInstruction = (index: number, value: string) => {
    setNewRecipe((prev) => ({
      ...prev,
      instructions: prev.instructions?.map((inst, i) => (i === index ? value : inst)) || [],
    }))
  }

  const removeInstruction = (index: number) => {
    setNewRecipe((prev) => ({
      ...prev,
      instructions: prev.instructions?.filter((_, i) => i !== index) || [],
    }))
  }

  const saveRecipe = () => {
    if (!newRecipe.name || !newRecipe.category || !newRecipe.ingredients?.length) {
      toast({
        title: "Incomplete Recipe",
        description: "Please fill all required fields and add ingredients",
        variant: "destructive",
      })
      return
    }

    const { totalCost, costPerServing, suggestedPrice } = calculateRecipeCosts()

    const recipe: Recipe = {
      id: editingRecipe?.id || Date.now().toString(),
      name: newRecipe.name,
      category: newRecipe.category,
      description: newRecipe.description,
      servings: newRecipe.servings || 1,
      prepTime: newRecipe.prepTime || 30,
      cookTime: newRecipe.cookTime || 30,
      difficulty: newRecipe.difficulty || "Medium",
      ingredients: newRecipe.ingredients,
      instructions: newRecipe.instructions?.filter((inst) => inst.trim()) || [],
      totalCost,
      costPerServing,
      suggestedPrice,
      profitMargin: newRecipe.profitMargin || 65,
      createdDate: editingRecipe?.createdDate || new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    }

    let updatedRecipes
    if (editingRecipe) {
      updatedRecipes = recipes.map((r) => (r.id === editingRecipe.id ? recipe : r))
      toast({
        title: "Recipe Updated",
        description: `${recipe.name} has been updated`,
      })
    } else {
      updatedRecipes = [...recipes, recipe]
      toast({
        title: "Recipe Created",
        description: `${recipe.name} has been created`,
      })
    }

    setRecipes(updatedRecipes)
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes))

    setShowNewRecipe(false)
    setEditingRecipe(null)
    resetForm()
  }

  const resetForm = () => {
    setNewRecipe({
      servings: 1,
      prepTime: 30,
      cookTime: 30,
      difficulty: "Medium",
      ingredients: [],
      instructions: [""],
      profitMargin: 65,
    })
  }

  const editRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe)
    setNewRecipe(recipe)
    setShowNewRecipe(true)
  }

  const deleteRecipe = (recipeId: string) => {
    const updatedRecipes = recipes.filter((r) => r.id !== recipeId)
    setRecipes(updatedRecipes)
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes))

    toast({
      title: "Recipe Deleted",
      description: "Recipe has been removed",
    })
  }

  const { totalCost, costPerServing, suggestedPrice } = calculateRecipeCosts()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recipe Calculator</h1>
          <p className="text-muted-foreground">Calculate recipe costs and pricing for F&B operations</p>
        </div>
        <Button onClick={() => setShowNewRecipe(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Recipe
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipes.length}</div>
            <p className="text-xs text-muted-foreground">Active recipes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Cost Per Serving</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₵
              {recipes.length > 0
                ? (recipes.reduce((sum, r) => sum + r.costPerServing, 0) / recipes.length).toFixed(2)
                : "0.00"}
            </div>
            <p className="text-xs text-muted-foreground">Average across all recipes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Profit Margin</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recipes.length > 0
                ? (recipes.reduce((sum, r) => sum + r.profitMargin, 0) / recipes.length).toFixed(1)
                : "0"}
              %
            </div>
            <p className="text-xs text-muted-foreground">Average profit margin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{RECIPE_CATEGORIES.length}</div>
            <p className="text-xs text-muted-foreground">Recipe categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Recipes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recipe Library</CardTitle>
          <CardDescription>All recipes with cost calculations and pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipe</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Servings</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Cost/Serving</TableHead>
                <TableHead>Suggested Price</TableHead>
                <TableHead>Profit Margin</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{recipe.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {recipe.prepTime + recipe.cookTime} min • {recipe.difficulty}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{recipe.category}</TableCell>
                  <TableCell>{recipe.servings}</TableCell>
                  <TableCell>₵{recipe.totalCost.toFixed(2)}</TableCell>
                  <TableCell>₵{recipe.costPerServing.toFixed(2)}</TableCell>
                  <TableCell>₵{recipe.suggestedPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{recipe.profitMargin.toFixed(1)}%</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => editRecipe(recipe)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteRecipe(recipe.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New/Edit Recipe Dialog */}
      <Dialog open={showNewRecipe} onOpenChange={setShowNewRecipe}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRecipe ? "Edit Recipe" : "Create New Recipe"}</DialogTitle>
            <DialogDescription>
              {editingRecipe ? "Update recipe information and costs" : "Create a new recipe with cost calculations"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Recipe Name *</Label>
                <Input
                  value={newRecipe.name || ""}
                  onChange={(e) => setNewRecipe((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Recipe name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newRecipe.category}
                  onValueChange={(value) => setNewRecipe((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {RECIPE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={newRecipe.description || ""}
                onChange={(e) => setNewRecipe((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the recipe..."
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="servings">Servings *</Label>
                <Input
                  type="number"
                  value={newRecipe.servings || ""}
                  onChange={(e) =>
                    setNewRecipe((prev) => ({ ...prev, servings: Number.parseInt(e.target.value) || 1 }))
                  }
                  placeholder="1"
                />
              </div>
              <div>
                <Label htmlFor="prepTime">Prep Time (min)</Label>
                <Input
                  type="number"
                  value={newRecipe.prepTime || ""}
                  onChange={(e) =>
                    setNewRecipe((prev) => ({ ...prev, prepTime: Number.parseInt(e.target.value) || 0 }))
                  }
                  placeholder="30"
                />
              </div>
              <div>
                <Label htmlFor="cookTime">Cook Time (min)</Label>
                <Input
                  type="number"
                  value={newRecipe.cookTime || ""}
                  onChange={(e) =>
                    setNewRecipe((prev) => ({ ...prev, cookTime: Number.parseInt(e.target.value) || 0 }))
                  }
                  placeholder="30"
                />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={newRecipe.difficulty}
                  onValueChange={(value: "Easy" | "Medium" | "Hard") =>
                    setNewRecipe((prev) => ({ ...prev, difficulty: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ingredients</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="ingredient">Select Ingredient</Label>
                  <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ingredient" />
                    </SelectTrigger>
                    <SelectContent>
                      {inventoryItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name} - ₵{item.costPrice.toFixed(2)}/{item.unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={ingredientQuantity}
                    onChange={(e) => setIngredientQuantity(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addIngredientToRecipe}>Add</Button>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  value={ingredientNotes}
                  onChange={(e) => setIngredientNotes(e.target.value)}
                  placeholder="Preparation notes..."
                />
              </div>

              {newRecipe.ingredients && newRecipe.ingredients.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ingredient</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Cost</TableHead>
                      <TableHead>Total Cost</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newRecipe.ingredients.map((ingredient, index) => (
                      <TableRow key={index}>
                        <TableCell>{ingredient.itemName}</TableCell>
                        <TableCell>
                          {ingredient.quantity} {ingredient.unit}
                        </TableCell>
                        <TableCell>₵{ingredient.costPerUnit.toFixed(2)}</TableCell>
                        <TableCell>₵{ingredient.totalCost.toFixed(2)}</TableCell>
                        <TableCell>{ingredient.notes || "-"}</TableCell>
                        <TableCell>
                          <Button variant="destructive" size="sm" onClick={() => removeIngredientFromRecipe(index)}>
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Cost Calculation */}
            {newRecipe.ingredients && newRecipe.ingredients.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cost Calculation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="profitMargin">Target Profit Margin (%)</Label>
                      <Input
                        type="number"
                        value={newRecipe.profitMargin || ""}
                        onChange={(e) =>
                          setNewRecipe((prev) => ({ ...prev, profitMargin: Number.parseFloat(e.target.value) || 65 }))
                        }
                        placeholder="65"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Cost:</span>
                        <span className="font-medium">₵{totalCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cost per Serving:</span>
                        <span className="font-medium">₵{costPerServing.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Suggested Price:</span>
                        <span>₵{suggestedPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instructions */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Instructions</h3>
                <Button variant="outline" onClick={addInstruction}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Step
                </Button>
              </div>
              {newRecipe.instructions?.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`instruction-${index}`}>Step {index + 1}</Label>
                    <Textarea
                      value={instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      placeholder={`Describe step ${index + 1}...`}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button variant="destructive" size="sm" onClick={() => removeInstruction(index)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={saveRecipe}>{editingRecipe ? "Update Recipe" : "Create Recipe"}</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewRecipe(false)
                  setEditingRecipe(null)
                  resetForm()
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
