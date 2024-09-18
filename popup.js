document.addEventListener('DOMContentLoaded', () => {
  const resetButton = document.getElementById('reset');
  const setButton = document.getElementById('set');
  const inputContainer = document.getElementById('input');
  const intentionInput = document.getElementById('intentionInput');
  const charCountDisplay = document.getElementById('charCount');

  const minLength = 20;
  const requiredWords = ["i am", "i'm", "i want", "i just want", "im "];

  intentionInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const intention = intentionInput.value.trim().toLowerCase();

      if (intention.length >= minLength && requiredWords.some(word => intention.includes(word))) {
        resetButton.style.display = 'block'; // Show the reset button
        feedbackMessage.textContent = `Your intention is: "${intention}" - You can now use the reset button.`;
        inputContainer.style.display = 'none';
      } else {
        resetButton.style.display = 'none'; // Hide the reset button if input is too short
        feedbackMessage.textContent = '';
        inputContainer.style.display = 'block';
      }
    }
  });

  intentionInput.addEventListener('input', () => {
      const intention = intentionInput.value.trim().toLowerCase();
      charCountDisplay.textContent = `${intention.length} characters`;
  });
  
  resetButton.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.removeCSS({
        target: {tabId: tabs[0].id},
        css: 'html { filter: grayscale(100%) !important; }'
      });
    });
  });

  setButton.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.insertCSS({
        target: {tabId: tabs[0].id},
        css: 'html { filter: grayscale(100%) !important; }'
      });
    });
  });
});