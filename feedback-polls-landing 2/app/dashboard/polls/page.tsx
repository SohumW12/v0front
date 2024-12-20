"use client"

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusCircle, Eye, Edit, Trash2 } from 'lucide-react'
import { PollCreationPopup } from '@/components/PollCreationPopup'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { toast } from "@/components/ui/use-toast"

export default function PollsPage() {
  const [showPollCreation, setShowPollCreation] = useState(false)
  const [selectedPoll, setSelectedPoll] = useState<any>(null)
  const [polls, setPolls] = useState([
    { id: 1, title: "Product Feature Priority", responses: 245, active: true, endDate: "2023-12-31", page: "Homepage", analytics: { totalVotes: 245, completionRate: 85, averageTimeSpent: 45, deviceBreakdown: { desktop: 60, mobile: 30, tablet: 10 }, topReferrers: ["Homepage", "Email", "Social Media"] } },
    { id: 2, title: "Customer Satisfaction Survey", responses: 189, active: false, endDate: "2023-11-30", page: "Feedback", analytics: { totalVotes: 189, completionRate: 78, averageTimeSpent: 60, deviceBreakdown: { desktop: 55, mobile: 35, tablet: 10 }, topReferrers: ["Email", "Homepage", "Support Page"] } },
    { id: 3, title: "Website Redesign Feedback", responses: 78, active: false, endDate: "2023-10-15", page: "Homepage", analytics: { totalVotes: 78, completionRate: 92, averageTimeSpent: 30, deviceBreakdown: { desktop: 70, mobile: 25, tablet: 5 }, topReferrers: ["Homepage", "Blog", "Social Media"] } },
  ])

  const [editingPoll, setEditingPoll] = useState<any>(null)

  const handleCreatePoll = (pollData: any) => {
    setPolls([...polls, { ...pollData, id: polls.length + 1, responses: 0, active: true, analytics: { totalVotes: 0, completionRate: 0, averageTimeSpent: 0, deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 }, topReferrers: [] } }])
    toast({
      title: "Poll Created",
      description: "Your new poll has been successfully created.",
    })
  }

  const handleEditPoll = () => {
    if (!editingPoll) return
    setPolls(polls.map(p => p.id === editingPoll.id ? editingPoll : p))
    setEditingPoll(null)
    toast({
      title: "Poll Updated",
      description: "Your poll has been successfully updated.",
    })
  }

  const handleDeletePoll = (id: number) => {
    setPolls(polls.filter(p => p.id !== id))
    toast({
      title: "Poll Deleted",
      description: "The poll has been successfully deleted.",
      variant: "destructive",
    })
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Polls Management</h1>
          <Button onClick={() => setShowPollCreation(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Poll
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Polls</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Poll Title</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead>Responses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {polls.map((poll) => (
                  <TableRow key={poll.id}>
                    <TableCell>{poll.title}</TableCell>
                    <TableCell>{poll.page}</TableCell>
                    <TableCell>{poll.responses}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${poll.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {poll.active ? 'Active' : 'Ended'}
                      </span>
                    </TableCell>
                    <TableCell>{poll.endDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedPoll(poll)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Poll</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-title" className="text-right">
                                  Title
                                </Label>
                                <Input
                                  id="edit-title"
                                  value={editingPoll?.title || ''}
                                  onChange={(e) => setEditingPoll({ ...editingPoll, title: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-page" className="text-right">
                                  Page
                                </Label>
                                <Select
                                  value={editingPoll?.page || ''}
                                  onValueChange={(value) => setEditingPoll({ ...editingPoll, page: value })}
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a page" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Homepage">Homepage</SelectItem>
                                    <SelectItem value="Feedback">Feedback</SelectItem>
                                    <SelectItem value="Contact">Contact</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-end-date" className="text-right">
                                  End Date
                                </Label>
                                <Input
                                  id="edit-end-date"
                                  type="date"
                                  value={editingPoll?.endDate || ''}
                                  onChange={(e) => setEditingPoll({ ...editingPoll, endDate: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <Button onClick={handleEditPoll}>Save Changes</Button>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the poll
                                and remove it from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeletePoll(poll.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {showPollCreation && (
        <PollCreationPopup
          onClose={() => setShowPollCreation(false)}
          onCreatePoll={handleCreatePoll}
        />
      )}

      {selectedPoll && (
        <Dialog open={!!selectedPoll} onOpenChange={() => setSelectedPoll(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Poll Analytics: {selectedPoll.title}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Votes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{selectedPoll.analytics.totalVotes}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{selectedPoll.analytics.completionRate}%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Avg. Time Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{selectedPoll.analytics.averageTimeSpent}s</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={Object.entries(selectedPoll.analytics.deviceBreakdown).map(([key, value]) => ({ name: key, value }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {Object.entries(selectedPoll.analytics.deviceBreakdown).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {selectedPoll.analytics.topReferrers.map((referrer: string, index: number) => (
                    <li key={index}>{referrer}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Button className="mt-4" onClick={() => setSelectedPoll(null)}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  )
}

