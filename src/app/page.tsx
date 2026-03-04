import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">今日の学習</h2>
        <div className="grid gap-3">
          <DashboardCard
            title="ストリーク"
            value="0 日"
            sub="連続学習日数"
            color="streak"
          />
          <DashboardCard
            title="デイリーミッション"
            value="0 / 5 問"
            sub="今日の目標"
            color="primary"
          />
          <DashboardCard
            title="レベル・XP"
            value="Lv.1 (0 XP)"
            sub="次のレベルまで"
            color="xp"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">クイックアクション</h2>
        <div className="flex flex-col gap-2">
          <Link
            href="/roadmap"
            className="block rounded-xl bg-primary text-white font-semibold py-4 px-5 text-center shadow-md hover:bg-primary-dark transition"
          >
            レッスンを始める（ロードマップ）
          </Link>
          <p className="text-sm text-slate-500 text-center">
            復習タイミングに応じた問題もここに表示されます
          </p>
        </div>
      </section>

      <section className="text-sm text-slate-600">
        <p>
          このアプリでは、ストリーク・デイリーミッション・レベル/XP・ロードマップ・間隔反復の5つで継続しやすい学習をサポートします。
        </p>
      </section>
    </div>
  );
}

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
      ? "bg-amber-50 border-amber-200"
      : color === "xp"
        ? "bg-sky-50 border-sky-200"
        : "bg-green-50 border-green-200";

  return (
    <div className={`rounded-xl border-2 p-4 ${bg}`}>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</p>
      <p className="text-lg font-bold text-slate-800 mt-1">{value}</p>
      <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
    </div>
  );
}
