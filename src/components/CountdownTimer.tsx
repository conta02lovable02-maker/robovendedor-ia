import { useEffect, useState } from "react";
import { Clock, Users } from "lucide-react";

const TOTAL_VAGAS = 10;

function getTimeState() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  const dayLengthMs = endOfDay.getTime() - startOfDay.getTime();
  const elapsedMs = now.getTime() - startOfDay.getTime();
  const remainingMs = endOfDay.getTime() - now.getTime();
  const fractionElapsed = elapsedMs / dayLengthMs;
  const vagas = Math.max(1, Math.ceil(TOTAL_VAGAS * (1 - fractionElapsed)));
  return { remainingMs, vagas };
}

export function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<{ remainingMs: number; vagas: number }>({
    remainingMs: 0,
    vagas: TOTAL_VAGAS,
  });

  useEffect(() => {
    setState(getTimeState());
    setMounted(true);
    const id = setInterval(() => setState(getTimeState()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = mounted ? state.remainingMs : 0;
  const h = Math.floor(diff / 3600_000);
  const m = Math.floor((diff % 3600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const cells = [
    { v: pad(h), l: "horas" },
    { v: pad(m), l: "min" },
    { v: pad(s), l: "seg" },
  ];

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-center">
        <Users className="h-5 w-5 flex-shrink-0 text-gold" />
        <span className="text-sm font-bold text-foreground">
          Hoje temos disponível{" "}
          <span className="text-gradient">{mounted ? state.vagas : TOTAL_VAGAS} vagas</span> para
          utilizar o robô
        </span>
      </div>
      <div className="flex items-center justify-center gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3">
        <Clock className="h-5 w-5 flex-shrink-0 animate-pulse text-destructive" />
        <span className="text-xs font-bold uppercase tracking-wider text-destructive">
          Vagas de hoje encerram em
        </span>
        <div className="flex items-center gap-1.5">
          {cells.map((c, i) => (
            <div key={c.l} className="flex items-center gap-1.5">
              <div className="rounded-md bg-background/60 px-2 py-1 text-center ring-1 ring-white/10">
                <span className="font-mono text-base font-extrabold text-foreground tabular-nums md:text-lg">
                  {c.v}
                </span>
                <span className="ml-1 text-[9px] font-semibold uppercase text-muted-foreground">
                  {c.l}
                </span>
              </div>
              {i < cells.length - 1 && <span className="font-bold text-destructive">:</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
