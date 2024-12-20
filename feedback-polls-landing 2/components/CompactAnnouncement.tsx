"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface CompactAnnouncementProps {
  title: string
  content: string
  onClose: () => void
}

export function CompactAnnouncement({ title, content, onClose }: CompactAnnouncementProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <Card className="w-full max-w-[280px] cursor-pointer" onClick={toggleExpanded}>
      <CardContent className="p-3 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-sm text-blue-600">{title}</h4>
          <div className="flex items-center space-x-2">
            {isExpanded ? (
              <ChevronUp size={16} className="text-gray-500" />
            ) : (
              <ChevronDown size={16} className="text-gray-500" />
            )}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        {isExpanded && (
          <p className="mt-2 text-sm text-gray-600">{content}</p>
        )}
      </CardContent>
    </Card>
  )
}

