'use client'
import { useState, useEffect } from 'react'

export default function CalendarioPage() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [eventoData, setEventoData] = useState({ titulo: "", descripcion: "", fecha: "", hora: "", lugar: "", localidad: "", organizador: "", contacto: "" })

  useEffect(() => {
    fetch('/api/eventos')
      .then(r => r.json())
      .then(data => {
        if (data.eventos) setEventos(data.eventos)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const hoy = new Date()
  const proximos = eventos.filter(e => new Date(e.fecha) >= hoy).sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
  const pasados = eventos.filter(e => new Date(e.fecha) < hoy).sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  const formatFecha = (fecha) => {
    if (!fecha) return ""
    const d = new Date(fecha + 'T12:00:00')
    return d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }

  const EventoCard = ({ evento }) => (
    <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB" }}>
      <div style={{ background: "linear-gradient(135deg, #B45309, #F59E0B)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "8px 12px", textAlign: "center", minWidth: 52 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: "white", lineHeight: 1 }}>
            {new Date(evento.fecha + 'T12:00:00').getDate()}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: 1 }}>
            {new Date(evento.fecha + 'T12:00:00').toLocaleDateString('es-AR', { month: 'short' })}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, color: "white", fontSize: 15, lineHeight: 1.3 }}>{evento.titulo}</div>
          {evento.organizador && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>por {evento.organizador}</div>}
        </div>
      </div>
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        {evento.descripcion && <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.5, margin: 0 }}>{evento.descripcion}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 12, color: "#6B7280", marginTop: 4 }}>
          {evento.hora && <span>🕐 {evento.hora}</span>}
          {evento.lugar && <span>📍 {evento.lugar}</span>}
          {evento.localidad && <span>🏙️ {evento.localidad}</span>}
          {evento.contacto && <span>📞 {evento.contacto}</span>}
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#F8FAF9", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #B45309 0%, #F59E0B 100%)", padding: "40px 24px 32px", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, top: -20, fontSize: 120, opacity: 0.1 }}>📅</div>
        <a href="/" style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16 }}>← Volver al inicio</a>
        <h1 style={{ fontSize: 32, fontWeight: 900, margin: "0 0 8px 0", lineHeight: 1.1 }}>📅 Calendario Solidario</h1>
        <p style={{ fontSize: 14, opacity: 0.9, margin: "0 0 24px 0", lineHeight: 1.6 }}>Colectas, ferias, jornadas de voluntariado y más eventos solidarios en el Chaco.</p>
        <button onClick={() => setShowForm(true)} style={{ background: "white", color: "#B45309", padding: "12px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>+ Publicar mi evento</button>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px" }}>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9CA3AF" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
            <p>Cargando eventos...</p>
          </div>
        ) : proximos.length === 0 && pasados.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9CA3AF" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#6B7280" }}>No hay eventos publicados aún</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>¡Sé el primero en publicar un evento solidario!</p>
            <button onClick={() => setShowForm(true)} style={{ marginTop: 16, background: "#B45309", color: "white", padding: "10px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>+ Publicar evento</button>
          </div>
        ) : (
          <>
            {proximos.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 4, height: 28, background: "#B45309", borderRadius: 4 }} />
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "#B45309", margin: 0 }}>Próximos eventos ({proximos.length})</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {proximos.map((e, i) => <EventoCard key={i} evento={e} />)}
                </div>
              </div>
            )}
            {pasados.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 4, height: 28, background: "#9CA3AF", borderRadius: 4 }} />
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "#9CA3AF", margin: 0 }}>Eventos anteriores</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, opacity: 0.7 }}>
                  {pasados.map((e, i) => <EventoCard key={i} evento={e} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <footer style={{ background: "#0D4F3C", padding: "20px 24px", textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
        <span style={{ fontWeight: 700, color: "#86EFAC" }}>Agentes de Cambio</span>{" · "}Chaco, Argentina{" · "}Cada acción cuenta 💚
      </footer>

      {/* MODAL PUBLICAR EVENTO */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#B45309", margin: "0 0 6px 0", fontSize: 22 }}>📅 Publicar Evento Solidario</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 20px 0" }}>Tu evento será publicado en el calendario.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Nombre del evento *" required value={eventoData.titulo} onChange={e => setEventoData({...eventoData, titulo: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <textarea placeholder="Descripción *" required value={eventoData.descripcion} onChange={e => setEventoData({...eventoData, descripcion: e.target.value})} rows={3} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>Fecha *</label><input type="date" required value={eventoData.fecha} onChange={e => setEventoData({...eventoData, fecha: e.target.value})} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} /></div>
                <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>Hora</label><input type="time" value={eventoData.hora} onChange={e => setEventoData({...eventoData, hora: e.target.value})} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} /></div>
              </div>
              <input type="text" placeholder="Lugar (ej: Parque 2 de Febrero)" value={eventoData.lugar} onChange={e => setEventoData({...eventoData, lugar: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Localidad" value={eventoData.localidad} onChange={e => setEventoData({...eventoData, localidad: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Organizador / Institución" value={eventoData.organizador} onChange={e => setEventoData({...eventoData, organizador: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Contacto (tel o email)" value={eventoData.contacto} onChange={e => setEventoData({...eventoData, contacto: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  disabled={enviando}
                  onClick={async () => {
                    if (!eventoData.titulo || !eventoData.descripcion || !eventoData.fecha) { alert("Completá nombre, descripción y fecha"); return }
                    setEnviando(true)
                    try {
                      const res = await fetch('/api/eventos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(eventoData) })
                      const data = await res.json()
                      if (data.success) {
                        alert("✅ ¡Evento publicado!")
                        setShowForm(false)
                        setEventoData({ titulo: "", descripcion: "", fecha: "", hora: "", lugar: "", localidad: "", organizador: "", contacto: "" })
                        // Recargar eventos
                        fetch('/api/eventos').then(r => r.json()).then(d => { if (d.success) setEventos(d.eventos || []) })
                      } else alert("❌ Error: " + data.error)
                    } catch (err) { alert("❌ Error: " + err.message) }
                    finally { setEnviando(false) }
                  }}
                  style={{ flex: 1, background: "#B45309", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}
                >{enviando ? "Publicando..." : "Publicar evento"}</button>
                <button onClick={() => setShowForm(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}