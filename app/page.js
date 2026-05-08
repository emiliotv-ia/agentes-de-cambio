'use client'
import { useState } from 'react'

export default function LandingPage() {
  const [showUnite, setShowUnite] = useState(false)
  const [showEvento, setShowEvento] = useState(false)
  const [showQuienesSomos, setShowQuienesSomos] = useState(false)
  const [agenteData, setAgenteData] = useState({ nombre: "", email: "", telefono: "", localidad: "", motivacion: "" })
  const [eventoData, setEventoData] = useState({ titulo: "", descripcion: "", fecha: "", hora: "", lugar: "", localidad: "", organizador: "", contacto: "" })
  const [enviando, setEnviando] = useState(false)

  const acciones = [
    { icon: "🗺️", titulo: "Buscá en el mapa", desc: "Descubrí instituciones cerca tuyo", link: "/mapa", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80" },
    { icon: "🔍", titulo: "Filtrá por tema", desc: "Niños, animales, salud, educación y más", link: "/mapa", img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80" },
    { icon: "🤝", titulo: "Sumate como voluntario", desc: "Doná tu tiempo, habilidades o recursos. TODO SUMA", link: "/mapa", img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80" },
    { icon: "🚚", titulo: "Doná materiales", desc: "Ropa, abrigos, alimentos, útiles, muebles, juguetes", link: "/mapa", img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80" },
    { icon: "⭐", titulo: "Dejá tu reseña", desc: "Ayudá a otros a elegir dónde ayudar", link: "/mapa", img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80", estrellas: true },
  ]

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#F8FAF9", minHeight: "100vh" }}>

      <div style={{ position: "relative", color: "white", overflow: "hidden" }}>
        {/* Imagen de fondo */}
        <img src="/agentesDcbio_Fondo.jpeg" alt="Agentes de Cambio" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        {/* Overlay verde */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,79,60,0.85) 0%, rgba(26,107,79,0.75) 60%, rgba(45,139,106,0.65) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "52px 24px 48px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, opacity: 0.65, marginBottom: 8, textTransform: "uppercase" }}>Resistencia, Chaco · Argentina</div>
          <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 4 }}>Bienvenidos a</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.05, margin: "0 0 16px 0" }}>
            Agentes de <span style={{ color: "#86EFAC" }}>Cambio</span>
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.75, opacity: 0.92, margin: "0 0 10px 0" }}>
            Esta plataforma te conecta con instituciones, comedores, refugios, organizaciones sociales y ONG's del Chaco donde podés <strong>ayudar y generar cambios reales.</strong>
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.65, opacity: 0.72, margin: "0 0 28px 0" }}>
            Conectamos ciudadanos con ganas de sumar su granito de arena con las instituciones que más los necesitan.
          </p>
          <button onClick={() => setShowQuienesSomos(true)} style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "13px 28px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer" }}>
            👥 ¿Quiénes Somos? →
          </button>
        </div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "44px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 4, height: 32, background: "#0D4F3C", borderRadius: 4 }} />
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0D4F3C", margin: 0 }}>¿Qué podés hacer?</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {acciones.map((item, i) => (
            <a key={i} href={item.link} style={{ borderRadius: 16, overflow: "hidden", textDecoration: "none", display: "block", position: "relative", height: 160, boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              <img src={item.img} alt={item.titulo} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, padding: "0 20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
                <div style={{ fontSize: 24 }}>{item.icon}</div>
                <div style={{ fontWeight: 800, color: "white", fontSize: 17, lineHeight: 1.2 }}>{item.titulo}</div>
                <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>{item.desc}</div>
                {item.estrellas && <div style={{ display: "flex", gap: 2, marginTop: 2 }}>{[1,2,3,4,5].map(n => <span key={n} style={{ fontSize: 14 }}>⭐</span>)}</div>}
              </div>
              <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 10px", color: "white", fontSize: 16, fontWeight: 700 }}>→</div>
            </a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ background: "linear-gradient(135deg, #1E40AF, #3B82F6)", borderRadius: 20, padding: "32px 28px", color: "white", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -10, top: -10, fontSize: 90, opacity: 0.1 }}>🏢</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px 0" }}>🏢 Registrá tu Institución</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.9, margin: "0 0 24px 0" }}>Sumá tu organización al mapa. El registro es gratuito y tu institución será verificada por nuestro equipo.</p>
          <a href="/registrar" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "#1E40AF", padding: "13px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Registrar mi institución →</a>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "16px 24px 0" }}>
        <div style={{ background: "linear-gradient(135deg, #B45309, #F59E0B)", borderRadius: 20, padding: "32px 28px", color: "white", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -10, top: -10, fontSize: 90, opacity: 0.1 }}>📅</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px 0" }}>📅 Calendario Solidario</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.9, margin: "0 0 24px 0" }}>Colectas, ferias, jornadas de voluntariado y más eventos solidarios cerca tuyo.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/calendario" style={{ background: "white", color: "#B45309", padding: "13px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Ver eventos →</a>
            <button onClick={() => setShowEvento(true)} style={{ background: "rgba(255,255,255,0.2)", color: "white", padding: "13px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer" }}>+ Publicar evento</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "16px 24px 60px" }}>
        <div style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", borderRadius: 20, padding: "32px 28px", color: "white", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -10, top: -10, fontSize: 90, opacity: 0.1 }}>💚</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px 0" }}>💚 Unite a Nosotros</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.9, margin: "0 0 24px 0" }}>Registrate como Agente de Cambio y recibí novedades de tu zona.</p>
          <button onClick={() => setShowUnite(true)} style={{ background: "white", color: "#7C3AED", padding: "13px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>Quiero unirme →</button>
        </div>
      </div>

      <footer style={{ background: "#0D4F3C", padding: "20px 24px", textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
        <span style={{ fontWeight: 700, color: "#86EFAC" }}>Agentes de Cambio</span>{" · "}Chaco, Argentina{" · "}Cada acción cuenta 💚
      </footer>

      {showQuienesSomos && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 500, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 16px 0", fontSize: 24 }}>👥 Quiénes Somos</h2>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.75, marginBottom: 14 }}>Creemos firmemente que cambiar el mundo no es una utopía, sino el resultado de miles de personas haciendo cosas pequeñas en el lugar correcto. Somos una plataforma diseñada para conectar: unimos a ciudadanos con ganas de sumar su <strong>"granito de arena"</strong> con las instituciones que más los necesitan.</p>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.75, margin: 0 }}>Nacimos en Resistencia con una convicción clara: cada micro-acción cuenta. Queremos que tu intención de ayudar se transforme en un impacto real, eliminando la incertidumbre. Por eso, no solo te mostramos dónde ayudar, sino que <strong>certificamos y validamos</strong> cada espacio para que tu confianza sea el puente hacia un mundo mejor!</p>
            <button onClick={() => setShowQuienesSomos(false)} style={{ marginTop: 20, width: "100%", background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cerrar</button>
          </div>
        </div>
      )}

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
                if (data.success) { alert("✅ ¡Bienvenido " + agenteData.nombre + "! Ya sos un Agente de Cambio."); setShowUnite(false); setAgenteData({ nombre: "", email: "", telefono: "", localidad: "", motivacion: "" }) }
                else alert("❌ Error: " + data.error)
              } catch (err) { alert("❌ Error: " + err.message) }
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

      {showEvento && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 6px 0", fontSize: 22 }}>📅 Registrá tu Evento Solidario</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 20px 0" }}>Publicá tu evento en el calendario solidario.</p>
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
              <input type="text" placeholder="Contacto" value={eventoData.contacto} onChange={e => setEventoData({...eventoData, contacto: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
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