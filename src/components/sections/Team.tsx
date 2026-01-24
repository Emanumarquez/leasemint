'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Linkedin, Twitter } from 'lucide-react'

const team = [
  {
    name: 'Sarah Chen',
    role: 'Managing Partner',
    bio: 'Former VP at Google Ventures. 15+ years in tech investing.',
    initials: 'SC',
  },
  {
    name: 'Michael Roberts',
    role: 'General Partner',
    bio: 'Ex-Goldman Sachs. Specialized in enterprise software investments.',
    initials: 'MR',
  },
  {
    name: 'Emily Thompson',
    role: 'Partner',
    bio: 'Serial entrepreneur. Founded and sold two fintech companies.',
    initials: 'ET',
  },
  {
    name: 'David Kim',
    role: 'Principal',
    bio: 'Former product lead at Stripe. Focus on developer tools.',
    initials: 'DK',
  },
]

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="team" ref={ref} className="py-24 md:py-32 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary-400 text-sm font-semibold uppercase tracking-wider"
          >
            Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-heading mt-4 mb-6"
          >
            Meet the
            <br />
            <span className="gradient-text">Partners</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subheading mx-auto"
          >
            Experienced operators and investors dedicated to helping 
            founders build world-class companies.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-card p-8 text-center group hover:border-primary-500/30 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-dark-950 font-display font-bold text-2xl">
                  {member.initials}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-primary-400 text-sm mb-4">{member.role}</p>
              <p className="text-dark-400 text-sm mb-6">{member.bio}</p>
              {/* Social Links */}
              <div className="flex items-center justify-center space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center text-dark-400 hover:bg-primary-500 hover:text-dark-950 transition-all duration-200"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center text-dark-400 hover:bg-primary-500 hover:text-dark-950 transition-all duration-200"
                >
                  <Twitter size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
