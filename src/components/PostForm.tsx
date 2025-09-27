import { useState } from 'react'
import type { Post } from '../types'

interface Props {
  initial?: Partial<Post>
  onSubmit: (data: { title: string; body: string }) => Promise<void> | void
  submitLabel?: string
}

export default function PostForm({ initial, onSubmit, submitLabel = 'Guardar' }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [body, setBody] = useState(initial?.body ?? '')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError('El título es requerido')
      return
    }
    setError(null)
    setPending(true)
    try {
      await onSubmit({ title: title.trim(), body })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Título *</label>
        <input
          className="w-full rounded-xl border p-2 outline-none focus:ring"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!error}
          required
        />
        {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Contenido</label>
        <textarea
          className="h-32 w-full resize-y rounded-xl border p-2 outline-none focus:ring"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button
        disabled={pending}
        className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60"
      >
        {pending ? 'Guardando…' : submitLabel}
      </button>
    </form>
  )
}
