export const ASSESSMENT_QUESTIONS = [
  {
    id: 'goal',
    title: 'What is your primary goal right now?',
    subtitle: 'This helps our AI personalize your sprint roadmap',
    options: [
      { id: 'tech_job', label: 'Land a job in Tech / Software', icon: 'code-working', trackIds: ['track-coding', 'track-data'] },
      { id: 'leadership', label: 'Improve Leadership & Communication', icon: 'mic', trackIds: ['track-speaking', 'track-critical'] },
      { id: 'career_boost', label: 'Accelerate My Current Career', icon: 'trending-up', trackIds: ['track-career', 'track-marketing'] },
      { id: 'analytical_skills', label: 'Master Data & Critical Decision Making', icon: 'analytics', trackIds: ['track-data', 'track-critical'] },
    ],
  },
  {
    id: 'current_level',
    title: 'How would you rate your current technical & analytical background?',
    subtitle: 'We calibrate module difficulty to match your baseline',
    options: [
      { id: 'beginner', label: 'Beginner — Ready to start from scratch', icon: 'leaf-outline', level: 'Beginner' },
      { id: 'intermediate', label: 'Intermediate — Some experience, want structured mastery', icon: 'rocket-outline', level: 'Intermediate' },
      { id: 'advanced', label: 'Advanced — Looking for high-impact edge & speed', icon: 'flash-outline', level: 'Advanced' },
    ],
  },
  {
    id: 'daily_time',
    title: 'How much time can you commit each day?',
    subtitle: 'Consistency beats intensity! Short sprints build permanent habits.',
    options: [
      { id: '5min', label: '5 minutes / day — Quick Micro Sprints', minutes: 5 },
      { id: '15min', label: '15 minutes / day — Recommended Pace', minutes: 15 },
      { id: '30min', label: '30+ minutes / day — Power Learner Sprint', minutes: 30 },
    ],
  },
  {
    id: 'learning_style',
    title: 'How do you learn best?',
    subtitle: 'SkillSprint adapts quizzes, visual cards, and code snippets accordingly',
    options: [
      { id: 'interactive_quiz', label: 'Interactive Quizzes & Instant Feedback', icon: 'checkbox-outline' },
      { id: 'bite_sized', label: 'Short Bite-Sized Concept Cards', icon: 'book-outline' },
      { id: 'scenario_based', label: 'Real-world Case Scenarios & Challenges', icon: 'bulb-outline' },
    ],
  },
  {
    id: 'top_focus',
    title: 'Which key domain excites you the most?',
    subtitle: 'Pick your cornerstone skill track to kick off',
    options: [
      { id: 'coding', label: 'Coding Fundamentals & Web Dev', icon: 'laptop-outline', trackId: 'track-coding' },
      { id: 'data', label: 'Data Analytics & AI Thinking', icon: 'pie-chart-outline', trackId: 'track-data' },
      { id: 'speaking', label: 'Public Speaking & Executive Presence', icon: 'megaphone-outline', trackId: 'track-speaking' },
      { id: 'marketing', label: 'Digital Marketing & Growth', icon: 'globe-outline', trackId: 'track-marketing' },
      { id: 'career', label: 'Career Readiness & Interview Mastery', icon: 'briefcase-outline', trackId: 'track-career' },
      { id: 'critical', label: 'Critical Thinking & Mental Models', icon: 'extension-puzzle-outline', trackId: 'track-critical' },
    ],
  },
];

