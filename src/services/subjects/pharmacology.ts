import type { Question, Lesson } from "@/types";

/** 薬理学 — 4レッスン・全32問 */
export const pharmacologyQuestions: Question[] = [

  // ── Lesson 1: 薬物動態総論 ───────────────────────────────────────────────
  {
    id: "q-pm-1-1",
    lessonId: "pharmacology-1",
    text: "経口投与した薬物の生物学的利用能（バイオアベイラビリティ）を低下させる主な要因はどれか。",
    options: [
      { id: "a", text: "腎クリアランスの増加" },
      { id: "b", text: "初回通過効果（消化管・肝臓での代謝）" },
      { id: "c", text: "分布容積の増加" },
      { id: "d", text: "血漿タンパク結合率の増加" },
    ],
    correctOptionId: "b",
    explanation:
      "経口投与後、消化管壁や肝臓で代謝される「初回通過効果（first-pass effect）」により、全身循環に到達する薬物量が減少し、生物学的利用能が低下する。ニトログリセリンは初回通過効果が大きいため舌下投与が選ばれる。",
    subject: "薬理学",
    order: 1,
  },
  {
    id: "q-pm-1-2",
    lessonId: "pharmacology-1",
    text: "薬物の半減期（t½）について正しいのはどれか。",
    options: [
      { id: "a", text: "t½が短いほど作用持続時間が長い" },
      { id: "b", text: "定常状態（steady state）に達するまでに約4〜5半減期を要する" },
      { id: "c", text: "半減期は投与量が増えると延長する（一次速度論では依存しない）" },
      { id: "d", text: "腎機能低下では半減期は変化しない" },
    ],
    correctOptionId: "b",
    explanation:
      "一次速度論（first-order kinetics）では薬物濃度が一定割合で減衰し、定常状態到達に4〜5半減期を要する。腎排泄型薬物では腎機能低下で半減期が延長→蓄積リスクが増す。",
    subject: "薬理学",
    order: 2,
  },
  {
    id: "q-pm-1-3",
    lessonId: "pharmacology-1",
    text: "受容体に結合して内因性作動薬と同様の反応を引き起こす薬物はどれか。",
    options: [
      { id: "a", text: "競合的拮抗薬（competitive antagonist）" },
      { id: "b", text: "作動薬（アゴニスト）" },
      { id: "c", text: "非競合的拮抗薬（non-competitive antagonist）" },
      { id: "d", text: "逆作動薬（inverse agonist）" },
    ],
    correctOptionId: "b",
    explanation:
      "アゴニストは受容体に結合して内因性リガンドと同様の生理的反応を起こす（内因活性=1）。部分アゴニストは内因活性が0〜1。アンタゴニストは結合するが内因活性=0。逆作動薬は反対の反応を起こす。",
    subject: "薬理学",
    order: 3,
  },
  {
    id: "q-pm-1-4",
    lessonId: "pharmacology-1",
    text: "薬物代謝の第I相反応（官能基反応）として代表的なのはどれか。",
    options: [
      { id: "a", text: "グルクロン酸抱合" },
      { id: "b", text: "アセチル化" },
      { id: "c", text: "シトクロムP450（CYP）による酸化" },
      { id: "d", text: "硫酸抱合" },
    ],
    correctOptionId: "c",
    explanation:
      "第I相反応（官能基反応）：CYP酸化・加水分解・還元など。薬物に官能基を導入し極性を高める。第II相反応（抱合反応）：グルクロン酸・硫酸・アセチル抱合など→水溶性増大→排泄促進。",
    subject: "薬理学",
    order: 4,
  },
  {
    id: "q-pm-1-5",
    lessonId: "pharmacology-1",
    text: "腎機能低下時に最も蓄積・毒性リスクが高い薬物はどれか。",
    options: [
      { id: "a", text: "ジアゼパム（肝代謝）" },
      { id: "b", text: "プロプラノロール（肝代謝）" },
      { id: "c", text: "ゲンタマイシン（アミノグリコシド：腎排泄）" },
      { id: "d", text: "リドカイン（肝代謝）" },
    ],
    correctOptionId: "c",
    explanation:
      "アミノグリコシド系抗菌薬（ゲンタマイシン・アミカシンなど）は腎排泄型で、腎機能低下で蓄積→腎毒性・耳毒性のリスクが増大。TDM（治療薬物モニタリング）が必要。",
    subject: "薬理学",
    order: 5,
  },
  {
    id: "q-pm-1-6",
    lessonId: "pharmacology-1",
    text: "グレープフルーツジュースの薬物相互作用として正しいのはどれか。",
    options: [
      { id: "a", text: "CYP3A4を誘導し、薬物の代謝を促進して血中濃度を低下させる" },
      { id: "b", text: "CYP3A4を阻害し、薬物の代謝を抑制して血中濃度を上昇させる" },
      { id: "c", text: "腎尿細管分泌を阻害し、薬物の排泄を遅延させる" },
      { id: "d", text: "P糖タンパク質を誘導し、薬物の腸管吸収を低下させる" },
    ],
    correctOptionId: "b",
    explanation:
      "グレープフルーツに含まれるフラノクマリン類がCYP3A4を阻害→カルシウム拮抗薬（フェロジピン等）・シクロスポリン・スタチン類の血中濃度が上昇→副作用増大。",
    subject: "薬理学",
    order: 6,
  },
  {
    id: "q-pm-1-7",
    lessonId: "pharmacology-1",
    text: "治療指数（TI = LD₅₀/ED₅₀）が高い薬物の特徴として正しいのはどれか。",
    options: [
      { id: "a", text: "治療濃度と毒性濃度が近く、管理が難しい" },
      { id: "b", text: "安全域が広く、治療量と中毒量の開きが大きい" },
      { id: "c", text: "副作用が多い" },
      { id: "d", text: "TDMが必ず必要である" },
    ],
    correctOptionId: "b",
    explanation:
      "治療指数（TI）= LD₅₀（50%致死量）/ ED₅₀（50%有効量）。TI大→安全域広い（例：ペニシリン）。TI小→TDMが必要（例：ジゴキシン・リチウム・バンコマイシン・アミノグリコシド）。",
    subject: "薬理学",
    order: 7,
  },
  {
    id: "q-pm-1-8",
    lessonId: "pharmacology-1",
    text: "アセチルコリンエステラーゼ（AChE）阻害薬の作用として正しいのはどれか。",
    options: [
      { id: "a", text: "シナプス間隙のAChを分解促進し、コリン作動性作用を減弱させる" },
      { id: "b", text: "AChの分解を阻害してACh濃度を増加させ、コリン作動性作用を増強する" },
      { id: "c", text: "ムスカリン受容体を直接刺激する" },
      { id: "d", text: "ニコチン受容体を選択的に遮断する" },
    ],
    correctOptionId: "b",
    explanation:
      "AChE阻害薬（ネオスチグミン・ドネペジルなど）はACh分解を抑制→シナプスACh↑→ムスカリン・ニコチン受容体作用増強。重症筋無力症・アルツハイマー病に使用。有機リン中毒の解毒にはPAM。",
    subject: "薬理学",
    order: 8,
  },

  // ── Lesson 2: 自律神経薬・中枢神経薬 ────────────────────────────────────
  {
    id: "q-pm-2-1",
    lessonId: "pharmacology-2",
    text: "アトロピンの作用として正しいのはどれか。",
    options: [
      { id: "a", text: "ムスカリン受容体を刺激して心拍数を低下させる" },
      { id: "b", text: "ムスカリン受容体を遮断して心拍数を増加させ、瞳孔を散大させる" },
      { id: "c", text: "α受容体を遮断して血圧を低下させる" },
      { id: "d", text: "β₁受容体を刺激して心収縮力を増加させる" },
    ],
    correctOptionId: "b",
    explanation:
      "アトロピンはムスカリン受容体の競合的拮抗薬（抗コリン薬）。副交感神経遮断：心拍数↑・唾液分泌↓・気管支拡張・腸管蠕動↓・瞳孔散大。有機リン中毒のムスカリン症状にも使用。",
    subject: "薬理学",
    order: 1,
  },
  {
    id: "q-pm-2-2",
    lessonId: "pharmacology-2",
    text: "β遮断薬の禁忌として正しいのはどれか。",
    options: [
      { id: "a", text: "高血圧" },
      { id: "b", text: "狭心症" },
      { id: "c", text: "気管支喘息" },
      { id: "d", text: "心筋梗塞後（二次予防）" },
    ],
    correctOptionId: "c",
    explanation:
      "β遮断薬は気管支のβ₂受容体も遮断→気管支収縮→喘息発作誘発。喘息患者では原則禁忌。高血圧・狭心症・心筋梗塞後（二次予防）・慢性心不全には適応がある。",
    subject: "薬理学",
    order: 2,
  },
  {
    id: "q-pm-2-3",
    lessonId: "pharmacology-2",
    text: "定型抗精神病薬（ハロペリドールなど）の主な作用機序はどれか。",
    options: [
      { id: "a", text: "セロトニン再取り込み阻害" },
      { id: "b", text: "ドパミンD₂受容体の遮断" },
      { id: "c", text: "GABA_A受容体の正のアロステリック調節" },
      { id: "d", text: "ノルアドレナリン再取り込み阻害" },
    ],
    correctOptionId: "b",
    explanation:
      "定型抗精神病薬：中脳辺縁系のD₂受容体遮断→陽性症状（幻覚・妄想）改善。副作用：錐体外路症状（パーキンソン様症状）、高プロラクチン血症。非定型（クロザピン等）はD₂+5-HT₂A遮断。",
    subject: "薬理学",
    order: 3,
  },
  {
    id: "q-pm-2-4",
    lessonId: "pharmacology-2",
    text: "ベンゾジアゼピン系薬の作用機序として正しいのはどれか。",
    options: [
      { id: "a", text: "GABA_A受容体のBZ結合部位に結合し、Cl⁻チャネル開口頻度を増加させて抑制効果を増強する" },
      { id: "b", text: "GABA_B受容体を直接活性化する" },
      { id: "c", text: "グルタミン酸NMDA受容体を遮断する" },
      { id: "d", text: "セロトニン5-HT₁A受容体を刺激する" },
    ],
    correctOptionId: "a",
    explanation:
      "ベンゾジアゼピン（ジアゼパム等）はGABA_A受容体のアロステリック部位に結合→GABAによるCl⁻チャネル開口頻度↑→CNS抑制（鎮静・催眠・抗不安・筋弛緩・抗痙攣）。バルビツール酸はCl⁻チャネルの開口時間を延長。",
    subject: "薬理学",
    order: 4,
  },
  {
    id: "q-pm-2-5",
    lessonId: "pharmacology-2",
    text: "SSRI（選択的セロトニン再取り込み阻害薬）の作用機序として正しいのはどれか。",
    options: [
      { id: "a", text: "モノアミン酸化酵素（MAO）を阻害してセロトニン分解を抑制する" },
      { id: "b", text: "シナプス前膜のセロトニントランスポーターを選択的に阻害し、セロトニン濃度を増加させる" },
      { id: "c", text: "セロトニン受容体を直接刺激する" },
      { id: "d", text: "ノルアドレナリンとドパミンの再取り込みを主に阻害する" },
    ],
    correctOptionId: "b",
    explanation:
      "SSRI（フルオキセチン・パロキセチン等）はSERT阻害→シナプスのセロトニン↑→うつ病・不安障害に有効。三環系と比べ抗コリン・心毒性副作用が少ない。",
    subject: "薬理学",
    order: 5,
  },
  {
    id: "q-pm-2-6",
    lessonId: "pharmacology-2",
    text: "パーキンソン病の治療薬として最も基本的なのはどれか。",
    options: [
      { id: "a", text: "ドパミン受容体拮抗薬（ハロペリドール）" },
      { id: "b", text: "レボドパ（L-DOPA）（カルビドパと配合）" },
      { id: "c", text: "アセチルコリンエステラーゼ阻害薬（ドネペジル）" },
      { id: "d", text: "セロトニン再取り込み阻害薬（SSRI）" },
    ],
    correctOptionId: "b",
    explanation:
      "パーキンソン病は黒質線条体のドパミン産生細胞変性→ドパミン欠乏。レボドパ（血液脳関門を通過しドパミンに変換）が症状コントロールの主軸。カルビドパは末梢のDDC阻害で副作用を軽減。",
    subject: "薬理学",
    order: 6,
  },
  {
    id: "q-pm-2-7",
    lessonId: "pharmacology-2",
    text: "オピオイド（モルヒネ）の副作用として誤っているのはどれか。",
    options: [
      { id: "a", text: "便秘（腸管蠕動抑制）" },
      { id: "b", text: "呼吸抑制（延髄呼吸中枢のμ受容体作用）" },
      { id: "c", text: "縮瞳（瞳孔括約筋のμ受容体作用）" },
      { id: "d", text: "高血圧（血圧上昇）" },
    ],
    correctOptionId: "d",
    explanation:
      "モルヒネの副作用：便秘・呼吸抑制・縮瞳・悪心・鎮静・尿閉。血圧は上昇しない（むしろ低血圧傾向）。過量→ナロキソン（μ受容体拮抗薬）で拮抗。",
    subject: "薬理学",
    order: 7,
  },
  {
    id: "q-pm-2-8",
    lessonId: "pharmacology-2",
    text: "三環系抗うつ薬の副作用として誤っているのはどれか。",
    options: [
      { id: "a", text: "口渇・便秘・尿閉（抗コリン作用）" },
      { id: "b", text: "起立性低血圧（α₁受容体遮断）" },
      { id: "c", text: "QT延長・不整脈（心毒性）" },
      { id: "d", text: "低血糖（インスリン分泌促進）" },
    ],
    correctOptionId: "d",
    explanation:
      "三環系抗うつ薬の副作用：①抗コリン：口渇・便秘・尿閉②α₁遮断：起立性低血圧③抗ヒスタミン：鎮静・体重増加④心毒性：QT延長・不整脈。低血糖は主な副作用ではない。",
    subject: "薬理学",
    order: 8,
  },

  // ── Lesson 3: 循環器薬・抗血栓薬 ────────────────────────────────────────
  {
    id: "q-pm-3-1",
    lessonId: "pharmacology-3",
    text: "ACE阻害薬の主な適応として正しいのはどれか。",
    options: [
      { id: "a", text: "狭心症の発作予防" },
      { id: "b", text: "高血圧・慢性心不全・糖尿病性腎症" },
      { id: "c", text: "不整脈（心房細動の心拍数コントロール）" },
      { id: "d", text: "気管支喘息の発作予防" },
    ],
    correctOptionId: "b",
    explanation:
      "ACE阻害薬（エナラプリル等）：RAAS抑制→降圧・心負荷軽減。糖尿病性腎症（蛋白尿減少・腎保護）・慢性心不全に有益。副作用：空咳（ブラジキニン蓄積）・血管浮腫・高K血症。妊婦禁忌。",
    subject: "薬理学",
    order: 1,
  },
  {
    id: "q-pm-3-2",
    lessonId: "pharmacology-3",
    text: "ワルファリンの作用機序として正しいのはどれか。",
    options: [
      { id: "a", text: "トロンビンを直接阻害する" },
      { id: "b", text: "ビタミンK依存性凝固因子（II・VII・IX・X）の肝臓での合成を阻害する" },
      { id: "c", text: "Xa因子を直接かつ選択的に阻害する" },
      { id: "d", text: "血小板のADP受容体を不可逆的に遮断する" },
    ],
    correctOptionId: "b",
    explanation:
      "ワルファリンはビタミンK拮抗薬→肝臓でのビタミンK依存性凝固因子（II・VII・IX・X）とプロテインC・Sの産生を阻害。効果発現に2〜3日。モニタリングはPT-INR。ビタミンKが拮抗薬。",
    subject: "薬理学",
    order: 2,
  },
  {
    id: "q-pm-3-3",
    lessonId: "pharmacology-3",
    text: "スタチン（HMG-CoA還元酵素阻害薬）の主な作用として正しいのはどれか。",
    options: [
      { id: "a", text: "腸管での胆汁酸再吸収を阻害する" },
      { id: "b", text: "HMG-CoA還元酵素を阻害して肝コレステロール合成を抑制し、血清LDLを低下させる" },
      { id: "c", text: "リポタンパクリパーゼを活性化してTGを分解する" },
      { id: "d", text: "LDL受容体の発現を低下させる" },
    ],
    correctOptionId: "b",
    explanation:
      "スタチン（アトルバスタチン等）：HMG-CoA還元酵素阻害→コレステロール合成↓→肝LDL受容体↑（代償）→血清LDL↓。心血管疾患の一次・二次予防の基本薬。副作用：横紋筋融解症。",
    subject: "薬理学",
    order: 3,
  },
  {
    id: "q-pm-3-4",
    lessonId: "pharmacology-3",
    text: "ジゴキシンの作用機序として正しいのはどれか。",
    options: [
      { id: "a", text: "β₁受容体を刺激して心収縮力を増加させる" },
      { id: "b", text: "Na⁺-K⁺-ATPaseを阻害して細胞内Ca²⁺を増加させ、心収縮力を増強する" },
      { id: "c", text: "L型Ca²⁺チャネルを直接遮断する" },
      { id: "d", text: "K⁺チャネルを阻害してAPDを延長する" },
    ],
    correctOptionId: "b",
    explanation:
      "ジゴキシン：Na-K ATPase阻害→細胞内Na↑→Na-Ca交換体の逆転↓→Ca²⁺↑→収縮力増大。副交感神経様作用で心拍数↓・AV伝導↓。安全域が狭くTDMが必要。",
    subject: "薬理学",
    order: 4,
  },
  {
    id: "q-pm-3-5",
    lessonId: "pharmacology-3",
    text: "ループ利尿薬（フロセミド）の作用部位と機序として正しいのはどれか。",
    options: [
      { id: "a", text: "近位尿細管の炭酸脱水酵素を阻害する" },
      { id: "b", text: "ヘンレ係蹄上行脚のNa-K-2Cl共輸送体（NKCC2）を阻害して強力な利尿をもたらす" },
      { id: "c", text: "遠位曲尿細管のNaCl共輸送体を阻害する" },
      { id: "d", text: "集合管でアルドステロン受容体を遮断する" },
    ],
    correctOptionId: "b",
    explanation:
      "ループ利尿薬はヘンレ上行脚のNKCC2阻害→強力なNa・Cl・水利尿。急性心不全・浮腫・高Ca血症に使用。副作用：低K・低Mg・代謝性アルカローシス・耳毒性。",
    subject: "薬理学",
    order: 5,
  },
  {
    id: "q-pm-3-6",
    lessonId: "pharmacology-3",
    text: "ニトログリセリンの作用機序として正しいのはどれか。",
    options: [
      { id: "a", text: "β₁受容体を刺激して心拍数を増加させる" },
      { id: "b", text: "NO（一酸化窒素）を放出→血管平滑筋でcGMP↑→血管弛緩（主に静脈系）" },
      { id: "c", text: "L型Ca²⁺チャネルを遮断する" },
      { id: "d", text: "K⁺チャネルを開口して血管平滑筋を弛緩させる" },
    ],
    correctOptionId: "b",
    explanation:
      "ニトログリセリン→体内でNO遊離→グアニル酸シクラーゼ活性化→cGMP↑→PKG活性化→血管弛緩。主に静脈系（前負荷↓）を拡張し狭心症・心不全に有効。",
    subject: "薬理学",
    order: 6,
  },
  {
    id: "q-pm-3-7",
    lessonId: "pharmacology-3",
    text: "アスピリンの抗血小板作用の機序として正しいのはどれか。",
    options: [
      { id: "a", text: "ADP受容体（P2Y₁₂）を不可逆的に遮断する" },
      { id: "b", text: "COX-1を不可逆的にアセチル化して阻害し、TXA₂産生を抑制する" },
      { id: "c", text: "ホスホジエステラーゼを阻害してcAMPを増加させる" },
      { id: "d", text: "GP IIb/IIIaを直接遮断する" },
    ],
    correctOptionId: "b",
    explanation:
      "アスピリンはCOX-1をアセチル化→不可逆阻害→TXA₂↓。血小板は核がなくCOXを再合成できないため、血小板寿命（7〜10日）の間効果持続。P2Y₁₂阻害はクロピドグレル。",
    subject: "薬理学",
    order: 7,
  },
  {
    id: "q-pm-3-8",
    lessonId: "pharmacology-3",
    text: "カルシウム拮抗薬（ジヒドロピリジン系：アムロジピン）について正しいのはどれか。",
    options: [
      { id: "a", text: "気管支喘息患者で禁忌である" },
      { id: "b", text: "心筋のL型Ca²⁺チャネルを主に遮断し陰性変力作用が強い" },
      { id: "c", text: "血管平滑筋のL型Ca²⁺チャネルを遮断して血管拡張・降圧をもたらす" },
      { id: "d", text: "腎臓でのNa再吸収を阻害して降圧する" },
    ],
    correctOptionId: "c",
    explanation:
      "ジヒドロピリジン系Ca拮抗薬は血管平滑筋Ca²⁺チャネルを選択的に遮断→血管拡張→降圧。気管支喘息には禁忌なし。副作用：顔面紅潮・浮腫・反射性頻脈。",
    subject: "薬理学",
    order: 8,
  },

  // ── Lesson 4: 抗菌薬・抗炎症薬 ──────────────────────────────────────────
  {
    id: "q-pm-4-1",
    lessonId: "pharmacology-4",
    text: "ペニシリン系抗菌薬の作用機序として正しいのはどれか。",
    options: [
      { id: "a", text: "リボソーム30Sサブユニットを阻害してタンパク合成を抑制する" },
      { id: "b", text: "PBP（ペニシリン結合タンパク）に結合してペプチドグリカン合成を阻害する" },
      { id: "c", text: "DNAジャイレースを阻害してDNA複製を障害する" },
      { id: "d", text: "細菌細胞膜に穴を開けて膜機能を障害する" },
    ],
    correctOptionId: "b",
    explanation:
      "β-ラクタム系（ペニシリン・セファロスポリン・カルバペネム）はPBP結合→トランスペプチダーゼ阻害→ペプチドグリカン架橋阻害→細胞壁合成阻害→溶菌。耐性：β-ラクタマーゼ産生・PBP変異（MRSA）。",
    subject: "薬理学",
    order: 1,
  },
  {
    id: "q-pm-4-2",
    lessonId: "pharmacology-4",
    text: "マクロライド系抗菌薬（エリスロマイシン等）の作用機序はどれか。",
    options: [
      { id: "a", text: "リボソーム30Sサブユニット阻害" },
      { id: "b", text: "リボソーム50Sサブユニットに結合してタンパク合成を抑制する" },
      { id: "c", text: "細胞壁合成を阻害する" },
      { id: "d", text: "DNAジャイレースを阻害する" },
    ],
    correctOptionId: "b",
    explanation:
      "マクロライドは50Sリボソームに結合→翻訳阻害。同様に50S阻害：クロラムフェニコール・クリンダマイシン。30S阻害：アミノグリコシド・テトラサイクリン。",
    subject: "薬理学",
    order: 2,
  },
  {
    id: "q-pm-4-3",
    lessonId: "pharmacology-4",
    text: "アミノグリコシド系抗菌薬に共通する重要な副作用はどれか。",
    options: [
      { id: "a", text: "偽膜性腸炎（C. difficile感染症）" },
      { id: "b", text: "腎毒性・耳毒性（前庭毒性・聴覚毒性）" },
      { id: "c", text: "光線過敏症" },
      { id: "d", text: "骨・歯への色素沈着" },
    ],
    correctOptionId: "b",
    explanation:
      "アミノグリコシドは腎毒性（尿細管細胞障害）・耳毒性が主な副作用。腎機能低下で蓄積→TDM必要。偽膜性腸炎はクリンダマイシンなど、骨・歯変色はテトラサイクリン、光線過敏症はテトラサイクリン・キノロン。",
    subject: "薬理学",
    order: 3,
  },
  {
    id: "q-pm-4-4",
    lessonId: "pharmacology-4",
    text: "フルオロキノロン系抗菌薬の作用機序として正しいのはどれか。",
    options: [
      { id: "a", text: "細胞壁合成を阻害する" },
      { id: "b", text: "リボソーム50Sサブユニットを阻害する" },
      { id: "c", text: "DNAジャイレース・トポイソメラーゼIVを阻害してDNA複製を障害する" },
      { id: "d", text: "葉酸合成を阻害する" },
    ],
    correctOptionId: "c",
    explanation:
      "キノロン系はDNAジャイレース（グラム陰性菌）とトポイソメラーゼIV（グラム陽性菌）を阻害→DNA複製障害→殺菌的。副作用：腱断裂・QT延長・光線過敏症。小児・妊婦禁忌（軟骨障害）。",
    subject: "薬理学",
    order: 4,
  },
  {
    id: "q-pm-4-5",
    lessonId: "pharmacology-4",
    text: "NSAIDsの主な作用機序はどれか。",
    options: [
      { id: "a", text: "ホスホリパーゼA₂を阻害してアラキドン酸遊離を抑制する" },
      { id: "b", text: "COX（シクロオキシゲナーゼ）を阻害してPG・TXA₂合成を抑制する" },
      { id: "c", text: "ロイコトリエン受容体を遮断する" },
      { id: "d", text: "ヒスタミンH₁受容体を遮断する" },
    ],
    correctOptionId: "b",
    explanation:
      "NSAIDs（イブプロフェン・ジクロフェナク等）はCOX阻害→PG↓→抗炎症・解熱・鎮痛。副作用：胃粘膜障害（COX-1由来PGE₂↓）・腎機能障害・血小板機能低下。ステロイドはPLA₂を阻害。",
    subject: "薬理学",
    order: 5,
  },
  {
    id: "q-pm-4-6",
    lessonId: "pharmacology-4",
    text: "ステロイド（糖質コルチコイド）の副作用として誤っているのはどれか。",
    options: [
      { id: "a", text: "免疫抑制による感染症リスク増大" },
      { id: "b", text: "骨粗鬆症" },
      { id: "c", text: "低血糖" },
      { id: "d", text: "クッシング様症状（満月様顔貌・中心性肥満）" },
    ],
    correctOptionId: "c",
    explanation:
      "ステロイドは糖新生促進→血糖上昇（高血糖）。主な副作用：感染症↑・高血糖・骨粗鬆症・クッシング様症状・副腎不全（急激中止）・消化性潰瘍・白内障・緑内障。",
    subject: "薬理学",
    order: 6,
  },
  {
    id: "q-pm-4-7",
    lessonId: "pharmacology-4",
    text: "メトロニダゾールが特に有効な病原体・疾患として正しいのはどれか。",
    options: [
      { id: "a", text: "MRSA感染症" },
      { id: "b", text: "嫌気性菌感染症・C. difficile感染症・トリコモナス症・アメーバ症" },
      { id: "c", text: "マイコプラズマ肺炎" },
      { id: "d", text: "侵襲性アスペルギルス症" },
    ],
    correctOptionId: "b",
    explanation:
      "メトロニダゾールは嫌気性条件下で活性化→DNA障害。適応：嫌気性菌感染・CDI・トリコモナス膣炎・アメーバ赤痢・ジアルジア症。MRSA→バンコマイシン。マイコプラズマ→マクロライド。",
    subject: "薬理学",
    order: 7,
  },
  {
    id: "q-pm-4-8",
    lessonId: "pharmacology-4",
    text: "結核の初期治療（標準6ヶ月レジメン）として正しい薬剤の組み合わせはどれか。",
    options: [
      { id: "a", text: "ペニシリン＋クラブラン酸" },
      { id: "b", text: "リファンピシン（R）＋イソニアジド（H）＋ピラジナミド（Z）＋エタンブトール（E）" },
      { id: "c", text: "バンコマイシン＋リネゾリド" },
      { id: "d", text: "クラリスロマイシン＋メトロニダゾール" },
    ],
    correctOptionId: "b",
    explanation:
      "結核の標準治療（6ヶ月）：前2ヶ月HRZE（4剤）＋後4ヶ月HR（2剤）。多剤併用は耐性菌出現防止のため。リファンピシン（RNA合成阻害）・イソニアジド（ミコール酸合成阻害）・ピラジナミド・エタンブトール。",
    subject: "薬理学",
    order: 8,
  },
];

