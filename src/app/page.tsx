import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Portfolio from '@/components/sections/Portfolio'
import Team from '@/components/sections/Team'
import Thesis from '@/components/sections/Thesis'
import Contact from '@/components/sections/Contact'
import Stats from '@/components/sections/Stats'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Portfolio />
      <Thesis />
      <Team />
      <Contact />
    </>
  )
}
