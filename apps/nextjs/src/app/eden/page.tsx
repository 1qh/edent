import api from '@a/eden'

export default async function Page() {
  const hello = await api.index.greet('world')
  return (
    <div>
      <h1>{hello}</h1>
    </div>
  )
}
