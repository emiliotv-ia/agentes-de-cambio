import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    const body = await request.json()
    const { nombre, slug, descripcion, direccion, localidad, latitud, longitud,
      telefono, email, whatsapp, instagram, historia, responsables, dirigido_a,
      anio_fundacion, estado_verificacion, acepta_retiro } = body

    const { data, error } = await supabase
      .from('instituciones')
      .insert([{
        nombre, slug, descripcion, direccion, localidad,
        latitud: latitud || null, longitud: longitud || null,
        telefono: telefono || null, email: email || null,
        whatsapp: whatsapp || null, instagram: instagram || null,
        historia: historia || null, responsables: responsables || null,
        dirigido_a: dirigido_a || null,
        anio_fundacion: anio_fundacion || null,
        estado_verificacion: estado_verificacion || 'verificada',
        acepta_retiro: acepta_retiro || false,
        promedio: 0, total_resenas: 0
      }])
      .select()

    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json({ success: true, institucion: data?.[0] }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json()
    const { error } = await supabase.from('instituciones').delete().eq('id', id)
    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, descripcion, historia, responsables, dirigido_a, whatsapp, instagram, anio_fundacion, estado_verificacion } = body

    const { error } = await supabase
      .from('instituciones')
      .update({
        descripcion, historia, responsables, dirigido_a,
        whatsapp, instagram,
        anio_fundacion: anio_fundacion ? parseInt(anio_fundacion) : null,
        estado_verificacion: estado_verificacion || 'en_proceso',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
