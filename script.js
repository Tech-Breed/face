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
  ScrollReveal({ distance: "30px", easing: "ease-in" });
  
  ScrollReveal().reveal(".blend", {
    delay: 300,
    origin: "top",
  });
  
  ScrollReveal().reveal(".container1 .gradient-text", {
    delay: 300,
    origin: "top",
  });
  
  ScrollReveal().reveal(".container1 .paragraph", {
    delay: 800,
    origin: "top",
  });
  
  ScrollReveal().reveal(".users-color-container", {
    delay: 800,
    origin: "top",
  });
  
  ScrollReveal().reveal(".container4 .section", {
    delay: 300,
    origin: "bottom",
    interval: 200,
  });
  
//   signature board


document.addEventListener('DOMContentLoaded', () => {
    const signOnBoard = document.getElementById('signOnBoard');
    const signatureInput = document.getElementById('signatureInput');
    const addSignatureButton = document.getElementById('addSignatureButton');
  
    // Function to load signatures from localStorage
    const loadSignatures = () => {
      const signatures = JSON.parse(localStorage.getItem('signatures')) || [];
      signatures.forEach(signature => addSignatureToBoard(signature));
    };
  
    // Function to save signatures to localStorage
    const saveSignature = (signature) => {
      const signatures = JSON.parse(localStorage.getItem('signatures')) || [];
      signatures.push(signature);
      localStorage.setItem('signatures', JSON.stringify(signatures));
    };
  
    // Function to add a signature to the board
    const addSignatureToBoard = (signature) => {
      const signatureElement = document.createElement('div');
      signatureElement.className = 'signature';
      signatureElement.textContent = signature;
      signOnBoard.appendChild(signatureElement);
    };
  
    // Event listener for the "Add Signature" button
    addSignatureButton.addEventListener('click', () => {
      const signature = signatureInput.value.trim();
      if (signature !== '') {
        addSignatureToBoard(signature);
        saveSignature(signature);
        signatureInput.value = '';
      }
    });
  
    // Load signatures when the page loads
    loadSignatures();
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const signOnBoard = document.getElementById('signOnBoard');
    const signatureInput = document.getElementById('signatureInput');
    const addSignatureButton = document.getElementById('addSignatureButton');
  
    // Reference to Firebase Database
    const db = firebase.database().ref('signatures');
  
    // Function to add a signature to the board
    const addSignatureToBoard = (signature) => {
      const signatureElement = document.createElement('div');
      signatureElement.className = 'signature';
      signatureElement.textContent = signature;
      signOnBoard.appendChild(signatureElement);
    };
  
    // Load existing signatures and listen for new ones
    db.on('child_added', (snapshot) => {
      const signature = snapshot.val();
      addSignatureToBoard(signature);
    });
  
    // Event listener for the "Add Signature" button
    addSignatureButton.addEventListener('click', () => {
      const signature = signatureInput.value.trim();
      if (signature !== '') {
        db.push(signature);
        signatureInput.value = '';
      }
    });
  });
  