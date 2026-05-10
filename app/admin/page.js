'use client'
import { useState, useEffect } from 'react'

const PASSWORD = 'lola2011'

const TABS = [
  { id: 'solicitudes', label: '🏢 Solicitudes', desc: 'Instituciones pendientes de aprobación' },
  { id: 'voluntarios', label: '🤝 Voluntarios', desc: 'Personas registradas para ayudar' },
  { id: 'mensajes', label: '✉️ Mensajes', desc: 'Mensajes recibidos' },
  { id: 'resenas', label: '⭐ Reseñas', desc: 'Reseñas pendientes de moderación' },
  { id: 'instituciones', label: '📝 Instituciones', desc: 'Editar info de instituciones activas' },
]

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState('solicitudes')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [editInst, setEditInst] = useState(null)

  const login = () => {
    if (pass === PASSWORD) { setAuth(true); setError('') }
    else setError('Contraseña incorrecta')
  }

  const fetchData = async (t) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin?tabla=${t}`)
      const json = await res.json()
      setData(d => ({ ...d, [t]: json.data || [] }))
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
                    <button onClick={() => setEditInst(inst)} style={{ background: "#F0FDF4", color: "#0D4F3C", border: "1.5px solid #86EFAC", padding: "8px 16px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>✏️ Editar</button>
                  </div>
                )}
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  )
}
