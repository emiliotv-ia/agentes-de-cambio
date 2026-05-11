import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { nombre, email, telefono, descripcion, institucion_id, institucion_nombre, institucion_email } = await request.json()

    if (!nombre || !email || !descripcion) {
      return Response.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    // Guardar en Supabase
    const { data, error } = await supabase
      .from('donaciones')
      .insert([{
        institucion_id: institucion_id || null,
        tipo: 'materiales',
        descripcion,
        estado: 'pendiente'
      }])
      .select()

    if (error) return Response.json({ error: error.message }, { status: 400 })

    // Email al admin
    try {
      await resend.emails.send({
        from: 'Agentes de Cambio <onboarding@resend.dev>',
        to: 'agentesdecambiochaco@gmail.com',
        subject: `🚚 Nueva donación para ${institucion_nombre}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#B45309;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:white;margin:0;font-size:22px">🚚 Nueva Donación de Materiales</h1>
          </div>
          <div style="background:#F8FAF9;padding:24px;border:1px solid #E5E7EB;border-radius:0 0 12px 12px">
            <p><strong>Institución:</strong> ${institucion_nombre}</p>
            <p><strong>Donante:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono || 'No indicado'}</p>
            <p><strong>Qué dona:</strong> ${descripcion}</p>
            <p style="color:#6B7280;font-size:12px;margin-top:16px">Agentes de Cambio · Chaco, Argentina</p>
          </div>
        </div>`
      })
    } catch (e) { console.error('Email admin error:', e) }

    // Email a la institución
    if (institucion_email) {
      try {
        await resend.emails.send({
          from: 'Agentes de Cambio <onboarding@resend.dev>',
          to: institucion_email,
          subject: `🎁 Tenés una nueva donación de materiales`,
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:linear-gradient(135deg,#B45309,#F59E0B);padding:32px 24px;border-radius:12px 12px 0 0;text-align:center">
              <h1 style="color:white;margin:0;font-size:26px">🎁 ¡Tenés una donación!</h1>
              <p style="color:rgba(255,255,255,0.85);margin:8px 0 0 0">Alguien quiere ayudar a ${institucion_nombre}</p>
            </div>
            <div style="background:white;padding:28px 24px;border:1px solid #E5E7EB;border-radius:0 0 12px 12px">
              <p style="color:#374151;font-size:15px;line-height:1.7"><strong>${nombre}</strong> quiere donarle materiales a su institución a través de <strong>Agentes de Cambio</strong>.</p>
              <div style="background:#FEF3C7;border-radius:10px;padding:16px;margin:16px 0">
                <p style="margin:0 0 8px 0;color:#92400E;font-weight:700">¿Qué quiere donar?</p>
                <p style="margin:0;color:#78350F;font-size:14px;line-height:1.6">${descripcion}</p>
              </div>
              <div style="background:#F0FDF4;border-radius:10px;padding:16px;margin:16px 0">
                <p style="margin:0 0 8px 0;color:#0D4F3C;font-weight:700">Datos de contacto del donante:</p>
                <p style="margin:0;color:#374151;font-size:14px">📧 ${email}<br>${telefono ? `📞 ${telefono}` : ''}</p>
              </div>
              <p style="color:#374151;font-size:14px;line-height:1.7">Ponete en contacto con ${nombre} para coordinar la entrega. ¡Cada donación cuenta!</p>
              <p style="color:#6B7280;font-size:13px;text-align:center;margin-top:24px">
                <strong style="color:#0D4F3C">Agentes de Cambio</strong> · Chaco, Argentina
              </p>
            </div>
          </div>`
        })
      } catch (e) { console.error('Email institucion error:', e) }
    }

    return Response.json({ success: true, donacion: data?.[0] }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
