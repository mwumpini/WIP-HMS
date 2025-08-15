'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, User, LogOut, CreditCard, Mail, AlertCircle, CheckCircle } from 'lucide-react'

interface User {
  name: string
  email: string
  subscription: string
  subscriptionStatus: string
}

interface DashboardHeaderProps {
  user: User
}

interface Notification {
  id: number
  type: 'info' | 'warning' | 'success'
  title: string
  message: string
  read: boolean
  timestamp: string
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Load notifications (in real app, fetch from API)
    const sampleNotifications: Notification[] = [
      {
        id: 1,
        type: 'warning',
        title: 'VAT Return Due',
        message: 'Your monthly VAT return is due in 3 days',
        read: false,
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        type: 'info',
        title: 'New Feature Available',
        message: 'Payroll management is now available in your dashboard',
        read: false,
        timestamp: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 3,
        type: 'success',
        title: 'Backup Completed',
        message: 'Your data has been successfully backed up',
        read: true,
        timestamp: new Date(Date.now() - 172800000).toISOString()
      }
    ]
    setNotifications(sampleNotifications)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getSubscriptionBadge = () => {
    const variant = user.subscriptionStatus === 'active' ? 'default' : 'destructive'
    const color = user.subscription === 'professional' ? 'bg-emerald-600' : 'bg-blue-600'
    
    return (
      <Badge variant={variant} className={user.subscriptionStatus === 'active' ? color : ''}>
        {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
      </Badge>
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />
      default: return <Mail className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {getSubscriptionBadge()}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem 
                  key={notification.id}
                  className={`p-3 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3 w-full">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))
            )}
            {notifications.length > 5 && (
              <DropdownMenuItem className="text-center text-blue-600">
                View all notifications
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/dashboard/subscription')}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Subscription</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
