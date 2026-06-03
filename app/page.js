'use client'
import { useState } from 'react'

export default function LandingPage() {
  const [showUnite, setShowUnite] = useState(false)
  const [showEvento, setShowEvento] = useState(false)
  const [showQuienesSomos, setShowQuienesSomos] = useState(false)
  const [showDonacion, setShowDonacion] = useState(false)
  const [agenteData, setAgenteData] = useState({ nombre: "", email: "", telefono: "", localidad: "", motivacion: "" })
  const [donacionData, setDonacionData] = useState({ nombre: "", celular: "", tipos: [], ubicacion: "", comentario: "" })
  const [eventoData, setEventoData] = useState({ titulo: "", descripcion: "", fecha: "", hora: "", lugar: "", localidad: "", organizador: "", contacto: "" })
  const [showComoFunciona, setShowComoFunciona] = useState(false)
  const [showFiltrarInfo, setShowFiltrarInfo] = useState(false)
  const [showResenaInfo, setShowResenaInfo] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const cards = [
    { icon: "🚚", titulo: "Realizar una Donación", desc: "Si no sabés dónde llevar o a quién ayudar, hacé click acá", accion: "donacion", img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80" },
    { icon: "🏢", titulo: "Registrá tu Institución", desc: "Sumá tu organización al mapa. El registro es gratuito y verificado.", link: "/registrar", img: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=600&q=80" },
    { icon: "📅", titulo: "Calendario Solidario", desc: "Colectas, ferias, jornadas de voluntariado y más eventos solidarios.", link: "/calendario", img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80", extraBtn: true },
    { icon: "💚", titulo: "Postulate para ser un Agente de Cambio", desc: "Dejanos tu postulación o registrate para recibir novedades de tu zona.", accion: "postulate", img: "https://raw.githubusercontent.com/emiliotv-ia/agentes-de-cambio/main/public/voluntarios.png" },
  ]

  const handleCardClick = (item, e) => {
    if (item.accion === "donacion") { e.preventDefault(); setShowDonacion(true) }
    if (item.accion === "postulate") { e.preventDefault(); setShowUnite(true) }
  }

  const PanelHover = ({ titulo, texto, linkLabel, linkHref, accentColor = "#0D4F3C" }) => (
    <div className="info-panel" style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "white", borderRadius: 16, padding: "20px 24px", boxShadow: "0 8px 30px rgba(0,0,0,0.15)", zIndex: 100, opacity: 0, pointerEvents: "none", transition: "opacity 0.2s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 4, height: 22, background: accentColor, borderRadius: 4 }} />
        <h3 style={{ fontSize: 16, fontWeight: 800, color: accentColor, margin: 0 }}>{titulo}</h3>
      </div>
      <p style={{ color: "#4B5563", fontSize: 13, lineHeight: 1.6, margin: "0 0 14px 0" }}>{texto}</p>
      {linkLabel && <a href={linkHref} style={{ display: "inline-block", background: accentColor, color: "white", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>{linkLabel} →</a>}
    </div>
  )

  const ModalInfo = ({ show, onClose, titulo, texto, linkLabel, linkHref, accentColor = "#0D4F3C" }) => {
    if (!show) return null
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000, padding: 16 }}>
        <div style={{ background: "white", borderRadius: 16, padding: "24px 24px 32px", width: "100%", maxWidth: 500, boxShadow: "0 -8px 30px rgba(0,0,0,0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 4, height: 22, background: accentColor, borderRadius: 4 }} />
            <h3 style={{ fontSize: 18, fontWeight: 800, color: accentColor, margin: 0 }}>{titulo}</h3>
          </div>
          <p style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.65, margin: "0 0 20px 0" }}>{texto}</p>
          <div style={{ display: "flex", gap: 10 }}>
            {linkLabel && <a href={linkHref} style={{ flex: 1, background: accentColor, color: "white", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center" }}>{linkLabel} →</a>}
            <button onClick={onClose} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Cerrar</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", backgroundImage: "url('/agentesDcbio_Fondo.jpeg')", backgroundRepeat: "repeat", backgroundSize: "auto", backgroundAttachment: "fixed" }}>

      {/* HERO */}
      <div style={{ position: "relative", color: "white", overflow: "hidden" }}>
        <img src="/agentesDcbio_Fondo.jpeg" alt="Agentes de Cambio" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,79,60,0.85) 0%, rgba(26,107,79,0.75) 60%, rgba(45,139,106,0.65) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "52px 24px 48px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, opacity: 0.65, marginBottom: 8, textTransform: "uppercase" }}>Resistencia, Chaco · Argentina</div>
            <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 4 }}>Bienvenidos a</div>
            <h1 style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.05, margin: "0 0 16px 0" }}>Agentes de <span style={{ color: "#86EFAC" }}>Cambio</span></h1>
            <p style={{ fontSize: 15, lineHeight: 1.75, opacity: 0.92, margin: "0 0 10px 0" }}>Esta plataforma te conecta con instituciones, comedores, refugios, organizaciones sociales y ONG's del Chaco donde podés <strong>ayudar y generar cambios reales.</strong></p>
            <p style={{ fontSize: 14, lineHeight: 1.65, opacity: 0.72, margin: "0 0 28px 0" }}>Conectamos ciudadanos con ganas de sumar su granito de arena con las instituciones que más los necesitan.</p>
            <button onClick={() => setShowQuienesSomos(true)} style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "13px 28px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer" }}>👥 ¿Quiénes Somos? →</button>
          </div>
        </div>
      </div>

      {/* ── SECCIÓN PRINCIPAL: ¿Cómo querés ayudar? ── */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "44px 24px 0", paddingBottom: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 4, height: 32, background: "#0D4F3C", borderRadius: 4 }} />
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0D4F3C", margin: 0 }}>¿Cómo querés ayudar?</h2>
        </div>

        {/* 3 CTAs GRANDES */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* CTA 1: QUIERO DONAR */}
          <a href="#" onClick={e => { e.preventDefault(); setShowDonacion(true) }}
            style={{ borderRadius: 16, overflow: "hidden", textDecoration: "none", display: "block", position: "relative", height: 180, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", cursor: "pointer" }}>
            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80" alt="Quiero donar" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,79,60,0.88) 0%, rgba(13,79,60,0.5) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, padding: "0 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
              <div style={{ fontSize: 28 }}>🚚</div>
              <div style={{ fontWeight: 900, color: "white", fontSize: 20, lineHeight: 1.2 }}>Quiero donar</div>
              <div style={{ color: "#86EFAC", fontSize: 13, fontWeight: 600 }}>Encontrá dónde llevar tu ayuda cerca tuyo</div>
            </div>
            <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "8px 12px", color: "white", fontSize: 18, fontWeight: 700 }}>→</div>
          </a>

          {/* CTA 2: QUIERO SER VOLUNTARIO */}
          <a href="#" onClick={e => { e.preventDefault(); setShowUnite(true) }}
            style={{ borderRadius: 16, overflow: "hidden", textDecoration: "none", display: "block", position: "relative", height: 180, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", cursor: "pointer" }}>
            <img src="https://raw.githubusercontent.com/emiliotv-ia/agentes-de-cambio/main/public/voluntarios.png" alt="Quiero ser voluntario" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,79,60,0.88) 0%, rgba(13,79,60,0.5) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, padding: "0 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
              <div style={{ fontSize: 28 }}>💚</div>
              <div style={{ fontWeight: 900, color: "white", fontSize: 20, lineHeight: 1.2 }}>Quiero ser voluntario</div>
              <div style={{ color: "#86EFAC", fontSize: 13, fontWeight: 600 }}>Sumate a las organizaciones que te necesitan</div>
            </div>
            <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "8px 12px", color: "white", fontSize: 18, fontWeight: 700 }}>→</div>
          </a>

          {/* CTA 3: TENGO UNA INSTITUCIÓN */}
          <a href="/registrar"
            style={{ borderRadius: 16, overflow: "hidden", textDecoration: "none", display: "block", position: "relative", height: 180, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", cursor: "pointer" }}>
            <img src="https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=600&q=80" alt="Tengo una institución" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,79,60,0.88) 0%, rgba(13,79,60,0.5) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, padding: "0 24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
              <div style={{ fontSize: 28 }}>🏢</div>
              <div style={{ fontWeight: 900, color: "white", fontSize: 20, lineHeight: 1.2 }}>Tengo una institución</div>
              <div style={{ color: "#86EFAC", fontSize: 13, fontWeight: 600 }}>Registrá tu ONG y aparecé en el mapa — gratis</div>
            </div>
            <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "8px 12px", color: "white", fontSize: 18, fontWeight: 700 }}>→</div>
          </a>
        </div>

        {/* ACCIONES SECUNDARIAS */}
        <div style={{ marginTop: 20, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)", borderRadius: 16, padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.10)", border: "1px solid rgba(255,255,255,0.6)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>También podés…</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>

            {/* Mapa */}
            <a href="/mapa" style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: 7, borderRadius: 10, padding: "9px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none", color: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.25)", minWidth: 0 }}>
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&q=70" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(13,79,60,0.72)" }} />
              <span style={{ position: "relative", zIndex: 1 }}>🗺️ Ver el mapa</span>
            </a>

            {/* Calendario */}
            <a href="/calendario" style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: 7, borderRadius: 10, padding: "9px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none", color: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.25)", minWidth: 0 }}>
              <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&q=70" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(13,79,60,0.72)" }} />
              <span style={{ position: "relative", zIndex: 1 }}>📅 Calendario solidario</span>
            </a>

            {/* Reseña */}
            <a href="/mapa" style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: 7, borderRadius: 10, padding: "9px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none", color: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.25)", minWidth: 0 }}>
              <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=300&q=70" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(13,79,60,0.72)" }} />
              <span style={{ position: "relative", zIndex: 1 }}>⭐ Dejá tu reseña</span>
            </a>

            {/* Filtrar */}
            <a href="/mapa?lista=true" style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: 7, borderRadius: 10, padding: "9px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none", color: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.25)", minWidth: 0 }}>
              <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=300&q=70" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(13,79,60,0.72)" }} />
              <span style={{ position: "relative", zIndex: 1 }}>🔍 Filtrar por tema</span>
            </a>

            {/* Publicar evento */}
            <button onClick={() => setShowEvento(true)} style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: 7, borderRadius: 10, padding: "9px 16px", fontSize: 13, fontWeight: 700, color: "white", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.25)", cursor: "pointer", minWidth: 0 }}>
              <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&q=70" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(26,60,40,0.75)" }} />
              <span style={{ position: "relative", zIndex: 1 }}>➕ Publicar evento</span>
            </button>

          </div>
        </div>
      </div>

      <footer style={{ background: "#0D4F3C", padding: "20px 24px", marginTop: 60, textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
        <span style={{ fontWeight: 700, color: "#86EFAC" }}>Agentes de Cambio</span>{" · "}Chaco, Argentina{" · "}Cada acción cuenta 💚<br/>
        <a href="mailto:agentesdecambiochaco@gmail.com" style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 6, display: "inline-block" }}>agentesdecambiochaco@gmail.com</a><br/>
        <a href="/terminos" style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4, display: "inline-block", textDecoration: "underline" }}>Términos y Condiciones · Aviso Legal</a>
      </footer>

      {showQuienesSomos && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 600, width: "100%", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 16px 0", fontSize: 24 }}>👥 Quiénes Somos</h2>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.75, marginBottom: 14 }}>Creemos firmemente que cambiar el mundo no es una utopía, sino el resultado de miles de personas haciendo cosas pequeñas en el lugar correcto.</p>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.75, marginBottom: 14 }}>Agentes de Cambio nació del impulso de su fundador, <strong>Emilio Torregrosa</strong> (con el acompañamiento y ayuda de amigos), bajo una certeza simple pero poderosa: las grandes transformaciones comienzan con gestos cotidianos. Desde los 19 años, ha formado parte de distintos programas (jóvenes del Rotary Club, de la Iglesia católica, entre otros) y, de forma continua, ha venido realizando diferentes actividades sociales en la comunidad. Esa experiencia sembró la convicción de que saludar con un "buen día" al entrar a un negocio, tener la paciencia de acompañar y ayudar a un adulto mayor, ceder el paso en las esquinas o levantar un papel de la vereda, entre muchos otros ejemplos, son las micro-acciones que sanan el tejido social, mucho más de lo que creemos. Sostener esas actitudes es, en sí mismo, empezar a mejorar el mundo que nos rodea.</p>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.75, marginBottom: 14 }}>Con esa misma vocación de contagiar y motivar, decidimos ir más allá y crear este espacio. Esta es una plataforma diseñada para conectar: unimos a ciudadanos con ganas de sumar su <strong>"granito de arena"</strong> con las instituciones que más los necesitan, poniendo a disposición del donante información fiable y certera de las organizaciones (certificadas) de forma directa y segura.</p>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.75, margin: 0 }}>Nacimos en Resistencia con una convicción clara: cada pequeña acción cuenta. Queremos que tu intención de ayudar se transforme en un impacto real, eliminando la incertidumbre del "¿por dónde empiezo?" o "¿será que mi donación llega a destino?". Por eso, no solo te mostramos dónde podés colaborar, sino que <strong>certificamos y validamos</strong> cada espacio para que tu confianza sea el puente hacia un mundo mejor.</p>
            <button onClick={() => setShowQuienesSomos(false)} style={{ marginTop: 20, width: "100%", background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cerrar</button>
          </div>
        </div>
      )}

      {showUnite && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 460, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 6px 0", fontSize: 22 }}>💚 Postulate para ser un Agente de Cambio</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 20px 0" }}>Dejanos tu postulación o registrate sólo para recibir novedades de tu zona.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Tu nombre *" value={agenteData.nombre} onChange={e => setAgenteData({...agenteData, nombre: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="email" placeholder="Tu email *" value={agenteData.email} onChange={e => setAgenteData({...agenteData, email: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="tel" placeholder="Teléfono" value={agenteData.telefono} onChange={e => setAgenteData({...agenteData, telefono: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Localidad" value={agenteData.localidad} onChange={e => setAgenteData({...agenteData, localidad: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }}  />
              <textarea placeholder="¿Por qué querés ser Agente de Cambio? (opcional)" value={agenteData.motivacion} onChange={e => setAgenteData({...agenteData, motivacion: e.target.value})} rows={3} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button disabled={enviando} onClick={async () => {
                  if (!agenteData.nombre || !agenteData.email) { alert("Nombre y email son obligatorios"); return }
                  setEnviando(true)
                  try {
                    const res = await fetch('/api/agentes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(agenteData) })
                    const data = await res.json()
                    if (data.success) { alert("✅ ¡Bienvenido " + agenteData.nombre + "! Ya sos un Agente de Cambio."); setShowUnite(false); setAgenteData({ nombre: "", email: "", telefono: "", localidad: "", motivacion: "" }) }
                    else alert("❌ Error: " + data.error)
                  } catch (err) { alert("❌ Error: " + err.message) }
                  finally { setEnviando(false) }
                }} style={{ flex: 1, background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>{enviando ? "Enviando..." : "¡Quiero postularme!"}</button>
                <button onClick={() => setShowUnite(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEvento && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 6px 0", fontSize: 22 }}>📅 Registrá tu Evento Solidario</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 20px 0" }}>Publicá tu evento en el calendario solidario.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Nombre del evento *" value={eventoData.titulo} onChange={e => setEventoData({...eventoData, titulo: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <textarea placeholder="Descripción *" value={eventoData.descripcion} onChange={e => setEventoData({...eventoData, descripcion: e.target.value})} rows={3} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <input type="date" value={eventoData.fecha} onChange={e => setEventoData({...eventoData, fecha: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
                <input type="time" value={eventoData.hora} onChange={e => setEventoData({...eventoData, hora: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              </div>
              <input type="text" placeholder="Lugar" value={eventoData.lugar} onChange={e => setEventoData({...eventoData, lugar: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Localidad" value={eventoData.localidad} onChange={e => setEventoData({...eventoData, localidad: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Organizador" value={eventoData.organizador} onChange={e => setEventoData({...eventoData, organizador: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Contacto" value={eventoData.contacto} onChange={e => setEventoData({...eventoData, contacto: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button disabled={enviando} onClick={async () => {
                  if (!eventoData.titulo || !eventoData.descripcion || !eventoData.fecha) { alert("Completá los campos obligatorios"); return }
                  setEnviando(true)
                  try {
                    const res = await fetch('/api/eventos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(eventoData) })
                    const data = await res.json()
                    if (data.success) { alert("✅ ¡Evento registrado!"); setShowEvento(false); setEventoData({ titulo: "", descripcion: "", fecha: "", hora: "", lugar: "", localidad: "", organizador: "", contacto: "" }) }
                    else alert("❌ Error: " + data.error)
                  } catch (err) { alert("❌ Error: " + err.message) }
                  finally { setEnviando(false) }
                }} style={{ flex: 1, background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>{enviando ? "Enviando..." : "Publicar evento"}</button>
                <button onClick={() => setShowEvento(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDonacion && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 480, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#92400E", margin: "0 0 6px 0", fontSize: 22 }}>🚚 Registrá tu Donación</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 20px 0" }}>Completá el formulario y te contactamos para coordinar.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Tu nombre *" value={donacionData.nombre} onChange={e => setDonacionData({...donacionData, nombre: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="tel" placeholder="Tu celular *" value={donacionData.celular} onChange={e => setDonacionData({...donacionData, celular: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>¿Qué querés donar? (podés elegir varios)</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {["👕 Ropa", "🧥 Abrigos", "👟 Calzados", "🛋️ Bienes muebles", "🚗 Transporte", "📚 Refuerzo escolar", "🔧 Enseñanza de oficios", "🧸 Juguetes", "⏰ Tiempo / Acompañamiento", "🍱 Alimentos", "🏥 Medicamentos", "📦 Otros"].map(opt => (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer", padding: "6px 8px", borderRadius: 8, border: `1px solid ${donacionData.tipos.includes(opt) ? "#F59E0B" : "#E5E7EB"}`, background: donacionData.tipos.includes(opt) ? "#FEF3C7" : "white" }}>
                      <input type="checkbox" checked={donacionData.tipos.includes(opt)} onChange={e => setDonacionData({ ...donacionData, tipos: e.target.checked ? [...donacionData.tipos, opt] : donacionData.tipos.filter(t => t !== opt) })} style={{ accentColor: "#F59E0B" }} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
              <input type="text" placeholder="¿Dónde está el material? (ciudad, barrio, dirección aproximada)" value={donacionData.ubicacion} onChange={e => setDonacionData({...donacionData, ubicacion: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <textarea placeholder="Comentario adicional (opcional)" value={donacionData.comentario} onChange={e => setDonacionData({...donacionData, comentario: e.target.value})} rows={3} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button disabled={enviando} onClick={async () => {
                  if (!donacionData.nombre || !donacionData.celular || donacionData.tipos.length === 0) { alert("Completá nombre, celular y elegí al menos un tipo de donación"); return }
                  setEnviando(true)
                  try {
                    const res = await fetch('/api/donaciones', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(donacionData) })
                    const data = await res.json()
                    if (data.success) { alert("✅ ¡Gracias " + donacionData.nombre + "! Te contactamos pronto para coordinar."); setShowDonacion(false); setDonacionData({ nombre: "", celular: "", tipos: [], ubicacion: "", comentario: "" }) }
                    else alert("❌ Error: " + data.error)
                  } catch (err) { alert("❌ Error: " + err.message) }
                  finally { setEnviando(false) }
                }} style={{ flex: 1, background: "#F59E0B", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>{enviando ? "Enviando..." : "Registrar donación"}</button>
                <button onClick={() => setShowDonacion(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}