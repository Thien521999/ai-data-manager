'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

const sampleData = {
  users: [
    { email: 'alice.johnson@example.com', role: 'admin' },
    { email: 'bob.smith@example.com', role: 'user' },
    { email: 'charlie.davis@example.com', role: 'user' },
  ],
}

export default function UserTestList() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Tài khoản test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sampleData.users.map((user) => (
          <div
            key={user.email}
            className="flex justify-between items-center p-3 rounded-lg border shadow-sm bg-muted"
          >
            <div>
              {/* <span className="font-medium">{user.email}</span> */}
              <Badge
                variant={user.role === 'admin' ? 'destructive' : 'default'}
                className="ml-2 text-xs"
              >
                {user.role.toUpperCase()}
              </Badge>
            </div>
            <Button size="icon" variant="ghost" onClick={() => copyEmail(user.email)}>
              {copiedEmail === user.email ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
