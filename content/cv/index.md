---
title: ""
subtitle: ""
description: "CV"
author: "Mohammad Sadil Khan"
publishDate: "2025-10-10"
---

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">


<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --secondary: #ec4899;
            --dark: #0f172a;
            --dark-lighter: #1e293b;
            --gray: #64748b;
            --light: #f1f5f9;
            --white: #ffffff;
            --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
            --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
            --shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
        }
        body {
            background: var(--dark);
            color: var(--white);
            line-height: 1.6;
            overflow-x: hidden;
        }
        /* Hero Section */
        .hero {
            background: var(--gradient);
            padding: 4rem 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        .hero-content {
            position: relative;
            z-index: 1;
            max-width: 800px;
            margin: 0 auto;
        }
        .hero h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            animation: fadeInUp 0.8s ease;
        }
        .hero .subtitle {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: 2rem;
            opacity: 0.9;
            animation: fadeInUp 0.8s ease 0.2s both;
        }
        .hero .tags {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 2rem;
            animation: fadeInUp 0.8s ease 0.4s both;
        }
        .tag {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 500;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .download-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--white);
            color: var(--primary-dark);
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-lg);
            animation: fadeInUp 0.8s ease 0.6s both;
            cursor: pointer;
            border: none;
        }
        .download-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.25);
        }
        /* Container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 4rem 2rem;
        }
        /* Section Headers */
        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }
        .section-header h2 {
            font-size: 2.5rem;
            font-weight: 700;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
        }
        .section-header .line {
            width: 80px;
            height: 4px;
            background: var(--gradient);
            margin: 1rem auto;
            border-radius: 2px;
        }
        /* Timeline */
        .timeline {
            position: relative;
            padding: 2rem 0;
        }
        .timeline::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 3px;
            background: linear-gradient(to bottom, var(--primary), var(--secondary));
            transform: translateX(-50%);
        }
        .timeline-item {
            margin-bottom: 3rem;
            position: relative;
            width: 100%;
            animation: fadeIn 0.6s ease backwards;
        }
        .timeline-item:nth-child(1) { animation-delay: 0.1s; }
        .timeline-item:nth-child(2) { animation-delay: 0.2s; }
        .timeline-item:nth-child(3) { animation-delay: 0.3s; }
        .timeline-item:nth-child(4) { animation-delay: 0.4s; }
        .timeline-item:nth-child(5) { animation-delay: 0.5s; }
        .timeline-item:nth-child(6) { animation-delay: 0.6s; }
        .timeline-item:nth-child(odd) .card {
            margin-right: 52%;
        }
        .timeline-item:nth-child(even) .card {
            margin-left: 52%;
        }
        .timeline-dot {
            position: absolute;
            left: 50%;
            top: 2rem;
            width: 20px;
            height: 20px;
            background: var(--gradient);
            border-radius: 50%;
            transform: translateX(-50%);
            box-shadow: 0 0 0 4px var(--dark), 0 0 0 8px rgba(99, 102, 241, 0.2);
            z-index: 2;
        }
        .card {
            background: var(--dark-lighter);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            border: 1px solid rgba(99, 102, 241, 0.2);
            transition: all 0.3s ease;
            position: relative;
        }
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient);
            border-radius: 16px 16px 0 0;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(99, 102, 241, 0.25);
            border-color: var(--primary);
        }
        .card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: var(--white);
        }
        .card .company {
            color: var(--primary);
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            display: block;
        }
        .card .location {
            color: var(--gray);
            font-size: 0.95rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .card .location::before {
            content: '📍';
        }
        .card .date {
            color: var(--secondary);
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .card .date::before {
            content: '📅';
        }
        .card .description {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1rem;
            line-height: 1.7;
        }
        /* Education specific styling */
        .education-timeline::before {
            left: 30px;
        }
        .education-timeline .timeline-item {
            margin-left: 0;
        }
        .education-timeline .timeline-item .card {
            margin-left: 80px;
            margin-right: 0;
        }
        .education-timeline .timeline-dot {
            left: 30px;
        }
        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        /* Responsive Design */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            .hero .subtitle {
                font-size: 1.2rem;
            }
            .section-header h2 {
                font-size: 2rem;
            }
            .timeline::before {
                left: 30px;
            }
            .timeline-item:nth-child(odd) .card,
            .timeline-item:nth-child(even) .card {
                margin-left: 80px;
                margin-right: 0;
            }
            .timeline-dot {
                left: 30px;
            }
            .education-timeline .timeline-item .card {
                margin-left: 80px;
            }
            .card {
                padding: 1.5rem;
            }
            .container {
                padding: 2rem 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Mohammad Sadil Khan</h1>
            <p class="subtitle">PhD Researcher | Computer Vision & 3D Reconstruction</p>
            <div class="tags">
                <span class="tag">Machine Learning</span>
                <span class="tag">3D Vision</span>
                <span class="tag">Deep Learning</span>
                <span class="tag">Computer Graphics</span>
            </div>
            <button class="download-btn" onclick="window.open('resume.pdf','_blank')">
                <span>📄</span>
                <span>Download Resume</span>
            </button>
        </div>
    </section>
    <!-- Work Experience Section -->
    <div class="container">
        <div class="section-header">
            <h2>Work Experience</h2>
            <div class="line"></div>
        </div>
        <div class="timeline">
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="card">
                    <h3>Research Intern</h3>
                    <span class="company">Huawei Noah's Ark Lab</span>
                    <p class="location">London, UK</p>
                    <p class="date">May 2025 – Present</p>
                    <p class="description">3D Reconstruction and Parametric Surface Modeling.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="card">
                    <h3>Research Assistant</h3>
                    <span class="company">DFKI, RPTU</span>
                    <p class="location">Kaiserslautern, Germany</p>
                    <p class="date">Feb 2024 – Apr 2025</p>
                    <p class="description">Vision-Language Architectures for 3D Scene and Shape Reconstruction.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="card">
                    <h3>Student Researcher</h3>
                    <span class="company">SnT, University of Luxembourg</span>
                    <p class="location">Kirchberg, Luxembourg</p>
                    <p class="date">Jan 2023 – Feb 2024</p>
                    <p class="description">3D Shape Modelling with Deep Geometric-Language Models.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="card">
                    <h3>Research Intern</h3>
                    <span class="company">Creatis, INSA Lyon</span>
                    <p class="location">Lyon, France</p>
                    <p class="date">Feb 2022 – Jul 2022</p>
                    <p class="description">3D Medical Image Segmentation using Point Clouds.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="card">
                    <h3>Research Intern</h3>
                    <span class="company">Laboratoire Hubert Curien, Université Jean Monnet</span>
                    <p class="location">Saint-Étienne, France</p>
                    <p class="date">Apr 2021 – Aug 2021</p>
                    <p class="description">Worked on reconstructing historical ornament vignettes under Prof. Rémi Emonet and Prof. Thierry Fournel.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="card">
                    <h3>Data Analyst Intern</h3>
                    <span class="company">Accenture Digital</span>
                    <p class="location">India</p>
                    <p class="date">May 2020 – Jul 2020</p>
                    <p class="description"><strong>Project:</strong> Intelligent Inventory Planning. Worked on automatic forecast hedging to cover demand gaps using AI.</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Education Section -->
    <div class="container">
        <div class="section-header">
            <h2>Education</h2>
            <div class="line"></div>
        </div>
        <div class="timeline education-timeline">
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="card">
                    <h3>PhD in Computer Science</h3>
                    <span class="company">RPTU</span>
                    <p class="location">Germany</p>
                    <p class="date">2024 – Present</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="card">
                    <h3>M.Sc. in Machine Learning & Data Mining</h3>
                    <span class="company">Université Jean Monnet</span>
                    <p class="location">France</p>
                    <p class="date">2020 – 2022</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="card">
                    <h3>B.Sc. in Mathematics</h3>
                    <span class="company">Ramakrishna Mission College</span>
                    <p class="location">India</p>
                    <p class="date">2016 – 2019</p>
                </div>
            </div>
        </div>
    </div>
</body>
