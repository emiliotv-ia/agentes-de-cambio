import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cekzkqmpgztdvvaceatu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNla3prYW1wZ3p0ZHZ2YWNlYXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNzM1NTgsImV4cCI6MTczMjYyNTU1OH0.vI5xK-l-aR0ZTf3_RWkBRyIyM33t8DaqXA0b_6Tmo1k'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET(request) {
  try {
    const { data, error } = await supabase
      .from('instituciones')
      .select('localidad', { count: 'exact' })
      .neq('localidad', null)

    if (error) {
      return Response.json({ error: error.message }, { status: 400 })
    }

    // Obtener localidades únicas y ordenadas
    const localidades = [...new Set(data?.map(i => i.localidad) || [])]
      .filter(Boolean)
      .sort()

    return Response.json({
      success: true,
      count: localidades.length,
      localidades
    })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
