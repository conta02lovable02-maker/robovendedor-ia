import { useEffect, useState } from "react";

export type SiteConfig = {
  checkoutUrl: string;
  pixelId: string;
};

export const DEFAULT_CONFIG: SiteConfig = {
  checkoutUrl: "https://pay.kiwify.com.br/ECJMIKj",
  pixelId: "",
};

const KEY = "rv_site_config_v1";
const EVENT = "rv-config-changed";

export funcimport { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteConfig = {
  pixelId: string;
  checkoutUrl: string;
};

export const DEFAULT_CONFIG: SiteConfig = {
  pixelId: "",
  checkoutUrl: "https://pay.kiwify.com.br/ECJMIKj",
};

let cache: SiteConfig = DEFAULT_CONFIG;
const listeners = new Set<(c: SiteConfig) => void>();

function notify(c: SiteConfig) {
  cache = c;
  listeners.forEach((l) => l(c));
}

function mapRow(r: any): SiteConfig {
  return {
    pixelId: r.pixel_id || "",
    checkoutUrl: r.checkout_url || DEFAULT_CONFIG.checkoutUrl,
  };
}

export async function fetchConfig(): Promise<SiteConfig> {
  const { data, error } = await supabase
    .from("site_config")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return cache;
  const cfg = mapRow(data);
  notify(cfg);
  return cfg;
}

export function getConfig(): SiteConfig {
  return cache;
}

export async function saveConfig(partial: Partial<SiteConfig>) {
  const next = { ...cache, ...partial };
  const { error } = await supabase
    .from("site_config")
    .update({
      pixel_id: next.pixelId,
      checkout_url: next.checkoutUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  if (error) console.error("[site-config] erro ao salvar:", error);
  notify(next);
}

const POLL_MS = 5000;

export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(cache);

  useEffect(() => {
    const listener = (c: SiteConfig) => setConfig(c);
    listeners.add(listener);
    fetchConfig();
    const interval = setInterval(fetchConfig, POLL_MS);
    return () => {
      listeners.delete(listener);
      clearInterval(interval);
    };
  }, []);

  return config;
}tion getConfig(): SiteConfig {
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
