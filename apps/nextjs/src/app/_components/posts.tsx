'use client'

import type { FieldValues, UseFormProps } from 'react-hook-form'
import type { ZodType, ZodTypeDef } from 'zod'
import { use } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as _useForm } from 'react-hook-form'
import { toast } from 'sonner'

import type { RouterOutputs } from '@a/api'
import { CreatePostSchema } from '@a/db/schema'
import { Button } from '@a/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@a/ui/form'
import { Input } from '@a/ui/input'

import { api } from '~/trpc/react'

const useForm = <TOut, TDef extends ZodTypeDef, TIn extends FieldValues>(
  props: Omit<UseFormProps<TIn>, 'resolver'> & { schema: ZodType<TOut, TDef, TIn> }
) => _useForm<TIn>({ ...props, resolver: zodResolver(props.schema, undefined) })

export function CreatePostForm() {
  const form = useForm({
    schema: CreatePostSchema,
    defaultValues: {
      content: '',
      title: ''
    }
  })
  const utils = api.useUtils()
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      form.reset()
      await utils.post.invalidate()
    },
    onError: err => {
      toast.error(err.data?.code === 'UNAUTHORIZED' ? 'Log in to post' : 'Failed to create post')
    }
  })
  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col gap-4'
        onSubmit={form.handleSubmit(data => createPost.mutate(data))}>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder='Title' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder='Content' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='m-auto w-fit'>Create</Button>
      </form>
    </Form>
  )
}

export function PostList(props: { posts: Promise<RouterOutputs['post']['all']> }) {
  // TODO: Make `useSuspenseQuery` work without having to pass a promise from RSC
  const initialData = use(props.posts)
  const { data: posts } = api.post.all.useQuery(undefined, { initialData })

  if (posts.length === 0) {
    return 'No posts yet'
  }
  return posts.map(p => <PostCard key={p.id} post={p} />)
}

export function PostCard(props: { post: RouterOutputs['post']['all'][number] }) {
  const utils = api.useUtils()
  const deletePost = api.post.delete.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate()
    },
    onError: err => {
      toast.error(
        err.data?.code === 'UNAUTHORIZED'
          ? 'You must be logged in to delete a post'
          : 'Failed to delete post'
      )
    }
  })
  return (
    <div className='flex w-full items-center rounded-lg bg-muted p-3'>
      <div className='grow'>
        <p className='text-2xl font-semibold'>{props.post.title}</p>
        <p>{props.post.content}</p>
      </div>
      <Button variant='destructive' onClick={() => deletePost.mutate(props.post.id)}>
        Delete
      </Button>
    </div>
  )
}

export function PostCardSkeleton() {
  return (
    <div className='flex w-full flex-col gap-2 rounded-lg bg-muted p-3'>
      <p className='w-1/6 animate-pulse rounded bg-muted-foreground text-xl'>&nbsp;</p>
      <p className='w-1/3 animate-pulse rounded bg-muted-foreground text-sm'>&nbsp;</p>
    </div>
  )
}
