'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Cpu, Cloud, Shield, Leaf, Brain, Zap } from 'lucide-react'

const focusAreas = [
  {
    icon: Cpu,
    title: 'Enterprise Software',
    description: 'Next-generation tools that transform how businesses operate and scale.',
  },
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description: 'Applied AI and machine learning solutions with clear commercial applications.',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Developer tools and platforms powering the future of software development.',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Security solutions protecting enterprises in an increasingly connected world.',
  },
  {
    icon: Leaf,
    title: 'Climate Tech',
    description: 'Sustainable technology addressing the world\'s most pressing environmental challenges.',
  },
  {
    icon: Zap,
    title: 'FinTech',
    description: 'Financial innovation enabling new forms of value creation and transfer.',
  },
]

export default function Thesis() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="thesis" ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-primary-400 text-sm font-semibold uppercase tracking-wider"
            >
              Investment Thesis
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-heading mt-4 mb-6"
            >
              Where We
              <br />
              <span className="gradient-text">Invest</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-dark-400 text-lg mb-8"
            >
              We focus on seed to Series A investments in technology companies 
              led by exceptional founders with deep domain expertise and a clear 
              path to market leadership.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary-400" />
                <span className="text-dark-300">Check sizes: $500K - $5M</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary-400" />
                <span className="text-dark-300">Stage: Pre-seed to Series A</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary-400" />
                <span className="text-dark-300">Geography: North America & Europe</span>
              </div>
            </motion.div>
          </div>

          {/* Focus Areas Grid */}
          <div className="grid grid-cols-2 gap-4">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="glass-card p-6 group hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <area.icon size={20} className="text-primary-400" />
                </div>
                <h3 className="font-semibold mb-2">{area.title}</h3>
                <p className="text-dark-400 text-sm">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
