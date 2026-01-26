'use client'

import { useState } from 'react'

/**
 * FAQHelper Component
 * 
 * A Zendesk-style FAQ panel for investor questions.
 * Supports both English and French translations.
 */

interface FAQItem {
  question: string
  answer: string
}

interface FAQHelperProps {
  isOpen: boolean
  onClose: () => void
  lang: 'fr' | 'en'
}

const faqData: Record<'en' | 'fr', { title: string; searchPlaceholder: string; noResults: string; items: FAQItem[] }> = {
  en: {
    title: 'Investor FAQ',
    searchPlaceholder: 'Search questions...',
    noResults: 'No matching questions found.',
    items: [
      {
        question: 'What is LeaseMint?',
        answer: 'LeaseMint is an AI-powered fintech platform that transforms long-term rental contracts into secure, bank-financed and investor-funded cash-flow assets. It allows landlords to receive rent upfront, tenants to access housing via credit rather than guarantees, and investors to finance rental cash flows with predictable yields.',
      },
      {
        question: 'What problem does LeaseMint solve?',
        answer: 'The long-term rental market is structurally inefficient:\n\n• Landlords face payment risk and cash-flow constraints\n• Tenants struggle with guarantor requirements and upfront costs\n• Investors lack access to secured, yield-generating residential assets\n\nLeaseMint solves this by securing the rental cash flow itself, rather than underwriting isolated tenant risk.',
      },
      {
        question: 'How does LeaseMint work?',
        answer: '1. A property is validated and listed on LeaseMint\n2. A tenant is pre-qualified using AI-driven KYC and scoring\n3. A dual contract is created: a standard rental contract and a financing contract covering the rent\n4. Investors fund the lease\n5. The landlord is paid upfront\n6. The tenant pays a structured monthly amount\n7. Investors receive yield over time',
      },
      {
        question: "Who are LeaseMint's users?",
        answer: 'LeaseMint operates a three-sided marketplace:\n\n• Tenants (students, expatriates, young professionals)\n• Landlords (private owners, coliving operators, residences)\n• Investors (retail and institutional)',
      },
      {
        question: 'Why is LeaseMint different from a traditional rental platform?',
        answer: 'LeaseMint is not a listing platform. It is a financial infrastructure layer that:\n\n• Securitizes rental cash flows\n• Integrates KYC, credit, and payments\n• Enables upfront rent payment and secondary liquidity',
      },
      {
        question: 'How does LeaseMint reduce risk?',
        answer: 'Risk is reduced through:\n\n• AI-driven tenant scoring and KYC\n• Property fair-value assessment\n• Diversified investor funding\n• Contractual separation of usage and financing\n• Automated monitoring and compliance workflows',
      },
      {
        question: 'What returns do investors get?',
        answer: 'Investors finance rental contracts and earn:\n\n• 10-12% target annual yield (depending on contract)\n• Exposure to residential rental cash flows\n• Optional liquidity via a secondary market\n\nMinimum investment starts from small tickets (e.g. €50).',
      },
      {
        question: 'Is LeaseMint compliant?',
        answer: 'Compliance is a core design principle:\n\n• Full KYC/AML processes\n• GDPR-compliant data handling\n• Progressive legal structuring aligned with EU regulations\n• Legal review of dual-contract architecture',
      },
      {
        question: 'What is tokenized in LeaseMint?',
        answer: 'LeaseMint tokenizes usage rights and investment rights, not property ownership:\n\n• Usage tokens represent time-based occupancy rights\n• Investment tokens represent cash-flow entitlement\n\nThis enables transparency, traceability, and secondary market liquidity.',
      },
      {
        question: 'What is the business model?',
        answer: 'LeaseMint generates revenue through:\n\n• Structuring fees\n• Service and management fees\n• Financing and servicing margins\n• Potential white-label licensing',
      },
      {
        question: 'What is the go-to-market strategy?',
        answer: 'Phase 1 focuses on student housing in France, where demand is structural and guarantor issues are acute.\n\nPhase 2 expands to Europe and young professionals.\n\nPhase 3 targets broader residential and international markets.',
      },
      {
        question: 'What stage is LeaseMint at?',
        answer: 'LeaseMint is in early stage / pre-seed, with:\n\n• MVP under development\n• Initial legal and banking validations\n• Pilot cities identified\n• Fundraising in progress to accelerate execution',
      },
      {
        question: 'Why now?',
        answer: '• Structural housing shortages\n• Increasing regulation of short-term rentals\n• Rising demand for alternative credit models\n• Maturity of AI, fintech and tokenization infrastructure',
      },
    ],
  },
  fr: {
    title: 'FAQ Investisseurs',
    searchPlaceholder: 'Rechercher une question...',
    noResults: 'Aucune question correspondante trouvee.',
    items: [
      {
        question: "Qu'est-ce que LeaseMint ?",
        answer: "LeaseMint est une plateforme fintech alimentee par l'IA qui transforme les contrats de location longue duree en actifs de flux de tresorerie securises, finances par les banques et les investisseurs. Elle permet aux proprietaires de recevoir le loyer a l'avance, aux locataires d'acceder au logement via le credit plutot que des garanties, et aux investisseurs de financer des flux locatifs avec des rendements previsibles.",
      },
      {
        question: 'Quel probleme LeaseMint resout-il ?',
        answer: "Le marche de la location longue duree est structurellement inefficace :\n\n• Les proprietaires font face au risque d'impayes et aux contraintes de tresorerie\n• Les locataires peinent avec les exigences de garants et les couts initiaux\n• Les investisseurs n'ont pas acces aux actifs residentiels securises generant du rendement\n\nLeaseMint resout cela en securisant le flux de tresorerie locatif lui-meme, plutot que de souscrire un risque locataire isole.",
      },
      {
        question: 'Comment fonctionne LeaseMint ?',
        answer: "1. Un bien est valide et liste sur LeaseMint\n2. Un locataire est pre-qualifie via KYC et scoring pilotes par l'IA\n3. Un double contrat est cree : un contrat de location standard et un contrat de financement couvrant le loyer\n4. Les investisseurs financent le bail\n5. Le proprietaire est paye a l'avance\n6. Le locataire paie un montant mensuel structure\n7. Les investisseurs recoivent le rendement dans le temps",
      },
      {
        question: 'Qui sont les utilisateurs de LeaseMint ?',
        answer: "LeaseMint opere un marche a trois faces :\n\n• Locataires (etudiants, expatries, jeunes professionnels)\n• Proprietaires (particuliers, operateurs de coliving, residences)\n• Investisseurs (particuliers et institutionnels)",
      },
      {
        question: "Pourquoi LeaseMint est-il different d'une plateforme locative traditionnelle ?",
        answer: "LeaseMint n'est pas une plateforme d'annonces. C'est une couche d'infrastructure financiere qui :\n\n• Securitise les flux de tresorerie locatifs\n• Integre KYC, credit et paiements\n• Permet le paiement du loyer a l'avance et la liquidite secondaire",
      },
      {
        question: 'Comment LeaseMint reduit-il le risque ?',
        answer: "Le risque est reduit grace a :\n\n• Scoring locataire et KYC pilotes par l'IA\n• Evaluation de la juste valeur du bien\n• Financement diversifie par les investisseurs\n• Separation contractuelle de l'usage et du financement\n• Workflows automatises de suivi et de conformite",
      },
      {
        question: 'Quels rendements obtiennent les investisseurs ?',
        answer: "Les investisseurs financent des contrats de location et gagnent :\n\n• 10-12% de rendement annuel cible (selon le contrat)\n• Exposition aux flux de tresorerie locatifs residentiels\n• Liquidite optionnelle via un marche secondaire\n\nL'investissement minimum commence a partir de petits tickets (ex. 50€).",
      },
      {
        question: 'LeaseMint est-il conforme ?',
        answer: "La conformite est un principe de conception fondamental :\n\n• Processus KYC/AML complets\n• Traitement des donnees conforme au RGPD\n• Structuration juridique progressive alignee sur les reglementations europeennes\n• Revue juridique de l'architecture a double contrat",
      },
      {
        question: "Qu'est-ce qui est tokenise dans LeaseMint ?",
        answer: "LeaseMint tokenise les droits d'usage et les droits d'investissement, pas la propriete immobiliere :\n\n• Les tokens d'usage representent les droits d'occupation bases sur le temps\n• Les tokens d'investissement representent le droit aux flux de tresorerie\n\nCela permet la transparence, la tracabilite et la liquidite sur le marche secondaire.",
      },
      {
        question: "Quel est le modele economique ?",
        answer: "LeaseMint genere des revenus via :\n\n• Frais de structuration\n• Frais de service et de gestion\n• Marges de financement et de gestion\n• Licence en marque blanche potentielle",
      },
      {
        question: "Quelle est la strategie de mise sur le marche ?",
        answer: "La Phase 1 se concentre sur le logement etudiant en France, ou la demande est structurelle et les problemes de garants sont aigus.\n\nLa Phase 2 s'etend a l'Europe et aux jeunes professionnels.\n\nLa Phase 3 cible les marches residentiels plus larges et internationaux.",
      },
      {
        question: "A quel stade en est LeaseMint ?",
        answer: "LeaseMint est en phase early stage / pre-seed, avec :\n\n• MVP en cours de developpement\n• Validations juridiques et bancaires initiales\n• Villes pilotes identifiees\n• Levee de fonds en cours pour accelerer l'execution",
      },
      {
        question: 'Pourquoi maintenant ?',
        answer: "• Penuries structurelles de logements\n• Reglementation croissante des locations courte duree\n• Demande croissante de modeles de credit alternatifs\n• Maturite de l'IA, de la fintech et de l'infrastructure de tokenisation",
      },
    ],
  },
}

