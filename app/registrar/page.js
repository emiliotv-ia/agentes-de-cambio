'use client'
import { useState } from 'react'

const TIPOS_AYUDA = ["Alimentos", "Ropa y calzado", "Útiles escolares", "Medicamentos", "Voluntariado", "Dinero", "Materiales de construcción", "Juguetes", "Muebles", "Otros"]

const CATEGORIAS = [
  { id: 1, nombre: "Niñez y Adolescencia", icono: "👶" },
  { id: 2, nombre: "Adultos Mayores", icono: "🤍" },
  { id: 3, nombre: "Animales", icono: "🐾" },
  { id: 4, nombre: "Medio Ambiente", icono: "🌿" },
  { id: 5, nombre: "Alimentación", icono: "🍽️" },
  { id: 6, nombre: "Discapacidad", icono: "♿" },
  { id: 7, nombre: "Salud", icono: "🏥" },
  { id: 8, nombre: "Educación", icono: "📚" },
  { id: 9, nombre: "Vivienda y Hábitat", icono: "🏠" },
  { id: 10, nombre: "Género y Diversidad", icono: "🏳️‍🌈" },
  { id: 11, nombre: "Coaching para ONGs", icono: "💡" },
  { id: 12, nombre: "Emergencias", icono: "🚨" },
  { id: 13, nombre: "Situación de Calle", icono: "🏕️" },
  { id: 14, nombre: "Adicciones", icono: "🛡️" },
  { id: 15, nombre: "Cultura y Deporte", icono: "🏆" },
]

