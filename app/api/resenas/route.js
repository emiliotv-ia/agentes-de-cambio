import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    const { nombre, comentario, calificacion, institucion_id } = await request.json()

    if (!comentario || !institucion_id) {
      return Response.json({ error: 'Comentario e institución son requeridos' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('resenas')
      .insert([{
        institucion_id,
        calificacion: calificacion || 5,
        comentario,
        estado_verificacion: false
      }])
      .select()

    if (error) return Response.json({ error: error.message }, { status: 400 })

    return Response.json({ success: true, resena: data?.[0] }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
