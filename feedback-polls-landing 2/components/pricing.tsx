"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check } from 'lucide-react'

interface PricingPlan {
  name: string
  description: string
  monthlyPrice: number | null
  yearlyPrice: number | null
  features: string[]
  popular?: boolean
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    description: "For individuals and small projects",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Up to 100 responses/month",
      "Basic analytics",
      "Email support",
      "1 poll active at a time"
    ]
  },
  {
    name: "Pro",
    description: "For businesses with higher volume needs",
    monthlyPrice: 12,
    yearlyPrice: 120,
    features: [
      "Unlimited responses",
      "Advanced analytics",
      "Priority support",
      "Unlimited active polls",
      "Custom branding",
      "API access"
    ],
    popular: true
  }
]

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="w-full py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose the plan that fits your needs
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Monthly</span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className="text-sm font-medium">Annual</span>
            <Badge variant="secondary" className="ml-2">SAVE 15%</Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.popular && (
                    <Badge variant="default">MOST POPULAR</Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-baseline justify-center mb-4">
                  {plan.monthlyPrice !== null ? (
                    <>
                      <span className="text-3xl font-bold">$</span>
                      <span className="text-5xl font-bold">
                        {isAnnual ? (plan.yearlyPrice! / 12).toFixed(2) : plan.monthlyPrice}
                      </span>
                      <span className="ml-1 text-gray-500">/mo</span>
                    </>
                  ) : (
                    <span className="text-5xl font-bold">Free</span>
                  )}
                </div>
                {isAnnual && plan.yearlyPrice && (
                  <p className="text-center text-sm text-gray-500 mb-4">
                    Billed annually at ${plan.yearlyPrice}/year
                  </p>
                )}
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.monthlyPrice ? "Get started" : "Sign up"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

