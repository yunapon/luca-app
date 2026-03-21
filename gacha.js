const GACHA_COST = 30;

// レアリティ設定
const RARITIES = {
  normal:    { name: "ノーマル", color: "#6b8e7b", bgColor: "#e8f0eb", rate: 60 },
  rare:      { name: "レア",     color: "#4a90d9", bgColor: "#dbeaf9", rate: 25 },
  superrare: { name: "<ruby>激<rt>げき</rt></ruby>レア", color: "#d4a017", bgColor: "#fdf5dc", rate: 12 },
  legendary: { name: "<ruby>伝説<rt>でんせつ</rt></ruby>", color: "#9b30ff", bgColor: "#f0e0ff", rate: 3 }
};

// ファンタジードラゴンカード
const GACHA_CARDS = [
  // ノーマル（絵文字ベース）
  { id: "n01", name: "スライム", icon: "🟢", description: "ぷるぷるの<ruby>森<rt>もり</rt></ruby>の<ruby>住人<rt>じゅうにん</rt></ruby>", rarity: "normal" },
  { id: "n02", name: "フェアリー", icon: "🧚", description: "<ruby>花<rt>はな</rt></ruby>の<ruby>蜜<rt>みつ</rt></ruby>が<ruby>大好<rt>だいす</rt></ruby>きな<ruby>妖精<rt>ようせい</rt></ruby>", rarity: "normal" },
  { id: "n03", name: "ポーション", icon: "🧪", description: "HPを<ruby>回復<rt>かいふく</rt></ruby>する<ruby>薬<rt>くすり</rt></ruby>", rarity: "normal" },
  { id: "n04", name: "まほうのキノコ", icon: "🍄", description: "<ruby>食<rt>た</rt></ruby>べると<ruby>不思議<rt>ふしぎ</rt></ruby>な<ruby>力<rt>ちから</rt></ruby>が…", rarity: "normal" },
  { id: "n05", name: "ひかるいし", icon: "💎", description: "<ruby>洞窟<rt>どうくつ</rt></ruby>の<ruby>奥<rt>おく</rt></ruby>で<ruby>光<rt>ひか</rt></ruby>る<ruby>宝石<rt>ほうせき</rt></ruby>", rarity: "normal" },
  { id: "n06", name: "もりのようせい", icon: "🌿", description: "<ruby>世界樹<rt>せかいじゅ</rt></ruby>の<ruby>葉<rt>は</rt></ruby>に<ruby>住<rt>す</rt></ruby>む<ruby>妖精<rt>ようせい</rt></ruby>", rarity: "normal" },
  { id: "n07", name: "たびびとのマント", icon: "🧥", description: "<ruby>冒険者<rt>ぼうけんしゃ</rt></ruby>のボロボロのマント", rarity: "normal" },
  { id: "n08", name: "おひさまネコ", icon: "☀️", description: "いつもポカポカ", rarity: "normal" },

  // レア（ドラゴン画像付き）
  { id: "r01", name: "<ruby>風<rt>かぜ</rt></ruby>の<ruby>嵐竜<rt>あらしりゅう</rt></ruby>", image: "card_storm_king.png", description: "<ruby>嵐<rt>あらし</rt></ruby>を<ruby>呼<rt>よ</rt></ruby>ぶ<ruby>白銀<rt>はくぎん</rt></ruby>の<ruby>竜<rt>りゅう</rt></ruby>", rarity: "rare" },
  { id: "r02", name: "<ruby>緑草竜<rt>りょくそうりゅう</rt></ruby>", image: "card_forest_guardian.png", description: "<ruby>森<rt>もり</rt></ruby>を<ruby>守<rt>まも</rt></ruby>る<ruby>翠<rt>みどり</rt></ruby>の<ruby>守護者<rt>しゅごしゃ</rt></ruby>", rarity: "rare" },
  { id: "r03", name: "<ruby>鋼竜<rt>こうりゅう</rt></ruby>", image: "card_steel_guardian.png", description: "<ruby>鋼鉄<rt>こうてつ</rt></ruby>の<ruby>体<rt>からだ</rt></ruby>を<ruby>持<rt>も</rt></ruby>つ<ruby>機械竜<rt>きかいりゅう</rt></ruby>", rarity: "rare" },
  { id: "r04", name: "<ruby>朝日<rt>あさひ</rt></ruby>の<ruby>守護者<rt>しゅごしゃ</rt></ruby>", image: "card_sunrise_guardian.png", description: "<ruby>夜明<rt>よあ</rt></ruby>けを<ruby>告<rt>つ</rt></ruby>げる<ruby>翡翠<rt>ひすい</rt></ruby>の<ruby>竜<rt>りゅう</rt></ruby>", rarity: "rare" },
  { id: "r05", name: "<ruby>風翠竜<rt>ふうすいりゅう</rt></ruby>", image: "card_wind_dragon.png", description: "<ruby>風<rt>かぜ</rt></ruby>と<ruby>緑<rt>みどり</rt></ruby>の<ruby>力<rt>ちから</rt></ruby>を<ruby>操<rt>あやつ</rt></ruby>る<ruby>竜<rt>りゅう</rt></ruby>", rarity: "rare" },

  // 激レア（ドラゴン画像付き）
  { id: "sr01", name: "<ruby>熔岩竜<rt>ようがんりゅう</rt></ruby>", image: "card_volcano_break.png", description: "<ruby>山<rt>やま</rt></ruby>を<ruby>焼<rt>や</rt></ruby>きつくす<ruby>炎<rt>ほのお</rt></ruby>の<ruby>竜<rt>りゅう</rt></ruby>", rarity: "superrare" },
  { id: "sr02", name: "<ruby>砕氷竜<rt>さいひょうりゅう</rt></ruby>", image: "card_frost_king.png", description: "<ruby>全<rt>すべ</rt></ruby>てを<ruby>凍<rt>こお</rt></ruby>りつかせる<ruby>氷<rt>こおり</rt></ruby>の<ruby>王<rt>おう</rt></ruby>", rarity: "superrare" },
  { id: "sr03", name: "<ruby>星<rt>ほし</rt></ruby>の<ruby>宝石<rt>ほうせき</rt></ruby>", image: "card_star_gems.png", description: "<ruby>世界樹<rt>せかいじゅ</rt></ruby>が<ruby>生<rt>う</rt></ruby>んだ<ruby>奇跡<rt>きせき</rt></ruby>の<ruby>宝玉<rt>ほうぎょく</rt></ruby>", rarity: "superrare" },
  { id: "sr04", name: "<ruby>蒼炎竜<rt>そうえんりゅう</rt></ruby>", image: "card_sapfire_serpent.png", description: "<ruby>蒼<rt>あお</rt></ruby>い<ruby>炎<rt>ほのお</rt></ruby>を<ruby>吐<rt>は</rt></ruby>く<ruby>闇<rt>やみ</rt></ruby>の<ruby>竜<rt>りゅう</rt></ruby>", rarity: "superrare" },

  // 伝説（ドラゴン画像付き）
  { id: "lg01", name: "<ruby>星界竜<rt>せいかいりゅう</rt></ruby>", image: "card_celestial_dragon.png", description: "<ruby>宇宙<rt>うちゅう</rt></ruby>を<ruby>統<rt>す</rt></ruby>べる<ruby>最強<rt>さいきょう</rt></ruby>の<ruby>竜<rt>りゅう</rt></ruby>", rarity: "legendary" },
  { id: "lg02", name: "<ruby>悪夢<rt>あくむ</rt></ruby>の<ruby>影竜<rt>かげりゅう</rt></ruby>", image: "card_nightmare_king.png", description: "<ruby>闇<rt>やみ</rt></ruby>の<ruby>世界<rt>せかい</rt></ruby>から<ruby>現<rt>あらわ</rt></ruby>れし<ruby>恐怖<rt>きょうふ</rt></ruby>の<ruby>王<rt>おう</rt></ruby>", rarity: "legendary" }
];

// --- ガチャロジック ---

function rollRarity() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const [key, r] of Object.entries(RARITIES)) {
    cumulative += r.rate;
    if (rand < cumulative) return key;
  }
  return "normal";
}

function rollGacha() {
  const rarity = rollRarity();
  const pool = GACHA_CARDS.filter((c) => c.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

// --- コレクション管理 ---

function loadCollection() {
  const saved = localStorage.getItem(getKey("collection"));
  return saved ? JSON.parse(saved) : {};
}

function saveCollection(collection) {
  localStorage.setItem(getKey("collection"), JSON.stringify(collection));
}

function addToCollection(cardId) {
  const col = loadCollection();
  col[cardId] = (col[cardId] || 0) + 1;
  saveCollection(col);
}

function getCollectionCount() {
  const col = loadCollection();
  return Object.keys(col).length;
}
