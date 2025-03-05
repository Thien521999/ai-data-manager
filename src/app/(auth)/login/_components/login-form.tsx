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
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import UserTestList from './user-test-list'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export default function LoginForm() {
  const router = useRouter()

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = sampleData.users.filter((user) => user.email === values.email)?.[0]

      if (!user) {
        alert('Email không tồn tại!')
        return
      }

      localStorage.setItem('role', user.role)
      localStorage.setItem('user', JSON.stringify(user))

      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="border p-5 sm:p-8 rounded-lg">
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
          <Button type="submit" disabled={!isValid} className="w-full transition-all">
            Submit
          </Button>
        </form>
      </Form>

      {/* Danh sách tài khoản test */}
      <div className="mt-6 space-y-2">
        <UserTestList />
      </div>
    </div>
  )
}
