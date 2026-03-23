const QUESTIONS_PER_QUIZ = 10;
const POINTS_PER_CORRECT = 5;      // 4択クイズ：1問5pt
const POINTS_PER_SPELL = 10;       // スペル入力：1問10pt

// ============================
// ユーザー管理システム
// ============================

let currentUser = "";

function getKey(key) {
  return `luca_${currentUser}_${key}`;
}

function getCurrentUser() {
  return localStorage.getItem("luca_current_user") || "";
}

function setCurrentUser(name) {
  currentUser = name;
  localStorage.setItem("luca_current_user", name);
  // ユーザー一覧に追加
  const users = getSavedUsers();
  if (!users.includes(name)) {
    users.push(name);
    localStorage.setItem("luca_users", JSON.stringify(users));
  }
}

function getSavedUsers() {
  const saved = localStorage.getItem("luca_users");
  return saved ? JSON.parse(saved) : [];
}

function renderSavedUsers() {
  const container = document.getElementById("saved-users");
  const users = getSavedUsers();
  container.innerHTML = "";
  if (users.length === 0) return;

  const label = document.createElement("p");
  label.style.cssText = "text-align:center; color:#888; font-size:0.85rem; margin-bottom:8px;";
  label.textContent = "または、つづきから：";
  container.appendChild(label);

  users.forEach((name) => {
    const btn = document.createElement("button");
    btn.className = "saved-user-btn";
    btn.textContent = name;
    btn.addEventListener("click", () => {
      loginAs(name);
    });
    container.appendChild(btn);
  });
}

function loginAs(name) {
  setCurrentUser(name);
  updatePointDisplay();
  updateCollectionCount();
  checkNewsBadge();
  document.getElementById("home-points").textContent = loadPoints() + " pt";
  showPage("home-page");
}

// ログインボタン
document.getElementById("login-btn").addEventListener("click", () => {
  const name = document.getElementById("login-name").value.trim();
  if (!name) return;
  loginAs(name);
});

// Enterキーでもログイン
document.getElementById("login-name").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("login-btn").click();
  }
});

// ログアウト
document.getElementById("logout-btn").addEventListener("click", () => {
  currentUser = "";
  localStorage.removeItem("luca_current_user");
  document.getElementById("login-name").value = "";
  renderSavedUsers();
  showPage("login-page");
});

// 起動時：前回のユーザーがいればそのまま、いなければログイン画面
(function checkAutoLogin() {
  const saved = getCurrentUser();
  if (saved) {
    currentUser = saved;
  } else {
    renderSavedUsers();
  }
})();

// ============================
// ポイント管理（ユーザー別）
// ============================

function loadPoints() {
  return parseInt(localStorage.getItem(getKey("points")) || "0", 10);
}

function savePoints(points) {
  localStorage.setItem(getKey("points"), String(points));
}

function addPoints(amount) {
  const current = loadPoints();
  const newTotal = current + amount;
  savePoints(newTotal);
  updatePointDisplay();
  return newTotal;
}

function updatePointDisplay() {
  const points = loadPoints();
  const el = document.getElementById("home-points");
  if (el) el.textContent = `${points} pt`;
}

function showPointPopup(amount) {
  const popup = document.createElement("div");
  popup.className = "point-popup";
  popup.textContent = `+${amount} pt`;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 900);
}

// ============================
// 統計データ（ユーザー別）
// ============================

function loadStats() {
  const saved = localStorage.getItem(getKey("stats"));
  return saved ? JSON.parse(saved) : { total: 0, correct: 0, dungeonWins: 0 };
}

function saveStats(stats) {
  localStorage.setItem(getKey("stats"), JSON.stringify(stats));
}

function recordAnswer(isCorrect) {
  const stats = loadStats();
  stats.total++;
  if (isCorrect) stats.correct++;
  saveStats(stats);
}

function recordDungeonWin() {
  const stats = loadStats();
  stats.dungeonWins++;
  saveStats(stats);
}

// ============================
// データ管理（ユーザー別）
// ============================

function loadUserWords() {
  const saved = localStorage.getItem(getKey("user-words"));
  return saved ? JSON.parse(saved) : [];
}

function saveUserWords(words) {
  localStorage.setItem(getKey("user-words"), JSON.stringify(words));
}

function loadWords() {
  const userWords = loadUserWords();
  return [...DEFAULT_WORDS, ...userWords];
}

// --- 選択肢生成 ---

function generateSimilarWord(word) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = word;
  for (let i = 0; i < 20; i++) {
    const arr = word.split("");
    const pos = Math.floor(Math.random() * arr.length);
    let newChar;
    do {
      newChar = chars[Math.floor(Math.random() * chars.length)];
    } while (newChar === arr[pos]);
    arr[pos] = newChar;
    result = arr.join("");
    if (result !== word) break;
  }
  return result;
}

