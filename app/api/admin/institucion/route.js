import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, descripcion, historia, responsables, dirigido_a, whatsapp, instagram, anio_fundacion } = body

    const { error } = await supabase
      .from('instituciones')
      .update({
        descripcion, historia, responsables, dirigido_a,
        whatsapp, instagram,
        anio_fundacion: anio_fundacion ? parseInt(anio_fundacion) : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
