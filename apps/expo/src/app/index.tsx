import { useState } from 'react'
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import { Link, Stack } from 'expo-router'
import { FlashList } from '@shopify/flash-list'

import type { RouterOutputs } from '~/utils/api'
import { api } from '~/utils/api'

function PostCard(props: { post: RouterOutputs['post']['all'][number]; onDelete: () => void }) {
  return (
    <View className='flex flex-row items-center rounded-lg bg-muted p-3'>
      <View className='grow'>
        <Link
          asChild
          href={{
            pathname: '/post/[id]',
            params: { id: props.post.id }
          }}>
          <Pressable>
            <Text className='text-xl font-semibold text-primary'>{props.post.title}</Text>
            <Text className='mt-2 text-foreground'>{props.post.content}</Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={props.onDelete}>
        <Text className='text-primary'>Delete</Text>
      </Pressable>
    </View>
  )
}

function CreatePost() {
  const utils = api.useUtils()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle('')
      setContent('')
      await utils.post.all.invalidate()
    }
  })

  return (
    <View className='flex gap-2'>
      <TextInput
        className='items-center rounded-lg border border-input bg-background p-3 text-lg leading-tight text-foreground'
        value={title}
        onChangeText={setTitle}
        placeholder='Title'
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className='mb-2 text-destructive'>{error.data.zodError.fieldErrors.title}</Text>
      )}
      <TextInput
        className='items-center rounded-lg border border-input bg-background p-3 text-lg leading-tight text-foreground'
        value={content}
        onChangeText={setContent}
        placeholder='Content'
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className='mb-2 text-destructive'>{error.data.zodError.fieldErrors.content}</Text>
      )}
      <Pressable
        className='flex items-center rounded-lg bg-primary py-3'
        onPress={() => {
          mutate({
            title,
            content
          })
        }}>
        <Text className='text-background'>Create</Text>
      </Pressable>
      {error?.data?.code === 'UNAUTHORIZED' && (
        <Text className='mt-2 text-destructive'>You need to be logged in to create a post</Text>
      )}
    </View>
  )
}

export default function Index() {
  const utils = api.useUtils()
  const postQuery = api.post.all.useQuery()
  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => utils.post.all.invalidate().then()
  })
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: 'Home' }} />
      <View className='size-full px-0'>
        <CreatePost />
        <Text className='p-2 italic text-primary'>Press on a post</Text>
        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className='h-2' />}
          renderItem={p => (
            <PostCard post={p.item} onDelete={() => deletePostMutation.mutate(p.item.id)} />
          )}
        />
        <Pressable
          onPress={() => void utils.post.all.invalidate()}
          className='mx-2 -mb-3 items-center rounded-lg bg-primary py-3'>
          <Text className='text-background'>Refresh posts</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
