'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'

const portfolioCompanies = [
  {
    name: 'TechFlow',
    category: 'Enterprise SaaS',
    description: 'AI-powered workflow automation for enterprise teams.',
    stage: 'Series B',
    logo: 'TF',
  },
  {
    name: 'GreenEnergy',
    category: 'CleanTech',
    description: 'Next-generation renewable energy storage solutions.',
    stage: 'Series A',
    logo: 'GE',
  },
  {
    name: 'HealthSync',
    category: 'HealthTech',
    description: 'Digital health platform connecting patients and providers.',
    stage: 'Series B',
    logo: 'HS',
  },
  {
    name: 'DataMesh',
    category: 'Data Infrastructure',
    description: 'Unified data platform for modern enterprises.',
    stage: 'Seed',
    logo: 'DM',
  },
  {
    name: 'FinanceAI',
    category: 'FinTech',
    description: 'Machine learning solutions for financial services.',
    stage: 'Series A',
    logo: 'FA',
  },
  {
    name: 'CyberShield',
    category: 'Cybersecurity',
    description: 'Zero-trust security platform for distributed teams.',
    stage: 'Series B',
    logo: 'CS',
  },
]

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="portfolio" ref={ref} className="py-24 md:py-32 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary-400 text-sm font-semibold uppercase tracking-wider"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-heading mt-4 mb-6"
          >
            Companies We've
            <br />
            <span className="gradient-text">Backed</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subheading mx-auto"
          >
            We're proud to partner with exceptional founders building
            category-defining companies across multiple sectors.
          </motion.p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioCompanies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-card p-8 group hover:border-primary-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <span className="text-dark-950 font-display font-bold text-lg">
                    {company.logo}
                  </span>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-dark-800 text-dark-300">
                  {company.stage}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">
                  {company.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors flex items-center">
                {company.name}
                <ExternalLink size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-dark-400">{company.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
