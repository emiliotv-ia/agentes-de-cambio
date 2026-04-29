import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const localidad = searchParams.get('localidad')
    const tema = searchParams.get('tema')

    let query = supabase.from('instituciones').select('*').limit(50)

    if (localidad) query = query.eq('localidad', localidad)
    if (tema) query = query.or(`nombre.ilike.%${tema}%,descripcion.ilike.%${tema}%`)

    const { data, error } = await query

    if (error) return Response.json({ error: error.message }, { status: 400 })

    return Response.json({ success: true, count: data?.length || 0, instituciones: data || [] })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
