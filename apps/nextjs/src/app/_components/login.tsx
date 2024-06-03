import { auth, signIn, signOut } from '@a/auth'
import { Button } from '@a/ui/button'

export async function Login() {
  const session = await auth()
  if (!session) {
    return (
      <form>
        <Button
          formAction={async () => {
            'use server'
            await signIn('google')
          }}>
          Google log in
        </Button>
      </form>
    )
  }

  return (
    <form>
      <Button
        variant='ghost'
        formAction={async () => {
          'use server'
          await signOut()
        }}>
        Log out of {session.user.name}
      </Button>
    </form>
  )
}
