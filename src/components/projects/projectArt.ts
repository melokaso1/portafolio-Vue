/** Monograma corto por proyecto (como en el Figma v2). */
export const monograms: Record<string, string> = {
  nodux: 'N',
  'nexus-odonto-api': 'NX',
  'nexus-odonto-chatbot': 'AI',
  healtlab: 'HL',
  'inteligent-inventory': 'IN',
  'gestion-mecanica': 'GM',
  'liga-betplay': 'LB',
  'abc-lms': 'LMS',
}

/** Título corto para la tarjeta: sin el paréntesis. */
export const shortTitle = (title: string) => title.replace(/\s*\(.*\)\s*$/, '')

/** Línea de la leyenda: el problema si está confirmado; si no, la primera frase del resumen. */
export const captionLine = (problem: string | undefined, summary: string) => {
  if (problem) return problem
  const first = summary.split(/(?<=\.)\s|:\s/)[0] ?? summary
  return first.endsWith('.') ? first : `${first}.`
}
