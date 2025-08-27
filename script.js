const qa = [
    {
        question: "Do you have a Master's degree or foreign equivalent degree in Computer Science, Engineering, Data Science, Analytics, Business or related field?",
        answer: "✅ Yes — I hold a Master's in Data Science & Business Analytics (GPA: 3.9/4.0), specializing in BI dashboards, data analysis, ML & statistical analysis.",
        image: "images/masters-degree.jpg"
    },
    {
        question: "If yes, do you have 1 year of related work experience?",
        answer: "✅ Yes — Recent work as a Data Analyst at Prompt LLC, building a real-time Gunshot Detection & Analytics Dashboard System.",
        image: "images/work-experience.jpg"
    },
    {
        question: "Do you have a Bachelor's degree or foreign equivalent?",
        answer: "✅ Yes — Bachelor's in Mechanical Engineering (GPA 3.87/4.0). Specializing in design optimization and engineering management",
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
        answer: "✅ Yes — Automated reporting pipelines using Python, SQL and Power BI and leveraged Microsoft Power Automate to schedule refreshes, distribute dashboards and trigger email alerts, ensuring data accuracy and efficiency.",
        image: "images/automation.jpg"
    },
    {
        question: "Do you have 1 year of experience identifying business problems and proposing growth opportunities?",
        answer: "✅ Yes — Delivered insights via Excel and Power BI that helped optimize operational costs by 18%.",
        image: "images/business-analytics.jpg"
    },
    {
        question: "Do you have 1 year of experience performing statistical analysis using Python or R?",
        answer: "✅ Yes — Applied NumPy, Pandas, Statsmodels & SciPy for sales forecast and real estate price prediction",
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
let likedQuestions = new Set(); // Track which questions have been liked
let questionComments = {}; // Store comments for each question

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
        
        // Reset main container background
        const mainContainer = document.querySelector('.main-container');
        mainContainer.style.backgroundImage = '';
        mainContainer.classList.remove('answer-background');
        
        // Reset swipe area visibility and state
        swipeArea.style.display = 'flex';
        swipeArea.style.opacity = '1';
        swipeArea.style.transform = '';
        swipeArea.classList.remove('swipe-success', 'swiping');
        
        // Show next button (now always visible)
        nextBtn.style.display = 'block';
        nextBtn.textContent = 'Skip Question ⏭️';
        
        // Update like button state
        updateLikeButtonState();
        
        // Update comment button state
        updateCommentButtonState();
        
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
    // Ensure we don't show progress beyond the total number of questions
    const currentQuestion = Math.min(currentIndex + 1, qa.length);
    const progress = (currentQuestion / qa.length) * 100;
    progressBar.style.setProperty('--progress', `${progress}%`);
    progressText.textContent = `Question ${currentQuestion} of ${qa.length}`;
}

// Go to previous question
function goToPreviousQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        displayQuestion();
        updateProgress();
    }
}

// Update like button state based on current question
function updateLikeButtonState() {
    const likeBtn = document.querySelector('.side-btn');
    if (likedQuestions.has(currentIndex)) {
        likeBtn.classList.add('liked');
    } else {
        likeBtn.classList.remove('liked');
    }
}

// Handle like button click
function handleLikeClick() {
    const likeBtn = document.querySelector('.side-btn');
    
    if (likedQuestions.has(currentIndex)) {
        // Unlike the question
        likedQuestions.delete(currentIndex);
        likeBtn.classList.remove('liked');
        console.log(`Unliked question ${currentIndex + 1}`);
    } else {
        // Like the question
        likedQuestions.add(currentIndex);
        likeBtn.classList.add('liked');
        console.log(`Liked question ${currentIndex + 1}`);
    }
}

// Handle share button click
function handleShareClick() {
    const shareUrl = 'https://sakettommundrum.me/Tiktok-Questionnaire/';
    
    // Try to use the modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(shareUrl).then(() => {
            showShareFeedback('Link copied to clipboard! 📋');
        }).catch(() => {
            fallbackCopyToClipboard(shareUrl);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopyToClipboard(shareUrl);
    }
}

