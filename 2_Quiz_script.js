
<>
    <div class="container">
        <h1>JavaScript Event Handling Quiz</h1>
        <p class="description">Test your knowledge of JavaScript event handling and interact with the demo area to see events in action!</p>
        
        <div class="progress-bar">
            <div class="progress" id="progress"></div>
        </div>
        
        <div class="quiz-container" id="quiz-container">
            <div class="question" id="question"></div>
            <div class="options" id="options"></div>
            
            <div class="controls">
                <button id="prev-btn">Previous</button>
                <button id="next-btn">Next</button>
                <button id="submit-btn">Submit Quiz</button>
            </div>
        </div>
        
        <div class="score-container" id="score-container">
            <h2>Quiz Completed!</h2>
            <p>Your score: <span id="score"></span>/<span id="total-questions"></span></p>
            <button id="restart-btn">Restart Quiz</button>
        </div>
        
        <div class="event-demo">
            <h3>Event Handling Demo</h3>
            <p>Try these interactive demos to see JavaScript events in action:</p>
            
            <div class="demo-buttons">
                <button class="demo-btn" id="click-btn">Click Event</button>
                <button class="demo-btn" id="dblclick-btn">Double Click Event</button>
                <button class="demo-btn" id="mouseover-btn">Mouseover Event</button>
                <button class="demo-btn" id="keypress-btn">Keypress Event</button>
            </div>
            
            <div class="demo-output" id="demo-output">
                Output will appear here. Try the buttons above!
            </div>
            
            <div class="keypress-box" id="keypress-box">
                Click here and type to see keypress events...
            </div>
        </div>
    </div>

    <script>
        // Quiz questions
        const questions = [
            {
                question: "Which method is used to attach an event handler in JavaScript?",
                options: [
                    "addEventListener()",
                    "attachEvent()",
                    "registerEvent()",
                    "bindEvent()"
                ],
                correct: 0
            },
            {
                question: "Which event is triggered when a user clicks on an element?",
                options: [
                    "onhover",
                    "onclick",
                    "onpress",
                    "onselect"
                ],
                correct: 1
            },
            {
                question: "Which of these is NOT a valid event type in JavaScript?",
                options: [
                    "keydown",
                    "mouseenter",
                    "scroll",
                    "elementclick"
                ],
                correct: 3
            },
            {
                question: "How can you prevent the default behavior of an event?",
                options: [
                    "event.stop()",
                    "event.preventDefault()",
                    "event.cancel()",
                    "event.halt()"
                ],
                correct: 1
            },
            {
                question: "Which event occurs when a user presses a key on the keyboard?",
                options: [
                    "onkeypress",
                    "onkeydown",
                    "Both A and B",
                    "onkeyup"
                ],
                correct: 2
            }
        ];

        // DOM elements
        const quizContainer = document.getElementById('quiz-container');
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        const restartBtn = document.getElementById('restart-btn');
        const scoreContainer = document.getElementById('score-container');
        const scoreEl = document.getElementById('score');
        const totalQuestionsEl = document.getElementById('total-questions');
        const progressEl = document.getElementById('progress');
        
        // Demo elements
        const demoOutput = document.getElementById('demo-output');
        const keypressBox = document.getElementById('keypress-box');
        const clickBtn = document.getElementById('click-btn');
        const dblclickBtn = document.getElementById('dblclick-btn');
        const mouseoverBtn = document.getElementById('mouseover-btn');
        const keypressBtn = document.getElementById('keypress-btn');

        // Quiz state
        let currentQuestion = 0;
        let score = 0;
        let userAnswers = new Array(questions.length).fill(null);

        // Initialize the quiz
        function initQuiz() {
            showQuestion(currentQuestion);
            updateProgress();
            
            // Event listeners for navigation
            prevBtn.addEventListener('click', goToPreviousQuestion);
            nextBtn.addEventListener('click', goToNextQuestion);
            submitBtn.addEventListener('click', submitQuiz);
            restartBtn.addEventListener('click', restartQuiz);
            
            // Demo event listeners
            setupDemoEvents();
        }

        // Display a question
        function showQuestion(index) {
            const question = questions[index];
            questionEl.textContent = question.question;
            
            optionsEl.innerHTML = '';
            question.options.forEach((option, i) => {
                const optionEl = document.createElement('div');
                optionEl.classList.add('option');
                if (userAnswers[index] === i) {
                    optionEl.classList.add('selected');
                }
                optionEl.textContent = option;
                optionEl.dataset.index = i;
                optionEl.addEventListener('click', selectOption);
                optionsEl.appendChild(optionEl);
            });
            
            // Update navigation buttons
            prevBtn.style.display = index === 0 ? 'none' : 'block';
            nextBtn.style.display = index === questions.length - 1 ? 'none' : 'block';
            submitBtn.style.display = index === questions.length - 1 ? 'block' : 'none';
        }

        // Select an option
        function selectOption(e) {
            const selectedOption = e.target;
            const optionIndex = parseInt(selectedOption.dataset.index);
            
            // Remove selected class from all options
            document.querySelectorAll('.option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            selectedOption.classList.add('selected');
            
            // Save user's answer
            userAnswers[currentQuestion] = optionIndex;
        }

        // Go to the next question
        function goToNextQuestion() {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
                updateProgress();
            }
        }

        // Go to the previous question
        function goToPreviousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion(currentQuestion);
                updateProgress();
            }
        }

        // Update progress bar
        function updateProgress() {
            const progress = ((currentQuestion + 1) / questions.length) * 100;
            progressEl.style.width = `${progress}%`;
        }

        // Submit the quiz
        function submitQuiz() {
            // Calculate score
            score = 0;
            userAnswers.forEach((answer, index) => {
                if (answer === questions[index].correct) {
                    score++;
                }
            });
            
            // Display score
            scoreEl.textContent = score;
            totalQuestionsEl.textContent = questions.length;
            
            // Hide quiz and show score
            quizContainer.style.display = 'none';
            scoreContainer.style.display = 'block';
        }

        // Restart the quiz
        function restartQuiz() {
            currentQuestion = 0;
            score = 0;
            userAnswers = new Array(questions.length).fill(null);
            
            // Show quiz and hide score
            quizContainer.style.display = 'block';
            scoreContainer.style.display = 'none';
            
            // Reset progress and show first question
            showQuestion(currentQuestion);
            updateProgress();
        }

        // Setup demo event listeners
        function setupDemoEvents() {
            // Click event
            clickBtn.addEventListener('click', () => {
                demoOutput.innerHTML = `<p><span class="highlight">Click event</span> detected! This is the most common event type.</p>`;
                demoOutput.style.backgroundColor = '#fff3bf';
                setTimeout(() => {
                    demoOutput.style.backgroundColor = '#f8f9fa';
                }, 500);
            });
            
            // Double click event
            dblclickBtn.addEventListener('dblclick', () => {
                demoOutput.innerHTML = `<p><span class="highlight">Double click event</span> detected! You double-clicked the button.</p>`;
                demoOutput.style.backgroundColor = '#d3f9d8';
                setTimeout(() => {
                    demoOutput.style.backgroundColor = '#f8f9fa';
                }, 500);
            });
            
            // Mouseover event
            mouseoverBtn.addEventListener('mouseover', () => {
                demoOutput.innerHTML = `<p><span class="highlight">Mouseover event</span> detected! You hovered over the button.</p>`;
                demoOutput.style.backgroundColor = '#ffec99';
            });
            
            // Keypress event
            keypressBtn.addEventListener('click', () => {
                demoOutput.innerHTML = `<p>Click inside the box below and type to see <span class="highlight">keypress events</span> in action.</p>`;
            });
            
            // Keypress box events
            keypressBox.addEventListener('focus', () => {
                keypressBox.style.borderColor = '#40c057';
                keypressBox.innerHTML = 'Listening for keypress events...';
            });
            
            keypressBox.addEventListener('blur', () => {
                keypressBox.style.borderColor = '#4c6ef5';
                keypressBox.innerHTML = 'Click here and type to see keypress events...';
            });
            
            keypressBox.addEventListener('keydown', (e) => {
                keypressBox.innerHTML = `
                    <p><strong>Keydown event:</strong> Key code: ${e.keyCode}, Key: "${e.key}"</p>
                    <p>Try pressing different keys to see the event data.</p>
                `;
            });
        }

        // Initialize the quiz when the page loads
        window.addEventListener('load', initQuiz);
    </script>
    <></>