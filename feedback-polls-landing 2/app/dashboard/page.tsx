"use client"

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, BarChart2, Users, Calendar, Copy } from 'lucide-react'
import { PollCreationPopup } from '@/components/PollCreationPopup'
import { PollResults } from '@/components/PollResults'
import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FeedbackBox } from '@/components/FeedbackBox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from "@/components/ui/use-toast"

const mockPolls = [
  { id: 1, title: "Product Feature Priority", responses: 245, active: true, endDate: "2023-12-31", page: "Homepage" },
  { id: 2, title: "Customer Satisfaction Survey", responses: 189, active: false, endDate: "2023-11-30", page: "Feedback" },
  { id: 3, title: "Website Redesign Feedback", responses: 78, active: false, endDate: "2023-10-15", page: "Homepage" },
]

const mockAnnouncements = [
  { id: 1, title: "New Feature Release", content: "We've just launched our new analytics dashboard!", page: "Dashboard", active: true },
  { id: 2, title: "Maintenance Schedule", content: "Our system will be undergoing maintenance this weekend.", page: "Homepage", active: false },
  { id: 3, title: "Holiday Hours", content: "Our support team will have limited availability during the holidays.", page: "Contact", active: true },
]

export default function DashboardPage() {
  const [showPollCreation, setShowPollCreation] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const handleCreatePoll = (pollData: any) => {
    // Here you would typically send this data to your backend
    console.log("New poll created:", pollData)
  }

  const mockPollResults = {
    title: "Product Feature Priority",
    description: "Help us decide which feature to build next",
    options: [
      { name: "Improved Dashboard", votes: 120 },
      { name: "Mobile App", votes: 80 },
      { name: "API Integration", votes: 45 },
      { name: "Custom Reports", votes: 67 },
    ],
    totalVotes: 312,
  }

  const feedbackBoxEmbed = `<script src="https://quickpolls.com/feedback-box.js"></script>
<div id="quickpolls-feedback"></div>`

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(feedbackBoxEmbed)
    toast({
      title: "Embed Code Copied",
      description: "The feedback box embed code has been copied to your clipboard.",
    })
  }

  return (
    <Layout>
      <div className="flex h-screen overflow-hidden font-sans">
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="container mx-auto px-4 py-8">
              {/*Removed AnnouncementBanner*/}
            </div>

            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <div className="flex space-x-4">
                <Link href="/dashboard/polls">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Poll
                  </Button>
                </Link>
                <Link href="/dashboard/announcements">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Announcement
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">512</div>
                  <p className="text-xs text-muted-foreground">+20% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Polls</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">1 active poll per page</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming End Date</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Dec 31</div>
                  <p className="text-xs text-muted-foreground">Product Feature Priority</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Polls</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {mockPolls.map((poll) => (
                      <div
                        key={poll.id}
                        className="mb-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedItem({ type: 'poll', ...poll })}
                      >
                        <h3 className="font-semibold">{poll.title}</h3>
                        <p className="text-sm text-muted-foreground">Page: {poll.page}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm">{poll.responses} responses</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${poll.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {poll.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {mockAnnouncements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className="mb-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedItem({ type: 'announcement', ...announcement })}
                      >
                        <h3 className="font-semibold">{announcement.title}</h3>
                        <p className="text-sm">{announcement.content}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm">Page: {announcement.page}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${announcement.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {announcement.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Feedback Box</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label htmlFor="embed-code">Embed Code</Label>
                  <div className="flex mt-1">
                    <Input
                      id="embed-code"
                      value={feedbackBoxEmbed}
                      readOnly
                      className="flex-grow"
                    />
                    <Button onClick={copyEmbedCode} className="ml-2">
                      <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>
                  </div>
                </div>
                <div className="mb-4">
                  <Label>Preview</Label>
                  <div className="mt-2 p-4 border rounded-lg">
                    <FeedbackBox />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {showPollCreation && (
        <PollCreationPopup
          onClose={() => setShowPollCreation(false)}
          onCreatePoll={handleCreatePoll}
        />
      )}

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">{selectedItem.type === 'poll' ? 'Poll Results' : 'Announcement Analytics'}</h2>
            {selectedItem.type === 'poll' ? (
              <PollResults {...mockPollResults} />
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-2">{selectedItem.title}</h3>
                <p className="mb-4">{selectedItem.content}</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Analytics</h4>
                  <p>Views: 1,234</p>
                  <p>Engagement Rate: 5.67%</p>
                  <p>Click-through Rate: 2.34%</p>
                </div>
              </div>
            )}
            <Button className="mt-4" onClick={() => setSelectedItem(null)}>Close</Button>
          </div>
        </div>
      )}
    </Layout>
  )
}

