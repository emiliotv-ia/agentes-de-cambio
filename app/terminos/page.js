'use client'

export default function TerminosPage() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#F8FAF9", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #0D4F3C, #2D8B6A)", padding: "28px 24px 36px", color: "white" }}>
        <a href="/" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>← Volver al inicio</a>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 8px 0" }}>📋 Términos y Condiciones</h1>
        <p style={{ fontSize: 13, opacity: 0.85, margin: 0 }}>Última actualización: Mayo 2026</p>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* AVISO DESTACADO */}
        <div style={{ background: "#FEF3C7", border: "1.5px solid #FCD34D", borderRadius: 14, padding: "20px 24px", marginBottom: 28 }}>
          <h2 style={{ color: "#92400E", margin: "0 0 10px 0", fontSize: 16 }}>⚠️ Aviso importante</h2>
          <p style={{ color: "#78350F", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            <strong>Agentes de Cambio</strong> es una plataforma digital de intermediación que conecta ciudadanos con instituciones solidarias. No somos responsables de las acciones, omisiones, gestión de fondos o materiales de las instituciones registradas, ni de los resultados de las donaciones o actividades de voluntariado.
          </p>
        </div>

        {[
          {
            titulo: "1. Naturaleza de la plataforma",
            contenido: `Agentes de Cambio es una plataforma digital de intermediación sin fines de lucro que actúa como nexo entre ciudadanos que desean colaborar y organizaciones solidarias del Chaco, Argentina. Nuestra función se limita a facilitar el contacto y la visibilidad de instituciones registradas, sin intervenir en la gestión, administración o ejecución de donaciones, voluntariados u otras actividades.

En concordancia con la Ley Nacional N° 25.855 de Voluntariado Social y sus disposiciones reglamentarias, Agentes de Cambio actúa como plataforma intermediaria y no asume responsabilidad directa por las actividades desarrolladas por las instituciones registradas.`
          },
          {
            titulo: "2. Exención de responsabilidad",
            contenido: `Agentes de Cambio no se hace responsable por:

• El uso que las instituciones hagan de las donaciones recibidas (dinero, materiales, alimentos, etc.)
• La veracidad completa de la información proporcionada por cada institución al momento de su registro
• Daños, perjuicios o inconvenientes que pudieran surgir de la relación entre donantes/voluntarios e instituciones
• La calidad, cantidad o destino final de los materiales donados
• Accidentes, lesiones o daños que pudieran ocurrir durante actividades de voluntariado
• El incumplimiento por parte de las instituciones de compromisos asumidos con donantes o voluntarios

De acuerdo con los Arts. 1710 a 1715 del Código Civil y Comercial de la Nación Argentina, Agentes de Cambio actúa de buena fe como intermediario y toma medidas razonables de verificación, sin que ello implique garantía absoluta sobre la conducta de terceros.`
          },
          {
            titulo: "3. Proceso de verificación",
            contenido: `Agentes de Cambio realiza un proceso de verificación básica de las instituciones registradas, que incluye la revisión de la información proporcionada y, cuando es posible, la confirmación de su existencia y actividad. Sin embargo, dicha verificación no constituye una auditoría exhaustiva ni garantiza la correcta administración de los recursos recibidos por las instituciones.

El distintivo "Verificada" en el mapa indica que hemos confirmado la existencia y actividad básica de la institución, no que auditamos su gestión financiera o administrativa.`
          },
          {
            titulo: "4. Responsabilidad de las instituciones",
            contenido: `Las instituciones registradas en Agentes de Cambio asumen plena responsabilidad por:

• La veracidad de la información proporcionada en su registro
• El uso apropiado y transparente de las donaciones recibidas
• El trato digno y respetuoso hacia voluntarios y donantes
• El cumplimiento de la normativa vigente aplicable a su actividad
• La comunicación oportuna de cambios en sus necesidades, datos de contacto o situación institucional

Al registrarse, las instituciones aceptan estos términos y se comprometen a actuar con transparencia y buena fe.`
          },
          {
            titulo: "5. Responsabilidad de donantes y voluntarios",
            contenido: `Los ciudadanos que utilicen la plataforma para donar o hacer voluntariado lo hacen de manera libre y voluntaria, asumiendo los riesgos inherentes a dichas actividades. Se recomienda:

• Verificar personalmente la institución antes de realizar donaciones de valor significativo
• No entregar dinero en efectivo sin recibir comprobante
• Consultar con la institución sobre sus necesidades actuales antes de donar materiales
• En caso de voluntariado presencial, coordinar previamente con los responsables de la institución`
          },
          {
            titulo: "6. Privacidad de datos",
            contenido: `Los datos personales recopilados (nombre, email, teléfono) son utilizados exclusivamente para facilitar la comunicación entre donantes, voluntarios e instituciones, y para el funcionamiento de la plataforma. No vendemos ni compartimos datos personales con terceros con fines comerciales. Los datos se almacenan en servidores seguros y pueden ser eliminados a solicitud del usuario.`
          },
          {
            titulo: "7. Modificaciones",
            contenido: `Agentes de Cambio se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigencia desde su publicación en la plataforma. El uso continuado de la plataforma implica la aceptación de los términos vigentes.`
          },
          {
            titulo: "8. Jurisdicción",
            contenido: `Ante cualquier controversia derivada del uso de esta plataforma, las partes se someten a la jurisdicción de los tribunales ordinarios de la ciudad de Resistencia, Provincia del Chaco, República Argentina, renunciando a cualquier otro fuero que pudiera corresponderles.`
          },
          {
            titulo: "9. Contacto",
            contenido: `Para consultas, reclamos o solicitudes relacionadas con estos términos, podés contactarnos a través del formulario de contacto disponible en la plataforma o enviando un mensaje desde el menú principal.`
          }
        ].map((seccion, i) => (
          <div key={i} style={{ background: "white", borderRadius: 14, padding: "22px 24px", marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <h2 style={{ color: "#0D4F3C", fontSize: 16, fontWeight: 700, margin: "0 0 12px 0" }}>{seccion.titulo}</h2>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>{seccion.contenido}</p>
          </div>
        ))}

        <div style={{ background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: 14, padding: "20px 24px", marginTop: 8 }}>
          <p style={{ color: "#0D4F3C", fontSize: 13, lineHeight: 1.7, margin: 0, textAlign: "center" }}>
            <strong>Agentes de Cambio</strong> · Resistencia, Chaco, Argentina<br/>
            Plataforma solidaria de intermediación · Mayo 2026<br/>
            <em>Pequeñas acciones, grandes cambios 💚</em>
          </p>
        </div>
      </div>

      <footer style={{ background: "#0D4F3C", padding: "20px 24px", textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
        <span style={{ fontWeight: 700, color: "#86EFAC" }}>Agentes de Cambio</span>{" · "}Chaco, Argentina{" · "}Cada acción cuenta 💚
      </footer>
    </div>
  )
}
