'use client'
import { useState, useEffect } from 'react'

const PASSWORD = 'lola2011'

const TABS = [
  { id: 'solicitudes', label: '🏢 Solicitudes', desc: 'Instituciones pendientes de aprobación' },
  { id: 'voluntarios', label: '🤝 Voluntarios', desc: 'Personas registradas para ayudar' },
  { id: 'mensajes', label: '✉️ Mensajes', desc: 'Mensajes recibidos' },
  { id: 'resenas', label: '⭐ Reseñas', desc: 'Reseñas pendientes de moderación' },
  { id: 'instituciones', label: '📝 Instituciones', desc: 'Editar info de instituciones activas' },
  { id: 'calendario', label: '📅 Calendario', desc: 'Gestionar eventos solidarios' },
]

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState('solicitudes')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [editInst, setEditInst] = useState(null)
  const [showNueva, setShowNueva] = useState(false)
  const [editEvento, setEditEvento] = useState(null)
  const [showNuevoEvento, setShowNuevoEvento] = useState(false)
  const [nuevoEvento, setNuevoEvento] = useState({ titulo: '', descripcion: '', fecha: '', hora: '', lugar: '', localidad: '', organizador: '', contacto: '' })
  const [nuevaInst, setNuevaInst] = useState({
    nombre: "", slug: "", descripcion: "", direccion: "", localidad: "",
    latitud: "", longitud: "", telefono: "", email: "", whatsapp: "",
    instagram: "", historia: "", responsables: "", dirigido_a: "",
    anio_fundacion: "", estado_verificacion: "en_proceso", acepta_retiro: false
  })

  const login = () => {
    if (pass === PASSWORD) { setAuth(true); setError('') }
    else setError('Contraseña incorrecta')
  }

  const fetchData = async (t) => {
    setLoading(true)
    try {
      if (t === 'calendario') {
        const res = await fetch('/api/admin/eventos')
        const json = await res.json()
        setData(d => ({ ...d, calendario: json.eventos || [] }))
      } else {
        const res = await fetch(`/api/admin?tabla=${t}`)
        const json = await res.json()
        setData(d => ({ ...d, [t]: json.data || [] }))
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => {
    if (auth) fetchData(tab)
  }, [auth, tab])

  const aprobar = async (id) => {
    await fetch('/api/admin/aprobar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchData('solicitudes')
  }

  const rechazar = async (id) => {
    await fetch('/api/admin/rechazar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchData('solicitudes')
  }

  const guardarInstitucion = async () => {
    await fetch('/api/admin/institucion', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editInst) })
    setEditInst(null)
    fetchData('instituciones')
  }

  const crearInstitucion = async () => {
    if (!nuevaInst.nombre || !nuevaInst.localidad) { alert('Nombre y localidad son requeridos'); return }
    const slug = nuevaInst.slug || nuevaInst.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    await fetch('/api/admin/institucion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...nuevaInst, slug, latitud: nuevaInst.latitud ? parseFloat(nuevaInst.latitud) : null, longitud: nuevaInst.longitud ? parseFloat(nuevaInst.longitud) : null, anio_fundacion: nuevaInst.anio_fundacion ? parseInt(nuevaInst.anio_fundacion) : null })
    })
    setShowNueva(false)
    setNuevaInst({ nombre: "", slug: "", descripcion: "", direccion: "", localidad: "", latitud: "", longitud: "", telefono: "", email: "", whatsapp: "", instagram: "", historia: "", responsables: "", dirigido_a: "", anio_fundacion: "", estado_verificacion: "verificada", acepta_retiro: false })
    fetchData('instituciones')
  }

  const eliminarInstitucion = async (id, nombre) => {
    if (!confirm(`¿Seguro que querés eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return
    await fetch('/api/admin/institucion', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchData('instituciones')
  }

  const crearEvento = async () => {
    if (!nuevoEvento.titulo || !nuevoEvento.fecha) { alert('Título y fecha son requeridos'); return }
    await fetch('/api/admin/eventos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nuevoEvento) })
    setShowNuevoEvento(false)
    setNuevoEvento({ titulo: '', descripcion: '', fecha: '', hora: '', lugar: '', localidad: '', organizador: '', contacto: '' })
    fetchData('calendario')
  }

  const guardarEvento = async () => {
    await fetch('/api/admin/eventos', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editEvento) })
    setEditEvento(null)
    fetchData('calendario')
  }

  const eliminarEvento = async (id, titulo) => {
    if (!confirm(`¿Eliminar "${titulo}"?`)) return
    await fetch('/api/admin/eventos', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchData('calendario')
  }

  const cambiarEstadoEvento = async (id, estado) => {
    await fetch('/api/admin/eventos', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, estado }) })
    fetchData('calendario')
  }

  if (!auth) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAF9" }}>
      <div style={{ background: "white", borderRadius: 20, padding: 40, maxWidth: 380, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
          <h1 style={{ color: "#0D4F3C", fontSize: 22, fontWeight: 800, margin: "0 0 6px 0" }}>Panel Admin</h1>
          <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Agentes de Cambio</p>
        </div>
        <input
          type="password" placeholder="Contraseña"
          value={pass} onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontSize: 15, boxSizing: "border-box", marginBottom: 12 }}
        />
        {error && <p style={{ color: "#EF4444", fontSize: 13, margin: "0 0 10px 0", textAlign: "center" }}>{error}</p>}
        <button onClick={login} style={{ width: "100%", background: "#0D4F3C", color: "white", border: "none", padding: "13px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Ingresar</button>
      </div>
    </div>
  )

  const items = data[tab] || []

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#F8FAF9", minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #0D4F3C, #2D8B6A)", padding: "20px 24px", color: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>🛡️ Panel de Administración</h1>
          <p style={{ margin: "4px 0 0 0", opacity: 0.8, fontSize: 13 }}>Agentes de Cambio</p>
        </div>
        <a href="/" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13 }}>← Volver al sitio</a>
      </div>

      {/* TABS */}
      <div style={{ background: "white", borderBottom: "1px solid #E5E7EB", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 0, padding: "0 16px", minWidth: "max-content" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "14px 20px", border: "none", background: "none", cursor: "pointer",
              fontWeight: 600, fontSize: 13, borderBottom: tab === t.id ? "3px solid #0D4F3C" : "3px solid transparent",
              color: tab === t.id ? "#0D4F3C" : "#6B7280", whiteSpace: "nowrap"
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px 60px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 48, color: "#9CA3AF" }}>Cargando...</div>
        ) : items.length === 0 ? (
          <div style={{ background: "white", borderRadius: 16, padding: 40, textAlign: "center", color: "#9CA3AF", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <p>No hay registros en esta sección</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* SOLICITUDES */}
            {tab === 'solicitudes' && items.map(s => (
              <div key={s.id} style={{ background: "white", borderRadius: 14, padding: "20px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", borderLeft: `4px solid ${s.estado === 'pendiente' ? '#F59E0B' : s.estado === 'aprobada' ? '#10B981' : '#EF4444'}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px 0", fontSize: 16, color: "#111827" }}>{s.nombre}</h3>
                    <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>📍 {s.direccion}, {s.localidad} · {new Date(s.created_at).toLocaleDateString('es-AR')}</p>
                  </div>
                  <span style={{ background: s.estado === 'pendiente' ? '#FEF3C7' : s.estado === 'aprobada' ? '#D1FAE5' : '#FEE2E2', color: s.estado === 'pendiente' ? '#92400E' : s.estado === 'aprobada' ? '#065F46' : '#991B1B', padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{s.estado}</span>
                </div>
                <div style={{ fontSize: 13, color: "#374151", display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
                  <span>👤 {s.nombre_encargado} · 📞 {s.telefono1}{s.telefono2 ? ` / ${s.telefono2}` : ''}</span>
                  {s.whatsapp && <span>💬 WhatsApp: {s.whatsapp}</span>}
                  <span>📋 {s.descripcion}</span>
                  {s.necesidades && <span>🆘 {s.necesidades}</span>}
                  {s.tipo_ayuda?.length > 0 && <span>🎯 {s.tipo_ayuda.join(', ')}</span>}
                  <span>⚖️ Personería: {s.tiene_personeria_juridica ? `Sí (${s.respaldo_legal || ''})` : 'No'}</span>
                </div>
                {s.estado === 'pendiente' && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => aprobar(s.id)} style={{ flex: 1, background: "#10B981", color: "white", border: "none", padding: "10px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>✅ Aprobar</button>
                    <button onClick={() => rechazar(s.id)} style={{ flex: 1, background: "#EF4444", color: "white", border: "none", padding: "10px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>❌ Rechazar</button>
                  </div>
                )}
              </div>
            ))}

            {/* VOLUNTARIOS */}
            {tab === 'voluntarios' && items.map(v => (
              <div key={v.id} style={{ background: "white", borderRadius: 14, padding: "18px 22px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: 15, color: "#111827" }}>{v.nombre}</h3>
                <div style={{ fontSize: 13, color: "#6B7280", display: "flex", flexDirection: "column", gap: 3 }}>
                  <span>✉️ {v.email} · 📞 {v.telefono || 'No indicado'}</span>
                  {v.oferta && <span>💼 {v.oferta}</span>}
                  {v.comentario && <span>💬 {v.comentario}</span>}
                  <span style={{ color: "#9CA3AF", fontSize: 11 }}>{new Date(v.created_at).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            ))}

            {/* MENSAJES */}
            {tab === 'mensajes' && items.map(m => (
              <div key={m.id} style={{ background: "white", borderRadius: 14, padding: "18px 22px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: 15, color: "#111827" }}>{m.nombre}</h3>
                <p style={{ margin: "0 0 8px 0", fontSize: 13, color: "#6B7280" }}>✉️ {m.email}</p>
                <p style={{ margin: "0 0 8px 0", fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{m.texto}</p>
                <span style={{ color: "#9CA3AF", fontSize: 11 }}>{new Date(m.created_at).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            ))}

            {/* RESEÑAS */}
            {tab === 'resenas' && items.map(r => (
              <div key={r.id} style={{ background: "white", borderRadius: 14, padding: "18px 22px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(n => <span key={n} style={{ opacity: n <= r.calificacion ? 1 : 0.2 }}>⭐</span>)}</div>
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>{new Date(r.created_at).toLocaleDateString('es-AR')}</span>
                </div>
                <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{r.comentario}</p>
              </div>
            ))}

            {/* INSTITUCIONES - EDITAR */}
            {tab === 'instituciones' && (
              <>
                <button onClick={() => setShowNueva(!showNueva)} style={{ background: "#0D4F3C", color: "white", border: "none", padding: "12px 20px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                  {showNueva ? '✕ Cancelar' : '+ Nueva institución'}
                </button>

                {showNueva && (
                  <div style={{ background: "white", borderRadius: 14, padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", border: "2px solid #86EFAC" }}>
                    <h3 style={{ color: "#0D4F3C", margin: "0 0 16px 0" }}>➕ Nueva Institución</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[
                        { k: "nombre", label: "Nombre *", full: true },
                        { k: "descripcion", label: "Descripción *", full: true, textarea: true },
                        { k: "direccion", label: "Dirección *" },
                        { k: "localidad", label: "Localidad *" },
                        { k: "latitud", label: "Latitud", placeholder: "-27.4414" },
                        { k: "longitud", label: "Longitud", placeholder: "-59.0272" },
                        { k: "telefono", label: "Teléfono" },
                        { k: "email", label: "Email" },
                        { k: "whatsapp", label: "WhatsApp" },
                        { k: "instagram", label: "Instagram" },
                        { k: "responsables", label: "Responsables", full: true },
                        { k: "dirigido_a", label: "Dirigido a", full: true },
                        { k: "historia", label: "Historia", full: true, textarea: true },
                        { k: "anio_fundacion", label: "Año fundación", type: "number" },
                      ].map(f => (
                        <div key={f.k} style={{ gridColumn: f.full ? "1 / -1" : "auto" }}>
                          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>{f.label}</label>
                          {f.textarea ? (
                            <textarea value={nuevaInst[f.k] || ''} onChange={e => setNuevaInst({...nuevaInst, [f.k]: e.target.value})} rows={3} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, resize: "vertical", boxSizing: "border-box" }} />
                          ) : (
                            <input type={f.type || "text"} placeholder={f.placeholder || ''} value={nuevaInst[f.k] || ''} onChange={e => setNuevaInst({...nuevaInst, [f.k]: e.target.value})} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, boxSizing: "border-box" }} />
                          )}
                        </div>
                      ))}
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Estado de verificación</label>
                        <select value={nuevaInst.estado_verificacion} onChange={e => setNuevaInst({...nuevaInst, estado_verificacion: e.target.value})} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, boxSizing: "border-box" }}>
                          <option value="en_proceso">🕐 En proceso de verificación</option>
                          <option value="verificada">✅ Verificada</option>
                          <option value="pendiente">⏳ Pendiente</option>
                        </select>
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
                          <input type="checkbox" checked={nuevaInst.acepta_retiro} onChange={e => setNuevaInst({...nuevaInst, acepta_retiro: e.target.checked})} />
                          Acepta retiro de materiales
                        </label>
                      </div>
                    </div>
                    <button onClick={crearInstitucion} style={{ marginTop: 16, background: "#0D4F3C", color: "white", border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                      ✅ Crear institución
                    </button>
                  </div>
                )}
              </>
            )}

            {tab === 'instituciones' && items.map(inst => (
              <div key={inst.id} style={{ background: "white", borderRadius: 14, padding: "18px 22px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                {editInst?.id === inst.id ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <h3 style={{ margin: "0 0 8px 0", color: "#0D4F3C" }}>Editando: {inst.nombre}</h3>
                    <textarea placeholder="Descripción" value={editInst.descripcion || ''} onChange={e => setEditInst({...editInst, descripcion: e.target.value})} rows={3} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, resize: "vertical" }} />
                    <textarea placeholder="Historia" value={editInst.historia || ''} onChange={e => setEditInst({...editInst, historia: e.target.value})} rows={4} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, resize: "vertical" }} />
                    <input placeholder="Responsables" value={editInst.responsables || ''} onChange={e => setEditInst({...editInst, responsables: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 }} />
                    <input placeholder="Dirigido a" value={editInst.dirigido_a || ''} onChange={e => setEditInst({...editInst, dirigido_a: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 }} />
                    <input placeholder="WhatsApp" value={editInst.whatsapp || ''} onChange={e => setEditInst({...editInst, whatsapp: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 }} />
                    <input placeholder="Instagram" value={editInst.instagram || ''} onChange={e => setEditInst({...editInst, instagram: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 }} />
                    <input type="number" placeholder="Año de fundación" value={editInst.anio_fundacion || ''} onChange={e => setEditInst({...editInst, anio_fundacion: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 }} />
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Estado de verificación</label>
                      <select value={editInst.estado_verificacion || 'en_proceso'} onChange={e => setEditInst({...editInst, estado_verificacion: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13 }}>
                        <option value="en_proceso">🕐 En proceso de verificación</option>
                        <option value="verificada">✅ Verificada</option>
                        <option value="pendiente">⏳ Pendiente</option>
                      </select>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={guardarInstitucion} style={{ flex: 1, background: "#0D4F3C", color: "white", border: "none", padding: "10px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>💾 Guardar</button>
                      <button onClick={() => setEditInst(null)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "10px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h3 style={{ margin: "0 0 4px 0", fontSize: 15, color: "#111827" }}>{inst.nombre}</h3>
                      <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>📍 {inst.localidad} · {inst.estado_verificacion}</p>
                    </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setEditInst(inst)} style={{ background: "#F0FDF4", color: "#0D4F3C", border: "1.5px solid #86EFAC", padding: "8px 16px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>✏️ Editar</button>
                    <button onClick={() => eliminarInstitucion(inst.id, inst.nombre)} style={{ background: "#FEE2E2", color: "#991B1B", border: "1.5px solid #FCA5A5", padding: "8px 16px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>🗑️ Eliminar</button>
                  </div>
                  </div>
                )}
              </div>
            ))}

            {tab === 'calendario' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ margin: 0, color: '#0D4F3C', fontSize: 16 }}>Eventos solidarios</h3>
                  <button onClick={() => setShowNuevoEvento(!showNuevoEvento)} style={{ background: '#0D4F3C', color: 'white', border: 'none', padding: '9px 18px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>+ Nuevo evento</button>
                </div>
                {showNuevoEvento && (
                  <div style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#0D4F3C' }}>➕ Nuevo evento</h4>
                    <input placeholder="Título *" value={nuevoEvento.titulo} onChange={e => setNuevoEvento({...nuevoEvento, titulo: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                    <textarea placeholder="Descripción" value={nuevoEvento.descripcion} onChange={e => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})} rows={3} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13, resize: 'vertical' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <input type="date" value={nuevoEvento.fecha} onChange={e => setNuevoEvento({...nuevoEvento, fecha: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                      <input type="time" value={nuevoEvento.hora} onChange={e => setNuevoEvento({...nuevoEvento, hora: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                      <input placeholder="Lugar" value={nuevoEvento.lugar} onChange={e => setNuevoEvento({...nuevoEvento, lugar: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                      <input placeholder="Localidad" value={nuevoEvento.localidad} onChange={e => setNuevoEvento({...nuevoEvento, localidad: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                      <input placeholder="Organizador" value={nuevoEvento.organizador} onChange={e => setNuevoEvento({...nuevoEvento, organizador: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                      <input placeholder="Contacto" value={nuevoEvento.contacto} onChange={e => setNuevoEvento({...nuevoEvento, contacto: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={crearEvento} style={{ flex: 1, background: '#0D4F3C', color: 'white', border: 'none', padding: '10px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>✅ Crear evento</button>
                      <button onClick={() => setShowNuevoEvento(false)} style={{ flex: 1, background: '#F3F4F6', color: '#374151', border: 'none', padding: '10px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Cancelar</button>
                    </div>
                  </div>
                )}
                {(data.calendario || []).map(ev => (
                  <div key={ev.id} style={{ background: 'white', borderRadius: 14, padding: '18px 22px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    {editEvento?.id === ev.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#0D4F3C' }}>Editando: {ev.titulo}</h4>
                        <input value={editEvento.titulo || ''} onChange={e => setEditEvento({...editEvento, titulo: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                        <textarea value={editEvento.descripcion || ''} onChange={e => setEditEvento({...editEvento, descripcion: e.target.value})} rows={3} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13, resize: 'vertical' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                          <input type="date" value={editEvento.fecha || ''} onChange={e => setEditEvento({...editEvento, fecha: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                          <input type="time" value={editEvento.hora || ''} onChange={e => setEditEvento({...editEvento, hora: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                          <input placeholder="Lugar" value={editEvento.lugar || ''} onChange={e => setEditEvento({...editEvento, lugar: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                          <input placeholder="Localidad" value={editEvento.localidad || ''} onChange={e => setEditEvento({...editEvento, localidad: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                          <input placeholder="Organizador" value={editEvento.organizador || ''} onChange={e => setEditEvento({...editEvento, organizador: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                          <input placeholder="Contacto" value={editEvento.contacto || ''} onChange={e => setEditEvento({...editEvento, contacto: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }} />
                        </div>
                        <select value={editEvento.estado || 'activo'} onChange={e => setEditEvento({...editEvento, estado: e.target.value})} style={{ padding: '10px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13 }}>
                          <option value="activo">✅ Activo</option>
                          <option value="pendiente">⏳ Pendiente</option>
                          <option value="cancelado">❌ Cancelado</option>
                        </select>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={guardarEvento} style={{ flex: 1, background: '#0D4F3C', color: 'white', border: 'none', padding: '10px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>💾 Guardar</button>
                          <button onClick={() => setEditEvento(null)} style={{ flex: 1, background: '#F3F4F6', color: '#374151', border: 'none', padding: '10px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Cancelar</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                        <div>
                          <h3 style={{ margin: '0 0 4px 0', fontSize: 15, color: '#111827' }}>{ev.titulo}</h3>
                          <p style={{ margin: '0 0 4px 0', fontSize: 12, color: '#6B7280' }}>📅 {ev.fecha}{ev.hora ? ' · ' + ev.hora : ''}{ev.lugar ? ' · ' + ev.lugar : ''}{ev.localidad ? ', ' + ev.localidad : ''}</p>
                          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: ev.estado === 'activo' ? '#D1FAE5' : ev.estado === 'pendiente' ? '#FEF3C7' : '#FEE2E2', color: ev.estado === 'activo' ? '#065F46' : ev.estado === 'pendiente' ? '#78350F' : '#991B1B', fontWeight: 700 }}>{ev.estado}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                          <button onClick={() => setEditEvento(ev)} style={{ background: '#F0FDF4', color: '#0D4F3C', border: '1.5px solid #86EFAC', padding: '7px 14px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>✏️ Editar</button>
                          <button onClick={() => eliminarEvento(ev.id, ev.titulo)} style={{ background: '#FEE2E2', color: '#991B1B', border: '1.5px solid #FCA5A5', padding: '7px 14px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>🗑️</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

          </div>
        )}
      </div>
    </div>
  )
}