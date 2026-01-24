'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Lightbulb, Users, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Strategic Vision',
    description: 'We identify and invest in companies positioned to become market leaders in their respective industries.',
  },
  {
    icon: Lightbulb,
    title: 'Deep Expertise',
    description: 'Our team brings decades of combined experience in technology, finance, and company building.',
  },
  {
    icon: Users,
    title: 'Founder First',
    description: 'We prioritize the founder relationship, providing mentorship and resources beyond capital.',
  },
  {
    icon: TrendingUp,
    title: 'Long-term Growth',
    description: 'We focus on sustainable growth strategies that create lasting value for all stakeholders.',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary-400 text-sm font-semibold uppercase tracking-wider"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-heading mt-4 mb-6"
          >
            Building the Future,
            <br />
            <span className="gradient-text">Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subheading mx-auto"
          >
            Leasemint is a venture capital firm focused on early-stage investments
            in technology companies that are reshaping how we live and work.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-card p-8 group hover:border-primary-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6 group-hover:bg-primary-500/20 transition-colors">
                <feature.icon size={24} className="text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-dark-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
