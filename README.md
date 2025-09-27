# Parcial 2 – Gestión de Posts (React + Vite + Tailwind)

Aplicación SPA construida con **React 19 + Vite 7 + Tailwind v4** que consume la API de [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts) para gestionar **posts** (CRUD simulado).  

## Características

- **Pantalla principal (`/`)**: Lista de posts con búsqueda por título y paginación simple (client-side).
- **Crear post (`/nuevo`)**: Formulario para añadir título y contenido.
- **Editar / Eliminar**: Modales accesibles (cerrar con Esc o click fuera).
- **UI optimista**: Los cambios se reflejan en la interfaz antes de la respuesta de la API.
- **Validaciones mínimas**: `title` requerido.
- **Feedback de usuario**: estados de carga y error.
- **Estado en memoria**: La “persistencia” se mantiene en el frontend (JSONPlaceholder no guarda cambios reales).

---

## Stack Técnico

- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [TailwindCSS v4](https://tailwindcss.com/)
- Fetch nativo para HTTP
- Estado con `useState` y `useEffect`
- Componentes reutilizables (Tabla, Modal, Form)

---

##  Instalación y ejecución local

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/parcial-2.git
cd parcial-2

# 2. Instala dependencias
npm install

# 3. Ejecuta en modo desarrollo
npm run dev

#4. Build para producción
npm run build

Deploy en Netlify

Crear un nuevo sitio en Netlify
.

Conectar el repositorio de GitHub.

Configurar:

Build command: npm run build

Publish directory: dist

Deploy automático en cada push.

URL pública del proyecto:

Notas

Persistencia: JSONPlaceholder no guarda cambios en su backend. Esta app mantiene los datos en memoria mientras navegas por la SPA.

UI optimista: Las actualizaciones se reflejan inmediatamente para mejorar la experiencia de usuario.