export const SKILL_TRACKS = [
  {
    id: 'track-coding',
    title: 'Coding Fundamentals',
    category: 'Technology',
    description: 'Master core programming logic, algorithms, modern web development concepts, and clean coding practices.',
    iconName: 'code-slash',
    iconLibrary: 'Ionicons',
    color: '#4F46E5', // Indigo
    totalModules: 6,
    totalXP: 950,
    difficulty: 'Beginner to Intermediate',
    estimatedHours: '4.5 hrs',
    enrolledCount: 14200,
    rating: 4.9,
    modules: [
      {
        id: 'mod-code-1',
        trackId: 'track-coding',
        title: 'Variables, Types & Memory',
        order: 1,
        estimatedMinutes: 8,
        xpReward: 150,
        summary: 'Understand how computers store information, primitive data types, and immutable vs mutable states.',
        contentSections: [
          {
            heading: '1. What is a Variable?',
            body: 'Think of a variable as a labeled storage box in the computer\'s RAM memory. When you write `let userAge = 21;`, the program reserves space, tags it with `userAge`, and stores the binary representation of `21`.',
            codeSnippet: '// Modern JavaScript Variable Declaration\nlet userStreak = 7;\nconst appName = "SkillSprint";\nlet isEnrolled = true;\n\nconsole.log(`${appName}: ${userStreak} day streak!`);',
          },
          {
            heading: '2. Primitive vs Reference Types',
            body: 'Primitives (numbers, strings, booleans) store raw values directly. Reference types (arrays, objects) store memory addresses pointing to the data location.',
            tip: 'Always use `const` by default, and only use `let` when you specifically intend to reassign the value later.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which keyword should be used for variables that should NEVER be reassigned?',
            options: ['var', 'let', 'const', 'static'],
            correctIndex: 2,
            explanation: '`const` defines a block-scoped identifier that cannot be reassigned once initialized.',
          },
          {
            id: 'q2',
            question: 'What is the data type of the expression `42 === "42"` in JavaScript?',
            options: ['Boolean (false)', 'Boolean (true)', 'Number (0)', 'String ("false")'],
            correctIndex: 0,
            explanation: 'Strict equality `===` checks both value and type. A Number is not strictly equal to a String, evaluating to false.',
          },
          {
            id: 'q3',
            question: 'Where do primitive variables hold their values during runtime execution?',
            options: ['On the Call Stack', 'In permanent SSD storage', 'In the DOM tree', 'In the CSS Engine'],
            correctIndex: 0,
            explanation: 'Primitive types in modern JavaScript runtimes are allocated directly in stack memory for ultra-fast access.',
          },
        ],
      },
      {
        id: 'mod-code-2',
        trackId: 'track-coding',
        title: 'Control Flow & Logic Trees',
        order: 2,
        estimatedMinutes: 10,
        xpReward: 160,
        summary: 'Master if/else branching, ternary expressions, switch cases, and truthy/falsy logic.',
        contentSections: [
          {
            heading: 'Conditional Execution',
            body: 'Control flow structures dictate which branches of code execute depending on real-time runtime conditions.',
            codeSnippet: 'function calculateBadge(xp) {\n  if (xp >= 1000) return "Master";\n  if (xp >= 500) return "Expert";\n  return "Apprentice";\n}',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which of the following values is FALSY in JavaScript?',
            options: ['"0"', '[]', '0', '{}'],
            correctIndex: 2,
            explanation: 'The number 0 is falsy, whereas non-empty strings, empty arrays, and objects are all truthy.',
          },
          {
            id: 'q2',
            question: 'What does the nullish coalescing operator `??` check for?',
            options: ['Checks only for null or undefined', 'Checks for all falsy values', 'Checks for type equality', 'Checks for array length'],
            correctIndex: 0,
            explanation: '`a ?? b` returns `b` only if `a` is strictly `null` or `undefined`, preserving `0` or `""`.',
          },
        ],
      },
      {
        id: 'mod-code-3',
        trackId: 'track-coding',
        title: 'Functions & First-Class Citizens',
        order: 3,
        estimatedMinutes: 10,
        xpReward: 160,
        summary: 'Arrow functions, parameters, pure functions, closures, and higher-order array methods.',
        contentSections: [
          {
            heading: 'Higher-Order Functions',
            body: 'In JavaScript, functions can be passed as arguments, returned from other functions, and assigned to variables.',
            codeSnippet: 'const numbers = [10, 20, 30];\nconst doubled = numbers.map(n => n * 2); // [20, 40, 60]\nconst totalXP = numbers.reduce((acc, curr) => acc + curr, 0);',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which array method transforms every element into a new array without mutating the original?',
            options: ['map()', 'forEach()', 'push()', 'splice()'],
            correctIndex: 0,
            explanation: '`map()` produces a brand new array containing the results of calling a function on each element.',
          },
        ],
      },
      {
        id: 'mod-code-4',
        trackId: 'track-coding',
        title: 'Data Structures: Arrays & Hash Maps',
        order: 4,
        estimatedMinutes: 12,
        xpReward: 160,
        summary: 'Explore time complexity (O(1) vs O(N)), Hash Maps, Sets, and key-value store optimization.',
        contentSections: [
          {
            heading: 'Why Hash Tables / Objects are O(1)',
            body: 'Hash tables use hash functions to compute indexes, allowing instant key lookup regardless of collection size.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the average time complexity of looking up a key in a JavaScript Map or Object?',
            options: ['O(1) Constant Time', 'O(N) Linear Time', 'O(N^2) Quadratic', 'O(log N)'],
            correctIndex: 0,
            explanation: 'Key lookups in hash tables execute in O(1) constant average time.',
          },
        ],
      },
      {
        id: 'mod-code-5',
        trackId: 'track-coding',
        title: 'Asynchronous Programming & APIs',
        order: 5,
        estimatedMinutes: 12,
        xpReward: 160,
        summary: 'Understand the JavaScript Event Loop, Promises, `async/await`, and REST HTTP fetch requests.',
        contentSections: [
          {
            heading: 'Handling Asynchronous Work',
            body: 'Modern asynchronous JavaScript utilizes Promises and `async/await` to handle network requests without freezing the UI.',
            codeSnippet: 'async function fetchTrackData(id) {\n  try {\n    const res = await fetch(`https://api.skillsprint.dev/tracks/${id}`);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error("Fetch failed", err);\n  }\n}',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What does `await` do when placed before a Promise?',
            options: [
              'Pauses the async function execution until the Promise settles',
              'Kills the browser thread immediately',
              'Converts the Promise into a synchronous while-loop',
              'Deletes the cached API response'
            ],
            correctIndex: 0,
            explanation: '`await` cleanly pauses execution inside the async function until the promise resolves or rejects.',
          },
        ],
      },
      {
        id: 'mod-code-6',
        trackId: 'track-coding',
        title: 'Clean Code & Debugging Techniques',
        order: 6,
        estimatedMinutes: 10,
        xpReward: 160,
        summary: 'Writing maintainable code, DRY principles, defensive programming, and debugging with DevTools.',
        contentSections: [
          {
            heading: 'The DRY Principle',
            body: 'Don\'t Repeat Yourself (DRY) means extracting recurring business logic into reusable, testable functions and modules.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What does the DRY software engineering principle stand for?',
            options: ['Don\'t Repeat Yourself', 'Do React Yourself', 'Data Reliability Yield', 'Dynamic Routing Yield'],
            correctIndex: 0,
            explanation: 'DRY stands for Don\'t Repeat Yourself, advocating minimal code duplication.',
          },
        ],
      },
    ],
  },
  {
    id: 'track-speaking',
    title: 'Public Speaking & Presentation',
    category: 'Communication',
    description: 'Conquer stage fright, craft compelling narratives, master vocal variety, and captivate any audience.',
    iconName: 'mic-outline',
    iconLibrary: 'Ionicons',
    color: '#EC4899', // Pink
    totalModules: 5,
    totalXP: 780,
    difficulty: 'All Levels',
    estimatedHours: '3.2 hrs',
    enrolledCount: 9800,
    rating: 4.8,
    modules: [
      {
        id: 'mod-spk-1',
        trackId: 'track-speaking',
        title: 'Overcoming Stage Anxiety & Biology',
        order: 1,
        estimatedMinutes: 8,
        xpReward: 150,
        summary: 'Reframe adrenaline from threat to excitement and master the physiological box-breathing reset.',
        contentSections: [
          {
            heading: 'The Adrenaline Reframe',
            body: 'Physiologically, excitement and anxiety produce the identical biological surge (elevated heart rate, cortisol). Instead of saying "I am nervous", tell yourself out loud: "I am excited to share this idea!"',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the proven physiological technique to quickly reduce speech heart rate spikes?',
            options: ['Box Breathing (4s in, 4s hold, 4s out, 4s hold)', 'Drinking high-caffeine energy drinks', 'Speaking 3x faster to finish early', 'Avoiding eye contact entirely'],
            correctIndex: 0,
            explanation: 'Box breathing stimulates the vagus nerve and activates the parasympathetic nervous system, lowering heart rate.',
          },
        ],
      },
      {
        id: 'mod-spk-2',
        trackId: 'track-speaking',
        title: 'The Hook & Story Spine Framework',
        order: 2,
        estimatedMinutes: 10,
        xpReward: 150,
        summary: 'Captivate the audience within the first 15 seconds with the classic Pixar Story Spine structure.',
        contentSections: [
          {
            heading: 'The 15-Second Rule',
            body: 'Never start with "Hi, my name is X and today I will talk about Y". Start with a startling statistic, a provocative question, or an in-media-res moment of conflict.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the most effective opening for a presentation?',
            options: ['A provocative question, startling stat, or narrative story', 'Reading the title slide verbatim', 'Apologizing for your slides', 'Listing your complete work history'],
            correctIndex: 0,
            explanation: 'Strong hooks activate listener curiosity and focus attention immediately.',
          },
        ],
      },
      {
        id: 'mod-spk-3',
        trackId: 'track-speaking',
        title: 'Vocal Variety & Strategic Pauses',
        order: 3,
        estimatedMinutes: 9,
        xpReward: 160,
        summary: 'Eliminate filler words ("um", "like", "you know") by converting hesitations into authoritative pauses.',
        contentSections: [
          {
            heading: 'The Power of the Pause',
            body: 'Great speakers replace filler words with deliberate 2-second silences. A pause conveys confidence and gives listeners time to process.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the best replacement for filler words like "um" and "ah"?',
            options: ['A silent 2-second deliberate pause', 'Talking faster', 'Coughing slightly', 'Looking at the floor'],
            correctIndex: 0,
            explanation: 'A silent pause projects immense composure and gives your brain time to form the next sentence.',
          },
        ],
      },
      {
        id: 'mod-spk-4',
        trackId: 'track-speaking',
        title: 'Slide Design: The 6x6 Rule',
        order: 4,
        estimatedMinutes: 8,
        xpReward: 160,
        summary: 'Design high-impact visual slides that support your words without clutter or bullet point overload.',
        contentSections: [
          {
            heading: 'Visual Superiority Effect',
            body: 'The audience can either read your slide or listen to you speak — they cannot do both simultaneously. Keep slides visual and headline-driven.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Why should slides avoid walls of dense bullet points?',
            options: [
              'Because audiences read ahead and stop listening to the speaker',
              'Because bullet points take too much disk space',
              'Because fonts look blurry on projectors',
              'Because software limits slides to 3 words'
            ],
            correctIndex: 0,
            explanation: 'Cognitive load limits mean human brains cannot parse simultaneous reading and active listening.',
          },
        ],
      },
      {
        id: 'mod-spk-5',
        trackId: 'track-speaking',
        title: 'Mastering Executive Q&A',
        order: 5,
        estimatedMinutes: 10,
        xpReward: 160,
        summary: 'Handle tough questions, hostile pushback, and uncertain answers with the PREP framework.',
        contentSections: [
          {
            heading: 'The PREP Framework',
            body: 'Point, Reason, Example, Point. Structure impromptu answers in under 45 seconds with rock-solid clarity.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What does PREP stand for in impromptu speaking?',
            options: ['Point, Reason, Example, Point', 'Prepare, Review, Execute, Pause', 'Plan, React, Explain, Pitch', 'Pitch, Reframe, Engage, Propose'],
            correctIndex: 0,
            explanation: 'PREP stands for Point -> Reason -> Example -> Point Restatement.',
          },
        ],
      },
    ],
  },
  {
    id: 'track-data',
    title: 'Data Literacy & Analytics',
    category: 'Data & AI',
    description: 'Transform raw numbers into actionable business intelligence using data thinking, SQL, and visualizations.',
    iconName: 'pie-chart-outline',
    iconLibrary: 'Ionicons',
    color: '#0284C7', // Sky blue
    totalModules: 5,
    totalXP: 820,
    difficulty: 'Intermediate',
    estimatedHours: '3.8 hrs',
    enrolledCount: 11500,
    rating: 4.9,
    modules: [
      {
        id: 'mod-data-1',
        trackId: 'track-data',
        title: 'Data Thinking & Metric Frameworks',
        order: 1,
        estimatedMinutes: 9,
        xpReward: 160,
        summary: 'Understand the difference between Vanity Metrics and North Star Actionable Metrics.',
        contentSections: [
          {
            heading: 'North Star vs Vanity Metrics',
            body: 'Vanity metrics (e.g. total app downloads) look flattering on paper but do not correlate with sustainable value. North Star metrics (e.g. Daily Active Users completing 1 sprint) represent genuine retention.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which of the following is an actionable retention metric rather than a vanity metric?',
            options: [
              '7-Day Active User Retention Rate',
              'Cumulative page impressions over 5 years',
              'Total newsletter signups from a giveaway',
              'Social media follower count'
            ],
            correctIndex: 0,
            explanation: 'Cohort retention rate directly measures recurring user value and product health.',
          },
        ],
      },
      {
        id: 'mod-data-2',
        trackId: 'track-data',
        title: 'Data Visualization & Chart Selection',
        order: 2,
        estimatedMinutes: 10,
        xpReward: 160,
        summary: 'Pick the right chart type: Bar vs Line vs Scatter vs Heatmap to avoid misleading visual artifacts.',
        contentSections: [
          {
            heading: 'Choosing the Right Chart',
            body: 'Line charts excel at showing trends over continuous time. Bar charts excel at discrete category comparisons. Scatter plots reveal correlations between two continuous variables.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which chart type is best for showing monthly revenue growth over the past 3 years?',
            options: ['Line Chart', 'Pie Chart', 'Radar Chart', 'Word Cloud'],
            correctIndex: 0,
            explanation: 'Line charts are the standard visual medium for continuous chronological time-series trends.',
          },
        ],
      },
      {
        id: 'mod-data-3',
        trackId: 'track-data',
        title: 'SQL Fundamentals: Queries & Joins',
        order: 3,
        estimatedMinutes: 12,
        xpReward: 170,
        summary: 'Write SELECT, WHERE, GROUP BY, and understand INNER vs LEFT JOIN query mechanics.',
        contentSections: [
          {
            heading: 'SQL Query Order of Execution',
            body: 'Although you write SELECT first, relational database engines execute in order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which clause filters rows BEFORE aggregate functions like COUNT() or SUM() are computed?',
            options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
            correctIndex: 0,
            explanation: '`WHERE` filters raw rows before aggregation, whereas `HAVING` filters aggregated grouped results.',
          },
        ],
      },
      {
        id: 'mod-data-4',
        trackId: 'track-data',
        title: 'A/B Testing & Statistical Significance',
        order: 4,
        estimatedMinutes: 11,
        xpReward: 165,
        summary: 'Formulate hypotheses, calculate sample sizes, understand p-values and false positive risks.',
        contentSections: [
          {
            heading: 'What is a P-Value?',
            body: 'A p-value measures the probability of observing test results at least as extreme as the current data, assuming the null hypothesis (no real effect) is true. Typically, p < 0.05 is deemed statistically significant.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What does a p-value below 0.05 generally indicate in an A/B experiment?',
            options: [
              'The observed difference is unlikely to have occurred purely by random chance',
              'The experiment had zero errors',
              '100% of future users will convert',
              'The sample size was too small'
            ],
            correctIndex: 0,
            explanation: 'p < 0.05 indicates statistical significance, making random chance a very unlikely explanation.',
          },
        ],
      },
      {
        id: 'mod-data-5',
        trackId: 'track-data',
        title: 'AI & Machine Learning Concepts for Decision Makers',
        order: 5,
        estimatedMinutes: 10,
        xpReward: 165,
        summary: 'Demystify Supervised vs Unsupervised learning, LLMs, prompt engineering, and model evaluation.',
        contentSections: [
          {
            heading: 'The ML Spectrum',
            body: 'Supervised learning trains on labeled input-output pairs. Unsupervised learning discovers hidden patterns in unlabeled data. Generative AI creates novel synthetic tokens based on probabilistic neural architectures.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which machine learning paradigm uses labeled historical data with ground-truth target outputs?',
            options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement without rewards', 'Random Walk Clustering'],
            correctIndex: 0,
            explanation: 'Supervised learning relies on paired feature-label datasets for regression and classification tasks.',
          },
        ],
      },
    ],
  },
  {
    id: 'track-critical',
    title: 'Critical Thinking & Problem Solving',
    category: 'Cognitive Skills',
    description: 'Sharpen your mental models, deconstruct cognitive biases, and solve high-stakes challenges from first principles.',
    iconName: 'extension-puzzle-outline',
    iconLibrary: 'Ionicons',
    color: '#8B5CF6', // Purple
    totalModules: 5,
    totalXP: 750,
    difficulty: 'All Levels',
    estimatedHours: '3.0 hrs',
    enrolledCount: 8400,
    rating: 4.9,
    modules: [
      {
        id: 'mod-crit-1',
        trackId: 'track-critical',
        title: 'First-Principles Reasoning',
        order: 1,
        estimatedMinutes: 8,
        xpReward: 150,
        summary: 'Break complex problems down to fundamental truths rather than reasoning by analogy.',
        contentSections: [
          {
            heading: 'Analogy vs First Principles',
            body: 'Reasoning by analogy means copying what others do with slight variations. First-principles thinking breaks things down to undeniable physical facts and builds upwards.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the core definition of First-Principles thinking?',
            options: [
              'Boiling a problem down to fundamental truths and reasoning upward from there',
              'Copying the market leader\'s solution exactly',
              'Accepting conventional wisdom without questioning',
              'Using only the first idea that comes to mind'
            ],
            correctIndex: 0,
            explanation: 'First-principles thinking deconstructs assumptions until you reach bedrock verifiable facts.',
          },
        ],
      },
      {
        id: 'mod-crit-2',
        trackId: 'track-critical',
        title: 'Cognitive Biases: Confirmation & Sunk Cost',
        order: 2,
        estimatedMinutes: 9,
        xpReward: 150,
        summary: 'Detect when your brain seeks only confirmatory evidence and learn to kill doomed projects early.',
        contentSections: [
          {
            heading: 'The Sunk Cost Fallacy',
            body: 'Past investments (time, money, effort) cannot be recovered and should never justify continuing an inefficient endeavor.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Continuing a failing strategy simply because you have already spent $10,000 on it is an example of:',
            options: ['Sunk Cost Fallacy', 'Occam\'s Razor', 'Pareto Principle', 'Hedonic Adaptation'],
            correctIndex: 0,
            explanation: 'The Sunk Cost Fallacy causes people to persist based on past unrecoverable investments.',
          },
        ],
      },
      {
        id: 'mod-crit-3',
        trackId: 'track-critical',
        title: 'Root Cause Analysis: The 5 Whys',
        order: 3,
        estimatedMinutes: 8,
        xpReward: 150,
        summary: 'Drill down past surface symptoms to discover systemic root triggers using the Toyota 5 Whys technique.',
        contentSections: [
          {
            heading: 'The 5 Whys Method',
            body: 'Ask "Why did this occur?" five times consecutively to uncover underlying process failures rather than blaming individuals.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the primary goal of the 5 Whys root cause framework?',
            options: ['Identify the underlying systemic defect', 'Assign blame to a specific employee', 'Create 5 different tasks', 'Delay fixing the issue'],
            correctIndex: 0,
            explanation: 'The 5 Whys method systematically unearths underlying process and architectural causes.',
          },
        ],
      },
      {
        id: 'mod-crit-4',
        trackId: 'track-critical',
        title: 'Decision Matrices & Expected Value',
        order: 4,
        estimatedMinutes: 10,
        xpReward: 150,
        summary: 'Quantify choices using probability-weighted expected values and multi-criteria weighted scoring.',
        contentSections: [
          {
            heading: 'Expected Value Calculation',
            body: '`Expected Value = (Probability of Outcome) * (Value of Outcome)`. Calculate trade-offs objectively when navigating risk.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'How do you calculate Expected Value (EV) for a probabilistic decision?',
            options: [
              'Multiply each outcome\'s probability by its payoff and sum them',
              'Pick the outcome with the highest single best-case payoff regardless of odds',
              'Average all possible outcomes equally',
              'Subtract costs from revenue'
            ],
            correctIndex: 0,
            explanation: 'Expected Value is the probability-weighted sum of all potential outcome values.',
          },
        ],
      },
      {
        id: 'mod-crit-5',
        trackId: 'track-critical',
        title: 'Second-Order Thinking',
        order: 5,
        estimatedMinutes: 9,
        xpReward: 150,
        summary: 'Ask "And then what?" to anticipate unintended consequences and long-term ripple effects.',
        contentSections: [
          {
            heading: 'First-Order vs Second-Order',
            body: 'First-order thinkers look for immediate, obvious consequences. Second-order thinkers consider the consequences of those consequences.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the core question driving second-order thinking?',
            options: ['"And then what happens next?"', '"Who will do the work?"', '"How cheap is this?"', '"Can we finish today?"'],
            correctIndex: 0,
            explanation: 'Asking "And then what?" forces you to model systemic cascading consequences.',
          },
        ],
      },
    ],
  },
  {
    id: 'track-marketing',
    title: 'Digital Marketing & Growth',
    category: 'Business & Growth',
    description: 'Learn modern customer acquisition, content funnels, paid performance marketing, and conversion optimization.',
    iconName: 'globe-outline',
    iconLibrary: 'Ionicons',
    color: '#10B981', // Emerald
    totalModules: 5,
    totalXP: 750,
    difficulty: 'Beginner to Intermediate',
    estimatedHours: '3.1 hrs',
    enrolledCount: 7600,
    rating: 4.7,
    modules: [
      {
        id: 'mod-mkt-1',
        trackId: 'track-marketing',
        title: 'Customer Personas & Ideal Customer Profile',
        order: 1,
        estimatedMinutes: 8,
        xpReward: 150,
        summary: 'Define buyer pain points, psychographics, trigger events, and positioning statements.',
        contentSections: [
          {
            heading: 'Building ICPs',
            body: 'An Ideal Customer Profile defines the exact characteristics of the user segment that derives the fastest value from your product.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the key difference between demographic and psychographic targeting?',
            options: [
              'Demographics measure static attributes (age, location); Psychographics measure beliefs, values, and motivations',
              'Demographics are only for B2B; Psychographics are for B2C',
              'They are completely identical terms',
              'Psychographics only track website click counts'
            ],
            correctIndex: 0,
            explanation: 'Psychographics reveal underlying emotional drivers and belief systems that motivate purchases.',
          },
        ],
      },
      {
        id: 'mod-mkt-2',
        trackId: 'track-marketing',
        title: 'The Acquisition Funnel: AARRR Pirate Metrics',
        order: 2,
        estimatedMinutes: 10,
        xpReward: 150,
        summary: 'Master Acquisition, Activation, Retention, Referral, and Revenue stages to diagnose churn.',
        contentSections: [
          {
            heading: 'The Pirate Funnel',
            body: 'Focusing on Acquisition before fixing Retention is pouring water into a leaky bucket. Always fix Activation and Retention first.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'In the AARRR funnel framework, which stage represents the user\'s "Aha!" moment of first perceived value?',
            options: ['Activation', 'Acquisition', 'Referral', 'Revenue'],
            correctIndex: 0,
            explanation: 'Activation is when a newly acquired user successfully experiences core product value for the first time.',
          },
        ],
      },
      {
        id: 'mod-mkt-3',
        trackId: 'track-marketing',
        title: 'Organic SEO & Search Intent',
        order: 3,
        estimatedMinutes: 9,
        xpReward: 150,
        summary: 'Understand navigational, informational, and transactional keyword intent for high-ranking organic traffic.',
        contentSections: [
          {
            heading: 'Search Intent Over Keywords',
            body: 'Modern search engines prioritize satisfying user intent with deep, helpful content over brute-force keyword density.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Searching "buy react native courses discount" represents which type of search intent?',
            options: ['Transactional Intent', 'Informational Intent', 'Navigational Intent', 'Investigative Intent'],
            correctIndex: 0,
            explanation: 'Keywords like "buy" and "discount" indicate high purchase and transactional intent.',
          },
        ],
      },
      {
        id: 'mod-mkt-4',
        trackId: 'track-marketing',
        title: 'Paid Performance & CAC to LTV Ratio',
        order: 4,
        estimatedMinutes: 10,
        xpReward: 150,
        summary: 'Calculate Customer Acquisition Cost (CAC) vs Lifetime Value (LTV) for profitable scaling.',
        contentSections: [
          {
            heading: 'The 3:1 Golden Ratio',
            body: 'A healthy SaaS or digital product typically aims for an LTV:CAC ratio of at least 3:1, with CAC payback period under 12 months.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is considered a healthy benchmark for the LTV to CAC ratio in growth marketing?',
            options: ['At least 3:1 or higher', '1:1 (breaking even)', '0.5:1', '100:1 minimum'],
            correctIndex: 0,
            explanation: 'An LTV:CAC ratio of 3:1 or higher ensures profitability while supporting marketing reinvestment.',
          },
        ],
      },
      {
        id: 'mod-mkt-5',
        trackId: 'track-marketing',
        title: 'Conversion Rate Optimization (CRO)',
        order: 5,
        estimatedMinutes: 8,
        xpReward: 150,
        summary: 'Optimize landing pages, headline copy, CTA contrast, social proof, and friction reduction.',
        contentSections: [
          {
            heading: 'Reducing Friction',
            body: 'Every unnecessary form field reduces landing page conversion rates. Simplify forms and provide strong immediate social proof.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which element consistently improves landing page conversion rates by reducing buyer hesitation?',
            options: [
              'Clear social proof (testimonials, verified user count, ratings)',
              'Adding 10 mandatory form fields',
              'Hiding the pricing details entirely',
              'Auto-playing loud audio'
            ],
            correctIndex: 0,
            explanation: 'Social proof builds trust and overcomes cognitive hesitation during conversion.',
          },
        ],
      },
    ],
  },
  {
    id: 'track-career',
    title: 'Career Readiness & Networking',
    category: 'Career & Professional',
    description: 'Build a standout resume, optimize LinkedIn presence, ace behavioral interviews, and negotiate top offers.',
    iconName: 'briefcase-outline',
    iconLibrary: 'Ionicons',
    color: '#D97706', // Amber
    totalModules: 5,
    totalXP: 750,
    difficulty: 'All Levels',
    estimatedHours: '2.9 hrs',
    enrolledCount: 13100,
    rating: 4.9,
    modules: [
      {
        id: 'mod-car-1',
        trackId: 'track-career',
        title: 'The Google X-Y-Z Resume Formula',
        order: 1,
        estimatedMinutes: 8,
        xpReward: 150,
        summary: 'Transform passive resume bullets into quantifiable achievements: "Accomplished [X] as measured by [Y], by doing [Z]".',
        contentSections: [
          {
            heading: 'The X-Y-Z Formula',
            body: 'Example: "Increased mobile app daily active users by 35% [X], measured by Mixpanel retention cohorts [Y], by redesigning the gamified onboarding sprint flow [Z]."',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which of the following bullet points follows the high-impact Google X-Y-Z formula?',
            options: [
              'Reduced page load latency by 42% (measured via Lighthouse metrics) by implementing Redis caching and bundle splitting',
              'Responsible for maintaining website code and fixing bugs daily',
              'Worked in a team of 4 engineers on company projects',
              'Assisted senior leadership with various administrative tasks'
            ],
            correctIndex: 0,
            explanation: 'The first option demonstrates quantifiable impact (X), precise measurement (Y), and the specific technical action (Z).',
          },
        ],
      },
      {
        id: 'mod-car-2',
        trackId: 'track-career',
        title: 'LinkedIn Branding & The Inbound Flywheel',
        order: 2,
        estimatedMinutes: 9,
        xpReward: 150,
        summary: 'Optimize profile headline, creator mode, featured projects, and build an authentic personal brand.',
        contentSections: [
          {
            heading: 'The Headline Rule',
            body: 'Avoid generic headlines like "Student at University X". Instead, write: "Full Stack Mobile Developer | React Native & Firebase | Building High-Impact EdTech Sprints".',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the most effective headline format for attracting recruiter searches on LinkedIn?',
            options: [
              'Specific Core Skills | Target Role | Key Value Proposition / Projects',
              'Seeking Any Job Please Help',
              'Student at School',
              'Aspiring Professional'
            ],
            correctIndex: 0,
            explanation: 'Keyword-optimized headlines with clear value propositions appear much higher in recruiter search filters.',
          },
        ],
      },
      {
        id: 'mod-car-3',
        trackId: 'track-career',
        title: 'Behavioral Interviews & The STAR Method',
        order: 3,
        estimatedMinutes: 10,
        xpReward: 150,
        summary: 'Answer "Tell me about a time you had a conflict" with Situation, Task, Action, and Result.',
        contentSections: [
          {
            heading: 'The STAR Method',
            body: 'Spend 15% on Situation, 15% on Task, 50% on YOUR specific Actions, and 20% on quantifiable Results and lessons learned.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'In the STAR interview answering method, where should you spend the majority (50%) of your speaking time?',
            options: [
              'Action (The specific steps YOU took to solve the challenge)',
              'Situation (Describing the company background)',
              'Task (Explaining what your manager wanted)',
              'Apologizing for mistakes'
            ],
            correctIndex: 0,
            explanation: 'Interviewers evaluate your personal capabilities through the precise Actions you drove.',
          },
        ],
      },
      {
        id: 'mod-car-4',
        trackId: 'track-career',
        title: 'Strategic Networking: The 2-Hour Job Search',
        order: 4,
        estimatedMinutes: 8,
        xpReward: 150,
        summary: 'Reach out to alumni and engineers for informational interviews without sounding transactional.',
        contentSections: [
          {
            heading: 'The 6-Point Email',
            body: 'Keep outreach under 100 words: common connection, specific compliment on their career path, and a low-friction 15-minute question call.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the best way to open a cold networking message to an industry professional?',
            options: [
              'Reference a specific article/project of theirs and ask a thoughtful question about their journey',
              'Ask them to refer you for an open position immediately on line 1',
              'Paste your entire resume text into the message',
              'Send a generic copy-pasted "Dear Sir/Madam"'
            ],
            correctIndex: 0,
            explanation: 'Authentic curiosity about their specific work fosters genuine mentorship and referral relationships.',
          },
        ],
      },
      {
        id: 'mod-car-5',
        trackId: 'track-career',
        title: 'Salary Negotiation & Offer Evaluation',
        order: 5,
        estimatedMinutes: 9,
        xpReward: 150,
        summary: 'Evaluate total compensation (Base, Bonus, Equity, Benefits) and counter-offer professionally.',
        contentSections: [
          {
            heading: 'Never Negotiate Against Yourself',
            body: 'Express excitement first, ask for the full compensation breakdown in writing, and anchor counter-offers to market compensation data.',
          },
        ],
        quiz: [
          {
            id: 'q1',
            question: 'When receiving an initial job offer over the phone, what is the best first step?',
            options: [
              'Express enthusiasm, thank them, and request the detailed offer package in writing to review carefully',
              'Accept immediately on the spot without checking numbers',
              'Get angry and demand double',
              'Decline the offer immediately'
            ],
            correctIndex: 0,
            explanation: 'Getting the full breakdown in writing gives you time to research market rates and prepare a reasoned counter.',
          },
        ],
      },
    ],
  },
];

