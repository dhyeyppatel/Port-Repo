/**
 * Portfolio ChatBot - Core JavaScript Interface
 * Handles dynamic content hydration from config.json (with CORS fallback),
 * theme controls, chat simulator, terminal apps, and compliance modals.
 */

// Fallback configuration object (in case config.json is blocked by CORS in file:// protocol)
const DEFAULT_CONFIG = {
  "seo": {
    "title": "Dhyey Patel | Interactive Chatbot Portfolio",
    "description": "Interactive, terminal-inspired chatbot portfolio of Dhyey Patel, a Computer Engineering student specializing in Android Development, Telegram Chatbots, and Full-Stack Web Development.",
    "keywords": "Dhyey Patel, Dhyey, dhyeyppatel, chatbot portfolio, Android developer, Telegram bots, python-telegram-bot, Flutter developer, portfolio, computer engineering, Vadodara, Surat",
    "author": "Dhyey Patel",
    "url": "https://dhyeyppatel.github.io"
  },
  "adsense": {
    "clientId": "ca-pub-9358238296992186",
    "showPlacements": true
  },
  "profile": {
    "name": "Dhyey Patel",
    "shortName": "Dhyey",
    "role": "Final year Computer Engineering Student",
    "email": "dhyeyp254@gmail.com",
    "avatarUrl": "https://ar-hosting.pages.dev/1754132046937.jpg",
    "location": "Surat, Gujarat, India",
    "gitHubUser": "dhyeyppatel",
    "duolingoStreak": "500+",
    "resumeFile": "Dhyey Patel - Resume.pdf",
    "social": {
      "github": "https://github.com/dhyeyppatel",
      "email": "mailto:dhyeyp254@gmail.com"
    }
  },
  "about": {
    "heading": "About",
    "paragraphs": [
      "Hi there, I'm Dhyey! I'm a computer engineering student in my final year, currently navigating the world of code from Vadodara while studying in Surat.",
      "I love bringing ideas to life, especially through code. My core passion is crafting experiences that people can interact with, which has led me to focus on two exciting areas: <strong>Android Development</strong> and <strong>Interactive Chatbots</strong>. There's something magical about building a chatbot that can genuinely help someone or an app that fits seamlessly into their day. I'm also comfortable building basic MERN stack websites to complete the digital picture.",
      "My <strong>Projects</strong> section is where you'll find my polished work. If you're curious about what I'm currently tinkering with or want to see my code in the wild, my GitHub is the place to be (yes, even the half-finished experiments!).",
      "When I'm not coding, I believe in continuous learning and staying active. You can often find me cycling or in the swimming pool. I'm also dedicated to expanding my horizons and am currently learning German, having maintained a <strong>500+ day streak on Duolingo</strong> to build my vocabulary. My fascination with patterns also extends to my hobbies in numerology and astrology.",
      "I am currently seeking a <strong>full-time Software Developer or an Android Developer Internship role starting in November 2025</strong>, where I can contribute to meaningful projects and continue to grow my skills."
    ],
    "skills": {
      "Languages": ["Python", "JavaScript", "HTML", "CSS"],
      "Mobile Development": ["Flutter", "Android SDK"],
      "Chatbots": ["python-telegram-bot", "Telethon", "Pyrogram"],
      "Databases": ["MongoDB", "MySQL"],
      "Developer Tools": ["Git", "GitHub", "VS Code", "Android Studio", "Postman", "XAMPP"],
      "Cloud & Deployment": ["Koyeb", "Render", "Cloudflare"],
      "Bot-Specific Platforms": ["Bots Business", "Telebot Creator", "RunMyBot"]
    }
  },
  "terminal": {
    "title": "Developer Profile",
    "code": "// Developer\nconst developer = {\n    \"name\": \"Dhyey Patel\",\n    \"role\": \"Aspiring Chat Bot, Mobile & Full-Stack Developer\", \n    \"builds\": \"Bots, Mobile & Web Apps\", \n    \"skills\": [\"Python\", \"Javascript\", \"Flutter\"], \n    \"focus\": \"Real-world problem solving\"\n}\n\n// Tip: Type \"projects\" in the chat to explore projects."
  },
  "projects": [
    {
      "title": "Bill Buddy",
      "subtitle": "Android App",
      "url": "https://github.com/dhyeyppatel/Bill_Buddyy.git",
      "description": "Smart Android app to split bills and track shared expenses with friends seamlessly."
    },
    {
      "title": "CashInCashOut",
      "subtitle": "Flutter App",
      "url": "https://github.com/dhyeyppatel/Cash-in-out.git",
      "description": "Cross-platform Flutter application for personal finance, tracking daily income and expenses."
    },
    {
      "title": "EduHelper",
      "subtitle": "Android App",
      "url": "https://github.com/dhyeyppatel/EDU_HELPER.git",
      "description": "Educational utility Android app helping students manage notes, reminders, and study resources."
    },
    {
      "title": "Online Food Ordering",
      "subtitle": "React Web",
      "url": "https://github.com/dhyeyppatel/Bill_Buddyy.git",
      "description": "Full-stack food ordering platform dashboard built with React and interactive state management."
    },
    {
      "title": "Autofilterbot",
      "subtitle": "Chatbot",
      "url": "https://t.me/dhyeyautofilterbot",
      "description": "Advanced Telegram chatbot that filters and indexes files automatically for channels and groups."
    },
    {
      "title": "File Sharing bot",
      "subtitle": "Chatbot",
      "url": "https://github.com/dhyeyppatel/File-Sharing-Bot.git",
      "description": "A powerful Telegram bot designed to store, manage, and share files securely via unique links."
    },
    {
      "title": "Sharebazaar",
      "subtitle": "Bot & Web",
      "url": "https://github.com/dhyeyppatel/Indian-Stock-Details.git",
      "description": "Real-time stock tracker bot providing Indian stock market updates and stock metrics."
    },
    {
      "title": "Numerology bot",
      "subtitle": "Chatbot",
      "url": "https://github.com/dhyeyppatel/Numero-AstroBot.git",
      "description": "Fun interactive Telegram bot calculating birth path numbers, astrological signs, and predictions."
    }
  ],
  "blogs": {
    "title": "Blogs & Gists",
    "description": "Below are my public gists fetched dynamically from GitHub."
  }
};

