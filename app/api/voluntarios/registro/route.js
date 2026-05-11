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
    const { nombre, email, telefono, oferta, comentario, otros, institucion_id, institucion_nombre } = body

    if (!nombre || !email) {
      return Response.json({ error: 'Nombre y email son requeridos' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('voluntarios')
      .insert([{
        nombre, email,
        telefono: telefono || null,
        habilidades: Array.isArray(oferta) ? oferta : [],
        oferta: Array.isArray(oferta) ? oferta.join(', ') : oferta || null,
        comentario: comentario || null,
        institucion_id: institucion_id || null,
        disponibilidad: 'disponible'
      }])
      .select()

    if (error) return Response.json({ error: error.message }, { status: 400 })

    const ofertaTexto = Array.isArray(oferta) ? oferta.join(', ') : oferta || 'No especificado'
    const otrosTexto = otros ? ` · Otros: ${otros}` : ''

    // Email al admin
    try {
      await resend.emails.send({
        from: 'Agentes de Cambio <onboarding@resend.dev>',
        to: 'agentesdecambiochaco@gmail.com',
        subject: '🤝 Nuevo voluntario registrado',
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#0D4F3C;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:white;margin:0;font-size:22px">🤝 Nuevo Voluntario</h1>
          </div>
          <div style="background:#F8FAF9;padding:24px;border:1px solid #E5E7EB;border-radius:0 0 12px 12px">
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono || 'No indicado'}</p>
            <p><strong>Institución:</strong> ${institucion_nombre || 'No especificada'}</p>
            <p><strong>Puede ofrecer:</strong> ${ofertaTexto}${otrosTexto}</p>
            ${comentario ? `<p><strong>Comentario:</strong> ${comentario}</p>` : ''}
            <p style="color:#6B7280;font-size:12px;margin-top:16px">Agentes de Cambio · Chaco, Argentina</p>
          </div>
        </div>`
      })
    } catch (e) { console.error('Email admin error:', e) }

    // Email de bienvenida al voluntario
    try {
      await resend.emails.send({
        from: 'Agentes de Cambio <onboarding@resend.dev>',
        to: email,
        subject: '💚 ¡Bienvenido a Agentes de Cambio!',
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:linear-gradient(135deg,#0D4F3C,#2D8B6A);padding:32px 24px;border-radius:12px 12px 0 0;text-align:center">
            <h1 style="color:white;margin:0;font-size:26px">💚 ¡Bienvenido, ${nombre}!</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0">Ya sos un Agente de Cambio</p>
          </div>
          <div style="background:white;padding:28px 24px;border:1px solid #E5E7EB;border-radius:0 0 12px 12px">
            <p style="color:#374151;font-size:15px;line-height:1.7">Gracias por querer sumarte${institucion_nombre ? ` a <strong>${institucion_nombre}</strong>` : ''}. Tu intención de ayudar ya es un gran paso.</p>
            <p style="color:#374151;font-size:15px;line-height:1.7">Nos pondremos en contacto con vos a la brevedad para coordinar cómo podés colaborar.</p>
            <div style="background:#F0FDF4;border-radius:10px;padding:16px;margin:20px 0">
              <p style="margin:0;color:#0D4F3C;font-size:14px"><strong>Recordá:</strong> Cada pequeña acción genera un cambio real. Gracias por ser parte de esto. 🌿</p>
            </div>
            <p style="color:#6B7280;font-size:13px;text-align:center;margin-top:24px">
              <strong style="color:#0D4F3C">Agentes de Cambio</strong> · Chaco, Argentina<br>Pequeñas acciones, grandes cambios.
            </p>
          </div>
        </div>`
      })
    } catch (e) { console.error('Email bienvenida error:', e) }

    return Response.json({ success: true, voluntario: data?.[0] }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
