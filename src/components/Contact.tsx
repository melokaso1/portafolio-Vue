import { useState } from 'react'
import { useIntersection } from '../hooks/useIntersection'
import TerminalWindow from './TerminalWindow'
import { personalInfo } from '../data/portfolio'
import type { ContactForm, ContactErrors } from '../types'

export default function Contact(): JSX.Element {
  const [ref, isVisible] = useIntersection<HTMLDivElement>()
  const [formData, setFormData] = useState<ContactForm>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-20 px-4 bg-bg ${isVisible ? 'fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-cyan mb-12">
          // ESTABLISH_CONNECTION
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Links */}
          <div className="space-y-6">
            <a
              href={`mailto:${personalInfo.email}`}
              className="block border border-green text-green px-4 py-3 font-mono text-sm hover:bg-green hover:text-bg transition-colors rounded-none"
            >
              &gt; SEND_EMAIL
              <br />
              <span className="text-muted text-xs">{personalInfo.email}</span>
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-cyan text-cyan px-4 py-3 font-mono text-sm hover:bg-cyan hover:text-bg transition-colors rounded-none"
            >
              &gt; OPEN_GITHUB
              <br />
              <span className="text-muted text-xs">github.com/melokaso1</span>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-cyan text-cyan px-4 py-3 font-mono text-sm hover:bg-cyan hover:text-bg transition-colors rounded-none"
            >
              &gt; LINKEDIN
              <br />
              <span className="text-muted text-xs">linkedin.com/in/alejandro-escobar-9b759036</span>
            </a>
          </div>

          {/* Contact Form */}
          <TerminalWindow title="MSG_COMPOSER" accentColor="green">
            {submitted ? (
              <div className="text-green font-mono text-sm">
                <div>&gt; MESSAGE_SENT_SUCCESSFULLY</div>
                <div className="text-xs text-muted mt-2">Thank you for reaching out!</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-muted font-mono text-xs mb-2">NAME_</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-bg border px-3 py-2 font-mono text-sm text-green focus:outline-none rounded-none ${
                      errors.name ? 'border-red-500' : 'border-green'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && <div className="text-red-500 font-mono text-xs mt-1">{errors.name}</div>}
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-muted font-mono text-xs mb-2">EMAIL_</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-bg border px-3 py-2 font-mono text-sm text-green focus:outline-none rounded-none ${
                      errors.email ? 'border-red-500' : 'border-green'
                    }`}
                    placeholder="Your email"
                  />
                  {errors.email && <div className="text-red-500 font-mono text-xs mt-1">{errors.email}</div>}
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-muted font-mono text-xs mb-2">MESSAGE_</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full bg-bg border px-3 py-2 font-mono text-sm text-green focus:outline-none rounded-none resize-none ${
                      errors.message ? 'border-red-500' : 'border-green'
                    }`}
                    placeholder="Your message"
                  ></textarea>
                  {errors.message && <div className="text-red-500 font-mono text-xs mt-1">{errors.message}</div>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full border border-green text-green px-4 py-3 font-mono text-sm hover:bg-green hover:text-bg transition-colors rounded-none"
                >
                  [ SEND_MSG ]
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