let activeConfig = { ...DEFAULT_CONFIG };

// LocalStorage Keys
const THEME_KEY = 'chat-theme';
const RESUME_KEY = 'resume-url';
const COOKIE_CONSENT_KEY = 'cookie-consent-choice';

// DOM Elements
let themeToggle, root, avatar, botAvatar, profileImage, profilePanel, closeProfile;
let profileNameEl, profileRoleEl, profileEmailEl, contactEmailEl, timeText;
let terminal, toggleTerminal, copyCode, codeBlock, appContainer;
let messages, userInput, sendBtn, chips;
let projSearch, projectList, gistsContainer;
let viewResumeBtn, shareResumeBtn, resumeNameEl, downloadResume, resumeBackdrop, resumeFrame, openNewTab, downloadInModal, closeResume;
let cookieBanner, cookieAccept, cookieDecline, adPlacements;

/* =========== THEME CONTROLS =========== */
function initTheme() {
  root = document.documentElement;
  themeToggle = document.getElementById('themeToggle');
  
  const saved = localStorage.getItem(THEME_KEY);
  let initialTheme = 'dark';
  if (saved === 'light' || saved === 'dark') {
    initialTheme = saved;
  } else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    initialTheme = prefersLight ? 'light' : 'dark';
  }
  setTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }
}

function setTheme(t) {
  root.setAttribute('data-theme', t);
  localStorage.setItem(THEME_KEY, t);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
  }
}

/* =========== DIGITAL CLOCK =========== */
function updateTime() {
  timeText = document.getElementById('timeText');
  if (timeText) {
    const d = new Date();
    const hh = d.getHours().toString().padStart(2, '0');
    const mm = d.getMinutes().toString().padStart(2, '0');
    timeText.textContent = `Status: Online • ${hh}:${mm}`;
  }
}

/* =========== PROFILE WINDOW =========== */
function positionProfilePanel() {
  if (!profilePanel) return;

  // Clear overrides and exit on mobile viewports so CSS bottom sheet rules apply
  if (window.innerWidth <= 640) {
    profilePanel.style.left = '';
    profilePanel.style.right = '';
    profilePanel.style.top = '';
    return;
  }

  profilePanel.style.left = 'auto';
  profilePanel.style.right = '18px';
  profilePanel.style.top = '86px';
  
  const rect = profilePanel.getBoundingClientRect();
  const viewportRight = window.innerWidth - 12;
  
  if (rect.right > viewportRight) {
    const overflow = rect.right - viewportRight;
    const currentRight = 18 + overflow + 8;
    profilePanel.style.right = currentRight + 'px';
    const rect2 = profilePanel.getBoundingClientRect();
    if (rect2.right > viewportRight && rect2.width < window.innerWidth - 24) {
      const avatarRect = avatar.getBoundingClientRect();
      let leftPos = Math.max(12, avatarRect.left - 12);
      const maxLeft = Math.max(12, viewportRight - rect2.width);
      leftPos = Math.min(leftPos, maxLeft);
      profilePanel.style.left = leftPos + 'px';
      profilePanel.style.right = 'auto';
    }
  }
}

function toggleProfile(open) {
  if (!profilePanel) return;
  const isOpen = profilePanel.classList.contains('open');
  const wantOpen = typeof open === 'boolean' ? open : !isOpen;
  if (wantOpen) {
    profilePanel.classList.add('open');
    profilePanel.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => { positionProfilePanel(); });
  } else {
    profilePanel.classList.remove('open');
    profilePanel.setAttribute('aria-hidden', 'true');
    profilePanel.style.left = '';
    profilePanel.style.right = '';
    profilePanel.style.top = '';
  }
}

