'use client'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [eventos, setEventos] = useState([])
  const [showUnite, setShowUnite] = useState(false)
  const [agenteData, setAgenteData] = useState({ nombre: "", email: "", telefono: "", localidad: "", motivacion: "" })
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    fetch('/api/eventos')
      .then(r => r.json())
      .then(d => { if (d.success) setEventos(d.eventos) })
      .catch(() => {})
  }, [])

  const formatFecha = (fecha) => {
    const d = new Date(fecha + 'T00:00:00')
    return d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F8FAF9", minHeight: "100vh" }}>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #0D4F3C 0%, #1A6B4F 60%, #2D8B6A 100%)",
        padding: "40px 24px 60px", color: "white", position: "relative", overflow: "hidden"
      }}>
        {/* Círculos decorativos */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, opacity: 0.7, marginBottom: 12, textTransform: "uppercase" }}>Resistencia, Chaco · Argentina</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 900, lineHeight: 1.1, margin: "0 0 16px 0" }}>
            Agentes de <span style={{ color: "#86EFAC" }}>Cambio</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.9, margin: "0 0 32px 0" }}>
            Conectamos ciudadanos con ganas de ayudar con las instituciones que más los necesitan.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/mapa" style={{
              background: "white", color: "#0D4F3C", padding: "14px 28px", borderRadius: 12,
              fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8
            }}>🗺️ Ver el Mapa</a>
            <button onClick={() => setShowUnite(true)} style={{
              background: "rgba(255,255,255,0.15)", color: "white", padding: "14px 28px",
              borderRadius: 12, fontWeight: 700, fontSize: 15, border: "2px solid rgba(255,255,255,0.4)",
              cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8
            }}>💚 Unite a Nosotros</button>
          </div>
        </div>
      </div>

      {/* QUIÉNES SOMOS */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 4, height: 32, background: "#0D4F3C", borderRadius: 4 }} />
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0D4F3C", margin: 0, fontFamily: "'Playfair Display', serif" }}>¿Quiénes Somos?</h2>
        </div>
        <div style={{ background: "white", borderRadius: 16, padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", lineHeight: 1.8 }}>
          <p style={{ color: "#374151", fontSize: 15, marginBottom: 16 }}>
            Creemos firmemente que cambiar el mundo no es una utopía, sino el resultado de miles de personas haciendo cosas pequeñas en el lugar correcto. Somos una plataforma diseñada para conectar: unimos a ciudadanos con ganas de sumar su <strong>"granito de arena"</strong> con las instituciones que más los necesitan.
          </p>
          <p style={{ color: "#374151", fontSize: 15, margin: 0 }}>
            Nacimos en Resistencia con una convicción clara: cada micro-acción cuenta. Queremos que tu intención de ayudar se transforme en un impacto real, eliminando la incertidumbre. Por eso, no solo te mostramos dónde ayudar, sino que <strong>certificamos y validamos</strong> cada espacio para que tu confianza sea el puente hacia un mundo mejor!
          </p>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, margin: "24px 0" }}>
          {[
            { num: "7+", label: "Instituciones" },
            { num: "100%", label: "Verificadas" },
            { num: "∞", label: "Impacto posible" }
          ].map(s => (
            <div key={s.label} style={{ background: "white", borderRadius: 12, padding: "20px 16px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#0D4F3C" }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CALENDARIO SOLIDARIO */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 4, height: 32, background: "#0D4F3C", borderRadius: 4 }} />
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0D4F3C", margin: 0, fontFamily: "'Playfair Display', serif" }}>📅 Calendario Solidario</h2>
          </div>
        </div>

        {eventos.length === 0 ? (
          <div style={{ background: "white", borderRadius: 16, padding: 32, textAlign: "center", color: "#9CA3AF", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
            <p>Cargando eventos...</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {eventos.map(ev => (
              <div key={ev.id} style={{
                background: "white", borderRadius: 16, padding: "20px 24px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)", display: "flex", gap: 16, alignItems: "flex-start"
              }}>
                <div style={{ background: "#F0FDF4", borderRadius: 12, padding: "12px 16px", textAlign: "center", minWidth: 60, flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#0D4F3C", lineHeight: 1 }}>
                    {new Date(ev.fecha + 'T00:00:00').getDate()}
                  </div>
                  <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>
                    {new Date(ev.fecha + 'T00:00:00').toLocaleDateString('es-AR', { month: 'short' })}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 16, fontWeight: 700, color: "#111827" }}>{ev.titulo}</h3>
                  <p style={{ margin: "0 0 8px 0", fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{ev.descripcion}</p>
                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#9CA3AF", flexWrap: "wrap" }}>
                    {ev.hora && <span>🕐 {ev.hora.slice(0,5)}</span>}
                    {ev.lugar && <span>📍 {ev.lugar}</span>}
                    {ev.organizador && <span>👥 {ev.organizador}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACCIONES */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 4, height: 32, background: "#0D4F3C", borderRadius: 4 }} />
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0D4F3C", margin: 0, fontFamily: "'Playfair Display', serif" }}>¿Qué querés hacer?</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <a href="/mapa" style={{
            background: "linear-gradient(135deg, #0D4F3C, #2D8B6A)", color: "white",
            borderRadius: 16, padding: "28px 20px", textDecoration: "none",
            display: "flex", flexDirection: "column", gap: 8
          }}>
            <span style={{ fontSize: 32 }}>🗺️</span>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Ver dónde ayudar</span>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Encontrá instituciones cerca tuyo</span>
          </a>
          <a href="/registrar" style={{
            background: "linear-gradient(135deg, #1E40AF, #3B82F6)", color: "white",
            borderRadius: 16, padding: "28px 20px", textDecoration: "none",
            display: "flex", flexDirection: "column", gap: 8
          }}>
            <span style={{ fontSize: 32 }}>🏢</span>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Registrar Proyecto</span>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Sumá tu institución al mapa</span>
          </a>
          <button onClick={() => setShowUnite(true)} style={{
            background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "white",
            borderRadius: 16, padding: "28px 20px", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: 8, textAlign: "left"
          }}>
            <span style={{ fontSize: 32 }}>💚</span>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Unite a Nosotros</span>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Sé parte del movimiento</span>
          </button>
          <div style={{
            background: "linear-gradient(135deg, #B45309, #F59E0B)", color: "white",
            borderRadius: 16, padding: "28px 20px",
            display: "flex", flexDirection: "column", gap: 8
          }}>
            <span style={{ fontSize: 32 }}>📅</span>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Próximos Eventos</span>
            <span style={{ fontSize: 12, opacity: 0.8 }}>{eventos.length} eventos solidarios</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D4F3C", padding: "20px 24px", textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
        <span style={{ fontWeight: 700, color: "#86EFAC" }}>Agentes de Cambio</span>
        {" · "}Chaco, Argentina{" · "}Cada acción cuenta 💚
      </footer>

      {/* MODAL UNITE A NOSOTROS */}
      {showUnite && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 480, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 6px 0", fontSize: 22, fontFamily: "'Playfair Display', serif" }}>💚 Unite a Nosotros</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 20px 0" }}>Sé parte del movimiento de agentes de cambio en el Chaco.</p>
            <form onSubmit={async e => {
              e.preventDefault()
              setEnviando(true)
              try {
                const res = await fetch('/api/agentes', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(agenteData)
                })
                const data = await res.json()
                if (data.success) {
                  alert(`✅ ¡Bienvenido ${agenteData.nombre}! Ya sos un Agente de Cambio.`)
                  setShowUnite(false)
                  setAgenteData({ nombre: "", email: "", telefono: "", localidad: "", motivacion: "" })
                } else {
                  alert(`❌ Error: ${data.error}`)
                }
              } catch (err) {
                alert('❌ Error: ' + err.message)
              } finally {
                setEnviando(false)
              }
            }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Tu nombre *" required value={agenteData.nombre} onChange={e => setAgenteData({...agenteData, nombre: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="email" placeholder="Tu email *" required value={agenteData.email} onChange={e => setAgenteData({...agenteData, email: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="tel" placeholder="Teléfono" value={agenteData.telefono} onChange={e => setAgenteData({...agenteData, telefono: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Localidad" value={agenteData.localidad} onChange={e => setAgenteData({...agenteData, localidad: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <textarea placeholder="¿Por qué querés ser Agente de Cambio?" value={agenteData.motivacion} onChange={e => setAgenteData({...agenteData, motivacion: e.target.value})} rows={3} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit" disabled={enviando} style={{ flex: 1, background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                  {enviando ? "Enviando..." : "¡Quiero unirme!"}
                </button>
                <button type="button" onClick={() => setShowUnite(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
