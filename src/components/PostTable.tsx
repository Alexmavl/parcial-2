import type { Post } from '../types'
import { Edit3, Trash2 } from 'lucide-react' // npm i lucide-react para íconos

interface Props {
  items: Post[]
  onEdit: (p: Post) => void
  onDelete: (p: Post) => void
}

export default function PostTable({ items, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">ID</th>
            <th className="px-4 py-3 text-left font-semibold">Título</th>
            <th className="px-4 py-3 text-left font-semibold">Contenido</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr
              key={p.id}
              className="border-t transition hover:bg-gray-50"
            >
              <td className="px-4 py-3 text-gray-600">{p.id}</td>
              <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
              <td className="px-4 py-3 text-gray-700 max-w-md truncate">
                {p.body.length > 100 ? p.body.slice(0, 100) + '…' : p.body}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-white shadow hover:bg-amber-600 transition"
                  >
                    <Edit3 size={16} />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-white shadow hover:bg-red-700 transition"
                  >
                    <Trash2 size={16} />
                    <span>Eliminar</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td className="px-4 py-8 text-center text-gray-500" colSpan={4}>
                No hay posts para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
