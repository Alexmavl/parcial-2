import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { deletePost, getPosts, updatePost } from '../api/posts'
import type { Post } from '../types'
import PostTable from '../components/PostTable'
import Modal from '../components/Modal'
import PostForm from '../components/PostForm'

const PAGE_SIZE = 10

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const [editing, setEditing] = useState<Post | null>(null)
  const [deleting, setDeleting] = useState<Post | null>(null)

  // recibir post creado vía navigation state desde /nuevo
  const location = useLocation() as { state?: { createdPost?: Post } }
  useEffect(() => {
    if (location.state?.createdPost) {
      setPosts((cur) => [location.state!.createdPost!, ...cur])
      window.history.replaceState({}, document.title) // limpiar state
    }
  }, [location.state])

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getPosts()
        setPosts(data)
        setError(null)
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? posts.filter((p) => p.title.toLowerCase().includes(q)) : posts
  }, [posts, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    // resetear a la primera página si cambia el filtro
    setPage(1)
  }, [query])

  async function saveEdit(data: { title: string; body: string }) {
    if (!editing) return
    // Optimista: actualizar UI antes de la respuesta
    setPosts((cur) => cur.map((p) => (p.id === editing.id ? { ...p, ...data } as Post : p)))
    try {
      await updatePost(editing.id, data)
    } finally {
      setEditing(null)
    }
  }

  async function confirmDelete() {
    if (!deleting) return
    setPosts((cur) => cur.filter((p) => p.id !== deleting.id))
    try {
      await deletePost(deleting.id)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link to="/nuevo" className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white">
          Añadir
        </Link>
      </header>

      <div className="flex items-center gap-3">
        <input
          placeholder="Buscar por título…"
          className="w-80 rounded-xl border px-3 py-2 outline-none focus:ring"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <span className="text-sm text-gray-500">Cargando…</span>}
        {error && <span className="text-sm text-red-600">Error: {error}</span>}
      </div>

      <PostTable
        items={current}
        onEdit={(p) => setEditing(p)}
        onDelete={(p) => setDeleting(p)}
      />

      {/* paginación simple */}
      <div className="flex items-center justify-end gap-2">
        <button
          className="rounded-lg border px-3 py-1 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ←
        </button>
        <span className="text-sm">
          Página {page} / {totalPages}
        </span>
        <button
          className="rounded-lg border px-3 py-1 disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          →
        </button>
      </div>

      {/* Editar */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `Editar #${editing.id}` : undefined}
        footer={null}
      >
        {editing && (
          <PostForm
            initial={editing}
            onSubmit={saveEdit}
            submitLabel="Actualizar"
          />
        )}
      </Modal>

      {/* Eliminar */}
      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Confirmar eliminación"
        footer={
          <>
            <button className="rounded-lg border px-4 py-2" onClick={() => setDeleting(null)}>
              Cancelar
            </button>
            <button className="rounded-lg bg-red-600 px-4 py-2 text-white" onClick={confirmDelete}>
              Eliminar
            </button>
          </>
        }
      >
        <p>¿Seguro que quieres eliminar el post #{deleting?.id}?</p>
      </Modal>
    </main>
  )
}
