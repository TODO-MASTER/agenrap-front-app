import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  appointmentsTodayMobile,
  appointmentsTodayPng,
  macroLogo,
  scheduleDesktop,
  scheduleMobile,
} from "@/src/assets/images";
import {
  CalendarCheck,
  Scissors,
  PawPrint,
  Dumbbell,
  Sparkles,
  ArrowRight,
  Check,
  Link2,
  Bell,
  Clock,
  Ban,
} from "lucide-react";
import { ScrollHint } from "@/src/features/customers/components/service-showcase/showcase-section/scroll-hint";

export const metadata: Metadata = {
  title: "Agenrap — Sua agenda, seu @rap",
  description:
    "Agenda online com link próprio. Seus clientes marcam sozinhos, sem mensagem de ida e volta. Para salões, barbearias, pet shops e negócios que vivem de horário.",
};

const SEGMENTS = [
  { icon: Scissors, label: "Salões e barbearias" },
  { icon: PawPrint, label: "Pet shops e banho & tosa" },
  { icon: Dumbbell, label: "Personal trainers e estúdios" },
  { icon: Sparkles, label: "Estética e clínicas" },
];

const STEPS = [
  {
    title: "Cadastre seu negócio",
    text: "Crie a conta, defina o nome e escolha o @rap do estabelecimento. Em poucos minutos sua agenda já tem endereço próprio.",
    icon: Link2,
  },
  {
    title: "Configure serviços e horários",
    text: "Informe o que você oferece, a duração, o valor e os dias em que atende. A agenda fica pronta para receber marcações.",
    icon: Clock,
  },
  {
    title: "Compartilhe e receba agendamentos",
    text: "Envie o link no WhatsApp, Instagram ou onde preferir. O cliente vê os horários livres e marca sozinho.",
    icon: CalendarCheck,
  },
];

const FEATURES = [
  {
    icon: Bell,
    title: "Lembrete automático",
    text: "Confirmação por e-mail no momento do agendamento. Menos esquecimento, menos falta no dia.",
  },
  {
    icon: Ban,
    title: "Sem choque de horário",
    text: "Só entram na agenda os horários que realmente cabem. Conflito de marcação deixa de ser problema.",
  },
  {
    icon: Clock,
    title: "Folgas e bloqueios",
    text: "Feriado, folga ou só duas horas bloqueadas na terça: você define, e ninguém marca em cima.",
  },
  {
    icon: CalendarCheck,
    title: "Painel de gestão",
    text: "Acompanhe o dia, conclua atendimentos e veja clientes recorrentes em um painel feito para o ritmo do negócio.",
  },
];

