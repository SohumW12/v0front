"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CalendarIcon, Plus, Trash2 } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Checkbox } from '@/components/ui/checkbox'
import { Poll } from './Poll'

interface PollCreationPopupProps {
  onClose: () => void
  onCreatePoll: (pollData: any) => void
}

export function PollCreationPopup({ onClose, onCreatePoll }: PollCreationPopupProps) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [allowOther, setAllowOther] = useState(false)

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ''])
    }
  }

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index)
    setOptions(newOptions)
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pollData = {
      title,
      description,
      options,
      allowOther,
      startDate,
      endDate,
    }
    onCreatePoll(pollData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-2xl font-bold mb-4">Create New Poll</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="poll-title">Poll Title</Label>
              <Input
                id="poll-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter poll title"
                required
              />
            </div>
            <div>
              <Label htmlFor="poll-description">Description</Label>
              <Textarea
                id="poll-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter poll description"
              />
            </div>
            <div>
              <Label>Options</Label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center mt-2">
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                  {index > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOption(index)}
                      className="ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {options.length < 4 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Option
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allow-other"
                checked={allowOther}
                onCheckedChange={(checked) => setAllowOther(checked as boolean)}
              />
              <Label htmlFor="allow-other">Allow "Other" option</Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">Create Poll</Button>
            </div>
          </form>
        </div>
        <div className="w-1/2 pl-4 border-l">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          <Poll
            title={title || "Poll Title"}
            description={description || "Poll Description"}
            options={options.filter(option => option !== '').map((option, index) => ({
              id: `option-${index}`,
              text: option,
              votes: 0
            }))}
            allowOther={allowOther}
          />
        </div>
      </div>
    </div>
  )
}

