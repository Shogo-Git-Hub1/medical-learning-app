import { PushButton } from "@/components/ui/PushButton";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-pastel-border mb-2">404</h1>
      <p className="text-pastel-ink/80 mb-6">お探しのページが見つかりませんでした。</p>
      <PushButton href="/">ホームに戻る</PushButton>
    </div>
  );
}
