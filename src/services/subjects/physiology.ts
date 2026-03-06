import type { Question, Lesson } from "@/types";

/** 生理学 — 5レッスン・全40問 */
export const physiologyQuestions: Question[] = [

  // ── Lesson 1: 細胞生理・膜電位 ────────────────────────────────────────────
  {
    id: "q-ph-1-1",
    lessonId: "physiology-1",
    text: "細胞内でATPを主に産生する細胞小器官はどれか。",
    options: [
      { id: "a", text: "リボソーム" },
      { id: "b", text: "ミトコンドリア" },
      { id: "c", text: "滑面小胞体" },
      { id: "d", text: "ゴルジ体" },
    ],
    correctOptionId: "b",
    explanation:
      "ミトコンドリアはクエン酸回路（TCAサイクル）と酸化的リン酸化（電子伝達系）によって1分子グルコースから最大30〜32分子のATPを産生する（好気的条件下）。",
    subject: "生理学",
    order: 1,
  },
  {
    id: "q-ph-1-2",
    lessonId: "physiology-1",
    text: "静止膜電位の維持に最も重要なイオンはどれか。",
    options: [
      { id: "a", text: "Na⁺" },
      { id: "b", text: "K⁺" },
      { id: "c", text: "Ca²⁺" },
      { id: "d", text: "Cl⁻" },
    ],
    correctOptionId: "b",
    explanation:
      "静止時にK⁺漏れチャネルが開いており、K⁺が濃度勾配に従い細胞外へ出ることで内側が負になる（約−70mV）。Na⁺-K⁺-ATPaseがK⁺を細胞内に汲み込みイオン勾配を維持する。",
    subject: "生理学",
    order: 2,
  },
  {
    id: "q-ph-1-3",
    lessonId: "physiology-1",
    text: "Na⁺-K⁺-ATPase（ナトリウムポンプ）の作用として正しいのはどれか。",
    options: [
      { id: "a", text: "Na⁺を細胞内に取り込み、K⁺を細胞外に排出する" },
      { id: "b", text: "ATP1分子を消費してNa⁺3個を細胞外へ排出し、K⁺2個を細胞内に取り込む" },
      { id: "c", text: "Na⁺とK⁺を等モル交換するため膜電位に影響しない" },
      { id: "d", text: "ATPを産生する方向にのみ働く" },
    ],
    correctOptionId: "b",
    explanation:
      "Na-KポンプはATP1分子でNa⁺3個（細胞外へ）・K⁺2個（細胞内へ）を輸送する電気原性ポンプ。この3:2の比率により膜電位がわずかに内側負方向へ維持される。",
    subject: "生理学",
    order: 3,
  },
  {
    id: "q-ph-1-4",
    lessonId: "physiology-1",
    text: "活動電位の急速脱分極相（上昇相）に最初に起こるのはどれか。",
    options: [
      { id: "a", text: "電位依存性K⁺チャネルの開口によるK⁺の流出" },
      { id: "b", text: "電位依存性Na⁺チャネルの開口によるNa⁺の細胞内流入" },
      { id: "c", text: "Cl⁻チャネルの開口" },
      { id: "d", text: "L型Ca²⁺チャネルの開口" },
    ],
    correctOptionId: "b",
    explanation:
      "閾値を超える脱分極で電位依存性Na⁺チャネルが開口→Na⁺が急速に細胞内へ流入→膜電位が+30mV程度まで上昇（オーバーシュート）。その後Na⁺チャネルが不活性化しK⁺チャネルが開口して再分極する。",
    subject: "生理学",
    order: 4,
  },
  {
    id: "q-ph-1-5",
    lessonId: "physiology-1",
    text: "細胞膜の構造として正しいのはどれか。",
    options: [
      { id: "a", text: "一重のリン脂質層から成る" },
      { id: "b", text: "リン脂質の疎水性尾部が外側に向く" },
      { id: "c", text: "流動モザイクモデルで説明される（リン脂質二重層にタンパク質が埋め込まれる）" },
      { id: "d", text: "細胞膜を通じた物質輸送はすべてエネルギーを必要とする" },
    ],
    correctOptionId: "c",
    explanation:
      "Singer & Nicolsonの流動モザイクモデル（1972年）：リン脂質二重層（疎水性尾部が内側・親水性頭部が外側）に膜内在性・末梢性タンパク質が流動的に分布する。単純拡散・促進拡散はエネルギー不要。",
    subject: "生理学",
    order: 5,
  },
  {
    id: "q-ph-1-6",
    lessonId: "physiology-1",
    text: "血漿と等張（等浸透圧）の溶液はどれか。",
    options: [
      { id: "a", text: "0.45% NaCl溶液（低張液）" },
      { id: "b", text: "0.9% NaCl溶液（生理食塩水）" },
      { id: "c", text: "5% NaCl溶液（高張液）" },
      { id: "d", text: "蒸留水" },
    ],
    correctOptionId: "b",
    explanation:
      "血漿の浸透圧は約280〜295 mOsm/kg H₂O。0.9% NaCl（約308 mOsm/L）が生理食塩水として等張に近い。赤血球を低張液に入れると膨張・溶血、高張液では収縮（萎縮）する。",
    subject: "生理学",
    order: 6,
  },
  {
    id: "q-ph-1-7",
    lessonId: "physiology-1",
    text: "Gs蛋白質を介してアデニル酸シクラーゼを活性化し、cAMPを産生させる受容体はどれか。",
    options: [
      { id: "a", text: "ムスカリン受容体M₁（Gqタンパク結合）" },
      { id: "b", text: "β₁アドレナリン受容体（Gsタンパク結合）" },
      { id: "c", text: "α₂アドレナリン受容体（Giタンパク結合）" },
      { id: "d", text: "インスリン受容体（チロシンキナーゼ型）" },
    ],
    correctOptionId: "b",
    explanation:
      "β₁受容体はGs→アデニル酸シクラーゼ活性化→cAMP↑→PKA活性化。α₂受容体はGi→AC阻害→cAMP↓。Gq→PLC→IP₃/DAG経路（M₁、α₁等）。インスリン受容体は受容体チロシンキナーゼ。",
    subject: "生理学",
    order: 7,
  },
  {
    id: "q-ph-1-8",
    lessonId: "physiology-1",
    text: "酸素解離曲線を右方移動させる（ヘモグロビンの酸素親和性を低下させる）因子はどれか。",
    options: [
      { id: "a", text: "体温低下" },
      { id: "b", text: "pH上昇（アルカローシス）" },
      { id: "c", text: "2,3-ジホスホグリセリン酸（2,3-DPG）の増加" },
      { id: "d", text: "CO₂分圧低下" },
    ],
    correctOptionId: "c",
    explanation:
      "酸素解離曲線の右方移動（Hbの酸素放出↑）：体温上昇・pH低下（ボーア効果）・CO₂分圧上昇・2,3-DPG増加。左方移動（Hbの酸素結合↑）：体温低下・pH上昇・CO₂低下・胎児Hb（HbF）。",
    subject: "生理学",
    order: 8,
  },

  // ── Lesson 2: 神経・筋生理 ───────────────────────────────────────────────
  {
    id: "q-ph-2-1",
    lessonId: "physiology-2",
    text: "神経筋接合部（運動終板）で放出される神経伝達物質はどれか。",
    options: [
      { id: "a", text: "ノルアドレナリン" },
      { id: "b", text: "アセチルコリン" },
      { id: "c", text: "グルタミン酸" },
      { id: "d", text: "GABA" },
    ],
    correctOptionId: "b",
    explanation:
      "運動神経（α運動ニューロン）の終末からアセチルコリン（ACh）が放出され、骨格筋のニコチン性AChR（NMJ型）に結合→終板電位→筋活動電位→収縮。ボツリヌス毒素はACh放出を阻害する。",
    subject: "生理学",
    order: 1,
  },
  {
    id: "q-ph-2-2",
    lessonId: "physiology-2",
    text: "骨格筋の収縮機序（スライディングフィラメント理論）について正しいのはどれか。",
    options: [
      { id: "a", text: "収縮時にミオシンフィラメント自体の長さが短縮する" },
      { id: "b", text: "アクチンフィラメントがミオシンに向けてスライドし、筋節（サルコメア）が短縮する" },
      { id: "c", text: "収縮時にA帯（暗帯）の幅が短縮する" },
      { id: "d", text: "アクチン自体の長さが短縮する" },
    ],
    correctOptionId: "b",
    explanation:
      "スライディングフィラメント理論（Huxley）：アクチンがミオシンクロスブリッジにより引き寄せられてスライド→I帯（明帯）とH帯が短縮→A帯（暗帯）の幅は変化しない→サルコメア全体が短縮。",
    subject: "生理学",
    order: 2,
  },
  {
    id: "q-ph-2-3",
    lessonId: "physiology-2",
    text: "Ca²⁺が結合してアクチン—ミオシン架橋形成を可能にするタンパク質はどれか。",
    options: [
      { id: "a", text: "トロポミオシン" },
      { id: "b", text: "トロポニンC（TnC）" },
      { id: "c", text: "チチン（タイチン）" },
      { id: "d", text: "アクチニン" },
    ],
    correctOptionId: "b",
    explanation:
      "トロポニン複合体（TnC・TnI・TnT）はアクチンフィラメント上のトロポミオシンに結合。Ca²⁺がTnCに結合→構造変化→トロポミオシンがずれてアクチン上のミオシン結合部位が露出→クロスブリッジ形成。",
    subject: "生理学",
    order: 3,
  },
  {
    id: "q-ph-2-4",
    lessonId: "physiology-2",
    text: "有髄神経の跳躍伝導について正しいのはどれか。",
    options: [
      { id: "a", text: "髄鞘（ミエリン鞘）のある部位で活動電位が発生する" },
      { id: "b", text: "ランヴィエ絞輪間を電流が流れ、絞輪から絞輪へ跳躍して伝導する" },
      { id: "c", text: "跳躍伝導は無髄神経より伝導速度が遅い" },
      { id: "d", text: "跳躍伝導はエネルギー消費量が無髄神経より多い" },
    ],
    correctOptionId: "b",
    explanation:
      "有髄神経では髄鞘が絶縁体として機能し、電流はランヴィエ絞輪（髄鞘の欠如部）のみで膜電流が流れる（跳躍伝導）。これにより伝導速度が向上（Aα線維70〜120m/s）し、エネルギー消費も節約される。",
    subject: "生理学",
    order: 4,
  },
  {
    id: "q-ph-2-5",
    lessonId: "physiology-2",
    text: "化学シナプスについて正しいのはどれか。",
    options: [
      { id: "a", text: "電気シナプスと同様に双方向性の伝達ができる" },
      { id: "b", text: "興奮性・抑制性どちらの伝達も可能で、シナプス遅延（0.5〜1ms）が生じる" },
      { id: "c", text: "神経伝達物質はシナプス後膜のシナプス小胞に貯蔵される" },
      { id: "d", text: "終末に到達した活動電位は化学物質なしに直接後シナプス膜を脱分極させる" },
    ],
    correctOptionId: "b",
    explanation:
      "化学シナプスは一方向性（前→後）で、放出された神経伝達物質が後シナプス受容体に結合してEPSP（興奮性）またはIPSP（抑制性）を生じる。シナプス遅延（0.5〜1ms）は化学伝達の時間的特徴。",
    subject: "生理学",
    order: 5,
  },
  {
    id: "q-ph-2-6",
    lessonId: "physiology-2",
    text: "伸張反射の受容器と求心性線維の組み合わせで正しいのはどれか。",
    options: [
      { id: "a", text: "ゴルジ腱器官 ／ Ib線維" },
      { id: "b", text: "筋紡錘（一次終末） ／ Ia線維" },
      { id: "c", text: "自由神経終末 ／ C線維" },
      { id: "d", text: "パチニ小体 ／ Aβ線維" },
    ],
    correctOptionId: "b",
    explanation:
      "伸張反射（単シナプス反射）：筋紡錘Ia線維→脊髄→同側α運動ニューロン→筋収縮（膝蓋腱反射など）。ゴルジ腱器官（Ib線維）は筋張力検出→抑制（自己抑制）。",
    subject: "生理学",
    order: 6,
  },
  {
    id: "q-ph-2-7",
    lessonId: "physiology-2",
    text: "反射弓の構成要素を正しい順で並べたのはどれか。",
    options: [
      { id: "a", text: "受容器→求心性神経→効果器→遠心性神経→反射中枢" },
      { id: "b", text: "受容器→求心性神経→反射中枢→遠心性神経→効果器" },
      { id: "c", text: "反射中枢→受容器→求心性神経→遠心性神経→効果器" },
      { id: "d", text: "受容器→遠心性神経→反射中枢→求心性神経→効果器" },
    ],
    correctOptionId: "b",
    explanation:
      "反射弓の順序：①受容器（刺激を検知）→②求心性神経（感覚ニューロン）→③反射中枢（脊髄・脳幹）→④遠心性神経（運動ニューロン）→⑤効果器（筋肉・腺）。",
    subject: "生理学",
    order: 7,
  },
  {
    id: "q-ph-2-8",
    lessonId: "physiology-2",
    text: "副交感神経の節前・節後線維の神経伝達物質として正しいのはどれか。",
    options: [
      { id: "a", text: "節前：アセチルコリン ／ 節後：ノルアドレナリン" },
      { id: "b", text: "節前：ノルアドレナリン ／ 節後：アセチルコリン" },
      { id: "c", text: "節前：アセチルコリン ／ 節後：アセチルコリン" },
      { id: "d", text: "節前：ノルアドレナリン ／ 節後：ノルアドレナリン" },
    ],
    correctOptionId: "c",
    explanation:
      "副交感神経の節前・節後線維はともにアセチルコリンを放出する（コリン作動性）。交感神経は節前：ACh、節後：ノルアドレナリン（汗腺だけACh）。副腎髄質への交感神経は節後線維なしで直接支配。",
    subject: "生理学",
    order: 8,
  },

  // ── Lesson 3: 循環生理 ───────────────────────────────────────────────────
  {
    id: "q-ph-3-1",
    lessonId: "physiology-3",
    text: "心拍出量（CO）の正しい計算式はどれか。",
    options: [
      { id: "a", text: "CO = 心拍数 × 末梢血管抵抗" },
      { id: "b", text: "CO = 1回拍出量（SV）× 心拍数（HR）" },
      { id: "c", text: "CO = 収縮期血圧 − 拡張期血圧" },
      { id: "d", text: "CO = 血圧 ÷ 心拍数" },
    ],
    correctOptionId: "b",
    explanation:
      "心拍出量（CO）= SV × HR。安静時のCO は約5L/min（SV ≈ 70mL、HR ≈ 70回/min）。フィック原理でもCO = O₂消費量 ÷ （動静脈O₂較差）で測定できる。",
    subject: "生理学",
    order: 1,
  },
  {
    id: "q-ph-3-2",
    lessonId: "physiology-3",
    text: "フランク—スターリングの法則として正しいのはどれか。",
    options: [
      { id: "a", text: "心拍数が増加すると1回拍出量が常に減少する" },
      { id: "b", text: "心室の前負荷（拡張末期容積）が増加すると、心収縮力が増加してSVが増加する" },
      { id: "c", text: "後負荷（大動脈圧）が増加するとSVが必ず増加する" },
      { id: "d", text: "交感神経興奮により心収縮力が低下する" },
    ],
    correctOptionId: "b",
    explanation:
      "スターリングの心臓の法則：心室に流入する血液量（前負荷）が増えるほど筋節が伸張→収縮力増大→SVが増加する。これにより心臓は流入量に応じた拍出を行う自己調節機構。",
    subject: "生理学",
    order: 2,
  },
  {
    id: "q-ph-3-3",
    lessonId: "physiology-3",
    text: "心音について正しいのはどれか。",
    options: [
      { id: "a", text: "第I心音は半月弁（大動脈弁・肺動脈弁）の閉鎖音である" },
      { id: "b", text: "第II心音は房室弁（僧帽弁・三尖弁）の閉鎖音である" },
      { id: "c", text: "第I心音は等容収縮期の始まり（房室弁閉鎖）に生じる" },
      { id: "d", text: "第III心音は正常成人でも常に聴取される" },
    ],
    correctOptionId: "c",
    explanation:
      "I音（低調・長い）：収縮期開始時の房室弁（僧帽弁・三尖弁）閉鎖音。II音（高調・短い）：拡張期開始時の半月弁（大動脈弁・肺動脈弁）閉鎖音。III音は拡張期急速流入期に生じ、若年者・心不全で聴取。",
    subject: "生理学",
    order: 3,
  },
  {
    id: "q-ph-3-4",
    lessonId: "physiology-3",
    text: "動脈圧受容体（バロレセプター）が主に存在する部位はどれか。",
    options: [
      { id: "a", text: "腎臓の傍糸球体細胞" },
      { id: "b", text: "大動脈弓・頸動脈洞" },
      { id: "c", text: "視床下部" },
      { id: "d", text: "副腎髄質" },
    ],
    correctOptionId: "b",
    explanation:
      "バロレセプター（圧受容体）は大動脈弓（迷走神経を介して延髄へ）と頸動脈洞（舌咽神経を介して延髄へ）に存在。血圧上昇→バロレセプター興奮→交感神経抑制・副交感神経亢進→心拍数低下・血圧低下。",
    subject: "生理学",
    order: 4,
  },
  {
    id: "q-ph-3-5",
    lessonId: "physiology-3",
    text: "末梢血管抵抗に最も大きな影響を与える因子はどれか。",
    options: [
      { id: "a", text: "血管の長さ" },
      { id: "b", text: "血管の内径（半径）" },
      { id: "c", text: "血液の粘性" },
      { id: "d", text: "血管壁の弾性" },
    ],
    correctOptionId: "b",
    explanation:
      "ポアゼイユの法則：抵抗 = 8ηL / πr⁴（r：半径）。抵抗は半径の4乗に反比例するため、血管径のわずかな変化が抵抗に大きく影響する。細動脈の収縮・弛緩が末梢血管抵抗と血圧調節の主体。",
    subject: "生理学",
    order: 5,
  },
  {
    id: "q-ph-3-6",
    lessonId: "physiology-3",
    text: "心電図（ECG）のQRS波が表しているのはどれか。",
    options: [
      { id: "a", text: "心房の脱分極" },
      { id: "b", text: "心室の脱分極" },
      { id: "c", text: "心室の再分極" },
      { id: "d", text: "房室結節の伝導時間" },
    ],
    correctOptionId: "b",
    explanation:
      "P波：心房脱分極。QRS複合体：心室脱分極（0.06〜0.10秒）。T波：心室再分極。PR間隔：洞房結節→房室結節→ヒス束の伝導時間（正常0.12〜0.20秒）。",
    subject: "生理学",
    order: 6,
  },
  {
    id: "q-ph-3-7",
    lessonId: "physiology-3",
    text: "毛細血管での濾過を促進する（組織液産生を増やす）因子はどれか。",
    options: [
      { id: "a", text: "血漿膠質浸透圧の増加" },
      { id: "b", text: "毛細血管静水圧の増加" },
      { id: "c", text: "組織液膠質浸透圧の低下" },
      { id: "d", text: "毛細血管透過性の低下" },
    ],
    correctOptionId: "b",
    explanation:
      "スターリングの法則：濾過 = Kf[(Pc − Pi) − (πc − πi)]。毛細血管静水圧（Pc）上昇→濾過増加→浮腫。血漿膠質浸透圧（πc）上昇→濾過抑制・再吸収促進。低アルブミン血症→πc低下→浮腫。",
    subject: "生理学",
    order: 7,
  },
  {
    id: "q-ph-3-8",
    lessonId: "physiology-3",
    text: "交感神経（β₁受容体）の心臓に対する主な作用はどれか。",
    options: [
      { id: "a", text: "心拍数低下（陰性変時作用）・伝導速度低下" },
      { id: "b", text: "心拍数増加（陽性変時作用）・収縮力増加（陽性変力作用）・伝導速度増加" },
      { id: "c", text: "心拍数増加・収縮力低下" },
      { id: "d", text: "心拍数に影響せず収縮力のみ増加" },
    ],
    correctOptionId: "b",
    explanation:
      "交感神経β₁受容体→Gs→cAMP↑→PKA活性化→①洞房結節の自動能亢進（心拍数↑）②房室伝導速度↑③心収縮力↑。副交感神経M₂→Gi→cAMP↓→心拍数↓・AV伝導↓。",
    subject: "生理学",
    order: 8,
  },

  // ── Lesson 4: 呼吸生理 ───────────────────────────────────────────────────
  {
    id: "q-ph-4-1",
    lessonId: "physiology-4",
    text: "肺活量（VC）の定義として正しいのはどれか。",
    options: [
      { id: "a", text: "安静呼吸時の1回換気量（TV）" },
      { id: "b", text: "最大吸気位から最大呼気位まで呼出できる空気量" },
      { id: "c", text: "最大努力呼気後に肺内に残る空気量（残気量, RV）" },
      { id: "d", text: "安静呼気位に残る空気量（機能的残気量, FRC）" },
    ],
    correctOptionId: "b",
    explanation:
      "肺活量（VC）= 1回換気量（TV）+ 予備吸気量（IRV）+ 予備呼気量（ERV）。正常値は3.0〜5.0L程度。残気量（RV）はスパイロメトリーで直接測定できない。全肺気量（TLC）= VC + RV。",
    subject: "生理学",
    order: 1,
  },
  {
    id: "q-ph-4-2",
    lessonId: "physiology-4",
    text: "呼吸の化学的調節について正しいのはどれか。",
    options: [
      { id: "a", text: "末梢化学受容体（頸動脈小体・大動脈小体）はPaCO₂に最も感受性が高い" },
      { id: "b", text: "中枢化学受容体（延髄腹外側部）はPaO₂低下に主として反応する" },
      { id: "c", text: "中枢化学受容体はPaCO₂上昇（→脳脊髄液のH⁺増加）に反応して換気を促進する" },
      { id: "d", text: "高CO₂血症（CO₂ナルコーシス）では換気が亢進し続ける" },
    ],
    correctOptionId: "c",
    explanation:
      "中枢化学受容体（延髄）はCO₂→血液脳関門通過→脳脊髄液のH⁺増加→換気促進に最も強く反応。末梢化学受容体（頸動脈小体・大動脈小体）はPaO₂低下・pH低下・PaCO₂上昇で応答。",
    subject: "生理学",
    order: 2,
  },
  {
    id: "q-ph-4-3",
    lessonId: "physiology-4",
    text: "肺サーファクタント（界面活性物質）の主な機能はどれか。",
    options: [
      { id: "a", text: "肺胞の表面張力を増大させて肺胞の形状を保つ" },
      { id: "b", text: "肺胞の表面張力を低下させ、肺胞の虚脱（無気肺）を防ぐ" },
      { id: "c", text: "気道の分泌液（気道粘液）を主に産生する" },
      { id: "d", text: "酸素分子を直接運搬する" },
    ],
    correctOptionId: "b",
    explanation:
      "サーファクタント（主にDPPC：ジパルミトイルホスファチジルコリン）はII型肺胞上皮細胞が産生。ラプラスの法則（P = 2T/r）で示されるように、表面張力を低下させることで小肺胞の収縮圧を下げ、肺胞の安定性を保つ。新生児呼吸窮迫症候群（NRDS）はサーファクタント欠如が原因。",
    subject: "生理学",
    order: 3,
  },
  {
    id: "q-ph-4-4",
    lessonId: "physiology-4",
    text: "CO₂がO₂より肺胞—毛細血管間の拡散能が高い理由はどれか。",
    options: [
      { id: "a", text: "CO₂はO₂より分子量が小さいから" },
      { id: "b", text: "CO₂はO₂より水への溶解度が約20倍高いから" },
      { id: "c", text: "CO₂はヘモグロビンとより強く結合するから" },
      { id: "d", text: "CO₂は分圧差がO₂より常に大きいから" },
    ],
    correctOptionId: "b",
    explanation:
      "フィックの拡散則：拡散速度 ∝ ΔP × 面積 × 溶解度 / （√分子量 × 膜厚）。CO₂の水への溶解度はO₂の約24倍高く、分子量はわずかに大きいが（44 vs 32）、トータルの拡散能はCO₂がO₂の約20倍。",
    subject: "生理学",
    order: 4,
  },
  {
    id: "q-ph-4-5",
    lessonId: "physiology-4",
    text: "生理学的死腔（physiological dead space）の定義として正しいのはどれか。",
    options: [
      { id: "a", text: "換気はされるがガス交換が行われない肺胞（肺胞死腔）のみ" },
      { id: "b", text: "解剖学的死腔（気道の気体交換されない部分）のみ" },
      { id: "c", text: "解剖学的死腔＋肺胞死腔（換気されているがガス交換のない肺胞）の合計" },
      { id: "d", text: "全換気量から1回換気量を引いた量" },
    ],
    correctOptionId: "c",
    explanation:
      "生理的死腔（VD）= 解剖学的死腔（気管・気管支など約150mL）+ 肺胞死腔（換気あり・血流なし肺胞）。正常者ではほぼ解剖学的死腔のみ。肺塞栓などでは肺胞死腔が増加し生理的死腔が拡大する。",
    subject: "生理学",
    order: 5,
  },
  {
    id: "q-ph-4-6",
    lessonId: "physiology-4",
    text: "閉塞性換気障害（喘息・COPD）のスパイロメトリー所見として正しいのはどれか。",
    options: [
      { id: "a", text: "FEV₁/FVC比（一秒率）が70%以上に上昇する" },
      { id: "b", text: "FEV₁が低下し、FEV₁/FVC比が70%未満に低下する" },
      { id: "c", text: "FVCは増加し、FEV₁は正常を保つ" },
      { id: "d", text: "拘束性障害と同様の所見を示す" },
    ],
    correctOptionId: "b",
    explanation:
      "閉塞性：FEV₁低下・FEV₁/FVC＜70%（気道閉塞により早い呼出が困難）。拘束性（間質性肺炎・神経筋疾患など）：FVCが低下するがFEV₁/FVCは正常〜上昇（肺容量は小さいが気道は開通）。",
    subject: "生理学",
    order: 6,
  },
  {
    id: "q-ph-4-7",
    lessonId: "physiology-4",
    text: "COPDで高濃度酸素療法が危険な理由として正しいのはどれか。",
    options: [
      { id: "a", text: "高濃度O₂が血管拡張を引き起こし血圧が著しく低下するから" },
      { id: "b", text: "慢性高CO₂血症の患者では低O₂が呼吸ドライブの主因になっており、高濃度O₂投与でそのドライブが抑制されてCO₂貯留が悪化しうるから" },
      { id: "c", text: "高濃度O₂がサーファクタントを直接破壊するから" },
      { id: "d", text: "高濃度O₂が心拍数を著しく低下させるから" },
    ],
    correctOptionId: "b",
    explanation:
      "COPD慢性高CO₂血症患者では中枢化学受容体がCO₂に脱感作し、末梢化学受容体の低O₂シグナルが主要な呼吸ドライブとなることがある。高濃度O₂でこのドライブが消失→CO₂ナルコーシスのリスク。適切なO₂目標はSpO₂ 88〜92%。",
    subject: "生理学",
    order: 7,
  },
  {
    id: "q-ph-4-8",
    lessonId: "physiology-4",
    text: "気道抵抗を増大させる因子として正しいのはどれか。",
    options: [
      { id: "a", text: "β₂アドレナリン受容体刺激" },
      { id: "b", text: "深吸気（肺容量増加）" },
      { id: "c", text: "ヒスタミンによる気管支平滑筋収縮" },
      { id: "d", text: "副交感神経の抑制" },
    ],
    correctOptionId: "c",
    explanation:
      "ヒスタミン（H₁受容体）・アセチルコリン（M₃受容体）→気管支平滑筋収縮→気道抵抗増大。β₂刺激（気管支拡張）・深吸気（肺容量大→気道牽引力↑→気道径↑）→抵抗低下。喘息ではこれらが過剰に生じる。",
    subject: "生理学",
    order: 8,
  },

  // ── Lesson 5: 腎臓・内分泌生理 ──────────────────────────────────────────
  {
    id: "q-ph-5-1",
    lessonId: "physiology-5",
    text: "バソプレシン（ADH、抗利尿ホルモン）の主な作用はどれか。",
    options: [
      { id: "a", text: "集合管の水透過性を低下させ、水の排泄を促進する" },
      { id: "b", text: "集合管のV₂受容体に結合してAQP2（アクアポリン2）を管腔面に挿入し、水の再吸収を増加させる" },
      { id: "c", text: "近位尿細管でのナトリウム再吸収を直接促進する" },
      { id: "d", text: "糸球体濾過率（GFR）を低下させる" },
    ],
    correctOptionId: "b",
    explanation:
      "ADH（バソプレシン）は下垂体後葉から分泌→腎集合管のV₂受容体→Gs→cAMP↑→PKA→AQP2のリン酸化・管腔面への発現↑→水の再吸収増加→尿濃縮。分泌刺激：血漿浸透圧上昇・循環血液量低下。",
    subject: "生理学",
    order: 1,
  },
  {
    id: "q-ph-5-2",
    lessonId: "physiology-5",
    text: "アルドステロンの主な作用として正しいのはどれか。",
    options: [
      { id: "a", text: "遠位尿細管・集合管でNa⁺排泄を促進し、K⁺を再吸収する" },
      { id: "b", text: "遠位尿細管・集合管でNa⁺再吸収を促進し、K⁺・H⁺を排泄する" },
      { id: "c", text: "糸球体濾過率（GFR）を直接増加させる" },
      { id: "d", text: "近位尿細管でHCO₃⁻の再吸収を抑制する" },
    ],
    correctOptionId: "b",
    explanation:
      "アルドステロン（副腎皮質球状層→ミネラルコルチコイド）：遠位ネフロン・集合管の主細胞でNa⁺再吸収（管腔側ENaC・基底側Na-K ATPase増加）・K⁺排泄増加。過剰→低K血症・高Na血症・代謝性アルカローシス（H⁺も排泄）。",
    subject: "生理学",
    order: 2,
  },
  {
    id: "q-ph-5-3",
    lessonId: "physiology-5",
    text: "レニン—アンジオテンシン—アルドステロン系（RAAS）の活性化刺激として正しいのはどれか。",
    options: [
      { id: "a", text: "血圧上昇・循環血液量増加" },
      { id: "b", text: "腎血流量低下・傍糸球体細胞への交感神経刺激（β₁）・遠位尿細管のNaCl低下" },
      { id: "c", text: "血漿K⁺の低下" },
      { id: "d", text: "ANP（心房性Na利尿ペプチド）の増加" },
    ],
    correctOptionId: "b",
    explanation:
      "RAASの活性化：①腎灌流圧低下②交感神経β₁刺激③遠位尿細管NaCl低下→傍糸球体細胞からレニン放出→アンジオテンシノーゲン→AI→（ACE）→AII→①アルドステロン分泌②血管収縮③ADH放出③口渇感。ANPはRAASを拮抗し利尿を促進。",
    subject: "生理学",
    order: 3,
  },
  {
    id: "q-ph-5-4",
    lessonId: "physiology-5",
    text: "ヘンレ係蹄（ループ）の各部位と機能の組み合わせで正しいのはどれか。",
    options: [
      { id: "a", text: "下行脚：NaCl能動輸送で濃縮 ／ 上行脚：水の受動的再吸収" },
      { id: "b", text: "下行脚：水透過性高く水の受動的再吸収あり ／ 上行脚：NaClを能動輸送するが水透過性が低い（水の再吸収なし）" },
      { id: "c", text: "下行脚・上行脚ともに水とNaClを等しく再吸収する" },
      { id: "d", text: "下行脚：NaClと水の両方を能動輸送する ／ 上行脚：不活性" },
    ],
    correctOptionId: "b",
    explanation:
      "ヘンレ係蹄の対向流増幅機構：下行脚（水透過性高・NaCl輸送少）→水が浸透圧で間質へ→内液が濃縮。上行脚（水不透過・NaCl能動輸送）→NaClが間質へ→間質が高浸透圧。この仕組みで髄質の高浸透圧勾配が維持され尿濃縮が可能になる。",
    subject: "生理学",
    order: 4,
  },
  {
    id: "q-ph-5-5",
    lessonId: "physiology-5",
    text: "インスリンの作用として誤っているのはどれか。",
    options: [
      { id: "a", text: "筋肉・脂肪組織でのGLUT4発現促進によるグルコース取り込み増加" },
      { id: "b", text: "肝臓でのグリコーゲン合成促進・糖新生抑制" },
      { id: "c", text: "脂肪組織での脂肪合成促進・脂肪分解抑制" },
      { id: "d", text: "グルカゴン分泌の促進" },
    ],
    correctOptionId: "d",
    explanation:
      "インスリンはグルカゴン分泌を抑制する（グルカゴンは血糖上昇・インスリンと拮抗）。インスリンの主作用：血糖低下（GLUT4↑）・グリコーゲン合成↑・糖新生↓・タンパク合成↑・脂肪合成↑・脂肪分解↓・K⁺細胞内取り込み↑。",
    subject: "生理学",
    order: 5,
  },
  {
    id: "q-ph-5-6",
    lessonId: "physiology-5",
    text: "甲状腺ホルモン（T₃・T₄）の作用として正しいのはどれか。",
    options: [
      { id: "a", text: "基礎代謝を低下させる" },
      { id: "b", text: "心拍数を減少させ、心収縮力を低下させる" },
      { id: "c", text: "熱産生を増加させ、基礎代謝を亢進させる" },
      { id: "d", text: "タンパク合成を抑制する" },
    ],
    correctOptionId: "c",
    explanation:
      "甲状腺ホルモン（T₃が活性型）：基礎代謝↑・熱産生↑・心拍数↑・心収縮力↑・腸管蠕動↑・中枢神経興奮性↑・骨・タンパク合成促進（生理量）。甲状腺機能亢進症→頻脈・体重減少・発汗増加。",
    subject: "生理学",
    order: 6,
  },
  {
    id: "q-ph-5-7",
    lessonId: "physiology-5",
    text: "コルチゾール（糖質コルチコイド）の主な作用として正しいのはどれか。",
    options: [
      { id: "a", text: "血糖を低下させる" },
      { id: "b", text: "免疫・炎症反応を亢進させる" },
      { id: "c", text: "ストレス時に糖新生を促進して血糖を上昇させ、免疫・炎症反応を抑制する" },
      { id: "d", text: "腎臓でのNa⁺排泄を促進する" },
    ],
    correctOptionId: "c",
    explanation:
      "コルチゾール（副腎皮質束状層産生）：①糖新生↑→血糖上昇②タンパク異化↑③脂肪再分布（中心性肥満）④抗炎症・免疫抑制（PLA₂阻害→プロスタグランジン↓）⑤骨吸収↑。慢性過剰→クッシング症候群。",
    subject: "生理学",
    order: 7,
  },
  {
    id: "q-ph-5-8",
    lessonId: "physiology-5",
    text: "腎性貧血の原因となるホルモンの欠乏はどれか。",
    options: [
      { id: "a", text: "アルドステロン" },
      { id: "b", text: "バソプレシン（ADH）" },
      { id: "c", text: "エリスロポエチン（EPO）" },
      { id: "d", text: "アンジオテンシンII" },
    ],
    correctOptionId: "c",
    explanation:
      "EPO（エリスロポエチン）は主に腎臓の傍尿細管間質細胞から低酸素刺激で分泌され、骨髄での赤血球産生を促進する。慢性腎臓病（CKD）ではEPO産生低下→腎性貧血。rHuEPO製剤（ダルベポエチン等）が治療に用いられる。",
    subject: "生理学",
    order: 8,
  },
];

