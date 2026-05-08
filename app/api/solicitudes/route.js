import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    const body = await request.json()
    const { nombre, direccion, localidad, latitud, longitud, nombre_encargado,
      telefono1, telefono2, whatsapp, tiene_personeria_juridica, respaldo_legal,
      descripcion, historia, tipo_ayuda, necesidades } = body

    if (!nombre || !direccion || !localidad || !nombre_encargado || !telefono1 || !descripcion) {
      return Response.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('solicitudes_instituciones')
      .insert([{
        nombre, direccion, localidad,
        latitud: latitud ? parseFloat(latitud) : null,
        longitud: longitud ? parseFloat(longitud) : null,
        nombre_encargado, telefono1, telefono2: telefono2 || null,
        whatsapp: whatsapp || null,
        tiene_personeria_juridica: tiene_personeria_juridica || false,
        respaldo_legal: respaldo_legal || null,
        descripcion, historia: historia || null,
        tipo_ayuda: tipo_ayuda || [],
        necesidades: necesidades || null,
        estado: 'pendiente'
      }])
      .select()

    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json({ success: true, solicitud: data?.[0] }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
