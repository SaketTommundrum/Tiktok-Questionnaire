const qa = [
    {
        question: "Do you have a Master's degree or foreign equivalent degree in Computer Science, Engineering, Data Science, Analytics, Business or related field?",
        answer: "✅ Yes — I hold a Master's in Data Science & Business Analytics (GPA: 3.9/4.0), specializing in ML, BI dashboards & statistical analysis.",
        image: "images/masters-degree.jpg"
    },
    {
        question: "If yes, do you have 1 year of related work experience?",
        answer: "✅ Yes — Recent work as a Data Analyst at Prompt LLC, building a real-time Gunshot Detection & Analytics Dashboard System.",
        image: "images/work-experience.jpg"
    },
    {
        question: "Do you have a Bachelor's degree or foreign equivalent?",
        answer: "✅ Yes — Bachelor's in Mechanical Engineering. Led a Solar EV team achieving a 25% efficiency improvement using simulation-driven design.",
        image: "images/bachelors-degree.jpg"
    },
    {
        question: "Do you have 3 years of related work experience?",
        answer: "✅ Yes — Over 3 years as Technical & Marketing Lead at Team Solarium, leveraging business analytics to craft national-level business strategies and present award-winning plans.",
        image: "images/team-leadership.jpg"
    },
    {
        question: "Do you have 1 year of experience using SQL on large datasets?",
        answer: "✅ Yes — 2+ years of experience querying & optimizing large-scale datasets (1.8M+ rows) for dashboards & reporting.",
        image: "images/sql-database.jpg"
    },
    {
        question: "Do you have 1 year of experience automating data reports and quality reviews?",
        answer: "✅ Yes — Built automated reporting pipelines in Python, Power BI & SQL, reducing manual reporting time by 70%.",
        image: "images/automation.jpg"
    },
    {
        question: "Do you have 1 year of experience identifying business problems and proposing growth opportunities?",
        answer: "✅ Yes — Delivered insights via Power BI dashboards that helped executives cut operational costs by 18%.",
        image: "images/business-analytics.jpg"
    },
    {
        question: "Do you have 1 year of experience performing statistical analysis using Python or R?",
        answer: "✅ Yes — Applied NumPy, Pandas, Statsmodels & SciPy for regression analysis, forecasting & hypothesis testing.",
        image: "images/python-statistics.jpg"
    },
    {
        question: "Do you have 1 year of experience building dashboards and visualizations?",
        answer: "✅ Yes — Built interactive Power BI dashboards with YoY KPIs, predictive forecasting & advanced DAX measures.",
        image: "images/dashboards.jpg"
    },
    {
        question: "Are you willing to commute and/or relocate to Bellevue, WA?",
        answer: "✅ Yes — Open to relocation and flexible with hybrid/onsite roles.",
        image: "images/bellevue-wa.jpg"
    },
    {
        question: "Are you willing to travel domestically and internationally up to 15%?",
        answer: "✅ Yes — Comfortable with both domestic & international travel.",
        image: "images/travel.jpg"
    },
    {
        question: "Are you willing to accept a salary between $150,987 - $206,172?",
        answer: "✅ Yes — Open to discussion and focused on roles with growth potential.",
        image: "images/salary-growth.jpg"
    }
];

let currentIndex = 0;
let isAnswerShown = false;

// DOM elements
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const swipeArea = document.getElementById('swipeArea');
const swipeContainer = document.getElementById('swipeContainer');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const completion = document.getElementById('completion');

// Initialize app
function init() {
    console.log('Initializing TikTok Questionnaire...');
    console.log('Elements found:', {
        questionEl: !!questionEl,
        answerEl: !!answerEl,
        swipeArea: !!swipeArea,
        nextBtn: !!nextBtn,
        progressBar: !!progressBar,
        progressText: !!progressText
    });
    
    displayQuestion();
    setupSwipeDetection();
    updateProgress();
    
    console.log('Initialization complete!');
}

