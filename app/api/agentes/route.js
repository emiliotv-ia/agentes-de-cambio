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
    const { nombre, email, telefono, localidad, motivacion } = body

    if (!nombre || !email) {
      return Response.json({ error: 'Nombre y email son requeridos' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('voluntarios')
      .insert([{
        nombre,
        email,
        telefono: telefono || null,
        comentario: motivacion || null,
        habilidades: [],
        oferta: localidad ? `Localidad: ${localidad}` : null,
        disponibilidad: 'disponible'
      }])
      .select()

    if (error) return Response.json({ error: error.message }, { status: 400 })

    // Email al admin
    try {
      await resend.emails.send({
        from: 'Agentes de Cambio <noreply@agentesdecambio.com.ar>',
        to: ['agentesdecambiochaco@gmail.com', 'agentesdecambiochaco@hotmail.com'],
        subject: '🤝 Nuevo voluntario registrado — Agentes de Cambio',
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#0D4F3C;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:white;margin:0;font-size:22px">🤝 Nuevo voluntario registrado</h1>
            <p style="color:#86EFAC;margin:6px 0 0;font-size:14px">Alguien quiere ser Agente de Cambio</p>
          </div>
          <div style="background:#F8FAF9;padding:24px;border:1px solid #E5E7EB;border-radius:0 0 12px 12px">
            <p style="margin:0 0 10px"><strong>Nombre:</strong> ${nombre}</p>
            <p style="margin:0 0 10px"><strong>Email:</strong> <a href="mailto:${email}" style="color:#0D4F3C">${email}</a></p>
            <p style="margin:0 0 10px"><strong>Teléfono:</strong> ${telefono || 'No indicado'}</p>
            <p style="margin:0 0 10px"><strong>Localidad:</strong> ${localidad || 'No indicada'}</p>
            ${motivacion ? `<div style="background:#F0FDF4;border-radius:8px;padding:12px;margin-top:12px"><p style="margin:0;color:#0D4F3C;font-size:13px"><strong>Motivación:</strong> ${motivacion}</p></div>` : ''}
            <p style="color:#6B7280;font-size:12px;margin-top:20px;border-top:1px solid #E5E7EB;padding-top:12px">Agentes de Cambio · Chaco, Argentina</p>
          </div>
        </div>`
      })
    } catch (e) { console.error('Email admin error:', e) }

    // Email de bienvenida
    try {
      await resend.emails.send({
        from: 'Agentes de Cambio <noreply@agentesdecambio.com.ar>',
        to: email,
        subject: '💚 ¡Bienvenido a Agentes de Cambio!',
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:linear-gradient(135deg,#0D4F3C,#2D8B6A);padding:32px 24px;border-radius:12px 12px 0 0;text-align:center">
            <h1 style="color:white;margin:0;font-size:26px">💚 ¡Bienvenido, ${nombre}!</h1>
            <p style="color:#86EFAC;margin:12px 0 0;font-size:20px;font-weight:700;letter-spacing:1px">¡YA RECIBIMOS TU SOLICITUD!</p>
          </div>
          <div style="background:white;padding:28px 24px;border:1px solid #E5E7EB;border-radius:0 0 12px 12px">
            <p style="color:#374151;font-size:15px;line-height:1.7">¡Gracias por tu solicitud! Tu intención de ayudar ya es un gran cambio. 💚</p>
            <p style="color:#374151;font-size:15px;line-height:1.7">Podés contactarnos en cualquier momento por estos medios:</p>
            <div style="background:#F0FDF4;border-radius:10px;padding:16px;margin:16px 0">
              <p style="margin:0 0 6px;color:#0D4F3C;font-size:14px">📧 <strong>agentesdecambiochaco@hotmail.com</strong></p>
              <p style="margin:0;color:#0D4F3C;font-size:14px">📞 <strong>03624661923</strong></p>
            </div>
            <p style="color:#374151;font-size:15px;line-height:1.7">¡Contanos un poco más! <strong>¿Cuál sería tu contribución a la sociedad para ser un Agente de Cambio?</strong> Escribinos al mail de arriba y charlamos. 😊</p>
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

    return Response.json({ success: true, agente: data?.[0] }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}