"use client"

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FeedbackBox } from '@/components/FeedbackBox'
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, CheckCircle2, XCircle, Clock, ThumbsUp } from 'lucide-react'

const mockFeedback = [
  { 
    id: 1, 
    category: "problem", 
    description: "The poll creation process is confusing. It would be helpful to have tooltips or a guided tour for first-time users. Also, the preview functionality doesn't always match the final result.", 
    email: "user1@example.com", 
    status: "new" 
  },
  { 
    id: 2, 
    category: "feature", 
    description: "Please add support for multiple choice questions with image options. This would be great for visual feedback and would help in design-related surveys.", 
    email: "user2@example.com", 
    status: "in-progress" 
  },
  { 
    id: 3, 
    category: "problem", 
    description: "Cannot export results to CSV. The export button is there but nothing happens when clicked. Using Chrome version 96.0.4664.110.", 
    email: "user3@example.com", 
    status: "resolved" 
  },
  { 
    id: 4, 
    category: "feature", 
    description: "Implement dark mode for the dashboard. Would be great for accessibility and reducing eye strain during night-time use.", 
    email: "user4@example.com", 
    status: "new" 
  },
  { 
    id: 5, 
    category: "problem", 
    description: "Login issues on mobile devices. The authentication process times out frequently on iOS devices.", 
    email: "user5@example.com", 
    status: "in-progress" 
  },
]

export default function FeedbackPage() {
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
  const [feedback, setFeedback] = useState(mockFeedback)

  const handleStatusChange = (id: number, newStatus: string) => {
    setFeedback(feedback.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ))
    toast({
      title: "Status Updated",
      description: "The feedback status has been updated successfully.",
    })
  }

  const copyEmbedCode = () => {
    const embedCode = `<script src="https://quickpolls.com/feedback-box.js"></script>
<div id="quickpolls-feedback"></div>`
    navigator.clipboard.writeText(embedCode)
    toast({
      title: "Embed Code Copied",
      description: "The feedback box embed code has been copied to your clipboard.",
    })
  }

  const statusCounts = feedback.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const FeedbackTable = ({ status }: { status: string }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feedback.filter(item => item.status === status).map((item) => (
          <TableRow 
            key={item.id} 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => setSelectedFeedback(item)}
          >
            <TableCell className="font-medium capitalize">{item.category}</TableCell>
            <TableCell className="max-w-xl">
              <p className="line-clamp-2">{item.description}</p>
            </TableCell>
            <TableCell>
              <Select
                value={item.status}
                onValueChange={(value) => {
                  handleStatusChange(item.id, value)
                  // Stop event propagation to prevent opening the dialog
                  event?.stopPropagation()
                }}
              >
                <SelectTrigger className="w-[120px]" onClick={e => e.stopPropagation()}>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleStatusChange(item.id, 'in-progress')
                  }}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Feedback Management</h1>
          <Button onClick={copyEmbedCode}>
            <PlusCircle className="mr-2 h-4 w-4" /> Get Embed Code
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Feedback</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.new || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts['in-progress'] || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.resolved || 0}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="new">
              <TabsList>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              <TabsContent value="new">
                <FeedbackTable status="new" />
              </TabsContent>
              <TabsContent value="in-progress">
                <FeedbackTable status="in-progress" />
              </TabsContent>
              <TabsContent value="resolved">
                <FeedbackTable status="resolved" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Feedback Details</DialogTitle>
            </DialogHeader>
            {selectedFeedback && (
              <div className="mt-4 space-y-4">
                <div>
                  <Label className="font-semibold">Category</Label>
                  <p className="mt-1 text-lg capitalize">{selectedFeedback.category}</p>
                </div>
                <div>
                  <Label className="font-semibold">Description</Label>
                  <p className="mt-1 text-lg">{selectedFeedback.description}</p>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p className="mt-1 text-lg">{selectedFeedback.email}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <p className="mt-1 text-lg capitalize">{selectedFeedback.status}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Feedback Box Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <FeedbackBox />
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

