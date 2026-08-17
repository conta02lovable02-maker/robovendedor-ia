import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Store, Package, Smartphone, MessageCircle, Star, Check, X,
  ArrowRight, Sparkles, Zap, Target, Shield, Clock, TrendingUp,
  ChevronDown, Bot, Heart, Users, Lock, Headphones, RefreshCw,
  Wrench, Scale, Home, Repeat, GraduationCap, Rocket, PenLine, BarChart3, Medal,
} from "lucide-react";

import { useCallback, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { NotificationBar, TopNotificationBar } from "@/components/NotificationBar";
import { DashboardMock } from "@/components/DashboardMock";
import { CheckoutButton } from "@/components/CheckoutButton";
import { CountdownTimer } from "@/components/CountdownTimer";
import { TestimonialsCarousel, type Testimonial } from "@/components/TestimonialsCarousel";
import { PixelAndTracking } from "@/components/PixelScript";
import { CountUp } from "@/components/CountUp";
import { VideoQuizGate } from "@/components/VideoQuizGate";
import { useQuizAnswers } from "@/lib/quiz-state";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Seu Robô de Lucro — RoboVendas.IA" },
      { name: "description", content: "Apenas 5 MINUTOS, esse é o tempo que você gasta para colocar no ar. Sem configuração, sem BM, sem cursos e ebook. Seu Gestor Humano e IA na palma da sua mão!" },
    ],
  }),
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

function Index() {
  const [gateDone, setGateDone] = useState(false);
  const handleGateFinish = useCallback(() => setGateDone(true), []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <VideoQuizGate onFinish={handleGateFinish} />
      <PixelAndTracking />
      {gateDone && (
        <>
          <SiteHeader />
          <TopNotificationBar />
          <Hero />
          <NotificationBar />
          <ComparisonSection />
          <HowItWorks />
          <Manifesto />
          <ForWhom />
          <FitCheck />
          <Benefits />
          <Bonuses />
          <Testimonials />
          <FAQ />
          <ThreeChoices />
          <Pricing />
          <Footer />
        </>
      )}
    </div>
  );
}


function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 md:py-28 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-foreground/90 sm:text-sm md:text-base">
            <Sparkles className="h-4 w-4 text-gold md:h-5 md:w-5" />
            A verdade cruel sobre anúncios que os gurus escondem
          </span>
          <h1 className="fluid-h1 mt-5 font-extrabold tracking-tight">
            A Verdade Cruel Sobre Anúncios Online Que Os Gurus Escondem De Você{" "}
            <span className="text-gradient">(e como virar o jogo nos próximos 5 minutos)</span>.
          </h1>
          <p className="fluid-lead mt-5 max-w-xl text-muted-foreground">

            Você não precisa de cursos de 100 horas, gerenciadores confusos ou agências que sugam seu dinheiro.
            Minha <span translate="no">IA</span> configura, otimiza e roda suas campanhas no piloto automático para trazer clientes reais
            para o seu negócio — enquanto você foca no que realmente importa.
          </p>

          <div className="mt-8 w-full max-w-md">
            <CheckoutButton variant="cta" size="lg" label="hero" scrollTo="#comparativo" pulse>
              Quero Simplificar Minhas Vendas Agora
            </CheckoutButton>
            <TrustBadges />
          </div>


          <div className="mt-5 flex items-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-sm italic text-muted-foreground">
              "Finalmente algo que não exige que eu seja um especialista em tráfego."
            </p>
          </div>

          <StatsBlock />
        </motion.div>

        <DashboardMock />
      </div>
    </section>
  );
}

