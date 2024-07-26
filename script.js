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

  // Function to load signatures from localStorage
  const loadSignatures = () => {
    const signatures = JSON.parse(localStorage.getItem('signatures')) || [];
    signOnBoard.innerHTML = ''; // Clear existing signatures
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
      notifyStorageChange();
    }
  });

  // Notify other tabs/windows about the storage change
  const notifyStorageChange = () => {
    localStorage.setItem('sync', Date.now());
  };

  // Listen for storage events and reload signatures if needed
  window.addEventListener('storage', (event) => {
    if (event.key === 'sync') {
      loadSignatures();
    }
  });

  // Load signatures when the page loads
  loadSignatures();
});


// document.addEventListener('DOMContentLoaded', () => {
//   const signOnBoard = document.getElementById('signOnBoard');
//   const signatureInput = document.getElementById('signatureInput');
//   const addSignatureButton = document.getElementById('addSignatureButton');
//   const SHEET_API_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL';

  // Function to load signatures from Google Sheets
  // const loadSignatures = async () => {
  //   try {
  //     const response = await fetch(SHEET_API_URL);
  //     const data = await response.json();
  //     signOnBoard.innerHTML = ''; // Clear existing signatures
  //     data.forEach(signature => addSignatureToBoard(signature.name));
  //   } catch (error) {
  //     console.error('Error loading signatures:', error);
  //   }
  // };

  // Function to save signature to Google Sheets
  // const saveSignature = async (signature) => {
  //   try {
  //     await fetch(SHEET_API_URL, {
  //       method: 'POST',
  //       body: JSON.stringify({ name: signature }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error saving signature:', error);
  //   }
  // };

  // Function to add a signature to the board
  // const addSignatureToBoard = (signature) => {
  //   const signatureElement = document.createElement('div');
  //   signatureElement.className = 'signature';
  //   signatureElement.textContent = signature;
  //   signOnBoard.appendChild(signatureElement);
  // };

  // Event listener for the "Add Signature" button
  // addSignatureButton.addEventListener('click', async () => {
  //   const signature = signatureInput.value.trim();
  //   if (signature !== '') {
  //     addSignatureToBoard(signature);
  //     await saveSignature(signature);
  //     signatureInput.value = '';
  //     loadSignatures();
  //   }
  // });

  // Load signatures when the page loads
//   loadSignatures();
// });
