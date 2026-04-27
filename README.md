# DONDE SUMO? 💚

Plataforma para conectar ciudadanos con instituciones donde pueden ayudar en el Chaco.

## 🚀 Deploy en Vercel (GRATIS - 2 minutos)

### Paso 1: Subí el proyecto a GitHub

1. Andá a [github.com/new](https://github.com/new)
2. Poné de nombre: `donde-sumo`
3. Dejá todo por defecto y dale "Create repository"
4. Subí esta carpeta (podés arrastrar los archivos o usar Git)

### Paso 2: Conectá con Vercel

1. Andá a [vercel.com](https://vercel.com) y logueate con tu cuenta de GitHub
2. Click en **"Add New Project"**
3. Seleccioná el repo `donde-sumo`
4. Dejá todo por defecto (Vercel detecta Next.js solo)
5. Click en **"Deploy"**
6. En ~1 minuto tenés tu URL: `https://donde-sumo.vercel.app` 🎉

### Paso 3: Compartí el link

Listo! Mandá el link por WhatsApp, Instagram, o donde quieras para que te den feedback.

---

## 📁 Estructura del proyecto

```
donde-sumo/
├── app/
│   ├── globals.css      # Estilos globales
│   ├── layout.js        # Layout con metadata SEO
│   └── page.js          # App principal (mapa + buscador)
├── next.config.js       # Config de Next.js
├── package.json         # Dependencias
└── README.md            # Este archivo
```

## 🛠️ Desarrollo local

```bash
npm install
npm run dev
# Abrí http://localhost:3000
```

## 📋 Próximas etapas

- [ ] Conectar con Supabase (base de datos real)
- [ ] Sistema de registro de voluntarios
- [ ] Módulo de reseñas
- [ ] Integración con MercadoPago para donaciones
- [ ] Panel de administración para instituciones
