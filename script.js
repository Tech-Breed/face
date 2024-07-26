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
  const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbySy3vzdauc0Qvuvij3y6pT_fsm_lYynKwmnEab-UxoqDATGV7uiIgjfPq8BmyJL2U/exec'; // Replace with your actual Web App URL

  // Function to load signatures from Google Sheets
  const loadSignatures = async () => {
    try {
      const response = await fetch(SHEET_API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      signOnBoard.innerHTML = ''; // Clear existing signatures
      data.forEach(signature => addSignatureToBoard(signature.name));
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
      addSignatureToBoard(signature); // Add the new signature to the board
    } catch (error) {
      console.error('Error saving signature:', error);
    }
  };

  // Function to add a signature to the board
  const addSignatureToBoard = (signature) => {
    const signatureElement = document.createElement('div');
    signatureElement.className = 'signature';
    signatureElement.textContent = signature;
    signOnBoard.appendChild(signatureElement);
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




