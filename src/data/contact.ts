import { personalInfo } from './profile'

/**
 * Contacto y cierre. Por decisión del equipo no se publica correo ni teléfono en texto plano.
 * Si Alejandro quiere un canal directo (formulario, agenda o WhatsApp Business), debe aportar
 * el enlace y se agrega aquí. No inventar enlaces.
 */
export const contact = {
  closing: '¿Tienes un proyecto o una vacante? Hablemos esta semana.',
  intro: 'Cuéntame qué necesitas, ya sea un proyecto freelance o una vacante, y coordinamos una llamada.',
  primary: { label: 'Escríbeme por LinkedIn', url: personalInfo.linkedin },
  channels: [
    { label: 'LinkedIn', url: personalInfo.linkedin, hint: 'La mejor forma de contactarme' },
    { label: 'GitHub', url: personalInfo.github, hint: 'Código y repositorios' },
  ],
  /** Canal directo: vacío = no se muestra. */
  directChannelUrl: '',
}
