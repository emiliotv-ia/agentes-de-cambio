export async function GET(request) {
  // Mock data de instituciones
  const instituciones = [
    { id: 1, nombre: "Comedor Infantil Los Angelitos", localidad: "Resistencia", telefono: "362-4551234" },
    { id: 2, nombre: "Refugio Animal Patitas Felices", localidad: "Resistencia", telefono: "362-4887766" },
    { id: 3, nombre: "Hogar de Ancianos San José", localidad: "Resistencia", telefono: "362-4423311" },
    { id: 4, nombre: "Merendero Rayito de Sol", localidad: "Barranqueras", telefono: "362-4998877" },
  ]

  try {
    const { searchParams } = new URL(request.url)
    const localidad = searchParams.get('localidad')
    const tema = searchParams.get('tema')

    let filtered = instituciones

    if (localidad) {
      filtered = filtered.filter(i => i.localidad === localidad)
    }

    if (tema) {
      const term = tema.toLowerCase()
      filtered = filtered.filter(i => i.nombre.toLowerCase().includes(term))
    }

    return Response.json({
      success: true,
      count: filtered.length,
      instituciones: filtered
    })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