function initProfilePanel() {
  avatar = document.getElementById('avatar');
  botAvatar = document.getElementById('botAvatar');
  profileImage = document.getElementById('profileImage');
  profilePanel = document.getElementById('profilePanel');
  closeProfile = document.getElementById('closeProfile');

  if (avatar) avatar.addEventListener('click', () => toggleProfile(true));
  if (botAvatar) botAvatar.addEventListener('click', () => toggleProfile(true));
  if (closeProfile) closeProfile.addEventListener('click', () => toggleProfile(false));
  
  document.addEventListener('click', (e) => {
    if (profilePanel && !profilePanel.contains(e.target) && 
        avatar && !avatar.contains(e.target) && 
        botAvatar && !botAvatar.contains(e.target)) {
      toggleProfile(false);
    }
  });

  // Bind navigation links within the drawer to close it on click
  const drawerLinks = document.querySelectorAll('.profile-actions a.chip');
  if (drawerLinks) {
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => toggleProfile(false));
    });
  }

  window.addEventListener('resize', () => {
    if (profilePanel && profilePanel.classList.contains('open')) {
      requestAnimationFrame(positionProfilePanel);
    }
  });
}

function renderAvatar(el, avatarUrl, name) {
  if (!el) return;
  el.innerHTML = '';
  if (avatarUrl && avatarUrl.trim()) {
    const img = document.createElement('img');
    img.src = avatarUrl;
    img.alt = name;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    el.appendChild(img);
  } else {
    const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
    el.textContent = initials;
    el.style.fontSize = '18px';
  }
}

/* =========== TERMINAL CONTROLS =========== */
function initTerminal() {
  terminal = document.getElementById('terminal');
  toggleTerminal = document.getElementById('toggleTerminal');
  copyCode = document.getElementById('copyCode');
  codeBlock = document.getElementById('codeBlock');
  appContainer = document.getElementById('appContainer');

  let collapsed = false;
  if (toggleTerminal && terminal) {
    toggleTerminal.addEventListener('click', () => {
      collapsed = !collapsed;
      terminal.classList.toggle('collapsed', collapsed);
      toggleTerminal.textContent = collapsed ? 'Expand' : 'Collapse';
      toggleTerminal.setAttribute('aria-pressed', (!collapsed).toString());
    });
  }

  if (copyCode && codeBlock) {
    copyCode.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.innerText);
        copyCode.textContent = 'Copied';
        setTimeout(() => copyCode.textContent = 'Copy', 1200);
      } catch (e) {
        copyCode.textContent = 'Err';
        setTimeout(() => copyCode.textContent = 'Copy', 1200);
      }
    });
  }
}

window.restoreTerminal = function() {
  if (appContainer && codeBlock && copyCode) {
    appContainer.style.display = 'none';
    appContainer.innerHTML = '';
    codeBlock.style.display = 'block';
    copyCode.style.display = 'block';
    document.getElementById('termTitle').textContent = activeConfig.terminal.title || 'Terminal';
  }
};

/* =========== CHAT SYSTEM =========== */
function scrollMessages() {
  if (messages) messages.scrollTop = messages.scrollHeight;
}

function pushUser(text) {
  if (!text || !messages) return;
  const el = document.createElement('div');
  el.className = 'msg user';
  el.innerHTML = escapeHtml(text);
  messages.appendChild(el);
  scrollMessages();
}

function showTyping() {
  if (!messages) return null;
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  const inner = document.createElement('div');
  inner.className = 'typing';
  inner.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  wrap.appendChild(inner);
  messages.appendChild(wrap);
  scrollMessages();
  return wrap;
}

function simulateReply(html, delay = 800) {
  const typing = showTyping();
  return new Promise(resolve => {
    setTimeout(() => {
      if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
      if (messages) {
        const d = document.createElement('div');
        d.className = 'msg bot';
        d.innerHTML = html;
        messages.appendChild(d);
        scrollMessages();
        resolve(d);
      }
    }, delay);
  });
}

