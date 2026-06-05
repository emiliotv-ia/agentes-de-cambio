import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)

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

  try {
    await resend.emails.send({
      from: 'Agentes de Cambio <noreply@agentesdecambio.com.ar>',
      to: 'agentesdecambiochaco@gmail.com',
      subject: '📅 Nuevo evento solidario registrado',
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#0D4F3C;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:white;margin:0;font-size:22px">📅 Nuevo Evento Solidario</h1>
        </div>
        <div style="background:#F8FAF9;padding:24px;border:1px solid #E5E7EB;border-radius:0 0 12px 12px">
          <p><strong>Título:</strong> ${titulo}</p>
          <p><strong>Fecha:</strong> ${fecha}${hora ? ' · ' + hora : ''}</p>
          ${lugar ? `<p><strong>Lugar:</strong> ${lugar}${localidad ? ', ' + localidad : ''}</p>` : ''}
          ${organizador ? `<p><strong>Organizador:</strong> ${organizador}</p>` : ''}
          ${contacto ? `<p><strong>Contacto:</strong> ${contacto}</p>` : ''}
          ${descripcion ? `<p><strong>Descripción:</strong> ${descripcion}</p>` : ''}
          <p style="color:#6B7280;font-size:12px;margin-top:16px">Agentes de Cambio · Chaco, Argentina</p>
        </div>
      </div>`
    })
  } catch (e) { console.error('Email evento error:', e) }

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