import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Check, Bell, FileText, Lightbulb, BarChart2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Poll } from '@/components/Poll'
import { CompactAnnouncement } from '@/components/CompactAnnouncement'
import { Pricing } from '@/components/pricing'
import { Features } from '@/components/features'

export default function LandingPage() {
  const [showMiniAnnouncement, setShowMiniAnnouncement] = useState(true)
  const [showPoll, setShowPoll] = useState(true)

  const pollQuestions = [
    {
      id: "q1",
      title: "What's most important to you?",
      description: "Help us understand your priorities",
      options: [
        { id: "q1_option1", text: "Easy to use", votes: 10 },
        { id: "q1_option2", text: "Powerful features", votes: 15 },
        { id: "q1_option3", text: "Great support", votes: 8 },
        { id: "q1_option4", text: "Affordable pricing", votes: 12 },
      ]
    },
    {
      id: "q2",
      title: "How often do you create polls?",
      description: "We'd like to know your usage frequency",
      options: [
        { id: "q2_option1", text: "Daily", votes: 5 },
        { id: "q2_option2", text: "Weekly", votes: 20 },
        { id: "q2_option3", text: "Monthly", votes: 15 },
        { id: "q2_option4", text: "Rarely", votes: 10 },
      ]
    }
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h1 
                className="text-5xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Turn your visitors into{' '}
                <span className="text-purple-600">profitable</span>{' '}
                business
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Create engaging polls and gather valuable feedback from your audience. Make data-driven decisions that grow your business.
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Get started free
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  Watch demo <Play className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="relative mx-auto max-w-5xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-30" />
                <div className="relative bg-white rounded-lg border shadow-2xl overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt="Dashboard Preview"
                    width={1920}
                    height={1080}
                    className="w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Stats Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold text-purple-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <Pricing />

        {/* Mini Announcement and Poll */}
        <div className="fixed top-16 right-4 z-50 space-y-2 w-64 flex flex-col items-end">
          {showMiniAnnouncement && (
            <CompactAnnouncement
              title="New Feature!"
              content="Multi-page surveys are now available."
              onClose={() => setShowMiniAnnouncement(false)}
            />
          )}
          {showPoll && (
            <Poll
              questions={pollQuestions}
              onClose={() => setShowPoll(false)}
              allowOther={true}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

const stats = [
  { value: "99%", label: "Customer satisfaction" },
  { value: "2M+", label: "Polls created" },
  { value: "10M+", label: "Monthly responses" },
]

