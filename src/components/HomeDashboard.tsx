"use client";

import { useProgress } from "@/hooks/useProgress";
import { PushButton } from "@/components/ui/PushButton";
import { NavigatorsImage } from "@/components/CharacterAvatar";
import { CharacterLine } from "@/components/CharacterLine";

function DashboardCard({
  title,
  value,
  sub,
  color,
}: {
  title: string;
  value: string;
  sub: string;
  color: "streak" | "primary" | "xp";
}) {
  const bg =
    color === "streak"
      ? "bg-pastel-rose/40 border-pastel-orange"
      : color === "xp"
        ? "bg-pastel-blue/20 border-pastel-blue"
        : "bg-pastel-mint border-pastel-primary";

  return (
    <div className={`rounded-xl border-2 p-4 ${bg}`}>
      <p className="text-xs font-medium text-pastel-ink/70 uppercase tracking-wide">{title}</p>
      <p className="text-lg font-bold text-pastel-ink mt-1">{value}</p>
      <p className="text-xs text-pastel-ink/80 mt-0.5">{sub}</p>
    </div>
  );
}

export function HomeDashboard() {
  const { progress, level, xpInLevel, xpNeededForNext } = useProgress();

  return (
    <div className="space-y-8">
      <section>
        <NavigatorsImage className="mb-4" />
        <CharacterLine
          characterId="skurun"
          lineKey="homeGreeting"
          size="sm"
          className="mb-4"
        />
        <h2 className="text-xl font-bold text-pastel-ink mb-4">今日の学習</h2>
        <div className="grid gap-3">
          <DashboardCard
            title="ストリーク"
            value={`${progress.streakDays} 日`}
            sub="連続学習日数"
            color="streak"
          />
          <DashboardCard
            title="デイリーミッション"
            value={`${progress.dailyAnswered} / ${progress.dailyGoal} 問`}
            sub="今日の目標"
            color="primary"
          />
          <DashboardCard
            title="レベル・XP"
            value={`Lv.${level} (${progress.totalXP} XP)`}
            sub={`あと ${xpNeededForNext} XP でレベルアップ`}
            color="xp"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-pastel-ink mb-4">クイックアクション</h2>
        <div className="flex flex-col gap-2">
          <PushButton href="/roadmap" className="w-full py-4">
            レッスンを始める（ロードマップ）
          </PushButton>
          <p className="text-sm text-pastel-ink/70 text-center">
            復習タイミングに応じた問題もここに表示されます
          </p>
        </div>
      </section>

      <section className="text-sm text-pastel-ink/80">
        <p>
          このアプリでは、ストリーク・デイリーミッション・レベル/XP・ロードマップ・間隔反復の5つで継続しやすい学習をサポートします。
        </p>
      </section>
    </div>
  );
}