async function handleCommand(raw) {
  const text = (raw || '').trim();
  if (!text) return;
  pushUser(text);
  const cmd = text.toLowerCase();
  
  if (cmd === 'help') {
    await simulateReply('Commands: <code>about</code>, <code>projects</code>, <code>freelance</code>, <code>tools</code>, <code>play</code>, <code>contact</code>, <code>blogs</code>, <code>resume</code>. Or use the quick buttons below.');
  } else if (cmd === 'freelance' || cmd === 'hire me') {
    await simulateReply('Excellent! I have experience crafting robust Telegram automation bots and responsive web apps. What kind of solution are you looking for?');
    const chipRow = document.createElement('div');
    chipRow.className = 'chips';
    chipRow.innerHTML = `
      <div class="chip" onclick="handleCommand('hire:bot')">Telegram Bot</div>
      <div class="chip" onclick="handleCommand('hire:web')">Web Site/App</div>
      <div class="chip" onclick="handleCommand('hire:custom')">Custom Tool</div>
    `;
    if (messages) {
      messages.appendChild(chipRow);
      scrollMessages();
    }
  } else if (cmd.startsWith('hire:')) {
    let type = cmd.split(':')[1];
    let msg = type === 'bot' ? 'Great! I build custom bots using python-telegram-bot, Telethon, and Pyrogram. From database automation to integrations.' 
              : type === 'web' ? 'I design dynamic frontends and solid API integrations.'
              : 'Let\'s collaborate on building custom integrations and scripts.';
    await simulateReply(msg + ' I have pre-formatted a details draft for you. Let\'s get in touch!');
    
    const subject = encodeURIComponent('Freelance Project Inquiry: ' + type.toUpperCase());
    const body = encodeURIComponent('Hi Dhyey,\n\nI want to discuss hiring you for a ' + type + ' project.\n\nDescription details:\n');
    setTimeout(() => {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(activeConfig.profile.email)}&su=${subject}&body=${body}`, '_blank');
    }, 1500);
  } else if (cmd === 'play') {
    await simulateReply('Opening mini-game in side panel... Match three to win!');
    if (codeBlock && copyCode && appContainer) {
      codeBlock.style.display = 'none';
      copyCode.style.display = 'none';
      document.getElementById('termTitle').textContent = 'Tic Tac Toe';
      appContainer.style.display = 'flex';
      appContainer.innerHTML = `
        <div style="text-align:center; padding:10px; color:var(--text); width:100%;">
          <h4>Tic Tac Toe</h4>
          <div id="tttBoard" style="display:grid; grid-template-columns:repeat(3, 60px); gap:6px; justify-content:center; margin-top:20px;">
            ${Array(9).fill().map((_, i) => `<div class="ttt-cell" style="width:60px; height:60px; background:var(--panel); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:24px; cursor:pointer; font-weight:bold; border-radius:var(--radius-sm);" data-idx="${i}"></div>`).join('')}
          </div>
          <p id="tttStatus" style="margin-top:16px; color:var(--muted); font-size:12px;">Your turn! Click empty cells.</p>
          <div style="margin-top:20px; display:flex; gap:10px; justify-content:center;">
            <button class="small-btn" id="resetGame">Reset</button>
            <button class="small-btn" onclick="restoreTerminal()">Close</button>
          </div>
        </div>
      `;
      initTicTacToe();
    }
  } else if (cmd === 'tools') {
    await simulateReply('Launching quick tools suite in terminal...');
    if (codeBlock && copyCode && appContainer) {
      codeBlock.style.display = 'none';
      copyCode.style.display = 'none';
      document.getElementById('termTitle').textContent = 'Mini Toolbox';
      appContainer.style.display = 'flex';
      appContainer.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:16px; width:100%;">
          <h4>Case Transformer Tool</h4>
          <textarea id="toolText" style="width:100%; height:80px; background:var(--input-bg); border:1px solid var(--border); color:var(--text); padding:8px; border-radius:var(--radius-sm); font-family:inherit;" placeholder="Type or paste text..."></textarea>
          <div style="display:flex; gap:8px;">
            <button class="small-btn" id="upperTool">UPPERCASE</button>
            <button class="small-btn" id="lowerTool">lowercase</button>
            <button class="small-btn" id="titleTool">Title Case</button>
          </div>
          <button class="small-btn" onclick="restoreTerminal()" style="align-self:flex-start; margin-top:12px;">Close Tools</button>
        </div>
      `;
      document.getElementById('upperTool').onclick = () => {
        const area = document.getElementById('toolText');
        area.value = area.value.toUpperCase();
      };
      document.getElementById('lowerTool').onclick = () => {
        const area = document.getElementById('toolText');
        area.value = area.value.toLowerCase();
      };
      document.getElementById('titleTool').onclick = () => {
        const area = document.getElementById('toolText');
        area.value = area.value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      };
    }
  } else if (cmd === 'sudo run' || cmd === 'sudo' || cmd === 'matrix') {
    await simulateReply('<span style="color:#3ABEFF; font-weight:bold;">Executing matrix overrides. System parameters modified.</span>');
    document.body.style.background = '#020204';
    root.style.setProperty('--bg-from', '#020204');
    root.style.setProperty('--bg-to', '#050a08');
    root.style.setProperty('--text', '#39ff14');
    root.style.setProperty('--accent', '#39ff14');
    root.style.setProperty('--accent-gradient', 'linear-gradient(135deg, #00ff00, #39ff14)');
    root.style.setProperty('--panel', 'rgba(0, 20, 5, 0.2)');
    root.style.setProperty('--border', 'rgba(0, 255, 0, 0.15)');
    if (codeBlock) codeBlock.style.color = '#39ff14';
    setTimeout(() => simulateReply('System override complete. Welcome to the Matrix.'), 1000);
  } else if (cmd === 'coffee') {
    await simulateReply('<pre style="font-family:monospace; line-height:1.2; color:var(--muted)">\n   (  )   (   )  )\n     ) (   )  (  (\n     ( )  (    ) )\n     _____________ \n    <_____________> ___\n    |             |/ _ \\\n    |               | | |\n    |               |_| |\n ___|             |\\___/\n/    \\___________/    \\\n\\_____________________/\n</pre><br>Here is a fresh cup of ASCII coffee to power up your session!');
  } else if (cmd === 'about') {
    await simulateReply('Scrolling to about details.');
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (cmd === 'projects') {
    await simulateReply('Scrolling to projects listing.');
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (cmd === 'contact') {
    await simulateReply('Scrolling to contact details.');
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (cmd === 'blogs') {
    await simulateReply('Scrolling to blogs and gist integrations.');
    const el = document.getElementById('blogs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (cmd === 'resume') {
    await simulateReply('Triggering resume preview overlay.');
    openResumeViewer();
  } else {
    await simulateReply('Command not recognized. Type <code>help</code> for available directives.');
  }
}

// Global hook to make helper inline button attributes work
window.handleCommand = handleCommand;

function initChat() {
  messages = document.getElementById('messages');
  userInput = document.getElementById('userInput');
  sendBtn = document.getElementById('sendBtn');
  chips = document.querySelectorAll('.chip');

  if (sendBtn && userInput) {
    sendBtn.addEventListener('click', () => {
      const v = userInput.value.trim();
      if (!v) return;
      handleCommand(v);
      userInput.value = '';
      userInput.focus();
    });
    
    userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendBtn.click();
      }
    });
  }

  if (chips) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.dataset.cmd || chip.textContent;
        chip.animate([
          { transform: 'scale(0.96)' },
          { transform: 'scale(1)' }
        ], { duration: 120 });
        handleCommand(cmd);
      });
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== userInput) {
      e.preventDefault();
      if (userInput) userInput.focus();
    }
  });
  if (userInput) userInput.focus();
}