// Fallback copy method
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showShareFeedback('Link copied to clipboard! 📋');
    } catch (err) {
        showShareFeedback('Please copy manually: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// Show share feedback
function showShareFeedback(message) {
    const shareBtn = document.querySelectorAll('.side-btn')[2]; // Third button (share)
    const originalContent = shareBtn.innerHTML;
    
    shareBtn.innerHTML = '✅';
    shareBtn.style.background = 'rgba(0, 242, 234, 0.9)';
    
    // Create temporary message
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: absolute;
        right: 80px;
        bottom: 180px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 15px;
        font-size: 14px;
        z-index: 1000;
        white-space: nowrap;
        animation: fadeInOut 3s ease;
    `;
    
    document.querySelector('.main-container').appendChild(messageEl);
    
    // Reset button after 2 seconds
    setTimeout(() => {
        shareBtn.innerHTML = originalContent;
        shareBtn.style.background = '';
        if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
        }
    }, 2000);
}

// Handle comment button click
function handleCommentClick() {
    const currentComment = questionComments[currentIndex] || '';
    const newComment = prompt(`Add a comment for Question ${currentIndex + 1}:`, currentComment);
    
    if (newComment !== null) { // User didn't cancel
        if (newComment.trim() === '') {
            // Remove comment if empty
            delete questionComments[currentIndex];
            updateCommentButtonState();
            console.log(`Removed comment for question ${currentIndex + 1}`);
        } else {
            // Save comment
            questionComments[currentIndex] = newComment.trim();
            updateCommentButtonState();
            console.log(`Added comment for question ${currentIndex + 1}:`, newComment.trim());
        }
    }
}

// Update comment button state based on whether current question has comments
function updateCommentButtonState() {
    const commentBtn = document.querySelectorAll('.side-btn')[1]; // Second button (comment)
    if (questionComments[currentIndex]) {
        commentBtn.classList.add('has-comment');
    } else {
        commentBtn.classList.remove('has-comment');
    }
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
            
            // Set background image for the entire phone container
            const mainContainer = document.querySelector('.main-container');
            if (qa[currentIndex].image) {
                mainContainer.style.backgroundImage = `url('${qa[currentIndex].image}')`;
                mainContainer.style.backgroundSize = 'cover';
                mainContainer.style.backgroundPosition = 'center';
                mainContainer.classList.add('answer-background');
            }
            
            nextBtn.style.display = 'block';
            nextBtn.textContent = 'Next Question ➡️';
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
        
        // Visual feedback during swipe (both up and down)
        if (distance > 0) {
            // Swipe up feedback
            const progress = Math.min(distance / 100, 1);
            swipeArea.style.transform = `translateY(-${distance * 0.3}px)`;
            swipeArea.style.opacity = 1 - (progress * 0.3);
        } else if (distance < 0) {
            // Swipe down feedback
            const progress = Math.min(Math.abs(distance) / 100, 1);
            swipeArea.style.transform = `translateY(${Math.abs(distance) * 0.3}px)`;
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
        
        // Check if it's a valid swipe up (reveal answer)
        if (distance > 50 && timeDiff < 1000) {
            revealAnswer();
        }
        // Check if it's a valid swipe down (previous question)
        else if (distance < -50 && timeDiff < 1000) {
            goToPreviousQuestion();
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
        
        // Visual feedback during drag (both up and down)
        if (distance > 0) {
            // Drag up feedback
            const progress = Math.min(distance / 100, 1);
            swipeArea.style.transform = `translateY(-${distance * 0.3}px)`;
            swipeArea.style.opacity = 1 - (progress * 0.3);
        } else if (distance < 0) {
            // Drag down feedback
            const progress = Math.min(Math.abs(distance) / 100, 1);
            swipeArea.style.transform = `translateY(${Math.abs(distance) * 0.3}px)`;
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
        
        // Check if it's a valid swipe up (reveal answer)
        if (distance > 30 && timeDiff < 1000) {
            revealAnswer();
        }
        // Check if it's a valid swipe down (previous question)
        else if (distance < -30 && timeDiff < 1000) {
            goToPreviousQuestion();
        }
    });

    // Click fallback - single click reveals answer
    swipeArea.addEventListener('click', (e) => {
        e.preventDefault();
        revealAnswer();
    });

    // Next button
    nextBtn.addEventListener('click', (e) => {
        console.log('Next button clicked!', { currentIndex, isAnswerShown });
        e.preventDefault();
        e.stopPropagation();
        
        currentIndex++;
        
        // Only update progress if we haven't completed all questions
        if (currentIndex < qa.length) {
            displayQuestion();
            updateProgress();
            nextBtn.textContent = isAnswerShown ? 'Next Question ➡️' : 'Skip Question ⏭️';
        } else {
            // Show completion screen
            showCompletion();
        }
    });
    
    // Backup click handler for debugging
    nextBtn.addEventListener('mousedown', (e) => {
        console.log('Next button mousedown detected');
    });
    
    nextBtn.addEventListener('touchstart', (e) => {
        console.log('Next button touchstart detected');
    });
    
    // Side button functionality
    const sideButtons = document.querySelectorAll('.side-btn');
    
    // Like button (first button)
    sideButtons[0].addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleLikeClick();
    });
    
    // Comment button (second button)
    sideButtons[1].addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleCommentClick();
    });
    
    // Share button (third button)
    sideButtons[2].addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleShareClick();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === ' ') {
        e.preventDefault();
        if (!isAnswerShown) {
            revealAnswer();
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        goToPreviousQuestion();
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (isAnswerShown && currentIndex < qa.length - 1) {
            currentIndex++;
            displayQuestion();
            updateProgress();
        } else if (isAnswerShown && currentIndex === qa.length - 1) {
            currentIndex++;
            showCompletion();
        }
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPreviousQuestion();
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);
