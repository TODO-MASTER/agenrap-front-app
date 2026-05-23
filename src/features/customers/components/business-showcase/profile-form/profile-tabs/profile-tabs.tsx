'use client'

import ContactTab from "@/src/features/customers/components/business-showcase/profile-form/profile-tabs/contact-tab"
import PasswordTab from "@/src/features/customers/components/business-showcase/profile-form/profile-tabs/password-tab"
import { FileWarning } from "lucide-react"
import { useState } from "react"

type ProfileTab = 'contact' | 'password'

export interface UserProfile {
  id: string
  fullName: string
  initials: string
  email: string
  phone?: string | null
}

export default function ProfileTabs({ user }: { user: UserProfile }) {
  const [active, setActive] = useState<ProfileTab>('contact')

  return (
    <div className="flex flex-col">
          {!user.phone && active=='contact'&& (
              <div className="flex items-center gap-1 bg-yellow-400/10 border border-yellow-400/20 rounded-lg px-3 py-2 mb-4">
                <FileWarning style={{ color: 'var(--agenrap-yellow-200)' }} size={16}/>
                <p className="text-sm font-tree" style={{ color: 'var(--agenrap-yellow-200)' }}>
                  Telefone não cadastrado.
                </p>
              </div>
            )}
 
    <div className="flex flex-col">
      {/* Tab bar — sem fundo, só a linha de baixo */}
      <div className="flex border-b border-white/10 gap-6 mb-5">
        {(['contact', 'password'] as ProfileTab[]).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`
              pb-3 text-sm font-tree font-semibold border-b-2 -mb-px transition-all
              ${active === tab
                ? 'border-(--agenrap-yellow-200) text-(--agenrap-yellow-200)'
                : 'border-transparent text-white/30 hover:text-white/60'
              }
            `}
          >
            {tab === 'contact' ? 'Contato' : 'Senha'}
          </button>
        ))}
      </div>

      {/* Tab content — sem card wrapper, vive no escuro direto */}

      <div>
        {active === 'contact' && <ContactTab user={user} />}
        {active === 'password' && <PasswordTab />}
      </div>
    </div>
       </div>
  )
}
 