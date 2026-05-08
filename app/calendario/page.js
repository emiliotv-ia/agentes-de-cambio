'use client'
import { useState, useEffect } from 'react'

export default function CalendarioPage() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEvento, setShowEvento] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [eventoData, setEventoData] = useState({ titulo: "", descripcion: "", fecha: "", hora: "", lugar: "", localidad: "", organizador: "", contacto: "" })
  const [mesFiltro, setMesFiltro] = useState("")

  useEffect(() => {
    fetch('/api/eventos')
      .then(r => r.json())
      .then(d => { if (d.success) setEventos(d.eventos) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const meses = [...new Set(eventos.map(ev => ev.fecha?.slice(0, 7)))].sort()

  const eventosFiltrados = mesFiltro
    ? eventos.filter(ev => ev.fecha?.startsWith(mesFiltro))
    : eventos

  const getNombreMes = (mesStr) => {
    if (!mesStr) return ""
    const [y, m] = mesStr.split('-')
    return new Date(y, m - 1, 1).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#F8FAF9", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #B45309, #F59E0B)", padding: "28px 24px 36px", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>← Volver al inicio</a>
          <h1 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 8px 0" }}>📅 Calendario Solidario</h1>
          <p style={{ fontSize: 14, opacity: 0.9, margin: 0 }}>Eventos, colectas, ferias y jornadas solidarias del Chaco</p>
        </div>
      </div>

      {/* FILTRO POR MES */}
      {meses.length > 1 && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 24px 0" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => setMesFiltro("")} style={{ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: !mesFiltro ? "#0D4F3C" : "#E5E7EB", color: !mesFiltro ? "white" : "#374151" }}>Todos</button>
            {meses.map(m => (
              <button key={m} onClick={() => setMesFiltro(m)} style={{ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: mesFiltro === m ? "#0D4F3C" : "#E5E7EB", color: mesFiltro === m ? "white" : "#374151", textTransform: "capitalize" }}>
                {getNombreMes(m)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LISTA DE EVENTOS */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 24px 0" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 48, color: "#9CA3AF" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
            <p>Cargando eventos...</p>
          </div>
        ) : eventosFiltrados.length === 0 ? (
          <div style={{ background: "white", borderRadius: 16, padding: 40, textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
            <h3 style={{ color: "#374151", margin: "0 0 8px 0" }}>No hay eventos próximos</h3>
            <p style={{ color: "#9CA3AF", fontSize: 14, margin: "0 0 24px 0" }}>¡Sé el primero en publicar un evento solidario!</p>
            <button onClick={() => setShowEvento(true)} style={{ background: "#0D4F3C", color: "white", border: "none", padding: "12px 24px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>+ Publicar evento</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {eventosFiltrados.map(ev => (
              <div key={ev.id} style={{ background: "white", borderRadius: 16, padding: "20px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                {/* Fecha */}
                <div style={{ background: "linear-gradient(135deg, #B45309, #F59E0B)", borderRadius: 14, padding: "14px 12px", textAlign: "center", minWidth: 64, flexShrink: 0, color: "white" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1 }}>{new Date(ev.fecha + 'T00:00:00').getDate()}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginTop: 2 }}>{new Date(ev.fecha + 'T00:00:00').toLocaleDateString('es-AR', { month: 'short' })}</div>
                  <div style={{ fontSize: 11, opacity: 0.85, marginTop: 1 }}>{new Date(ev.fecha + 'T00:00:00').getFullYear()}</div>
                </div>
                {/* Info */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 16, fontWeight: 700, color: "#111827" }}>{ev.titulo}</h3>
                  {ev.descripcion && <p style={{ margin: "0 0 10px 0", fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{ev.descripcion}</p>}
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {ev.hora && <span style={{ fontSize: 12, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 6 }}>🕐 {ev.hora.slice(0,5)} hs</span>}
                    {ev.lugar && <span style={{ fontSize: 12, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 6 }}>📍 {ev.lugar}{ev.localidad ? `, ${ev.localidad}` : ""}</span>}
                    {ev.organizador && <span style={{ fontSize: 12, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 6 }}>👥 {ev.organizador}</span>}
                    {ev.contacto && <span style={{ fontSize: 12, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 6 }}>📞 {ev.contacto}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTÓN PUBLICAR */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 24px 60px" }}>
        <button onClick={() => setShowEvento(true)} style={{ width: "100%", background: "#0D4F3C", color: "white", border: "none", padding: "16px", borderRadius: 14, fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          📅 + Publicar mi evento solidario
        </button>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D4F3C", padding: "20px 24px", textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
        <span style={{ fontWeight: 700, color: "#86EFAC" }}>Agentes de Cambio</span>{" · "}Chaco, Argentina{" · "}Cada acción cuenta 💚
      </footer>

      {/* MODAL REGISTRAR EVENTO */}
      {showEvento && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 6px 0", fontSize: 22 }}>📅 Publicar Evento Solidario</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 20px 0" }}>Tu evento será revisado antes de publicarse.</p>
            <form onSubmit={async e => {
              e.preventDefault(); setEnviando(true)
              try {
                const res = await fetch('/api/eventos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(eventoData) })
                const data = await res.json()
                if (data.success) { alert("✅ ¡Evento registrado! Lo revisaremos pronto."); setShowEvento(false); setEventoData({ titulo: "", descripcion: "", fecha: "", hora: "", lugar: "", localidad: "", organizador: "", contacto: "" }) }
                else alert("❌ Error: " + data.error)
              } catch (err) { alert("❌ Error: " + err.message) }
              finally { setEnviando(false) }
            }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Nombre del evento *" required value={eventoData.titulo} onChange={e => setEventoData({...eventoData, titulo: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <textarea placeholder="Descripción *" required value={eventoData.descripcion} onChange={e => setEventoData({...eventoData, descripcion: e.target.value})} rows={3} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <input type="date" required value={eventoData.fecha} onChange={e => setEventoData({...eventoData, fecha: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
                <input type="time" value={eventoData.hora} onChange={e => setEventoData({...eventoData, hora: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              </div>
              <input type="text" placeholder="Lugar" value={eventoData.lugar} onChange={e => setEventoData({...eventoData, lugar: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Localidad" value={eventoData.localidad} onChange={e => setEventoData({...eventoData, localidad: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Organizador" value={eventoData.organizador} onChange={e => setEventoData({...eventoData, organizador: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Contacto (tel o email)" value={eventoData.contacto} onChange={e => setEventoData({...eventoData, contacto: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit" disabled={enviando} style={{ flex: 1, background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>{enviando ? "Enviando..." : "Publicar evento"}</button>
                <button type="button" onClick={() => setShowEvento(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
