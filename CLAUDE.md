## Changelog

### 2026-06-17 — Fix mapa: datos reales de Supabase no cargaban

**Archivo:** `app/mapa/page.js`

**Problemas encontrados:**
1. Estado inicial era `INSTITUCIONES_MOCK` — si la API fallaba o devolvía 0 filas, el mock quedaba para siempre sin ningun aviso
2. `.catch(() => {})` tragaba errores silenciosamente, imposible debuggear
3. La condicion `data.instituciones.length > 0` impedia reemplazar el mock incluso con datos reales si Supabase devolvio un array vacio
4. `localidades` siempre se calculaba desde `INSTITUCIONES_MOCK` hardcodeado, nunca desde el estado real

**Correcciones:**
- Estado inicial cambiado a `[]` (array vacio) con flag `loadingData: true`
- Fetch con `cache: 'no-store'` para evitar cache de browser
- Filtro de coordenadas validas antes de adaptar (`lat && lng && !isNaN`)
- Si la API responde con `success: true`, usa esos datos (aunque sean 0 filas)
- Si la API falla, cae al mock con `console.error` visible en DevTools
- `localidades` ahora deriva de `instituciones` (estado real) con dependencia correcta
- Indicador "Cargando instituciones..." mientras el fetch esta en vuelo

**Nota:** Si Supabase devuelve 0 filas en la tabla `instituciones`, el mapa mostrara el mock como fallback y el error aparecera en consola. Verificar que la tabla tenga filas aprobadas.

---

## Approach
- Read existing files before writing. Don't re-read unless changed.
- Thorough in reasoning, concise in output.
- Skip files over 100KB unless required.
- No sycophantic openers or closing fluff.
- No emojis or em-dashes.
- Do not guess APIs, versions, flags, commit SHAs, or package names. Verify by reading code or docs before asserting.
