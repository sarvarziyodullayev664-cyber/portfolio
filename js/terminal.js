// Interactive Python Terminal Simulator for Sarvar Ziyodullayev
(function() {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const terminalForm = document.getElementById('terminal-form');
    const terminalPills = document.querySelectorAll('.term-pill');

    if (!terminalOutput || !terminalInput) return;

    // Command History
    const history = [];
    let historyIdx = -1;

    // Portfolio Data
    const portfolioData = {
        name: "Sarvar Ziyodullayev",
        age: 19,
        profession: "Video Montajor (Bugun Agency) & Dasturiy Injener",
        education: {
            university: "Qarshi Davlat Texnika Universiteti (QDTU)",
            course: "3-kurs talabasi",
            major: "Dasturiy Injenering (Software Engineering)",
            school: "Kitob tumani 1-maktab bitiruvchisi"
        },
        location: {
            current_activity: "Qashqadaryo viloyati, Qarshi shahri",
            birthplace: "Qashqadaryo viloyati, Kitob tumani, Beruniy ko'cha 24-uy"
        },
        experience: {
            agency: "Bugun Agency (@bugun_agency) — Video Montajor (Faol)",
            agency_projects: "@bravos_qarshi va agentlikning boshqa loyihalari montaji",
            independent_projects: [
                "@rezonans_academy — Mobil Videograf + Targetolog (Faol)",
                "@rezonans_english_school — Mobil Videograf + Targetolog (Faol)"
            ]
        },
        skills: {
            media: ["Video Montaj (HP Victus, Premiere Pro, DaVinci)", "Mobil Videografiya (iPhone 16 Pro Max)", "Motion Design & Animatsiya (Kinetik matn, VFX)", "SMM & Targetolog (Meta Ads)"],
            dev: ["Python (Automation, Telegram Bots, Scraping, Backend)", "Dasturiy Injenering (OOP, Algorithms)", "Git & Gitlab"],
            ai: ["ChatGPT (OpenAI)", "Google Gemini", "Claude (Anthropic)", "Flow AI", "Antigravity (Agentic AI)"]
        },
        hardware: {
            laptop: "HP Victus (Yuqori unumdorlikdagi noutbuk)",
            monitor: "Qo'shimcha Tashqi Monitor (Dual-Screen Pro Setup)",
            mobile: "iPhone 16 Pro Max (4K 60FPS kadrlar va mobilografiya)",
            workflow: "Montaj ko'pincha HP Victus noutbuki + qo'shimcha monitor hamda telefon orqali amalga oshiriladi"
        },
        sports: ["Body Builder (Fitness/Gimnastika)", "Futbol", "Basketbol", "Volleyball", "PingPong"],
        hobbies: ["Playstation Games", "Kitob mutolaasi (Reading Books)", "Ingliz tili (English)", "Futbol & Basketbol"],
        contact: {
            telegram: "@Sarvarbek_zs",
            instagram: "@sarvarvision_",
            phone: "+998 95 612 07 15",
            email: "sarvarziyodullayev346@gmail.com"
        }
    };

    function appendOutput(htmlContent) {
        const line = document.createElement('div');
        line.className = 'term-line';
        line.innerHTML = htmlContent;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function formatJSON(obj) {
        return `<pre class="text-emerald-300 font-mono text-xs md:text-sm bg-black/40 p-3 rounded-lg border border-emerald-500/20 overflow-x-auto">${JSON.stringify(obj, null, 2)}</pre>`;
    }

    function executeCommand(rawCmd) {
        const cmd = rawCmd.trim();
        if (!cmd) return;

        // Sound effect
        if (window.soundFX) window.soundFX.playClick();

        // Echo command
        appendOutput(`<span class="text-emerald-400 font-bold">>>></span> <span class="text-white">${escapeHtml(cmd)}</span>`);

        const lower = cmd.toLowerCase().replace(/\s+/g, '');

        if (lower === 'clear' || lower === 'cls') {
            terminalOutput.innerHTML = '';
            return;
        }

        if (lower === 'help' || lower === 'help()') {
            appendOutput(`
<div class="text-gray-300 py-1">
  <p class="text-emerald-400 font-semibold mb-1">Mavjud buyruqlar va metodlar:</p>
  <ul class="space-y-1 pl-2">
    <li><span class="text-emerald-300 font-mono">sarvar.info()</span> - To'liq ma'lumot va biografiya</li>
    <li><span class="text-emerald-300 font-mono">sarvar.projects()</span> - Faol loyihalar va ish joylari</li>
    <li><span class="text-emerald-300 font-mono">sarvar.hardware()</span> - Uskunalar va ish stansiyasi (HP Victus + Monitor + Telefon)</li>
    <li><span class="text-emerald-300 font-mono">sarvar.ai()</span> - Sun'iy intellekt vositalari (ChatGPT, Gemini, Claude, Flow AI, Antigravity)</li>
    <li><span class="text-emerald-300 font-mono">sarvar.skills()</span> - Kreativ va dasturlash ko'nikmalari</li>
    <li><span class="text-emerald-300 font-mono">sarvar.education()</span> - Universitet (QDTU) va maktab</li>
    <li><span class="text-emerald-300 font-mono">sarvar.sports()</span> - Sport turlari va yutuqlar</li>
    <li><span class="text-emerald-300 font-mono">sarvar.hobbies()</span> - Xobbi va qiziqishlar</li>
    <li><span class="text-emerald-300 font-mono">sarvar.contact()</span> - Aloqa ma'lumotlari & manzil</li>
    <li><span class="text-emerald-300 font-mono">sarvar.render_video()</span> - 4K Video montaj render animatsiyasi</li>
    <li><span class="text-emerald-300 font-mono">sarvar.run_bot()</span> - Python Telegram Bot ishga tushirish simulyatsiyasi</li>
    <li><span class="text-emerald-300 font-mono">clear</span> - Ekranni tozalash</li>
  </ul>
</div>`);
            return;
        }

        if (lower === 'sarvar.hardware()' || lower === 'hardware' || lower === 'sarvar.setup()' || lower === 'setup') {
            appendOutput(`
<div class="bg-black/50 border border-emerald-500/40 rounded-lg p-3 my-1 text-xs space-y-2">
  <div class="flex items-center justify-between border-b border-emerald-500/20 pb-1.5">
    <p class="text-emerald-400 font-bold text-sm">💻 Hardware & Workstation Setup:</p>
    <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">Dual-Display Pro Setup</span>
  </div>
  <p class="text-gray-300 text-[11px]">Montaj ko'pincha HP Victus laptopi va qo'shimcha tashqi monitor orqali professional dasturlarda, shuningdek telefon orqali amalga oshiriladi:</p>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1">
    <div class="bg-emerald-950/40 border border-emerald-500/20 p-2.5 rounded">
      <div class="text-white font-bold flex items-center gap-1.5 text-xs">
        <span>💻</span>
        <span>HP Victus Laptop</span>
      </div>
      <p class="text-gray-400 text-[10px] mt-1 leading-snug">Asosiy ishchi stansiya: Adobe Premiere Pro, DaVinci Resolve, og'ir 4K video render va Python backend.</p>
    </div>
    <div class="bg-emerald-950/40 border border-emerald-500/20 p-2.5 rounded">
      <div class="text-white font-bold flex items-center gap-1.5 text-xs">
        <span>🖥️</span>
        <span>Qo'shimcha Monitor</span>
      </div>
      <p class="text-gray-400 text-[10px] mt-1 leading-snug">Kengaytirilgan ikkinchi ish maydoni: qulay multi-track timeline, rang korreksiyasi va kod muharriri.</p>
    </div>
    <div class="bg-emerald-950/40 border border-emerald-500/20 p-2.5 rounded">
      <div class="text-white font-bold flex items-center gap-1.5 text-xs">
        <span>📱</span>
        <span>iPhone 16 Pro Max</span>
      </div>
      <p class="text-gray-400 text-[10px] mt-1 leading-snug">Kreativ mobilografiya, 4K 60FPS kadrlar va brendga mos tezkor Reels tasvirga olish.</p>
    </div>
  </div>
</div>`);
            return;
        }

        if (lower === 'sarvar.ai()' || lower === 'ai' || lower === 'sarvar.ai_tools()') {
            appendOutput(`
<div class="bg-black/50 border border-emerald-500/40 rounded-lg p-3 my-1 text-xs space-y-2">
  <div class="flex items-center justify-between border-b border-emerald-500/20 pb-1.5">
    <p class="text-emerald-400 font-bold text-sm">⚡ Sun'iy Intellekt Vositalari (AI Tools Ecosystem):</p>
    <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">Professional Level</span>
  </div>
  <p class="text-gray-300 text-[11px]">Barcha media va IT loyihalarimda ssenariy, montaj, strategiya va kod yozishda samarali qo'llanadi:</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
    <div class="bg-emerald-950/40 border border-emerald-500/20 p-2 rounded">
      <div class="text-white font-bold flex items-center justify-between">
        <span>🤖 ChatGPT (OpenAI)</span>
        <span class="text-emerald-400 font-mono text-[10px]">98%</span>
      </div>
      <p class="text-gray-400 text-[10px] mt-0.5">Ssenariylar, storytelling, reklama kopiraytingi, prompt engineering.</p>
    </div>
    <div class="bg-emerald-950/40 border border-emerald-500/20 p-2 rounded">
      <div class="text-white font-bold flex items-center justify-between">
        <span>✨ Google Gemini</span>
        <span class="text-emerald-400 font-mono text-[10px]">96%</span>
      </div>
      <p class="text-gray-400 text-[10px] mt-0.5">Multimodal tahlil, katta kontekst, vizual g'oyalar va bozor tahlili.</p>
    </div>
    <div class="bg-emerald-950/40 border border-emerald-500/20 p-2 rounded">
      <div class="text-white font-bold flex items-center justify-between">
        <span>🧠 Claude (Anthropic)</span>
        <span class="text-emerald-400 font-mono text-[10px]">95%</span>
      </div>
      <p class="text-gray-400 text-[10px] mt-0.5">Murakkab kod tahlili, dasturiy arxitektura va mantiqiy chuqur matnlar.</p>
    </div>
    <div class="bg-emerald-950/40 border border-emerald-500/20 p-2 rounded">
      <div class="text-white font-bold flex items-center justify-between">
        <span>🌊 Flow AI</span>
        <span class="text-emerald-400 font-mono text-[10px]">93%</span>
      </div>
      <p class="text-gray-400 text-[10px] mt-0.5">Ish jarayonlari (workflow) avtomatlashtirish va kreativ oqimlar.</p>
    </div>
    <div class="bg-emerald-950/40 border border-emerald-500/20 p-2 rounded md:col-span-2">
      <div class="text-white font-bold flex items-center justify-between">
        <span>⚡ Antigravity (Agentic AI)</span>
        <span class="text-emerald-400 font-mono text-[10px]">96%</span>
      </div>
      <p class="text-gray-400 text-[10px] mt-0.5">Avtonom agentik dasturlash, backend, API va interaktiv tizimlarni ishlab chiqish.</p>
    </div>
  </div>
</div>`);
            return;
        }

        if (lower === 'sarvar.projects()' || lower === 'projects') {
            appendOutput(`
<div class="bg-black/50 border border-emerald-500/40 rounded-lg p-3 my-1 text-xs space-y-2">
  <p class="text-emerald-400 font-bold text-sm mb-1">🚀 Hozirda faol ishlab kelinayotgan loyihalar:</p>
  <div class="p-2 rounded bg-emerald-950/40 border border-emerald-500/30">
    <p class="text-white font-bold">🏢 <a href="https://instagram.com/bugun_agency" target="_blank" rel="noopener noreferrer" class="text-emerald-300 hover:text-white underline">Bugun Agency (@bugun_agency)</a> — <span class="text-emerald-400">Video Montajor</span></p>
    <p class="text-gray-300 text-[11px] mt-0.5">Agentlik doirasida: <a href="https://instagram.com/bravos_qarshi" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:text-white underline font-bold">@bravos_qarshi</a> va boshqa brendlar loyihalarining video montaji (Faol).</p>
  </div>
  <div class="p-2 rounded bg-emerald-950/40 border border-emerald-500/30">
    <p class="text-white font-bold">📱 <a href="https://instagram.com/rezonans_academy" target="_blank" rel="noopener noreferrer" class="text-emerald-300 hover:text-white underline">Rezonans Academy (@rezonans_academy)</a> — <span class="text-emerald-400">Mobil Videograf + Targetolog</span></p>
    <p class="text-gray-300 text-[11px] mt-0.5">Alohida mustaqil shaxsiy loyiha: iPhone 16 Pro Max mobilografiya & Meta Ads (Faol).</p>
  </div>
  <div class="p-2 rounded bg-emerald-950/40 border border-emerald-500/30">
    <p class="text-white font-bold">📱 <a href="https://instagram.com/rezonans_english_school" target="_blank" rel="noopener noreferrer" class="text-emerald-300 hover:text-white underline">Rezonans English School (@rezonans_english_school)</a> — <span class="text-emerald-400">Mobil Videograf + Targetolog</span></p>
    <p class="text-gray-300 text-[11px] mt-0.5">Alohida mustaqil shaxsiy loyiha: Dinamik trend Reels & Meta Ads target (Faol).</p>
  </div>
</div>`);
            return;
        }

        if (lower === 'sarvar.info()' || lower === 'info' || lower === 'sarvar.bio()') {
            appendOutput(`
<div class="bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-3 my-1">
  <div class="text-emerald-400 font-bold text-base flex items-center gap-2">
    <span>💎 Sarvar Ziyodullayev</span>
    <span class="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">19 yosh</span>
  </div>
  <p class="text-white mt-1 text-sm font-medium">Video Montajor (Bugun Agency) | Mobil Videograf & Motion Designer | Targetolog | Python Dev</p>
  <div class="text-gray-300 text-xs mt-2 space-y-1">
    <p>🏢 <strong class="text-white">Ish joyi:</strong> <a href="https://instagram.com/bugun_agency" target="_blank" rel="noopener noreferrer" class="text-emerald-300 underline">Bugun Agency (@bugun_agency)</a> — Video Montajor</p>
    <p>⏳ <strong class="text-white">Tajriba:</strong> Media sohasida 2 yil (Hozirda ham barcha loyihalar bilan faol)</p>
    <p>⚡ <strong class="text-white">AI Ko'nikma:</strong> ChatGPT, Gemini, Claude, Flow AI, Antigravity (Professional darajada)</p>
    <p>📱 <strong class="text-white">Mustaqil loyihalar:</strong> <a href="https://instagram.com/rezonans_academy" target="_blank" rel="noopener noreferrer" class="text-emerald-300 underline">@rezonans_academy</a>, <a href="https://instagram.com/rezonans_english_school" target="_blank" rel="noopener noreferrer" class="text-emerald-300 underline">@rezonans_english_school</a> (Mobil Videograf + Targetolog)</p>
    <p>🎬 <strong class="text-white">Agentlik loyihalari:</strong> <a href="https://instagram.com/bravos_qarshi" target="_blank" rel="noopener noreferrer" class="text-emerald-300 underline">@bravos_qarshi</a> va agentlik loyihalari montaji</p>
    <p>🎓 <strong class="text-white">O'qish:</strong> Qarshi Davlat Texnika Universiteti (3-kurs talabasi, Dasturiy Injenering)</p>
    <p>📍 <strong class="text-white">Hozirgi faoliyat:</strong> Qarshi shahri</p>
    <p>🏡 <strong class="text-white">Tug'ilgan joy:</strong> Kitob tumani, Beruniy ko'cha 24-uy (1-maktab)</p>
  </div>
</div>`);
            return;
        }

        if (lower === 'sarvar.skills()' || lower === 'skills') {
            appendOutput(`
<div class="space-y-2 my-1">
  <div class="bg-emerald-950/30 p-2.5 rounded border border-emerald-500/20">
    <p class="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1.5">🎬 Media & Kreativ Ko'nikmalar</p>
    <div class="flex flex-wrap gap-1.5">
      ${portfolioData.skills.media.map(s => `<span class="bg-emerald-500/20 text-emerald-200 text-xs px-2 py-1 rounded font-mono">${s}</span>`).join('')}
    </div>
  </div>
  <div class="bg-emerald-950/30 p-2.5 rounded border border-emerald-500/20">
    <p class="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1.5">⚡ Sun'iy Intellekt Vositalari (AI Tools Pro)</p>
    <div class="flex flex-wrap gap-1.5">
      ${portfolioData.skills.ai.map(s => `<span class="bg-emerald-500/30 text-white text-xs px-2 py-1 rounded font-mono border border-emerald-500/40">${s}</span>`).join('')}
    </div>
  </div>
  <div class="bg-emerald-950/30 p-2.5 rounded border border-emerald-500/20">
    <p class="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1.5">💻 Dasturlash & Muhandislik</p>
    <div class="flex flex-wrap gap-1.5">
      ${portfolioData.skills.dev.map(s => `<span class="bg-white/10 text-white text-xs px-2 py-1 rounded font-mono">${s}</span>`).join('')}
    </div>
  </div>
</div>`);
            return;
        }

        if (lower === 'sarvar.education()' || lower === 'education') {
            appendOutput(`
<div class="bg-black/40 border border-emerald-500/30 rounded-lg p-3 my-1 text-xs space-y-2">
  <div class="flex items-start gap-2">
    <span class="text-base">🏛️</span>
    <div>
      <p class="text-emerald-400 font-bold text-sm">Qarshi Davlat Texnika Universiteti</p>
      <p class="text-white">Mutaxassislik: <span class="text-emerald-200">Dasturiy Injenering</span> (Software Engineering)</p>
      <p class="text-gray-400">Algoritmlar, ma'lumotlar tuzilmasi va zamonaviy IT tizimlarini chuqur o'rganish.</p>
    </div>
  </div>
  <div class="flex items-start gap-2 pt-2 border-t border-emerald-500/20">
    <span class="text-base">🏫</span>
    <div>
      <p class="text-emerald-400 font-bold text-sm">Kitob tumani 1-maktab</p>
      <p class="text-gray-300">Aniq fanlar va chet tillari bo'yicha kuchli poydevor maktabi.</p>
    </div>
  </div>
</div>`);
            return;
        }

        if (lower === 'sarvar.sports()' || lower === 'sports' || lower === 'sport') {
            appendOutput(`
<div class="bg-black/40 border border-emerald-500/30 rounded-lg p-3 my-1">
  <p class="text-emerald-400 font-bold text-xs mb-2">⚡ Sport va Jismoniy Kuch (Intizom va Iroda):</p>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
    ${portfolioData.sports.map(sp => `
      <div class="bg-emerald-950/40 border border-emerald-500/20 px-2 py-1.5 rounded text-xs text-white flex items-center gap-1.5">
        <span class="text-emerald-400">✔</span> ${sp}
      </div>
    `).join('')}
  </div>
</div>`);
            return;
        }

        if (lower === 'sarvar.hobbies()' || lower === 'hobbies' || lower === 'hobby') {
            appendOutput(`
<div class="bg-black/40 border border-emerald-500/30 rounded-lg p-3 my-1 text-xs space-y-1.5">
  <p class="text-emerald-400 font-bold">🎯 Xobbi va Erkin Vaqt:</p>
  <p class="text-gray-200">🎮 <span class="text-white font-medium">Playstation Games:</span> Vizual grafika va reflekslarni rivojlantirish.</p>
  <p class="text-gray-200">📚 <span class="text-white font-medium">Reading Books:</span> Shaxsiy rivojlanish, motivatsiya va biznes adabiyotlari.</p>
  <p class="text-gray-200">🇬🇧 <span class="text-white font-medium">Ingliz tili:</span> Xalqaro IT platformalari va jahon montaj trendlari bilan ishlash.</p>
  <p class="text-gray-200">⚽🏀 <span class="text-white font-medium">Futbol & Basketbol:</span> Jamoaviy o'yinlar va dinamika.</p>
</div>`);
            return;
        }

        if (lower === 'sarvar.contact()' || lower === 'contact') {
            appendOutput(`
<div class="bg-black/50 border border-emerald-500/40 rounded-lg p-3 my-1 text-xs space-y-1">
  <p class="text-emerald-400 font-bold text-sm mb-1">📬 Sarvar Ziyodullayev bilan bog'lanish:</p>
  <p>✈️ <span class="text-gray-400">Telegram:</span> <a href="https://t.me/Sarvarbek_zs" target="_blank" class="text-emerald-300 underline font-mono">@Sarvarbek_zs</a></p>
  <p>📸 <span class="text-gray-400">Instagram:</span> <a href="https://instagram.com/sarvarvision_" target="_blank" class="text-emerald-300 underline font-mono">@sarvarvision_</a></p>
  <p>✉️ <span class="text-gray-400">Email:</span> <span class="text-white font-mono">sarvarziyodullayev346@gmail.com</span></p>
  <p>🏢 <span class="text-gray-400">Agentlik:</span> <span class="text-emerald-300 font-mono">Bugun Agency (@bugun_agency) — Video Montajor (Faol)</span></p>
  <p>💼 <span class="text-gray-400">Loyihalar:</span> <span class="text-emerald-300 font-mono">@bravos_qarshi (Bugun Agency), Mustaqil: @rezonans_academy, @rezonans_english_school</span></p>
</div>`);
            return;
        }

        if (lower === 'sarvar.render_video()') {
            simulateVideoRender();
            return;
        }

        if (lower === 'sarvar.run_bot()') {
            simulateTelegramBot();
            return;
        }

        // Default unrecognized command
        appendOutput(`
<span class="text-rose-400 font-mono text-xs">
  Traceback (most recent call last):<br>
  NameError: name '${escapeHtml(cmd)}' is not defined. Yordam uchun <strong class="text-emerald-300 cursor-pointer" onclick="window.runTermPreset('help')">'help'</strong> deb yozing.
</span>`);
    }

    function simulateVideoRender() {
        const id = 'render-progress-' + Date.now();
        appendOutput(`
<div class="my-2 p-2.5 bg-black/60 border border-emerald-500/30 rounded text-xs font-mono" id="${id}">
  <div class="text-emerald-400 font-semibold mb-1">🎬 HP Victus + Tashqi Monitor (Premiere Pro / DaVinci) 4K Render...</div>
  <div class="text-gray-400 text-[11px] mb-1">Workstation: HP Victus Laptop + Dual Display | Codec: ProRes 422 HQ @ 60fps</div>
  <div class="w-full bg-emerald-950/60 rounded-full h-2.5 overflow-hidden border border-emerald-500/30">
    <div class="bg-gradient-to-r from-emerald-500 to-white h-2.5 transition-all duration-300" style="width: 0%" id="${id}-bar"></div>
  </div>
  <div class="text-right text-emerald-300 text-[10px] mt-1" id="${id}-pct">0%</div>
</div>`);

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 18) + 12;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                const bar = document.getElementById(`${id}-bar`);
                const pct = document.getElementById(`${id}-pct`);
                if (bar) bar.style.width = '100%';
                if (pct) pct.innerHTML = '✅ Render yakunlandi! 4K Master Video Tayyor.';
                if (window.soundFX) window.soundFX.playSuccess();
            } else {
                const bar = document.getElementById(`${id}-bar`);
                const pct = document.getElementById(`${id}-pct`);
                if (bar) bar.style.width = progress + '%';
                if (pct) pct.innerHTML = progress + '%';
                if (window.soundFX) window.soundFX.playKey();
            }
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, 180);
    }

    function simulateTelegramBot() {
        appendOutput(`
<div class="my-2 p-2.5 bg-black/60 border border-emerald-500/30 rounded text-xs font-mono space-y-1">
  <div class="text-emerald-400 font-bold">🤖 Python Telegram Bot Server Started</div>
  <div class="text-gray-300">[INFO] Loading python-telegram-bot / aiogram async engine...</div>
  <div class="text-gray-300">[INFO] Database connected: SQLite / PostgreSQL</div>
  <div class="text-emerald-300">[STATUS] Bot polling active: <span class="text-white">@SarvarCreativeBot</span></div>
  <div class="text-xs text-emerald-400">🚀 Server listening on port 8080 (200 OK)</div>
</div>`);
        if (window.soundFX) window.soundFX.playSuccess();
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }

    // Event listener for form
    terminalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cmd = terminalInput.value;
        if (cmd.trim()) {
            history.push(cmd);
            historyIdx = history.length;
        }
        executeCommand(cmd);
        terminalInput.value = '';
    });

    // Arrow keys history
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            if (historyIdx > 0) {
                historyIdx--;
                terminalInput.value = history[historyIdx] || '';
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIdx < history.length - 1) {
                historyIdx++;
                terminalInput.value = history[historyIdx] || '';
            } else {
                historyIdx = history.length;
                terminalInput.value = '';
            }
        }
        if (window.soundFX && e.key.length === 1) {
            window.soundFX.playKey();
        }
    });

    // Preset pills handler
    window.runTermPreset = function(command) {
        terminalInput.value = command;
        executeCommand(command);
        terminalInput.value = '';
    };

    terminalPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const cmd = pill.getAttribute('data-cmd');
            if (cmd) {
                window.runTermPreset(cmd);
            }
        });
    });
})();
