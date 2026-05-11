'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from "react"

// ─── DATOS MOCK ─────────────────────────────────────────────────────────────
const CATEGORIAS = [
  { id: 1, nombre: "Niñez y Adolescencia", slug: "ninez", icono: "👶" },
  { id: 2, nombre: "Adultos Mayores", slug: "adultos-mayores", icono: "🤍" },
  { id: 3, nombre: "Animales", slug: "animales", icono: "🐾" },
  { id: 4, nombre: "Medio Ambiente", slug: "medio-ambiente", icono: "🌿" },
  { id: 5, nombre: "Alimentación", slug: "alimentacion", icono: "🍽️" },
  { id: 6, nombre: "Discapacidad", slug: "discapacidad", icono: "♿" },
  { id: 7, nombre: "Salud", slug: "salud", icono: "🏥" },
  { id: 8, nombre: "Educación", slug: "educacion", icono: "📚" },
  { id: 9, nombre: "Vivienda y Hábitat", slug: "vivienda", icono: "🏠" },
  { id: 10, nombre: "Género y Diversidad", slug: "genero-diversidad", icono: "🏳️‍🌈" },
  { id: 11, nombre: "Coaching para ONGs", slug: "coaching-ongs", icono: "💡" },
  { id: 12, nombre: "Emergencias", slug: "emergencias", icono: "🚨" },
  { id: 13, nombre: "Situación de Calle", slug: "situacion-calle", icono: "🏕️" },
  { id: 14, nombre: "Adicciones", slug: "adicciones", icono: "🛡️" },
  { id: 15, nombre: "Cultura y Deporte", slug: "cultura-deporte", icono: "🏆" },
]

const INSTITUCIONES_MOCK = [
  {
    id: "1", nombre: "Comedor Infantil Los Angelitos", slug: "comedor-los-angelitos",
    descripcion: "Comedor comunitario que brinda almuerzo y merienda a 120 niños del Barrio Toba. Funcionamos de lunes a viernes.",
    direccion: "Av. Soberanía Nacional 1250, Resistencia",
    lat: -27.4414, lng: -59.0272,
    categorias: [1, 5], tags: ["comedor", "infantil", "barrio toba"],
    telefono: "362-4551234", email: "losangelitos@gmail.com", instagram: "@losangelitos_rcia",
    estado_verificacion: "verificada", promedio: 4.8, total_resenas: 23,
    necesidades: [
      { tipo: "alimentos", detalle: "Leche, arroz, fideos", urgencia: "alta" },
      { tipo: "voluntarios", detalle: "Cocina los sábados", urgencia: "media" }
    ],
    acepta_retiro: true, localidad: "Resistencia"
  },
  {
    id: "2", nombre: "Refugio Animal Patitas Felices", slug: "patitas-felices",
    descripcion: "Refugio de animales rescatados. Más de 80 perros y 30 gatos esperan un hogar. Realizamos campañas de castración gratuita.",
    direccion: "Ruta 11 Km 1008, Resistencia",
    lat: -27.4680, lng: -59.0150,
    categorias: [3], tags: ["refugio", "perros", "gatos", "castración"],
    telefono: "362-4887766", email: "patitasfelices@gmail.com", instagram: "@patitas_felices_chaco",
    estado_verificacion: "verificada", promedio: 4.6, total_resenas: 45,
    necesidades: [
      { tipo: "alimentos", detalle: "Alimento balanceado para perros y gatos", urgencia: "alta" },
      { tipo: "materiales", detalle: "Mantas, toallas viejas", urgencia: "baja" }
    ],
    acepta_retiro: true, localidad: "Resistencia"
  },
  {
    id: "3", nombre: "Hogar de Ancianos San José", slug: "hogar-san-jose",
    descripcion: "Hogar para adultos mayores en situación de vulnerabilidad. Brindamos alojamiento, alimentación y atención médica básica.",
    direccion: "Brown 450, Resistencia",
    lat: -27.4530, lng: -59.0350,
    categorias: [2, 7], tags: ["hogar", "ancianos", "geriátrico"],
    telefono: "362-4423311", email: "hogarsanjose@outlook.com",
    estado_verificacion: "verificada", promedio: 4.3, total_resenas: 12,
    necesidades: [
      { tipo: "voluntarios", detalle: "Acompañamiento y recreación", urgencia: "media" },
      { tipo: "medicamentos", detalle: "Pañales adultos, medicación básica", urgencia: "alta" }
    ],
    acepta_retiro: false, localidad: "Resistencia"
  },
  {
    id: "4", nombre: "Merendero Rayito de Sol", slug: "merendero-rayito-sol",
    descripcion: "Merendero barrial que atiende a 60 chicos todas las tardes. También brindamos apoyo escolar y actividades recreativas.",
    direccion: "Pasaje 14 de Julio 320, Barranqueras",
    lat: -27.4846, lng: -58.9491,
    categorias: [1, 5, 8], tags: ["merendero", "apoyo escolar", "barranqueras"],
    telefono: "362-4998877", instagram: "@rayitodesolbqras",
    estado_verificacion: "verificada", promedio: 4.9, total_resenas: 31,
    necesidades: [
      { tipo: "útiles", detalle: "Cuadernos, lápices, mochilas", urgencia: "alta" },
      { tipo: "alimentos", detalle: "Galletitas, leche, cacao", urgencia: "media" }
    ],
    acepta_retiro: true, localidad: "Barranqueras"
  },
  {
    id: "5", nombre: "Eco Chaco - Guardianes del Monte", slug: "eco-chaco",
    descripcion: "ONG dedicada a la preservación del monte chaqueño. Realizamos reforestación, educación ambiental y monitoreo de desmontes ilegales.",
    direccion: "French 780, Resistencia",
    lat: -27.4490, lng: -59.0420,
    categorias: [4], tags: ["medio ambiente", "reforestación", "monte nativo"],
    telefono: "362-4115566", email: "ecochaco@gmail.com", sitio_web: "https://ecochaco.org.ar",
    estado_verificacion: "verificada", promedio: 4.7, total_resenas: 18,
    necesidades: [
      { tipo: "voluntarios", detalle: "Jornadas de plantación (sábados)", urgencia: "media" },
      { tipo: "donaciones", detalle: "Plantines nativos, herramientas de jardinería", urgencia: "baja" }
    ],
    acepta_retiro: false, localidad: "Resistencia"
  },
  {
    id: "6", nombre: "Fundación Ver y Crecer", slug: "ver-y-crecer",
    descripcion: "Institución para personas no videntes y con baja visión. Brindamos talleres de braille, movilidad y orientación laboral.",
    direccion: "Sarmiento 1100, Resistencia",
    lat: -27.4560, lng: -59.0310,
    categorias: [6], tags: ["no videntes", "braille", "discapacidad visual"],
    telefono: "362-4334455", email: "verycreer@gmail.com",
    estado_verificacion: "verificada", promedio: 5.0, total_resenas: 8,
    necesidades: [
      { tipo: "voluntarios", detalle: "Lectores para grabación de audiolibros", urgencia: "alta" },
      { tipo: "tecnología", detalle: "Computadoras con lector de pantalla", urgencia: "media" }
    ],
    acepta_retiro: false, localidad: "Resistencia"
  },
  {
    id: "7", nombre: "Casa de Tránsito Abrazo", slug: "casa-transito-abrazo",
    descripcion: "Casa de tránsito para niños en proceso de adopción. Brindamos un hogar temporal con contención afectiva y acompañamiento profesional.",
    direccion: "Necochea 650, Fontana",
    lat: -27.4183, lng: -59.0347,
    categorias: [1], tags: ["adopción", "casa de tránsito", "niños"],
    telefono: "362-4776655",
    estado_verificacion: "verificada", promedio: 4.5, total_resenas: 6,
    necesidades: [
      { tipo: "ropa", detalle: "Ropa de bebé y niños (0-10 años)", urgencia: "alta" },
      { tipo: "juguetes", detalle: "Juguetes didácticos en buen estado", urgencia: "media" },
      { tipo: "voluntarios", detalle: "Psicólogos/as para acompañamiento", urgencia: "alta" }
    ],
    acepta_retiro: true, localidad: "Fontana"
  },
  {
    id: "8", nombre: "Comedor Comunitario Esperanza", slug: "comedor-esperanza",
    descripcion: "Comedor para familias en situación de vulnerabilidad. Servimos almuerzo y cena para más de 200 personas diarias.",
    direccion: "Av. Las Heras 2400, Presidencia Roque Sáenz Peña",
    lat: -26.7862, lng: -60.4398,
    categorias: [5], tags: ["comedor", "comunitario", "saenz peña"],
    telefono: "364-4223344", email: "comedor.esperanza@gmail.com",
    estado_verificacion: "verificada", promedio: 4.4, total_resenas: 15,
    necesidades: [
      { tipo: "alimentos", detalle: "Aceite, harina, verduras", urgencia: "alta" },
      { tipo: "equipamiento", detalle: "Ollas grandes, heladera", urgencia: "alta" }
    ],
    acepta_retiro: true, localidad: "Presidencia Roque Sáenz Peña"
  },
  {
    id: "9", nombre: "Club Social y Deportivo Esperanza", slug: "club-esperanza",
    descripcion: "Club barrial con escuelita de fútbol, vóley y básquet para chicos de 6 a 16 años. Espacio seguro de contención y deporte.",
    direccion: "Guêmes 890, Resistencia",
    lat: -27.4620, lng: -59.0280,
    categorias: [15, 1], tags: ["club", "deporte", "fútbol infantil"],
    telefono: "362-4667788",
    estado_verificacion: "pendiente", promedio: 0, total_resenas: 0,
    necesidades: [
      { tipo: "equipamiento", detalle: "Pelotas, redes, conos de entrenamiento", urgencia: "media" },
      { tipo: "voluntarios", detalle: "Entrenadores/as", urgencia: "alta" }
    ],
    acepta_retiro: false, localidad: "Resistencia"
  },
  {
    id: "10", nombre: "Red Solidaria Chaco", slug: "red-solidaria-chaco",
    descripcion: "Organización que coordina ayuda ante emergencias climáticas (inundaciones, tormentas). Red de voluntarios entrenados para respuesta rápida.",
    direccion: "Pellegrini 500, Resistencia",
    lat: -27.4470, lng: -59.0380,
    categorias: [12], tags: ["emergencias", "inundaciones", "red solidaria"],
    telefono: "362-4112233", email: "redsolidariachaco@gmail.com",
    estado_verificacion: "verificada", promedio: 4.9, total_resenas: 37,
    necesidades: [
      { tipo: "voluntarios", detalle: "Voluntarios con movilidad propia", urgencia: "media" },
      { tipo: "materiales", detalle: "Colchones, frazadas, bidones de agua", urgencia: "baja" }
    ],
    acepta_retiro: true, localidad: "Resistencia"
  }
]

