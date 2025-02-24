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
        
        // Function to get colors based on theme
        const getThemeColors = () => {
            const isLightTheme = document.body.classList.contains('light-theme');
            return {
                ai: isLightTheme ? 0x2563eb : 0x4a90e2,     // Blue
                code: isLightTheme ? 0x059669 : 0x50e3c2,    // Green/Cyan
                human: isLightTheme ? 0xd97706 : 0xf5a623    // Orange
            };
        };

        // Create three distinct particle groups
        const createParticleGroups = () => {
            const colors = getThemeColors();
            return [
                { color: colors.ai, count: 500, speed: 0.002, range: 8, size: 0.03 },     // AI (blue)
                { color: colors.code, count: 500, speed: 0.001, range: 8, size: 0.02 },   // Code (cyan)
                { color: colors.human, count: 500, speed: 0.0015, range: 8, size: 0.025 } // Human (orange)
            ];
        };

        let particleGroups = [];
        
        const initParticles = () => {
            // Remove existing particles
            particleGroups.forEach(group => scene.remove(group));
            particleGroups = [];
            
            // Create new particles with updated colors
            createParticleGroups().forEach(group => {
                const geometry = new THREE.BufferGeometry();
                const positions = new Float32Array(group.count * 3);
                const velocities = new Float32Array(group.count * 3);
                
                for (let i = 0; i < group.count * 3; i += 3) {
                    const angle = (i / 3) * (2 * Math.PI / group.count);
                    const radius = Math.random() * group.range;
                    
                    positions[i] = Math.cos(angle) * radius;
                    positions[i + 1] = Math.sin(angle) * radius;
                    positions[i + 2] = (Math.random() - 0.5) * group.range;
                    
                    velocities[i] = (Math.random() - 0.5) * 0.02;
                    velocities[i + 1] = (Math.random() - 0.5) * 0.02;
                    velocities[i + 2] = (Math.random() - 0.5) * 0.02;
                }
                
                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                
                const material = new THREE.PointsMaterial({
                    size: group.size,
                    color: group.color,
                    transparent: true,
                    opacity: 0.6,
                    blending: THREE.AdditiveBlending
                });
                
                const mesh = new THREE.Points(geometry, material);
                mesh.userData = { velocities, speed: group.speed };
                scene.add(mesh);
                particleGroups.push(mesh);
            });
        };

        // Initialize particles
        initParticles();
        
        camera.position.z = 15;
        
        // Mouse movement variables
        let mouseX = 0;
        let mouseY = 0;
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            particleGroups.forEach((group, index) => {
                const positions = group.geometry.attributes.position.array;
                const velocities = group.userData.velocities;
                
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i] += velocities[i];
                    positions[i + 1] += velocities[i + 1];
                    positions[i + 2] += velocities[i + 2];
                    
                    for (let j = 0; j < 3; j++) {
                        if (Math.abs(positions[i + j]) > 8) {
                            positions[i + j] *= -0.9;
                            velocities[i + j] *= -0.9;
                        }
                    }
                }
                
                group.rotation.y += group.userData.speed;
                group.rotation.x += group.userData.speed * 0.5;
                
                group.rotation.x += mouseY * 0.0002;
                group.rotation.y += mouseX * 0.0002;
                
                group.geometry.attributes.position.needsUpdate = true;
            });
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Handle theme changes
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                // Wait for theme class to be updated
                setTimeout(initParticles, 0);
            });
        }

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
