import './globals.css'

export const metadata = {
  title: 'Agentes de Cambio | ¿Donde puedo Ayudar?',
  description: 'Plataforma para conectar ciudadanos con instituciones donde pueden ayudar: comedores, refugios, protectoras, hogares y más.',
  openGraph: {
    title: 'Agentes de Cambio',
    description: '¿Donde puedo generar cambios? ¿Donde puedo Ayudar? Comedores, refugios, protectoras, hogares y más.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#0D4F3C" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💚</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  )
}
