// 教科の設定
const SUBJECTS = {
  english: {
    name: "<ruby>英語<rt>えいご</rt></ruby>",
    icon: "🔤",
    colors: ["#b3e0f2", "#87ceeb", "#d6f0fa"],
    quizLabel: "この<ruby>意味<rt>いみ</rt></ruby>の<ruby>英単語<rt>えいたんご</rt></ruby>はどれにゃ？",
    levels: ["e56", "m1", "m23"]
  },
  kokugo: {
    name: "<ruby>国語<rt>こくご</rt></ruby>",
    icon: "📖",
    colors: ["#f2b3d4", "#eb87b8", "#fad6ea"],
    quizLabel: "この<ruby>漢字<rt>かんじ</rt></ruby>の<ruby>読<rt>よ</rt></ruby>みはどれにゃ？",
    levels: ["e34", "e56", "m1"]
  },
  rika: {
    name: "<ruby>理科<rt>りか</rt></ruby>",
    icon: "🔬",
    colors: ["#b3f2c9", "#87eb9e", "#d6fae2"],
    quizLabel: "<ruby>正<rt>ただ</rt></ruby>しい<ruby>答<rt>こた</rt></ruby>えはどれにゃ？",
    levels: ["e56", "m1", "m2"]
  },
  sansu: {
    name: "<ruby>算数<rt>さんすう</rt></ruby>・<ruby>数学<rt>すうがく</rt></ruby>",
    icon: "📐",
    colors: ["#b3b8f2", "#878eeb", "#d6d9fa"],
    quizLabel: "<ruby>正<rt>ただ</rt></ruby>しい<ruby>答<rt>こた</rt></ruby>えはどれにゃ？",
    levels: ["e56", "m1", "m2"]
  },
  shakai: {
    name: "<ruby>社会<rt>しゃかい</rt></ruby>",
    icon: "🌍",
    colors: ["#f2e6b3", "#ebd487", "#faf0d6"],
    quizLabel: "<ruby>正<rt>ただ</rt></ruby>しい<ruby>答<rt>こた</rt></ruby>えはどれにゃ？",
    levels: ["e56", "m1", "m2"]
  }
};

// 学年レベルの設定
const LEVELS = {
  e34: "<ruby>小<rt>しょう</rt></ruby>3-4<ruby>年<rt>ねん</rt></ruby>",
  e56: "<ruby>小<rt>しょう</rt></ruby>5-6<ruby>年<rt>ねん</rt></ruby>",
  m1: "<ruby>中<rt>ちゅう</rt></ruby>1<ruby>年<rt>ねん</rt></ruby>",
  m2: "<ruby>中<rt>ちゅう</rt></ruby>2<ruby>年<rt>ねん</rt></ruby>",
  m23: "<ruby>中<rt>ちゅう</rt></ruby>2-3<ruby>年<rt>ねん</rt></ruby>"
};