const CHACO_CENTER = [-26.5, -60.5]
const CHACO_BOUNDS = [[-24.0, -63.5], [-28.5, -58.0]]

// ─── SUB-COMPONENTES ─────────────────────────────────────────────────────────

const StarRating = ({ rating }) => {
  const full = Math.floor(rating)
  const half = rating - full >= 0.3
  return (
    <span style={{ letterSpacing: 1, fontSize: 14 }}>
      {"⭐".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  )
}

const UrgenciaBadge = ({ urgencia }) => {
  const colors = {
    alta: { bg: "#FEE2E2", text: "#DC2626", label: "URGENTE" },
    media: { bg: "#FEF3C7", text: "#D97706", label: "NECESITA" },
    baja: { bg: "#DBE AFE", text: "#2563EB", label: "OPCIONAL" },
  }
  const c = colors[urgencia] || colors.media
  return (
    <span style={{
      background: c.bg, color: c.text, fontSize: 9, fontWeight: 700,
      padding: "2px 6px", borderRadius: 4, letterSpacing: 0.5
    }}>{c.label}</span>
  )
}

const VerificadoBadge = ({ estado }) => {
  if (estado === "verificada") return (
    <span style={{
      background: "#D1FAE5", color: "#059669", fontSize: 10, fontWeight: 700,
      padding: "2px 8px", borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 3
    }}>✓ Verificada</span>
  )
  return (
    <span style={{
      background: "#FEF3C7", color: "#D97706", fontSize: 10, fontWeight: 700,
      padding: "2px 8px", borderRadius: 10
    }}>⏳ Pendiente</span>
  )
}

const InstitucionCard = ({ inst, categorias, onClose, isPopup, onClick, onVoluntario, onHistoria, onResena, onDonacion }) => {
  const cats = (inst.categorias || []).map(cid => categorias.find(c => c.id === cid)).filter(Boolean)

  return (
    <div
      onClick={onClick}
      style={{
        background: "white", borderRadius: isPopup ? 12 : 16, width: "100%",
        maxWidth: isPopup ? 340 : undefined,
        boxShadow: isPopup ? "0 8px 30px rgba(0,0,0,0.2)" : "0 2px 12px rgba(0,0,0,0.06)",
        border: isPopup ? "none" : "1px solid #E5E7EB",
        fontFamily: "'DM Sans', sans-serif", overflow: "hidden",
        transition: "all 0.25s ease", cursor: onClick ? "pointer" : "default"
      }}
    >
      <div style={{
        background: "linear-gradient(135deg, #0D4F3C 0%, #1B7A5A 100%)",
        padding: isPopup ? "12px 14px" : "16px 20px", position: "relative"
      }}>
        {onClose && (
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={{
            position: "absolute", top: 8, right: 8, background: "rgba(255,255,255,0.2)",
            border: "none", color: "white", width: 24, height: 24, borderRadius: "50%", cursor: "pointer",
            fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center"
          }}>×</button>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: isPopup ? 20 : 24 }}>{cats[0]?.icono || "🏢"}</span>
          <h3 style={{
            margin: 0, color: "white", fontSize: isPopup ? 14 : 16,
            fontWeight: 700, lineHeight: 1.3
          }}>{inst.nombre}</h3>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {cats.map(c => (
            <span key={c.id} style={{
              background: "rgba(255,255,255,0.15)", color: "white",
              fontSize: 10, padding: "2px 8px", borderRadius: 8
            }}>{c.nombre}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: isPopup ? "10px 14px" : "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <VerificadoBadge estado={inst.estado_verificacion} />
          {inst.promedio > 0 && (
            <span style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 4 }}>
              <StarRating rating={inst.promedio} />
              <span style={{ fontWeight: 600 }}>{inst.promedio}</span>
              <span>({inst.total_resenas})</span>
            </span>
          )}
        </div>

        <p style={{
          fontSize: isPopup ? 12 : 13, color: "#4B5563", lineHeight: 1.5,
          margin: "0 0 10px 0",
          display: "-webkit-box", WebkitLineClamp: isPopup ? 2 : 3,
          WebkitBoxOrient: "vertical", overflow: "hidden"
        }}>{inst.descripcion}</p>

        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 4 }}>
            <span>📍</span><span>{inst.direccion}</span>
          </div>
          {inst.telefono && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span>📞</span><span>{inst.telefono}</span>
            </div>
          )}
          {inst.localidad && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>📍</span><span>{inst.localidad}</span>
            </div>
          )}
        </div>

        {inst.necesidades && inst.necesidades.length > 0 && (
          <div style={{
            background: "#F9FAFB", borderRadius: 8, padding: "8px 10px", marginBottom: 10
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: "#374151",
              textTransform: "uppercase", letterSpacing: 1, marginBottom: 6
            }}>Necesidades actuales</div>
            {inst.necesidades.slice(0, isPopup ? 2 : 4).map((n, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 6, marginBottom: 4, fontSize: 12
              }}>
                <UrgenciaBadge urgencia={n.urgencia} />
                <span style={{ color: "#4B5563" }}>{n.detalle}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onVoluntario} style={{
            flex: 1, background: "#0D4F3C", color: "white", border: "none",
            padding: "8px 0", borderRadius: 8, fontSize: 12, fontWeight: 700,
            cursor: "pointer"
          }}>💚 Quiero SUMAR</button>
          {inst.whatsapp && (
            <a href={`https://wa.me/54${inst.whatsapp?.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, background: "#25D366", color: "white", border: "none",
              padding: "8px 0", borderRadius: 8, fontSize: 12, fontWeight: 700,
              cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 4
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chateá
            </a>
          )}
        </div>
        <button onClick={e => { e.stopPropagation(); onDonacion && onDonacion() }} style={{
          width: "100%", marginTop: 8, background: "#FFF7ED", color: "#92400E",
          border: "1.5px solid #FCD34D", padding: "8px 0", borderRadius: 8,
          fontSize: 12, fontWeight: 700, cursor: "pointer"
        }}>🚚 Donar materiales</button>
        <button onClick={e => { e.stopPropagation(); onHistoria && onHistoria() }} style={{
          width: "100%", marginTop: 8, background: "#F0FDF4", color: "#0D4F3C",
          border: "1.5px solid #86EFAC", padding: "8px 0", borderRadius: 8,
          fontSize: 12, fontWeight: 700, cursor: "pointer"
        }}>📖 Quiénes somos · Conocé nuestra historia</button>
        <button onClick={e => { e.stopPropagation(); onResena && onResena() }} style={{
          width: "100%", marginTop: 6, background: "#FFFBEB", color: "#92400E",
          border: "1.5px solid #FCD34D", padding: "8px 0", borderRadius: 8,
          fontSize: 12, fontWeight: 700, cursor: "pointer"
        }}>⭐ Dejar una reseña</button>
      </div>
    </div>
  )
}

// ─── APP PRINCIPAL ──────────────────────────────────────────────────────────

export default function DondeSumo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCats, setSelectedCats] = useState([])
  const [selectedLocalidad, setSelectedLocalidad] = useState("")
  const [selectedInst, setSelectedInst] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [view, setView] = useState("mapa")
  const [showModal, setShowModal] = useState(false)
  const [showVoluntarioModal, setShowVoluntarioModal] = useState(false)
  const [voluntarioData, setVoluntarioData] = useState({ nombre: "", email: "", telefono: "", oferta: [], comentario: "", otros: "" })
  const [instituciones, setInstituciones] = useState(INSTITUCIONES_MOCK)
  const [showMenu, setShowMenu] = useState(false)
  const [showQuienesSomos, setShowQuienesSomos] = useState(false)
  const [showMensaje, setShowMensaje] = useState(false)
  const [mensaje, setMensaje] = useState({ nombre: "", email: "", texto: "" })
  const [showHistoriaModal, setShowHistoriaModal] = useState(false)
  const [instHistoria, setInstHistoria] = useState(null)
  const [showResenaModal, setShowResenaModal] = useState(false)
  const [resenaData, setResenaData] = useState({ nombre: "", apellido: "", celular: "", comentario: "", calificacion: 5 })
  const [showDonacionModal, setShowDonacionModal] = useState(false)
  const [donacionData, setDonacionData] = useState({ nombre: "", email: "", telefono: "", descripcion: "" })
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markersRef = useRef([])
  const leafletLoaded = useRef(false)

  // Cargar instituciones desde la API
  useEffect(() => {
    fetch('/api/instituciones/search')
      .then(r => r.json())
      .then(data => {
        if (data.success && data.instituciones.length > 0) {
          // Adaptar campos de Supabase al formato del frontend
          const adapted = data.instituciones.map(i => ({
            ...i,
            lat: parseFloat(i.latitud),
            lng: parseFloat(i.longitud),
            categorias: i.categorias || [],
            tags: i.tags || [],
            necesidades: i.necesidades_actuales || []
          }))
          setInstituciones(adapted)
        }
      })
      .catch(() => {}) // Si falla, usa los mock
  }, [])

  const filtered = useMemo(() => {
    return instituciones.filter(inst => {
      const term = searchTerm.toLowerCase().trim()
      if (term) {
        const matchName = inst.nombre.toLowerCase().includes(term)
        const matchTags = (inst.tags || []).some(t => t.toLowerCase().includes(term))
        const matchDesc = inst.descripcion?.toLowerCase().includes(term)
        const matchLoc = inst.localidad?.toLowerCase().includes(term)
        if (!matchName && !matchTags && !matchDesc && !matchLoc) return false
      }
      if (selectedLocalidad && inst.localidad !== selectedLocalidad) return false
      return true
    })
  }, [searchTerm, selectedCats, selectedLocalidad, instituciones])

  const localidades = useMemo(() =>
    [...new Set(INSTITUCIONES_MOCK.map(i => i.localidad))].sort(), [])

  const loadLeaflet = useCallback(() => {
    if (leafletLoaded.current) return Promise.resolve()
    return new Promise((resolve) => {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      document.head.appendChild(link)
      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
      script.onload = () => { leafletLoaded.current = true; resolve() }
      document.head.appendChild(script)
    })
  }, [])

  const initMap = useCallback(async () => {
    if (!mapRef.current || mapInstance.current) return
    await loadLeaflet()
    const L = window.L
    if (!L) return
    const map = L.map(mapRef.current, {
      center: CHACO_CENTER, zoom: 7,
      maxBounds: CHACO_BOUNDS, minZoom: 6, maxZoom: 18, zoomControl: false,
    })
    L.control.zoom({ position: "bottomright" }).addTo(map)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd", maxZoom: 19
    }).addTo(map)
    mapInstance.current = map
    setMapReady(true)
  }, [loadLeaflet])

  useEffect(() => {
    if (view === "mapa") {
      const timer = setTimeout(initMap, 100)
      return () => clearTimeout(timer)
    }
  }, [view, initMap])

  useEffect(() => {
    if (!mapReady || !mapInstance.current) return
    const L = window.L
    if (!L) return
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []
    filtered.forEach(inst => {
      const cat = CATEGORIAS.find(c => c.id === inst.categorias[0])
      const isVerified = inst.estado_verificacion === "verificada"
      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width:36px;height:36px;border-radius:50%;
          background:${isVerified ? "#0D4F3C" : "#9CA3AF"};
          display:flex;align-items:center;justify-content:center;
          font-size:18px;box-shadow:0 2px 8px rgba(0,0,0,0.3);
          border:3px solid white;cursor:pointer;
          transition:transform 0.2s;
        " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"
        >${cat?.icono || "🏢"}</div>`,
        iconSize: [36, 36], iconAnchor: [18, 18],
      })
      const marker = L.marker([inst.lat, inst.lng], { icon }).addTo(mapInstance.current)
      marker.on("click", () => {
        setSelectedInst(inst)
        mapInstance.current.flyTo([inst.lat, inst.lng], 15, { duration: 0.8 })
      })
      markersRef.current.push(marker)
    })
    if (filtered.length > 0 && !selectedInst) {
      const bounds = L.latLngBounds(filtered.map(i => [i.lat, i.lng]))
      mapInstance.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
    }
  }, [filtered, mapReady, selectedInst])

  const toggleCat = (catId) => {
    setSelectedCats(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId])
  }

  const clearFilters = () => {
    setSearchTerm(""); setSelectedCats([]); setSelectedLocalidad(""); setSelectedInst(null)
  }

  const activeFiltersCount = selectedCats.length + (selectedLocalidad ? 1 : 0)

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      height: "100vh", height: "100dvh",
      display: "flex", flexDirection: "column",
      background: "#F3F4F6", overflow: "hidden"
    }}>
      {/* MODAL */}
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "white", borderRadius: 16, padding: "32px 28px", maxWidth: 500,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)", position: "relative", margin: "20px"
          }}>
            <button onClick={() => setShowModal(false)} style={{
              position: "absolute", top: 16, right: 16, background: "none", border: "none",
              fontSize: 24, cursor: "pointer", color: "#6B7280"
            }}>×</button>

            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900,
              color: "#0D4F3C", marginBottom: 16, lineHeight: 1.2
            }}>
              Bienvenido a <span style={{ color: "#86EFAC" }}>Agentes de Cambio</span>
            </h2>

            <p style={{
              fontSize: 15, color: "#4B5563", lineHeight: 1.6, marginBottom: 16
            }}>
              Esta plataforma te conecta con instituciones, comedores, refugios, organizaciones sociales y ONG's del Chaco donde podés <strong>ayudar y generar cambios reales</strong>.
            </p>

            <div style={{
              background: "#F9FAFB", borderRadius: 12, padding: "16px", marginBottom: 16
            }}>
              <p style={{ fontSize: 13, color: "#374151", marginBottom: 8 }}>
                <strong>¿Qué podés hacer?</strong>
              </p>
              <ul style={{ fontSize: 13, color: "#4B5563", marginLeft: 16, lineHeight: 1.7 }}>
                <li>🗺️ <strong>Busca por mapa</strong> — descubrí instituciones cerca tuyo</li>
                <li>🔍 <strong>Filtra por tema</strong> — niños, animales, salud, educación, y más</li>
                <li>🤝 <strong>Sumate como voluntario</strong> — dona tu tiempo y habilidades</li>
                <li>🚚 <strong>Dona materiales</strong> — ropa, alimentos, útiles escolares</li>
                <li>⭐ <strong>Deja reseñas</strong> — ayuda a otros a elegir dónde ayudar</li>
              </ul>
            </div>

            <p style={{
              fontSize: 12, color: "#9CA3AF", marginBottom: 20
            }}>
              Todas las instituciones mostradas son verificadas. Tu ayuda hace la diferencia. 💚
            </p>

            <button onClick={() => setShowModal(false)} style={{
              width: "100%", padding: "12px 0", background: "#0D4F3C", color: "white",
              border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700,
              cursor: "pointer"
            }}>
              Comenzar a explorar
            </button>
            <button onClick={() => { setShowModal(false); setShowQuienesSomos(true) }} style={{
              width: "100%", marginTop: 10, padding: "10px 0", background: "none",
              border: "none", color: "#0D4F3C", fontSize: 13, fontWeight: 600,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
            }}>
              ¿Querés saber más de nosotros? <span style={{ fontSize: 16 }}>→</span>
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header style={{
        background: "linear-gradient(135deg, #0D4F3C 0%, #1A6B4F 50%, #2D8B6A 100%)",
        padding: "16px 20px 12px", color: "white", position: "relative", overflow: "hidden",
        flexShrink: 0
      }}>
        <div style={{
          position: "absolute", top: -30, right: -30, width: 120, height: 120,
          borderRadius: "50%", background: "rgba(255,255,255,0.05)"
        }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, position: "relative" }}>
          <div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 26,
              fontWeight: 900, letterSpacing: -0.5, lineHeight: 1
            }}>
              Agentes de <span style={{ color: "#86EFAC" }}>Cambio</span>
            </h1>
            <p style={{ fontSize: 11, opacity: 0.85, marginTop: 3, fontWeight: 300, lineHeight: 1.4 }}>
              ¿Donde puedo generar cambios? ¿Donde puedo Ayudar?
            </p>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {["mapa", "lista"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
                background: view === v ? "white" : "rgba(255,255,255,0.15)",
                color: view === v ? "#0D4F3C" : "white"
              }}>{v === "mapa" ? "🗺️ Mapa" : "📋 Lista"}</button>
            ))}
            <button onClick={() => setShowMenu(!showMenu)} style={{
              background: "rgba(255,255,255,0.15)", border: "none", color: "white",
              borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 18
            }}>☰</button>
          </div>
        </div>

        {/* MENÚ DESPLEGABLE */}
        {showMenu && (
          <div style={{
            position: "absolute", top: 60, right: 20, background: "white",
            borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            zIndex: 9000, minWidth: 200, overflow: "hidden"
          }}>
            <a href="/" style={{
              display: "block", width: "100%", padding: "14px 20px", textAlign: "left",
              background: "none", border: "none", borderBottom: "1px solid #F3F4F6",
              cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#0D4F3C",
              textDecoration: "none"
            }}>🏠 Ir al inicio</a>
            <a href="/registrar" onClick={() => setShowMenu(false)} style={{
              display: "block", width: "100%", padding: "14px 20px", textAlign: "left",
              background: "none", border: "none", borderBottom: "1px solid #F3F4F6",
              cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#0D4F3C",
              textDecoration: "none"
            }}>🏢 Agregá tu institución en este mapa</a>
            <button onClick={() => { setShowMensaje(true); setShowMenu(false) }} style={{
              display: "block", width: "100%", padding: "14px 20px", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 600, color: "#0D4F3C"
            }}>✉️ Dejanos tu Mensaje</button>
          </div>
        )}

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 8 }}>
          <input
            type="text" value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscá por tema: niños, animales, comedor..."
            style={{
              width: "100%", padding: "10px 40px 10px 38px",
              borderRadius: 10, border: "2px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.12)", color: "white",
              fontSize: 14, outline: "none", backdropFilter: "blur(10px)"
            }}
          />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} style={{
              position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.2)", border: "none", color: "white",
              width: 22, height: 22, borderRadius: "50%", cursor: "pointer", fontSize: 12,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>×</button>
          )}
        </div>

        {/* Filter controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => setShowFilters(!showFilters)} style={{
            padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
            cursor: "pointer", border: "none",
            background: showFilters || activeFiltersCount > 0 ? "#86EFAC" : "rgba(255,255,255,0.12)",
            color: showFilters || activeFiltersCount > 0 ? "#0D4F3C" : "white",
          }}>⚙️ Categorías {activeFiltersCount > 0 && `(${activeFiltersCount})`}</button>
          <select value={selectedLocalidad} onChange={e => setSelectedLocalidad(e.target.value)} style={{
            padding: "6px 10px", borderRadius: 8, fontSize: 12,
            background: "rgba(255,255,255,0.12)", color: "white",
            border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", outline: "none"
          }}>
            <option value="" style={{ color: "#333" }}>Todas las localidades</option>
            {localidades.map(l => <option key={l} value={l} style={{ color: "#333" }}>{l}</option>)}
          </select>
          {activeFiltersCount > 0 && (
            <button onClick={clearFilters} style={{
              padding: "6px 10px", borderRadius: 8, fontSize: 11,
              background: "rgba(255,255,255,0.1)", color: "#FCA5A5",
              border: "none", cursor: "pointer", fontWeight: 600
            }}>Limpiar filtros</button>
          )}
        </div>

        {/* Category chips */}
        {showFilters && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
            {CATEGORIAS.map(cat => (
              <div key={cat.id} onClick={() => toggleCat(cat.id)} style={{
                padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 4, cursor: "pointer",
                transition: "all 0.2s",
                background: selectedCats.includes(cat.id) ? "#86EFAC" : "rgba(255,255,255,0.1)",
                color: selectedCats.includes(cat.id) ? "#0D4F3C" : "white",
                border: `1px solid ${selectedCats.includes(cat.id) ? "#86EFAC" : "rgba(255,255,255,0.15)"}`
              }}>
                <span>{cat.icono}</span><span>{cat.nombre}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* STATS */}
      <div style={{
        background: "white", padding: "8px 20px", borderBottom: "1px solid #E5E7EB",
        display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13,
        flexShrink: 0
      }}>
        <span style={{ color: "#6B7280" }}>
          <strong style={{ color: "#0D4F3C" }}>{filtered.length}</strong> lugar{filtered.length !== 1 ? "es" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </span>
        <span style={{ fontSize: 11, color: "#9CA3AF" }}>
          {filtered.filter(i => i.estado_verificacion === "verificada").length} verificados ✓
        </span>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* MAPA - siempre montado, solo oculto en vista lista */}
        <div style={{ display: view === "mapa" ? "block" : "none", width: "100%", height: "100%", position: "absolute", inset: 0, zIndex: 1 }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
          {selectedInst && (
            <div style={{
              position: "absolute", bottom: 16, left: 16, right: 16,
              zIndex: 1000, maxWidth: 400, margin: "0 auto"
            }}>
              <InstitucionCard
                inst={selectedInst} categorias={CATEGORIAS}
                onClose={() => setSelectedInst(null)} isPopup={true}
                onVoluntario={() => setShowVoluntarioModal(true)}
                onHistoria={() => { setInstHistoria(selectedInst); setShowHistoriaModal(true) }}
                onResena={() => setShowResenaModal(true)}
                onDonacion={() => setShowDonacionModal(true)}
              />
            </div>
          )}
          <div style={{
            position: "absolute", top: 12, right: 12, background: "white",
            borderRadius: 10, padding: "10px 14px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1000, fontSize: 11
          }}>
            <div style={{ fontWeight: 700, marginBottom: 6, color: "#374151" }}>Referencias</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#0D4F3C", border: "3px solid white", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              <span style={{ color: "#6B7280" }}>Verificada</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#9CA3AF", border: "3px solid white", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              <span style={{ color: "#6B7280" }}>Pendiente</span>
            </div>
          </div>
        </div>

        {/* LISTA - visible solo en vista lista */}
        {view === "lista" && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 5000,
            padding: 16, overflowY: "auto", background: "#F3F4F6",
            display: "flex", flexDirection: "column", gap: 12
          }}>
            {/* Vista lista: primero categorías, luego instituciones */}
            {selectedCats.length === 0 ? (
              // GRID DE CATEGORÍAS
              <div>
                <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 12, textAlign: "center" }}>Elegí una categoría para ver las instituciones</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {CATEGORIAS.map(cat => {
                    const count = instituciones.filter(i => (i.categorias || []).includes(cat.id)).length
                    return (
                      <button key={cat.id} onClick={() => setSelectedCats([cat.id])} style={{
                        background: "white", border: "1.5px solid #E5E7EB", borderRadius: 14,
                        padding: "16px 12px", cursor: "pointer", textAlign: "left",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "all 0.15s"
                      }}>
                        <div style={{ fontSize: 26, marginBottom: 6 }}>{cat.icono}</div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", lineHeight: 1.3 }}>{cat.nombre}</div>
                        <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>{count > 0 ? `${count} lugar${count !== 1 ? 'es' : ''}` : 'Próximamente'}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              // LISTA DE INSTITUCIONES FILTRADAS POR CATEGORÍA
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <button onClick={() => setSelectedCats([])} style={{ background: "#F3F4F6", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: 4 }}>← Categorías</button>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#0D4F3C" }}>
                    {CATEGORIAS.find(c => selectedCats.includes(c.id))?.icono} {CATEGORIAS.find(c => selectedCats.includes(c.id))?.nombre}
                  </span>
                </div>
                {filtered.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 20px", color: "#9CA3AF" }}>
                    <div style={{ fontSize: 40, marginBottom: 10 }}>🏢</div>
                    <p style={{ fontSize: 14, color: "#6B7280" }}>No hay instituciones en esta categoría aún</p>
                  </div>
                ) : (
                  filtered.map((inst) => (
                    <div key={inst.id} style={{ marginBottom: 12 }}>
                      <InstitucionCard
                        inst={inst} categorias={CATEGORIAS} isPopup={false}
                        onClick={() => { 
                          setSelectedInst(inst)
                          setView("mapa")
                          setTimeout(() => {
                            if (mapInstance.current && inst.lat && inst.lng) {
                              mapInstance.current.flyTo([inst.lat, inst.lng], 15, { duration: 0.8 })
                            }
                          }, 300)
                        }}
                        onVoluntario={() => { setSelectedInst(inst); setShowVoluntarioModal(true) }}
                        onHistoria={() => { setInstHistoria(inst); setShowHistoriaModal(true) }}
                        onResena={() => { setSelectedInst(inst); setShowResenaModal(true) }}
                        onDonacion={() => { setSelectedInst(inst); setShowDonacionModal(true) }}
                      />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{
        background: "#0D4F3C", padding: "10px 20px", textAlign: "center",
        color: "rgba(255,255,255,0.6)", fontSize: 11, flexShrink: 0
      }}>
        <span style={{ fontWeight: 700, color: "#86EFAC" }}>Agentes de Cambio</span>
        {" · "}Chaco, Argentina{" · "}¿Donde puedo Ayudar? 💚
      </footer>

      {/* MODAL VOLUNTARIOS */}
      {showVoluntarioModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10000, padding: 16
        }}>
          <div style={{
            background: "white", borderRadius: 16, padding: 24,
            maxWidth: 500, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{ margin: "0 0 16px 0", color: "#0D4F3C", fontSize: 22 }}>
              Sumarte a {selectedInst?.nombre}
            </h2>
            <form onSubmit={async e => {
              e.preventDefault()
              try {
                const res = await fetch('/api/voluntarios/registro', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ ...voluntarioData, institucion_id: selectedInst?.id, institucion_nombre: selectedInst?.nombre })
                })
                const data = await res.json()
                if (data.success) {
                  alert(`✅ Gracias ${voluntarioData.nombre}! Te contactaremos pronto.`)
                  setShowVoluntarioModal(false)
                  setVoluntarioData({ nombre: "", email: "", telefono: "", oferta: [], comentario: "" })
                } else {
                  alert(`❌ Error: ${data.error}`)
                }
              } catch {
                alert('❌ Error al enviar. Intentá de nuevo.')
              }
            }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="text" placeholder="Tu nombre" required
                value={voluntarioData.nombre}
                onChange={e => setVoluntarioData({...voluntarioData, nombre: e.target.value})}
                style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }}
              />
              <input
                type="email" placeholder="Tu email" required
                value={voluntarioData.email}
                onChange={e => setVoluntarioData({...voluntarioData, email: e.target.value})}
                style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }}
              />
              <input
                type="tel" placeholder="Tu teléfono"
                value={voluntarioData.telefono}
                onChange={e => setVoluntarioData({...voluntarioData, telefono: e.target.value})}
                style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }}
              />
              <div style={{ color: "#6B7280", fontSize: 13, fontWeight: 600 }}>¿Que puedo ofrecer?</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["⏰ Tiempo", "🚗 Transporte", "💼 Habilidad", "🔧 Oficio", "🍱 Alimentos", "📦 Otros"].map(opt => (
                  <label key={opt} style={{ display: "flex", gap: 8, fontSize: 13 }}>
                    <input
                      type="checkbox"
                      checked={voluntarioData.oferta.includes(opt)}
                      onChange={e => setVoluntarioData({
                        ...voluntarioData,
                        oferta: e.target.checked
                          ? [...voluntarioData.oferta, opt]
                          : voluntarioData.oferta.filter(o => o !== opt)
                      })}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
              {voluntarioData.oferta.includes("📦 Otros") && (
                <input
                  type="text"
                  placeholder="Describí qué podés donar..."
                  value={voluntarioData.otros || ""}
                  onChange={e => setVoluntarioData({...voluntarioData, otros: e.target.value})}
                  style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }}
                />
              )}
              <textarea
                placeholder="Dejanos tu comentario o mensaje (opcional)"
                value={voluntarioData.comentario || ""}
                onChange={e => setVoluntarioData({...voluntarioData, comentario: e.target.value})}
                rows={3}
                style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button type="submit" style={{
                  flex: 1, background: "#0D4F3C", color: "white", border: "none",
                  padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14
                }}>Registrarme</button>
                <button type="button" onClick={() => setShowVoluntarioModal(false)} style={{
                  flex: 1, background: "#F3F4F6", color: "#374151", border: "none",
                  padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14
                }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DONACIÓN */}
      {showDonacionModal && selectedInst && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 24, maxWidth: 480, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#92400E", margin: "0 0 4px 0", fontSize: 20 }}>🚚 Donar materiales</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 16px 0" }}>{selectedInst.nombre}</p>
            <form onSubmit={async e => {
              e.preventDefault()
              try {
                const res = await fetch('/api/donaciones', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ ...donacionData, institucion_id: selectedInst.id, institucion_nombre: selectedInst.nombre, institucion_email: selectedInst.email })
                })
                const data = await res.json()
                if (data.success) {
                  alert(`✅ ¡Gracias ${donacionData.nombre}! La institución recibirá tu información y te contactará pronto.`)
                  setShowDonacionModal(false)
                  setDonacionData({ nombre: "", email: "", telefono: "", descripcion: "" })
                } else {
                  alert(`❌ Error: ${data.error}`)
                }
              } catch (err) {
                alert('❌ Error: ' + err.message)
              }
            }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Tu nombre *" required value={donacionData.nombre} onChange={e => setDonacionData({...donacionData, nombre: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="email" placeholder="Tu email *" required value={donacionData.email} onChange={e => setDonacionData({...donacionData, email: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="tel" placeholder="Tu teléfono" value={donacionData.telefono} onChange={e => setDonacionData({...donacionData, telefono: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <textarea placeholder="¿Qué querés donar? Describí los materiales, cantidad y estado *" required value={donacionData.descripcion} onChange={e => setDonacionData({...donacionData, descripcion: e.target.value})} rows={4} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ background: "#FEF3C7", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#78350F" }}>
                💡 La institución recibirá un email con tus datos y se pondrá en contacto para coordinar la entrega.
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit" style={{ flex: 1, background: "#F59E0B", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Enviar donación</button>
                <button type="button" onClick={() => setShowDonacionModal(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL RESEÑA */}
      {showResenaModal && selectedInst && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 24, maxWidth: 460, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 4px 0", fontSize: 20 }}>⭐ Dejar reseña</h2>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 16px 0" }}>{selectedInst.nombre}</p>
            <div style={{ background: "#FEF3C7", borderRadius: 8, padding: "10px 12px", marginBottom: 14, fontSize: 12, color: "#78350F" }}>
              🔒 Pedimos tu nombre, apellido y celular para poder corroborar la autenticidad de cada reseña. Tus datos son privados y nunca se publican.
            </div>
            <form onSubmit={async e => {
              e.preventDefault()
              try {
                const res = await fetch('/api/resenas', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ ...resenaData, institucion_id: selectedInst.id })
                })
                const data = await res.json()
                if (data.success) {
                  alert('✅ ¡Gracias por tu reseña!')
                  setShowResenaModal(false)
                  setResenaData({ nombre: "", apellido: "", celular: "", comentario: "", calificacion: 5 })
                } else {
                  alert(`❌ Error: ${data.error}`)
                }
              } catch (err) {
                alert('❌ Error: ' + err.message)
              }
            }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <input type="text" placeholder="Nombre *" required value={resenaData.nombre || ""} onChange={e => setResenaData({...resenaData, nombre: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
                <input type="text" placeholder="Apellido *" required value={resenaData.apellido || ""} onChange={e => setResenaData({...resenaData, apellido: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              </div>
              <input type="tel" placeholder="Celular *" required value={resenaData.celular || ""} onChange={e => setResenaData({...resenaData, celular: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              {/* Estrellas */}
              <div>
                <div style={{ color: "#6B7280", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Calificación</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button" onClick={() => setResenaData({...resenaData, calificacion: n})} style={{
                      fontSize: 28, background: "none", border: "none", cursor: "pointer",
                      opacity: n <= resenaData.calificacion ? 1 : 0.3, transition: "opacity 0.1s"
                    }}>⭐</button>
                  ))}
                </div>
              </div>
              <textarea placeholder="Contanos tu experiencia... *" required value={resenaData.comentario} onChange={e => setResenaData({...resenaData, comentario: e.target.value})} rows={4} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit" style={{ flex: 1, background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Enviar reseña</button>
                <button type="button" onClick={() => setShowResenaModal(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL HISTORIA INSTITUCIÓN */}
      {showHistoriaModal && instHistoria && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, maxWidth: 560, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0D4F3C, #2D8B6A)", padding: "20px 24px", borderRadius: "16px 16px 0 0", position: "relative" }}>
              <button onClick={() => setShowHistoriaModal(false)} style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.2)", border: "none", color: "white", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>×</button>
              <h2 style={{ color: "white", margin: 0, fontSize: 20, fontFamily: "'Playfair Display', serif" }}>{instHistoria.nombre}</h2>
              <p style={{ color: "rgba(255,255,255,0.8)", margin: "4px 0 0 0", fontSize: 12 }}>📍 {instHistoria.direccion} · {instHistoria.localidad}</p>
            </div>

            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Año fundación */}
              {instHistoria.anio_fundacion && (
                <div style={{ background: "#F0FDF4", borderRadius: 10, padding: "10px 16px", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>📅</span>
                  <span style={{ color: "#0D4F3C", fontWeight: 700, fontSize: 14 }}>Fundada en {instHistoria.anio_fundacion}</span>
                </div>
              )}

              {/* Descripción */}
              <div>
                <h3 style={{ color: "#0D4F3C", fontSize: 14, fontWeight: 700, margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: 1 }}>🏢 Qué hacemos</h3>
                <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{instHistoria.descripcion || "Información no disponible."}</p>
              </div>

              {/* Historia */}
              <div>
                <h3 style={{ color: "#0D4F3C", fontSize: 14, fontWeight: 700, margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: 1 }}>📜 Nuestra Historia</h3>
                <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  {instHistoria.historia || "Esta institución aún no cargó su historia. Si sos parte de ella, ¡contactanos para completar su perfil!"}
                </p>
              </div>

              {/* Responsables */}
              {instHistoria.responsables && (
                <div>
                  <h3 style={{ color: "#0D4F3C", fontSize: 14, fontWeight: 700, margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: 1 }}>👥 Responsables</h3>
                  <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{instHistoria.responsables}</p>
                </div>
              )}

              {/* A quiénes va dirigido */}
              {instHistoria.dirigido_a && (
                <div>
                  <h3 style={{ color: "#0D4F3C", fontSize: 14, fontWeight: 700, margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: 1 }}>🎯 A quiénes va dirigido</h3>
                  <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{instHistoria.dirigido_a}</p>
                </div>
              )}

              {/* Necesidades actuales */}
              {instHistoria.necesidades && instHistoria.necesidades.length > 0 && (
                <div>
                  <h3 style={{ color: "#0D4F3C", fontSize: 14, fontWeight: 700, margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: 1 }}>🆘 Necesidades Actuales</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {instHistoria.necesidades.map((n, i) => (
                      <div key={i} style={{ background: "#F9FAFB", borderRadius: 8, padding: "8px 12px", display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                        <UrgenciaBadge urgencia={n.urgencia} />
                        <span style={{ color: "#374151" }}>{n.detalle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contacto */}
              <div style={{ background: "#F0FDF4", borderRadius: 10, padding: "12px 16px" }}>
                <h3 style={{ color: "#0D4F3C", fontSize: 13, fontWeight: 700, margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: 1 }}>📞 Contacto</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "#374151" }}>
                  {instHistoria.telefono && <span>📞 {instHistoria.telefono}</span>}
                  {instHistoria.email && <span>✉️ {instHistoria.email}</span>}
                  {instHistoria.instagram && <span>📸 {instHistoria.instagram}</span>}
                  {instHistoria.whatsapp && (
                    <a href={`https://wa.me/54${instHistoria.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" style={{
                      display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366",
                      color: "white", padding: "8px 16px", borderRadius: 8, fontWeight: 700,
                      textDecoration: "none", fontSize: 13, marginTop: 4
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Chateá por WhatsApp
                    </a>
                  )}
                </div>
              </div>

              <button onClick={() => setShowHistoriaModal(false)} style={{ background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL QUIÉNES SOMOS */}
      {showQuienesSomos && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 500, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 16px 0", fontSize: 24, fontFamily: "'Playfair Display', serif" }}>👥 Quiénes Somos</h2>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
              Creemos firmemente que cambiar el mundo no es una utopía, sino el resultado de miles de personas haciendo cosas pequeñas en el lugar correcto. Somos una plataforma diseñada para conectar: unimos a ciudadanos con ganas de sumar su "granito de arena" con las instituciones que más los necesitan.
            </p>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7 }}>
              Nacimos en Resistencia con una convicción clara: cada micro-acción cuenta. Queremos que tu intención de ayudar se transforme en un impacto real, eliminando la incertidumbre. Por eso, no solo te mostramos dónde ayudar, sino que certificamos y validamos cada espacio para que tu confianza sea el puente hacia un mundo mejor!
            </p>
            <button onClick={() => setShowQuienesSomos(false)} style={{ marginTop: 20, background: "#0D4F3C", color: "white", border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 700, cursor: "pointer", width: "100%" }}>Cerrar</button>
          </div>
        </div>
      )}

      {/* MODAL DEJANOS TU MENSAJE */}
      {showMensaje && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 500, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ color: "#0D4F3C", margin: "0 0 16px 0", fontSize: 24, fontFamily: "'Playfair Display', serif" }}>✉️ Dejanos tu Mensaje</h2>
            <form onSubmit={async e => {
              e.preventDefault()
              try {
                const res = await fetch('/api/mensajes', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(mensaje)
                })
                const data = await res.json()
                if (data.success) {
                  alert(`✅ ¡Gracias ${mensaje.nombre}! Recibimos tu mensaje.`)
                  setShowMensaje(false)
                  setMensaje({ nombre: "", email: "", texto: "" })
                } else {
                  alert(`❌ Error: ${data.error}`)
                }
              } catch {
                alert('❌ Error al enviar. Intentá de nuevo.')
              }
            }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" placeholder="Tu nombre" required value={mensaje.nombre} onChange={e => setMensaje({...mensaje, nombre: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <input type="email" placeholder="Tu email" required value={mensaje.email} onChange={e => setMensaje({...mensaje, email: e.target.value})} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14 }} />
              <textarea placeholder="Tu mensaje..." required value={mensaje.texto} onChange={e => setMensaje({...mensaje, texto: e.target.value})} rows={4} style={{ padding: "10px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 14, resize: "vertical" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit" style={{ flex: 1, background: "#0D4F3C", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Enviar</button>
                <button type="button" onClick={() => setShowMensaje(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374151", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}