/* =========== TIC TAC TOE GAME ENGINE =========== */
function initTicTacToe() {
  const cells = document.querySelectorAll('.ttt-cell');
  const status = document.getElementById('tttStatus');
  const resetBtn = document.getElementById('resetGame');
  let board = Array(9).fill('');
  let isGameOver = false;

  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diags
  ];

  function checkWin(player) {
    return winPatterns.some(p => p.every(idx => board[idx] === player));
  }

  function handleCellClick(e) {
    const idx = parseInt(e.target.dataset.idx);
    if (board[idx] !== '' || isGameOver) return;

    // Player move (X)
    board[idx] = 'X';
    e.target.textContent = 'X';
    e.target.style.color = 'var(--accent)';

    if (checkWin('X')) {
      status.textContent = 'You won! 🎉';
      isGameOver = true;
      return;
    }

    if (board.every(cell => cell !== '')) {
      status.textContent = 'It\'s a tie! 🤝';
      isGameOver = true;
      return;
    }

    // Bot move (O)
    status.textContent = 'Thinking...';
    setTimeout(() => {
      const emptyIdxs = board.map((cell, i) => cell === '' ? i : null).filter(val => val !== null);
      if (emptyIdxs.length > 0) {
        const randomIdx = emptyIdxs[Math.floor(Math.random() * emptyIdxs.length)];
        board[randomIdx] = 'O';
        const botCell = document.querySelector(`.ttt-cell[data-idx="${randomIdx}"]`);
        if (botCell) {
          botCell.textContent = 'O';
          botCell.style.color = 'var(--muted)';
        }
        
        if (checkWin('O')) {
          status.textContent = 'Bot won! 🤖';
          isGameOver = true;
          return;
        }

        if (board.every(cell => cell !== '')) {
          status.textContent = 'It\'s a tie! 🤝';
          isGameOver = true;
          return;
        }

        status.textContent = 'Your turn!';
      }
    }, 400);
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      board = Array(9).fill('');
      isGameOver = false;
      cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '';
      });
      status.textContent = 'Your turn! Click empty cells.';
    });
  }
}

