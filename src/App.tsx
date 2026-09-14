import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Learning from './components/Learning'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StatusBar from './components/StatusBar'

export default function App(): JSX.Element {
  return (
    <div className="bg-bg text-text font-mono min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Learning />
        <Contact />
      </main>
      <Footer />
      <StatusBar />
    </div>
  )
}

export { App }
