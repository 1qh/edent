import { SafeAreaView, Text, View } from 'react-native'
import { Stack, useGlobalSearchParams } from 'expo-router'

import { api } from '~/utils/api'

export default function Post() {
  const { id } = useGlobalSearchParams()
  if (!id || typeof id !== 'string') {
    throw new Error('unreachable')
  }
  const { data } = api.post.byId.useQuery({ id })
  if (!data) {
    return null
  }
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: data.title }} />
      <View className='size-full gap-2'>
        <Text className='px-3 text-3xl font-bold text-primary'>{data.title}</Text>
        <Text className='px-3 text-foreground'>{data.content}</Text>
      </View>
    </SafeAreaView>
  )
}