/* =========== GISTS BROWSER =========== */
async function loadGists(username) {
  gistsContainer = document.getElementById('gistsContainer');
  if (!gistsContainer) return;
  gistsContainer.innerHTML = '';
  
  if (!username || username === 'YOUR-GITHUB-USERNAME') {
    gistsContainer.innerHTML = '<div style="color:var(--muted)">Configure <code>gitHubUser</code> parameter in config.json to load public gists.</div>';
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/gists`);
    if (!res.ok) throw new Error('API fetch failed');
    const gists = await res.json();
    
    if (!gists || gists.length === 0) {
      gistsContainer.innerHTML = '<div style="color:var(--muted)">No public gists discovered.</div>';
      return;
    }

    gists.forEach(g => {
      const wrapper = document.createElement('div');
      wrapper.style.background = 'var(--panel)';
      wrapper.style.border = '1px solid var(--border)';
      wrapper.style.padding = '14px';
      wrapper.style.borderRadius = 'var(--radius-md)';
      wrapper.style.overflow = 'auto';

      const title = document.createElement('div');
      title.style.fontWeight = '700';
      title.style.marginBottom = '8px';
      title.textContent = g.description || `Gist Archive - ${g.id}`;
      wrapper.appendChild(title);

      const gistTarget = document.createElement('div');
      wrapper.appendChild(gistTarget);
      gistsContainer.appendChild(wrapper);

      // Embedded iframe or direct link fallback
      const script = document.createElement('script');
      script.src = g.html_url + '.js';
      script.async = true;
      gistTarget.appendChild(script);

      const fallback = document.createElement('div');
      fallback.style.marginTop = '8px';
      fallback.innerHTML = `<a href="${g.html_url}" target="_blank" rel="noopener" class="small-link">View gist on GitHub</a>`;
      wrapper.appendChild(fallback);
    });
  } catch (e) {
    gistsContainer.innerHTML = '<div style="color:var(--muted)">Error dynamically loading public gists. View GitHub profile directly.</div>';
  }
}

/* =========== RESUME PREVIEW & ACTIONS =========== */
function getSavedResume() {
  const stored = localStorage.getItem(RESUME_KEY);
  if (stored) return stored;
  if (activeConfig.profile.resumeFile) return activeConfig.profile.resumeFile;
  return '';
}

function filenameFromUrl(url) {
  try {
    if (!url) return '';
    if (url.startsWith('blob:')) return 'Uploaded Resume (session)';
    if (url.startsWith('data:')) return 'Resume Document';
    const parts = url.split('/');
    return decodeURIComponent(parts.filter(Boolean).pop());
  } catch (e) {
    return url;
  }
}

function updateResumeUI() {
  const url = getSavedResume();
  const name = filenameFromUrl(url) || 'Not set';
  
  resumeNameEl = document.getElementById('resumeName');
  viewResumeBtn = document.getElementById('viewResumeBtn');
  shareResumeBtn = document.getElementById('shareResumeBtn');
  downloadResume = document.getElementById('downloadResume');
  downloadInModal = document.getElementById('downloadInModal');

  if (resumeNameEl) resumeNameEl.textContent = name;
  
  if (url) {
    if (viewResumeBtn) viewResumeBtn.disabled = false;
    if (shareResumeBtn) shareResumeBtn.disabled = false;
    if (downloadResume) {
      downloadResume.style.display = '';
      downloadResume.href = url;
    }
    if (downloadInModal) downloadInModal.href = url;
  } else {
    if (viewResumeBtn) viewResumeBtn.disabled = true;
    if (shareResumeBtn) shareResumeBtn.disabled = true;
    if (downloadResume) downloadResume.style.display = 'none';
  }
}

function openResumeViewer() {
  const url = getSavedResume();
  resumeFrame = document.getElementById('resumeFrame');
  resumeBackdrop = document.getElementById('resumeBackdrop');
  openNewTab = document.getElementById('openNewTab');

  if (!url) {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    simulateReply('Please attach or specify a default resume document in sittings.');
    return;
  }

  if (resumeFrame && resumeBackdrop) {
    resumeFrame.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = 'Resume PDF';
    iframe.setAttribute('aria-label', 'Resume viewer frame');
    resumeFrame.appendChild(iframe);

    if (openNewTab) {
      openNewTab.onclick = () => window.open(url, '_blank', 'noopener');
    }
    resumeBackdrop.classList.add('open');
    resumeBackdrop.setAttribute('aria-hidden', 'false');
  }
}

function closeResumeViewer() {
  resumeBackdrop = document.getElementById('resumeBackdrop');
  resumeFrame = document.getElementById('resumeFrame');
  if (resumeBackdrop) {
    resumeBackdrop.classList.remove('open');
    resumeBackdrop.setAttribute('aria-hidden', 'true');
  }
  if (resumeFrame) resumeFrame.innerHTML = '';
}

async function shareResume() {
  const url = getSavedResume();
  if (!url) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'My Resume', url });
      return;
    } catch (e) {
      // fallback
    }
  }
  try {
    await navigator.clipboard.writeText(window.location.origin + '/' + url);
    simulateReply('Resume URL copied to clipboard!');
  } catch (e) {
    simulateReply('Failed to copy. Download resume directly.');
  }
}

function initResume() {
  viewResumeBtn = document.getElementById('viewResumeBtn');
  shareResumeBtn = document.getElementById('shareResumeBtn');
  closeResume = document.getElementById('closeResume');
  resumeBackdrop = document.getElementById('resumeBackdrop');

  if (viewResumeBtn) viewResumeBtn.addEventListener('click', openResumeViewer);
  if (shareResumeBtn) shareResumeBtn.addEventListener('click', shareResume);
  if (closeResume) closeResume.addEventListener('click', closeResumeViewer);
  
  if (resumeBackdrop) {
    resumeBackdrop.addEventListener('click', (ev) => {
      if (ev.target === resumeBackdrop) closeResumeViewer();
    });
  }
  updateResumeUI();
}

/* =========== SEARCH PROJECTS FILTER =========== */
function initProjectSearch() {
  projSearch = document.getElementById('projSearch');
  projectList = document.getElementById('projectList');
  
  if (projSearch) {
    projSearch.addEventListener('input', () => {
      const q = projSearch.value.trim().toLowerCase();
      const projectCards = Array.from(document.querySelectorAll('.project-card'));
      
      projectCards.forEach(card => {
        const title = (card.dataset.title || '').toLowerCase();
        const txt = (card.textContent || '').toLowerCase();
        card.style.display = (!q || title.includes(q) || txt.includes(q)) ? '' : 'none';
      });
    });
  }
}

/* =========== GDPR COOKIE CONSENT =========== */
function initCookieConsent() {
  cookieBanner = document.getElementById('cookieBanner');
  cookieAccept = document.getElementById('cookieAccept');
  cookieDecline = document.getElementById('cookieDecline');

  if (!cookieBanner) return;

  // Helper: add padding to body so footer isn't hidden behind the fixed banner
  function showBanner() {
    cookieBanner.classList.add('show');
    document.body.classList.add('cookie-visible');
  }
  function hideBanner() {
    cookieBanner.classList.remove('show');
    document.body.classList.remove('cookie-visible');
  }

  const userChoice = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!userChoice) {
    // Show banner after short delay
    setTimeout(showBanner, 1500);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
      hideBanner();
    });
  }

  if (cookieDecline) {
    cookieDecline.addEventListener('click', () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
      hideBanner();
    });
  }
}

/* =========== PRIVACY MODAL CONTROLS =========== */
window.openPrivacyModal = function() {
  const backdrop = document.getElementById('privacyBackdrop');
  if (backdrop) {
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
  }
};

window.closePrivacyModal = function() {
  const backdrop = document.getElementById('privacyBackdrop');
  if (backdrop) {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
  }
};

/* =========== DYNAMIC PAGE HYDRATION =========== */
function hydratePage(config) {
  // 1. SEO elements
  document.title = config.seo.title;
  
  // Create / Update JSON-LD Person Schema
  let schemaScript = document.getElementById('seoSchema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'seoSchema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": config.profile.name,
      "jobTitle": config.profile.role,
      "email": config.profile.email,
      "url": config.seo.url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": config.profile.location.split(',')[0].trim(),
        "addressRegion": config.profile.location.split(',')[1]?.trim() || '',
        "addressCountry": "India"
      },
      "alumniOf": "Computer Engineering Department",
      "knowsAbout": Object.values(config.about.skills).flat()
    }
  };
  schemaScript.textContent = JSON.stringify(jsonLd, null, 2);

  // 2. Profile Details
  profileNameEl = document.getElementById('profileName');
  profileRoleEl = document.getElementById('profileRole');
  profileEmailEl = document.getElementById('profileEmail');
  contactEmailEl = document.getElementById('contactEmail');

  if (profileNameEl) profileNameEl.textContent = config.profile.name;
  if (profileRoleEl) profileRoleEl.textContent = config.profile.role;
  if (profileEmailEl) {
    profileEmailEl.textContent = config.profile.email;
    profileEmailEl.href = 'mailto:' + config.profile.email;
  }
  if (contactEmailEl) {
    contactEmailEl.textContent = config.profile.email;
    contactEmailEl.href = 'mailto:' + config.profile.email;
  }

  // Header and panel avatars
  renderAvatar(document.getElementById('avatar'), config.profile.avatarUrl, config.profile.name);
  renderAvatar(document.getElementById('botAvatar'), config.profile.avatarUrl, config.profile.name);
  renderAvatar(document.getElementById('profileImage'), config.profile.avatarUrl, config.profile.name);

  // 3. About Section
  const aboutSec = document.getElementById('about');
  if (aboutSec) {
    // Reset section content with Title
    aboutSec.innerHTML = `<h2>${config.about.heading || 'About'}</h2>`;
    
    // Add paragraphs
    config.about.paragraphs.forEach(p => {
      const pEl = document.createElement('p');
      pEl.innerHTML = p;
      aboutSec.appendChild(pEl);
    });

    // Add tech stack subhead
    const stackHead = document.createElement('h4');
    stackHead.textContent = 'My Tech Stack';
    aboutSec.appendChild(stackHead);

    // Build lists
    const outerList = document.createElement('ul');
    Object.keys(config.about.skills).forEach(category => {
      const li = document.createElement('li');
      const itemsStr = config.about.skills[category].join(', ');
      li.innerHTML = `<strong>${category}: </strong> ${itemsStr}`;
      outerList.appendChild(li);
    });
    aboutSec.appendChild(outerList);
  }

  // 4. Terminal Configuration
  codeBlock = document.getElementById('codeBlock');
  if (codeBlock) {
    codeBlock.textContent = config.terminal.code;
  }
  const termTitle = document.getElementById('termTitle');
  if (termTitle) {
    termTitle.textContent = config.terminal.title || 'Terminal';
  }

  // 5. Projects Section Hydration
  projectList = document.getElementById('projectList');
  if (projectList) {
    projectList.innerHTML = '';
    config.projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.title = p.title;
      card.innerHTML = `
        <h4><a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.title} — ${p.subtitle}</a></h4>
        <div class="project-desc">${p.description}</div>
      `;
      projectList.appendChild(card);
    });
  }

  // 6. Blogs section info
  const blogsSec = document.getElementById('blogs');
  if (blogsSec) {
    const heading = blogsSec.querySelector('h2');
    const desc = blogsSec.querySelector('p');
    if (heading) heading.textContent = config.blogs.title;
    if (desc) desc.textContent = config.blogs.description;
  }

  // 7. AdSense placement visibility
  adPlacements = document.querySelectorAll('.ad-placement');
  if (adPlacements) {
    adPlacements.forEach(ad => {
      ad.style.display = config.adsense.showPlacements ? 'flex' : 'none';
      if (config.adsense.showPlacements && config.adsense.clientId) {
        // Hydrate Google client id into slot script triggers
        const ins = ad.querySelector('ins.adsbygoogle');
        if (ins) {
          ins.setAttribute('data-ad-client', config.adsense.clientId);
        }
      }
    });
    // Monitor and collapse unfilled/blocked slots
    initAdSenseCollapse();
  }

  // Refresh resume attributes
  updateResumeUI();
  
  // Load public gists
  loadGists(config.profile.gitHubUser);
}

/* =========== INITIALIZATION ENTRY POINT =========== */
document.addEventListener('DOMContentLoaded', async () => {
  // First, initialize foundational controls with fallback config
  initTheme();
  updateTime();
  setInterval(updateTime, 60000);
  initProfilePanel();
  initTerminal();
  initChat();
  initResume();
  initProjectSearch();
  initCookieConsent();

  // Setup modal close hooks for click-away
  const privacyBackdrop = document.getElementById('privacyBackdrop');
  if (privacyBackdrop) {
    privacyBackdrop.addEventListener('click', (ev) => {
      if (ev.target === privacyBackdrop) closePrivacyModal();
    });
  }

  // Hydrate page with default config first
  hydratePage(activeConfig);

  // Now, attempt to fetch config.json from local host
  try {
    const res = await fetch('./config.json');
    if (res.ok) {
      const fetched = await res.json();
      activeConfig = { ...DEFAULT_CONFIG, ...fetched };
      // Hydrate page with remote updates
      hydratePage(activeConfig);
      console.log('Page successfully hydrated from config.json');
    }
  } catch (e) {
    console.log('Unable to fetch config.json (expected in local file:// setup). Working with default configuration preset.');
  }

  // Initialize GSAP ScrollTrigger wow animations EXACTLY ONCE after final hydration is complete
  setTimeout(initAnimations, 100);
});

/* =========== HTML ESCAPE HELPER =========== */
function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/[&<>"'`=\/]/g, function(c) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    }[c];
  });
}