function makeChoices(correctWord, allWords, subject) {
  const distractors = new Set();

  // まず同じ教科の単語から選ぶ
  const others = allWords
    .map((w) => w.word)
    .filter((w) => w !== correctWord);

  const shuffled = others.sort(() => Math.random() - 0.5);
  for (const w of shuffled) {
    if (distractors.size >= 3) break;
    distractors.add(w);
  }

  // 英語の場合、足りなければ似た文字を生成
  if (subject === "english") {
    let safeCount = 0;
    while (distractors.size < 3 && safeCount < 50) {
      const fake = generateSimilarWord(correctWord);
      if (fake !== correctWord) distractors.add(fake);
      safeCount++;
    }
  }

  const choices = [correctWord, ...Array.from(distractors).slice(0, 3)];
  return choices.sort(() => Math.random() - 0.5);
}

// --- ページ遷移 ---

let selectedSubject = "";
let selectedLevel = "";

function showPage(pageId) {
  document.querySelectorAll(".full-page").forEach((p) => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

function setSubjectColors(subjectId) {
  if (subjectId && SUBJECTS[subjectId]) {
    const colors = SUBJECTS[subjectId].colors;
    document.documentElement.style.setProperty("--dot-color1", colors[0]);
    document.documentElement.style.setProperty("--dot-color2", colors[1]);
    document.documentElement.style.setProperty("--dot-color3", colors[2]);
  } else {
    // ホーム画面のデフォルト色
    document.documentElement.style.setProperty("--dot-color1", "#b3e0f2");
    document.documentElement.style.setProperty("--dot-color2", "#87ceeb");
    document.documentElement.style.setProperty("--dot-color3", "#d6f0fa");
  }
}

// 戻るボタン
document.querySelectorAll(".back-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.back;
    if (target === "home-page") {
      setSubjectColors(null);
      updatePointDisplay();
    }
    showPage(target);
  });
});

// --- お知らせ機能 ---

document.getElementById("news-btn").addEventListener("click", () => {
  renderNews();
  // 既読にする
  localStorage.setItem(getKey("news-read"), NEWS_DATA[0].id);
  document.getElementById("news-badge").style.display = "none";
  showPage("news-page");
});

function renderNews() {
  const container = document.getElementById("news-list");
  container.innerHTML = "";

  NEWS_DATA.forEach((news) => {
    const item = document.createElement("div");
    item.className = "news-item";
    item.innerHTML = `
      <div class="news-item-header">
        <span class="news-tag" style="background-color:${news.tagColor}">${news.tag}</span>
        <span class="news-date">${news.date}</span>
      </div>
      <div class="news-title">${news.title}</div>
      <div class="news-body" id="body-${news.id}">${news.body}</div>
      <button class="news-toggle" data-target="body-${news.id}">▼ くわしく<ruby>見<rt>み</rt></ruby>る</button>
    `;
    container.appendChild(item);
  });

  // 開閉トグル
  container.querySelectorAll(".news-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const body = document.getElementById(btn.dataset.target);
      body.classList.toggle("open");
      btn.textContent = body.classList.contains("open") ? "▲ とじる" : "▼ くわしく見る";
    });
  });
}

function checkNewsBadge() {
  const lastRead = localStorage.getItem(getKey("news-read")) || "";
  if (NEWS_DATA.length > 0 && NEWS_DATA[0].id !== lastRead) {
    const badge = document.getElementById("news-badge");
    badge.textContent = "NEW";
    badge.style.display = "inline";
  }
}

// 起動時：ログイン済みならホームへ
if (currentUser) {
  updatePointDisplay();
  updateCollectionCount();
  checkNewsBadge();
  showPage("home-page");
} else {
  renderSavedUsers();
}

// ホーム → ダンジョン選択
document.getElementById("dungeon-btn").addEventListener("click", () => {
  buildDungeonList();
  showPage("dungeon-select-page");
});

// --- ダンジョンシステム ---

let currentDungeon = null;
let dungeonWords = [];
let dungeonIndex = 0;
let bossHp = 0;
let playerHp = 0;
let dungeonAnswered = false;

function buildDungeonList() {
  const container = document.getElementById("dungeon-list");
  container.innerHTML = "";

  DUNGEONS.forEach((dg) => {
    const item = document.createElement("div");
    item.className = "dungeon-item";
    item.innerHTML = `
      <div class="dungeon-item-icon">${dg.icon}</div>
      <div class="dungeon-item-info">
        <div class="dungeon-item-name">${dg.name}</div>
        <div class="dungeon-item-desc">${dg.description}</div>
        <div class="dungeon-item-reward">クリア<ruby>報酬<rt>ほうしゅう</rt></ruby>：${dg.reward} pt</div>
      </div>
      <div style="font-size:1.2rem;">→</div>
    `;
    item.addEventListener("click", () => startDungeon(dg));
    container.appendChild(item);
  });
}

