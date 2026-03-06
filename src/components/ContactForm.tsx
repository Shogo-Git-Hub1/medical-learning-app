"use client";

import { useState, useEffect } from "react";
import { PushButton } from "@/components/ui/PushButton";

const INQUIRY_TYPE = "inquiry" as const;
const REPORT_TYPE = "report" as const;
const REPORT_REASON_WRONG = "wrong";
const REPORT_REASON_TYPO = "typo";
const REPORT_REASON_OTHER = "other";

type FormType = typeof INQUIRY_TYPE | typeof REPORT_TYPE;

/** メール送信用の本文を組み立て（mailto 用） */
function buildMailBody(params: {
  name: string;
  email: string;
  formType: FormType;
  reportReason?: string;
  reportLessonId?: string;
  reportLessonTitle?: string;
  reportQuestionId?: string;
  reportQuestionText?: string;
  body: string;
}): string {
  const lines: string[] = [
    `お名前: ${params.name}`,
    `メールアドレス: ${params.email}`,
    "",
    "---",
    "",
  ];
  if (params.formType === REPORT_TYPE) {
    lines.push("【問題報告】");
    if (params.reportReason === REPORT_REASON_WRONG) lines.push("報告内容: 問題が誤っている");
    else if (params.reportReason === REPORT_REASON_TYPO) lines.push("報告内容: 誤字脱字がある");
    else if (params.reportReason === REPORT_REASON_OTHER) lines.push("報告内容: その他");
    if (params.reportLessonId) lines.push(`レッスンID: ${params.reportLessonId}`);
    if (params.reportLessonTitle) lines.push(`レッスン名: ${params.reportLessonTitle}`);
    if (params.reportQuestionId) lines.push(`問題ID: ${params.reportQuestionId}`);
    if (params.reportQuestionText) lines.push(`問題文: ${params.reportQuestionText}`);
    lines.push("", "---", "", "詳細:", params.body);
  } else {
    lines.push(params.body);
  }
  return lines.join("\n");
}

/** クエリから初期値を取得（問題報告リンクから遷移した場合） */
function useContactSearchParams() {
  const [params, setParams] = useState<{
    report?: string;
    lessonId?: string;
    lessonTitle?: string;
    questionId?: string;
    questionText?: string;
  }>({});
  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search);
    setParams({
      report: q.get("report") ?? undefined,
      lessonId: q.get("lessonId") ?? undefined,
      lessonTitle: q.get("lessonTitle") ?? undefined,
      questionId: q.get("questionId") ?? undefined,
      questionText: q.get("questionText") ?? undefined,
    });
  }, []);
  return params;
}

// 送信先: 必要に応じて変更するか、環境変数（NEXT_PUBLIC_CONTACT_EMAIL）で差し替え可能
const MAIL_TO = typeof process.env.NEXT_PUBLIC_CONTACT_EMAIL === "string"
  ? process.env.NEXT_PUBLIC_CONTACT_EMAIL
  : "contact@example.com";

export function ContactForm() {
  const searchParams = useContactSearchParams();
  const isReportFromQuery = searchParams.report === "1";

  const [formType, setFormType] = useState<FormType>(
    isReportFromQuery ? REPORT_TYPE : INQUIRY_TYPE
  );
  const [reportReason, setReportReason] = useState(REPORT_REASON_OTHER);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [reportLessonId, setReportLessonId] = useState("");
  const [reportLessonTitle, setReportLessonTitle] = useState("");
  const [reportQuestionId, setReportQuestionId] = useState("");
  const [reportQuestionText, setReportQuestionText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (searchParams.report === "1") setFormType(REPORT_TYPE);
    if (searchParams.lessonId) setReportLessonId(searchParams.lessonId);
    if (searchParams.lessonTitle) setReportLessonTitle(decodeURIComponent(searchParams.lessonTitle));
    if (searchParams.questionId) setReportQuestionId(searchParams.questionId);
    if (searchParams.questionText) setReportQuestionText(decodeURIComponent(searchParams.questionText ?? ""));
  }, [searchParams.report, searchParams.lessonId, searchParams.lessonTitle, searchParams.questionId, searchParams.questionText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject =
      formType === REPORT_TYPE
        ? `[問題報告] ${reportReason === REPORT_REASON_WRONG ? "内容の誤り" : reportReason === REPORT_REASON_TYPO ? "誤字脱字" : "その他"}`
        : "[お問い合わせ] 医療学習アプリ";
    const mailBody = buildMailBody({
      name,
      email,
      formType,
      reportReason: formType === REPORT_TYPE ? reportReason : undefined,
      reportLessonId: formType === REPORT_TYPE ? reportLessonId || undefined : undefined,
      reportLessonTitle: formType === REPORT_TYPE ? reportLessonTitle || undefined : undefined,
      reportQuestionId: formType === REPORT_TYPE ? reportQuestionId || undefined : undefined,
      reportQuestionText: formType === REPORT_TYPE ? reportQuestionText || undefined : undefined,
      body,
    });
    const mailto = `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border-2 border-pastel-primary bg-pastel-mint p-6">
        <p className="font-semibold text-pastel-ink">送信手順を開始しました</p>
        <p className="mt-2 text-sm text-pastel-ink/80">
          お使いのメールソフトが開きます。内容をご確認のうえ送信してください。メールが開かない場合は、お手数ですが送信先に直接ご連絡ください。
        </p>
        <PushButton href="/" variant="outline" className="mt-4">
          ← ホームに戻る
        </PushButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">種別</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="formType"
              checked={formType === INQUIRY_TYPE}
              onChange={() => setFormType(INQUIRY_TYPE)}
            />
            <span>お問い合わせ</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="formType"
              checked={formType === REPORT_TYPE}
              onChange={() => setFormType(REPORT_TYPE)}
            />
            <span>問題の報告</span>
          </label>
        </div>
      </div>

      {formType === REPORT_TYPE && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">報告の種類</label>
          <select
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
          >
            <option value={REPORT_REASON_WRONG}>問題が誤っている（正答・解説など）</option>
            <option value={REPORT_REASON_TYPO}>誤字脱字がある</option>
            <option value={REPORT_REASON_OTHER}>その他</option>
          </select>
          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="レッスン名（任意）"
              value={reportLessonTitle}
              onChange={(e) => setReportLessonTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 placeholder:text-slate-400"
            />
            <input
              type="text"
              placeholder="問題ID（任意）"
              value={reportQuestionId}
              onChange={(e) => setReportQuestionId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 placeholder:text-slate-400"
            />
            <textarea
              placeholder="問題文（任意・該当する問題の文章をコピーしてください）"
              value={reportQuestionText}
              onChange={(e) => setReportQuestionText(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">お名前</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {formType === REPORT_TYPE ? "詳細（どの部分が誤っているか等）" : "お問い合わせ内容"}
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          className="w-full rounded-xl border-2 border-pastel-border bg-pastel-card px-3 py-2 text-pastel-ink"
          required
          placeholder={formType === REPORT_TYPE ? "例：正解が〇〇だと思われます。根拠は…" : ""}
        />
      </div>

      <div className="flex gap-3">
        <PushButton type="submit">メールで送信</PushButton>
        <PushButton href="/" variant="outline">キャンセル</PushButton>
      </div>

      <p className="text-xs text-pastel-ink/60">
        「メールで送信」を押すと、お使いのメールソフトが開きます。送信先: {MAIL_TO}
      </p>
    </form>
  );
}
