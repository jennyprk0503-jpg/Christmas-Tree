// State management
const state = {
    currentStep: 0,
    selectedTree: null,
    selectedLights: null,
    ornaments: []
};

// Sound effects (simple beep using Web Audio API)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency = 800, duration = 100) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

// Screen navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Welcome screen
document.getElementById('welcome-screen').addEventListener('click', () => {
    playSound(1000, 150);
    showScreen('step1-screen');
});

// Step 1: Tree Selection
const treeOptions = document.querySelectorAll('.tree-option');
const selectedTreeDisplay = document.getElementById('selected-tree');
const nextBtn1 = document.getElementById('next-btn-1');

treeOptions.forEach(option => {
    option.addEventListener('click', () => {
        playSound(900, 100);

        // Remove previous selection
        treeOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        // Get tree type
        const treeType = option.dataset.tree;
        state.selectedTree = treeType;

        // Update display
        selectedTreeDisplay.className = `tree ${treeType}-tree`;

        // Enable next button
        nextBtn1.disabled = false;
    });
});

nextBtn1.addEventListener('click', () => {
    playSound(1200, 150);
    showScreen('step2-screen');

    // Copy tree to step 2
    const treeWithLights = document.getElementById('tree-with-lights');
    treeWithLights.className = `tree ${state.selectedTree}-tree`;
});

// Step 2: Lights Selection
const lightOptions = document.querySelectorAll('.light-option');
const lightsContainer = document.querySelector('#tree-with-lights .lights-container');
const nextBtn2 = document.getElementById('next-btn-2');
const prevBtn2 = document.getElementById('prev-btn-2');

function createLights(lightType) {
    lightsContainer.innerHTML = '';

    const colors = {
        mixed: ['#ff0000', '#0000ff', '#ffff00', '#00ff00', '#ff00ff'],
        white: ['#ffffff'],
        yellow: ['#ffff00'],
        orange: ['#ffa500']
    };

    const lightColors = colors[lightType];
    const positions = [
        { top: '5%', left: '50%' },
        { top: '15%', left: '35%' },
        { top: '15%', left: '65%' },
        { top: '30%', left: '25%' },
        { top: '30%', left: '50%' },
        { top: '30%', left: '75%' },
        { top: '45%', left: '20%' },
        { top: '45%', left: '45%' },
        { top: '45%', left: '70%' },
        { top: '45%', left: '85%' },
        { top: '60%', left: '15%' },
        { top: '60%', left: '35%' },
        { top: '60%', left: '55%' },
        { top: '60%', left: '75%' },
        { top: '60%', left: '90%' },
        { top: '75%', left: '10%' },
        { top: '75%', left: '30%' },
        { top: '75%', left: '50%' },
        { top: '75%', left: '70%' },
        { top: '75%', left: '90%' },
        { top: '90%', left: '15%' },
        { top: '90%', left: '35%' },
        { top: '90%', left: '55%' },
        { top: '90%', left: '75%' },
        { top: '90%', left: '88%' }
    ];

    positions.forEach((pos, index) => {
        const light = document.createElement('div');
        light.className = 'light';
        const color = lightColors[index % lightColors.length];
        light.style.background = color;
        light.style.boxShadow = `0 0 10px ${color}`;
        light.style.top = pos.top;
        light.style.left = pos.left;
        light.style.animationDelay = `${Math.random() * 1.5}s`;
        lightsContainer.appendChild(light);
    });
}

lightOptions.forEach(option => {
    option.addEventListener('click', () => {
        playSound(850, 100);

        // Remove previous selection
        lightOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        // Get light type
        const lightType = option.dataset.light;
        state.selectedLights = lightType;

        // Create lights on tree
        createLights(lightType);

        // Enable next button
        nextBtn2.disabled = false;
    });
});

prevBtn2.addEventListener('click', () => {
    playSound(700, 150);
    showScreen('step1-screen');
});