function StatsBlock() {
  const stats = [
    { end: 3200, prefix: "+", suffix: "", decimals: 0, l: "Usuários ativos", c: "from-[oklch(0.65_0.27_300)] to-[oklch(0.7_0.22_240)]" },
    { end: 2.4, prefix: "R$ ", suffix: "M", decimals: 1, l: "Em vendas geradas", c: "from-[oklch(0.78_0.2_155)] to-[oklch(0.82_0.16_200)]" },
    { end: 4.9, prefix: "", suffix: "★", decimals: 1, l: "Avaliação média", c: "from-[oklch(0.74_0.22_50)] to-[oklch(0.82_0.16_88)]" },
  ];
  return (
    <div className="glass mt-8 grid w-full max-w-md grid-cols-3 gap-2 rounded-2xl p-3 sm:gap-3 sm:p-4">
      {stats.map((s) => (
        <motion.div
          key={s.l}
          whileHover={{ y: -3, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="rounded-xl bg-white/[0.03] p-2.5 text-center ring-1 ring-white/5 sm:p-3"
        >
          <CountUp
            end={s.end}
            prefix={s.prefix}
            suffix={s.suffix}
            decimals={s.decimals}
            className={`bg-gradient-to-br ${s.c} bg-clip-text text-lg font-extrabold text-transparent sm:text-2xl`}
          />
          <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[11px]">{s.l}</p>
        </motion.div>
      ))}
    </div>
  );
}


function ComparisonSection() {
  const rows = [
    { old: "Painéis confusos com centenas de botões", neu: "Interface limpa: preencha, clique e pronto" },
    { old: "Risco alto de perder dinheiro testando", neu: "Estrutura validada — você foca no seu negócio" },
    { old: "Meses estudando público, pixel e métricas", neu: "O sistema traduz tudo em segundos" },
    { old: "Falsa promessa de milhões na primeira semana", neu: "Crescimento real: foco em R$ 5k–10k mensais" },
  ];
  return (
    <section id="comparativo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
        <h2 className="fluid-h2 font-extrabold">
          A Diferença Entre o Mercado e o <span className="text-gradient">Nosso Robô</span>
        </h2>
        <p className="mt-3 text-muted-foreground">Veja por que pessoas comuns estão migrando dos gerenciadores complexos.</p>
      </motion.div>

      <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
        <motion.div {...fadeUp} className="glass rounded-2xl p-5 sm:p-7">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-destructive/15 px-3 py-1 text-xs font-semibold text-destructive">
            <X className="h-3.5 w-3.5" /> O Jeito Antigo
          </div>
          <h3 className="text-base font-semibold text-foreground/90 sm:text-lg">O Método Que Suga Seu Tempo e Seu Dinheiro</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            O Jeito Antigo envolve:
          </p>
          <ul className="mt-3 space-y-3">
            <li className="flex gap-3">
              <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <span className="text-sm text-muted-foreground">Passar noites em claro tentando entender o que é um <span translate="no">Pixel</span>.</span>
            </li>
            <li className="flex gap-3">
              <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <span className="text-sm text-muted-foreground">Ver sua conta ser bloqueada pelo Facebook sem motivo nenhum.</span>
            </li>
            <li className="flex gap-3">
              <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <span className="text-sm text-muted-foreground">Ver o saldo da sua conta bancária sumir em anúncios que não trazem cliques.</span>
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            É exaustivo. É frustrante. E faz você acreditar que vender na internet não é para você.
            Mas o erro não é seu. É da falta de um método que trabalhe por você.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          whileHover={{ y: -6, scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="glow-green relative rounded-2xl border-2 p-5 sm:p-7"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.32 0.14 155 / 0.55), oklch(0.22 0.08 160 / 0.5))",
          }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-success/25 px-3 py-1 text-xs font-semibold text-success ring-1 ring-success/50">
            <Check className="h-3.5 w-3.5" /> Nossa Solução
          </div>
          <h3 className="text-base font-semibold text-foreground sm:text-lg" translate="no">O Seu Novo Robô de Vendas</h3>
          <ul className="mt-5 space-y-4">
            {rows.map((r, i) => (
              <li key={i} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <span className="text-sm font-medium text-foreground">{r.neu}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Target, n: "01", t: "O Comando", d: "Acesse seu painel, escolha o que quer vender (físico, digital, serviço local ou WhatsApp) e nos diga seu objetivo." },
    { icon: Bot, n: "02", t: "A IA Trabalha", d: "Nosso sistema recebe o comando. Sem código, sem pixel, sem briga com Facebook Ads. O robô absorve seu pedido." },
    { icon: Zap, n: "03", t: "Vendas no Piloto Automático", d: "O anúncio entra no ar gerenciado por IA + expertise nos bastidores. Você só acompanha os clientes chegando." },
  ];
  return (
    <section id="como-funciona" className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="fluid-h2 font-extrabold">
            Como fazer dinheiro na internet virou questão de <span className="text-gradient">3 cliques</span>
          </h2>
          <p className="mt-3 text-muted-foreground">A complexidade fica no nosso lado. A simplicidade fica no seu.</p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass group relative rounded-2xl p-5 transition-shadow hover:shadow-[var(--shadow-glow-purple)] sm:p-7"
            >
              <span className="absolute right-6 top-6 text-6xl font-extrabold text-white/5">{s.n}</span>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform group-hover:scale-110"
                style={{ background: "var(--gradient-primary)" }}
              >
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground sm:text-xl">
                {s.t === "A IA Trabalha" ? (<>A <span translate="no">IA</span> Trabalha</>) : s.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, oklch(0.4 0.22 300 / 0.5), transparent 45%), radial-gradient(circle at 80% 70%, oklch(0.4 0.2 50 / 0.4), transparent 50%)",
        }}
      />
      <motion.div {...fadeUp} className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="text-7xl leading-none text-gradient">"</span>
        <h2 className="fluid-h2 -mt-6 font-extrabold">
          Chega de Sensacionalismo. Vamos Falar de Como Ganhar Dinheiro de Forma{" "}
          <span className="text-gradient">Digna</span>.
        </h2>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
          <p>
            A internet está cheia de "gurus" prometendo que você vai comprar uma Ferrari no mês que vem.
            <strong className="text-foreground"> Nós não.</strong> Nosso <span translate="no">Robô de Vendas</span> foi criado para pessoas normais
            que querem sair do sufoco, deixar a <span translate="no">CLT</span> para trás e ter liberdade de trabalhar de onde quiserem.
          </p>
          <p>
            Acreditamos em construir estabilidade. Com tempo e dedicação usando nossa <span translate="no">IA</span>, construir uma renda extra real de
            <strong className="text-gradient" translate="no"> R$ 5.000 a R$ 10.000 por mês</strong> não é conto de fadas — é matemática pura.
            É sobre ter uma renda que complementa ou substitui o salário fixo. É sobre ter paz.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Heart className="h-4 w-4 text-cta" /> Feito para pessoas reais</span>
          <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-cta" /> Sem promessas vazias</span>
          <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-cta" /> Crescimento sustentável</span>
        </div>
      </motion.div>
    </section>
  );
}

function ForWhom() {
  const baseCards = [
    { key: "fisico", icon: Store, t: "Negócios Físicos", d: "Lojas, mercados, padarias, clínicas e restaurantes que precisam atrair clientes da região todos os dias." },
    { key: "ecom", icon: Package, t: "E-commerce / Dropshipping", d: "Venda produtos escaláveis sem precisar entender de bloqueios, BM ou contas comerciais." },
    { key: "digital", icon: Smartphone, t: "Produtos Digitais / Infoprodutos", d: "Cursos, ebooks e mentorias vendendo no automático, mesmo pra quem está lançando o primeiro produto." },
    { key: "whats", icon: MessageCircle, t: "Vendas pelo WhatsApp", d: "Quer o telefone tocando com gente interessada? O robô manda o público certo direto pro chat." },
    { key: "servico", icon: Wrench, t: "Prestadores de Serviço", d: "Pedreiros, eletricistas, diaristas, encanadores e qualquer serviço que depende de clientes novos toda semana." },
    { key: "liberal", icon: Scale, t: "Profissionais Liberais", d: "Advogados, médicos, dentistas e consultores que querem agenda cheia sem depender de indicação." },
    { key: "alto", icon: Home, t: "Imóveis e Bens de Alto Valor", d: "Corretores e lojas de eletrodomésticos, móveis e eletrônicos vendendo para público qualificado." },
    { key: "afiliado", icon: Repeat, t: "Afiliados e Quem Está Começando do Zero", d: "Nunca vendeu nada? Já é afiliado e quer vender mais? O robô simplifica pra quem está começando ou quer escalar." },
  ];
  const answers = useQuizAnswers();
  const cards = useMemo(() => {
    const b = answers.business || "";
    let firstKey: string | null = null;
    if (b.includes("físico")) firstKey = "fisico";
    else if (b.includes("digital")) firstKey = "digital";
    else if (b.includes("E-commerce")) firstKey = "ecom";
    else if (b.includes("WhatsApp")) firstKey = "whats";
    if (!firstKey) return baseCards;
    const first = baseCards.find((c) => c.key === firstKey);
    if (!first) return baseCards;
    return [first, ...baseCards.filter((c) => c.key !== firstKey)];
  }, [answers.business]);
  return (
    <section id="para-quem" className="mx-auto max-w-7xl overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
        <h2 className="fluid-h2 font-extrabold">
          Se você vende <span className="text-gradient">ALGO</span>, o robô trabalha pra você
        </h2>
        <p className="mt-3 text-muted-foreground">
          Físico, digital, serviço ou produto — não importa o que você vende, o robô se adapta ao seu negócio.
        </p>
      </motion.div>
      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {cards.map((c, i) => {
          const fromLeft = i % 2 === 0;
          return (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, x: fromLeft ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, type: "spring", stiffness: 90, damping: 16 }}
              whileHover={{ y: -8, rotate: -0.5 }}
              whileTap={{ scale: 0.98 }}
              className="glass group rounded-2xl p-5 transition-all hover:shadow-[var(--shadow-glow-cyan)] sm:p-6"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-cta-foreground transition-transform group-hover:scale-110"
                style={{ background: "var(--gradient-cta)" }}
              >
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground sm:text-lg">
                {c.t.includes("WhatsApp") ? (
                  <>Vendas pelo <span translate="no">WhatsApp</span></>
                ) : c.t.includes("E-commerce") ? (
                  <span translate="no">E-commerce / Dropshipping</span>
                ) : (
                  c.t
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Benefits() {
  return <BenefitsInner />;
}

function FitCheck() {
  const yes = [
    "Nunca vendeu nada e quer começar do jeito certo, sem enrolação",
    "Já é afiliado ou produtor e quer vender mais sem depender só de indicação",
    "Presta serviço (limpeza, obra, consultoria, saúde) e precisa de cliente novo toda semana",
    "Tem loja física, e-commerce ou vende produto digital e quer parar de deixar dinheiro na mesa",
    "Quer ter controle do processo sem depender de agência cara",
  ];
  const no = [
    "Quer resultado sem configurar nada nem seguir o passo a passo",
    "Está buscando ficar rico da noite pro dia",
    "Não está disposto a investir nem um real em anúncio",
    "Prefere continuar pagando caro por uma agência sem saber o que ela faz",
  ];
  return (
    <section id="para-quem-nao-e" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
        <h2 className="fluid-h2 font-extrabold">
          Para quem é <span className="text-gradient">e para quem não é</span>
        </h2>
        <p className="mt-3 text-muted-foreground">Seja honesto com você mesmo antes de ativar o robô.</p>
      </motion.div>

      <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
        <motion.div
          {...fadeUp}
          whileHover={{ y: -6, scale: 1.015 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="glow-green relative rounded-2xl border-2 p-5 sm:p-7"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.32 0.14 155 / 0.55), oklch(0.22 0.08 160 / 0.5))",
          }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-success/25 px-3 py-1 text-xs font-semibold text-success ring-1 ring-success/50">
            <Check className="h-3.5 w-3.5" /> O robô é pra você que:
          </div>
          <ul className="space-y-4">
            {yes.map((t) => (
              <li key={t} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <span className="text-sm font-medium text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp} className="glass rounded-2xl p-5 sm:p-7">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-destructive/15 px-3 py-1 text-xs font-semibold text-destructive">
            <X className="h-3.5 w-3.5" /> O robô NÃO é pra você que:
          </div>
          <ul className="space-y-4">
            {no.map((t) => (
              <li key={t} className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <span className="text-sm text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Bonuses() {
  const items = [
    { icon: GraduationCap, t: "Seller School", d: "Curso dentro do próprio app te ensinando a vender passo a passo — serve pra iniciante, afiliado ou empresa, sem precisar fazer curso externo.", v: "Incluso" },
    { icon: Headphones, t: "Suporte via WhatsApp", d: "Fale direto com nosso time sempre que precisar, sem ticket, sem espera.", v: "R$ 97,00" },
    { icon: Rocket, t: "Turbinar Campanha", d: "Um clique para acelerar o alcance da sua campanha quando ela está performando bem.", v: "R$ 47,00" },
    { icon: PenLine, t: "Copy Inteligente", d: "A IA escreve o texto do seu anúncio automaticamente, testado para converter, pra qualquer tipo de negócio.", v: "R$ 97,00" },
    { icon: BarChart3, t: "Relatório de Campanhas", d: "Baixe o relatório completo de performance para acompanhar ou mostrar resultado.", v: "R$ 27,00" },
    { icon: Medal, t: "Selo de Prioridade", d: "Suas campanhas entram na frente na fila de ativação do robô.", v: "R$ 47,00" },
  ];
  return (
    <section id="bonus" className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="fluid-h2 font-extrabold">
            Ao ativar o robô hoje, <span className="text-gradient">você também leva:</span>
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glow-yellow relative rounded-2xl border-2 bg-white/[0.03] p-5 backdrop-blur-md sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <it.icon className="h-7 w-7 text-gold" />
                <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs font-bold text-gold ring-1 ring-white/10">{it.v}</span>
              </div>
              <h3 className="mt-4 font-bold text-foreground" translate="no">{it.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp}
          className="relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl border border-[oklch(0.65_0.27_300/0.4)] bg-gradient-to-br from-[oklch(0.22_0.06_280/0.7)] to-[oklch(0.18_0.04_270/0.7)] p-5 text-center sm:p-8"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[oklch(0.74_0.22_50/0.25)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[oklch(0.65_0.27_300/0.25)] blur-3xl" />
          <p className="relative text-sm text-muted-foreground sm:text-base">
            <span translate="no">Robô de Vendas (R$ 1.200,00)</span> + todos os bônus acima ={" "}
            <span className="font-extrabold text-foreground" translate="no">R$ 1.515,00</span> em valor
          </p>
          <p className="relative mt-3 text-base font-extrabold text-foreground sm:text-lg">
            Hoje, tudo isso sai por{" "}
            <span className="text-gradient" translate="no">R$ 197,00</span> (primeira parcela) +{" "}
            <span className="text-gradient" translate="no">R$ 97,00/mês</span> a partir do 2º mês
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ThreeChoices() {
  const options = [
    { icon: X, t: "Continuar perdendo dinheiro", d: "Testando anúncio sozinho, sem saber o que está fazendo.", tone: "bad" as const },
    { icon: Clock, t: "Contratar uma agência cara", d: "E ficar sem controle nem clareza do que estão fazendo com seu dinheiro.", tone: "bad" as const },
    { icon: Check, t: "Ativar o robô agora", d: "Com Seller School, suporte via WhatsApp e prioridade na fila inclusos, e começar a vender ainda essa semana — seja você iniciante, afiliado, prestador de serviço ou dono de negócio.", tone: "good" as const },
  ];
  return (
    <section id="escolhas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
        <h2 className="fluid-h2 font-extrabold">
          Chegou até aqui? Agora você tem <span className="text-gradient">3 opções:</span>
        </h2>
      </motion.div>
      <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3 md:gap-6">
        {options.map((o, i) =>
          o.tone === "good" ? (
            <motion.div
              key={o.t}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="glow-green relative rounded-2xl border-2 p-5 sm:p-7"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.32 0.14 155 / 0.55), oklch(0.22 0.08 160 / 0.5))",
              }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-success/25 px-3 py-1 text-xs font-semibold text-success ring-1 ring-success/50">
                <o.icon className="h-3.5 w-3.5" /> Opção {i + 1}
              </div>
              <h3 className="text-base font-bold text-foreground sm:text-lg">{o.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{o.d}</p>
            </motion.div>
          ) : (
            <motion.div
              key={o.t}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-5 sm:p-7"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-destructive/15 px-3 py-1 text-xs font-semibold text-destructive">
                <o.icon className="h-3.5 w-3.5" /> Opção {i + 1}
              </div>
              <h3 className="text-base font-semibold text-foreground/90 sm:text-lg">{o.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.d}</p>
            </motion.div>
          ),
        )}
      </div>
      <div className="mx-auto mt-10 w-full max-w-md">
        <CheckoutButton variant="success" size="lg" label="tres-opcoes" scrollTo="#preco" pulse>
          Quero Ativar o Robô Agora
        </CheckoutButton>
      </div>
    </section>
  );
}

function BenefitsInner() {
  const items = [
    { icon: Clock, t: "Configuração em 5 minutos", d: "Sem cursos, sem semanas de estudo." },
    { icon: Shield, t: "Você controla seu orçamento", d: "Comece com pouco, escale com confiança." },
    { icon: Users, t: "Suporte humano premium", d: "Gente de verdade respondendo seu chat." },
    { icon: TrendingUp, t: "Otimização contínua por IA", d: "Os anúncios melhoram sozinhos a cada hora.", translateNoTitle: true },
  ];
  return (
    <section className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="fluid-h2 font-extrabold">
            Tudo o que você precisa. <span className="text-gradient">Nada do que não precisa.</span>
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glow-yellow relative rounded-2xl border-2 bg-white/[0.03] p-5 backdrop-blur-md sm:p-6"
            >
              <it.icon className="h-7 w-7 text-gold" />
              <h3 className="mt-4 font-bold text-foreground">
                {it.translateNoTitle ? (
                  <>Otimização contínua por <span translate="no">IA</span></>
                ) : (
                  it.t
                )}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{it.d}</p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Como ganhar dinheiro com esse Robô se eu não tenho experiência?", a: "A plataforma foi criada exatamente para iniciantes. Você só precisa ter um produto ou serviço e seguir os passos simples na tela. A complexidade do tráfego fica por conta do sistema." },
    { q: "É seguro colocar meu dinheiro nisso?", a: "Sim. Você tem total controle sobre o orçamento que deseja investir nos anúncios. Nós apenas automatizamos e simplificamos a criação e otimização para que você pare de perder tempo." },
    { q: "Em quanto tempo vou saber como fazer dinheiro de verdade?", a: "Fugimos de falsas promessas. Os resultados dependem do seu nicho e produto, mas nossa ferramenta elimina a curva de aprendizado de meses de gestão de tráfego, acelerando seus resultados reais desde a primeira semana." },
    { q: "Preciso ter site ou loja online?", a: "Não. O robô funciona com links de WhatsApp, páginas de venda, perfis sociais ou qualquer destino que você queira receber tráfego qualificado." },
    { q: "Posso cancelar quando quiser?", a: "Sim. Sem fidelidade, sem letras miúdas. Cancela com 1 clique direto no painel." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <motion.div {...fadeUp} className="text-center">
        <h2 className="fluid-h2 font-extrabold">
          Perguntas <span className="text-gradient">Frequentes</span>
        </h2>
        <p className="mt-3 text-muted-foreground">Tirando as dúvidas mais comuns antes de você começar.</p>
      </motion.div>
      <div className="mt-8 space-y-3 sm:mt-10">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass overflow-hidden rounded-xl"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-white/5 sm:px-6 sm:py-5"
            >
              <span className="text-sm font-semibold text-foreground sm:text-base">{f.q}</span>
              <ChevronDown className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>

            <motion.div
              initial={false}
              animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-5">{f.a}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const items: (Testimonial & { key: string })[] = [
    {
      key: "carla",
      name: "Carla Menezes",
      role: "Dona de salão de beleza • Recife/PE",
      result: "Agenda lotada em 2 semanas",
      text: "Eu não entendia nada de anúncio. Em 5 minutos meu robô estava no ar e meu WhatsApp não parou de tocar. Hoje fatura R$ 8k por mês.",
      avatarUrl: "https://i.pravatar.cc/160?img=45",
    },
    {
      key: "rafael",
      name: "Rafael Andrade",
      role: "E-commerce de suplementos",
      result: "ROI de 4.8x no primeiro mês",
      text: "Já tinha gastado mais de R$ 8 mil com agência sem resultado. O robô virou a chave: vendas todo dia, no automático.",
      avatarUrl: "https://i.pravatar.cc/160?img=12",
    },
    {
      key: "juliana",
      name: "Juliana Prado",
      role: "Produtora digital • SP",
      result: "+312% em conversão",
      text: "O painel é absurdamente simples. Sem pixel, sem BM bloqueada, sem dor de cabeça. Só os clientes chegando.",
      avatarUrl: "https://i.pravatar.cc/160?img=47",
    },
    {
      key: "marcos",
      name: "Marcos Vinícius",
      role: "Restaurante delivery",
      result: "De 12 para 78 pedidos/dia",
      text: "Sou do interior, não manjo de tecnologia. Em uma semana o robô lotou minhas noites de quinta a domingo.",
      avatarUrl: "https://i.pravatar.cc/160?img=15",
    },
    {
      key: "patricia",
      name: "Patrícia Lima",
      role: "Loja de roupas online",
      result: "R$ 7.200 em 30 dias",
      text: "Larguei a CLT depois de 4 meses usando. Hoje trabalho de casa cuidando do meu filho. Estabilidade de verdade.",
      avatarUrl: "https://i.pravatar.cc/160?img=32",
    },
    {
      key: "diego",
      name: "Diego Tavares",
      role: "Coach financeiro",
      result: "Leads qualificados todo dia",
      text: "Cancelei 3 ferramentas que eu pagava e ainda assim minha receita dobrou. Suporte responde em minutos.",
      avatarUrl: "https://i.pravatar.cc/160?img=68",
    },
  ];

  const answers = useQuizAnswers();
  const ordered = useMemo(() => {
    const b = answers.business || "";
    let firstKey: string | null = null;
    if (b.includes("físico")) firstKey = "carla";
    else if (b.includes("digital")) firstKey = "juliana";
    else if (b.includes("E-commerce")) firstKey = "rafael";
    else if (b.includes("WhatsApp")) firstKey = "carla";
    if (!firstKey) return items;
    const first = items.find((c) => c.key === firstKey);
    if (!first) return items;
    return [first, ...items.filter((c) => c.key !== firstKey)];
  }, [answers.business]);

  return (
    <section className="relative py-16 sm:py-24">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, oklch(0.4 0.2 50 / 0.35), transparent 55%), radial-gradient(circle at 20% 80%, oklch(0.4 0.22 300 / 0.4), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-2xl font-extrabold text-gradient" translate="no">4.9</span>
            <span className="text-sm text-muted-foreground">/ 5 • +3.200 usuários</span>
          </div>
          <h2 className="fluid-h2 mt-4 font-extrabold">
            Pessoas reais. Resultados <span className="text-gradient">reais</span>.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Nada de prints fora de contexto. Veja quem já saiu do sufoco com o robô.
          </p>
        </motion.div>


        <TestimonialsCarousel items={ordered} />
      </div>
    </section>
  );
}

function Pricing() {
  const features = [
    "Acesso ao Painel Simplificado",
    "Inteligência para Negócios Locais, Digitais e WhatsApp",
    "Suporte Premium Humanizado",
    "Otimização automática por IA 24/7",
    "Treinamento em vídeo passo a passo",
    "Cancelamento fácil a qualquer momento",
  ];
  return (
    <section id="preco" className="relative py-16 sm:py-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, oklch(0.35 0.2 300 / 0.4), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div {...fadeUp} className="text-center">
          <h2 className="fluid-h2 font-extrabold">
            Dê o primeiro passo para a sua{" "}
            <span className="text-gradient">estabilidade financeira</span> hoje.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Não pague milhares para agências nem sofra tentando aprender sozinho.
            Tenha gestão de tráfego profissional escondida atrás dos cliques mais simples que você já viu.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="glass relative mt-10 overflow-hidden rounded-3xl p-5 text-center shadow-[var(--shadow-elegant)] sm:mt-12 sm:p-8 md:p-10"
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[oklch(0.65_0.27_300/0.5)]" />
          <div
            className="absolute right-0 top-0 rounded-bl-2xl px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-cta-foreground sm:px-4 sm:text-xs"
            style={{ background: "var(--gradient-cta)" }}
          >
            ★ Plano Principal
          </div>

          <h3 className="mt-6 text-xl font-extrabold text-foreground sm:mt-0 sm:text-2xl" translate="no">Robô de Vendas Completo</h3>
          <p className="mt-1 text-sm text-muted-foreground">Acesso vitalício à plataforma e atualizações.</p>

          {/* Price anchoring — fully centralized */}
          <div className="relative my-6 overflow-hidden rounded-2xl border border-[oklch(0.65_0.27_300/0.4)] bg-gradient-to-br from-[oklch(0.22_0.06_280/0.7)] to-[oklch(0.18_0.04_270/0.7)] p-5 sm:my-7 sm:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[oklch(0.74_0.22_50/0.25)] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[oklch(0.65_0.27_300/0.25)] blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-md bg-destructive/20 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-destructive sm:text-[11px]">
                  -84% HOJE
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-gold/15 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gold sm:text-[11px]">
                  <Clock className="h-3 w-3" /> Oferta por tempo limitado
                </span>
              </div>

              <div className="mt-5 flex items-baseline justify-center gap-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">De</span>
                <span className="text-xl font-bold text-muted-foreground line-through decoration-destructive/70 decoration-2 sm:text-2xl" translate="no">
                  R$ 1.200,00
                </span>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold">
                Por apenas
              </p>
              <p
                className="mt-1 font-extrabold leading-none text-gradient"
                style={{ fontSize: "clamp(2.5rem, 10vw, 4rem)" }}
                translate="no"
              >
                R$ 197,00
              </p>
              <p className="mt-2 text-sm text-muted-foreground" translate="no">
                ou 12x de R$ 16,41 no cartão
              </p>

              <div className="mt-5 flex w-full max-w-sm items-start gap-3 rounded-xl border border-success/40 bg-success/10 px-4 py-3 text-left">
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <div className="text-foreground">
                  <p className="text-sm">
                    + Mensalidade de{" "}
                    <strong className="text-success" translate="no">R$ 97,00/mês</strong> a partir do 2º mês
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    (cobre manutenção do painel e otimização contínua da IA)
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Cancele quando quiser, sem multa nem fidelidade.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs font-semibold text-foreground/70">
                💰 Você economiza{" "}
                <span className="text-gradient" translate="no">R$ 997,90</span> hoje
              </p>
            </div>
          </div>

          <ul className="mx-auto max-w-md space-y-3 text-left">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success/15 ring-1 ring-success/40">
                  <Check className="h-3.5 w-3.5 text-success" />
                </div>
                <span className="text-sm text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>

          <CountdownTimer />

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <p className="text-sm leading-relaxed text-foreground/90">
              Uma agência de tráfego cobraria de você <strong className="text-foreground" translate="no">R$ 1.500 a R$ 5.000 por mês</strong> para gerenciar seus anúncios (e muitas vezes sem garantia de resultado). Ferramentas americanas complexas custam centenas de dólares.
            </p>
            <p className="mt-3 text-sm font-semibold text-cta">Eu faço diferente.</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Por apenas <strong className="text-foreground" translate="no">R$ 197,80</strong>, você tem o poder de uma agência inteira resumida em uma tela de 3 cliques. Sem letras miúdas, sem contratos de fidelidade. Eu baixei o preço ao limite porque sei como é estar no início, querendo apenas uma renda previsível para respirar em paz.
            </p>
          </div>

          <div className="mx-auto mt-6 w-full max-w-md">
            <CheckoutButton variant="success" size="lg" label="pricing" pulse>
              Quero Acessar o Robô e Começar Hoje
            </CheckoutButton>
          </div>

          <TrustBadges variant="pricing" />
        </motion.div>
      </div>

    </section>
  );
}

function TrustBadges({ variant = "hero" }: { variant?: "hero" | "pricing" }) {
  const items = [
    { icon: Lock, label: "Pagamentos Seguros" },
    { icon: Headphones, label: "Suporte Rápido" },
    { icon: RefreshCw, label: "Cancelamento Fácil" },
    { icon: Shield, label: "Compra Protegida" },
  ];
  if (variant === "pricing") {
    return (
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.label}
            className="glass flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 text-center"
          >
            <it.icon className="h-5 w-5 text-success" />
            <span className="text-[11px] font-semibold text-foreground/85">{it.label}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
      {items.slice(0, 3).map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5">
          <it.icon className="h-3.5 w-3.5 text-success" /> {it.label}
        </span>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg shadow-[var(--shadow-glow-purple)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Bot className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-foreground">
            RoboVendas<span className="text-gradient">.IA</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 RoboVendas.IA — Construindo estabilidade financeira de verdade.</p>
      </div>
    </footer>
  );
}
