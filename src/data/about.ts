/** "Sobre mí" en 3 líneas. */
export const aboutParagraphs: string[] = [
  'Soy desarrollador backend con 1.5 años de experiencia construyendo APIs y sistemas en C# y .NET.',
  'Soy de Bogotá y vivo en Bucaramanga.',
  'Lidero el equipo de desarrollo de Nodux, documento lo que construyo y dejo los sistemas fáciles de mantener y de correr con Docker.',
]

/**
 * Líneas que se muestran en pantalla. La de origen/ubicación se omite mientras profile.ts
 * ("Floridablanca, Santander") y esta lista ("Bucaramanga") se contradigan.
 */
export const aboutShown: string[] = aboutParagraphs.filter((line) => !/Bogotá|Bucaramanga|Floridablanca/.test(line))

export const profileFacts: { key: string; value: string }[] = [
  { key: 'nombre', value: 'Alejandro' },
  { key: 'experiencia', value: '1.5 años' },
  { key: 'origen', value: 'Bogotá, CO' },
  { key: 'ubicación', value: 'Bucaramanga, CO' },
  { key: 'enfoque', value: 'Backend .NET' },
  { key: 'inglés', value: 'B2' },
  { key: 'estado', value: 'DISPONIBLE' },
]