nextBtn2.addEventListener('click', () => {
    playSound(1200, 150);
    showScreen('step3-screen');

    // Copy tree and lights to step 3
    const treeWithOrnaments = document.getElementById('tree-with-ornaments');
    treeWithOrnaments.className = `tree ${state.selectedTree}-tree`;

    const step3LightsContainer = treeWithOrnaments.querySelector('.lights-container');
    step3LightsContainer.innerHTML = lightsContainer.innerHTML;
});

// Step 3: Ornaments (Click to Select + Click to Place OR Drag and Drop)
const ornamentOptions = document.querySelectorAll('.ornament-option');
const dropZone = document.getElementById('ornament-drop-zone');
const ornamentsContainer = document.querySelector('#tree-with-ornaments .ornaments-container');
const nextBtn3 = document.getElementById('next-btn-3');
const prevBtn3 = document.getElementById('prev-btn-3');

let selectedOrnamentType = null;
let draggedOrnamentType = null;
let cursorPreview = null;

// Function to create an ornament at a specific position
function createOrnamentAt(ornamentType, x, y) {
    const ornament = document.createElement('div');
    ornament.className = `ornament ${ornamentType}`;
    ornament.style.left = `${x}px`;
    ornament.style.top = `${y}px`;
    ornament.style.transform = 'translate(-50%, -50%)';
    ornament.style.position = 'absolute';

    // Add random colors for Christmas balls
    if (ornamentType === 'ball') {
        const ballColors = [
            'radial-gradient(circle at 30% 30%, #ff4444, #cc0000 45%, #990000)', // Red
            'radial-gradient(circle at 30% 30%, #4444ff, #0000cc 45%, #000099)', // Blue
            'radial-gradient(circle at 30% 30%, #44ff44, #00cc00 45%, #009900)', // Green
            'radial-gradient(circle at 30% 30%, #ffff44, #cccc00 45%, #999900)', // Gold
            'radial-gradient(circle at 30% 30%, #ff44ff, #cc00cc 45%, #990099)', // Purple
            'radial-gradient(circle at 30% 30%, #44ffff, #00cccc 45%, #009999)', // Cyan
            'radial-gradient(circle at 30% 30%, #ffaa44, #cc7700 45%, #995500)'  // Orange
        ];
        const randomColor = ballColors[Math.floor(Math.random() * ballColors.length)];
        ornament.style.background = randomColor;
    }

    // Add click to remove functionality
    ornament.addEventListener('click', (e) => {
        e.stopPropagation();
        playSound(600, 100);
        ornament.remove();

        // Remove from state
        const index = state.ornaments.findIndex(o =>
            o.type === ornamentType && o.x === x && o.y === y
        );
        if (index > -1) {
            state.ornaments.splice(index, 1);
        }
    });

    // Add hover effect
    ornament.style.cursor = 'pointer';
    ornament.title = 'Click to remove';

    ornamentsContainer.appendChild(ornament);

    // Save to state
    state.ornaments.push({
        type: ornamentType,
        x: x,
        y: y
    });
}

// Click to select ornament
ornamentOptions.forEach(option => {
    // Click to select
    option.addEventListener('click', (e) => {
        if (e.target.closest('.ornament-option')) {
            playSound(950, 100);

            // Toggle selection
            if (selectedOrnamentType === option.dataset.ornament) {
                // Deselect
                selectedOrnamentType = null;
                ornamentOptions.forEach(opt => opt.classList.remove('selected'));
                dropZone.style.cursor = 'default';
                if (cursorPreview) {
                    cursorPreview.remove();
                    cursorPreview = null;
                }
            } else {
                // Select
                selectedOrnamentType = option.dataset.ornament;
                ornamentOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                dropZone.style.cursor = 'crosshair';
            }
        }
    });

    // Drag and drop support
    option.addEventListener('dragstart', (e) => {
        draggedOrnamentType = option.dataset.ornament;
        option.classList.add('dragging');
        playSound(950, 50);
    });

    option.addEventListener('dragend', (e) => {
        option.classList.remove('dragging');
    });
});

