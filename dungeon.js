// ダンジョンデータ
const DUNGEONS = [
  {
    id: "d01",
    name: "<ruby>英語<rt>えいご</rt></ruby>の<ruby>森<rt>もり</rt></ruby>",
    icon: "🌲",
    subject: "english",
    level: "all",
    bossName: "ゴブリン",
    bossIcon: "👺",
    bossHp: 100,
    reward: 50,
    description: "<ruby>森<rt>もり</rt></ruby>に<ruby>住<rt>す</rt></ruby>むゴブリンを<ruby>倒<rt>たお</rt></ruby>せ！"
  },
  {
    id: "d02",
    name: "<ruby>漢字<rt>かんじ</rt></ruby>の<ruby>洞窟<rt>どうくつ</rt></ruby>",
    icon: "🕳️",
    subject: "kokugo",
    level: "all",
    bossName: "ストーンゴーレム",
    bossIcon: "🗿",
    bossHp: 100,
    reward: 50,
    description: "<ruby>洞窟<rt>どうくつ</rt></ruby>の<ruby>番人<rt>ばんにん</rt></ruby>ゴーレムを<ruby>倒<rt>たお</rt></ruby>せ！"
  },
  {
    id: "d03",
    name: "<ruby>理科<rt>りか</rt></ruby>の<ruby>塔<rt>とう</rt></ruby>",
    icon: "🏗️",
    subject: "rika",
    level: "all",
    bossName: "マッドサイエンティスト",
    bossIcon: "🧟",
    bossHp: 120,
    reward: 60,
    description: "<ruby>塔<rt>とう</rt></ruby>の<ruby>主<rt>ぬし</rt></ruby>を<ruby>倒<rt>たお</rt></ruby>せ！"
  },
  {
    id: "d04",
    name: "<ruby>数学<rt>すうがく</rt></ruby>の<ruby>迷宮<rt>めいきゅう</rt></ruby>",
    icon: "🏛️",
    subject: "sansu",
    level: "all",
    bossName: "ミノタウロス",
    bossIcon: "🐂",
    bossHp: 120,
    reward: 60,
    description: "<ruby>迷宮<rt>めいきゅう</rt></ruby>の<ruby>奥<rt>おく</rt></ruby>のミノタウロスを<ruby>倒<rt>たお</rt></ruby>せ！"
  },
  {
    id: "d05",
    name: "<ruby>社会<rt>しゃかい</rt></ruby>の<ruby>城<rt>しろ</rt></ruby>",
    icon: "🏰",
    subject: "shakai",
    level: "all",
    bossName: "ダークナイト",
    bossIcon: "🛡️",
    bossHp: 120,
    reward: 60,
    description: "<ruby>城<rt>しろ</rt></ruby>を<ruby>守<rt>まも</rt></ruby>るダークナイトを<ruby>倒<rt>たお</rt></ruby>せ！"
  },
  {
    id: "d06",
    name: "<ruby>世界樹<rt>せかいじゅ</rt></ruby>の<ruby>試練<rt>しれん</rt></ruby>",
    icon: "🌳",
    subject: "all",
    level: "all",
    bossName: "<ruby>魔王<rt>まおう</rt></ruby>ディアボロス",
    bossIcon: "😈",
    bossHp: 150,
    reward: 100,
    description: "<ruby>全教科<rt>ぜんきょうか</rt></ruby>ミックス！<ruby>最終<rt>さいしゅう</rt></ruby>ボスに<ruby>挑<rt>いど</rt></ruby>め！"
  }
];

const PLAYER_MAX_HP = 30;
const DAMAGE_PER_CORRECT = 10;
const DAMAGE_PER_WRONG = 10;
