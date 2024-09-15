 // Nav functions
 function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
  }
  
  function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
  }
  
  // ScrollReveal JS
  // ScrollReveal({ distance: "30px", easing: "ease-in" });
  
  // ScrollReveal().reveal(".blend", {
  //   delay: 300,
  //   origin: "top",
  // });
  
  // ScrollReveal().reveal(".container1 .gradient-text", {
  //   delay: 300,
  //   origin: "top",
  // });
  
  // ScrollReveal().reveal(".container1 .paragraph", {
  //   delay: 800,
  //   origin: "top",
  // });
  
  // ScrollReveal().reveal(".users-color-container", {
  //   delay: 800,
  //   origin: "top",
  // });
  
  // ScrollReveal().reveal(".container4 .section", {
  //   delay: 300,
  //   origin: "bottom",
  //   interval: 200,
  // });
  
//   signature board

document.addEventListener('DOMContentLoaded', () => {
  const signOnBoard = document.getElementById('signOnBoard');
  const signatureInput = document.getElementById('signatureInput');
  const addSignatureButton = document.getElementById('addSignatureButton');
  const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbw4PlI5m8L4-4hTuyGlpU1Ck-qnI-nXcz4DYm_s60fkYzPRWI2Sky7yX2-luFQonne58w/exec'; // Replace with your actual Web App URL

  // Function to load signatures from Google Sheets
  const loadSignatures = async () => {
    try {
      const response = await fetch(SHEET_API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      signOnBoard.innerHTML = ''; // Clear existing signatures
      data.forEach(signature => addSignatureToBoard(signature.name, getRandomColor()));
    } catch (error) {
      console.error('Error loading signatures:', error);
    }
  };

  // Function to save signature to Google Sheets
  const saveSignature = async (signature) => {
    try {
      const response = await fetch(SHEET_API_URL, {
        method: 'POST',
        body: JSON.stringify({ name: signature }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      addSignatureToBoard(signature, getRandomColor()); // Add the new signature to the board
    } catch (error) {
      console.error('Error saving signature:', error);
    }
  };

  // Function to add a signature to the board
  const addSignatureToBoard = (signature, color) => {
    const signatureElement = document.createElement('div');
    signatureElement.className = 'signature';
    signatureElement.textContent = signature;
    signatureElement.style.backgroundColor = color;
    signOnBoard.appendChild(signatureElement);
  };

  // Function to get a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Event listener for the "Add Signature" button
  addSignatureButton.addEventListener('click', async () => {
    const signature = signatureInput.value.trim();
    if (signature !== '') {
      await saveSignature(signature);
      signatureInput.value = '';
    }
  });

  // Load signatures when the page loads
  loadSignatures();

  // Periodically check for new signatures to keep the board updated
  setInterval(loadSignatures, 10000); // Check every 10 seconds
});





// Simple carousel functionality for featured cards 
let currentIndex = 0;
const cards = document.querySelectorAll('.featured-cards .card');

function showNextCard() {
    cards[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % cards.length;
    cards[currentIndex].classList.add('active');
}

setInterval(showNextCard, 5000); // Switch card every 5 seconds

// galary

const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.picture');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
const totalSlides = slides.length;

// Function to update the slider position
function updateSlider() {
  const offset = currentSlide * -100;
  sliderWrapper.style.transform = `translateX(${offset}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// Move to the next slide
nextButton.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
});

// Move to the previous slide
prevButton.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
});

// Update slider when dots are clicked
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlider();
  });
});

