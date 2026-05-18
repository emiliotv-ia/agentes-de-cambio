import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    const { id } = await request.json()

    // 1. Obtener datos de la solicitud
    const { data: sol, error: errSol } = await supabase
      .from('solicitudes_instituciones')
      .select('*')
      .eq('id', id)
      .single()

    if (errSol || !sol) return Response.json({ error: 'Solicitud no encontrada' }, { status: 404 })

    // 2. Generar slug único
    const slug = sol.nombre
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // 3. Insertar en tabla instituciones
    const { data: inst, error: errInst } = await supabase
      .from('instituciones')
      .insert([{
        nombre: sol.nombre,
        slug,
        descripcion: sol.descripcion,
        direccion: sol.direccion,
        localidad: sol.localidad,
        latitud: sol.latitud,
        longitud: sol.longitud,
        telefono: sol.telefono1,
        whatsapp: sol.whatsapp || null,
        historia: sol.historia || null,
        necesidades_actuales: sol.necesidades || null,
        estado_verificacion: 'verificada',
        acepta_retiro: false,
        responsables: sol.nombre_encargado,
      }])
      .select()
      .single()

    if (errInst) return Response.json({ error: errInst.message }, { status: 400 })

    // 4. Actualizar estado de la solicitud y guardar el id de institución creada
    const { error: errUpdate } = await supabase
      .from('solicitudes_instituciones')
      .update({ estado: 'aprobada', institucion_id: inst.id })
      .eq('id', id)

    if (errUpdate) console.error('Error actualizando solicitud:', errUpdate)

    // 5. Migrar imágenes si las hay
    await supabase
      .from('institucion_imagenes')
      .update({ solicitud_id: inst.id })
      .eq('solicitud_id', id)

    return Response.json({ success: true, institucion_id: inst.id })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}