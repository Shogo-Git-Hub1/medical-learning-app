import type { Question, Lesson } from "@/types";

/** 病理学 — 4レッスン・全32問 */
export const pathologyQuestions: Question[] = [

  // ── Lesson 1: 細胞障害・変性・壊死 ──────────────────────────────────────
  {
    id: "q-pa-1-1",
    lessonId: "pathology-1",
    text: "凝固壊死が起こりやすい臓器はどれか。",
    options: [
      { id: "a", text: "心臓・腎臓・脾臓" },
      { id: "b", text: "脳" },
      { id: "c", text: "膵臓" },
      { id: "d", text: "肺" },
    ],
    correctOptionId: "a",
    explanation:
      "凝固壊死は終末動脈支配臓器（心・腎・脾）で典型的。脳は液化壊死（リソソーム酵素が豊富）、膵臓は脂肪壊死（膵酵素漏出による脂肪分解）を起こしやすい。",
    subject: "病理学",
    order: 1,
  },
  {
    id: "q-pa-1-2",
    lessonId: "pathology-1",
    text: "アポトーシス（プログラム細胞死）の特徴として正しいのはどれか。",
    options: [
      { id: "a", text: "周囲に炎症反応を伴う" },
      { id: "b", text: "細胞膜の破壊と細胞内容物の放出が特徴的である" },
      { id: "c", text: "カスパーゼ活性化が主な実行機序で、周囲に炎症を伴わない" },
      { id: "d", text: "細胞が膨化（腫大）し、最終的に溶解する" },
    ],
    correctOptionId: "c",
    explanation:
      "アポトーシス：カスパーゼ活性化→DNA断片化（DNAラダー）→細胞の収縮・核の凝縮→アポトーシス小体形成→マクロファージが貪食→炎症なし。壊死は細胞膨化→細胞膜破壊→内容物放出→炎症反応あり。",
    subject: "病理学",
    order: 2,
  },
  {
    id: "q-pa-1-3",
    lessonId: "pathology-1",
    text: "脂肪変性（脂肪肝）が生じる原因として誤っているのはどれか。",
    options: [
      { id: "a", text: "アルコール過剰摂取" },
      { id: "b", text: "肥満・インスリン抵抗性（非アルコール性脂肪肝疾患, NAFLD）" },
      { id: "c", text: "タンパク質欠乏（クワシオルコル）" },
      { id: "d", text: "慢性有酸素運動" },
    ],
    correctOptionId: "d",
    explanation:
      "脂肪肝の原因：アルコール（最多）・肥満・糖尿病・タンパク欠乏（リポタンパク合成↓→脂質搬出↓）・薬物（メトトレキサート等）。有酸素運動は脂肪酸酸化を促進し脂肪肝の予防・改善に有効。",
    subject: "病理学",
    order: 3,
  },
  {
    id: "q-pa-1-4",
    lessonId: "pathology-1",
    text: "アミロイドーシスについて正しいのはどれか。",
    options: [
      { id: "a", text: "β-シートを含む正常タンパク質が細胞内に沈着する" },
      { id: "b", text: "β-シート構造をとる異常折り畳みタンパク質の細胞外沈着で、コンゴーレッド染色で橙赤色に染まる" },
      { id: "c", text: "偏光顕微鏡ではアップルグリーンの複屈折を示さない" },
      { id: "d", text: "アミロイドは炎症なしに体内で速やかに分解される" },
    ],
    correctOptionId: "b",
    explanation:
      "アミロイドはβ-シート構造の異常タンパク質で細胞外に不溶性線維として沈着。コンゴーレッド染色→橙赤色→偏光でアップルグリーン複屈折。AL型（免疫グロブリン軽鎖）・AA型（血清アミロイドA）・ATTR型（トランスサイレチン）など。",
    subject: "病理学",
    order: 4,
  },
  {
    id: "q-pa-1-5",
    lessonId: "pathology-1",
    text: "可逆的細胞障害（亜致死的障害）の特徴として正しいのはどれか。",
    options: [
      { id: "a", text: "核の濃縮（核濃縮）と崩壊が生じる" },
      { id: "b", text: "細胞膜の破壊（断裂）が起こる" },
      { id: "c", text: "細胞腫大（膨化）と小胞体・ミトコンドリアの腫大が生じるが、回復可能である" },
      { id: "d", text: "細胞が完全に融解（溶解）する" },
    ],
    correctOptionId: "c",
    explanation:
      "可逆的障害：ATP↓→Na-Kポンプ障害→細胞内Na↑・水↑→細胞腫大（cloudy swelling）・小器官腫大。不可逆的障害の徴候：細胞膜破壊・核濃縮（pyknosis）・核崩壊（karyorrhexis）・核融解（karyolysis）。",
    subject: "病理学",
    order: 5,
  },
  {
    id: "q-pa-1-6",
    lessonId: "pathology-1",
    text: "脳梗塞後に生じやすい壊死の型はどれか。",
    options: [
      { id: "a", text: "凝固壊死" },
      { id: "b", text: "液化壊死（融解壊死）" },
      { id: "c", text: "乾酪壊死" },
      { id: "d", text: "脂肪壊死" },
    ],
    correctOptionId: "b",
    explanation:
      "脳は液化壊死を起こしやすい（リソソーム酵素が豊富・脂質含有量が高い）。凝固壊死は心・腎・脾。乾酪壊死は結核の肉芽腫中心部。脂肪壊死は急性膵炎で膵酵素が脂肪を分解する際に生じる。",
    subject: "病理学",
    order: 6,
  },
  {
    id: "q-pa-1-7",
    lessonId: "pathology-1",
    text: "細胞の適応反応として正しいのはどれか。",
    options: [
      { id: "a", text: "萎縮（atrophy）は細胞数または細胞サイズの減少である" },
      { id: "b", text: "肥大（hypertrophy）は細胞数の増加のみで起こる" },
      { id: "c", text: "化生（metaplasia）は悪性腫瘍への転換を指す" },
      { id: "d", text: "過形成（hyperplasia）は常に病的な変化である" },
    ],
    correctOptionId: "a",
    explanation:
      "萎縮：細胞サイズ↓または細胞数↓。肥大：細胞サイズ↑（例：左室肥大）。過形成：細胞数↑（例：前立腺肥大症＝実際は過形成）。化生：ある分化型→別の分化型への変換（例：気管支の扁平上皮化生）で前癌状態になりうるが、それ自体は悪性ではない。",
    subject: "病理学",
    order: 7,
  },
  {
    id: "q-pa-1-8",
    lessonId: "pathology-1",
    text: "肉芽組織に含まれない細胞はどれか。",
    options: [
      { id: "a", text: "線維芽細胞" },
      { id: "b", text: "新生血管の内皮細胞" },
      { id: "c", text: "マクロファージ" },
      { id: "d", text: "赤血球" },
    ],
    correctOptionId: "d",
    explanation:
      "肉芽組織は線維芽細胞（コラーゲン産生）・新生血管内皮細胞・マクロファージなど炎症細胞からなる創傷修復組織。赤血球は血管内の細胞であり肉芽組織の構成要素ではない。",
    subject: "病理学",
    order: 8,
  },

  // ── Lesson 2: 炎症・修復・再生 ──────────────────────────────────────────
  {
    id: "q-pa-2-1",
    lessonId: "pathology-2",
    text: "急性炎症の組織所見として最も特徴的なのはどれか。",
    options: [
      { id: "a", text: "リンパ球・形質細胞の浸潤が主体" },
      { id: "b", text: "好中球浸潤が主体" },
      { id: "c", text: "肉芽腫形成" },
      { id: "d", text: "線維化（瘢痕形成）" },
    ],
    correctOptionId: "b",
    explanation:
      "急性炎症（数時間〜数日）：血管拡張・血管透過性亢進・好中球浸潤が主体。慢性炎症：リンパ球・マクロファージ・形質細胞浸潤・線維化。肉芽腫性炎：結核・サルコイドーシスなど。",
    subject: "病理学",
    order: 1,
  },
  {
    id: "q-pa-2-2",
    lessonId: "pathology-2",
    text: "肉芽腫性炎症を起こす疾患として誤っているのはどれか。",
    options: [
      { id: "a", text: "結核" },
      { id: "b", text: "サルコイドーシス" },
      { id: "c", text: "黄色ブドウ球菌による化膿性感染" },
      { id: "d", text: "クローン病" },
    ],
    correctOptionId: "c",
    explanation:
      "肉芽腫性炎症：結核・サルコイドーシス・クローン病・異物反応・真菌感染など。黄色ブドウ球菌感染は化膿性（好中球中心の）急性炎症を起こし、肉芽腫は形成しない。",
    subject: "病理学",
    order: 2,
  },
  {
    id: "q-pa-2-3",
    lessonId: "pathology-2",
    text: "創傷治癒の一次治癒（一期癒合）が最もよく起こる条件はどれか。",
    options: [
      { id: "a", text: "組織欠損が大きく感染がある創部" },
      { id: "b", text: "清潔で縁が接している手術創（縫合創）" },
      { id: "c", text: "熱傷で感染した広範囲の創" },
      { id: "d", text: "腹腔内の大きな膿瘍" },
    ],
    correctOptionId: "b",
    explanation:
      "一次治癒（一期癒合）：清潔・創縁が接合・組織欠損が最小→肉芽組織が少量で瘢痕が小さい。二次治癒（二期癒合）：組織欠損大・感染あり→肉芽組織の充填・創収縮→瘢痕が大きい。",
    subject: "病理学",
    order: 3,
  },
  {
    id: "q-pa-2-4",
    lessonId: "pathology-2",
    text: "炎症メディエーターのうち、血管透過性亢進に最も関与するのはどれか。",
    options: [
      { id: "a", text: "IL-8（CXCL8）" },
      { id: "b", text: "ヒスタミン・ブラジキニン" },
      { id: "c", text: "TNF-α" },
      { id: "d", text: "トロンビン" },
    ],
    correctOptionId: "b",
    explanation:
      "ヒスタミン（肥満細胞・好塩基球）・ブラジキニン（キニン系）→血管拡張・血管透過性↑→浮腫。IL-8は好中球の走化性因子。TNF-αは全身炎症反応・内皮活性化に関与。",
    subject: "病理学",
    order: 4,
  },
  {
    id: "q-pa-2-5",
    lessonId: "pathology-2",
    text: "ケロイドと肥厚性瘢痕の違いとして正しいのはどれか。",
    options: [
      { id: "a", text: "ケロイドは元の創傷範囲を超えて増殖し、再発しやすい" },
      { id: "b", text: "肥厚性瘢痕は元の創傷範囲を超えて増殖する" },
      { id: "c", text: "ケロイドは治療後に再発しない" },
      { id: "d", text: "両者は組織学的に区別できない同一の病態である" },
    ],
    correctOptionId: "a",
    explanation:
      "ケロイド：元の創傷範囲を超えてコラーゲンが過剰増殖し、切除後も再発しやすい。III型コラーゲンが多い。肥厚性瘢痕：元の創傷範囲内にとどまり、自然退縮傾向がある。",
    subject: "病理学",
    order: 5,
  },
  {
    id: "q-pa-2-6",
    lessonId: "pathology-2",
    text: "補体系の古典経路を活性化するのはどれか。",
    options: [
      { id: "a", text: "細菌表面のマンノースを認識するMBL（マンノース結合レクチン）" },
      { id: "b", text: "IgG/IgM抗体—抗原複合体（免疫複合体）" },
      { id: "c", text: "細菌表面に直接結合するC3b" },
      { id: "d", text: "エンドトキシン（LPS）のみ" },
    ],
    correctOptionId: "b",
    explanation:
      "古典経路：IgG/IgM抗体—抗原複合体→C1q結合→C1活性化。レクチン経路：MBL→MASP。副経路（第二経路）：C3のtick-over→C3b→細菌表面に結合。いずれもC3→C5→MAC（C5b-9）形成→細胞溶解。",
    subject: "病理学",
    order: 6,
  },
  {
    id: "q-pa-2-7",
    lessonId: "pathology-2",
    text: "慢性炎症の特徴として正しいのはどれか。",
    options: [
      { id: "a", text: "好中球主体の浸潤が特徴的" },
      { id: "b", text: "数日以内に解消する" },
      { id: "c", text: "リンパ球・マクロファージの浸潤、組織の線維化・破壊と修復の繰り返し" },
      { id: "d", text: "明確な組織壊死は生じない" },
    ],
    correctOptionId: "c",
    explanation:
      "慢性炎症：リンパ球（T/B細胞）・マクロファージ（単球由来）・形質細胞浸潤が主体。組織の破壊と修復が並行し、線維化（瘢痕化）を伴う。数週間〜数年間持続する。",
    subject: "病理学",
    order: 7,
  },
  {
    id: "q-pa-2-8",
    lessonId: "pathology-2",
    text: "線維芽細胞の主な機能として正しいのはどれか。",
    options: [
      { id: "a", text: "急性炎症の主要な炎症細胞として食作用を行う" },
      { id: "b", text: "コラーゲンと細胞外基質の合成・分泌を行い、創傷修復の主体となる" },
      { id: "c", text: "血液中を循環する血球の一種である" },
      { id: "d", text: "抗体（免疫グロブリン）を産生する" },
    ],
    correctOptionId: "b",
    explanation:
      "線維芽細胞（fibroblast）は結合組織の主要な細胞で、I型・III型コラーゲン・フィブロネクチン・プロテオグリカンなどの細胞外基質を合成・分泌。創傷治癒・瘢痕形成・線維化に中心的な役割。",
    subject: "病理学",
    order: 8,
  },

  // ── Lesson 3: 腫瘍総論 ──────────────────────────────────────────────────
  {
    id: "q-pa-3-1",
    lessonId: "pathology-3",
    text: "良性腫瘍と悪性腫瘍の違いとして正しいのはどれか。",
    options: [
      { id: "a", text: "良性腫瘍は転移（遠隔転移）をきたすことがある" },
      { id: "b", text: "悪性腫瘍（がん）は浸潤・転移を特徴とする" },
      { id: "c", text: "良性腫瘍はすべて生命予後に影響しない" },
      { id: "d", text: "悪性腫瘍は常に未分化（分化度が低い）" },
    ],
    correctOptionId: "b",
    explanation:
      "悪性腫瘍の特徴：浸潤性増殖・遠隔転移・核異型度が高い・分裂像多数。良性腫瘍は被膜に包まれ膨張性増殖→転移なし。ただし良性でも部位により生命に影響あり（例：脳腫瘍）。高分化型悪性腫瘍もある。",
    subject: "病理学",
    order: 1,
  },
  {
    id: "q-pa-3-2",
    lessonId: "pathology-3",
    text: "癌腫（carcinoma）と肉腫（sarcoma）の違いとして正しいのはどれか。",
    options: [
      { id: "a", text: "癌腫は間葉系組織由来の悪性腫瘍である" },
      { id: "b", text: "肉腫は上皮組織由来の悪性腫瘍である" },
      { id: "c", text: "癌腫は上皮組織由来、肉腫は間葉系組織由来の悪性腫瘍である" },
      { id: "d", text: "癌腫と肉腫の予後は同等である" },
    ],
    correctOptionId: "c",
    explanation:
      "癌腫（carcinoma）：上皮由来の悪性腫瘍（腺癌・扁平上皮癌・移行上皮癌など）。肉腫（sarcoma）：間葉系組織由来の悪性腫瘍（骨肉腫・平滑筋肉腫・脂肪肉腫など）。癌腫はリンパ行性転移、肉腫は血行性転移が多い。",
    subject: "病理学",
    order: 2,
  },
  {
    id: "q-pa-3-3",
    lessonId: "pathology-3",
    text: "がん抑制遺伝子TP53（p53）の役割として正しいのはどれか。",
    options: [
      { id: "a", text: "細胞増殖を促進するがん遺伝子（proto-oncogene）" },
      { id: "b", text: "DNA損傷時に細胞周期停止・DNA修復・アポトーシスを誘導するがん抑制遺伝子" },
      { id: "c", text: "血管新生を専ら促進する" },
      { id: "d", text: "免疫回避に特化した機能をもつ" },
    ],
    correctOptionId: "b",
    explanation:
      "p53は「ゲノムの守護者」と呼ばれるがん抑制遺伝子。DNA損傷→p53活性化→①G1/S停止（p21発現）②DNA修復③修復不能→アポトーシス。ヒト癌の約50%でTP53の変異がある。Li-Fraumeni症候群はTP53の生殖細胞系変異。",
    subject: "病理学",
    order: 3,
  },
  {
    id: "q-pa-3-4",
    lessonId: "pathology-3",
    text: "転移に関して正しいのはどれか。",
    options: [
      { id: "a", text: "リンパ行性転移は主に肉腫で起こる" },
      { id: "b", text: "血行性転移では肺・肝・骨・脳が好発部位である" },
      { id: "c", text: "腹膜播種は血行性転移の一種である" },
      { id: "d", text: "良性腫瘍も頻繁に転移をきたす" },
    ],
    correctOptionId: "b",
    explanation:
      "血行性転移好発部位：肺（門脈→肝→肺、静脈→肺）・肝（消化管癌）・骨・脳。癌腫はリンパ行性転移が多く、肉腫は血行性転移が多い。腹膜播種は癌が腹膜面に直接広がる経路で、胃癌・卵巣癌に多い。",
    subject: "病理学",
    order: 4,
  },
  {
    id: "q-pa-3-5",
    lessonId: "pathology-3",
    text: "腫瘍マーカーの組み合わせで正しいのはどれか。",
    options: [
      { id: "a", text: "AFP（α-フェトプロテイン）— 前立腺癌" },
      { id: "b", text: "PSA（前立腺特異抗原）— 前立腺癌" },
      { id: "c", text: "CEA（癌胎児性抗原）— 肝細胞癌" },
      { id: "d", text: "CA125 — 大腸癌" },
    ],
    correctOptionId: "b",
    explanation:
      "PSA→前立腺癌。AFP→肝細胞癌・卵黄嚢腫瘍。CEA→消化管癌（大腸癌）。CA125→卵巣癌。CA19-9→膵癌・胆道癌。hCG→絨毛癌・精巣腫瘍。腫瘍マーカーは診断補助・治療効果判定・再発監視に使用。",
    subject: "病理学",
    order: 5,
  },
  {
    id: "q-pa-3-6",
    lessonId: "pathology-3",
    text: "TNM分類のNが示すのはどれか。",
    options: [
      { id: "a", text: "腫瘍の大きさと局在（Tumor）" },
      { id: "b", text: "所属リンパ節転移の有無と程度（Node）" },
      { id: "c", text: "遠隔転移の有無（Metastasis）" },
      { id: "d", text: "壊死の範囲（Necrosis）" },
    ],
    correctOptionId: "b",
    explanation:
      "TNM分類：T（Tumor）＝原発腫瘍の大きさ・浸潤度、N（Node）＝所属リンパ節転移の有無・程度、M（Metastasis）＝遠隔転移の有無。これらからStage（I〜IV）が決定される。",
    subject: "病理学",
    order: 6,
  },
  {
    id: "q-pa-3-7",
    lessonId: "pathology-3",
    text: "がん遺伝子（oncogene）について正しいのはどれか。",
    options: [
      { id: "a", text: "がん遺伝子は正常細胞には存在しない" },
      { id: "b", text: "正常な原がん遺伝子（proto-oncogene）の変異・過剰発現→機能獲得→がん遺伝子となる" },
      { id: "c", text: "がん抑制遺伝子と同じ機能を持つ" },
      { id: "d", text: "がん遺伝子は細胞増殖を抑制する" },
    ],
    correctOptionId: "b",
    explanation:
      "原がん遺伝子は正常細胞の増殖・分化に必要な遺伝子。点変異・増幅・転座→機能獲得型変異→がん遺伝子（RAS、MYC、HER2/ErbB2、BCR-ABLなど）。1つのアレルの変異で活性化（dominant）。がん抑制遺伝子は両アレルの不活化が必要（two-hit仮説）。",
    subject: "病理学",
    order: 7,
  },
  {
    id: "q-pa-3-8",
    lessonId: "pathology-3",
    text: "急性白血病について正しいのはどれか。",
    options: [
      { id: "a", text: "骨髄中に成熟した血球が増加する" },
      { id: "b", text: "芽球（blast）が骨髄で増殖し、正常造血が抑制される" },
      { id: "c", text: "慢性白血病より一般的に予後が良い" },
      { id: "d", text: "骨髄性白血病はB/T細胞由来である" },
    ],
    correctOptionId: "b",
    explanation:
      "急性白血病：分化停止した芽球が骨髄で異常増殖→正常造血の場を占拠→汎血球減少（貧血・感染・出血）。AML（骨髄性）はMPO染色陽性。ALL（リンパ性）は小児に多い。慢性白血病は成熟血球が増加する。",
    subject: "病理学",
    order: 8,
  },

  // ── Lesson 4: 循環障害 ──────────────────────────────────────────────────
  {
    id: "q-pa-4-1",
    lessonId: "pathology-4",
    text: "血栓形成の3要因（ウィルヒョウの3徴候）に含まれないのはどれか。",
    options: [
      { id: "a", text: "血管内皮障害" },
      { id: "b", text: "血流の変化（うっ滞・乱流）" },
      { id: "c", text: "血液凝固能の亢進" },
      { id: "d", text: "低酸素血症" },
    ],
    correctOptionId: "d",
    explanation:
      "Virchow三徴候（血栓形成の3要因）：①血管内皮障害②血流異常（うっ滞・乱流）③凝固能亢進（過凝固状態）。低酸素血症は直接の3要因には含まれないが、内皮障害の原因にはなりうる。",
    subject: "病理学",
    order: 1,
  },
  {
    id: "q-pa-4-2",
    lessonId: "pathology-4",
    text: "出血性（赤色）梗塞が起こりやすい臓器はどれか。",
    options: [
      { id: "a", text: "心臓（冠動脈閉塞）" },
      { id: "b", text: "腎臓" },
      { id: "c", text: "肺（二重血行支配がある）" },
      { id: "d", text: "脾臓" },
    ],
    correctOptionId: "c",
    explanation:
      "赤色（出血性）梗塞：二重血行支配（肺動脈＋気管支動脈）や側副血行がある臓器（肺・腸管）、静脈閉塞後に生じやすい。白色（貧血性）梗塞：終末動脈支配（心・腎・脾）で側副血行が乏しい臓器に起こる。",
    subject: "病理学",
    order: 2,
  },
  {
    id: "q-pa-4-3",
    lessonId: "pathology-4",
    text: "敗血症性ショックが分類されるのはどれか。",
    options: [
      { id: "a", text: "心原性ショック" },
      { id: "b", text: "閉塞性ショック" },
      { id: "c", text: "血液分布異常性ショック（distributive shock）" },
      { id: "d", text: "循環血液量減少性ショック" },
    ],
    correctOptionId: "c",
    explanation:
      "ショックの分類：①心原性（心筋梗塞・心不全）②循環血液量減少性（出血・脱水）③血液分布異常性（敗血症・アナフィラキシー・神経原性→末梢血管拡張）④閉塞性（肺塞栓・緊張性気胸・心タンポナーデ）。",
    subject: "病理学",
    order: 3,
  },
  {
    id: "q-pa-4-4",
    lessonId: "pathology-4",
    text: "播種性血管内凝固（DIC）について正しいのはどれか。",
    options: [
      { id: "a", text: "凝固因子のみが消費され、血小板は保たれる" },
      { id: "b", text: "全身の微小血管内で凝固が進み、凝固因子・血小板が消費されて出血傾向が生じる" },
      { id: "c", text: "FDP/D-ダイマーは低下する" },
      { id: "d", text: "血小板数は増加する" },
    ],
    correctOptionId: "b",
    explanation:
      "DIC：基礎疾患（敗血症・悪性腫瘍・産科合併症など）→全身の微小血管内凝固→凝固因子・血小板が消費（消費性凝固障害）→出血傾向。フィブリン分解産物（FDP/D-dimer）は上昇する。",
    subject: "病理学",
    order: 4,
  },
  {
    id: "q-pa-4-5",
    lessonId: "pathology-4",
    text: "アテローム動脈硬化の最も初期の病変はどれか。",
    options: [
      { id: "a", text: "線維性プラーク（fibrous plaque）" },
      { id: "b", text: "中膜石灰化（メンケベルグ型）" },
      { id: "c", text: "脂肪線条（fatty streak）" },
      { id: "d", text: "複合病変（complicated lesion）" },
    ],
    correctOptionId: "c",
    explanation:
      "アテローム硬化の進行：脂肪線条（最初期。マクロファージ由来の泡沫細胞が集簇）→線維性プラーク（脂質コアを線維性被膜が覆う）→複合病変（石灰化・血栓・出血・潰瘍形成）。メンケベルグ型は中膜の石灰化でアテロームとは異なる。",
    subject: "病理学",
    order: 5,
  },
  {
    id: "q-pa-4-6",
    lessonId: "pathology-4",
    text: "高血圧によって細動脈に見られる特徴的病変はどれか。",
    options: [
      { id: "a", text: "粥状硬化（アテローム硬化）" },
      { id: "b", text: "細動脈硬化（硝子様変性）" },
      { id: "c", text: "血管炎" },
      { id: "d", text: "動脈瘤形成" },
    ],
    correctOptionId: "b",
    explanation:
      "良性高血圧→細動脈壁に血漿蛋白が沈着→硝子様変性（hyaline arteriolosclerosis）。腎細動脈に好発→腎硬化症。悪性高血圧→増殖性（onion-skin）細動脈硬化→急速な腎機能障害。",
    subject: "病理学",
    order: 6,
  },
  {
    id: "q-pa-4-7",
    lessonId: "pathology-4",
    text: "肺血栓塞栓症の血栓の主な起源はどれか。",
    options: [
      { id: "a", text: "左心室内血栓" },
      { id: "b", text: "頸動脈の血栓" },
      { id: "c", text: "下肢の深部静脈血栓（DVT）" },
      { id: "d", text: "腸間膜静脈" },
    ],
    correctOptionId: "c",
    explanation:
      "肺塞栓の血栓はほぼ全例が下肢深部静脈血栓（DVT：大腿〜下腿）由来。DVTの危険因子：長期臥床・手術後・骨折・悪性腫瘍・妊娠・経口避妊薬・凝固異常症など（Virchow三徴候に対応）。",
    subject: "病理学",
    order: 7,
  },
  {
    id: "q-pa-4-8",
    lessonId: "pathology-4",
    text: "左心不全による慢性肺うっ血の病理所見として正しいのはどれか。",
    options: [
      { id: "a", text: "肺胞内への好中球浸潤（肺炎像）" },
      { id: "b", text: "蜂巣肺（honeycomb lung）" },
      { id: "c", text: "肺胞内への赤血球漏出とヘモジデリン貪食マクロファージ（心不全細胞）の出現" },
      { id: "d", text: "肺胞壁の壊死と空洞形成" },
    ],
    correctOptionId: "c",
    explanation:
      "左心不全→肺静脈圧上昇→肺うっ血→赤血球が肺胞内へ漏出→マクロファージが貪食しヘモジデリン沈着→心不全細胞（siderophage / heart failure cell）。Berlin blue染色で鉄（ヘモジデリン）が青染される。",
    subject: "病理学",
    order: 8,
  },
];

