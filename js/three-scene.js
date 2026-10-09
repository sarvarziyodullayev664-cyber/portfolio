// Three.js 3D Background & Hero Visualization for Sarvar Ziyodullayev Portfolio
(function() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn("Three.js not found. 3D features will be disabled.");
        return;
    }

    // Canvas container
    const bgCanvas = document.getElementById('bg-canvas');
    const heroCanvasContainer = document.getElementById('hero-3d-container');

    // ----------------------------------------------------
    // 1. BACKGROUND AMBIENT 3D PARTICLES & NEBULA
    // ----------------------------------------------------
    let bgScene, bgCamera, bgRenderer, particles, particleGeo, particleMat;
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    function initBackgroundScene() {
        if (!bgCanvas) return;

        bgScene = new THREE.Scene();
        bgScene.fog = new THREE.FogExp2(0x040806, 0.0012);

        bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
        bgCamera.position.z = 800;

        bgRenderer = new THREE.WebGLRenderer({
            canvas: bgCanvas,
            alpha: true,
            antialias: true
        });
        bgRenderer.setSize(window.innerWidth, window.innerHeight);
        bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create 3D particles with Emerald & Pure White hues
        const particleCount = 900;
        particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);

        const emeraldColor = new THREE.Color(0x00ff87);
        const mintColor = new THREE.Color(0x10b981);
        const whiteColor = new THREE.Color(0xffffff);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 2200;
            positions[i3 + 1] = (Math.random() - 0.5) * 2200;
            positions[i3 + 2] = (Math.random() - 0.5) * 1600;

            // Blend colors: 65% emerald/mint, 35% pure white
            const rand = Math.random();
            let c;
            if (rand < 0.45) c = emeraldColor;
            else if (rand < 0.75) c = mintColor;
            else c = whiteColor;

            colors[i3] = c.r;
            colors[i3 + 1] = c.g;
            colors[i3 + 2] = c.b;

            scales[i] = Math.random() * 4 + 1.5;
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Generate circular glow texture dynamically
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(0, 255, 135, 0.8)');
        gradient.addColorStop(0.7, 'rgba(0, 255, 135, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        const pointTexture = new THREE.CanvasTexture(canvas);

        particleMat = new THREE.PointsMaterial({
            size: 14,
            vertexColors: true,
            map: pointTexture,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        particles = new THREE.Points(particleGeo, particleMat);
        bgScene.add(particles);

        // Ambient floating torus ring in deep background
        const bgRingGeo = new THREE.TorusGeometry(380, 2, 16, 100);
        const bgRingMat = new THREE.MeshBasicMaterial({
            color: 0x00ff87,
            wireframe: true,
            transparent: true,
            opacity: 0.12
        });
        window.bgTorus = new THREE.Mesh(bgRingGeo, bgRingMat);
        window.bgTorus.position.set(200, -100, -200);
        bgScene.add(window.bgTorus);
    }

    // ----------------------------------------------------
    // 2. HERO 3D INTERACTIVE EMERALD GEM & GYROSCOPE
    // ----------------------------------------------------
    let heroScene, heroCamera, heroRenderer, heroGroup;
    let gemMesh, wireMesh, innerCore, ringX, ringY, ringZ;

    function initHero3D() {
        if (!heroCanvasContainer) return;

        const width = heroCanvasContainer.clientWidth || 460;
        const height = heroCanvasContainer.clientHeight || 460;

        heroScene = new THREE.Scene();

        heroCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        heroCamera.position.set(0, 0, 8.5);

        heroRenderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        heroRenderer.setSize(width, height);
        heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        heroRenderer.shadowMap.enabled = true;
        heroCanvasContainer.appendChild(heroRenderer.domElement);

        heroGroup = new THREE.Group();
        heroScene.add(heroGroup);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
        heroScene.add(ambientLight);

        const emeraldPoint = new THREE.PointLight(0x00ff87, 3, 20);
        emeraldPoint.position.set(5, 5, 5);
        heroScene.add(emeraldPoint);

        const whitePoint = new THREE.PointLight(0xffffff, 2.5, 20);
        whitePoint.position.set(-5, -5, 4);
        heroScene.add(whitePoint);

        const rimLight = new THREE.PointLight(0x10b981, 2, 20);
        rimLight.position.set(0, 7, -3);
        heroScene.add(rimLight);

        // 1. Faceted Emerald Core (Icosahedron)
        const gemGeo = new THREE.IcosahedronGeometry(2.3, 0);
        const gemMat = new THREE.MeshPhysicalMaterial({
            color: 0x059669,
            emissive: 0x022c22,
            roughness: 0.12,
            metalness: 0.1,
            transmission: 0.7, // Glassy emerald transparency
            ior: 1.5,
            reflectivity: 0.9,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            flatShading: true,
            transparent: true,
            opacity: 0.88
        });
        gemMesh = new THREE.Mesh(gemGeo, gemMat);
        heroGroup.add(gemMesh);

        // 2. Wireframe Cage with Neon Emerald Glow
        const wireGeo = new THREE.IcosahedronGeometry(2.35, 1);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x00ff87,
            wireframe: true,
            transparent: true,
            opacity: 0.65
        });
        wireMesh = new THREE.Mesh(wireGeo, wireMat);
        heroGroup.add(wireMesh);

        // 3. Inner Glowing Core
        const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.9
        });
        innerCore = new THREE.Mesh(coreGeo, coreMat);
        heroGroup.add(innerCore);

        // 4. Gyroscopic Tech Rings (White & Emerald)
        const ringGeo1 = new THREE.TorusGeometry(3.3, 0.03, 16, 100);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00ff87, transparent: true, opacity: 0.85 });
        ringX = new THREE.Mesh(ringGeo1, ringMat1);
        heroGroup.add(ringX);

        const ringGeo2 = new THREE.TorusGeometry(3.6, 0.025, 16, 100);
        const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
        ringY = new THREE.Mesh(ringGeo2, ringMat2);
        heroGroup.add(ringY);

        const ringGeo3 = new THREE.TorusGeometry(3.9, 0.02, 16, 100);
        const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.5 });
        ringZ = new THREE.Mesh(ringGeo3, ringMat3);
        heroGroup.add(ringZ);

        // Small satellite nodes orbiting the gem
        const satellitesCount = 12;
        const satelliteGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const satelliteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        window.satellites = [];

        for (let i = 0; i < satellitesCount; i++) {
            const sat = new THREE.Mesh(satelliteGeo, satelliteMat);
            const angle = (i / satellitesCount) * Math.PI * 2;
            sat.userData = {
                angle: angle,
                radius: 3.4 + Math.sin(i) * 0.4,
                speed: 0.015 + (i % 3) * 0.005,
                height: (Math.sin(i * 1.5)) * 0.8
            };
            heroGroup.add(sat);
            window.satellites.push(sat);
        }
    }

    // ----------------------------------------------------
    // MOUSE & SCROLL TRACKING
    // ----------------------------------------------------
    function onMouseMove(event) {
        targetMouseX = (event.clientX - windowHalfX) * 0.6;
        targetMouseY = (event.clientY - windowHalfY) * 0.6;
    }

    let scrollY = 0;
    function onWindowScroll() {
        scrollY = window.scrollY || window.pageYOffset;
    }

    function onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (bgCamera && bgRenderer) {
            bgCamera.aspect = width / height;
            bgCamera.updateProjectionMatrix();
            bgRenderer.setSize(width, height);
        }

        if (heroCanvasContainer && heroCamera && heroRenderer) {
            const heroW = heroCanvasContainer.clientWidth || 460;
            const heroH = heroCanvasContainer.clientHeight || 460;
            heroCamera.aspect = heroW / heroH;
            heroCamera.updateProjectionMatrix();
            heroRenderer.setSize(heroW, heroH);
        }
    }

    // ----------------------------------------------------
    // MAIN ANIMATION LOOP
    // ----------------------------------------------------
    let clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse dampening
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // 1. Background scene updates
        if (particles && bgCamera) {
            particles.rotation.y = elapsedTime * 0.035;
            particles.rotation.x = elapsedTime * 0.018;

            bgCamera.position.x += (mouseX * 0.4 - bgCamera.position.x) * 0.05;
            bgCamera.position.y += (-mouseY * 0.4 - bgCamera.position.y) * 0.05;
            bgCamera.lookAt(bgScene.position);

            if (window.bgTorus) {
                window.bgTorus.rotation.x = elapsedTime * 0.1;
                window.bgTorus.rotation.y = elapsedTime * 0.15;
            }

            bgRenderer.render(bgScene, bgCamera);
        }

        // 2. Hero 3D object updates
        if (heroGroup && heroRenderer) {
            const rotSpeed = 0.6;
            gemMesh.rotation.x = elapsedTime * (0.35 * rotSpeed);
            gemMesh.rotation.y = elapsedTime * (0.5 * rotSpeed);

            wireMesh.rotation.x = -elapsedTime * (0.25 * rotSpeed);
            wireMesh.rotation.y = -elapsedTime * (0.4 * rotSpeed);

            innerCore.rotation.x = elapsedTime * 0.8;
            innerCore.rotation.z = elapsedTime * 0.6;

            ringX.rotation.x = elapsedTime * 0.6;
            ringX.rotation.y = elapsedTime * 0.3;

            ringY.rotation.y = -elapsedTime * 0.5;
            ringY.rotation.z = elapsedTime * 0.4;

            ringZ.rotation.z = elapsedTime * 0.7;
            ringZ.rotation.x = -elapsedTime * 0.2;

            // Interactive mouse tilt on Hero object
            heroGroup.rotation.y = (mouseX / windowHalfX) * 0.8;
            heroGroup.rotation.x = (mouseY / windowHalfY) * 0.8;

            // Scroll parallax float
            heroGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.18 - (scrollY * 0.001);

            // Orbiting satellites
            if (window.satellites) {
                window.satellites.forEach(sat => {
                    sat.userData.angle += sat.userData.speed;
                    sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
                    sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
                    sat.position.y = sat.userData.height + Math.sin(sat.userData.angle * 2) * 0.3;
                });
            }

            heroRenderer.render(heroScene, heroCamera);
        }
    }

    // Initialize after DOM load or immediately if already loaded
    function start() {
        initBackgroundScene();
        initHero3D();
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('scroll', onWindowScroll, { passive: true });
        window.addEventListener('resize', onResize);
        animate();
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
