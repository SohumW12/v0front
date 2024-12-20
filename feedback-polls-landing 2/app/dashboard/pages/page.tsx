"use client"

import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusCircle, Copy, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from '@/components/ui/use-toast'

export default function PagesPage() {
  const [pages, setPages] = useState([
    { id: 1, name: 'Homepage Poll', embedCode: '<iframe src="https://example.com/poll/1"></iframe>' },
    { id: 2, name: 'Feedback Form', embedCode: '<iframe src="https://example.com/poll/2"></iframe>' },
  ])
  const [newPageName, setNewPageName] = useState('')

  const handleCreatePage = () => {
    if (newPageName.trim() === '') return
    const newPage = {
      id: pages.length + 1,
      name: newPageName,
      embedCode: `<iframe src="https://example.com/poll/${pages.length + 1}"></iframe>`,
    }
    setPages([...pages, newPage])
    setNewPageName('')
    toast({
      title: "Page created",
      description: `${newPageName} has been added to your pages.`,
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The embed code has been copied to your clipboard.",
      })
    }).catch(err => {
      console.error('Failed to copy: ', err)
      toast({
        title: "Failed to copy",
        description: "There was an error copying the embed code. Please try again.",
        variant: "destructive",
      })
    })
  }

  const deletePage = (id: number) => {
    setPages(pages.filter(page => page.id !== id))
    toast({
      title: "Page deleted",
      description: "The page has been removed from your list.",
    })
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Pages Management</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Page</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Label htmlFor="page-name">Page Name</Label>
                  <Input
                    id="page-name"
                    value={newPageName}
                    onChange={(e) => setNewPageName(e.target.value)}
                    placeholder="Enter page name"
                  />
                </div>
                <Button onClick={handleCreatePage}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Page
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page Name</TableHead>
                    <TableHead>Embed Code</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell>{page.name}</TableCell>
                      <TableCell className="font-mono text-sm">{page.embedCode}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(page.embedCode)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePage(page.id)}
                          >
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
        </motion.div>
      </div>
    </Layout>
  )
}

