import type { Post } from '../types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}

export async function getPosts(): Promise<Post[]> {
  return http<Post[]>(`${BASE_URL}/posts`)
}

export async function createPost(data: Omit<Post, 'id'>): Promise<Post> {
  return http<Post>(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
  })
}

export async function updatePost(id: number, data: Partial<Post>): Promise<Post> {
  return http<Post>(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
  })
}

export async function deletePost(id: number): Promise<void> {
  await fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' })
}