function startDungeon(dungeon) {
  currentDungeon = dungeon;
  bossHp = dungeon.bossHp;
  playerHp = PLAYER_MAX_HP;
  dungeonAnswered = false;

  // ダンジョンの教科に合わせた単語を取得
  const all = loadWords();
  let pool;
  if (dungeon.subject === "all") {
    pool = all;
  } else {
    pool = all.filter((w) => w.subject === dungeon.subject);
  }

  if (pool.length < 4) {
    alert("この教科の問題が足りないにゃ！問題を追加してにゃ！");
    return;
  }

  // シャッフル
  dungeonWords = pool.sort(() => Math.random() - 0.5);
  dungeonIndex = 0;

  showPage("dungeon-battle-page");
  updateBattleUI();
  showBattleQuestion();
}

function updateBattleUI() {
  document.getElementById("boss-icon").textContent = currentDungeon.bossIcon;
  document.getElementById("boss-icon").className = "boss-icon";
  document.getElementById("boss-name").innerHTML = currentDungeon.bossName;

  const bossPercent = Math.max(0, (bossHp / currentDungeon.bossHp) * 100);
  document.getElementById("boss-hp-bar").style.width = bossPercent + "%";
  document.getElementById("boss-hp-text").textContent = `HP: ${Math.max(0, bossHp)} / ${currentDungeon.bossHp}`;

  const playerPercent = Math.max(0, (playerHp / PLAYER_MAX_HP) * 100);
  document.getElementById("player-hp-bar").style.width = playerPercent + "%";
  document.getElementById("player-hp-text").textContent = `HP: ${Math.max(0, playerHp)} / ${PLAYER_MAX_HP}`;
}

function showBattleQuestion() {
  dungeonAnswered = false;
  document.getElementById("battle-answer-area").style.display = "none";
  document.getElementById("battle-result").style.display = "none";

  // 問題がなくなったらループ
  if (dungeonIndex >= dungeonWords.length) {
    dungeonIndex = 0;
    dungeonWords.sort(() => Math.random() - 0.5);
  }

  const item = dungeonWords[dungeonIndex];
  const subject = item.subject || "english";
  const choices = makeChoices(item.word, dungeonWords, subject);

  document.getElementById("battle-question").innerHTML = item.meaning;

  const choicesEl = document.getElementById("battle-choices");
  choicesEl.innerHTML = "";

  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => handleBattleAnswer(choice, item.word));
    choicesEl.appendChild(btn);
  });
}

function handleBattleAnswer(selected, correct) {
  if (dungeonAnswered) return;
  dungeonAnswered = true;

  const isCorrect = selected === correct;
  const buttons = document.querySelectorAll("#battle-choices .choice-btn");
  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add("correct");
    else if (btn.textContent === selected && !isCorrect) btn.classList.add("wrong");
  });

  const answerArea = document.getElementById("battle-answer-area");
  const answerMsg = document.getElementById("battle-answer-msg");
  answerArea.style.display = "block";

  recordAnswer(isCorrect);

  if (isCorrect) {
    bossHp -= DAMAGE_PER_CORRECT;
    answerMsg.innerHTML = `⚔️ ${DAMAGE_PER_CORRECT}ダメージ！（<ruby>正解<rt>せいかい</rt></ruby>：${correct}）`;
    answerArea.style.backgroundColor = "#d4f4e7";
    answerArea.style.color = "#2a7a50";
    // ボス被弾アニメーション
    const bossIcon = document.getElementById("boss-icon");
    bossIcon.className = "boss-icon boss-hit";
    addPoints(POINTS_PER_CORRECT);
    updatePointDisplay();
  } else {
    playerHp -= DAMAGE_PER_WRONG;
    answerMsg.innerHTML = `💥 <ruby>攻撃<rt>こうげき</rt></ruby>を<ruby>受<rt>う</rt></ruby>けた！（<ruby>正解<rt>せいかい</rt></ruby>：${correct}）`;
    answerArea.style.backgroundColor = "#fde8e8";
    answerArea.style.color = "#a03030";
    // プレイヤー被弾アニメーション
    const playerArea = document.querySelector(".player-area");
    playerArea.classList.add("player-hit");
    setTimeout(() => playerArea.classList.remove("player-hit"), 700);
  }

  updateBattleUI();

  // 勝敗チェック
  if (bossHp <= 0) {
    document.getElementById("battle-next-btn").style.display = "none";
    setTimeout(() => showDungeonResult(true), 800);
  } else if (playerHp <= 0) {
    document.getElementById("battle-next-btn").style.display = "none";
    setTimeout(() => showDungeonResult(false), 800);
  } else {
    document.getElementById("battle-next-btn").style.display = "";
  }
}

