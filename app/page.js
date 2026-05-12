'use client'
import { useState } from 'react'

export default function LandingPage() {
  const [showUnite, setShowUnite] = useState(false)
  const [showEvento, setShowEvento] = useState(false)
  const [showQuienesSomos, setShowQuienesSomos] = useState(false)
  const [showVoluntario, setShowVoluntario] = useState(false)
  const [showDonacion, setShowDonacion] = useState(false)
  const [agenteData, setAgenteData] = useState({ nombre: "", email: "", telefono: "", localidad: "", motivacion: "" })
  const [voluntarioData, setVoluntarioData] = useState({ nombre: "", email: "", telefono: "", localidad: "", disponibilidad: "", quePuedoOfrecer: "" })
  const [donacionData, setDonacionData] = useState({ nombre: "", celular: "", tipos: [], ubicacion: "", comentario: "" })
  const [eventoData, setEventoData] = useState({ titulo: "", descripcion: "", fecha: "", hora: "", lugar: "", localidad: "", organizador: "", contacto: "" })
  const [enviando, setEnviando] = useState(false)

  const acciones = [
    { icon: "🗺️", titulo: "Buscá en el mapa", desc: "Descubrí instituciones cerca tuyo", link: "/mapa", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80" },
    { icon: "🔍", titulo: "Filtrá por tema", desc: "Niños, animales, salud, educación y más", link: "/mapa?lista=true", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&crop=faces&fit=crop", imgCustom: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&q=80" },
    { icon: "🤝", titulo: "Postulate como Agente de Cambio", desc: "Doná tu tiempo, habilidades o recursos. TODO SUMA", accion: "voluntario", img: "/voluntarios.png.png" },
    { icon: "🚚", titulo: "Doná materiales", desc: "Ropa, abrigos, alimentos, útiles, muebles, juguetes", accion: "donacion", img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80" },
    { icon: "⭐", titulo: "Dejá tu reseña", desc: "Ayudá a otros a elegir dónde ayudar", link: "/mapa", img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80", estrellas: true },
  ]

  const handleAccionClick = (item, e) => {
    if (item.accion === "voluntario") { e.preventDefault(); setShowVoluntario(true) }
    if (item.accion === "donacion") { e.preventDefault(); setShowDonacion(true) }
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#F8FAF9", minHeight: "100vh" }}>

      <div style={{ position: "relative", color: "white", overflow: "hidden" }}>
        <img src="/agentesDcbio_Fondo.jpeg" alt="Agentes de Cambio" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
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
          {acciones.map((item, i) => {
            const imgSrc = item.imgCustom || item.img
            const isVoluntario = item.accion === "voluntario"
            return (
              <a
                key={i}
                href={item.link || "#"}
                onClick={item.accion ? (e) => handleAccionClick(item, e) : undefined}
                style={{ borderRadius: 16, overflow: "hidden", textDecoration: "none", display: "block", position: "relative", height: 160, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", cursor: "pointer" }}
              >
                <img src={imgSrc} alt={item.titulo} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: isVoluntario ? "center 30%" : "center", transform: isVoluntario ? "scale(0.85)" : "none", transformOrigin: "center", display: "block" }} />
                {isVoluntario && (
                  <div style={{ position: "absolute", top: 12, right: 12, background: "#0D4F3C", color: "white", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                    Voluntario
                  </div>
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, padding: "0 20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
                  <div style={{ fontSize: 24 }}>{item.icon}</div>
                  <div style={{ fontWeight: 800, color: "white", fontSize: 17, lineHeight: 1.2 }}>{item.titulo}</div>
                  <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>{item.desc}</div>
                  {item.estrellas && <div style={{ display: "flex", gap: 2, marginTop: 2 }}>{[1,2,3,4,5].map(n => <span key={n} style={{ fontSize: 14 }}>⭐</span>)}</div>}
                </div>
                <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 10px", color: "white", fontSize: 16, fontWeight: 700 }}>→</div>
              </a>
            )
          })}
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "44px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 4, height: 32, background: "#0D4F3C", borderRadius: 4 }} />
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0D4F3C", margin: 0 }}>¿Cómo funciona?</h2>
        </div>
        <div style={{ background: "white", borderRadius: 16, padding: "24px 28px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { paso: "1", icon: "🗺️", titulo: "Encontrá una institución", desc: "Buscá en el mapa o filtrá por categoría y encontrá el lugar que más se alinea con lo que querés donar o hacer." },
              { paso: "2", icon: "🚚", titulo: "Registrá tu donación", desc: "Clickeá en 'Donar materiales', describí qué tenés para ofrecer y dejá tus datos de contacto." },
              { paso: "3", icon: "📧", titulo: "La institución te contacta", desc: "La institución recibe un email con tu información y se pone en contacto para coordinar la entrega. ¡Así de simple!" },
              { paso: "4", icon: "💚", titulo: "El impacto es real", desc: "Tu donación llega directamente a quienes más lo necesitan, sin intermediarios. Cada aporte hace la diferencia." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ background: "#0D4F3C", color: "white", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{item.paso}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#111827", fontSize: 15, marginBottom: 4 }}>{item.icon} {item.titulo}</div>
                  <div style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
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
          <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px 0" }}>💚 Postulate para ser un Agente de Cambio</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.9, margin: "0 0 24px 0" }}>Dejanos tu postulación como así también podés registrarte sólo para recibir las novedades de tu zona.</p>
          <button onClick={() => setShowUnite(true)} style={{ background: "white", color: "#7C3AED", padding: "13px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>Quiero postularme →</button>
        </div>
      </div>

      <footer style={{ background: "#0D4F3C", padding: "20px 24px", textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
        <span style={{ fontWeight: 700, color: "#86EFAC" }}>Agentes de Cambio</span>{" · "}Chaco, Argentina{" · "}Cada acción cuenta 💚
        <br/>
        <a href="mailto:agentesdecambiochaco@gmail.com" style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 6, display: "inline-block" }}>agentesdecambiochaco@gmail.com</a>
        <br/>
        <a href="/terminos" style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4, display: "inline-block", textDecoration: "underline" }}>Términos y Condiciones · Aviso Legal</a>
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

      {showVoluntario && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 460, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 6px 0", fontSize: 22 }}>🤝 Postulate como Voluntario</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 20px 0" }}>Completá tus datos y te contactamos para coordinar.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Tu nombre *" required value={voluntarioData.nombre} onChange={e => setVoluntarioData({...voluntarioData, nombre: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="email" placeholder="Tu email *" required value={voluntarioData.email} onChange={e => setVoluntarioData({...voluntarioData, email: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="tel" placeholder="Teléfono" value={voluntarioData.telefono} onChange={e => setVoluntarioData({...voluntarioData, telefono: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Localidad" value={voluntarioData.localidad} onChange={e => setVoluntarioData({...voluntarioData, localidad: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Disponibilidad (ej: fines de semana, tardes)" value={voluntarioData.disponibilidad} onChange={e => setVoluntarioData({...voluntarioData, disponibilidad: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <textarea placeholder="¿Qué puedo ofrecer? (ej: tiempo, transporte o alguna habilidad u oficio que tengas)" value={voluntarioData.quePuedoOfrecer} onChange={e => setVoluntarioData({...voluntarioData, quePuedoOfrecer: e.target.value})} rows={3} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  disabled={enviando}
                  onClick={async () => {
                    if (!voluntarioData.nombre || !voluntarioData.email) { alert("Nombre y email son obligatorios"); return }
                    setEnviando(true)
                    try {
                      const res = await fetch('/api/voluntarios', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(voluntarioData) })
                      const data = await res.json()
                      if (data.success) { alert("✅ ¡Gracias " + voluntarioData.nombre + "! Tu postulación fue enviada."); setShowVoluntario(false); setVoluntarioData({ nombre: "", email: "", telefono: "", localidad: "", disponibilidad: "", quePuedoOfrecer: "" }) }
                      else alert("❌ Error: " + data.error)
                    } catch (err) { alert("❌ Error: " + err.message) }
                    finally { setEnviando(false) }
                  }}
                  style={{ flex: 1, background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}
                >{enviando ? "Enviando..." : "Enviar postulación"}</button>
                <button onClick={() => setShowVoluntario(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUnite && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 460, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 6px 0", fontSize: 22 }}>💚 Postulate para ser un Agente de Cambio</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 20px 0" }}>Dejanos tu postulación o registrate sólo para recibir novedades de tu zona.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Tu nombre *" required value={agenteData.nombre} onChange={e => setAgenteData({...agenteData, nombre: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="email" placeholder="Tu email *" required value={agenteData.email} onChange={e => setAgenteData({...agenteData, email: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="tel" placeholder="Teléfono" value={agenteData.telefono} onChange={e => setAgenteData({...agenteData, telefono: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="text" placeholder="Localidad" value={agenteData.localidad} onChange={e => setAgenteData({...agenteData, localidad: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <textarea placeholder="¿Por qué querés ser Agente de Cambio? (opcional)" value={agenteData.motivacion} onChange={e => setAgenteData({...agenteData, motivacion: e.target.value})} rows={3} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  disabled={enviando}
                  onClick={async () => {
                    if (!agenteData.nombre || !agenteData.email) { alert("Nombre y email son obligatorios"); return }
                    setEnviando(true)
                    try {
                      const res = await fetch('/api/agentes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(agenteData) })
                      const data = await res.json()
                      if (data.success) { alert("✅ ¡Bienvenido " + agenteData.nombre + "! Ya sos un Agente de Cambio."); setShowUnite(false); setAgenteData({ nombre: "", email: "", telefono: "", localidad: "", motivacion: "" }) }
                      else alert("❌ Error: " + data.error)
                    } catch (err) { alert("❌ Error: " + err.message) }
                    finally { setEnviando(false) }
                  }}
                  style={{ flex: 1, background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}
                >{enviando ? "Enviando..." : "¡Quiero postularme!"}</button>
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
                <button
                  disabled={enviando}
                  onClick={async () => {
                    if (!eventoData.titulo || !eventoData.descripcion || !eventoData.fecha) { alert("Completá los campos obligatorios"); return }
                    setEnviando(true)
                    try {
                      const res = await fetch('/api/eventos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(eventoData) })
                      const data = await res.json()
                      if (data.success) { alert("✅ ¡Evento registrado! Lo revisaremos pronto."); setShowEvento(false); setEventoData({ titulo: "", descripcion: "", fecha: "", hora: "", lugar: "", localidad: "", organizador: "", contacto: "" }) }
                      else alert("❌ Error: " + data.error)
                    } catch (err) { alert("❌ Error: " + err.message) }
                    finally { setEnviando(false) }
                  }}
                  style={{ flex: 1, background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}
                >{enviando ? "Enviando..." : "Publicar evento"}</button>
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
              <input type="text" placeholder="Tu nombre *" required value={donacionData.nombre} onChange={e => setDonacionData({...donacionData, nombre: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="tel" placeholder="Tu celular *" required value={donacionData.celular} onChange={e => setDonacionData({...donacionData, celular: e.target.value})} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
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
                <button
                  disabled={enviando}
                  onClick={async () => {
                    if (!donacionData.nombre || !donacionData.celular || donacionData.tipos.length === 0) { alert("Completá nombre, celular y elegí al menos un tipo de donación"); return }
                    setEnviando(true)
                    try {
                      const res = await fetch('/api/donaciones', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(donacionData) })
                      const data = await res.json()
                      if (data.success) { alert("✅ ¡Gracias " + donacionData.nombre + "! Te contactamos pronto para coordinar."); setShowDonacion(false); setDonacionData({ nombre: "", celular: "", tipos: [], ubicacion: "", comentario: "" }) }
                      else alert("❌ Error: " + data.error)
                    } catch (err) { alert("❌ Error: " + err.message) }
                    finally { setEnviando(false) }
                  }}
                  style={{ flex: 1, background: "#F59E0B", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}
                >{enviando ? "Enviando..." : "Registrar donación"}</button>
                <button onClick={() => setShowDonacion(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}