import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bot, Settings as SettingsIcon, BarChart3, Save, Eye, MousePointerClick, ShoppingCart, TrendingUp, Activity, Trash2, Link as LinkIcon, Tag, PlayCircle, ListChecks, MessageCircle, Copy, Check as CheckIcon, Search } from "lucide-react";
import { getConfig, saveConfig, useSiteConfig, DEFAULT_CONFIG } from "@/lib/site-config";
import { clearAnalytics, computeFunnel, computeMetrics, computeVisitors, useAnalytics } from "@/lib/analytics";
import { buildTrackableLink, upsertContact, useContacts, type Contact } from "@/lib/contacts";

export const Route = createFileRoute("/admindev")({
  component: AdminDev,
  head: () => ({
    meta: [
      { title: "Admin — RoboVendas.IA" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type Tab = "dashboard" | "links" | "settings";

function AdminDev() {
  const [tab, setTab] = useState<Tab>("dashboard");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[oklch(0.65_0.27_300)] to-[oklch(0.7_0.22_240)] shadow-[var(--shadow-glow-purple)]">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Admin Dev</p>
              <p className="text-xs text-muted-foreground">RoboVendas.IA</p>
            </div>
          </div>
          <Link to="/" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
          <TabButton active={tab === "dashboard"} onClick={() => setTab("dashboard")} icon={BarChart3}>
            Dashboard
          </TabButton>
          <TabButton active={tab === "links"} onClick={() => setTab("links")} icon={MessageCircle}>
            Gerador de Link
          </TabButton>
          <TabButton active={tab === "settings"} onClick={() => setTab("settings")} icon={SettingsIcon}>
            Configurações
          </TabButton>
        </div>

        <div className="mt-8">
          {tab === "dashboard" && <Dashboard />}
          {tab === "links" && <LinksPanel />}
          {tab === "settings" && <SettingsPanel />}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold leading-tight transition-colors ${
        active
          ? "bg-white/10 text-foreground ring-1 ring-white/15"
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}

function Dashboard() {
  const events = useAnalytics();
  const metrics = useMemo(() => computeMetrics(events), [events]);

  const last24 = useMemo(() => {
    const since = Date.now() - 24 * 3600_000;
    return events.filter((e) => e.ts >= since);
  }, [events]);
  const last24Metrics = useMemo(() => computeMetrics(last24), [last24]);

  const recent = events.slice(-15).reverse();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard icon={Eye} label="Visualizações" value={metrics.pageviews} />
        <StatCard icon={MousePointerClick} label="Cliques no site" value={metrics.clicks} />
        <StatCard icon={ShoppingCart} label="Cliques Checkout" value={metrics.checkoutClicks} highlight />
        <StatCard icon={TrendingUp} label="CTR Geral" value={`${metrics.ctr.toFixed(1)}%`} />
        <StatCard icon={TrendingUp} label="CTR Checkout" value={`${metrics.checkoutCtr.toFixed(1)}%`} />
        <StatCard icon={Activity} label="CPM (R$)" value={metrics.cpm.toFixed(2)} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-foreground">Últimas 24h</p>
            <p className="text-xs text-muted-foreground">Atividade recente do site</p>
          </div>
          <button
            onClick={async () => {
              if (confirm("Limpar todos os dados de analytics?")) await clearAnalytics();
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs font-semibold leading-tight text-destructive transition-colors hover:bg-destructive/20"
          >
            <Trash2 className="h-3.5 w-3.5" /> Limpar dados
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <MiniStat label="Visitas (24h)" value={last24Metrics.pageviews} />
          <MiniStat label="Cliques (24h)" value={last24Metrics.clicks} />
          <MiniStat label="Checkouts (24h)" value={last24Metrics.checkoutClicks} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm font-bold text-foreground">Eventos recentes</p>
        <p className="mb-4 text-xs text-muted-foreground">15 últimos eventos rastreados</p>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sem eventos ainda. Navegue pelo site para gerar dados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-4">Quando</th>
                  <th className="py-2 pr-4">Tipo</th>
                  <th className="py-2 pr-4">Label</th>
                  <th className="py-2">Caminho</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="py-2 pr-4 text-muted-foreground">
                      {new Date(e.ts).toLocaleString("pt-BR")}
                    </td>
                    <td className="py-2 pr-4">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                          e.type === "checkout_click"
                            ? "bg-success/15 text-success"
                            : e.type === "click"
                            ? "bg-gold/15 text-gold"
                            : "bg-white/10 text-foreground/70"
                        }`}
                      >
                        {e.type}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-foreground/80">{e.label ?? "—"}</td>
                    <td className="py-2 text-muted-foreground">{e.path ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <VisitorsAndFunnel events={events} />
    </div>
  );
}

const STAGE_LABELS: Record<string, string> = {
  landed: "Chegou na página",
  video_playing: "Assistindo vídeo",
  answered_q1: "Respondeu P1",
  answered_q2: "Respondeu P2",
  answered_q3: "Respondeu P3",
  clicked_continue: "Clicou em Continuar",
  reached_offer: "Chegou na oferta",
  checkout_click: "Clicou no checkout",
};

function fmtDur(ms: number): string {
  if (!ms || ms < 1000) return "—";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h${m.toString().padStart(2, "0")}m`;
  if (m > 0) return `${m}m${sec.toString().padStart(2, "0")}s`;
  return `${sec}s`;
}

function VisitorsAndFunnel({ events }: { events: ReturnType<typeof useAnalytics> }) {
  const visitors = useMemo(() => computeVisitors(events), [events]);
  const funnel = useMemo(() => computeFunnel(visitors), [visitors]);
  const total = visitors.length || 1;
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return visitors;
    return visitors.filter((v) =>
      [v.name, v.phone, v.sessionId].some((f) => (f || "").toLowerCase().includes(s)),
    );
  }, [visitors, q]);

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-gold" />
          <p className="text-sm font-bold text-foreground">Funil de conversão (vídeo + quiz + oferta)</p>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">Quantos visitantes atingiram cada etapa.</p>
        <div className="space-y-2">
          {funnel.map((f) => {
            const pct = Math.round((f.count / total) * 100);
            return (
              <div key={f.stage} className="rounded-lg bg-background/40 p-3 ring-1 ring-white/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">{STAGE_LABELS[f.stage] ?? f.stage}</span>
                  <span className="text-muted-foreground">
                    <span className="font-bold text-foreground">{f.count}</span> · {pct}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: "var(--gradient-cta)" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-cta" />
          <p className="text-sm font-bold text-foreground">Visitantes — vídeo, quiz e jornada</p>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">
          Cada linha é uma sessão. Dados parciais aparecem mesmo quando o visitante não termina.
        </p>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nome, telefone ou sessão…"
              className="w-full rounded-lg border border-white/15 bg-background/60 py-2 pl-9 pr-3 text-xs text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-cta"
            />
          </div>
        </div>
        {visitors.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum visitante rastreado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-xs">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3">Nome</th>
                  <th className="py-2 pr-3">Telefone</th>
                  <th className="py-2 pr-3">Sessão</th>
                  <th className="py-2 pr-3">Entrada</th>
                  <th className="py-2 pr-3">Última atividade</th>
                  <th className="py-2 pr-3">Tempo total</th>
                  <th className="py-2 pr-3">Vídeo · Quiz · Oferta</th>
                  <th className="py-2 pr-3">Etapa</th>
                  <th className="py-2 pr-3">Vídeo</th>
                  <th className="py-2 pr-3">P1 · Negócio</th>
                  <th className="py-2 pr-3">P2 · Anúncios</th>
                  <th className="py-2 pr-3">P3 · Meta</th>
                  <th className="py-2 pr-3">Oferta</th>
                  <th className="py-2">Checkout</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 60).map((v) => (
                  <tr key={v.sessionId} className="border-t border-white/5 align-top">
                    <td className="py-2 pr-3 font-semibold text-foreground">
                      {v.name || <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="py-2 pr-3 text-foreground/80">
                      {v.phone || <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="py-2 pr-3 font-mono text-[11px] text-muted-foreground">
                      {v.sessionId.slice(0, 10)}…
                    </td>
                    <td className="py-2 pr-3 text-foreground/80">
                      {new Date(v.firstSeen).toLocaleString("pt-BR")}
                    </td>
                    <td className="py-2 pr-3 text-foreground/80">
                      {new Date(v.lastSeen).toLocaleString("pt-BR")}
                    </td>
                    <td className="py-2 pr-3 text-foreground/80">{fmtDur(v.totalMs)}</td>
                    <td className="py-2 pr-3 text-foreground/80">
                      {fmtDur(v.timeOnVideoMs)} · {fmtDur(v.timeOnQuizMs)} · {fmtDur(v.timeOnOfferMs)}
                    </td>
                    <td className="py-2 pr-3">
                      <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-foreground/80">
                        {STAGE_LABELS[v.stage] ?? v.stage}
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-foreground/80">
                      {v.videoWatchedSec > 0
                        ? `${v.videoWatchedSec}s${v.videoDurationSec ? ` de ${v.videoDurationSec}s` : ""}`
                        : "—"}
                    </td>
                    <td className="py-2 pr-3 text-foreground/80">{v.answers[0] ?? "—"}</td>
                    <td className="py-2 pr-3 text-foreground/80">{v.answers[1] ?? "—"}</td>
                    <td className="py-2 pr-3 text-foreground/80">{v.answers[2] ?? "—"}</td>
                    <td className="py-2 pr-3">
                      {v.reachedOffer ? (
                        <span className="text-success">✓ {new Date(v.reachedOffer).toLocaleTimeString("pt-BR")}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-2">
                      {v.checkoutClick ? (
                        <span className="text-success">✓ {new Date(v.checkoutClick).toLocaleTimeString("pt-BR")}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: any;
  label: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-success/40 bg-success/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className={`mt-3 text-3xl font-extrabold ${highlight ? "text-success" : "text-gradient"}`}>
        {value}
      </p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl bg-background/40 p-3 ring-1 ring-white/5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-foreground">{value}</p>
    </div>
  );
}

function SettingsPanel() {
  const current = useSiteConfig();
  const [pixelId, setPixelId] = useState(current.pixelId);
  const [checkoutUrl, setCheckoutUrl] = useState(current.checkoutUrl);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setPixelId(current.pixelId); }, [current.pixelId]);
  useEffect(() => { setCheckoutUrl(current.checkoutUrl); }, [current.checkoutUrl]);

  return SettingsPanelInner({ current, pixelId, setPixelId, checkoutUrl, setCheckoutUrl, saved, setSaved });
}

function LinksPanel() {
  const contacts = useContacts();
  const events = useAnalytics();
  const visitors = useMemo(() => computeVisitors(events), [events]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [generated, setGenerated] = useState<Contact | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const statusByCode = useMemo(() => {
    const map = new Map<string, string>();
    for (const v of visitors) {
      if (!v.code) continue;
      const prev = map.get(v.code);
      if (!prev || rank(v.stage) > rank(prev)) map.set(v.code, v.stage);
    }
    return map;
  }, [visitors]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return contacts;
    return contacts.filter((c) =>
      [c.name, c.phone, c.code].some((f) => (f || "").toLowerCase().includes(s)),
    );
  }, [contacts, q]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const c = await upsertContact(name, phone);
    setGenerated(c);
    setName("");
    setPhone("");
  };

  const copy = async (link: string, code: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode((c) => (c === code ? null : c)), 2000);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-cta" />
          <h3 className="text-base font-bold text-foreground">Gerador de Link Individual</h3>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Crie um link único por pessoa para enviar via WhatsApp. Cada acesso será rastreado com nome e telefone.
        </p>
        <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Primeiro nome"
            required
            className="rounded-lg border border-white/15 bg-background/60 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-cta"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefone/WhatsApp (ex: 11999998888)"
            required
            className="rounded-lg border border-white/15 bg-background/60 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-cta"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold leading-tight text-cta-foreground shadow-[var(--shadow-cta)] transition-transform hover:scale-[1.02]"
            style={{ background: "var(--gradient-cta)" }}
          >
            <LinkIcon className="h-4 w-4" /> Gerar link
          </button>
        </form>

        {generated && (
          <div className="mt-5 rounded-xl border border-success/40 bg-success/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-success">
              Link gerado para {generated.name}
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
              <code className="flex-1 truncate rounded-lg bg-background/60 px-3 py-2 text-xs text-foreground ring-1 ring-white/10">
                {buildTrackableLink(origin, generated)}
              </code>
              <button
                onClick={() => copy(buildTrackableLink(origin, generated), generated.code)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-white/20"
              >
                {copiedCode === generated.code ? (
                  <><CheckIcon className="h-3.5 w-3.5" /> Copiado</>
                ) : (
                  <><Copy className="h-3.5 w-3.5" /> Copiar link</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-gold" />
          <p className="text-sm font-bold text-foreground">Links já gerados</p>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">
          Status atualiza automaticamente conforme a pessoa avança no site.
        </p>
        <div className="mb-3 relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome ou telefone…"
            className="w-full rounded-lg border border-white/15 bg-background/60 py-2 pl-9 pr-3 text-xs text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-cta"
          />
        </div>
        {contacts.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum link gerado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-xs">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3">Nome</th>
                  <th className="py-2 pr-3">Telefone</th>
                  <th className="py-2 pr-3">Link</th>
                  <th className="py-2 pr-3">Criado</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const link = buildTrackableLink(origin, c);
                  const status = statusByCode.get(c.code) ?? "not_accessed";
                  return (
                    <tr key={c.code} className="border-t border-white/5 align-top">
                      <td className="py-2 pr-3 font-semibold text-foreground">{c.name}</td>
                      <td className="py-2 pr-3 text-foreground/80">{c.phone}</td>
                      <td className="py-2 pr-3">
                        <code className="block max-w-[280px] truncate rounded bg-background/60 px-2 py-1 text-[11px] text-foreground/80 ring-1 ring-white/10">
                          {link}
                        </code>
                      </td>
                      <td className="py-2 pr-3 text-muted-foreground">
                        {new Date(c.createdAt).toLocaleString("pt-BR")}
                      </td>
                      <td className="py-2 pr-3">
                        <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-foreground/80">
                          {status === "not_accessed" ? "não acessado" : (STAGE_LABELS[status] ?? status)}
                        </span>
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => copy(link, c.code)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] font-bold text-foreground transition-colors hover:bg-white/20"
                        >
                          {copiedCode === c.code ? (
                            <><CheckIcon className="h-3 w-3" /> Copiado</>
                          ) : (
                            <><Copy className="h-3 w-3" /> Copiar</>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const STAGE_RANK = ["landed","video_playing","answered_q1","answered_q2","answered_q3","clicked_continue","reached_offer","checkout_click"];
function rank(s: string) { return STAGE_RANK.indexOf(s); }

function SettingsPanelInner({
  current, pixelId, setPixelId, checkoutUrl, setCheckoutUrl, saved, setSaved,
}: any) {

  const save = async () => {
    await saveConfig({
      pixelId: pixelId.trim(),
      checkoutUrl: checkoutUrl.trim() || DEFAULT_CONFIG.checkoutUrl,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-gradient" style={{ color: "oklch(0.65 0.27 300)" }} />
          <h3 className="text-base font-bold text-foreground">Rastreamento do Pixel</h3>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Cole o ID do seu pixel (Meta/Facebook). Eventos de PageView, Cliques e InitiateCheckout serão disparados automaticamente.
        </p>
        <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          ID do Pixel
        </label>
        <input
          type="text"
          value={pixelId}
          onChange={(e) => setPixelId(e.target.value)}
          placeholder="ex: 1234567890123456"
          className="mt-2 w-full rounded-lg border border-white/15 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[oklch(0.65_0.27_300)]"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {pixelId ? "✓ Pixel ativo no site público" : "Nenhum pixel configurado"}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-cta" />
          <h3 className="text-base font-bold text-foreground">Link de Compra (Checkout)</h3>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Este link é usado em todos os botões "Quero comprar / Começar agora" do site.
        </p>
        <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          URL do Checkout
        </label>
        <input
          type="url"
          value={checkoutUrl}
          onChange={(e) => setCheckoutUrl(e.target.value)}
          placeholder="https://pay.kiwify.com.br/..."
          className="mt-2 w-full rounded-lg border border-white/15 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cta"
        />
        <p className="mt-2 truncate text-xs text-muted-foreground">
          Atual: <span className="text-foreground/80">{current.checkoutUrl}</span>
        </p>
      </div>

      <div className="lg:col-span-2">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={save}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold leading-tight text-cta-foreground shadow-[var(--shadow-cta)] transition-transform hover:scale-[1.02]"
            style={{ background: "var(--gradient-cta)" }}
          >
            <Save className="h-4 w-4" /> Salvar configurações
          </button>
          {saved && (
            <span className="inline-flex items-center gap-2 rounded-lg border border-success/40 bg-success/10 px-3 py-2 text-xs font-semibold text-success">
              ✓ Configurações salvas com sucesso
            </span>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          As alterações são aplicadas imediatamente no site público.
        </p>
      </div>
    </div>
  );
}
