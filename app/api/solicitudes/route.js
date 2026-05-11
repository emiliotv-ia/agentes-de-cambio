import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Email de notificación al admin
    try {
      await resend.emails.send({
        from: 'Agentes de Cambio <onboarding@resend.dev>',
        to: 'agentesdecambiochaco@gmail.com',
        subject: '🏢 Nueva solicitud de institución',
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1E40AF;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:white;margin:0;font-size:22px">🏢 Nueva Solicitud de Institución</h1>
          </div>
          <div style="background:#F8FAF9;padding:24px;border:1px solid #E5E7EB;border-radius:0 0 12px 12px">
            <p><strong>Institución:</strong> ${nombre}</p>
            <p><strong>Dirección:</strong> ${direccion}, ${localidad}</p>
            <p><strong>Responsable:</strong> ${nombre_encargado}</p>
            <p><strong>Teléfono 1:</strong> ${telefono1}</p>
            ${telefono2 ? `<p><strong>Teléfono 2:</strong> ${telefono2}</p>` : ''}
            ${whatsapp ? `<p><strong>WhatsApp:</strong> ${whatsapp}</p>` : ''}
            <p><strong>Personería jurídica:</strong> ${tiene_personeria_juridica ? 'Sí' : 'No'}${respaldo_legal ? ` (${respaldo_legal})` : ''}</p>
            <p><strong>Descripción:</strong> ${descripcion}</p>
            ${necesidades ? `<p><strong>Necesidades:</strong> ${necesidades}</p>` : ''}
            ${tipo_ayuda?.length ? `<p><strong>Tipo de ayuda:</strong> ${tipo_ayuda.join(', ')}</p>` : ''}
            <hr style="border:none;border-top:1px solid #E5E7EB;margin:16px 0">
            <p style="color:#6B7280;font-size:12px">Revisá la solicitud en Supabase → solicitudes_instituciones</p>
          </div>
        </div>`
      })
    } catch (e) { console.error('Email error:', e) }

    return Response.json({ success: true, solicitud: data?.[0] }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