export default function LandingPage() {
  return (
    <main className="w-full overflow-x-hidden bg-(--agenrap-gray-200)">
      <section className="relative flex min-h-lvh w-full flex-col items-center justify-center overflow-hidden bg-(--agenrap-gray-800) px-6 py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <Image src={macroLogo} alt="" fill className="object-contain" />
        </div>

        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-(--agenrap-purple-500)/25 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[380px] w-[380px] rounded-full bg-(--agenrap-yellow-200)/10 blur-[120px]" />

        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-y-8 text-center">
          <span className="flex items-center gap-2 rounded-full border border-(--agenrap-yellow-200)/30 bg-white/5 px-4 py-1.5 font-tree text-xs font-semibold uppercase tracking-widest text-(--agenrap-yellow-200)">
            <Sparkles size={14} />
            Agenda online para quem vive de horário
          </span>

          <h1 className="font-cinzel text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl">
            Sua agenda agora tem
            <br />
            <span className="text-(--agenrap-yellow-200)">endereço próprio</span>
          </h1>

          <p className="max-w-xl font-tree text-base leading-relaxed text-white/70 md:text-lg">
            Sem troca de mensagem para achar horário. Seus clientes acessam o{" "}
            <span className="font-semibold text-white">@rap</span> do negócio,
            veem o que está livre e marcam sozinhos. Você só atende.
          </p>

          <div className="flex w-full max-w-md flex-col gap-2">
            <div className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-tree text-sm text-white/50 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="ml-2 truncate">
                {process.env.NEXT_PUBLIC_APP_URL}/
                <span className="font-semibold text-(--agenrap-yellow-200)">
                  @rap-seu-negocio
                </span>
              </span>
            </div>
            <p className="font-tree text-xs text-white/40">
              O link que você compartilha no story, no cardápio ou no cartão de visita.
            </p>
          </div>

          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/register?cmd=N"
              className="flex items-center justify-center gap-2 rounded-md bg-(--agenrap-purple-500) px-8 py-3.5 font-tree font-bold text-white transition-colors hover:bg-(--agenrap-purple-500)/85"
            >
              Começar grátis
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/register?cmd=Y"
              className="flex items-center justify-center gap-2 rounded-md border border-white/15 px-8 py-3.5 font-tree font-semibold text-white/80 transition-colors hover:bg-white/5"
            >
              Sou cliente, quero agendar
            </Link>
          </div>

          <p className="font-tree text-xs text-white/35">
            Teste sem cartão. Cancele quando quiser.
          </p>

          <p className="font-tree text-sm text-white/50">
            Já tem conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-(--agenrap-yellow-200) underline-offset-4 hover:underline"
            >
              Entrar
            </Link>
          </p>

          <div className="mt-2">
            <ScrollHint targetId="pra-quem-e" />
          </div>
        </div>
      </section>

      <section
        id="pra-quem-e"
        className="w-full bg-(--agenrap-gray-200) px-6 py-20"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-y-10">
          <div className="flex flex-col items-center gap-y-3 text-center">
            <p className="font-tree text-sm font-semibold uppercase tracking-widest text-(--agenrap-brown-500)">
              Para quem é
            </p>
            <h2 className="font-cinzel text-3xl font-bold text-(--agenrap-gray-800) md:text-4xl">
              Se o seu negócio depende de horário, o Agenrap encaixa
            </h2>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
            {SEGMENTS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-y-3 rounded-xl border border-(--agenrap-gray-800)/8 bg-white px-4 py-8 text-center shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--agenrap-purple-500)/10">
                  <Icon size={22} className="text-(--agenrap-purple-500)" />
                </div>
                <p className="font-tree text-sm font-semibold text-(--agenrap-gray-800)">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-6 py-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-y-14">
          <div className="flex flex-col items-center gap-y-3 text-center">
            <p className="font-tree text-sm font-semibold uppercase tracking-widest text-(--agenrap-brown-500)">
              Como funciona
            </p>
            <h2 className="font-cinzel text-3xl font-bold text-(--agenrap-gray-800) md:text-4xl">
              Do cadastro ao primeiro agendamento
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map(({ title, text, icon: Icon }, i) => (
              <div key={title} className="relative flex flex-col gap-y-4">
                <div className="flex items-center gap-x-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--agenrap-gray-800) text-(--agenrap-yellow-200)">
                    <Icon size={20} />
                  </span>
                  <span className="font-cinzel text-2xl font-bold text-(--agenrap-purple-500)">
                    0{i + 1}
                  </span>
                </div>
                <p className="font-tree text-lg font-bold text-(--agenrap-gray-800)">
                  {title}
                </p>
                <p className="font-tree text-sm leading-relaxed text-(--agenrap-gray-800)/60">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-(--agenrap-gray-800) px-6 py-24">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-y-14">
          <div className="flex flex-col items-center gap-y-3 text-center">
            <p className="font-tree text-sm font-semibold uppercase tracking-widest text-(--agenrap-yellow-200)">
              Por dentro do painel
            </p>
            <h2 className="font-cinzel text-3xl font-bold text-white md:text-4xl">
              Controle para você. Clareza para o cliente.
            </h2>
          </div>

          <div className="grid w-full grid-cols-1 gap-6">
            <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2">
              <Image
                src={appointmentsTodayMobile}
                alt="Painel de agendamentos do dia"
                width={800}
                height={1200}
                quality={95}
                className="h-auto w-full rounded-xl md:hidden"
                sizes="100vw"
              />
              <Image
                src={appointmentsTodayPng}
                alt="Painel de agendamentos do dia"
                width={1200}
                height={700}
                quality={95}
                className="hidden h-auto w-full rounded-xl md:block"
                sizes="(max-width: 1024px) 90vw, 1000px"
              />
            </div>
            <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2">
              <Image
                src={scheduleMobile}
                alt="Tela de horários disponíveis do cliente"
                width={800}
                height={1200}
                quality={95}
                className="h-auto w-full rounded-xl md:hidden"
                sizes="100vw"
              />
              <Image
                src={scheduleDesktop}
                alt="Tela de horários disponíveis do cliente"
                width={1200}
                height={700}
                quality={95}
                className="hidden h-auto w-full rounded-xl md:block"
                sizes="(max-width: 1024px) 90vw, 1000px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-(--agenrap-gray-200) px-6 py-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-y-14">
          <div className="flex flex-col items-center gap-y-3 text-center">
            <p className="font-tree text-sm font-semibold uppercase tracking-widest text-(--agenrap-brown-500)">
              Incluso na assinatura
            </p>
            <h2 className="font-cinzel text-3xl font-bold text-(--agenrap-gray-800) md:text-4xl">
              O essencial para manter a agenda sob controle
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-x-4 rounded-xl border border-(--agenrap-gray-800)/8 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--agenrap-brown-200)">
                  <Icon size={20} className="text-(--agenrap-brown-500)" />
                </span>
                <div className="flex flex-col gap-y-1.5">
                  <p className="font-tree text-base font-bold text-(--agenrap-gray-800)">
                    {title}
                  </p>
                  <p className="font-tree text-sm leading-relaxed text-(--agenrap-gray-800)/60">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-6 py-24">
        <div className="mx-auto flex max-w-md flex-col items-center gap-y-10 text-center">
          <div className="flex flex-col items-center gap-y-3">
            <p className="font-tree text-sm font-semibold uppercase tracking-widest text-(--agenrap-brown-500)">
              Assinatura
            </p>
            <h2 className="font-cinzel text-3xl font-bold text-(--agenrap-gray-800) md:text-4xl">
              Acesso completo, cobrança mensal
            </h2>
            <p className="font-tree text-sm text-(--agenrap-gray-800)/60">
              Tudo o que o Agenrap oferece hoje, em uma assinatura mensal. Sem
              fidelidade. Cancele quando quiser.
            </p>
          </div>

          <div className="flex w-full flex-col overflow-hidden rounded-2xl border-2 border-(--agenrap-purple-500) bg-(--agenrap-gray-800) shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col gap-y-1 border-b border-white/10 px-8 py-8">
              <p className="font-tree text-xs font-semibold uppercase tracking-widest text-(--agenrap-yellow-200)">
                Plano mensal
              </p>
              <div className="flex items-end justify-center gap-x-1">
                <span className="font-tree text-2xl font-semibold text-white/70">R$</span>
                <span className="font-cinzel text-6xl font-bold text-white">59</span>
                <span className="mb-1.5 font-tree text-2xl font-semibold text-white/70">
                  ,90
                </span>
              </div>
              <p className="font-tree text-sm text-white/50">
                por mês · renovação automática
              </p>
            </div>

            <ul className="flex flex-col gap-y-4 px-8 py-8 text-left">
              {[
                "Agenda com @rap personalizado",
                "Agendamentos ilimitados",
                "Serviços e horários ilimitados",
                "Clientes com ou sem cadastro",
                "Bloqueios de folga e horário",
                "Painel completo de gestão",
              ].map((item) => (
                <li key={item} className="flex items-center gap-x-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--agenrap-yellow-200)">
                    <Check size={13} className="text-(--agenrap-gray-800)" />
                  </span>
                  <span className="font-tree text-sm text-white/85">{item}</span>
                </li>
              ))}
            </ul>

            <div className="px-8 pb-8">
              <Link
                href="/register?cmd=N"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-(--agenrap-purple-500) py-3.5 font-tree font-bold text-white transition-colors hover:bg-(--agenrap-purple-500)/85"
              >
                Assinar agora
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex w-full flex-col items-center gap-y-8 overflow-hidden bg-(--agenrap-brown-500) px-6 py-24 text-center">
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-black/10 blur-[100px]" />
        <h2 className="relative z-10 max-w-xl font-cinzel text-3xl font-bold text-white md:text-4xl">
          Sua agenda organizada começa com um @rap
        </h2>
        <p className="relative z-10 max-w-md font-tree text-white/80">
          Cadastre o negócio, configure a agenda e compartilhe o link. Sem
          instalação. Cancele quando quiser.
        </p>
        <Link
          href="/register?cmd=N"
          className="relative z-10 flex items-center gap-2 rounded-md bg-(--agenrap-gray-800) px-10 py-4 font-tree font-bold text-(--agenrap-yellow-200) transition-colors hover:bg-(--agenrap-gray-800)/85"
        >
          Começar grátis
          <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="flex w-full flex-col items-center gap-y-4 bg-(--agenrap-gray-800) px-6 py-10">
        <Image
          src={macroLogo}
          alt="Agenrap"
          width={40}
          height={40}
          className="opacity-70"
        />
        <p className="font-tree text-xs text-white/40">
          © {new Date().getFullYear()} Agenrap. Agenda online com endereço
          próprio.
        </p>
      </footer>
    </main>
  );
}