// Mouse move to show preview
dropZone.addEventListener('mousemove', (e) => {
    if (selectedOrnamentType && !cursorPreview) {
        cursorPreview = document.createElement('div');
        cursorPreview.className = `ornament ${selectedOrnamentType}`;
        cursorPreview.style.position = 'fixed';
        cursorPreview.style.pointerEvents = 'none';
        cursorPreview.style.opacity = '0.6';
        cursorPreview.style.transform = 'translate(-50%, -50%)';
        cursorPreview.style.zIndex = '10000';
        document.body.appendChild(cursorPreview);
    }

    if (cursorPreview) {
        cursorPreview.style.left = `${e.clientX}px`;
        cursorPreview.style.top = `${e.clientY}px`;
    }
});

dropZone.addEventListener('mouseleave', () => {
    if (cursorPreview && selectedOrnamentType) {
        cursorPreview.style.opacity = '0';
    }
});

dropZone.addEventListener('mouseenter', () => {
    if (cursorPreview && selectedOrnamentType) {
        cursorPreview.style.opacity = '0.6';
    }
});

// Click to place ornament
dropZone.addEventListener('click', (e) => {
    if (!selectedOrnamentType) return;

    playSound(1000, 100);

    // Get click position relative to ornaments container
    const rect = ornamentsContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createOrnamentAt(selectedOrnamentType, x, y);
});

// Drag and drop support
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');

    if (!draggedOrnamentType) return;

    playSound(1000, 100);

    // Get drop position relative to ornaments container
    const rect = ornamentsContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createOrnamentAt(draggedOrnamentType, x, y);

    draggedOrnamentType = null;
});

prevBtn3.addEventListener('click', () => {
    playSound(700, 150);
    showScreen('step2-screen');
});

nextBtn3.addEventListener('click', () => {
    playSound(1400, 200);
    showFinale();
});

// Step 4: Finale
function showFinale() {
    showScreen('finale-screen');

    // Copy tree, lights, and ornaments to finale
    const finalTree = document.getElementById('final-tree');
    finalTree.className = `tree ${state.selectedTree}-tree`;

    const finalLightsContainer = finalTree.querySelector('.lights-container');
    finalLightsContainer.innerHTML = lightsContainer.innerHTML;

    const finalOrnamentsContainer = finalTree.querySelector('.ornaments-container');
    finalOrnamentsContainer.innerHTML = ornamentsContainer.innerHTML;

    // Create snowfall
    createSnowfall();

    // Play music (simple melody using Web Audio API)
    playChristmasMelody();
}

function createSnowfall() {
    const snowfallContainer = document.querySelector('.snowfall');
    const snowflakeCount = 50;

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${5 + Math.random() * 10}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflake.style.fontSize = `${0.5 + Math.random() * 1}em`;
        snowflake.style.opacity = Math.random();
        snowfallContainer.appendChild(snowflake);
    }
}

function playChristmasMelody() {
    // Simple jingle bells melody pattern
    const notes = [
        { freq: 659.25, duration: 300 }, // E
        { freq: 659.25, duration: 300 }, // E
        { freq: 659.25, duration: 600 }, // E
        { freq: 659.25, duration: 300 }, // E
        { freq: 659.25, duration: 300 }, // E
        { freq: 659.25, duration: 600 }, // E
        { freq: 659.25, duration: 300 }, // E
        { freq: 783.99, duration: 300 }, // G
        { freq: 523.25, duration: 300 }, // C
        { freq: 587.33, duration: 300 }, // D
        { freq: 659.25, duration: 900 }  // E
    ];

    let currentTime = audioContext.currentTime;

    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.2, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration / 1000);

        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration / 1000);

        currentTime += note.duration / 1000 + 0.05;
    });
}

// Initialize
console.log('Christmas Tree Decorator loaded! 🎄');
