import type { Question, Lesson } from "@/types";

/** 解剖学 — 5レッスン・全50問 */
export const anatomyQuestions: Question[] = [

  // ── Lesson 1: 骨格系・関節 ────────────────────────────────────────────────
  {
    id: "q-an-1-1",
    lessonId: "anatomy-1",
    text: "ヒトの骨格で骨の数が最も多い部位はどれか。",
    options: [
      { id: "a", text: "頭蓋" },
      { id: "b", text: "手（手根骨・中手骨・指骨を含む）" },
      { id: "c", text: "脊柱" },
      { id: "d", text: "足（足根骨・中足骨・趾骨を含む）" },
    ],
    correctOptionId: "b",
    explanation:
      "片手は27個の骨からなる（手根骨8・中手骨5・指骨14）。足は26個と手より少ない。頭蓋は22個、脊柱は椎骨26個。",
    subject: "解剖学",
    order: 1,
  },
  {
    id: "q-an-1-2",
    lessonId: "anatomy-1",
    text: "脊柱の各部位の椎骨の数の組み合わせとして正しいのはどれか。",
    options: [
      { id: "a", text: "頸椎7個・胸椎12個・腰椎5個" },
      { id: "b", text: "頸椎6個・胸椎12個・腰椎5個" },
      { id: "c", text: "頸椎7個・胸椎10個・腰椎5個" },
      { id: "d", text: "頸椎7個・胸椎12個・腰椎4個" },
    ],
    correctOptionId: "a",
    explanation:
      "脊柱は頸椎7・胸椎12・腰椎5・仙椎（1つに癒合）・尾椎から構成される。頸椎7個は国試頻出。",
    subject: "解剖学",
    order: 2,
  },
  {
    id: "q-an-1-3",
    lessonId: "anatomy-1",
    text: "橈骨手根関節（手関節）の分類として正しいのはどれか。",
    options: [
      { id: "a", text: "球関節" },
      { id: "b", text: "楕円関節" },
      { id: "c", text: "鞍関節" },
      { id: "d", text: "蝶番関節" },
    ],
    correctOptionId: "b",
    explanation:
      "橈骨手根関節は楕円関節（顆状関節）で、屈伸・外転・内転の2軸運動が可能。球関節は肩・股関節。鞍関節は母指の手根中手関節。",
    subject: "解剖学",
    order: 3,
  },
  {
    id: "q-an-1-4",
    lessonId: "anatomy-1",
    text: "脊柱で最も可動性が大きい部位はどれか。",
    options: [
      { id: "a", text: "頸椎" },
      { id: "b", text: "胸椎" },
      { id: "c", text: "腰椎" },
      { id: "d", text: "仙椎" },
    ],
    correctOptionId: "a",
    explanation:
      "頸椎は回旋・屈伸・側屈のすべてで可動性が大きい。胸椎は肋骨との関節で動きが制限される。仙椎は仙骨として癒合し不動。",
    subject: "解剖学",
    order: 4,
  },
  {
    id: "q-an-1-5",
    lessonId: "anatomy-1",
    text: "横突孔をもつ椎骨はどれか。",
    options: [
      { id: "a", text: "胸椎" },
      { id: "b", text: "頸椎" },
      { id: "c", text: "腰椎" },
      { id: "d", text: "仙椎" },
    ],
    correctOptionId: "b",
    explanation:
      "頸椎の横突孔には椎骨動脈・椎骨静脈が通過する。胸椎には肋骨窩（肋骨頭関節面）がある。腰椎には横突孔も肋骨窩もない。",
    subject: "解剖学",
    order: 5,
  },
  {
    id: "q-an-1-6",
    lessonId: "anatomy-1",
    text: "肩関節の安定性を保つ回旋筋腱板（ローテーターカフ）に含まれないのはどれか。",
    options: [
      { id: "a", text: "棘上筋" },
      { id: "b", text: "棘下筋" },
      { id: "c", text: "大円筋" },
      { id: "d", text: "肩甲下筋" },
    ],
    correctOptionId: "c",
    explanation:
      "ローテーターカフは棘上筋・棘下筋・小円筋・肩甲下筋の4筋からなる。大円筋は肩甲骨下角から上腕骨に付着するが、腱板には含まれない。",
    subject: "解剖学",
    order: 6,
  },
  {
    id: "q-an-1-7",
    lessonId: "anatomy-1",
    text: "膝関節について正しいのはどれか。",
    options: [
      { id: "a", text: "内側側副靭帯（MCL）は内側半月板に付着しない" },
      { id: "b", text: "前十字靭帯（ACL）は大腿骨外側顆から脛骨前方に走る" },
      { id: "c", text: "後十字靭帯（PCL）は前十字靭帯より薄く弱い" },
      { id: "d", text: "外側側副靭帯（LCL）は外側半月板に付着する" },
    ],
    correctOptionId: "b",
    explanation:
      "ACLは大腿骨外側顆内面→脛骨前方（前十字）。PCLは大腿骨内側顆→脛骨後方。MCLは内側半月板に付着するため、MCL損傷に半月板損傷を伴いやすい。LCLは半月板に付着しない。",
    subject: "解剖学",
    order: 7,
  },
  {
    id: "q-an-1-8",
    lessonId: "anatomy-1",
    text: "関節軟骨の特徴として正しいのはどれか。",
    options: [
      { id: "a", text: "豊富な血管網をもつ" },
      { id: "b", text: "知覚神経終末が多い" },
      { id: "c", text: "血管・神経ともに乏しく、基質からの拡散で栄養される" },
      { id: "d", text: "線維芽細胞が主な構成細胞である" },
    ],
    correctOptionId: "c",
    explanation:
      "関節軟骨は無血管・無神経構造。軟骨細胞は周囲の基質（II型コラーゲン・プロテオグリカン）からの拡散で栄養される。主な構成細胞は軟骨細胞。",
    subject: "解剖学",
    order: 8,
  },
  {
    id: "q-an-1-9",
    lessonId: "anatomy-1",
    text: "成人において赤色骨髄が残存している部位として適切なのはどれか。",
    options: [
      { id: "a", text: "大腿骨骨幹部" },
      { id: "b", text: "上腕骨骨幹部" },
      { id: "c", text: "胸骨" },
      { id: "d", text: "橈骨骨幹部" },
    ],
    correctOptionId: "c",
    explanation:
      "成人では長管骨の骨幹部の赤色骨髄は黄色骨髄（脂肪）に置き換わる。胸骨・椎骨・骨盤・肋骨・頭蓋扁平骨には赤色骨髄が残存し、造血が続く。",
    subject: "解剖学",
    order: 9,
  },
  {
    id: "q-an-1-10",
    lessonId: "anatomy-1",
    text: "骨のリモデリング（改築）に関して正しいのはどれか。",
    options: [
      { id: "a", text: "破骨細胞が骨形成を行い、骨芽細胞が骨吸収を行う" },
      { id: "b", text: "骨芽細胞が骨形成を行い、破骨細胞が骨吸収を行う" },
      { id: "c", text: "軟骨細胞が骨形成と骨吸収の両方を行う" },
      { id: "d", text: "骨芽細胞が骨形成と骨吸収の両方を行う" },
    ],
    correctOptionId: "b",
    explanation:
      "骨芽細胞（osteoblast）がコラーゲン基質・骨塩を産生して骨形成。破骨細胞（osteoclast）が酸・プロテアーゼで骨基質を溶解・吸収。このカップリングで骨量が調節される。",
    subject: "解剖学",
    order: 10,
  },

  // ── Lesson 2: 神経系 ─────────────────────────────────────────────────────
  {
    id: "q-an-2-1",
    lessonId: "anatomy-2",
    text: "大脳の一次運動野が存在する脳葉はどれか。",
    options: [
      { id: "a", text: "前頭葉（中心前回）" },
      { id: "b", text: "頭頂葉（中心後回）" },
      { id: "c", text: "側頭葉" },
      { id: "d", text: "後頭葉" },
    ],
    correctOptionId: "a",
    explanation:
      "一次運動野（Brodmann 4野）は前頭葉の中心前回に位置し、随意運動の指令を出す。中心後回（頭頂葉）は一次体性感覚野（Brodmann 3,1,2野）。",
    subject: "解剖学",
    order: 1,
  },
  {
    id: "q-an-2-2",
    lessonId: "anatomy-2",
    text: "大脳基底核に含まれないのはどれか。",
    options: [
      { id: "a", text: "尾状核" },
      { id: "b", text: "被殻" },
      { id: "c", text: "淡蒼球" },
      { id: "d", text: "小脳歯状核" },
    ],
    correctOptionId: "d",
    explanation:
      "大脳基底核は線条体（尾状核＋被殻）・淡蒼球・視床下核・黒質からなる。歯状核は小脳深部核であり、大脳基底核には含まれない。",
    subject: "解剖学",
    order: 2,
  },
  {
    id: "q-an-2-3",
    lessonId: "anatomy-2",
    text: "内包（internal capsule）を通過する主な神経線維はどれか。",
    options: [
      { id: "a", text: "視交叉線維" },
      { id: "b", text: "皮質脊髄路（錐体路）" },
      { id: "c", text: "脊髄視床路" },
      { id: "d", text: "薄束・楔状束" },
    ],
    correctOptionId: "b",
    explanation:
      "皮質脊髄路（錐体路）は内包後脚を通過する。内包には皮質延髄路・視放線なども通る。脊髄視床路は脊髄内を上行し視床へ投射する。",
    subject: "解剖学",
    order: 3,
  },
  {
    id: "q-an-2-4",
    lessonId: "anatomy-2",
    text: "眼球を外転（外側方向へ動かす）させる脳神経はどれか。",
    options: [
      { id: "a", text: "動眼神経（III）" },
      { id: "b", text: "滑車神経（IV）" },
      { id: "c", text: "外転神経（VI）" },
      { id: "d", text: "三叉神経（V）" },
    ],
    correctOptionId: "c",
    explanation:
      "外転神経（VI）は外側直筋のみを支配し、眼球を外転させる。動眼神経（III）は上直・下直・内直・下斜筋と上眼瞼挙筋を支配。滑車神経（IV）は上斜筋を支配。",
    subject: "解剖学",
    order: 4,
  },
  {
    id: "q-an-2-5",
    lessonId: "anatomy-2",
    text: "迷走神経（X）が支配しない臓器はどれか。",
    options: [
      { id: "a", text: "心臓" },
      { id: "b", text: "肺" },
      { id: "c", text: "膀胱" },
      { id: "d", text: "小腸" },
    ],
    correctOptionId: "c",
    explanation:
      "迷走神経は胸腹部内臓（横行結腸まで）の副交感神経支配を担う。膀胱・直腸・生殖器は仙髄（S2〜S4）由来の骨盤神経が支配する。",
    subject: "解剖学",
    order: 5,
  },
  {
    id: "q-an-2-6",
    lessonId: "anatomy-2",
    text: "上位運動ニューロン障害と下位運動ニューロン障害の組み合わせで正しいのはどれか。",
    options: [
      { id: "a", text: "上位：弛緩性麻痺・腱反射低下 ／ 下位：痙性麻痺・腱反射亢進" },
      { id: "b", text: "上位：痙性麻痺・腱反射亢進 ／ 下位：弛緩性麻痺・腱反射低下・筋萎縮" },
      { id: "c", text: "上位：筋萎縮著明 ／ 下位：病的反射出現" },
      { id: "d", text: "上位・下位ともに同様の所見を示す" },
    ],
    correctOptionId: "b",
    explanation:
      "上位ニューロン障害（脳・脊髄）→痙性麻痺・腱反射亢進・病的反射（バビンスキー徴候）。下位ニューロン障害（脊髄前角・末梢神経）→弛緩性麻痺・腱反射低下・筋萎縮・線維束性収縮。",
    subject: "解剖学",
    order: 6,
  },
  {
    id: "q-an-2-7",
    lessonId: "anatomy-2",
    text: "運動性言語野（ブローカ野）が存在する部位はどれか。",
    options: [
      { id: "a", text: "左側頭葉上部（上側頭回）" },
      { id: "b", text: "左前頭葉下部（下前頭回）" },
      { id: "c", text: "右頭頂葉" },
      { id: "d", text: "左後頭葉" },
    ],
    correctOptionId: "b",
    explanation:
      "ブローカ野（Brodmann 44,45野）は左下前頭回にあり、言語の産出（発話）を担う。ウェルニッケ野（言語理解）は左上側頭回後部。右利き者の約95%で言語優位半球は左。",
    subject: "解剖学",
    order: 7,
  },
  {
    id: "q-an-2-8",
    lessonId: "anatomy-2",
    text: "硬膜下血腫の最も多い出血源はどれか。",
    options: [
      { id: "a", text: "中硬膜動脈の損傷" },
      { id: "b", text: "架橋静脈の断裂" },
      { id: "c", text: "脳動脈瘤の破裂" },
      { id: "d", text: "硬膜静脈洞の損傷" },
    ],
    correctOptionId: "b",
    explanation:
      "硬膜下血腫は硬膜と脳表面の間（硬膜下腔）に生じ、脳表から硬膜静脈洞へ走る架橋静脈（bridging vein）の断裂が最多原因。中硬膜動脈損傷は硬膜外血腫を起こす。",
    subject: "解剖学",
    order: 8,
  },
  {
    id: "q-an-2-9",
    lessonId: "anatomy-2",
    text: "体性感覚の一次ニューロン（受容器〜中枢）の細胞体が存在する部位はどれか。",
    options: [
      { id: "a", text: "脊髄後角" },
      { id: "b", text: "後根神経節（脊髄神経節）" },
      { id: "c", text: "視床" },
      { id: "d", text: "大脳皮質" },
    ],
    correctOptionId: "b",
    explanation:
      "体性感覚の一次ニューロンの細胞体は後根神経節（DRG）にある。軸索は末梢側が受容器へ、中枢側が脊髄に入る。二次ニューロンは脊髄後角または延髄核。",
    subject: "解剖学",
    order: 9,
  },
  {
    id: "q-an-2-10",
    lessonId: "anatomy-2",
    text: "後索（背側索）を上行する感覚として正しいのはどれか。",
    options: [
      { id: "a", text: "痛覚・温度覚" },
      { id: "b", text: "精細触覚・振動覚・深部感覚（位置覚）" },
      { id: "c", text: "粗大触覚" },
      { id: "d", text: "内臓感覚" },
    ],
    correctOptionId: "b",
    explanation:
      "後索—内側毛帯路は精細触覚・振動覚・深部感覚（固有受容）を同側後索で上行し延髄で交叉。痛覚・温度覚は脊髄視床路（前外側索）で対側に交叉して上行。",
    subject: "解剖学",
    order: 10,
  },

  // ── Lesson 3: 循環器系・呼吸器系 ─────────────────────────────────────────
  {
    id: "q-an-3-1",
    lessonId: "anatomy-3",
    text: "房室弁の位置として正しいのはどれか。",
    options: [
      { id: "a", text: "左心室と大動脈の間、右心室と肺動脈の間" },
      { id: "b", text: "左心房と左心室の間（僧帽弁）、右心房と右心室の間（三尖弁）" },
      { id: "c", text: "大静脈と右心房の間" },
      { id: "d", text: "肺静脈と左心房の間" },
    ],
    correctOptionId: "b",
    explanation:
      "房室弁は心房—心室間に存在。左は僧帽弁（二尖弁）、右は三尖弁（三尖弁）。大血管との間にあるのは半月弁（大動脈弁・肺動脈弁）。",
    subject: "解剖学",
    order: 1,
  },
  {
    id: "q-an-3-2",
    lessonId: "anatomy-3",
    text: "横隔膜の大動脈裂孔（第12胸椎高さ）を通過するのはどれか。",
    options: [
      { id: "a", text: "食道と迷走神経" },
      { id: "b", text: "大動脈と胸管" },
      { id: "c", text: "下大静脈" },
      { id: "d", text: "奇静脈のみ" },
    ],
    correctOptionId: "b",
    explanation:
      "横隔膜の3大開口：①食道裂孔（T10）：食道・迷走神経、②大動脈裂孔（T12）：大動脈・胸管、③大静脈孔（T8）：下大静脈。「食道10・大動脈12・大静脈8」と覚える。",
    subject: "解剖学",
    order: 2,
  },
  {
    id: "q-an-3-3",
    lessonId: "anatomy-3",
    text: "右冠動脈について正しいのはどれか。",
    options: [
      { id: "a", text: "右冠動脈は右房室間溝を走行し、洞房結節・房室結節を栄養することが多い" },
      { id: "b", text: "右冠動脈は左心室前壁を主に栄養する" },
      { id: "c", text: "右冠動脈は大動脈左冠尖（左洞）から分岐する" },
      { id: "d", text: "右冠動脈の閉塞では前壁梗塞が最多である" },
    ],
    correctOptionId: "a",
    explanation:
      "右冠動脈は大動脈右冠尖（右洞）から分岐し、右房室間溝を走行。洞房結節（約60%）・房室結節（約80%）を栄養。左前下行枝（LAD）が左室前壁・心室中隔を栄養。",
    subject: "解剖学",
    order: 3,
  },
  {
    id: "q-an-3-4",
    lessonId: "anatomy-3",
    text: "肺の葉構成について正しいのはどれか。",
    options: [
      { id: "a", text: "右肺は2葉（上葉・下葉）に分かれている" },
      { id: "b", text: "左肺は3葉（上葉・中葉・下葉）に分かれている" },
      { id: "c", text: "右肺は3葉（上葉・中葉・下葉）、左肺は2葉（上葉・下葉）に分かれている" },
      { id: "d", text: "両肺の葉数は同じである" },
    ],
    correctOptionId: "c",
    explanation:
      "右肺：上葉・中葉・下葉の3葉（10区域）。左肺：上葉・下葉の2葉（8〜9区域）。左肺は心臓があるため容積が小さく、中葉に相当する部分を舌区（S4,S5）という。",
    subject: "解剖学",
    order: 4,
  },
  {
    id: "q-an-3-5",
    lessonId: "anatomy-3",
    text: "右主気管支について正しいのはどれか。",
    options: [
      { id: "a", text: "右主気管支は左主気管支より長く細い" },
      { id: "b", text: "右主気管支は左主気管支より太く短く、垂直方向に近い角度で分岐する" },
      { id: "c", text: "気管分岐部（カリーナ）は第3胸椎の高さにある" },
      { id: "d", text: "異物誤嚥では左主気管支に入りやすい" },
    ],
    correctOptionId: "b",
    explanation:
      "右主気管支は太く短く（約2.5cm）、気管からの分岐角度が小さい（直線的）ため、異物誤嚥時に右側に入りやすい。気管分岐部（カリーナ）は胸骨角（第4〜5胸椎）の高さ。",
    subject: "解剖学",
    order: 5,
  },
  {
    id: "q-an-3-6",
    lessonId: "anatomy-3",
    text: "肺循環について正しいのはどれか。",
    options: [
      { id: "a", text: "肺動脈には酸素に富んだ動脈血が流れる" },
      { id: "b", text: "肺静脈には静脈血（酸素の少ない血液）が流れる" },
      { id: "c", text: "肺動脈弁は右心室と肺動脈の間に位置する" },
      { id: "d", text: "肺毛細血管では血液がCO₂を放出し、O₂を蓄積する" },
    ],
    correctOptionId: "c",
    explanation:
      "肺動脈弁は右心室から肺動脈への出口に位置する（半月弁）。肺動脈には静脈血（O₂少・CO₂多）、肺静脈には動脈血（O₂多・CO₂少）が流れる。これが体循環と逆の命名となる理由。",
    subject: "解剖学",
    order: 6,
  },
  {
    id: "q-an-3-7",
    lessonId: "anatomy-3",
    text: "胸管（ductus thoracicus）について正しいのはどれか。",
    options: [
      { id: "a", text: "右リンパ本幹と合流して右静脈角に注ぐ" },
      { id: "b", text: "全身の大部分（左上半身＋下半身・腹部）のリンパを集め、左静脈角に注ぐ" },
      { id: "c", text: "胸管は心臓の右側を上行する" },
      { id: "d", text: "乳び槽（cisterna chyli）は頸部に存在する" },
    ],
    correctOptionId: "b",
    explanation:
      "胸管は乳び槽（第1〜2腰椎高さ）から起始し、脊柱右側→大動脈弓高さで左側へ→左静脈角（左内頸静脈と左鎖骨下静脈の合流点）に注ぐ。右上半身は右リンパ本幹→右静脈角へ。",
    subject: "解剖学",
    order: 7,
  },
  {
    id: "q-an-3-8",
    lessonId: "anatomy-3",
    text: "洞房結節（ペースメーカー）の位置として正しいのはどれか。",
    options: [
      { id: "a", text: "右心房と右心室の境界部（右房室溝）" },
      { id: "b", text: "上大静脈と右心房の接合部" },
      { id: "c", text: "房室中隔の右側" },
      { id: "d", text: "左心房後壁" },
    ],
    correctOptionId: "b",
    explanation:
      "洞房結節（SA node）は上大静脈と右心房の接合部（右心耳基部付近）に存在し、正常では60〜100回/分のペースで自動的に興奮を発生させる。房室結節（AV node）は房室中隔の右側（Koch三角）。",
    subject: "解剖学",
    order: 8,
  },
  {
    id: "q-an-3-9",
    lessonId: "anatomy-3",
    text: "腋窩動脈の枝でないのはどれか。",
    options: [
      { id: "a", text: "胸肩峰動脈" },
      { id: "b", text: "外側胸動脈" },
      { id: "c", text: "肩甲下動脈" },
      { id: "d", text: "深上腕動脈（橈側副動脈）" },
    ],
    correctOptionId: "d",
    explanation:
      "深上腕動脈（上腕深動脈）は腋窩動脈の続きである上腕動脈から分岐する。腋窩動脈の主な枝：胸肩峰動脈・外側胸動脈・肩甲下動脈・前後上腕回旋動脈など。",
    subject: "解剖学",
    order: 9,
  },
  {
    id: "q-an-3-10",
    lessonId: "anatomy-3",
    text: "門脈圧亢進時に側副血行路として開通しやすい部位で誤っているのはどれか。",
    options: [
      { id: "a", text: "食道下部の静脈叢（食道静脈瘤）" },
      { id: "b", text: "臍周囲静脈（メドゥーサの頭）" },
      { id: "c", text: "直腸静脈叢（痔静脈瘤）" },
      { id: "d", text: "大腿静脈の拡張" },
    ],
    correctOptionId: "d",
    explanation:
      "門脈圧亢進の3大側副路：①食道下部（食道静脈瘤）②臍周囲③直腸（痔静脈）。これらは門脈系と体静脈系の吻合部位で、門脈圧亢進時に拡張する。大腿静脈は関与しない。",
    subject: "解剖学",
    order: 10,
  },

  // ── Lesson 4: 消化器系 ───────────────────────────────────────────────────
  {
    id: "q-an-4-1",
    lessonId: "anatomy-4",
    text: "門脈が消化管から肝臓へ運ぶ主な物質はどれか。",
    options: [
      { id: "a", text: "酸素" },
      { id: "b", text: "消化管で吸収された栄養分（アミノ酸・単糖類など）" },
      { id: "c", text: "二酸化炭素" },
      { id: "d", text: "老廃物のみ" },
    ],
    correctOptionId: "b",
    explanation:
      "門脈は小腸・大腸・膵臓・胆囊からの静脈血を集め、消化吸収された栄養素（グルコース・アミノ酸・短鎖脂肪酸など）を肝臓に運ぶ。肝臓への酸素供給は肝動脈が担う。",
    subject: "解剖学",
    order: 1,
  },
  {
    id: "q-an-4-2",
    lessonId: "anatomy-4",
    text: "小腸で吸収された脂質が最初に到達するのはどれか。",
    options: [
      { id: "a", text: "下大静脈" },
      { id: "b", text: "門脈" },
      { id: "c", text: "胸管" },
      { id: "d", text: "大動脈" },
    ],
    correctOptionId: "c",
    explanation:
      "長鎖脂肪酸・モノグリセリドはカイロミクロンを形成し、腸絨毛内の乳び管（リンパ管）に吸収→腸リンパ管→胸管→左静脈角→体循環へ。短鎖・中鎖脂肪酸は直接門脈に入る。",
    subject: "解剖学",
    order: 2,
  },
  {
    id: "q-an-4-3",
    lessonId: "anatomy-4",
    text: "大十二指腸乳頭（ファーター乳頭）に開口するのはどれか。",
    options: [
      { id: "a", text: "胆囊管のみ" },
      { id: "b", text: "肝管のみ" },
      { id: "c", text: "総胆管と主膵管（合流してオッジ括約筋を通る）" },
      { id: "d", text: "副膵管のみ" },
    ],
    correctOptionId: "c",
    explanation:
      "総胆管と主膵管（Wirsung管）は十二指腸降部の大十二指腸乳頭（ファーター乳頭）に合流して開口。副膵管（Santorini管）は小十二指腸乳頭に開口する場合がある。",
    subject: "解剖学",
    order: 3,
  },
  {
    id: "q-an-4-4",
    lessonId: "anatomy-4",
    text: "肝臓の機能として誤っているのはどれか。",
    options: [
      { id: "a", text: "胆汁の産生・分泌" },
      { id: "b", text: "フィブリノゲンなどの血液凝固因子の産生" },
      { id: "c", text: "インスリンの産生" },
      { id: "d", text: "糖新生・グリコーゲン合成・貯蔵" },
    ],
    correctOptionId: "c",
    explanation:
      "インスリンは膵臓のランゲルハンス島β細胞が産生する。肝臓は①胆汁産生②凝固因子産生（フィブリノゲン・プロトロンビン等）③糖代謝④タンパク合成⑤解毒・薬物代謝を担う。",
    subject: "解剖学",
    order: 4,
  },
  {
    id: "q-an-4-5",
    lessonId: "anatomy-4",
    text: "腹膜内臓器（腹膜に完全に覆われ可動性が高い）として正しいのはどれか。",
    options: [
      { id: "a", text: "十二指腸（第2〜4部）" },
      { id: "b", text: "膵臓" },
      { id: "c", text: "胃" },
      { id: "d", text: "腎臓" },
    ],
    correctOptionId: "c",
    explanation:
      "腹膜内臓器：胃・空回腸・横行結腸・S状結腸・肝臓・脾臓など。後腹膜臓器（腹膜外）：十二指腸第2〜4部・膵臓・腎臓・副腎・上行・下行結腸（SADPUCKER＝Suprarenal, Aorta, Duodenum, Pancreas, Ureter, Colon, Kidneys, Esophagus, Rectum）。",
    subject: "解剖学",
    order: 5,
  },
  {
    id: "q-an-4-6",
    lessonId: "anatomy-4",
    text: "虫垂（appendix）の基部が開口する部位はどれか。",
    options: [
      { id: "a", text: "回腸末端" },
      { id: "b", text: "盲腸" },
      { id: "c", text: "上行結腸" },
      { id: "d", text: "横行結腸" },
    ],
    correctOptionId: "b",
    explanation:
      "虫垂は盲腸の後内側から起始する。マックバーニー点（右上前腸骨棘と臍を結ぶ線の外側1/3）は虫垂炎の圧痛点として重要。",
    subject: "解剖学",
    order: 6,
  },
  {
    id: "q-an-4-7",
    lessonId: "anatomy-4",
    text: "食道の3か所の狭窄部位として正しいのはどれか。",
    options: [
      { id: "a", text: "食道入口部・大動脈弓部・食道裂孔部（横隔膜貫通部）" },
      { id: "b", text: "食道入口部・気管分岐部・胃食道接合部" },
      { id: "c", text: "食道上部・食道中部・食道下部の等間隔の3点" },
      { id: "d", text: "食道入口部のみと横隔膜部の2か所" },
    ],
    correctOptionId: "a",
    explanation:
      "食道の3大狭窄：①食道入口部（輪状軟骨後方、咽頭食道接合部）②大動脈弓・左気管支部③横隔膜食道裂孔部（T10）。食道異物・食道癌の好発部位。",
    subject: "解剖学",
    order: 7,
  },
  {
    id: "q-an-4-8",
    lessonId: "anatomy-4",
    text: "肝臓の機能的分類（クイノー区域）について正しいのはどれか。",
    options: [
      { id: "a", text: "肝臓は形態的左右2葉のみに分けられる" },
      { id: "b", text: "機能的に肝臓はS1〜S8の8区域に分けられ、外科的切除の単位となる" },
      { id: "c", text: "胆囊は左葉（S1〜S4）に付属する" },
      { id: "d", text: "肝中静脈は右葉と左葉の境界を示す" },
    ],
    correctOptionId: "b",
    explanation:
      "クイノー（Couinaud）区域はS1（尾状葉）〜S8の8区域で、各区域は独立した門脈・肝動脈・胆管をもつ。外科的切除はこの単位で行う。肝中静脈が左右を分けるのは正しいが、b の記述がより完全。",
    subject: "解剖学",
    order: 8,
  },
  {
    id: "q-an-4-9",
    lessonId: "anatomy-4",
    text: "膵臓について正しいのはどれか。",
    options: [
      { id: "a", text: "膵臓は腹膜内臓器で可動性が高い" },
      { id: "b", text: "膵頭部は十二指腸に囲まれ、腸間膜上動静脈が膵頭と膵体の境界を通る" },
      { id: "c", text: "膵臓の外分泌部は膵島（ランゲルハンス島）からなる" },
      { id: "d", text: "膵尾部は脾門に接しない" },
    ],
    correctOptionId: "b",
    explanation:
      "膵頭部はC字型の十二指腸に囲まれる。腸間膜上動脈（SMA）・腸間膜上静脈（SMV）が膵体頸部を通過するため、膵体頸部癌ではSMA/SMV浸潤が手術可否の重要因子。膵尾部は脾門に接する。",
    subject: "解剖学",
    order: 9,
  },
  {
    id: "q-an-4-10",
    lessonId: "anatomy-4",
    text: "大腸（結腸）の特徴的な構造として正しいのはどれか。",
    options: [
      { id: "a", text: "輪状ひだ（ケルクリングひだ）が豊富にある" },
      { id: "b", text: "絨毛（villi）が発達している" },
      { id: "c", text: "結腸ひも（結腸帯）・膨起・腹膜垂が特徴的構造である" },
      { id: "d", text: "粘膜に杯細胞（goblet cell）は存在しない" },
    ],
    correctOptionId: "c",
    explanation:
      "大腸の特徴：①結腸ひも（3本の縦走筋帯）②結腸膨起（ハウストラ）③腹膜垂（脂肪突起）。輪状ひだ・絨毛は小腸（空腸・回腸）の特徴。大腸粘膜にも杯細胞は豊富。",
    subject: "解剖学",
    order: 10,
  },

  // ── Lesson 5: 泌尿器・内分泌・感覚器 ────────────────────────────────────
  {
    id: "q-an-5-1",
    lessonId: "anatomy-5",
    text: "腎臓の糸球体で濾過される（原尿に含まれる）のはどれか。",
    options: [
      { id: "a", text: "赤血球" },
      { id: "b", text: "血小板" },
      { id: "c", text: "アルブミン（大分子タンパク質）" },
      { id: "d", text: "水・電解質・尿素・グルコースなどの小分子" },
    ],
    correctOptionId: "d",
    explanation:
      "糸球体基底膜と足突起スリット膜は分子量70,000（アルブミン68,000）を超えるタンパク質・血球を通過させない。水・電解質・尿素・クレアチニン・グルコース等の小分子は濾過される。",
    subject: "解剖学",
    order: 1,
  },
  {
    id: "q-an-5-2",
    lessonId: "anatomy-5",
    text: "副腎髄質から分泌されるホルモンはどれか。",
    options: [
      { id: "a", text: "コルチゾール" },
      { id: "b", text: "アルドステロン" },
      { id: "c", text: "アドレナリン・ノルアドレナリン（カテコールアミン）" },
      { id: "d", text: "DHEA（デヒドロエピアンドロステロン）" },
    ],
    correctOptionId: "c",
    explanation:
      "副腎髄質：クロム親和性細胞からカテコールアミン（アドレナリン80%・ノルアドレナリン20%）を分泌。副腎皮質：球状層→アルドステロン、束状層→コルチゾール、網状層→アンドロゲン（DHEA）。",
    subject: "解剖学",
    order: 2,
  },
  {
    id: "q-an-5-3",
    lessonId: "anatomy-5",
    text: "甲状腺後面に通常4個付着しているのはどれか。",
    options: [
      { id: "a", text: "反回神経" },
      { id: "b", text: "副甲状腺（上皮小体）" },
      { id: "c", text: "頸神経節" },
      { id: "d", text: "リンパ節" },
    ],
    correctOptionId: "b",
    explanation:
      "副甲状腺（上皮小体・parathyroid gland）は通常4個（上2・下2）が甲状腺後面に付着。PTH（副甲状腺ホルモン）を分泌し血清カルシウムを調節。甲状腺手術時に誤摘出すると低カルシウム血症を起こす。",
    subject: "解剖学",
    order: 3,
  },
  {
    id: "q-an-5-4",
    lessonId: "anatomy-5",
    text: "膀胱三角（膀胱三角部）について正しいのはどれか。",
    options: [
      { id: "a", text: "左右の尿管口と尿道内口の3点を結ぶ三角形の平滑な粘膜領域" },
      { id: "b", text: "膀胱の最も前方に位置する" },
      { id: "c", text: "膀胱粘膜のひだが特に多い部位である" },
      { id: "d", text: "膀胱壁全体の中で最も伸展性が高い" },
    ],
    correctOptionId: "a",
    explanation:
      "膀胱三角は両尿管口と尿道内口を結ぶ三角形の領域で、粘膜は平滑（ひだがない）。膀胱炎・膀胱癌の好発部位。その他の膀胱粘膜は尿量に応じてひだが増える。",
    subject: "解剖学",
    order: 4,
  },
  {
    id: "q-an-5-5",
    lessonId: "anatomy-5",
    text: "眼の網膜について正しいのはどれか。",
    options: [
      { id: "a", text: "錐体細胞は網膜全体に均等に分布する" },
      { id: "b", text: "杆体（桿体）細胞は明所視・色覚を担う" },
      { id: "c", text: "視神経乳頭（盲点）には光受容体が存在しない" },
      { id: "d", text: "中心窩には杆体細胞が最も集中している" },
    ],
    correctOptionId: "c",
    explanation:
      "視神経乳頭は視神経が眼球を出る部位で光受容体がなく「盲点」となる。中心窩には錐体細胞が密集（精細な色覚・明所視）。杆体細胞は周辺網膜に多く、暗所視・運動検出を担う。",
    subject: "解剖学",
    order: 5,
  },
  {
    id: "q-an-5-6",
    lessonId: "anatomy-5",
    text: "内耳の構造について正しいのはどれか。",
    options: [
      { id: "a", text: "蝸牛は平衡覚を担う" },
      { id: "b", text: "三半規管は聴覚を担う" },
      { id: "c", text: "耳小骨はツチ骨・キヌタ骨・アブミ骨の3個からなる" },
      { id: "d", text: "半規管は中耳に存在する" },
    ],
    correctOptionId: "c",
    explanation:
      "耳小骨（中耳）：ツチ骨→キヌタ骨→アブミ骨の3個。蝸牛（内耳）はコルチ器で音波を感知（聴覚）。前庭器・三半規管（内耳）は平衡覚・角加速度を感知。",
    subject: "解剖学",
    order: 6,
  },
  {
    id: "q-an-5-7",
    lessonId: "anatomy-5",
    text: "精子形成（精子産生）が行われる部位はどれか。",
    options: [
      { id: "a", text: "前立腺" },
      { id: "b", text: "精巣上体" },
      { id: "c", text: "精細管（精巣内）" },
      { id: "d", text: "精嚢" },
    ],
    correctOptionId: "c",
    explanation:
      "精細管の基底膜側に精原細胞が存在し、セルトリ細胞（支持細胞）に囲まれながら精子へ分化（精子形成）。精巣上体は精子の成熟・貯蔵を担う。前立腺・精嚢は精液成分を分泌。",
    subject: "解剖学",
    order: 7,
  },
  {
    id: "q-an-5-8",
    lessonId: "anatomy-5",
    text: "下垂体前葉から分泌されないホルモンはどれか。",
    options: [
      { id: "a", text: "成長ホルモン（GH）" },
      { id: "b", text: "甲状腺刺激ホルモン（TSH）" },
      { id: "c", text: "オキシトシン" },
      { id: "d", text: "プロラクチン（PRL）" },
    ],
    correctOptionId: "c",
    explanation:
      "オキシトシンは視床下部（室傍核・視索上核）で産生され、下垂体後葉から分泌される。バソプレシン（ADH）も同様。前葉からはGH・TSH・ACTH・FSH・LH・PRL（プロラクチン）の6種が分泌。",
    subject: "解剖学",
    order: 8,
  },
  {
    id: "q-an-5-9",
    lessonId: "anatomy-5",
    text: "副甲状腺ホルモン（PTH）の作用として正しいのはどれか。",
    options: [
      { id: "a", text: "腎でのリン酸再吸収を増加させ、血清リンを上昇させる" },
      { id: "b", text: "破骨細胞を活性化して骨吸収を促進し、血清カルシウムを上昇させる" },
      { id: "c", text: "腸管でのカルシウム吸収を直接促進する" },
      { id: "d", text: "1α-水酸化酵素を阻害して活性型ビタミンDの産生を抑制する" },
    ],
    correctOptionId: "b",
    explanation:
      "PTHの主な作用：①骨：破骨細胞活性化→骨Ca放出②腎：Ca再吸収増加・リン排泄増加③腎：1α-水酸化酵素活性化→活性型VitD産生増→腸管Ca吸収増（間接作用）。",
    subject: "解剖学",
    order: 9,
  },
  {
    id: "q-an-5-10",
    lessonId: "anatomy-5",
    text: "男性の尿道の長さ・構造について正しいのはどれか。",
    options: [
      { id: "a", text: "男性尿道は女性より短い（約4cm）" },
      { id: "b", text: "男性尿道は前立腺部・膜様部・海綿体部からなり、約16〜20cmある" },
      { id: "c", text: "男性尿道には狭窄部が1か所のみある" },
      { id: "d", text: "外尿道括約筋は平滑筋からなり自律神経支配である" },
    ],
    correctOptionId: "b",
    explanation:
      "男性尿道は約16〜20cm（女性は約4cm）で前立腺部・膜様部・海綿体部の3部に分かれる。3か所の狭窄：内尿道口・膜様部（外括約筋）・外尿道口。外尿道括約筋は横紋筋で随意支配。",
    subject: "解剖学",
    order: 10,
  },
];