export const pharmacologyLessons: Lesson[] = [
  {
    id: "pharmacology-1",
    title: "薬理学 — 薬物動態総論",
    questionIds: [
      "q-pm-1-1", "q-pm-1-2", "q-pm-1-3", "q-pm-1-4",
      "q-pm-1-5", "q-pm-1-6", "q-pm-1-7", "q-pm-1-8",
    ],
    subject: "薬理学",
    examTag: "医師国家試験",
    order: 11,
    orderInSubject: 1,
    level: 1,
  },
  {
    id: "pharmacology-2",
    title: "薬理学 — 自律神経薬・中枢神経薬",
    questionIds: [
      "q-pm-2-1", "q-pm-2-2", "q-pm-2-3", "q-pm-2-4",
      "q-pm-2-5", "q-pm-2-6", "q-pm-2-7", "q-pm-2-8",
    ],
    subject: "薬理学",
    examTag: "医師国家試験",
    order: 12,
    orderInSubject: 2,
    level: 2,
  },
  {
    id: "pharmacology-3",
    title: "薬理学 — 循環器薬・抗血栓薬",
    questionIds: [
      "q-pm-3-1", "q-pm-3-2", "q-pm-3-3", "q-pm-3-4",
      "q-pm-3-5", "q-pm-3-6", "q-pm-3-7", "q-pm-3-8",
    ],
    subject: "薬理学",
    examTag: "医師国家試験",
    order: 13,
    orderInSubject: 3,
    level: 3,
  },
  {
    id: "pharmacology-4",
    title: "薬理学 — 抗菌薬・抗炎症薬",
    questionIds: [
      "q-pm-4-1", "q-pm-4-2", "q-pm-4-3", "q-pm-4-4",
      "q-pm-4-5", "q-pm-4-6", "q-pm-4-7", "q-pm-4-8",
    ],
    subject: "薬理学",
    examTag: "医師国家試験",
    order: 14,
    orderInSubject: 4,
    level: 4,
  },
];