function showDungeonResult(victory) {
  document.getElementById("battle-choices").innerHTML = "";
  document.getElementById("battle-answer-area").style.display = "none";
  document.getElementById("battle-question").innerHTML = "";

  const resultEl = document.getElementById("battle-result");
  const msgEl = document.getElementById("battle-message");
  const detailEl = document.getElementById("battle-detail");
  resultEl.style.display = "block";

  if (victory) {
    const reward = currentDungeon.reward;
    addPoints(reward);
    updatePointDisplay();

    recordDungeonWin();
    msgEl.innerHTML = "🎉 <ruby>勝利<rt>しょうり</rt></ruby>！！";
    msgEl.style.color = "#d4a017";
    detailEl.innerHTML = `${currentDungeon.bossName}を<ruby>倒<rt>たお</rt></ruby>した！<br>+${reward} pt ゲット！`;
  } else {
    msgEl.innerHTML = "💀 <ruby>敗北<rt>はいぼく</rt></ruby>…";
    msgEl.style.color = "#a03030";
    detailEl.innerHTML = `<ruby>残念<rt>ざんねん</rt></ruby>…もっと<ruby>勉強<rt>べんきょう</rt></ruby>して<ruby>再挑戦<rt>さいちょうせん</rt></ruby>にゃ！`;
  }

  // ボタン追加
  const choicesEl = document.getElementById("battle-choices");

  const retryBtn = document.createElement("button");
  retryBtn.className = "result-btn";
  retryBtn.innerHTML = "🔄 もう<ruby>一度<rt>いちど</rt></ruby><ruby>挑戦<rt>ちょうせん</rt></ruby>";
  retryBtn.addEventListener("click", () => startDungeon(currentDungeon));
  choicesEl.appendChild(retryBtn);

  const backBtn = document.createElement("button");
  backBtn.className = "result-btn home";
  backBtn.innerHTML = "← ダンジョン<ruby>選択<rt>せんたく</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>る";
  backBtn.addEventListener("click", () => {
    buildDungeonList();
    showPage("dungeon-select-page");
  });
  choicesEl.appendChild(backBtn);

  const homeBtn = document.createElement("button");
  homeBtn.className = "result-btn home";
  homeBtn.innerHTML = "🏠 ホームに<ruby>戻<rt>もど</rt></ruby>る";
  homeBtn.addEventListener("click", () => {
    setSubjectColors(null);
    updatePointDisplay();
    showPage("home-page");
  });
  choicesEl.appendChild(homeBtn);
}

// 次の攻撃ボタン
document.getElementById("battle-next-btn").addEventListener("click", () => {
  dungeonIndex++;
  showBattleQuestion();
});

// ホーム → ガチャ
document.getElementById("gacha-btn").addEventListener("click", () => {
  openGachaPage();
  showPage("gacha-page");
});

// ホーム → コレクション
document.getElementById("collection-btn").addEventListener("click", () => {
  renderCollection();
  showPage("collection-page");
});

// ガチャを回す（連続対応）
document.querySelectorAll(".gacha-pull-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const count = parseInt(btn.dataset.count);
    const totalCost = GACHA_COST * count;
    const points = loadPoints();
    const errorEl = document.getElementById("gacha-error");

    if (points < totalCost) {
      errorEl.innerHTML = "ポイントが<ruby>足<rt>た</rt></ruby>りないにゃ…<ruby>勉強<rt>べんきょう</rt></ruby>してポイントを<ruby>貯<rt>た</rt></ruby>めよう！";
      errorEl.style.display = "block";
      return;
    }

    errorEl.style.display = "none";

    // ポイント消費
    savePoints(points - totalCost);
    document.getElementById("gacha-pt").textContent = loadPoints();
    updatePointDisplay();

    // ガチャ実行
    const cards = [];
    for (let i = 0; i < count; i++) {
      const card = rollGacha();
      addToCollection(card.id);
      cards.push(card);
    }
    updateCollectionCount();

    document.getElementById("gacha-intro").style.display = "none";

    if (count === 1) {
      // 1回：大きく表示
      document.getElementById("gacha-multi-result").style.display = "none";
      const card = cards[0];
      const rarity = RARITIES[card.rarity];
      const resultEl = document.getElementById("gacha-result");
      resultEl.style.display = "block";
      resultEl.style.animation = "none";
      setTimeout(() => { resultEl.style.animation = ""; }, 10);

      const rarityLabel = document.getElementById("gacha-rarity-label");
      rarityLabel.innerHTML = rarity.name;
      rarityLabel.style.backgroundColor = rarity.bgColor;
      rarityLabel.style.color = rarity.color;

      const display = document.getElementById("gacha-card-display");
      display.className = "gacha-card-display rarity-" + card.rarity;
      const iconEl = document.getElementById("gacha-card-icon");
      if (card.image) {
        iconEl.innerHTML = `<img src="${card.image}" alt="${card.name}" class="gacha-card-img" />`;
      } else {
        iconEl.textContent = card.icon;
      }
      document.getElementById("gacha-card-name").innerHTML = card.name;
      document.getElementById("gacha-card-desc").innerHTML = card.description;
    } else {
      // 複数回：グリッド表示
      document.getElementById("gacha-result").style.display = "none";
      const multiEl = document.getElementById("gacha-multi-result");
      multiEl.style.display = "grid";
      multiEl.innerHTML = "";

      cards.forEach((card) => {
        const rarity = RARITIES[card.rarity];
        const div = document.createElement("div");
        div.className = `gacha-mini-card rarity-${card.rarity}`;
        const iconHtml = card.image
          ? `<img src="${card.image}" alt="${card.name}" />`
          : `<div style="font-size:1.5rem;">${card.icon}</div>`;
        div.innerHTML = `${iconHtml}<div>${card.name}</div>`;
        multiEl.appendChild(div);
      });
    }
  });
});