export const anatomyLessons: Lesson[] = [
  {
    id: "anatomy-1",
    title: "解剖学 — 骨格系・関節",
    questionIds: [
      "q-an-1-1", "q-an-1-2", "q-an-1-3", "q-an-1-4", "q-an-1-5",
      "q-an-1-6", "q-an-1-7", "q-an-1-8", "q-an-1-9", "q-an-1-10",
    ],
    subject: "解剖学",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
  {
    id: "anatomy-2",
    title: "解剖学 — 神経系",
    questionIds: [
      "q-an-2-1", "q-an-2-2", "q-an-2-3", "q-an-2-4", "q-an-2-5",
      "q-an-2-6", "q-an-2-7", "q-an-2-8", "q-an-2-9", "q-an-2-10",
    ],
    subject: "解剖学",
    examTag: "医師国家試験",
    order: 2,
    orderInSubject: 2,
    level: 2,
  },
  {
    id: "anatomy-3",
    title: "解剖学 — 循環器系・呼吸器系",
    questionIds: [
      "q-an-3-1", "q-an-3-2", "q-an-3-3", "q-an-3-4", "q-an-3-5",
      "q-an-3-6", "q-an-3-7", "q-an-3-8", "q-an-3-9", "q-an-3-10",
    ],
    subject: "解剖学",
    examTag: "医師国家試験",
    order: 3,
    orderInSubject: 3,
    level: 3,
  },
  {
    id: "anatomy-4",
    title: "解剖学 — 消化器系",
    questionIds: [
      "q-an-4-1", "q-an-4-2", "q-an-4-3", "q-an-4-4", "q-an-4-5",
      "q-an-4-6", "q-an-4-7", "q-an-4-8", "q-an-4-9", "q-an-4-10",
    ],
    subject: "解剖学",
    examTag: "医師国家試験",
    order: 4,
    orderInSubject: 4,
    level: 4,
  },
  {
    id: "anatomy-5",
    title: "解剖学 — 泌尿器・内分泌・感覚器",
    questionIds: [
      "q-an-5-1", "q-an-5-2", "q-an-5-3", "q-an-5-4", "q-an-5-5",
      "q-an-5-6", "q-an-5-7", "q-an-5-8", "q-an-5-9", "q-an-5-10",
    ],
    subject: "解剖学",
    examTag: "医師国家試験",
    order: 5,
    orderInSubject: 5,
    level: 5,
  },
];
