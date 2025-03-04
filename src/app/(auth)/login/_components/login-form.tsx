'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import sampleData from '@/data/sample_data.json'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Copy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export default function LoginForm() {
  const router = useRouter()
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })

  const {
    formState: { isValid },
  } = form

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user = sampleData.users.filter((user) => user.email === values.email)?.[0]

    localStorage.setItem('role', user.role)
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/dashboard')
  }

  function copyEmail(email: string) {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)

    setTimeout(() => setCopiedEmail(null), 2000)
  }

  return (
    <div className="border p-10 rounded-lg">
      <h1 className="text-2xl mb-2">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="admin@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        </form>
      </Form>

      {/* Danh sách tài khoản test */}
      <div className="mt-6 space-y-2">
        <h3 className="text-sm font-semibold">Tài khoản test</h3>
        {sampleData.users.map((user) => (
          <div
            key={user.email}
            className={`flex justify-between items-center p-2 border rounded-md text-sm ${
              user.role === 'admin' ? 'bg-gray-100' : ''
            }`}
          >
            <div>
              <span className="font-medium">{user.email}</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs ${
                  user.role === 'admin' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                }`}
              >
                {user.role.toUpperCase()}
              </span>
            </div>
            <Button size="icon" variant="ghost" onClick={() => copyEmail(user.email)}>
              {copiedEmail === user.email ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
