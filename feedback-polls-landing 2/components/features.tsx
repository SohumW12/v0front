"use client"

import { motion } from 'framer-motion'
import { Bell, BarChart2, FileText, ArrowRight, Lightbulb, Check } from 'lucide-react'

const features = [
  {
    title: "Real-Time Polls",
    description: "Create engaging polls that capture instant feedback from your audience. Perfect for live events and quick decisions.",
    icon: Bell,
  },
  {
    title: "Advanced Analytics",
    description: "Get detailed insights with our powerful analytics dashboard. Track responses, engagement rates, and user behavior.",
    icon: BarChart2,
  },
  {
    title: "Custom Reports",
    description: "Generate beautiful, comprehensive reports that help you make data-driven decisions with confidence.",
    icon: FileText,
  },
  {
    title: "Multi-Page Surveys",
    description: "Build in-depth surveys with branching logic to gather detailed insights from your audience.",
    icon: ArrowRight,
  },
  {
    title: "AI-Powered Analysis",
    description: "Let our AI help you understand patterns and trends in your feedback data automatically.",
    icon: Lightbulb,
  },
  {
    title: "Easy Integration",
    description: "Seamlessly embed polls and surveys into your website with just a few lines of code.",
    icon: Check,
  },
]

export function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need to succeed</h2>
          <p className="text-xl text-gray-600">
            Powerful features to help you collect, analyze, and act on customer feedback.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500" />
              <div className="relative bg-white p-8 rounded-lg border shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