export default function FAQHelper({ isOpen, onClose, lang }: FAQHelperProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const data = faqData[lang]
  
  // Filter FAQ items based on search query
  const filteredItems = data.items.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleQuestion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* FAQ Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-brand-900 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-200 dark:border-brand-700 bg-primary-500">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-brand-950">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            <h2 className="text-lg font-semibold text-white dark:text-brand-950">
              {data.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white dark:text-brand-950"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-brand-200 dark:border-brand-700">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={data.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-brand-50 dark:bg-brand-800 border border-brand-200 dark:border-brand-700 rounded-lg text-sm text-brand-900 dark:text-white placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="flex-1 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-brand-500">
              {data.noResults}
            </div>
          ) : (
            <div className="divide-y divide-brand-100 dark:divide-brand-800">
              {filteredItems.map((item, index) => (
                <div key={index} className="group">
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-4 flex items-start gap-3 text-left hover:bg-brand-50 dark:hover:bg-brand-800/50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`flex-shrink-0 mt-0.5 text-primary-500 transition-transform duration-200 ${
                        expandedIndex === index ? 'rotate-180' : ''
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                    <span className="font-medium text-brand-900 dark:text-white">
                      {item.question}
                    </span>
                  </button>
                  
                  {expandedIndex === index && (
                    <div className="px-6 pb-4 pl-[52px] animate-in fade-in slide-in-from-top-2 duration-200">
                      <p className="text-sm text-brand-600 dark:text-brand-300 whitespace-pre-line leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-800/50">
          <p className="text-xs text-brand-500 text-center">
            {lang === 'fr' 
              ? "Vous avez d'autres questions ? Contactez-nous via le menu." 
              : 'Have more questions? Contact us through the menu.'}
          </p>
        </div>
      </div>
    </>
  )
}