export const ACHIEVEMENTS_LIST = [
  {
    id: 'ach-first-sprint',
    title: 'First Sprint Complete',
    description: 'Finished your very first micro-lesson and quiz',
    icon: 'flag-outline',
    xpBonus: 50,
    category: 'sprint',
    condition: { type: 'modules_completed', target: 1 },
  },
  {
    id: 'ach-streak-3',
    title: 'On Fire!',
    description: 'Maintained a 3-day active learning streak',
    icon: 'flame',
    xpBonus: 100,
    category: 'streak',
    condition: { type: 'streak_days', target: 3 },
  },
  {
    id: 'ach-streak-7',
    title: 'Habit Machine',
    description: 'Reached a full 7-day uninterrupted streak',
    icon: 'flash',
    xpBonus: 250,
    category: 'streak',
    condition: { type: 'streak_days', target: 7 },
  },
  {
    id: 'ach-xp-500',
    title: 'Rising Prodigy',
    description: 'Accumulated over 500 total XP',
    icon: 'star',
    xpBonus: 100,
    category: 'xp',
    condition: { type: 'total_xp', target: 500 },
  },
  {
    id: 'ach-xp-1000',
    title: 'XP Titan',
    description: 'Surpassed 1,000 total XP milestone',
    icon: 'trophy',
    xpBonus: 300,
    category: 'xp',
    condition: { type: 'total_xp', target: 1000 },
  },
  {
    id: 'ach-track-master',
    title: 'Track Champion',
    description: 'Completed all modules in any single skill track',
    icon: 'ribbon',
    xpBonus: 500,
    category: 'track',
    condition: { type: 'tracks_completed', target: 1 },
  },
  {
    id: 'ach-polymath',
    title: 'True Polymath',
    description: 'Completed modules across 3 different skill tracks',
    icon: 'layers',
    xpBonus: 400,
    category: 'track',
    condition: { type: 'unique_tracks_started', target: 3 },
  },
  {
    id: 'ach-perfect-quiz',
    title: 'Sharp Mind',
    description: 'Scored 100% on a module quiz on first attempt',
    icon: 'checkmark-done-circle',
    xpBonus: 100,
    category: 'quiz',
    condition: { type: 'perfect_quiz', target: 1 },
  },
];

