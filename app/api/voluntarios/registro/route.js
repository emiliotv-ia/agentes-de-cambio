import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, oferta, comentario, institucion_id } = body

    if (!nombre || !email) {
      return Response.json({ error: 'Nombre y email son requeridos' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('voluntarios')
      .insert([{
        nombre,
        email,
        telefono: telefono || null,
        habilidades: Array.isArray(oferta) ? oferta.join(', ') : oferta || null,
        oferta: Array.isArray(oferta) ? oferta.join(', ') : oferta || null,
        comentario: comentario || null,
        institucion_id: institucion_id || null,
        disponibilidad: 'disponible'
      }])
      .select()

    if (error) return Response.json({ error: error.message }, { status: 400 })

    return Response.json({ success: true, voluntario: data?.[0] }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message, success: false }, { status: 500 })
  }
}
