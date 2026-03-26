import { useState, useEffect } from 'react'

export function useTypewriter(
  words: string[],
  speed: number = 100,
): { text: string; isTyping: boolean } {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setText(currentWord.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else if (isDeleting && charIndex > 0) {
        setText(currentWord.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && charIndex === 0) {
        setWordIndex((prev) => (prev + 1) % words.length)
        setIsDeleting(false)
      }
    }, isDeleting ? 50 : speed)

    return () => clearTimeout(timer)
  }, [text, wordIndex, charIndex, isDeleting, words, speed])

  return { text, isTyping: !isDeleting }
}
