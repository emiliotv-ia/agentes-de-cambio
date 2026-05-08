import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    const { nombre, email, telefono, localidad, motivacion } = await request.json()
    if (!nombre || !email) return Response.json({ error: 'Nombre y email requeridos' }, { status: 400 })

    const { data, error } = await supabase
      .from('agentes')
      .insert([{ nombre, email, telefono, localidad, motivacion }])
      .select()

    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json({ success: true, agente: data?.[0] }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
