import { useNavigate } from 'react-router-dom'
import { createPost } from '../api/posts'
import PostForm from '../components/PostForm'
import type { Post } from '../types'

export default function NewPost() {
  const navigate = useNavigate()

  async function onSubmit({ title, body }: { title: string; body: string }) {
    // userId fijo = 1 (requisito)
    const created = await createPost({ title, body, userId: 1 } as Omit<Post, 'id'>)
    // UI optimista: volver y actualizar la lista con el nuevo post
    navigate('/', { state: { createdPost: created } })
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Nuevo Post</h1>
      <PostForm onSubmit={onSubmit} submitLabel="Crear" />
    </main>
  )
}
