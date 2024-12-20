"use client"

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusCircle, Edit, Trash2, Check, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
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
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "New Feature Release", content: "We've just launched our new analytics dashboard!", page: "Homepage", active: true },
    { id: 2, title: "Maintenance Schedule", content: "Our system will be undergoing maintenance this weekend.", page: "Dashboard", active: false },
    { id: 3, title: "Holiday Hours", content: "Our support team will have limited availability during the holidays.", page: "Contact Us", active: true },
  ])

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    page: '',
    active: true,
  })

  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null)

  const handleCreateAnnouncement = () => {
    if (newAnnouncement.title.trim() === '' || newAnnouncement.content.trim() === '' || newAnnouncement.page === '') return
    setAnnouncements([...announcements, { ...newAnnouncement, id: announcements.length + 1 }])
    setNewAnnouncement({ title: '', content: '', page: '', active: true })
  }

  const handleEditAnnouncement = () => {
    if (!editingAnnouncement) return
    setAnnouncements(announcements.map(a => a.id === editingAnnouncement.id ? editingAnnouncement : a))
    setEditingAnnouncement(null)
  }

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id))
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Announcements Management</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="page" className="text-right">
                    Page
                  </Label>
                  <Select
                    value={newAnnouncement.page}
                    onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, page: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Homepage">Homepage</SelectItem>
                      <SelectItem value="Dashboard">Dashboard</SelectItem>
                      <SelectItem value="Contact Us">Contact Us</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="active" className="text-right">
                    Active
                  </Label>
                  <Switch
                    id="active"
                    checked={newAnnouncement.active}
                    onCheckedChange={(checked) => setNewAnnouncement({ ...newAnnouncement, active: checked })}
                  />
                </div>
              </div>
              <Button onClick={handleCreateAnnouncement}>Create Announcement</Button>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Announcements</CardTitle>
            <CardDescription>Manage and edit your announcements here.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell className="font-medium">{announcement.title}</TableCell>
                      <TableCell>{announcement.content}</TableCell>
                      <TableCell>{announcement.page}</TableCell>
                      <TableCell>
                        <Badge variant={announcement.active ? "success" : "secondary"}>
                          {announcement.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Announcement</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-title" className="text-right">
                                    Title
                                  </Label>
                                  <Input
                                    id="edit-title"
                                    value={editingAnnouncement?.title || ''}
                                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-content" className="text-right">
                                    Content
                                  </Label>
                                  <Textarea
                                    id="edit-content"
                                    value={editingAnnouncement?.content || ''}
                                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-page" className="text-right">
                                    Page
                                  </Label>
                                  <Select
                                    value={editingAnnouncement?.page || ''}
                                    onValueChange={(value) => setEditingAnnouncement({ ...editingAnnouncement, page: value })}
                                  >
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Select a page" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Homepage">Homepage</SelectItem>
                                      <SelectItem value="Dashboard">Dashboard</SelectItem>
                                      <SelectItem value="Contact Us">Contact Us</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-active" className="text-right">
                                    Active
                                  </Label>
                                  <Switch
                                    id="edit-active"
                                    checked={editingAnnouncement?.active || false}
                                    onCheckedChange={(checked) => setEditingAnnouncement({ ...editingAnnouncement, active: checked })}
                                  />
                                </div>
                              </div>
                              <Button onClick={handleEditAnnouncement}>Save Changes</Button>
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the announcement
                                  and remove it from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteAnnouncement(announcement.id)}>
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
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