export const INITIAL_USER_PROFILE = {
  id: 'user-demo-123',
  name: 'Alex Chen',
  email: 'alex.chen@skillsprint.dev',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  skillLevel: 'Intermediate',
  currentStreak: 5,
  bestStreak: 12,
  totalXP: 680,
  completedModulesCount: 4,
  dailyGoalTarget: 1,
  dailyGoalProgress: 1,
  joinedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  lastActiveDate: new Date().toISOString().split('T')[0],
  enrolledTrackIds: ['track-coding', 'track-speaking', 'track-data'],
  completedModuleIds: ['mod-code-1', 'mod-code-2', 'mod-spk-1', 'mod-data-1'],
  unlockedAchievementIds: ['ach-first-sprint', 'ach-streak-3', 'ach-xp-500'],
  weeklyActivity: [
    { day: 'Mon', completed: 2, xp: 310, date: '2026-08-14' },
    { day: 'Tue', completed: 1, xp: 150, date: '2026-08-15' },
    { day: 'Wed', completed: 0, xp: 0, date: '2026-08-16' },
    { day: 'Thu', completed: 1, xp: 160, date: '2026-08-17' },
    { day: 'Fri', completed: 2, xp: 320, date: '2026-08-18' },
    { day: 'Sat', completed: 1, xp: 160, date: '2026-08-19' },
    { day: 'Sun', completed: 1, xp: 150, date: '2026-08-20' },
  ],
};