export const physiologyLessons: Lesson[] = [
  {
    id: "physiology-1",
    title: "生理学 — 細胞生理・膜電位",
    questionIds: [
      "q-ph-1-1", "q-ph-1-2", "q-ph-1-3", "q-ph-1-4",
      "q-ph-1-5", "q-ph-1-6", "q-ph-1-7", "q-ph-1-8",
    ],
    subject: "生理学",
    examTag: "医師国家試験",
    order: 6,
    orderInSubject: 1,
    level: 1,
  },
  {
    id: "physiology-2",
    title: "生理学 — 神経・筋生理",
    questionIds: [
      "q-ph-2-1", "q-ph-2-2", "q-ph-2-3", "q-ph-2-4",
      "q-ph-2-5", "q-ph-2-6", "q-ph-2-7", "q-ph-2-8",
    ],
    subject: "生理学",
    examTag: "医師国家試験",
    order: 7,
    orderInSubject: 2,
    level: 2,
  },
  {
    id: "physiology-3",
    title: "生理学 — 循環生理",
    questionIds: [
      "q-ph-3-1", "q-ph-3-2", "q-ph-3-3", "q-ph-3-4",
      "q-ph-3-5", "q-ph-3-6", "q-ph-3-7", "q-ph-3-8",
    ],
    subject: "生理学",
    examTag: "医師国家試験",
    order: 8,
    orderInSubject: 3,
    level: 3,
  },
  {
    id: "physiology-4",
    title: "生理学 — 呼吸生理",
    questionIds: [
      "q-ph-4-1", "q-ph-4-2", "q-ph-4-3", "q-ph-4-4",
      "q-ph-4-5", "q-ph-4-6", "q-ph-4-7", "q-ph-4-8",
    ],
    subject: "生理学",
    examTag: "医師国家試験",
    order: 9,
    orderInSubject: 4,
    level: 4,
  },
  {
    id: "physiology-5",
    title: "生理学 — 腎臓・内分泌生理",
    questionIds: [
      "q-ph-5-1", "q-ph-5-2", "q-ph-5-3", "q-ph-5-4",
      "q-ph-5-5", "q-ph-5-6", "q-ph-5-7", "q-ph-5-8",
    ],
    subject: "生理学",
    examTag: "医師国家試験",
    order: 10,
    orderInSubject: 5,
    level: 5,
  },
];
