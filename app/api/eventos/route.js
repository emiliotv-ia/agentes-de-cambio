import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .eq('estado', 'activo')
      .gte('fecha', new Date().toISOString().split('T')[0])
      .order('fecha', { ascending: true })
      .limit(20)

    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json({ success: true, eventos: data || [] })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
