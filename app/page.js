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
    cat
