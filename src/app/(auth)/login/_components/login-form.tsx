'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import sampleData from '@/data/sample_data.json'

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user = sampleData.users.filter((user) => user.email === values.email)?.[0]

    localStorage.setItem('role', user.role)
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/dashboard')
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
                <FormDescription>{`admin: alice.johnson@example.com`}</FormDescription>
                <FormDescription>{`user: bob.smith@example.com`}</FormDescription>
                <FormDescription>{`user: charlie.davis@example.com`}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