export default function RegistrarPage() {
  const [paso, setPaso] = useState(1)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [solicitudId, setSolicitudId] = useState(null)
  const [imagenes, setImagenes] = useState([])
  const [subiendo, setSubiendo] = useState(false)
  const [form, setForm] = useState({
    nombre: "", direccion: "", localidad: "", latitud: "", longitud: "",
    nombre_encargado: "", telefono1: "", telefono2: "", whatsapp: "",
    tiene_personeria_juridica: false, respaldo_legal: "",
    descripcion: "", historia: "", tipo_ayuda: [], necesidades: "", categorias: []
  })

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleAyuda = (t) => update('tipo_ayuda', form.tipo_ayuda.includes(t) ? form.tipo_ayuda.filter(x => x !== t) : [...form.tipo_ayuda, t])
  const toggleCategoria = (id) => update('categorias', form.categorias.includes(id) ? form.categorias.filter(x => x !== id) : [...form.categorias, id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    try {
      const res = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setSolicitudId(data.solicitud?.id || null)
        setEnviado(true)
      } else {
        alert(`❌ Error: ${data.error}`)
      }
    } catch (err) {
      alert('❌ Error: ' + err.message)
    } finally {
      setEnviando(false)
    }
  }

  const handleImagenes = async (e) => {
    const archivos = Array.from(e.target.files)
    if (!archivos.length) return
    setSubiendo(true)
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const nuevas = []
    for (const archivo of archivos) {
      const ext = archivo.name.split('.').pop()
      const nombre = `${solicitudId || 'sin-id'}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
      // Subir a Storage
      const res = await fetch(`${SUPABASE_URL}/storage/v1/object/instituciones/${nombre}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${SUPABASE_KEY}`, 'apikey': SUPABASE_KEY, 'Content-Type': archivo.type },
        body: archivo
      })
      if (res.ok) {
        const url = `${SUPABASE_URL}/storage/v1/object/public/instituciones/${nombre}`
        // Guardar en tabla
        if (solicitudId) {
          await fetch(`${SUPABASE_URL}/rest/v1/institucion_imagenes`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${SUPABASE_KEY}`, 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
            body: JSON.stringify({ solicitud_id: solicitudId, url })
          })
        }
        nuevas.push(url)
      }
    }
    setImagenes(prev => [...prev, ...nuevas])
    setSubiendo(false)
  }

  if (enviado) return (
    <div style={{ minHeight: "100vh", background: "#F0FDF4", padding: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ background: "white", borderRadius: 20, padding: 40, textAlign: "center", maxWidth: 520, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginBottom: 24 }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
        <h2 style={{ color: "#0D4F3C", fontFamily: "'Playfair Display', serif", fontSize: 24, margin: "0 0 12px 0" }}>¡Solicitud enviada!</h2>
        <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, margin: "0 0 24px 0" }}>Recibimos tu solicitud de registro. Nuestro equipo la revisará y te contactaremos a la brevedad para verificar los datos.</p>

        {/* Uploader de imágenes */}
        <div style={{ background: "#F8FAF9", borderRadius: 16, padding: 24, border: "2px dashed #86EFAC", marginBottom: 24 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📸</div>
          <h3 style={{ color: "#0D4F3C", fontSize: 16, fontWeight: 700, margin: "0 0 8px 0" }}>Agregá fotos de tu institución</h3>
          <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 16px 0" }}>Subí fotos del lugar, actividades, equipo... Ayuda a que más personas conozcan tu trabajo.</p>
          <label style={{ display: "inline-block", background: "#0D4F3C", color: "white", padding: "10px 24px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            {subiendo ? "Subiendo..." : "📁 Seleccionar fotos"}
            <input type="file" multiple accept="image/*" onChange={handleImagenes} style={{ display: "none" }} disabled={subiendo} />
          </label>
          <p style={{ color: "#9CA3AF", fontSize: 12, margin: "10px 0 0 0" }}>JPG, PNG, WEBP — múltiples archivos permitidos</p>
        </div>

        {/* Preview de imágenes subidas */}
        {imagenes.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: "#0D4F3C", fontWeight: 700, fontSize: 14, margin: "0 0 12px 0" }}>✅ {imagenes.length} foto{imagenes.length > 1 ? "s" : ""} subida{imagenes.length > 1 ? "s" : ""}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {imagenes.map((url, i) => (
                <img key={i} src={url} alt={`Foto ${i+1}`} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 8 }} />
              ))}
            </div>
          </div>
        )}

        <a href="/" style={{ display: "inline-block", background: "#0D4F3C", color: "white", padding: "12px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none" }}>Volver al inicio</a>
      </div>
    </div>
  )

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F8FAF9", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0D4F3C, #2D8B6A)", padding: "24px 24px 32px", color: "white" }}>
        <a href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>← Volver al inicio</a>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, margin: "0 0 8px 0" }}>🏢 Registrar Proyecto Solidario</h1>
        <p style={{ opacity: 0.85, fontSize: 14, margin: 0 }}>Sumá tu institución al mapa y conectá con quienes quieren ayudar</p>
        {/* Pasos */}
        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          {["Datos básicos", "Responsable", "Descripción", "Necesidades"].map((p, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: paso > i ? "white" : "rgba(255,255,255,0.3)", transition: "background 0.3s" }} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 24px 48px" }}>
        <form onSubmit={handleSubmit}>

          {/* PASO 1: Datos básicos */}
          {paso === 1 && (
            <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h2 style={{ color: "#0D4F3C", margin: "0 0 20px 0", fontSize: 20 }}>📍 Datos del lugar</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Nombre de la institución *</label>
                  <input required value={form.nombre} onChange={e => update('nombre', e.target.value)} placeholder="Ej: Comedor Infantil Los Angelitos" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Dirección *</label>
                  <input required value={form.direccion} onChange={e => update('direccion', e.target.value)} placeholder="Ej: Av. Soberanía Nacional 1250" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Localidad *</label>
                  <input required value={form.localidad} onChange={e => update('localidad', e.target.value)} placeholder="Ej: Resistencia" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Latitud (opcional)</label>
                    <input value={form.latitud} onChange={e => update('latitud', e.target.value)} placeholder="-27.4414" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Longitud (opcional)</label>
                    <input value={form.longitud} onChange={e => update('longitud', e.target.value)} placeholder="-59.0272" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, boxSizing: "border-box" }} />
                  </div>
                </div>
                <p style={{ color: "#9CA3AF", fontSize: 12, margin: 0 }}>💡 Si no sabés las coordenadas, buscá tu dirección en Google Maps y copiá los números del link</p>
              </div>
              <button type="button" onClick={() => setPaso(2)} style={{ marginTop: 24, width: "100%", background: "#0D4F3C", color: "white", border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Siguiente →</button>
            </div>
          )}

          {/* PASO 2: Responsable */}
          {paso === 2 && (
            <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h2 style={{ color: "#0D4F3C", margin: "0 0 20px 0", fontSize: 20 }}>👤 Datos del Responsable</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Nombre del encargado/director *</label>
                  <input required value={form.nombre_encargado} onChange={e => update('nombre_encargado', e.target.value)} placeholder="Nombre y apellido" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Teléfono 1 *</label>
                  <input required value={form.telefono1} onChange={e => update('telefono1', e.target.value)} placeholder="362-XXXXXXX" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Teléfono 2</label>
                  <input value={form.telefono2} onChange={e => update('telefono2', e.target.value)} placeholder="362-XXXXXXX" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>WhatsApp</label>
                  <input value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} placeholder="362-XXXXXXX (para chat directo)" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 10 }}>¿Tienen personería jurídica o respaldo legal?</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                    <input type="checkbox" checked={form.tiene_personeria_juridica} onChange={e => update('tiene_personeria_juridica', e.target.checked)} style={{ width: 18, height: 18 }} />
                    <span style={{ fontSize: 14, color: "#374151" }}>Sí, tenemos personería jurídica u otro respaldo legal</span>
                  </label>
                </div>
                {form.tiene_personeria_juridica && (
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Especificá el tipo de respaldo</label>
                    <input value={form.respaldo_legal} onChange={e => update('respaldo_legal', e.target.value)} placeholder="Ej: Asociación civil, Fundación, ONG..." style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, boxSizing: "border-box" }} />
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button type="button" onClick={() => setPaso(1)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>← Anterior</button>
                <button type="button" onClick={() => setPaso(3)} style={{ flex: 2, background: "#0D4F3C", color: "white", border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Siguiente →</button>
              </div>
            </div>
          )}

          {/* PASO 3: Descripción */}
          {paso === 3 && (
            <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h2 style={{ color: "#0D4F3C", margin: "0 0 20px 0", fontSize: 20 }}>📝 Descripción e Historia</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 10 }}>¿En qué categorías se encuadra tu institución? *</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {CATEGORIAS.map(cat => (
                      <label key={cat.id} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "8px 10px", borderRadius: 8, border: `1px solid ${form.categorias.includes(cat.id) ? '#0D4F3C' : '#E5E7EB'}`, background: form.categorias.includes(cat.id) ? '#F0FDF4' : 'white' }}>
                        <input type="checkbox" checked={form.categorias.includes(cat.id)} onChange={() => toggleCategoria(cat.id)} style={{ width: 16, height: 16 }} />
                        <span style={{ fontSize: 13, color: "#374151" }}>{cat.icono} {cat.nombre}</span>
                      </label>
                    ))}
                  </div>
                </div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>¿A qué se dedican? *</label>
                  <textarea required value={form.descripcion} onChange={e => update('descripcion', e.target.value)} placeholder="Describí brevemente qué hace tu institución y a quiénes va dirigida..." rows={4} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Historia de la institución</label>
                  <textarea value={form.historia} onChange={e => update('historia', e.target.value)} placeholder="Contanos su historia: año de fundación, cómo empezaron, cómo evolucionaron, qué hacen hoy..." rows={5} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button type="button" onClick={() => setPaso(2)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>← Anterior</button>
                <button type="button" onClick={() => setPaso(4)} style={{ flex: 2, background: "#0D4F3C", color: "white", border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Siguiente →</button>
              </div>
            </div>
          )}

          {/* PASO 4: Necesidades */}
          {paso === 4 && (
            <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h2 style={{ color: "#0D4F3C", margin: "0 0 20px 0", fontSize: 20 }}>🆘 ¿Qué necesitás?</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 10 }}>Tipo de donación/ayuda que necesitás</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {TIPOS_AYUDA.map(t => (
                      <label key={t} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "8px 10px", borderRadius: 8, border: `1px solid ${form.tipo_ayuda.includes(t) ? '#0D4F3C' : '#E5E7EB'}`, background: form.tipo_ayuda.includes(t) ? '#F0FDF4' : 'white' }}>
                        <input type="checkbox" checked={form.tipo_ayuda.includes(t)} onChange={() => toggleAyuda(t)} style={{ width: 16, height: 16 }} />
                        <span style={{ fontSize: 13, color: "#374151" }}>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Detallá las necesidades actuales</label>
                  <textarea value={form.necesidades} onChange={e => update('necesidades', e.target.value)} placeholder="Ej: Necesitamos 50 viandas diarias, ropa de invierno talle 4-8, voluntarios los sábados..." rows={4} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ background: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: 10, padding: "12px 16px", marginTop: 16 }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                  <input type="checkbox" required style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "#78350F", lineHeight: 1.6 }}>
                    Acepto los <a href="/terminos" target="_blank" style={{ color: "#92400E", fontWeight: 700 }}>Términos y Condiciones</a> de Agentes de Cambio. Declaro que la información es verídica y me comprometo a administrar de forma transparente las donaciones recibidas. *
                  </span>
                </label>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button type="button" onClick={() => setPaso(3)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>← Anterior</button>
                <button type="submit" disabled={enviando} style={{ flex: 2, background: "#0D4F3C", color: "white", border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
                  {enviando ? "Enviando..." : "✅ Enviar solicitud"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}