function openGachaPage() {
  document.getElementById("gacha-pt").textContent = loadPoints();
  document.getElementById("gacha-result").style.display = "none";
  document.getElementById("gacha-intro").style.display = "block";
  document.getElementById("gacha-error").style.display = "none";
}

function updateCollectionCount() {
  const count = getCollectionCount();
  const total = GACHA_CARDS.length;
  const countEl = document.getElementById("col-count");
  const totalEl = document.getElementById("col-total");
  if (countEl) countEl.textContent = count;
  if (totalEl) totalEl.textContent = total;
}

function renderCollection() {
  const grid = document.getElementById("collection-grid");
  grid.innerHTML = "";
  const col = loadCollection();

  GACHA_CARDS.forEach((card) => {
    const owned = col[card.id] || 0;
    const rarity = RARITIES[card.rarity];
    const div = document.createElement("div");
    div.className = `col-card rarity-${card.rarity} ${owned > 0 ? "owned" : "not-owned"}`;
    const iconHtml = card.image
      ? `<img src="${card.image}" alt="${card.name}" class="col-card-img" />`
      : `<div class="col-card-emoji">${card.icon}</div>`;
    div.innerHTML = `
      ${iconHtml}
      <div class="col-card-name">${card.name}</div>
      <span class="col-card-rarity">${rarity.name}</span>
      <div class="col-card-count">${owned > 0 ? "×" + owned : "？"}</div>
    `;
    grid.appendChild(div);
  });
}

// ホーム → ステータス
document.getElementById("status-btn").addEventListener("click", () => {
  renderStatus();
  showPage("status-page");
});

function renderStatus() {
  const stats = loadStats();
  const rate = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  document.getElementById("status-name").textContent = currentUser;
  document.getElementById("stat-points").textContent = loadPoints();
  document.getElementById("stat-total").textContent = stats.total;
  document.getElementById("stat-correct").textContent = stats.correct;
  document.getElementById("stat-rate").textContent = rate + "%";
  document.getElementById("stat-dungeon").textContent = stats.dungeonWins || 0;
  document.getElementById("stat-collection").textContent = getCollectionCount();
}

// ホーム → 教科選択
document.getElementById("start-btn").addEventListener("click", () => {
  showPage("subject-page");
});

// ホーム → 問題管理
document.getElementById("manage-btn").addEventListener("click", () => {
  renderWordList();
  showPage("manage-page");
});

// --- 教科選択ボタンを動的に生成 ---
(function buildSubjectButtons() {
  const container = document.getElementById("subject-buttons");
  for (const [id, sub] of Object.entries(SUBJECTS)) {
    const btn = document.createElement("button");
    btn.className = "subject-btn";
    btn.dataset.subject = id;
    btn.innerHTML = `${sub.icon} ${sub.name}`;
    btn.addEventListener("click", () => {
      selectedSubject = id;
      setSubjectColors(id);
      buildLevelButtons(id);
      showPage("level-page");
    });
    container.appendChild(btn);
  }
})();

// --- レベル選択ボタンを動的に生成 ---
function buildLevelButtons(subjectId) {
  const container = document.getElementById("level-buttons");
  container.innerHTML = "";

  const subject = SUBJECTS[subjectId];
  const availableLevels = subject.levels;

  // レベル選択後の遷移先を決める
  function onLevelSelected(lvId) {
    selectedLevel = lvId;
    if (selectedSubject === "english") {
      showPage("mode-page");
    } else {
      initQuiz();
      showPage("quiz-page");
    }
  }

  // 全レベルボタン
  const allBtn = document.createElement("button");
  allBtn.className = "level-select-btn";
  allBtn.innerHTML = `<ruby>全<rt>ぜん</rt></ruby>レベル`;
  allBtn.addEventListener("click", () => onLevelSelected("all"));
  container.appendChild(allBtn);

  // 各レベルボタン
  availableLevels.forEach((lvId) => {
    const btn = document.createElement("button");
    btn.className = "level-select-btn";
    btn.innerHTML = LEVELS[lvId];
    btn.addEventListener("click", () => onLevelSelected(lvId));
    container.appendChild(btn);
  });
}

// --- モード選択（英語のみ） ---
document.getElementById("mode-quiz-btn").addEventListener("click", () => {
  initQuiz();
  showPage("quiz-page");
});

document.getElementById("mode-spell-btn").addEventListener("click", () => {
  initSpellQuiz();
  showPage("spell-page");
});

// --- スペルクイズの状態 ---
let spellWords = [];
let spellIndex = 0;
let spellOrder = [];
let spellCorrectCount = 0;
let spellWrongIndexes = [];
let spellAnswered = false;

