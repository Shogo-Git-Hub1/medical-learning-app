"use client";

import { useProgress } from "@/hooks/useProgress";
import { PushButton } from "@/components/ui/PushButton";
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

      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "240ms", animationFillMode: "both" }}
      >
        <h2 className="text-sm font-bold text-pastel-ink/60 mb-4 font-mono tracking-widest uppercase">
          <span className="text-pastel-primary">▶</span> クイックアクション
        </h2>
        <div className="flex flex-col gap-3">
          <PushButton href="/subjects" className="w-full py-4">
            科目を選んで学習を始める
          </PushButton>
          <PushButton href="/roadmap" variant="secondary" className="w-full py-3">
            ロードマップで学ぶ
          </PushButton>
        </div>
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
