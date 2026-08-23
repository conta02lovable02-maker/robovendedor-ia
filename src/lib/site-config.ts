import { useEffect, useState } from "react";

export type SiteConfig = {
  checkoutUrl: string;
  pixelId: string;
};

export const DEFAULT_CONFIG: SiteConfig = {
  checkoutUrl: "https://robo-promoter.lovable.app",
  pixelId: "",
};

// v2: invalida links antigos salvos no navegador (ex.: checkout Kiwify)
const KEY = "rv_site_config_v2";
const EVENT = "rv-config-changed";

export function getConfig(): SiteConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(cfg: SiteConfig) {
  localStorage.setItem(KEY, JSON.stringify(cfg));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useSiteConfig(): SiteConfig {
  const [cfg, setCfg] = useState<SiteConfig>(DEFAULT_CONFIG);
  useEffect(() => {
    setCfg(getConfig());
    const handler = () => setCfg(getConfig());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return cfg;
}
