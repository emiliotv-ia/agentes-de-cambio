import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cekzkqmpgztdvvaceatu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNla3prYW1wZ3p0ZHZ2YWNlYXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNzM1NTgsImV4cCI6MTczMjYyNTU1OH0.vI5xK-l-aR0ZTf3_RWkBRyIyM33t8DaqXA0b_6Tmo1k'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, oferta, institucion_id } = body

    // Validar campos requeridos
    if (!nombre || !email) {
      return Response.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('voluntarios')
      .insert([
        {
          nombre,
          email,
          telefono: telefono || null,
          habilidades: oferta?.join(', ') || null,
          institucion_id: institucion_id || null
        }
      ])
      .select()

    if (error) {
      return Response.json({ error: error.message }, { status: 400 })
    }

    return Response.json({
      success: true,
      message: 'Voluntario registrado correctamente',
      voluntario: data?.[0]
    }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
