"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { NavigatorsImage } from "@/components/CharacterAvatar";
import { CharacterLine } from "@/components/CharacterLine";

type StatCardProps = {
  title: string;
  value: string;
  sub: string;
  accentColor: string;
  delay?: string;
};

function StatCard({ title, value, sub, accentColor, delay = "0ms" }: StatCardProps) {
  return (
    <div
      className="neu-card rounded-2xl p-5 relative overflow-hidden animate-fade-in-up"
      style={{ animationDelay: delay, animationFillMode: "both" }}
    >
      {/* 上部アクセントライン */}
      <div
        className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full opacity-70"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        aria-hidden
      />
      <p className="text-[10px] font-bold text-pastel-ink/45 uppercase tracking-widest font-mono">{title}</p>
      <p className="text-2xl font-bold text-pastel-ink mt-2 font-nunito">{value}</p>
      <p className="text-xs text-pastel-ink/55 mt-1">{sub}</p>
    </div>
  );
}

export function HomeDashboard() {
  const { progress, level, xpNeededForNext } = useProgress();

  return (
    <div className="space-y-8">
      <section className="animate-fade-in-up" style={{ animationFillMode: "both" }}>
        <NavigatorsImage className="mb-4" />
        <CharacterLine
          characterId="skurun"
          lineKey="homeGreeting"
          size="sm"
          className="mb-4"
        />
        <h2 className="text-sm font-bold text-pastel-ink/60 mb-4 font-mono tracking-widest uppercase">
          <span className="text-pastel-primary">▶</span> 今日の学習
        </h2>
        <div className="grid gap-3">
          <StatCard
            title="ストリーク"
            value={`${progress.streakDays} 日`}
            sub="連続学習日数"
            accentColor="#FFC800"
            delay="60ms"
          />
          <StatCard
            title="デイリーミッション"
            value={`${progress.dailyAnswered} / ${progress.dailyGoal} 問`}
            sub="今日の目標"
            accentColor="#58CC02"
            delay="120ms"
          />
          <StatCard
            title="レベル・XP"
            value={`Lv.${level}  (${progress.totalXP} XP)`}
            sub={`あと ${xpNeededForNext} XP でレベルアップ`}
            accentColor="#BBF2FF"
            delay="180ms"
          />
        </div>
      </section>

      {/* ─── 近未来CTAボタン ─────────────────────────────── */}
      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "240ms", animationFillMode: "both" }}
      >
        <Link
          href="/subjects"
          className="group relative block overflow-hidden rounded-2xl transition-transform duration-200 active:scale-[0.97]"
          style={{
            background: "linear-gradient(135deg, #0d1a0d 0%, #0f2010 60%, #0a160a 100%)",
            boxShadow: "0 0 0 1px rgba(88,204,2,0.35), 0 0 24px rgba(88,204,2,0.18), 8px 8px 18px rgba(30,50,30,0.55), -4px -4px 12px rgba(255,255,255,0.04)",
          }}
        >
          {/* スキャンラインオーバーレイ */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
            }}
            aria-hidden
          />

          {/* ホバー時グロー拡散 */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(88,204,2,0.12) 0%, transparent 70%)" }}
            aria-hidden
          />

          {/* 上部グローライン */}
          <div
            className="absolute top-0 left-8 right-8 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(88,204,2,0.8), transparent)", boxShadow: "0 0 8px rgba(88,204,2,0.6)" }}
            aria-hidden
          />

          {/* 四隅コーナーアクセント */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#58cc02]/60" aria-hidden />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#58cc02]/60" aria-hidden />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#58cc02]/60" aria-hidden />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#58cc02]/60" aria-hidden />

          {/* コンテンツ */}
          <div className="relative px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-mono text-[#58cc02]/55 tracking-[0.25em] uppercase mb-1">
                // QUICK START
              </p>
              <p className="text-base font-bold text-white/90 font-nunito tracking-wide group-hover:text-white transition-colors">
                科目を選んで学習を始める
              </p>
            </div>

            {/* 右側アロー */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
              style={{
                background: "rgba(88,204,2,0.15)",
                border: "1px solid rgba(88,204,2,0.4)",
                boxShadow: "0 0 12px rgba(88,204,2,0.25)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#58cc02" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* 下部ステータスバー */}
          <div
            className="h-0.5 w-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(88,204,2,0.4) 30%, rgba(88,204,2,0.7) 50%, rgba(88,204,2,0.4) 70%, transparent)" }}
            aria-hidden
          />
        </Link>
      </section>

      <section
        className="neu-inset rounded-2xl p-4 animate-fade-in-up"
        style={{ animationDelay: "300ms", animationFillMode: "both" }}
      >
        <p className="font-mono text-xs text-pastel-primary/70 mb-1">// INFO</p>
        <p className="text-sm text-pastel-ink/60">
          ストリーク・デイリーミッション・レベル/XP・ロードマップ・間隔反復の5つで継続しやすい学習をサポートします。
        </p>
      </section>
    </div>
  );
}