// --- スペルクイズを初期化 ---
function initSpellQuiz() {
  spellWords = getFilteredWords();
  if (spellWords.length === 0) {
    document.getElementById("spell-label").textContent = "";
    document.getElementById("spell-word").innerHTML = "<ruby>単語<rt>たんご</rt></ruby>がないにゃ！";
    document.getElementById("spell-count").textContent = "";
    document.getElementById("spell-input").style.display = "none";
    document.getElementById("spell-check-btn").style.display = "none";
    return;
  }

  const allIndexes = [...Array(spellWords.length).keys()].sort(() => Math.random() - 0.5);
  spellOrder = allIndexes.slice(0, Math.min(QUESTIONS_PER_QUIZ, spellWords.length));
  spellIndex = 0;
  spellCorrectCount = 0;
  spellWrongIndexes = [];
  showSpellQuestion();
}

// --- スペル問題を表示 ---
function showSpellQuestion() {
  spellAnswered = false;
  document.getElementById("spell-answer-area").style.display = "none";
  document.getElementById("spell-input").style.display = "";
  document.getElementById("spell-check-btn").style.display = "";
  document.getElementById("spell-input").value = "";
  document.getElementById("spell-input").disabled = false;
  document.getElementById("spell-check-btn").disabled = false;

  if (spellIndex >= spellOrder.length) {
    showSpellResult();
    return;
  }

  const item = spellWords[spellOrder[spellIndex]];
  document.getElementById("spell-label").innerHTML = "この<ruby>意味<rt>いみ</rt></ruby>の<ruby>英単語<rt>えいたんご</rt></ruby>を<ruby>入力<rt>にゅうりょく</rt></ruby>にゃ！";
  document.getElementById("spell-word").innerHTML = item.meaning;
  document.getElementById("spell-count").innerHTML = `${spellIndex + 1} / ${spellOrder.length} <ruby>問<rt>もん</rt></ruby>`;
  document.getElementById("spell-input").focus();
}

// --- スペル答え合わせ ---
document.getElementById("spell-check-btn").addEventListener("click", checkSpell);
document.getElementById("spell-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !spellAnswered) checkSpell();
});

function checkSpell() {
  if (spellAnswered) return;
  spellAnswered = true;

  const input = document.getElementById("spell-input").value.trim().toUpperCase();
  const item = spellWords[spellOrder[spellIndex]];
  const correct = item.word.toUpperCase();
  const isCorrect = input === correct;

  document.getElementById("spell-input").disabled = true;
  document.getElementById("spell-check-btn").disabled = true;

  const answerArea = document.getElementById("spell-answer-area");
  const answerMsg = document.getElementById("spell-answer-msg");
  const answerDetail = document.getElementById("spell-answer-detail");
  answerArea.style.display = "block";

  if (isCorrect) {
    spellCorrectCount++;
    answerMsg.innerHTML = "<ruby>正解<rt>せいかい</rt></ruby>にゃ！";
    answerMsg.style.color = "#2a7a50";
    answerArea.style.backgroundColor = "#d4f4e7";
    answerArea.style.borderColor = "#4caf82";
    answerDetail.innerHTML = `${item.meaning}（${correct}）`;
    addPoints(POINTS_PER_SPELL);
    updatePointDisplay();
    trackCorrect();
  } else {
    spellWrongIndexes.push(spellOrder[spellIndex]);
    answerMsg.innerHTML = "<ruby>残念<rt>ざんねん</rt></ruby>にゃ…";
    answerMsg.style.color = "#a03030";
    answerArea.style.backgroundColor = "#fde8e8";
    answerArea.style.borderColor = "#e08080";
    answerDetail.innerHTML = `<ruby>正解<rt>せいかい</rt></ruby>：<strong>${correct}</strong><br>${item.meaning}`;
    trackWrong();
  }
}

// --- 次のスペル問題 ---
document.getElementById("spell-next-btn").addEventListener("click", () => {
  spellIndex++;
  showSpellQuestion();
});

// --- スペルクイズ結果 ---
function showSpellResult() {
  const wrong = spellWrongIndexes.length;
  const correct = spellOrder.length - wrong;

  document.getElementById("spell-label").textContent = "";
  document.getElementById("spell-word").textContent = "おつかれさま！";
  document.getElementById("spell-count").innerHTML = `<ruby>正解<rt>せいかい</rt></ruby> ${correct} <ruby>問<rt>もん</rt></ruby> / <ruby>間違<rt>まちが</rt></ruby>い ${wrong} <ruby>問<rt>もん</rt></ruby>`;
  document.getElementById("spell-input").style.display = "none";
  document.getElementById("spell-check-btn").style.display = "none";
  document.getElementById("spell-answer-area").style.display = "none";

  const container = document.createElement("div");
  container.style.cssText = "display:flex;flex-direction:column;gap:10px;margin-top:16px;";

  if (spellWrongIndexes.length > 0) {
    const retryBtn = document.createElement("button");
    retryBtn.className = "result-btn retry";
    retryBtn.innerHTML = `<ruby>間違<rt>まちが</rt></ruby>えた ${wrong} <ruby>問<rt>もん</rt></ruby>をもう<ruby>一度<rt>いちど</rt></ruby>`;
    retryBtn.addEventListener("click", () => {
      spellOrder = [...spellWrongIndexes].sort(() => Math.random() - 0.5);
      spellIndex = 0;
      spellCorrectCount = 0;
      spellWrongIndexes = [];
      container.remove();
      showSpellQuestion();
    });
    container.appendChild(retryBtn);
  }

  const restartBtn = document.createElement("button");
  restartBtn.className = "result-btn";
  restartBtn.innerHTML = "<ruby>最初<rt>さいしょ</rt></ruby>からやる";
  restartBtn.addEventListener("click", () => {
    container.remove();
    initSpellQuiz();
  });
  container.appendChild(restartBtn);

  const homeBtn = document.createElement("button");
  homeBtn.className = "result-btn home";
  homeBtn.innerHTML = "ホームに<ruby>戻<rt>もど</rt></ruby>る";
  homeBtn.addEventListener("click", () => {
    container.remove();
    setSubjectColors(null);
    updatePointDisplay();
    showPage("home-page");
  });
  container.appendChild(homeBtn);

  document.getElementById("spell-word").after(container);
}

