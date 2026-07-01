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
    // Bloqueado de verdade: sem acesso e não é mais o caso de grace period
    // (grace period também tem hasAccess=false do ponto de vista de "pago",
    // mas aqui hasAccess já reflete HasActiveAccess(), que inclui o grace —
    // então !hasAccess significa que o grace também já acabou).
    if (!subscription.hasAccess) return 'blocked'

    // Trial ativo
    if (subscription.status === 'Trial') return 'trial'

    // PastDue mas ainda dentro do grace period (hasAccess true por causa disso)
    if (subscription.status === 'PastDue') return 'grace'

    // Active, mas o plano está perto de vencer e precisa de renovação manual
    if (subscription.status === 'Active' && subscription.isNearRenewal) return 'renewal'

    return null
}

const VARIANT_CONFIG = {
    trial: {
        bg: '#0F1A12',
        border: '#3a7a4a',
        iconBg: '#0a2010',
        iconColor: '#4a9a5a',
        labelColor: '#4a9a5a',
        icon: Clock,
        label: 'Período de teste',
        title: 'Explore tudo sem restrições',
        subtitle: 'Ative seu plano antes do trial acabar para não perder o acesso.',
        counterBg: '#0a2010',
        counterBorder: '#2a5a3a',
        counterColor: '#4a9a5a',
        counterSubColor: '#3a6a4a',
        buttonText: 'Ativar plano',
    },
    grace: {
        bg: '#1A1409',
        border: '#C49A10',
        iconBg: '#2a2200',
        iconColor: '#D4AF1A',
        labelColor: '#D4AF1A',
        icon: AlertTriangle,
        label: 'Pagamento pendente',
        title: 'Não conseguimos confirmar seu pagamento',
        subtitle: 'Faça um novo pagamento para continuar usando o Agenrap sem interrupções.',

        counterBg: '#2a2200',
        counterBorder: '#5a4a10',
        counterColor: '#D4AF1A',
        counterSubColor: '#8a7a2a',
        buttonText: 'Pagar agora',
    },
    renewal: {
        bg: '#0F141A',
        border: '#3a6a9a',
        iconBg: '#0a1a2a',
        iconColor: '#5a9ad4',
        labelColor: '#5a9ad4',
        icon: BellRing,
        label: 'Plano vencendo',
        title: 'Seu plano vence em breve',
        subtitle: 'A renovação não é automática — pague novamente antes do vencimento para não perder o acesso.',

        counterBg: '#0a1a2a',
        counterBorder: '#2a4a6a',
        counterColor: '#5a9ad4',
        counterSubColor: '#3a5a7a',
        buttonText: 'Renovar agora',
    },
    blocked: {
        bg: '#1A1209',
        border: '#C46210',
        iconBg: '#2a1200',
        iconColor: '#C46210',
        labelColor: '#C46210',
        icon: Lock,
        label: 'Plano expirado',
        title: 'Seu acesso foi suspenso',
        subtitle: 'Pague novamente para continuar gerenciando agendamentos e clientes.',
        counterBg: null,
        counterBorder: null,
        counterColor: null,
        counterSubColor: null,
        buttonText: 'Ativar plano — R$59,90/mês',
    },
} as const

export default function SubscriptionBanner({ subscription }: Props) {
    const { handleCheckout, isPending } = useSubscription()

    if (!subscription) return null

    const variant = getVariant(subscription)
    if (!variant) return null

    const cfg = VARIANT_CONFIG[variant]
    const Icon = cfg.icon

    const daysLeft =
        variant === 'trial' ? getDaysLeft(subscription.trialEndsAt) :
            variant === 'grace' ? getDaysLeft(subscription.gracePeriodEndsAt) :
                variant === 'renewal' ? getDaysLeft(subscription.currentPeriodEnd) :
                    null

    return (
        <div
            style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                borderRadius: 16,
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
                flexWrap: 'wrap',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                <div
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background: cfg.iconBg,
                        color: cfg.iconColor,
                    }}
                >
                    <Icon size={20} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: cfg.labelColor,
                    }}>
                        {cfg.label}
                    </span>
                    <p style={{ fontSize: 15, fontWeight: 600, color: '#F5E6CC', margin: 0 }}>
                        {cfg.title}
                    </p>
                    <p style={{ fontSize: 13, color: '#8a7a6a', margin: 0 }}>
                        {cfg.subtitle}
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                {daysLeft !== null && cfg.counterBg && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: cfg.counterBg,
                        borderRadius: 8,
                        padding: '8px 14px',
                        border: `1px solid ${cfg.counterBorder}`,
                    }}>
                        <span style={{ fontSize: 28, fontWeight: 700, color: cfg.counterColor!, lineHeight: 1 }}>
                            {daysLeft}
                        </span>
                        <span style={{ fontSize: 11, color: cfg.counterSubColor!, fontWeight: 500, marginTop: 2 }}>
                            dias restantes
                        </span>
                    </div>
                )}
                <button
                    onClick={handleCheckout}
                    disabled={isPending}
                    style={{
                        background: variant === 'blocked' ? '#C46210' : 'transparent',
                        color: variant === 'blocked' ? '#0a0600' : cfg.iconColor,
                        border: variant === 'blocked' ? 'none' : `1px solid ${cfg.border}`,
                        borderRadius: 8,
                        padding: '10px 20px',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: isPending ? 'not-allowed' : 'pointer',
                        opacity: isPending ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        whiteSpace: 'nowrap',
                    }}
                >
                    {isPending
                        ? <LoaderCircle size={16} className="animate-spin" />
                        : cfg.buttonText
                    }
                </button>
            </div>
        </div>
    )
}