// デフォルト問題データ
const DEFAULT_WORDS = [

  // ===========================
  // 英語 - 小5-6年（英検5級レベル）
  // ===========================
  { word: "APPLE", meaning: "リンゴ", level: "e56", subject: "english" },
  { word: "CAT", meaning: "ネコ", level: "e56", subject: "english" },
  { word: "DOG", meaning: "イヌ", level: "e56", subject: "english" },
  { word: "BOOK", meaning: "<ruby>本<rt>ほん</rt></ruby>", level: "e56", subject: "english" },
  { word: "EGG", meaning: "たまご", level: "e56", subject: "english" },
  { word: "FISH", meaning: "<ruby>魚<rt>さかな</rt></ruby>", level: "e56", subject: "english" },
  { word: "BIRD", meaning: "<ruby>鳥<rt>とり</rt></ruby>", level: "e56", subject: "english" },
  { word: "MILK", meaning: "<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>", level: "e56", subject: "english" },
  { word: "SUN", meaning: "<ruby>太陽<rt>たいよう</rt></ruby>", level: "e56", subject: "english" },
  { word: "RAIN", meaning: "<ruby>雨<rt>あめ</rt></ruby>", level: "e56", subject: "english" },
  { word: "HAND", meaning: "<ruby>手<rt>て</rt></ruby>", level: "e56", subject: "english" },
  { word: "DESK", meaning: "<ruby>机<rt>つくえ</rt></ruby>", level: "e56", subject: "english" },
  { word: "TREE", meaning: "<ruby>木<rt>き</rt></ruby>", level: "e56", subject: "english" },
  { word: "STAR", meaning: "<ruby>星<rt>ほし</rt></ruby>", level: "e56", subject: "english" },
  { word: "CAKE", meaning: "ケーキ", level: "e56", subject: "english" },

  // ===========================
  // 英語 - 中1年（英検4級レベル）
  // ===========================
  { word: "DREAM", meaning: "<ruby>夢<rt>ゆめ</rt></ruby>", level: "m1", subject: "english" },
  { word: "CLOUD", meaning: "<ruby>雲<rt>くも</rt></ruby>", level: "m1", subject: "english" },
  { word: "RIVER", meaning: "<ruby>川<rt>かわ</rt></ruby>", level: "m1", subject: "english" },
  { word: "SLEEP", meaning: "<ruby>眠<rt>ねむ</rt></ruby>る", level: "m1", subject: "english" },
  { word: "BREAK", meaning: "<ruby>壊<rt>こわ</rt></ruby>す", level: "m1", subject: "english" },
  { word: "CLIMB", meaning: "<ruby>登<rt>のぼ</rt></ruby>る", level: "m1", subject: "english" },
  { word: "HEAVY", meaning: "<ruby>重<rt>おも</rt></ruby>い", level: "m1", subject: "english" },
  { word: "LIGHT", meaning: "<ruby>軽<rt>かる</rt></ruby>い・<ruby>光<rt>ひかり</rt></ruby>", level: "m1", subject: "english" },
  { word: "BRAVE", meaning: "<ruby>勇敢<rt>ゆうかん</rt></ruby>な", level: "m1", subject: "english" },
  { word: "QUIET", meaning: "<ruby>静<rt>しず</rt></ruby>かな", level: "m1", subject: "english" },
  { word: "ANGRY", meaning: "<ruby>怒<rt>おこ</rt></ruby>った", level: "m1", subject: "english" },
  { word: "FRESH", meaning: "<ruby>新鮮<rt>しんせん</rt></ruby>な", level: "m1", subject: "english" },
  { word: "PAINT", meaning: "<ruby>絵<rt>え</rt></ruby>を<ruby>描<rt>か</rt></ruby>く", level: "m1", subject: "english" },
  { word: "LUCKY", meaning: "ラッキーな", level: "m1", subject: "english" },
  { word: "BEACH", meaning: "<ruby>浜辺<rt>はまべ</rt></ruby>", level: "m1", subject: "english" },

  // ===========================
  // 英語 - 中2-3年（英検3級レベル）
  // ===========================
  { word: "AGREE", meaning: "<ruby>賛成<rt>さんせい</rt></ruby>する", level: "m23", subject: "english" },
  { word: "SOLVE", meaning: "<ruby>解<rt>と</rt></ruby>く", level: "m23", subject: "english" },
  { word: "ARGUE", meaning: "<ruby>議論<rt>ぎろん</rt></ruby>する", level: "m23", subject: "english" },
  { word: "GUESS", meaning: "<ruby>推測<rt>すいそく</rt></ruby>する", level: "m23", subject: "english" },
  { word: "PROVE", meaning: "<ruby>証明<rt>しょうめい</rt></ruby>する", level: "m23", subject: "english" },
  { word: "VALUE", meaning: "<ruby>価値<rt>かち</rt></ruby>", level: "m23", subject: "english" },
  { word: "WEALTH", meaning: "<ruby>富<rt>とみ</rt></ruby>・<ruby>財産<rt>ざいさん</rt></ruby>", level: "m23", subject: "english" },
  { word: "SCORE", meaning: "<ruby>得点<rt>とくてん</rt></ruby>", level: "m23", subject: "english" },
  { word: "HABIT", meaning: "<ruby>習慣<rt>しゅうかん</rt></ruby>", level: "m23", subject: "english" },
  { word: "DOUBT", meaning: "<ruby>疑<rt>うたが</rt></ruby>う", level: "m23", subject: "english" },
  { word: "HUMOR", meaning: "ユーモア", level: "m23", subject: "english" },
  { word: "PRIDE", meaning: "<ruby>誇<rt>ほこ</rt></ruby>り", level: "m23", subject: "english" },
  { word: "TRADE", meaning: "<ruby>貿易<rt>ぼうえき</rt></ruby>", level: "m23", subject: "english" },
  { word: "NOBLE", meaning: "<ruby>高貴<rt>こうき</rt></ruby>な", level: "m23", subject: "english" },
  { word: "TRUST", meaning: "<ruby>信頼<rt>しんらい</rt></ruby>", level: "m23", subject: "english" },

  // ===========================
  // 国語 - 小3-4年（漢字の読み）
  // ===========================
  { word: "わるい", meaning: "<ruby>悪<rt>？</rt></ruby>い", level: "e34", subject: "kokugo" },
  { word: "あつい", meaning: "<ruby>暑<rt>？</rt></ruby>い", level: "e34", subject: "kokugo" },
  { word: "さむい", meaning: "<ruby>寒<rt>？</rt></ruby>い", level: "e34", subject: "kokugo" },
  { word: "かるい", meaning: "<ruby>軽<rt>？</rt></ruby>い", level: "e34", subject: "kokugo" },
  { word: "おもい", meaning: "<ruby>重<rt>？</rt></ruby>い", level: "e34", subject: "kokugo" },
  { word: "ふかい", meaning: "<ruby>深<rt>？</rt></ruby>い", level: "e34", subject: "kokugo" },
  { word: "みじかい", meaning: "<ruby>短<rt>？</rt></ruby>い", level: "e34", subject: "kokugo" },
  { word: "つめたい", meaning: "<ruby>冷<rt>？</rt></ruby>たい", level: "e34", subject: "kokugo" },
  { word: "しま", meaning: "<ruby>島<rt>？</rt></ruby>", level: "e34", subject: "kokugo" },
  { word: "みなと", meaning: "<ruby>港<rt>？</rt></ruby>", level: "e34", subject: "kokugo" },
  { word: "はし", meaning: "<ruby>橋<rt>？</rt></ruby>", level: "e34", subject: "kokugo" },
  { word: "にわ", meaning: "<ruby>庭<rt>？</rt></ruby>", level: "e34", subject: "kokugo" },
  { word: "はたけ", meaning: "<ruby>畑<rt>？</rt></ruby>", level: "e34", subject: "kokugo" },
  { word: "まめ", meaning: "<ruby>豆<rt>？</rt></ruby>", level: "e34", subject: "kokugo" },
  { word: "はしら", meaning: "<ruby>柱<rt>？</rt></ruby>", level: "e34", subject: "kokugo" },

  // ===========================
  // 国語 - 小5-6年（漢字の読み）
  // ===========================
  { word: "あやまる", meaning: "<ruby>謝<rt>？</rt></ruby>る", level: "e56", subject: "kokugo" },
  { word: "みとめる", meaning: "<ruby>認<rt>？</rt></ruby>める", level: "e56", subject: "kokugo" },
  { word: "たずねる", meaning: "<ruby>訪<rt>？</rt></ruby>ねる", level: "e56", subject: "kokugo" },
  { word: "うやまう", meaning: "<ruby>敬<rt>？</rt></ruby>う", level: "e56", subject: "kokugo" },
  { word: "いさましい", meaning: "<ruby>勇<rt>？</rt></ruby>ましい", level: "e56", subject: "kokugo" },
  { word: "こころざし", meaning: "<ruby>志<rt>？</rt></ruby>", level: "e56", subject: "kokugo" },
  { word: "きずな", meaning: "<ruby>絆<rt>？</rt></ruby>", level: "e56", subject: "kokugo" },
  { word: "いのる", meaning: "<ruby>祈<rt>？</rt></ruby>る", level: "e56", subject: "kokugo" },
  { word: "つとめる", meaning: "<ruby>務<rt>？</rt></ruby>める", level: "e56", subject: "kokugo" },
  { word: "あらためる", meaning: "<ruby>改<rt>？</rt></ruby>める", level: "e56", subject: "kokugo" },
  { word: "おさめる", meaning: "<ruby>納<rt>？</rt></ruby>める", level: "e56", subject: "kokugo" },
  { word: "たもつ", meaning: "<ruby>保<rt>？</rt></ruby>つ", level: "e56", subject: "kokugo" },
  { word: "ほね", meaning: "<ruby>骨<rt>？</rt></ruby>", level: "e56", subject: "kokugo" },
  { word: "はば", meaning: "<ruby>幅<rt>？</rt></ruby>", level: "e56", subject: "kokugo" },
  { word: "すじ", meaning: "<ruby>筋<rt>？</rt></ruby>", level: "e56", subject: "kokugo" },

  // ===========================
  // 国語 - 中1年（漢字の読み）
  // ===========================
  { word: "うながす", meaning: "<ruby>促<rt>？</rt></ruby>す", level: "m1", subject: "kokugo" },
  { word: "おびやかす", meaning: "<ruby>脅<rt>？</rt></ruby>かす", level: "m1", subject: "kokugo" },
  { word: "つちかう", meaning: "<ruby>培<rt>？</rt></ruby>う", level: "m1", subject: "kokugo" },
  { word: "あざやか", meaning: "<ruby>鮮<rt>？</rt></ruby>やか", level: "m1", subject: "kokugo" },
  { word: "おだやか", meaning: "<ruby>穏<rt>？</rt></ruby>やか", level: "m1", subject: "kokugo" },
  { word: "いちじるしい", meaning: "<ruby>著<rt>？</rt></ruby>しい", level: "m1", subject: "kokugo" },
  { word: "はぐくむ", meaning: "<ruby>育<rt>？</rt></ruby>む", level: "m1", subject: "kokugo" },
  { word: "みなもと", meaning: "<ruby>源<rt>？</rt></ruby>", level: "m1", subject: "kokugo" },
  { word: "たくみ", meaning: "<ruby>巧<rt>？</rt></ruby>み", level: "m1", subject: "kokugo" },
  { word: "いきおい", meaning: "<ruby>勢<rt>？</rt></ruby>い", level: "m1", subject: "kokugo" },
  { word: "かかげる", meaning: "<ruby>掲<rt>？</rt></ruby>げる", level: "m1", subject: "kokugo" },
  { word: "さまたげる", meaning: "<ruby>妨<rt>？</rt></ruby>げる", level: "m1", subject: "kokugo" },
  { word: "こばむ", meaning: "<ruby>拒<rt>？</rt></ruby>む", level: "m1", subject: "kokugo" },
  { word: "いだく", meaning: "<ruby>抱<rt>？</rt></ruby>く", level: "m1", subject: "kokugo" },
  { word: "ささげる", meaning: "<ruby>捧<rt>？</rt></ruby>げる", level: "m1", subject: "kokugo" },

  // ===========================
  // 理科 - 小5-6年
  // ===========================
  { word: "光合成", meaning: "<ruby>植物<rt>しょくぶつ</rt></ruby>が<ruby>光<rt>ひかり</rt></ruby>を<ruby>使<rt>つか</rt></ruby>って<ruby>養分<rt>ようぶん</rt></ruby>を<ruby>作<rt>つく</rt></ruby>ることは？", level: "e56", subject: "rika" },
  { word: "酸素", meaning: "ものが<ruby>燃<rt>も</rt></ruby>えるために<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>気体<rt>きたい</rt></ruby>は？", level: "e56", subject: "rika" },
  { word: "二酸化炭素", meaning: "<ruby>人<rt>ひと</rt></ruby>が<ruby>息<rt>いき</rt></ruby>を<ruby>吐<rt>は</rt></ruby>くときに<ruby>出<rt>で</rt></ruby>る<ruby>気体<rt>きたい</rt></ruby>は？", level: "e56", subject: "rika" },
  { word: "蒸発", meaning: "<ruby>水<rt>みず</rt></ruby>が<ruby>水蒸気<rt>すいじょうき</rt></ruby>に<ruby>変<rt>か</rt></ruby>わることは？", level: "e56", subject: "rika" },
  { word: "食物連鎖", meaning: "<ruby>生<rt>い</rt></ruby>き<ruby>物<rt>もの</rt></ruby>が「<ruby>食<rt>た</rt></ruby>べる・<ruby>食<rt>た</rt></ruby>べられる」でつながることは？", level: "e56", subject: "rika" },
  { word: "子葉", meaning: "<ruby>種<rt>たね</rt></ruby>から<ruby>最初<rt>さいしょ</rt></ruby>に<ruby>出<rt>で</rt></ruby>る<ruby>葉<rt>は</rt></ruby>のことは？", level: "e56", subject: "rika" },
  { word: "受粉", meaning: "<ruby>花粉<rt>かふん</rt></ruby>がめしべにつくことは？", level: "e56", subject: "rika" },
  { word: "水蒸気", meaning: "<ruby>目<rt>め</rt></ruby>に<ruby>見<rt>み</rt></ruby>えない<ruby>気体<rt>きたい</rt></ruby>の<ruby>水<rt>みず</rt></ruby>は？", level: "e56", subject: "rika" },
  { word: "導管", meaning: "<ruby>根<rt>ね</rt></ruby>から<ruby>吸<rt>す</rt></ruby>い<ruby>上<rt>あ</rt></ruby>げた<ruby>水<rt>みず</rt></ruby>が<ruby>通<rt>とお</rt></ruby>る<ruby>管<rt>くだ</rt></ruby>は？", level: "e56", subject: "rika" },
  { word: "月食", meaning: "<ruby>月<rt>つき</rt></ruby>が<ruby>地球<rt>ちきゅう</rt></ruby>の<ruby>影<rt>かげ</rt></ruby>に<ruby>入<rt>はい</rt></ruby>る<ruby>現象<rt>げんしょう</rt></ruby>は？", level: "e56", subject: "rika" },
  { word: "日食", meaning: "<ruby>太陽<rt>たいよう</rt></ruby>が<ruby>月<rt>つき</rt></ruby>に<ruby>隠<rt>かく</rt></ruby>れる<ruby>現象<rt>げんしょう</rt></ruby>は？", level: "e56", subject: "rika" },
  { word: "振り子", meaning: "ひもにおもりをつけて<ruby>揺<rt>ゆ</rt></ruby>らすものは？", level: "e56", subject: "rika" },

  // ===========================
  // 理科 - 中1年
  // ===========================
  { word: "光の反射", meaning: "<ruby>光<rt>ひかり</rt></ruby>が<ruby>鏡<rt>かがみ</rt></ruby>などではね<ruby>返<rt>かえ</rt></ruby>ることは？", level: "m1", subject: "rika" },
  { word: "光の屈折", meaning: "<ruby>光<rt>ひかり</rt></ruby>が<ruby>水<rt>みず</rt></ruby>やガラスに<ruby>入<rt>はい</rt></ruby>るとき<ruby>曲<rt>ま</rt></ruby>がることは？", level: "m1", subject: "rika" },
  { word: "密度", meaning: "1cm³あたりの<ruby>質量<rt>しつりょう</rt></ruby>のことは？", level: "m1", subject: "rika" },
  { word: "蒸留", meaning: "<ruby>液体<rt>えきたい</rt></ruby>を<ruby>沸騰<rt>ふっとう</rt></ruby>させて<ruby>気体<rt>きたい</rt></ruby>にし、<ruby>冷<rt>ひ</rt></ruby>やして<ruby>集<rt>あつ</rt></ruby>める<ruby>方法<rt>ほうほう</rt></ruby>は？", level: "m1", subject: "rika" },
  { word: "被子植物", meaning: "<ruby>胚珠<rt>はいしゅ</rt></ruby>が<ruby>子房<rt>しぼう</rt></ruby>に<ruby>包<rt>つつ</rt></ruby>まれている<ruby>植物<rt>しょくぶつ</rt></ruby>は？", level: "m1", subject: "rika" },
  { word: "裸子植物", meaning: "<ruby>胚珠<rt>はいしゅ</rt></ruby>がむき<ruby>出<rt>だ</rt></ruby>しの<ruby>植物<rt>しょくぶつ</rt></ruby>は？", level: "m1", subject: "rika" },
  { word: "脊椎動物", meaning: "<ruby>背骨<rt>せぼね</rt></ruby>がある<ruby>動物<rt>どうぶつ</rt></ruby>のグループは？", level: "m1", subject: "rika" },
  { word: "無脊椎動物", meaning: "<ruby>背骨<rt>せぼね</rt></ruby>がない<ruby>動物<rt>どうぶつ</rt></ruby>のグループは？", level: "m1", subject: "rika" },
  { word: "震度", meaning: "<ruby>地震<rt>じしん</rt></ruby>の<ruby>揺<rt>ゆ</rt></ruby>れの<ruby>強<rt>つよ</rt></ruby>さを<ruby>表<rt>あらわ</rt></ruby>す<ruby>数値<rt>すうち</rt></ruby>は？", level: "m1", subject: "rika" },
  { word: "マグニチュード", meaning: "<ruby>地震<rt>じしん</rt></ruby>そのものの<ruby>大<rt>おお</rt></ruby>きさを<ruby>表<rt>あらわ</rt></ruby>す<ruby>数値<rt>すうち</rt></ruby>は？", level: "m1", subject: "rika" },
  { word: "火成岩", meaning: "マグマが<ruby>冷<rt>ひ</rt></ruby>えてできた<ruby>岩石<rt>がんせき</rt></ruby>は？", level: "m1", subject: "rika" },
  { word: "堆積岩", meaning: "<ruby>砂<rt>すな</rt></ruby>や<ruby>泥<rt>どろ</rt></ruby>が<ruby>積<rt>つ</rt></ruby>もってできた<ruby>岩石<rt>がんせき</rt></ruby>は？", level: "m1", subject: "rika" },

  // ===========================
  // 理科 - 中2年
  // ===========================
  { word: "化学変化", meaning: "<ruby>別<rt>べつ</rt></ruby>の<ruby>物質<rt>ぶっしつ</rt></ruby>に<ruby>変<rt>か</rt></ruby>わる<ruby>変化<rt>へんか</rt></ruby>は？", level: "m2", subject: "rika" },
  { word: "酸化", meaning: "<ruby>物質<rt>ぶっしつ</rt></ruby>が<ruby>酸素<rt>さんそ</rt></ruby>と<ruby>結<rt>むす</rt></ruby>びつくことは？", level: "m2", subject: "rika" },
  { word: "還元", meaning: "<ruby>酸化物<rt>さんかぶつ</rt></ruby>から<ruby>酸素<rt>さんそ</rt></ruby>を<ruby>取<rt>と</rt></ruby>り<ruby>除<rt>のぞ</rt></ruby>くことは？", level: "m2", subject: "rika" },
  { word: "細胞", meaning: "<ruby>生物<rt>せいぶつ</rt></ruby>の<ruby>体<rt>からだ</rt></ruby>をつくる<ruby>最小<rt>さいしょう</rt></ruby>の<ruby>単位<rt>たんい</rt></ruby>は？", level: "m2", subject: "rika" },
  { word: "消化", meaning: "<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>を<ruby>体<rt>からだ</rt></ruby>に<ruby>吸収<rt>きゅうしゅう</rt></ruby>できる<ruby>形<rt>かたち</rt></ruby>に<ruby>分解<rt>ぶんかい</rt></ruby>することは？", level: "m2", subject: "rika" },
  { word: "動脈", meaning: "<ruby>心臓<rt>しんぞう</rt></ruby>から<ruby>送<rt>おく</rt></ruby>り<ruby>出<rt>だ</rt></ruby>される<ruby>血液<rt>けつえき</rt></ruby>が<ruby>流<rt>なが</rt></ruby>れる<ruby>血管<rt>けっかん</rt></ruby>は？", level: "m2", subject: "rika" },
  { word: "静脈", meaning: "<ruby>心臓<rt>しんぞう</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>る<ruby>血液<rt>けつえき</rt></ruby>が<ruby>流<rt>なが</rt></ruby>れる<ruby>血管<rt>けっかん</rt></ruby>は？", level: "m2", subject: "rika" },
  { word: "前線", meaning: "<ruby>暖<rt>あたた</rt></ruby>かい<ruby>空気<rt>くうき</rt></ruby>と<ruby>冷<rt>つめ</rt></ruby>たい<ruby>空気<rt>くうき</rt></ruby>がぶつかる<ruby>境目<rt>さかいめ</rt></ruby>は？", level: "m2", subject: "rika" },
  { word: "飽和水蒸気量", meaning: "<ruby>空気<rt>くうき</rt></ruby>1m³に<ruby>含<rt>ふく</rt></ruby>める<ruby>水蒸気<rt>すいじょうき</rt></ruby>の<ruby>最大量<rt>さいだいりょう</rt></ruby>は？", level: "m2", subject: "rika" },
  { word: "オームの法則", meaning: "<ruby>電圧<rt>でんあつ</rt></ruby>＝<ruby>電流<rt>でんりゅう</rt></ruby>×<ruby>抵抗<rt>ていこう</rt></ruby>の<ruby>法則<rt>ほうそく</rt></ruby>は？", level: "m2", subject: "rika" },

  // ===========================
  // 算数 - 小5-6年
  // ===========================
  { word: "底辺×高さ÷2", meaning: "<ruby>三角形<rt>さんかくけい</rt></ruby>の<ruby>面積<rt>めんせき</rt></ruby>の<ruby>公式<rt>こうしき</rt></ruby>は？", level: "e56", subject: "sansu" },
  { word: "縦×横", meaning: "<ruby>長方形<rt>ちょうほうけい</rt></ruby>の<ruby>面積<rt>めんせき</rt></ruby>の<ruby>公式<rt>こうしき</rt></ruby>は？", level: "e56", subject: "sansu" },
  { word: "（上底＋下底）×高さ÷2", meaning: "<ruby>台形<rt>だいけい</rt></ruby>の<ruby>面積<rt>めんせき</rt></ruby>の<ruby>公式<rt>こうしき</rt></ruby>は？", level: "e56", subject: "sansu" },
  { word: "対角線×対角線÷2", meaning: "ひし<ruby>形<rt>がた</rt></ruby>の<ruby>面積<rt>めんせき</rt></ruby>の<ruby>公式<rt>こうしき</rt></ruby>は？", level: "e56", subject: "sansu" },
  { word: "半径×半径×3.14", meaning: "<ruby>円<rt>えん</rt></ruby>の<ruby>面積<rt>めんせき</rt></ruby>の<ruby>公式<rt>こうしき</rt></ruby>は？", level: "e56", subject: "sansu" },
  { word: "直径×3.14", meaning: "<ruby>円<rt>えん</rt></ruby>の<ruby>周<rt>まわ</rt></ruby>りの<ruby>長<rt>なが</rt></ruby>さの<ruby>公式<rt>こうしき</rt></ruby>は？", level: "e56", subject: "sansu" },
  { word: "速さ×時間", meaning: "<ruby>道<rt>みち</rt></ruby>のり（<ruby>距離<rt>きょり</rt></ruby>）の<ruby>公式<rt>こうしき</rt></ruby>は？", level: "e56", subject: "sansu" },
  { word: "道のり÷時間", meaning: "<ruby>速<rt>はや</rt></ruby>さの<ruby>公式<rt>こうしき</rt></ruby>は？", level: "e56", subject: "sansu" },
  { word: "道のり÷速さ", meaning: "<ruby>時間<rt>じかん</rt></ruby>の<ruby>公式<rt>こうしき</rt></ruby>は？", level: "e56", subject: "sansu" },
  { word: "3.14", meaning: "<ruby>円周率<rt>えんしゅうりつ</rt></ruby>は<ruby>約<rt>やく</rt></ruby>いくつ？", level: "e56", subject: "sansu" },

  // ===========================
  // 算数・数学 - 中1年
  // ===========================
  { word: "πr²", meaning: "<ruby>円<rt>えん</rt></ruby>の<ruby>面積<rt>めんせき</rt></ruby>の<ruby>公式<rt>こうしき</rt></ruby>は？（<ruby>文字式<rt>もじしき</rt></ruby>）", level: "m1", subject: "sansu" },
  { word: "2πr", meaning: "<ruby>円<rt>えん</rt></ruby>の<ruby>周<rt>まわ</rt></ruby>りの<ruby>長<rt>なが</rt></ruby>さの<ruby>公式<rt>こうしき</rt></ruby>は？（<ruby>文字式<rt>もじしき</rt></ruby>）", level: "m1", subject: "sansu" },
  { word: "a(b+c) = ab+ac", meaning: "<ruby>分配法則<rt>ぶんぱいほうそく</rt></ruby>の<ruby>式<rt>しき</rt></ruby>は？", level: "m1", subject: "sansu" },
  { word: "移項", meaning: "<ruby>等式<rt>とうしき</rt></ruby>で<ruby>項<rt>こう</rt></ruby>を<ruby>反対側<rt>はんたいがわ</rt></ruby>に<ruby>符号<rt>ふごう</rt></ruby>を<ruby>変<rt>か</rt></ruby>えて<ruby>移<rt>うつ</rt></ruby>すことは？", level: "m1", subject: "sansu" },
  { word: "比例", meaning: "xが2<ruby>倍<rt>ばい</rt></ruby>になるとyも2<ruby>倍<rt>ばい</rt></ruby>になる<ruby>関係<rt>かんけい</rt></ruby>は？", level: "m1", subject: "sansu" },
  { word: "反比例", meaning: "xが2<ruby>倍<rt>ばい</rt></ruby>になるとyが½になる<ruby>関係<rt>かんけい</rt></ruby>は？", level: "m1", subject: "sansu" },
  { word: "正の数", meaning: "0より<ruby>大<rt>おお</rt></ruby>きい<ruby>数<rt>かず</rt></ruby>のことは？", level: "m1", subject: "sansu" },
  { word: "負の数", meaning: "0より<ruby>小<rt>ちい</rt></ruby>さい<ruby>数<rt>かず</rt></ruby>のことは？", level: "m1", subject: "sansu" },
  { word: "絶対値", meaning: "<ruby>数直線<rt>すうちょくせん</rt></ruby>で0からの<ruby>距離<rt>きょり</rt></ruby>のことは？", level: "m1", subject: "sansu" },
  { word: "180°", meaning: "<ruby>三角形<rt>さんかくけい</rt></ruby>の<ruby>内角<rt>ないかく</rt></ruby>の<ruby>和<rt>わ</rt></ruby>は？", level: "m1", subject: "sansu" },

  // ===========================
  // 算数・数学 - 中2年
  // ===========================
  { word: "連立方程式", meaning: "2つの<ruby>方程式<rt>ほうていしき</rt></ruby>を<ruby>同時<rt>どうじ</rt></ruby>に<ruby>解<rt>と</rt></ruby>く<ruby>問題<rt>もんだい</rt></ruby>は？", level: "m2", subject: "sansu" },
  { word: "一次関数", meaning: "y=ax+bで<ruby>表<rt>あらわ</rt></ruby>される<ruby>関数<rt>かんすう</rt></ruby>は？", level: "m2", subject: "sansu" },
  { word: "傾き", meaning: "グラフの<ruby>右<rt>みぎ</rt></ruby>への<ruby>上<rt>あ</rt></ruby>がり<ruby>具合<rt>ぐあい</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>す<ruby>値<rt>あたい</rt></ruby>は？", level: "m2", subject: "sansu" },
  { word: "切片", meaning: "グラフがy<ruby>軸<rt>じく</rt></ruby>と<ruby>交<rt>まじ</rt></ruby>わる<ruby>点<rt>てん</rt></ruby>の<ruby>値<rt>あたい</rt></ruby>は？", level: "m2", subject: "sansu" },
  { word: "合同", meaning: "2つの<ruby>図形<rt>ずけい</rt></ruby>がぴったり<ruby>重<rt>かさ</rt></ruby>なることは？", level: "m2", subject: "sansu" },
  { word: "証明", meaning: "ある<ruby>事柄<rt>ことがら</rt></ruby>が<ruby>正<rt>ただ</rt></ruby>しいことを<ruby>論理的<rt>ろんりてき</rt></ruby>に<ruby>示<rt>しめ</rt></ruby>すことは？", level: "m2", subject: "sansu" },
  { word: "360°", meaning: "<ruby>多角形<rt>たかくけい</rt></ruby>の<ruby>外角<rt>がいかく</rt></ruby>の<ruby>和<rt>わ</rt></ruby>は？", level: "m2", subject: "sansu" },
  { word: "確率", meaning: "ある<ruby>事柄<rt>ことがら</rt></ruby>が<ruby>起<rt>お</rt></ruby>きる<ruby>割合<rt>わりあい</rt></ruby>のことは？", level: "m2", subject: "sansu" },
  { word: "対頂角", meaning: "2つの<ruby>直線<rt>ちょくせん</rt></ruby>が<ruby>交<rt>まじ</rt></ruby>わるとき、<ruby>向<rt>む</rt></ruby>かい<ruby>合<rt>あ</rt></ruby>う<ruby>角<rt>かく</rt></ruby>は？", level: "m2", subject: "sansu" },
  { word: "同位角", meaning: "<ruby>平行線<rt>へいこうせん</rt></ruby>と<ruby>直線<rt>ちょくせん</rt></ruby>が<ruby>交<rt>まじ</rt></ruby>わるとき、<ruby>同<rt>おな</rt></ruby>じ<ruby>位置<rt>いち</rt></ruby>にある<ruby>角<rt>かく</rt></ruby>は？", level: "m2", subject: "sansu" },

  // ===========================
  // 社会 - 小5-6年
  // ===========================
  { word: "東京", meaning: "<ruby>日本<rt>にほん</rt></ruby>の<ruby>首都<rt>しゅと</rt></ruby>は？", level: "e56", subject: "shakai" },
  { word: "国会", meaning: "<ruby>法律<rt>ほうりつ</rt></ruby>を<ruby>作<rt>つく</rt></ruby>るところは？", level: "e56", subject: "shakai" },
  { word: "内閣", meaning: "<ruby>政治<rt>せいじ</rt></ruby>を<ruby>行<rt>おこな</rt></ruby>う<ruby>機関<rt>きかん</rt></ruby>は？", level: "e56", subject: "shakai" },
  { word: "裁判所", meaning: "<ruby>争<rt>あらそ</rt></ruby>いごとを<ruby>法律<rt>ほうりつ</rt></ruby>で<ruby>解決<rt>かいけつ</rt></ruby>するところは？", level: "e56", subject: "shakai" },
  { word: "三権分立", meaning: "<ruby>国会<rt>こっかい</rt></ruby>・<ruby>内閣<rt>ないかく</rt></ruby>・<ruby>裁判所<rt>さいばんしょ</rt></ruby>が<ruby>権力<rt>けんりょく</rt></ruby>を<ruby>分<rt>わ</rt></ruby>ける<ruby>仕組<rt>しく</rt></ruby>みは？", level: "e56", subject: "shakai" },
  { word: "稲作", meaning: "<ruby>弥生時代<rt>やよいじだい</rt></ruby>に<ruby>大陸<rt>たいりく</rt></ruby>から<ruby>伝<rt>つた</rt></ruby>わった<ruby>米<rt>こめ</rt></ruby>を<ruby>作<rt>つく</rt></ruby>ることは？", level: "e56", subject: "shakai" },
  { word: "聖徳太子", meaning: "<ruby>十七条<rt>じゅうしちじょう</rt></ruby>の<ruby>憲法<rt>けんぽう</rt></ruby>を<ruby>作<rt>つく</rt></ruby>った<ruby>人物<rt>じんぶつ</rt></ruby>は？", level: "e56", subject: "shakai" },
  { word: "織田信長", meaning: "<ruby>桶狭間<rt>おけはざま</rt></ruby>の<ruby>戦<rt>たたか</rt></ruby>いで<ruby>有名<rt>ゆうめい</rt></ruby>な<ruby>戦国<rt>せんごく</rt></ruby>武将は？", level: "e56", subject: "shakai" },
  { word: "豊臣秀吉", meaning: "<ruby>天下統一<rt>てんかとういつ</rt></ruby>を<ruby>果<rt>は</rt></ruby>たした<ruby>武将<rt>ぶしょう</rt></ruby>は？", level: "e56", subject: "shakai" },
  { word: "徳川家康", meaning: "<ruby>江戸幕府<rt>えどばくふ</rt></ruby>を<ruby>開<rt>ひら</rt></ruby>いた<ruby>人物<rt>じんぶつ</rt></ruby>は？", level: "e56", subject: "shakai" },
  { word: "明治維新", meaning: "<ruby>江戸時代<rt>えどじだい</rt></ruby>から<ruby>近代国家<rt>きんだいこっか</rt></ruby>へ<ruby>変<rt>か</rt></ruby>わった<ruby>改革<rt>かいかく</rt></ruby>は？", level: "e56", subject: "shakai" },
  { word: "憲法", meaning: "<ruby>国<rt>くに</rt></ruby>の<ruby>最高<rt>さいこう</rt></ruby>の<ruby>法律<rt>ほうりつ</rt></ruby>は？", level: "e56", subject: "shakai" },

  // ===========================
  // 社会 - 中1年（地理）
  // ===========================
  { word: "赤道", meaning: "<ruby>地球<rt>ちきゅう</rt></ruby>を<ruby>南北<rt>なんぼく</rt></ruby>に<ruby>分<rt>わ</rt></ruby>ける<ruby>緯度<rt>いど</rt></ruby>0°の<ruby>線<rt>せん</rt></ruby>は？", level: "m1", subject: "shakai" },
  { word: "本初子午線", meaning: "<ruby>経度<rt>けいど</rt></ruby>0°の<ruby>線<rt>せん</rt></ruby>は？", level: "m1", subject: "shakai" },
  { word: "モンスーン", meaning: "<ruby>季節<rt>きせつ</rt></ruby>によって<ruby>風向<rt>かざむ</rt></ruby>きが<ruby>変<rt>か</rt></ruby>わる<ruby>風<rt>かぜ</rt></ruby>は？", level: "m1", subject: "shakai" },
  { word: "促成栽培", meaning: "<ruby>暖<rt>あたた</rt></ruby>かい<ruby>気候<rt>きこう</rt></ruby>を<ruby>利用<rt>りよう</rt></ruby>して<ruby>出荷<rt>しゅっか</rt></ruby>を<ruby>早<rt>はや</rt></ruby>める<ruby>栽培<rt>さいばい</rt></ruby>は？", level: "m1", subject: "shakai" },
  { word: "抑制栽培", meaning: "<ruby>涼<rt>すず</rt></ruby>しい<ruby>気候<rt>きこう</rt></ruby>を<ruby>利用<rt>りよう</rt></ruby>して<ruby>出荷<rt>しゅっか</rt></ruby>を<ruby>遅<rt>おく</rt></ruby>らせる<ruby>栽培<rt>さいばい</rt></ruby>は？", level: "m1", subject: "shakai" },
  { word: "太平洋", meaning: "<ruby>世界<rt>せかい</rt></ruby>で<ruby>最<rt>もっと</rt></ruby>も<ruby>大<rt>おお</rt></ruby>きい<ruby>海洋<rt>かいよう</rt></ruby>は？", level: "m1", subject: "shakai" },
  { word: "ユーラシア大陸", meaning: "<ruby>世界<rt>せかい</rt></ruby>で<ruby>最<rt>もっと</rt></ruby>も<ruby>大<rt>おお</rt></ruby>きい<ruby>大陸<rt>たいりく</rt></ruby>は？", level: "m1", subject: "shakai" },
  { word: "北海道", meaning: "<ruby>日本<rt>にほん</rt></ruby>で<ruby>最<rt>もっと</rt></ruby>も<ruby>面積<rt>めんせき</rt></ruby>が<ruby>大<rt>おお</rt></ruby>きい<ruby>都道府県<rt>とどうふけん</rt></ruby>は？", level: "m1", subject: "shakai" },
  { word: "排他的経済水域", meaning: "<ruby>沿岸<rt>えんがん</rt></ruby>から200<ruby>海里<rt>かいり</rt></ruby>の<ruby>資源<rt>しげん</rt></ruby>を<ruby>管理<rt>かんり</rt></ruby>できる<ruby>水域<rt>すいいき</rt></ruby>は？", level: "m1", subject: "shakai" },
  { word: "過疎", meaning: "<ruby>人口<rt>じんこう</rt></ruby>が<ruby>大幅<rt>おおはば</rt></ruby>に<ruby>減<rt>へ</rt></ruby>って<ruby>地域<rt>ちいき</rt></ruby>が<ruby>衰退<rt>すいたい</rt></ruby>することは？", level: "m1", subject: "shakai" },
  { word: "過密", meaning: "<ruby>人口<rt>じんこう</rt></ruby>が<ruby>集中<rt>しゅうちゅう</rt></ruby>しすぎることは？", level: "m1", subject: "shakai" },
  { word: "地産地消", meaning: "その<ruby>地域<rt>ちいき</rt></ruby>で<ruby>作<rt>つく</rt></ruby>ったものをその<ruby>地域<rt>ちいき</rt></ruby>で<ruby>消費<rt>しょうひ</rt></ruby>することは？", level: "m1", subject: "shakai" },

  // ===========================
  // 社会 - 中2年（歴史）
  // ===========================
  { word: "大化の改新", meaning: "645<ruby>年<rt>ねん</rt></ruby>に<ruby>中大兄皇子<rt>なかのおおえのおうじ</rt></ruby>らが<ruby>行<rt>おこな</rt></ruby>った<ruby>改革<rt>かいかく</rt></ruby>は？", level: "m2", subject: "shakai" },
  { word: "鎌倉幕府", meaning: "<ruby>源頼朝<rt>みなもとのよりとも</rt></ruby>が<ruby>開<rt>ひら</rt></ruby>いた<ruby>幕府<rt>ばくふ</rt></ruby>は？", level: "m2", subject: "shakai" },
  { word: "元寇", meaning: "モンゴル<ruby>帝国<rt>ていこく</rt></ruby>が<ruby>日本<rt>にほん</rt></ruby>に<ruby>攻<rt>せ</rt></ruby>めてきた<ruby>事件<rt>じけん</rt></ruby>は？", level: "m2", subject: "shakai" },
  { word: "応仁の乱", meaning: "1467<ruby>年<rt>ねん</rt></ruby>に<ruby>始<rt>はじ</rt></ruby>まった<ruby>戦国時代<rt>せんごくじだい</rt></ruby>のきっかけとなった<ruby>内乱<rt>ないらん</rt></ruby>は？", level: "m2", subject: "shakai" },
  { word: "鎖国", meaning: "<ruby>江戸幕府<rt>えどばくふ</rt></ruby>が<ruby>外国<rt>がいこく</rt></ruby>との<ruby>交流<rt>こうりゅう</rt></ruby>を<ruby>制限<rt>せいげん</rt></ruby>した<ruby>政策<rt>せいさく</rt></ruby>は？", level: "m2", subject: "shakai" },
  { word: "ペリー", meaning: "1853<ruby>年<rt>ねん</rt></ruby>に<ruby>黒船<rt>くろふね</rt></ruby>で<ruby>来航<rt>らいこう</rt></ruby>した<ruby>人物<rt>じんぶつ</rt></ruby>は？", level: "m2", subject: "shakai" },
  { word: "廃藩置県", meaning: "<ruby>藩<rt>はん</rt></ruby>をなくして<ruby>県<rt>けん</rt></ruby>を<ruby>置<rt>お</rt></ruby>いた<ruby>政策<rt>せいさく</rt></ruby>は？", level: "m2", subject: "shakai" },
  { word: "富国強兵", meaning: "<ruby>国<rt>くに</rt></ruby>を<ruby>豊<rt>ゆた</rt></ruby>かにし<ruby>軍隊<rt>ぐんたい</rt></ruby>を<ruby>強<rt>つよ</rt></ruby>くする<ruby>政策<rt>せいさく</rt></ruby>は？", level: "m2", subject: "shakai" },
  { word: "日清戦争", meaning: "1894<ruby>年<rt>ねん</rt></ruby>に<ruby>日本<rt>にほん</rt></ruby>と<ruby>清<rt>しん</rt></ruby>（<ruby>中国<rt>ちゅうごく</rt></ruby>）が<ruby>戦<rt>たたか</rt></ruby>った<ruby>戦争<rt>せんそう</rt></ruby>は？", level: "m2", subject: "shakai" },
  { word: "日露戦争", meaning: "1904<ruby>年<rt>ねん</rt></ruby>に<ruby>日本<rt>にほん</rt></ruby>とロシアが<ruby>戦<rt>たたか</rt></ruby>った<ruby>戦争<rt>せんそう</rt></ruby>は？", level: "m2", subject: "shakai" },
  { word: "大日本帝国憲法", meaning: "1889<ruby>年<rt>ねん</rt></ruby>に<ruby>発布<rt>はっぷ</rt></ruby>された<ruby>日本<rt>にほん</rt></ruby><ruby>初<rt>はつ</rt></ruby>の<ruby>憲法<rt>けんぽう</rt></ruby>は？", level: "m2", subject: "shakai" },
  { word: "日本国憲法", meaning: "1946<ruby>年<rt>ねん</rt></ruby>に<ruby>公布<rt>こうふ</rt></ruby>された<ruby>現在<rt>げんざい</rt></ruby>の<ruby>憲法<rt>けんぽう</rt></ruby>は？", level: "m2", subject: "shakai" }
];
