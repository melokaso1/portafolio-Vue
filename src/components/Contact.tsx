import { useState } from 'react'
import { useIntersection } from '../hooks/useIntersection'
import TerminalWindow from './TerminalWindow'
import SectionCommand from './SectionCommand'
import { personalInfo } from '../data/portfolio'
import type { ContactForm, ContactErrors } from '../types'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

export default function Contact(): JSX.Element {
  const [ref, isVisible] = useIntersection<HTMLDivElement>(0.12)
  const [formData, setFormData] = useState<ContactForm>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const validateForm = (): boolean => {
    const newErrors: ContactErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'NAME_REQUIRED'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'EMAIL_REQUIRED'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'INVALID_EMAIL_FORMAT'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'MESSAGE_REQUIRED'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setStatus('sending')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio contact from ${formData.name}`,
          _template: 'table',
        }),
      })

      if (!response.ok) {
        throw new Error('Submit failed')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const githubHandle = personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')
  const linkedinHandle = personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '')

  return (
    <section id="contact" ref={ref} className="py-12 md:py-14 px-4 bg-bg pb-20">
      <div className="max-w-6xl mx-auto">
        <SectionCommand
          command="./connect.sh --channel portfolio"
          active={isVisible}
          comment="// open a channel — form delivers to email"
        />

        <div className={`grid md:grid-cols-2 gap-6 term-stagger ${isVisible ? 'is-visible' : ''}`}>
          <div className="space-y-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="block border border-cyan px-4 py-3 font-mono text-sm hover:bg-cyan hover:text-bg transition-colors rounded-none group"
            >
              <span className="text-green group-hover:text-bg">&gt; SEND_EMAIL</span>
              <br />
              <span className="text-muted text-xs group-hover:text-bg/80">{personalInfo.email}</span>
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-cyan px-4 py-3 font-mono text-sm hover:bg-cyan hover:text-bg transition-colors rounded-none group"
            >
              <span className="text-green group-hover:text-bg">&gt; OPEN_GITHUB</span>
              <br />
              <span className="text-muted text-xs group-hover:text-bg/80">github.com/{githubHandle}</span>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-cyan px-4 py-3 font-mono text-sm hover:bg-cyan hover:text-bg transition-colors rounded-none group"
            >
              <span className="text-green group-hover:text-bg">&gt; LINKEDIN</span>
              <br />
              <span className="text-muted text-xs group-hover:text-bg/80">linkedin.com/{linkedinHandle}</span>
            </a>
          </div>

          <TerminalWindow title="MSG_COMPOSER" accentColor="green">
            {status === 'success' ? (
              <div className="space-y-4">
                <div className="text-green font-mono text-sm">
                  <div>&gt; MESSAGE_SENT_SUCCESSFULLY</div>
                  <div className="text-xs text-muted mt-2">
                    Thanks — I&apos;ll get back to you soon.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="border border-green text-green px-3 py-2 font-mono text-xs hover:bg-green hover:text-bg transition-colors rounded-none"
                >
                  [ SEND_ANOTHER ]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-muted font-mono text-xs mb-2">NAME_</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    className={`w-full bg-bg border px-3 py-2 font-mono text-sm text-green focus:outline-none rounded-none disabled:opacity-50 ${
                      errors.name ? 'border-red-500' : 'border-green'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && <div className="text-red-500 font-mono text-xs mt-1">{errors.name}</div>}
                </div>

                <div>
                  <label className="block text-muted font-mono text-xs mb-2">EMAIL_</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    className={`w-full bg-bg border px-3 py-2 font-mono text-sm text-green focus:outline-none rounded-none disabled:opacity-50 ${
                      errors.email ? 'border-red-500' : 'border-green'
                    }`}
                    placeholder="Your email"
                  />
                  {errors.email && (
                    <div className="text-red-500 font-mono text-xs mt-1">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-muted font-mono text-xs mb-2">MESSAGE_</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    rows={4}
                    className={`w-full bg-bg border px-3 py-2 font-mono text-sm text-green focus:outline-none rounded-none resize-none disabled:opacity-50 ${
                      errors.message ? 'border-red-500' : 'border-green'
                    }`}
                    placeholder="Your message"
                  />
                  {errors.message && (
                    <div className="text-red-500 font-mono text-xs mt-1">{errors.message}</div>
                  )}
                </div>

                {status === 'error' && (
                  <div className="text-red-500 font-mono text-xs">
                    SEND_FAILED — try again or use SEND_EMAIL
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full border border-green text-green px-4 py-3 font-mono text-sm hover:bg-green hover:text-bg transition-colors rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? '[ SENDING... ]' : '[ SEND_MSG ]'}
                </button>
              </form>
            )}
          </TerminalWindow>
        </div>
      </div>
    </section>
  )
}

export { Contact }
