import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const tabla = searchParams.get('tabla')

    const tablas = {
      solicitudes: () => supabase.from('solicitudes_instituciones').select('*').order('created_at', { ascending: false }),
      voluntarios: () => supabase.from('voluntarios').select('*').order('created_at', { ascending: false }),
      mensajes: () => supabase.from('mensajes').select('*').order('created_at', { ascending: false }),
      resenas: () => supabase.from('resenas').select('*').order('created_at', { ascending: false }),
      instituciones: () => supabase.from('instituciones').select('*').order('nombre', { ascending: true }),
    }

    if (!tablas[tabla]) return Response.json({ error: 'Tabla no válida' }, { status: 400 })

    const { data, error } = await tablas[tabla]()
    if (error) return Response.json({ error: error.message }, { status: 400 })

    return Response.json({ success: true, data: data || [] })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
