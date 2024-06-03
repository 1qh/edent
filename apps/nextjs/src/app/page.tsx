import { Suspense } from 'react'

import { api } from '~/trpc/server'
import { Login } from './_components/login'
import { CreatePostForm, PostCardSkeleton, PostList } from './_components/posts'

export const runtime = 'edge'

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  const posts = api.post.all()
  return (
    <div className='flex flex-col items-end gap-5 p-5'>
      <Login />
      <CreatePostForm />
      <Suspense
        fallback={
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        }>
        <PostList posts={posts} />
      </Suspense>
    </div>
  )
}