// Display current question
function displayQuestion() {
    if (currentIndex < qa.length) {
        questionEl.textContent = `Q${currentIndex + 1}: ${qa[currentIndex].question}`;
        answerEl.textContent = `Answer: ${qa[currentIndex].answer}`;
        
        // Reset answer visibility and background
        answerEl.classList.remove('show');
        answerEl.style.backgroundImage = '';
        
        // Reset swipe area visibility and state
        swipeArea.style.display = 'flex';
        swipeArea.style.opacity = '1';
        swipeArea.style.transform = '';
        swipeArea.classList.remove('swipe-success', 'swiping');
        
        // Hide next button
        nextBtn.style.display = 'none';
        
        // Reset answer state
        isAnswerShown = false;
    } else {
        showCompletion();
    }
}

// Show completion screen
function showCompletion() {
    document.querySelector('.question-container').style.display = 'none';
    completion.style.display = 'block';
    
    // Animate balloons
    const balloons = document.querySelector('.balloons');
    balloons.style.animation = 'float 1s ease-in-out infinite';
}

// Update progress bar
function updateProgress() {
    const progress = ((currentIndex + 1) / qa.length) * 100;
    progressBar.style.setProperty('--progress', `${progress}%`);
    progressText.textContent = `Question ${currentIndex + 1} of ${qa.length}`;
}

// Reveal answer with animation
function revealAnswer() {
    if (!isAnswerShown) {
        // Immediate feedback
        swipeArea.classList.add('swipe-success');
        
        // Hide swipe area and show answer immediately
        swipeArea.style.opacity = '0';
        swipeArea.style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            swipeArea.style.display = 'none';
            answerEl.classList.add('show');
            
            // Set background image for the answer
            if (qa[currentIndex].image) {
                answerEl.style.backgroundImage = `url('${qa[currentIndex].image}')`;
            }
            
            nextBtn.style.display = 'block';
            isAnswerShown = true;
        }, 200);
        
        // Remove success animation class
        setTimeout(() => {
            swipeArea.classList.remove('swipe-success');
        }, 300);
    }
}

// Setup swipe detection
function setupSwipeDetection() {
    let startY = 0;
    let startTime = 0;
    let isDragging = false;

    // Touch events for mobile
    swipeArea.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startTime = Date.now();
        isDragging = true;
        swipeArea.classList.add('swiping');
    });

    swipeArea.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const currentY = e.touches[0].clientY;
        const distance = startY - currentY;
        
        // Visual feedback during swipe
        if (distance > 0) {
            const progress = Math.min(distance / 100, 1);
            swipeArea.style.transform = `translateY(-${distance * 0.3}px)`;
            swipeArea.style.opacity = 1 - (progress * 0.3);
        }
    });

    swipeArea.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endY = e.changedTouches[0].clientY;
        const timeDiff = Date.now() - startTime;
        const distance = startY - endY;
        
        swipeArea.classList.remove('swiping');
        swipeArea.style.transform = '';
        swipeArea.style.opacity = '';
        isDragging = false;
        
        // Check if it's a valid swipe up
        if (distance > 50 && timeDiff < 1000) {
            revealAnswer();
        }
    });

    // Mouse events for desktop
    swipeArea.addEventListener('mousedown', (e) => {
        startY = e.clientY;
        startTime = Date.now();
        isDragging = true;
        swipeArea.classList.add('swiping');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const currentY = e.clientY;
        const distance = startY - currentY;
        
        // Visual feedback during drag
        if (distance > 0) {
            const progress = Math.min(distance / 100, 1);
            swipeArea.style.transform = `translateY(-${distance * 0.3}px)`;
            swipeArea.style.opacity = 1 - (progress * 0.3);
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        const endY = e.clientY;
        const timeDiff = Date.now() - startTime;
        const distance = startY - endY;
        
        swipeArea.classList.remove('swiping');
        swipeArea.style.transform = '';
        swipeArea.style.opacity = '';
        isDragging = false;
        
        // Check if it's a valid swipe up
        if (distance > 30 && timeDiff < 1000) {
            revealAnswer();
        }
    });

    // Click fallback - single click reveals answer
    swipeArea.addEventListener('click', (e) => {
        e.preventDefault();
        revealAnswer();
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        displayQuestion();
        updateProgress();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === ' ') {
        e.preventDefault();
        if (!isAnswerShown) {
            revealAnswer();
        }
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (isAnswerShown && currentIndex < qa.length) {
            currentIndex++;
            displayQuestion();
            updateProgress();
        }
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);
