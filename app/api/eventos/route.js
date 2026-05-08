import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .eq('estado', 'activo')
      .gte('fecha', new Date().toISOString().split('T')[0])
      .order('fecha', { ascending: true })
      .limit(20)

    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json({ success: true, eventos: data || [] })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { titulo, descripcion, fecha, hora, lugar, localidad, organizador, contacto } = await request.json()
    if (!titulo || !descripcion || !fecha) return Response.json({ error: 'Título, descripción y fecha son requeridos' }, { status: 400 })

    const { data, error } = await supabase
      .from('eventos')
      .insert([{ titulo, descripcion, fecha, hora: hora || null, lugar: lugar || null, localidad: localidad || null, organizador: organizador || null, contacto: contacto || null, estado: 'pendiente' }])
      .select()

    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json({ success: true, evento: data?.[0] }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
