'use client'

import { useSubscription } from "@/src/features/business/hooks/use-subscription"
import { SubscriptionStatusRes } from "@/src/features/business/services/subscription.service"
import { Lock, Clock, AlertTriangle, BellRing, LoaderCircle } from "lucide-react"

type Props = { subscription: SubscriptionStatusRes | null }

function getDaysLeft(dateStr: string | null) {
    if (!dateStr) return 0
    const diff = new Date(dateStr).getTime() - Date.now()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

type BannerVariant = 'trial' | 'grace' | 'renewal' | 'blocked'

function getVariant(subscription: SubscriptionStatusRes): BannerVariant | null {
    if (!subscription.hasAccess) return 'blocked'
    if (subscription.status === 'Trial') return 'trial'
    if (subscription.status === 'PastDue') return 'grace'
    if (subscription.status === 'Active' && subscription.isNearRenewal) return 'renewal'
    return null
}

const VARIANT_CONFIG = {
    trial:    { bg: '#0F1A12', border: '#3a7a4a', accent: '#4a9a5a', icon: Clock },
    grace:    { bg: '#1A1409', border: '#C49A10', accent: '#D4AF1A', icon: AlertTriangle },
    renewal:  { bg: '#0F141A', border: '#3a6a9a', accent: '#5a9ad4', icon: BellRing },
    blocked:  { bg: '#1A1209', border: '#C46210', accent: '#C46210', icon: Lock },
} as const

export default function SubscriptionBanner({ subscription }: Props) {
    const { handleCheckout, isPending } = useSubscription()

    if (!subscription) return null

    const variant = getVariant(subscription)
    if (!variant) return null

    const cfg = VARIANT_CONFIG[variant]
    const Icon = cfg.icon

    const daysLeft = variant === 'trial' 
        ? getDaysLeft(subscription.trialEndsAt) 
        : variant === 'grace' 
        ? getDaysLeft(subscription.gracePeriodEndsAt) 
        : variant === 'renewal' 
        ? getDaysLeft(subscription.currentPeriodEnd) 
        : null

    return (
        <div className="w-full font-tree border rounded-3xl p-5 md:p-6 flex flex-col md:flex-row gap-5 md:items-center transition-all duration-200 shadow-xl"
             style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}>
            
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: cfg.bg }}>
                    <Icon size={22} style={{ color: cfg.accent }} strokeWidth={2.25} />
                </div>

                <div className="space-y-1 min-w-0">
                    <div className="uppercase text-[10px] font-bold tracking-widest" style={{ color: cfg.accent }}>
                        {variant === 'trial' && 'TESTE ATIVO'}
                        {variant === 'grace' && 'PAGAMENTO PENDENTE'}
                        {variant === 'renewal' && 'RENOVAÇÃO PRÓXIMA'}
                        {variant === 'blocked' && 'ACESSO BLOQUEADO'}
                    </div>

                    <p className="font-semibold text-base leading-tight" style={{ color: '#F5E6CC' }}>
                        {variant === 'trial' && 'Explore sem limites'}
                        {variant === 'grace' && 'Pagamento não confirmado'}
                        {variant === 'renewal' && 'Seu plano está vencendo'}
                        {variant === 'blocked' && 'Acesso suspenso'}
                    </p>

                    <p className="text-sm leading-snug" style={{ color: '#a38d6b' }}>
                        {variant === 'trial' && `Restam ${daysLeft} dias de teste gratuito.`}
                        {variant === 'grace' && 'Regularize seu pagamento para evitar interrupções.'}
                        {variant === 'renewal' && 'Renove agora para manter todos os recursos.'}
                        {variant === 'blocked' && 'Assine novamente para voltar a usar o Agenrap.'}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
                {daysLeft !== null && variant !== 'blocked' && (
                    <div className="px-5 py-2.5 rounded-2xl text-sm font-medium border text-center"
                         style={{ 
                             borderColor: cfg.accent + '40', 
                             color: cfg.accent 
                         }}>
                        {daysLeft} dias restantes
                    </div>
                )}

                <button
                    onClick={handleCheckout}
                    disabled={isPending}
                    className="h-10 px-6 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 flex-1 md:flex-none"
                    style={{
                        backgroundColor: variant === 'blocked' ? '#C46210' : 'transparent',
                        color: variant === 'blocked' ? '#0a0600' : cfg.accent,
                        border: variant === 'blocked' ? 'none' : `1px solid ${cfg.border}`,
                    }}
                >
                    {isPending ? (
                        <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                        variant === 'blocked' ? 'Ativar Plano' : 'Renovar Agora'
                    )}
                </button>
            </div>
        </div>
    )
}