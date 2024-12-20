"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Settings, LayoutDashboard, FileText, Bell, BarChart2, PieChart, User, Menu, MessageSquare, LogOut, CreditCard } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AnnouncementBanner } from "./AnnouncementBanner"
import { FeedbackBox } from "./FeedbackBox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard" },
  { href: "/dashboard/pages", icon: <FileText className="h-5 w-5" />, label: "Pages" },
  { href: "/dashboard/announcements", icon: <Bell className="h-5 w-5" />, label: "Announcements" },
  { href: "/dashboard/polls", icon: <BarChart2 className="h-5 w-5" />, label: "Polls" },
  { href: "/dashboard/analytics", icon: <PieChart className="h-5 w-5" />, label: "Analytics" },
  { href: "/dashboard/feedback", icon: <MessageSquare className="h-5 w-5" />, label: "Feedback" },
]

export interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [showAnnouncement, setShowAnnouncement] = useState(true)
  const pathname = usePathname()

  const isLandingPage = pathname === '/'
  const isDashboardPage = pathname?.startsWith('/dashboard')

  return (
    <div className="flex min-h-screen">
      {isDashboardPage && (
        <aside className="w-64 bg-gray-100 border-r border-gray-200">
          <div className="p-4">
            <Link href="/" className="text-xl font-semibold text-purple-600">
              QuickPolls
            </Link>
          </div>
          <nav className="mt-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <span>Username</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Username</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>
      )}
      <div className="flex-1 flex flex-col">
        {showAnnouncement && (
          <AnnouncementBanner onClose={() => setShowAnnouncement(false)} />
        )}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            {!isDashboardPage && (
              <Link href="/" className="text-xl font-semibold text-purple-600">
                QuickPolls
              </Link>
            )}
            <nav className="hidden md:flex items-center space-x-4">
              {!isDashboardPage && (
                <>
                  <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</Link>
                  <Link href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Docs</Link>
                  <FeedbackBox />
                </>
              )}
            </nav>
            <div className="flex items-center space-x-4">
              {!isDashboardPage && (
                <>
                  <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button size="sm" asChild className="hidden md:inline-flex">
                    <Link href="/dashboard">Sign up</Link>
                  </Button>
                </>
              )}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-2">
                    {isDashboardPage
                      ? navItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                              pathname === item.href
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                          </Link>
                        ))
                      : (
                        <>
                          <Link href="#features" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">Features</Link>
                          <Link href="#pricing" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">Pricing</Link>
                          <Link href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">Docs</Link>
                          <FeedbackBox />
                          <Button variant="outline" size="sm" asChild className="w-full justify-start">
                            <Link href="/login">Log in</Link>
                          </Button>
                          <Button size="sm" asChild className="w-full justify-start">
                            <Link href="/dashboard">Sign up</Link>
                          </Button>
                        </>
                      )
                    }
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          {children}
        </main>
        {!isDashboardPage && (
          <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-screen-xl mx-auto px-4 py-8 md:px-6 md:py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Product</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Features</Link></li>
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Pricing</Link></li>
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Integrations</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Company</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">About</Link></li>
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Blog</Link></li>
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Careers</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Resources</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Documentation</Link></li>
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Help Center</Link></li>
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">API Reference</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Legal</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy</Link></li>
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms</Link></li>
                    <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Cookie Policy</Link></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} QuickPolls. All rights reserved.</p>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

// Add named export
export { Layout }
export default Layout

