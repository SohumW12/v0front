"use client"

import { useState } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

interface AnnouncementBannerProps {
  onClose: () => void
}

export function AnnouncementBanner({ onClose }: AnnouncementBannerProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 flex items-center justify-between">
      <div className="flex-1 text-center text-sm md:text-base font-medium">
        🎉 New Feature Alert: Create multi-page surveys! Gather deeper insights.{' '}
        <Link href="#" className="underline font-bold hover:text-blue-200 transition-colors">
          Try it now →
        </Link>
      </div>
      <button onClick={onClose} className="text-white hover:text-blue-200 transition-colors">
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}

