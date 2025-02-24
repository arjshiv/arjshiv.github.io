document.addEventListener('DOMContentLoaded', () => {
    // Three.js Animation Setup
    const setupThreeAnimation = () => {
        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        
        const posArray = new Float32Array(particlesCount * 3);
        const scaleArray = new Float32Array(particlesCount);
        
        for (let i = 0; i < particlesCount * 3; i += 3) {
            posArray[i] = (Math.random() - 0.5) * 10;
            posArray[i + 1] = (Math.random() - 0.5) * 10;
            posArray[i + 2] = (Math.random() - 0.5) * 10;
            scaleArray[i / 3] = Math.random();
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.3,
            sizeAttenuation: true
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        camera.position.z = 5;
        
        // Mouse movement variables
        let mouseX = 0;
        let mouseY = 0;
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.001;
            particlesMesh.rotation.y += 0.001;
            
            // Subtle movement based on mouse position
            particlesMesh.rotation.x += mouseY * 0.0005;
            particlesMesh.rotation.y += mouseX * 0.0005;
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        return { mouseX, mouseY };
    };

    // Mouse movement effect
    const setupMouseEffects = (threeJsVars) => {
        document.addEventListener('mousemove', (event) => {
            threeJsVars.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            threeJsVars.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            // Update mouse follower
            const mouseFollower = document.querySelector('.mouse-follower');
            mouseFollower.style.left = `${event.clientX}px`;
            mouseFollower.style.top = `${event.clientY}px`;
        });
        
        // Mouse follower size change on click
        document.addEventListener('mousedown', () => {
            const mouseFollower = document.querySelector('.mouse-follower');
            mouseFollower.style.width = '20px';
            mouseFollower.style.height = '20px';
        });
        
        document.addEventListener('mouseup', () => {
            const mouseFollower = document.querySelector('.mouse-follower');
            mouseFollower.style.width = '10px';
            mouseFollower.style.height = '10px';
        });
    };

    // Intersection Observer for animations
    const setupIntersectionObserver = () => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe cards and timeline items
        document.querySelectorAll('.card, .timeline-item').forEach(item => {
            intersectionObserver.observe(item);
        });
    };

    // Theme toggle functionality
    const setupThemeToggle = () => {
        const themeToggle = document.querySelector('.theme-toggle');
        let isDark = true;
        
        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            document.body.classList.toggle('light-theme');
        });
    };

    // Initialize all animations and interactions
    const threeJsVars = setupThreeAnimation();
    setupMouseEffects(threeJsVars);
    setupIntersectionObserver();
    setupThemeToggle();
});