/* =========== GSAP SCROLLTRIGGER & WOW ANIMATIONS =========== */
function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Page Load Entry Animations
  //    Use autoAlpha (opacity+visibility) so elements are invisible before animating in
  gsap.fromTo('.notch-inner',
    { y: -60, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' }
  );

  gsap.fromTo('.chat-window',
    { scale: 0.96, autoAlpha: 0 },
    { scale: 1, autoAlpha: 1, duration: 0.8, delay: 0.2, ease: 'back.out(1.2)' }
  );

  // Animate sidebar elements — but ONLY those that exist and are NOT the profile panel
  gsap.fromTo('.terminal.resizable, .quick-links-card',
    { x: 40, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, duration: 0.8, delay: 0.35, stagger: 0.15, ease: 'power3.out' }
  );

  // 2. Scroll-triggered reveals for all content sections (About, Blogs, Contact)
  gsap.utils.toArray('.content-section').forEach(section => {
    gsap.fromTo(section,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 3. Projects section heading & search bar reveal
  const projectsHeadEls = document.querySelectorAll('section.projects .section-title, section.projects .projects-search');
  if (projectsHeadEls.length) {
    gsap.fromTo(projectsHeadEls,
      { y: 25, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: 'section.projects',
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // 4. Project cards — use onEnter callback to query freshly added DOM nodes
  ScrollTrigger.create({
    trigger: '.project-list',
    start: 'top 88%',
    toggleActions: 'play none none none',
    onEnter: () => {
      const cards = document.querySelectorAll('.project-card');
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.07, ease: 'power2.out' }
        );
      }
    }
  });

  // Refresh ScrollTrigger after all elements are registered
  ScrollTrigger.refresh();
}

/* =========== ADSENSE AUTO-COLLAPSE MONITOR =========== */
function initAdSenseCollapse() {
  const adUnits = document.querySelectorAll('.ad-placement');
  if (!adUnits.length) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
        const ins = mutation.target;
        const parent = ins.closest('.ad-placement');
        if (parent) {
          const status = ins.getAttribute('data-ad-status');
          if (status === 'filled') {
            parent.style.setProperty('display', 'flex', 'important');
          } else {
            parent.style.setProperty('display', 'none', 'important');
          }
        }
      }
    });
  });

  adUnits.forEach(unit => {
    const ins = unit.querySelector('ins.adsbygoogle');
    if (ins) {
      observer.observe(ins, { attributes: true });
    }
  });

  // Timeout check: Hide if not successfully filled after 2.5s (blocked or localhost)
  setTimeout(() => {
    adUnits.forEach(unit => {
      const ins = unit.querySelector('ins.adsbygoogle');
      if (ins) {
        const status = ins.getAttribute('data-ad-status');
        if (status !== 'filled') {
          unit.style.setProperty('display', 'none', 'important');
        }
      } else {
        unit.style.setProperty('display', 'none', 'important');
      }
    });
  }, 2500);
}

