// Main Interactive Logic for Sarvar Ziyodullayev Premium Portfolio
function initMainApp() {

    // ------------------------------------------------------------------
    // 1. SOUND FX TOGGLE & UI INTERACTION
    // ------------------------------------------------------------------
    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    const audioIcon = document.getElementById('audio-icon');
    const audioLabel = document.getElementById('audio-label');

    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            const enabled = window.soundFX.toggle();
            if (audioIcon) {
                audioIcon.setAttribute('data-lucide', enabled ? 'volume-2' : 'volume-x');
                if (window.lucide) window.lucide.createIcons();
            }
            if (audioLabel) {
                audioLabel.innerText = enabled ? 'Ovoz: Yoniq' : 'Ovoz: O\'chiq';
            }
            if (enabled) window.soundFX.playSuccess();
        });
    }

    // Attach sound to interactive buttons and links
    document.querySelectorAll('button, .nav-link, .interactive-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (window.soundFX) window.soundFX.playHover();
        });
        btn.addEventListener('click', () => {
            if (window.soundFX) window.soundFX.playClick();
        });
    });

    // ------------------------------------------------------------------
    // 2. CUSTOM CURSOR WITH EMERALD TRAIL
    // ------------------------------------------------------------------
    const cursorDot = document.getElementById('cursor-dot');
    const cursorGlow = document.getElementById('cursor-glow');

    if (cursorDot && cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = -100, mouseY = -100;
        let glowX = -100, glowY = -100;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        function renderCursor() {
            glowX += (mouseX - glowX) * 0.15;
            glowY += (mouseY - glowY) * 0.15;
            cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        // Enlarge cursor on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, input, textarea, .card-tilt, .term-pill');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorGlow.classList.remove('cursor-hover');
            });
        });
    }

    // ------------------------------------------------------------------
    // 3. DYNAMIC TYPEWRITER EFFECT
    // ------------------------------------------------------------------
    const typedTextEl = document.getElementById('typewriter-text');
    if (typedTextEl) {
        const phrases = [
            "Bugun Agency Video Montajori 🎬",
            "Mobil Videograf (iPhone 16 Pro Max) 📱",
            "Motion Designer & Animatsiya ✨",
            "Meta Ads Targetolog (Rezonans) 🎯",
            "Dasturiy Injenering (QDTU 3-kurs) 💻",
            "AI Tools Pro (ChatGPT, Gemini, Claude) ⚡"
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function typeLoop() {
            const current = phrases[phraseIdx];
            if (isDeleting) {
                typedTextEl.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 40;
            } else {
                typedTextEl.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 90;
            }

            if (!isDeleting && charIdx === current.length) {
                typingSpeed = 2200; // Pause at end of text
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typingSpeed = 400; // Pause before typing next
            }

            setTimeout(typeLoop, typingSpeed);
        }
        typeLoop();
    }

    // ------------------------------------------------------------------
    // 4. 3D CARD TILT EFFECT (Vanilla Math)
    // ------------------------------------------------------------------
    const tiltCards = document.querySelectorAll('.card-tilt');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Update glare sheen
            const glare = card.querySelector('.card-glare');
            if (glare) {
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 135, 0.25) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 80%)`;
                glare.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            const glare = card.querySelector('.card-glare');
            if (glare) {
                glare.style.opacity = '0';
            }
        });
    });

    // ------------------------------------------------------------------
    // 5. INTERACTIVE VIDEO REELS SIMULATOR
    // ------------------------------------------------------------------
    const reelCanvas = document.getElementById('reel-canvas');
    const playBtn = document.getElementById('reel-play-btn');
    const reelStatus = document.getElementById('reel-status');
    const reelProgress = document.getElementById('reel-progress-bar');
    const reelTitle = document.getElementById('reel-title');
    const reelCat = document.getElementById('reel-cat');
    const reelPills = document.querySelectorAll('.reel-pill');

    let isPlaying = true;
    let reelProgressVal = 0;
    let currentReelType = 'dynamic';

    const reelData = {
        dynamic: {
            title: "Bravos Qarshi Promo Reel (@bravos_qarshi)",
            link: "https://instagram.com/bravos_qarshi",
            category: "Video Montaj (Bugun Agency: Video Montajor • Faol)",
            color: "#00ff87",
            speed: 1.2
        },
        commercial: {
            title: "Rezonans Academy (@rezonans_academy)",
            link: "https://instagram.com/rezonans_academy",
            category: "Mustaqil Loyiha (Mobil Videograf + Targetolog • Faol)",
            color: "#10b981",
            speed: 0.9
        },
        cinematic: {
            title: "Rezonans English School (@rezonans_english_school)",
            link: "https://instagram.com/rezonans_english_school",
            category: "Mustaqil Loyiha (Mobil Videograf + Targetolog • Faol)",
            color: "#34d399",
            speed: 0.8
        },
        python: {
            title: "Python Telegram Bot & Avtomatlashtirish",
            link: "https://t.me/Sarvarbek_zs",
            category: "QDTU Dasturiy Injenering & Backend",
            color: "#a7f3d0",
            speed: 1.4
        }
    };

    if (reelCanvas) {
        const ctx = reelCanvas.getContext('2d');
        let animationFrame;
        let t = 0;

        function drawReelSimulation() {
            if (!reelCanvas) return;
            const w = reelCanvas.width;
            const h = reelCanvas.height;

            ctx.clearRect(0, 0, w, h);

            // Background dynamic mesh / gradient
            const grad = ctx.createLinearGradient(0, 0, w, h);
            grad.addColorStop(0, '#04160d');
            grad.addColorStop(0.5, '#072417');
            grad.addColorStop(1, '#020b06');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            if (isPlaying) {
                t += 0.05 * (reelData[currentReelType]?.speed || 1);
            }

            // Audio wave visualizer simulation in the center
            const bars = 28;
            const barW = 4;
            const spacing = (w - 60) / bars;

            ctx.fillStyle = reelData[currentReelType]?.color || '#00ff87';
            for (let i = 0; i < bars; i++) {
                const height = Math.abs(Math.sin(t + i * 0.35)) * 90 + 15;
                const bx = 30 + i * spacing;
                const by = h / 2 - height / 2;
                
                // Glow
                ctx.shadowColor = reelData[currentReelType]?.color || '#00ff87';
                ctx.shadowBlur = 10;
                ctx.fillRect(bx, by, barW, height);
            }
            ctx.shadowBlur = 0;

            // Simulated Film Letterbox Lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(20, 40);
            ctx.lineTo(w - 20, 40);
            ctx.moveTo(20, h - 40);
            ctx.lineTo(w - 20, h - 40);
            ctx.stroke();

            // Center play badge overlay if paused
            if (!isPlaying) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('PAUZA (BOSING)', w / 2, h / 2);
            }

            // Progress tracking
            if (isPlaying) {
                reelProgressVal += 0.35;
                if (reelProgressVal > 100) reelProgressVal = 0;
                if (reelProgress) reelProgress.style.width = `${reelProgressVal}%`;
            }

            animationFrame = requestAnimationFrame(drawReelSimulation);
        }

        drawReelSimulation();

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                isPlaying = !isPlaying;
                playBtn.innerHTML = isPlaying ? '<i data-lucide="pause"></i>' : '<i data-lucide="play"></i>';
                if (reelStatus) reelStatus.innerText = isPlaying ? 'O\'ynamoqda' : 'To\'xtatildi';
                if (window.soundFX) window.soundFX.playClick();
                if (window.lucide) window.lucide.createIcons();
            });
        }

        // Reel switcher pills
        reelPills.forEach(pill => {
            pill.addEventListener('click', () => {
                const type = pill.getAttribute('data-reel');
                if (type && reelData[type]) {
                    currentReelType = type;
                    reelPills.forEach(p => p.classList.remove('active-reel'));
                    pill.classList.add('active-reel');

                    if (reelTitle) {
                        if (reelData[type].link) {
                            reelTitle.innerHTML = `<a href="${reelData[type].link}" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors inline-flex items-center gap-2"><span>${reelData[type].title}</span> <i data-lucide="arrow-up-right" class="w-5 h-5 text-emerald-400"></i></a>`;
                        } else {
                            reelTitle.innerText = reelData[type].title;
                        }
                    }
                    if (reelCat) reelCat.innerText = reelData[type].category;
                    reelProgressVal = 0;
                    isPlaying = true;
                    if (playBtn) playBtn.innerHTML = '<i data-lucide="pause"></i>';
                    if (reelStatus) reelStatus.innerText = 'O\'ynamoqda';
                    if (window.soundFX) window.soundFX.playClick();
                    if (window.lucide) window.lucide.createIcons();
                }
            });
        });
    }

    // ------------------------------------------------------------------
    // 6. PORTFOLIO FILTER TABS
    // ------------------------------------------------------------------
    const filterTabs = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-item');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active-filter'));
            tab.classList.add('active-filter');

            const filterValue = tab.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });

            if (window.soundFX) window.soundFX.playClick();
        });
    });

    // ------------------------------------------------------------------
    // 7. ABOUT SECTION INTERACTIVE TABS (Biografiya / Ta'lim / Manzil)
    // ------------------------------------------------------------------
    const aboutTabs = document.querySelectorAll('.about-tab-btn');
    const aboutPanes = document.querySelectorAll('.about-tab-content');

    aboutTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            aboutTabs.forEach(t => t.classList.remove('active-about-tab'));
            aboutPanes.forEach(p => p.classList.remove('active-pane'));

            tab.classList.add('active-about-tab');
            const targetPane = document.getElementById(target);
            if (targetPane) targetPane.classList.add('active-pane');

            if (window.soundFX) window.soundFX.playClick();
        });
    });

    // ------------------------------------------------------------------
    // 8. CLIPBOARD COPY WITH TOAST NOTIFICATION
    // ------------------------------------------------------------------
    const copyBtns = document.querySelectorAll('.copy-trigger');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');

    function showToast(message) {
        if (!toast || !toastMsg) return;
        toastMsg.innerText = message;
        toast.classList.add('show-toast');
        if (window.soundFX) window.soundFX.playSuccess();

        setTimeout(() => {
            toast.classList.remove('show-toast');
        }, 3200);
    }

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const label = btn.getAttribute('data-copy-label') || "Nusxalandi!";
                    showToast(`✅ ${label} buferga nusxalandi!`);
                }).catch(() => {
                    showToast("❌ Nusxalashda xatolik yuz berdi");
                });
            }
        });
    });

    // ------------------------------------------------------------------
    // 9. CONTACT FORM SUBMISSION TO FASTAPI BACKEND + CELEBRATION
    // ------------------------------------------------------------------
    // Record visit on page load
    try {
        fetch('/api/analytics/visit', { method: 'POST' }).catch(() => {});
    } catch(e) {}

    const contactForm = document.getElementById('contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    if (contactForm && formSubmitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name')?.value?.trim();
            const contact = document.getElementById('contact-phone')?.value?.trim();
            const service = document.getElementById('contact-service')?.value || 'video';
            const message = document.getElementById('contact-message')?.value?.trim();

            if (!name || !message || !contact) {
                showToast("⚠️ Iltimos, barcha maydonlarni to'ldiring!");
                return;
            }

            formSubmitBtn.disabled = true;
            formSubmitBtn.innerHTML = `<span>Yuborilmoqda...</span> <div class="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full ml-2"></div>`;

            let serverSuccess = false;
            let responseMsg = `🎉 Rahmat, ${name}! Xabaringiz muvaffaqiyatli yetkazildi!`;

            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, contact, service, message })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.message) responseMsg = data.message;
                    serverSuccess = true;
                }
            } catch (err) {
                console.warn("Backend API offline or running static mode:", err);
            }

            // Confetti celebration
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#00ff87', '#10b981', '#ffffff', '#34d399']
                });
            }

            showToast(responseMsg);
            if (window.soundFX) window.soundFX.playSuccess();

            formSubmitBtn.disabled = false;
            formSubmitBtn.innerHTML = `<span>Xabar Yuborildi! ✅</span>`;
            contactForm.reset();

            setTimeout(() => {
                formSubmitBtn.innerHTML = `<span>Xabar Yuborish</span> <i data-lucide="send"></i>`;
                if (window.lucide) window.lucide.createIcons();
            }, 4000);
        });
    }

    // ------------------------------------------------------------------
    // 10. REAL-TIME LOCAL CLOCK IN UZBEKISTAN
    // ------------------------------------------------------------------
    const uzbClock = document.getElementById('uzb-live-clock');
    if (uzbClock) {
        function updateClock() {
            const now = new Date();
            // Formatted in UTC+5 (Uzbekistan Time)
            const options = {
                timeZone: 'Asia/Tashkent',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            const timeStr = new Intl.DateTimeFormat('uz-UZ', options).format(now);
            uzbClock.innerText = `${timeStr} (Toshkent / Kitob)`;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    // ------------------------------------------------------------------
    // 11. MOBILE NAVIGATION DRAWER
    // ------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuDrawer = document.getElementById('mobile-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenuDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuDrawer.classList.toggle('open');
            const isOpen = mobileMenuDrawer.classList.contains('open');
            mobileMenuBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            if (window.lucide) window.lucide.createIcons();
            if (window.soundFX) window.soundFX.playClick();
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuDrawer.classList.remove('open');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                if (window.lucide) window.lucide.createIcons();
            });
        });
    }

    // ------------------------------------------------------------------
    // 12. INITIALIZE LUCIDE ICONS
    // ------------------------------------------------------------------
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initMainApp);
} else {
    initMainApp();
}
