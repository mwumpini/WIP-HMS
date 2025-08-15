'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, Crown, Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState('professional')

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'GHS 50',
      period: '/month',
      description: 'Perfect for small businesses',
      features: [
        'Up to 100 sales entries per month',
        'Basic tax calculations',
        'VAT and GRA levies reporting',
        'Email support',
        'Data export (CSV)'
      ],
      color: 'bg-gray-600'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 'GHS 120',
      period: '/month',
      description: 'Best for growing businesses',
      features: [
        'Unlimited sales and expense entries',
        'Advanced tax calculations',
        'All GRA and GTA reporting',
        'Withholding tax management',
        'Priority support',
        'Advanced analytics',
        'API access',
        'Custom reports'
      ],
      color: 'bg-emerald-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Multi-location support',
        'Custom integrations',
        'Dedicated account manager',
        'On-premise deployment option',
        'Advanced security features',
        'Custom training',
        'SLA guarantee'
      ],
      color: 'bg-purple-600'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-gray-600">Manage your subscription plan and billing</p>
        </div>
      </div>

      <Alert className="border-emerald-200 bg-emerald-50">
        <Crown className="h-4 w-4 text-emerald-600" />
        <AlertDescription className="text-emerald-800">
          You are currently on the <strong>Professional</strong> plan. Your next billing date is March 15, 2024.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-emerald-500 shadow-lg' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-emerald-600 text-white">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                {currentPlan === plan.id && (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                    Current
                  </Badge>
                )}
              </div>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className={`w-full ${currentPlan === plan.id ? 'bg-gray-400' : plan.color}`}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? 'Current Plan' : 
                 plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent billing transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Professional Plan</p>
                <p className="text-sm text-gray-600">February 15, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium">GHS 120.00</p>
                <Badge variant="outline" className="text-emerald-600">Paid</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Professional Plan</p>
                <p className="text-sm text-gray-600">January 15, 2024</p>
              </div>
              <div className="text-right">
                <p className="font-medium">GHS 120.00</p>
                <Badge variant="outline" className="text-emerald-600">Paid</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Professional Plan</p>
                <p className="text-sm text-gray-600">December 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">GHS 120.00</p>
                <Badge variant="outline" className="text-emerald-600">Paid</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