// --- クイズの状態 ---
let words = [];
let currentIndex = 0;
let quizOrder = [];
let answered = false;
let correctCount = 0;
let wrongIndexes = [];
let isRetryMode = false;

function getFilteredWords() {
  const all = loadWords().filter((w) => w.subject === selectedSubject);
  if (selectedLevel === "all") return all;
  return all.filter((w) => w.level === selectedLevel);
}

function initQuiz() {
  words = getFilteredWords();
  if (words.length === 0) {
    document.getElementById("quiz-label").textContent = "";
    document.getElementById("quiz-word").innerHTML = "<ruby>問題<rt>もんだい</rt></ruby>がないにゃ！";
    document.getElementById("quiz-count").innerHTML = "<ruby>問題管理<rt>もんだいかんり</rt></ruby>から<ruby>追加<rt>ついか</rt></ruby>してね";
    document.querySelector(".choices").innerHTML = "";
    document.getElementById("answer-area").style.display = "none";
    return;
  }

  const allIndexes = [...Array(words.length).keys()].sort(() => Math.random() - 0.5);
  quizOrder = allIndexes.slice(0, Math.min(QUESTIONS_PER_QUIZ, words.length));

  currentIndex = 0;
  correctCount = 0;
  wrongIndexes = [];
  isRetryMode = false;
  showQuestion();
}

function retryWrong() {
  if (wrongIndexes.length === 0) return;
  quizOrder = [...wrongIndexes].sort(() => Math.random() - 0.5);
  currentIndex = 0;
  correctCount = 0;
  wrongIndexes = [];
  isRetryMode = true;
  showQuestion();
}

function showQuestion() {
  answered = false;
  const answerArea = document.getElementById("answer-area");
  answerArea.style.display = "none";
  answerArea.style.borderColor = "#b3e0f2";
  answerArea.style.backgroundColor = "#f0f9ff";

  if (currentIndex >= quizOrder.length) {
    showResult();
    return;
  }

  const item = words[quizOrder[currentIndex]];
  const choices = makeChoices(item.word, words, selectedSubject);

  const subject = SUBJECTS[selectedSubject];
  document.getElementById("quiz-label").innerHTML = subject.quizLabel;
  document.getElementById("quiz-word").innerHTML = item.meaning;
  document.getElementById("quiz-count").innerHTML =
    `${currentIndex + 1} / ${quizOrder.length} <ruby>問<rt>もん</rt></ruby>` +
    (isRetryMode ? "（<ruby>復習<rt>ふくしゅう</rt></ruby>）" : "");

  const choicesEl = document.querySelector(".choices");
  choicesEl.innerHTML = "";

  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () =>
      handleAnswer(choice, item.word, item.meaning, quizOrder[currentIndex])
    );
    choicesEl.appendChild(btn);
  });
}

