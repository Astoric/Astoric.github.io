// script.js

document.addEventListener("DOMContentLoaded", () => {
  const subdomainGrid = document.getElementById("subdomainGrid");
  const loadingIndicator = document.getElementById("loading-indicator");
  const particlesContainer = document.getElementById("particles");

  const menuIcon = document.getElementById("menuIcon");
  const navOverlay = document.getElementById("navOverlay");
  const closeMenuBtn = document.getElementById("closeMenu");

  // --- 1. Dynamic Subdomain Listing (Option A: Hardcoded List) ---
  // This is the simplest approach for a fixed set of subdomains.
  // Replace these with your actual GitHub Pages project names.
  const myGitHubPagesProjects = [
    { name: "DL Set Times", path: "download-set-times" },
    { name: "Kink List", path: "kinklist" },
    // Example: { name: "My Blog", path: "blog" },
    // Example: { name: "My Portfolio", path: "portfolio" },
    // Make sure 'path' matches your GitHub repository name exactly.
  ];

  // --- 2. Create Bubbles ---
  function createProjectBubbles(projects) {
    const username = "astoric"; // Replace with your GitHub username
    const baseUrl = `https://${username}.github.io/`; // Base URL for all your GitHub Pages

    subdomainGrid.innerHTML = ""; // Clear existing content

    if (projects.length === 0) {
      subdomainGrid.innerHTML =
        "<p class='text-center text-gray-400'>No projects found.</p>";
      return;
    }

    projects.forEach((project, index) => {
      const bubble = document.createElement("a"); // Use <a> tag for links
      bubble.href = `${baseUrl}${project.path}/`;
      bubble.target = "_blank"; // Open in new tab
      bubble.rel = "noopener noreferrer"; // Security best practice

      bubble.classList.add("bubble"); // Apply the common bubble styles

      // Add a staggered animation delay to each bubble
      const animationDelay = index * 0.08; // Adjust delay for desired effect
      bubble.style.setProperty("--animation-delay", `${animationDelay}s`);

      const textDiv = document.createElement("div");
      textDiv.classList.add("bubble-text"); // Apply the common bubble text styles
      textDiv.textContent = project.name; // Display the project name

      bubble.appendChild(textDiv);
      subdomainGrid.appendChild(bubble);
    });
  }

  // --- 3. Countdown Timer ---
  // Set your target date/time for the countdown.
  // Example: 2025-12-31T00:00:00 (Year-Month-DayTHour:Minute:Second)
  const countdownDate = new Date("2025-12-31T00:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // Optionally add seconds if you like:
    // const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days < 10 ? "0" + days : days;
    document.getElementById("hours").textContent =
      hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").textContent =
      minutes < 10 ? "0" + minutes : minutes;
    // document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
      clearInterval(countdownInterval);
      const countdownTimerElement = document.querySelector(".countdown-timer");
      countdownTimerElement.innerHTML = `<span class="text-lg">Event Started!</span>`;
      countdownTimerElement.style.fontSize = "1.5em";
      countdownTimerElement.style.gap = "0"; // Remove gap
    }
  }

  // --- 4. Particle Background Animation ---
  function createParticles() {
    const particleCount = 50; // Number of particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random position and animation delay for a scattered effect
      const left = Math.random() * 100;
      const top = Math.random() * 100; // Start from random vertical position
      const delay = Math.random() * 5; // Random delay for staggered animation
      const duration = 5 + Math.random() * 5; // Random duration for variety

      particle.style.left = `${left}vw`;
      particle.style.top = `${top}vh`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationName = "float-particle"; // Ensure correct animation name

      particlesContainer.appendChild(particle);
    }
  }

  // --- 5. Navigation Menu Toggle ---
  function toggleNavOverlay() {
    navOverlay.classList.toggle("active");
  }

  // --- Initialization Function ---
  async function init() {
    loadingIndicator.style.display = "flex"; // Show loading indicator

    // Create particles in parallel (they don't depend on loaded data)
    createParticles();

    // Start countdown immediately
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Create bubbles for your projects
    // For now, we'll use the hardcoded list.
    // If you want to use the GitHub API, you'd call a function here
    // that fetches your repos and then calls createProjectBubbles with the result.
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate loading delay
    createProjectBubbles(myGitHubPagesProjects);

    loadingIndicator.style.display = "none"; // Hide loading indicator
  }

  // Event Listeners
  menuIcon.addEventListener("click", toggleNavOverlay);
  closeMenuBtn.addEventListener("click", toggleNavOverlay);

  // Close nav when clicking outside of it, but not on menu icon
  navOverlay.addEventListener("click", (event) => {
    if (event.target === navOverlay) {
      // Only close if the direct overlay background is clicked, not children
      toggleNavOverlay();
    }
  });

  // Call init to start everything
  init();
});