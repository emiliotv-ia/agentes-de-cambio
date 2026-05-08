'use client'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [eventos, setEventos] = useState([])
  const [showUnite, setShowUnite] = useState(false)
  const [showEvento, setShowEvento] = useState(false)
  const [agenteData, setAgenteData] = useState({ nombre: "", email: "", telefono: "", localidad: "", motivacion: "" })
  const [eventoData, setEventoData] = useState({ titulo: "", descripcion: "", fecha: "", hora: "", lugar: "", localidad: "", organizador: "", contacto: "" })
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    fetch('/api/eventos')
      .then(r => r.json())
      .then(d => { if (d.success) setEventos(d.eventos) })
      .catch(() => {})
  }, [])

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F8FAF9", minHeight: "100vh" }}>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #0D4F3C 0%, #1A6B4F 60%, #2D8B6A 100%)", padding: "44px 24px 52px", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, opacity: 0.7, marginBottom: 12, textTransform: "uppercase" }}>Resistencia, Chaco · Argentina</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 900, lineHeight: 1.1, margin: "0 0 14px 0" }}>
            Agentes de <span style={{ color: "#86EFAC" }}>Cambio</span>
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.9, margin: "0 0 10px 0" }}>
            Esta plataforma te conecta con instituciones, comedores, refugios, organizaciones sociales y ONG's del Chaco donde podés <strong>ayudar y generar cambios reales.</strong>
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.75, margin: "0 0 28px 0" }}>
            Conectamos ciudadanos con ganas de sumar su granito de arena con las instituciones que más los necesitan.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="/mapa" style={{ background: "white", color: "#0D4F3C", padding: "13px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>🗺️ Ver el Mapa</a>
            <button onClick={() => setShowUnite(true)} style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "13px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: "2px solid rgba(255,255,255,0.35)", cursor: "pointer" }}>💚 Unite a Nosotros</button>
            <a href="/registrar" style={{ background: "rgba(255,255,255,0.1)", color: "white", padding: "13px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: "2px solid rgba(255,255,255,0.25)", textDecoration: "none" }}>🏢 Registrar Institución</a>
          </div>
        </div>
      </div>

      {/* FOTOS - IMPACTO REAL */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "44px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 4, height: 32, background: "#0D4F3C", borderRadius: 4 }} />
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0D4F3C", margin: 0 }}>El cambio se ve así 💚</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "1", position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80" alt="Niños felices" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.6))", padding: "20px 12px 12px", color: "white", fontSize: 12, fontWeight: 600 }}>Niños que sonríen</div>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "1", position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80" alt="Voluntarios" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.6))", padding: "20px 12px 12px", color: "white", fontSize: 12, fontWeight: 600 }}>Voluntarios en acción</div>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "1", position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80" alt="Donaciones" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.6))", padding: "20px 12px 12px", color: "white", fontSize: 12, fontWeight: 600 }}>Donaciones que llegan</div>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "1", position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80" alt="Comunidad" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.6))", padding: "20px 12px 12px", color: "white", fontSize: 12, fontWeight: 600 }}>Comunidad unida</div>
          </div>
        </div>
      </div>

      {/* QUÉ PODÉS HACER */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "44px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 4, height: 32, background: "#0D4F3C", borderRadius: 4 }} />
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0D4F3C", margin: 0 }}>¿Qué podés hacer?</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { icon: "🗺️", titulo: "Buscá por mapa", desc: "Descubrí instituciones cerca tuyo", link: "/mapa", color: "#F0FDF4", border: "#86EFAC" },
            { icon: "🔍", titulo: "Filtrá por tema", desc: "Niños, animales, salud, educación, y más", link: "/mapa", color: "#EFF6FF", border: "#93C5FD" },
            { icon: "🤝", titulo: "Sumate como voluntario", desc: "Doná tu tiempo, habilidades o recursos. TODO SUMA", link: "/mapa", color: "#FDF4FF", border: "#D8B4FE" },
            { icon: "🚚", titulo: "Doná materiales", desc: "Ropa, abrigos, alimentos, útiles escolares, muebles, juguetes, etc", link: "/mapa", color: "#FFF7ED", border: "#FCD34D" },
            { icon: "⭐", titulo: "Dejá reseñas", desc: "Ayudá a otros a elegir dónde ayudar", link: "/mapa", color: "#FFFBEB", border: "#FDE68A" },
          ].map((item, i) => (
            <a key={i} href={item.link} style={{ background: item.color, border: `1.5px solid ${item.border}`, borderRadius: 14, padding: "16px 20px", textDecoration: "none", display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#111827", fontSize: 15 }}>{item.titulo}</div>
                <div style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}>{item.desc}</div>
              </div>
              <span style={{ marginLeft: "auto", color: "#9CA3AF", fontSize: 18 }}>→</span>
            </a>
          ))}
        </div>
      </div>

      {/* QUIÉNES SOMOS */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "44px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 4, height: 32, background: "#0D4F3C", borderRadius: 4 }} />
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0D4F3C", margin: 0 }}>¿Quiénes Somos?</h2>
        </div>
        <div style={{ background: "white", borderRadius: 16, padding: "28px 28px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", lineHeight: 1.8 }}>
          <p style={{ color: "#374151", fontSize: 15, margin: "0 0 14px 0" }}>
            Creemos firmemente que cambiar el mundo no es una utopía, sino el resultado de miles de personas haciendo cosas pequeñas en el lugar correcto. Somos una plataforma diseñada para conectar: unimos a ciudadanos con ganas de sumar su <strong>"granito de arena"</strong> con las instituciones que más los necesitan.
          </p>
          <p style={{ color: "#374151", fontSize: 15, margin: 0 }}>
            Nacimos en Resistencia con una convicción clara: cada micro-acción cuenta. Queremos que tu intención de ayudar se transforme en un impacto real, eliminando la incertidumbre. Por eso, no solo te mostramos dónde ayudar, sino que <strong>certificamos y validamos</strong> cada espacio para que tu confianza sea el puente hacia un mundo mejor!
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16 }}>
          {[{ num: "7+", label: "Instituciones" }, { num: "100%", label: "Verificadas" }, { num: "∞", label: "Impacto posible" }].map(s => (
            <div key={s.label} style={{ background: "white", borderRadius: 12, padding: "18px 12px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#0D4F3C" }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CALENDARIO SOLIDARIO */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "44px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 4, height: 32, background: "#0D4F3C", borderRadius: 4 }} />
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0D4F3C", margin: 0 }}>📅 Calendario Solidario</h2>
          </div>
          <button onClick={() => setShowEvento(true)} style={{ background: "#0D4F3C", color: "white", border: "none", padding: "10px 16px", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>+ Registrá tu evento</button>
        </div>
        {eventos.length === 0 ? (
          <div style={{ background: "white", borderRadius: 16, padding: 32, textAlign: "center", color: "#9CA3AF", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
            <p style={{ margin: 0 }}>Cargando eventos...</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {eventos.map(ev => (
              <div key={ev.id} style={{ background: "white", borderRadius: 16, padding: "20px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ background: "#F0FDF4", borderRadius: 12, padding: "12px 14px", textAlign: "center", minWidth: 56, flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#0D4F3C", lineHeight: 1 }}>{new Date(ev.fecha + 'T00:00:00').getDate()}</div>
                  <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>{new Date(ev.fecha + 'T00:00:00').toLocaleDateString('es-AR', { month: 'short' })}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 15, fontWeight: 700, color: "#111827" }}>{ev.titulo}</h3>
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

      {/* ACCIONES RÁPIDAS */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "44px 24px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 4, height: 32, background: "#0D4F3C", borderRadius: 4 }} />
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0D4F3C", margin: 0 }}>Sumarte es fácil</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <a href="/mapa" style={{ background: "linear-gradient(135deg, #0D4F3C, #2D8B6A)", color: "white", borderRadius: 16, padding: "24px 20px", textDecoration: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 28 }}>🗺️</span>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Ver dónde ayudar</span>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Mapa con instituciones verificadas</span>
          </a>
          <a href="/registrar" style={{ background: "linear-gradient(135deg, #1E40AF, #3B82F6)", color: "white", borderRadius: 16, padding: "24px 20px", textDecoration: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 28 }}>🏢</span>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Registrar Proyecto</span>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Sumá tu institución al mapa</span>
          </a>
          <button onClick={() => setShowEvento(true)} style={{ background: "linear-gradient(135deg, #B45309, #F59E0B)", color: "white", borderRadius: 16, padding: "24px 20px", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
            <span style={{ fontSize: 28 }}>📅</span>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Registrar Evento</span>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Publicá tu evento solidario</span>
          </button>
          <button onClick={() => setShowUnite(true)} style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "white", borderRadius: 16, padding: "24px 20px", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
            <span style={{ fontSize: 28 }}>💚</span>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Unite a Nosotros</span>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Sé parte del movimiento</span>
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0D4F3C", padding: "20px 24px", textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
        <span style={{ fontWeight: 700, color: "#86EFAC" }}>Agentes de Cambio</span>{" · "}Chaco, Argentina{" · "}Cada acción cuenta 💚
      </footer>

      {/* MODAL UNITE */}
      {showUnite && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 460, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 6px 0", fontSize: 22 }}>💚 Unite a Nosotros</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 20px 0" }}>Sé parte del movimiento de agentes de cambio en el Chaco.</p>
            <form onSubmit={async e => {
              e.preventDefault(); setEnviando(true)
              try {
                const res = await fetch('/api/agentes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(agenteData) })
                const data = await res.json()
                if (data.success) { alert(`✅ ¡Bienvenido ${agenteData.nombre}! Ya sos un Agente de Cambio.`); setShowUnite(false); setAgenteData({ nombre: "", email: "", telefono: "", localidad: "", motivacion: "" }) }
                else alert(`❌ Error: ${data.error}`)
              } catch (err) { alert('❌ Error: ' + err.message) }
              finally { setEnviando(false) }
            }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Tu nombre *" required value={agenteData.nombre} onChange={e => setAgenteData({...agenteData, nombre: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="email" placeholder="Tu email *" required value={agenteData.email} onChange={e => setAgenteData({...agenteData, email: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="tel" placeholder="Teléfono" value={agenteData.telefono} onChange={e => setAgenteData({...agenteData, telefono: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Localidad" value={agenteData.localidad} onChange={e => setAgenteData({...agenteData, localidad: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <textarea placeholder="¿Por qué querés ser Agente de Cambio?" value={agenteData.motivacion} onChange={e => setAgenteData({...agenteData, motivacion: e.target.value})} rows={3} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit" disabled={enviando} style={{ flex: 1, background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>{enviando ? "Enviando..." : "¡Quiero unirme!"}</button>
                <button type="button" onClick={() => setShowUnite(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL REGISTRAR EVENTO */}
      {showEvento && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 6px 0", fontSize: 22 }}>📅 Registrá tu Evento Solidario</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 20px 0" }}>Publicá tu evento en el calendario para que más personas puedan sumarse.</p>
            <form onSubmit={async e => {
              e.preventDefault(); setEnviando(true)
              try {
                const res = await fetch('/api/eventos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(eventoData) })
                const data = await res.json()
                if (data.success) { alert(`✅ ¡Evento registrado! Lo revisaremos pronto.`); setShowEvento(false); setEventoData({ titulo: "", descripcion: "", fecha: "", hora: "", lugar: "", localidad: "", organizador: "", contacto: "" }) }
                else alert(`❌ Error: ${data.error}`)
              } catch (err) { alert('❌ Error: ' + err.message) }
              finally { setEnviando(false) }
            }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Nombre del evento *" required value={eventoData.titulo} onChange={e => setEventoData({...eventoData, titulo: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <textarea placeholder="Descripción del evento *" required value={eventoData.descripcion} onChange={e => setEventoData({...eventoData, descripcion: e.target.value})} rows={3} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <input type="date" required value={eventoData.fecha} onChange={e => setEventoData({...eventoData, fecha: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
                <input type="time" value={eventoData.hora} onChange={e => setEventoData({...eventoData, hora: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              </div>
              <input type="text" placeholder="Lugar" value={eventoData.lugar} onChange={e => setEventoData({...eventoData, lugar: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Localidad" value={eventoData.localidad} onChange={e => setEventoData({...eventoData, localidad: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Organizador" value={eventoData.organizador} onChange={e => setEventoData({...eventoData, organizador: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Contacto (teléfono o email)" value={eventoData.contacto} onChange={e => setEventoData({...eventoData, contacto: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
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