function showResult() {
  const wrong = wrongIndexes.length;
  const correct = quizOrder.length - wrong;

  document.getElementById("quiz-label").textContent = "";
  document.getElementById("quiz-word").textContent = "おつかれさま！";
  const earnedPoints = correct * POINTS_PER_CORRECT;
  document.getElementById("quiz-count").innerHTML =
    `<ruby>正解<rt>せいかい</rt></ruby> ${correct} <ruby>問<rt>もん</rt></ruby> / <ruby>間違<rt>まちが</rt></ruby>い ${wrong} <ruby>問<rt>もん</rt></ruby>`;

  const choicesEl = document.querySelector(".choices");
  choicesEl.innerHTML = "";

  // 獲得ポイント表示
  const pointInfo = document.createElement("div");
  pointInfo.className = "point-earned";
  pointInfo.innerHTML = `+${earnedPoints} pt ゲット！（<ruby>合計<rt>ごうけい</rt></ruby> ${loadPoints()} pt）`;
  choicesEl.appendChild(pointInfo);

  if (wrongIndexes.length > 0) {
    const retryBtn = document.createElement("button");
    retryBtn.className = "result-btn retry";
    retryBtn.innerHTML = `<ruby>間違<rt>まちが</rt></ruby>えた ${wrong} <ruby>問<rt>もん</rt></ruby>をもう<ruby>一度<rt>いちど</rt></ruby>やる`;
    retryBtn.addEventListener("click", retryWrong);
    choicesEl.appendChild(retryBtn);
  }

  const restartBtn = document.createElement("button");
  restartBtn.className = "result-btn";
  restartBtn.innerHTML = "<ruby>最初<rt>さいしょ</rt></ruby>からやる";
  restartBtn.addEventListener("click", initQuiz);
  choicesEl.appendChild(restartBtn);

  const homeBtn = document.createElement("button");
  homeBtn.className = "result-btn home";
  homeBtn.innerHTML = "ホームに<ruby>戻<rt>もど</rt></ruby>る";
  homeBtn.addEventListener("click", () => {
    setSubjectColors(null);
    showPage("home-page");
  });
  choicesEl.appendChild(homeBtn);

  document.getElementById("answer-area").style.display = "none";
}

function handleAnswer(selected, correct, meaning, wordIndex) {
  if (answered) return;
  answered = true;

  const isCorrect = selected === correct;
  if (!isCorrect) {
    wrongIndexes.push(wordIndex);
  } else {
    correctCount++;
  }

  const buttons = document.querySelectorAll(".choice-btn");
  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn.textContent === selected && !isCorrect) {
      btn.classList.add("wrong");
    }
  });

  const answerArea = document.getElementById("answer-area");
  const message = document.getElementById("answer-message");
  const detail = document.getElementById("answer-detail");

  answerArea.style.display = "block";

  recordAnswer(isCorrect);

  if (isCorrect) {
    addPoints(POINTS_PER_CORRECT);
    showPointPopup(POINTS_PER_CORRECT);
    message.innerHTML = "<ruby>正解<rt>せいかい</rt></ruby>にゃ！";
    message.style.color = "#2a7a50";
    answerArea.style.borderColor = "#4caf82";
    answerArea.style.backgroundColor = "#d4f4e7";
  } else {
    message.innerHTML = "<ruby>残念<rt>ざんねん</rt></ruby>にゃ…";
    message.style.color = "#a03030";
    answerArea.style.borderColor = "#e08080";
    answerArea.style.backgroundColor = "#fde8e8";
  }

  detail.innerHTML = `<ruby>正解<rt>せいかい</rt></ruby>：${meaning}（${correct}）`;
}

// 次の問題へ
document.getElementById("next-btn").addEventListener("click", () => {
  currentIndex++;
  showQuestion();
});

// --- 問題管理ページ ---

function renderWordList() {
  const allWords = loadWords();
  const list = document.getElementById("word-list");
  list.innerHTML = "";

  if (allWords.length === 0) {
    list.innerHTML = "<li style='justify-content:center; color:#88bbcc;'><ruby>問題<rt>もんだい</rt></ruby>がまだないにゃ</li>";
    return;
  }

  const subjectNames = {};
  for (const [id, sub] of Object.entries(SUBJECTS)) {
    subjectNames[id] = sub.icon;
  }

  allWords.forEach((item, index) => {
    const li = document.createElement("li");
    const badge = item.subject
      ? `<span class="level-badge sub-${item.subject}">${subjectNames[item.subject] || ""} ${LEVELS[item.level] || item.level}</span>`
      : "";
    const deleteBtn =
      index >= DEFAULT_WORDS.length
        ? `<button class="delete-btn" onclick="deleteWord(${index})">🗑</button>`
        : "";
    li.innerHTML = `
      <span>${badge}<strong>${item.word}</strong>　${item.meaning}</span>
      ${deleteBtn}
    `;
    list.appendChild(li);
  });
}

function deleteWord(index) {
  const defaultCount = DEFAULT_WORDS.length;
  if (index < defaultCount) return;
  const userWords = loadUserWords();
  userWords.splice(index - defaultCount, 1);
  saveUserWords(userWords);
  renderWordList();
}

document.getElementById("word-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const wordInput = document.getElementById("input-word");
  const meaningInput = document.getElementById("input-meaning");
  const subjectInput = document.getElementById("input-subject");
  const levelInput = document.getElementById("input-level");

  const word = wordInput.value.trim();
  const meaning = meaningInput.value.trim();
  const subject = subjectInput.value;
  const level = levelInput.value;

  if (!word || !meaning) return;

  const allWords = loadWords();
  if (allWords.find((w) => w.word === word && w.subject === subject)) {
    alert(`「${word}」はもう<ruby>登録<rt>とうろく</rt></ruby>されてるにゃ！`);
    return;
  }

  const userWords = loadUserWords();
  userWords.push({ word, meaning, level, subject });
  saveUserWords(userWords);
  renderWordList();

  wordInput.value = "";
  meaningInput.value = "";
  wordInput.focus();
});