export const pathologyLessons: Lesson[] = [
  {
    id: "pathology-1",
    title: "病理学 — 細胞障害・変性・壊死",
    questionIds: [
      "q-pa-1-1", "q-pa-1-2", "q-pa-1-3", "q-pa-1-4",
      "q-pa-1-5", "q-pa-1-6", "q-pa-1-7", "q-pa-1-8",
    ],
    subject: "病理学",
    examTag: "医師国家試験",
    order: 15,
    orderInSubject: 1,
    level: 1,
  },
  {
    id: "pathology-2",
    title: "病理学 — 炎症・修復・再生",
    questionIds: [
      "q-pa-2-1", "q-pa-2-2", "q-pa-2-3", "q-pa-2-4",
      "q-pa-2-5", "q-pa-2-6", "q-pa-2-7", "q-pa-2-8",
    ],
    subject: "病理学",
    examTag: "医師国家試験",
    order: 16,
    orderInSubject: 2,
    level: 2,
  },
  {
    id: "pathology-3",
    title: "病理学 — 腫瘍総論",
    questionIds: [
      "q-pa-3-1", "q-pa-3-2", "q-pa-3-3", "q-pa-3-4",
      "q-pa-3-5", "q-pa-3-6", "q-pa-3-7", "q-pa-3-8",
    ],
    subject: "病理学",
    examTag: "医師国家試験",
    order: 17,
    orderInSubject: 3,
    level: 3,
  },
  {
    id: "pathology-4",
    title: "病理学 — 循環障害",
    questionIds: [
      "q-pa-4-1", "q-pa-4-2", "q-pa-4-3", "q-pa-4-4",
      "q-pa-4-5", "q-pa-4-6", "q-pa-4-7", "q-pa-4-8",
    ],
    subject: "病理学",
    examTag: "医師国家試験",
    order: 18,
    orderInSubject: 4,
    level: 4,
  },
];
