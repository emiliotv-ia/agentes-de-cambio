import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET() {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .order('fecha', { ascending: false })
  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json({ eventos: data || [] })
}

export async function POST(request) {
  const body = await request.json()
  const { titulo, descripcion, fecha, hora, lugar, localidad, organizador, contacto } = body
  if (!titulo || !fecha) return Response.json({ error: 'Título y fecha requeridos' }, { status: 400 })
  const { data, error } = await supabase.from('eventos').insert([{ titulo, descripcion, fecha, hora: hora || null, lugar: lugar || null, localidad: localidad || null, organizador: organizador || null, contacto: contacto || null, estado: 'activo' }]).select()
  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json({ success: true, evento: data?.[0] }, { status: 201 })
}

export async function PUT(request) {
  const body = await request.json()
  const { id, ...fields } = body
  if (!id) return Response.json({ error: 'ID requerido' }, { status: 400 })
  const { error } = await supabase.from('eventos').update(fields).eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json({ success: true })
}

export async function DELETE(request) {
  const { id } = await request.json()
  if (!id) return Response.json({ error: 'ID requerido' }, { status: 400 })
  const { error } = await supabase.from('eventos').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json({ success: true })
}
