document.addEventListener('DOMContentLoaded', () => {
  
  const applyGreyButton = document.getElementById('apply-grey');
  const removeGreyButton = document.getElementById('remove-grey');
  const greyMessage = document.getElementById('grey-message');

  // you need to enter an intention to turn off the grey scale 
  const intentionInputContainer = document.getElementById('intention-input-container');
  const intentionInput = document.getElementById('intention-input');
  const intentionCharCount = document.getElementById('intention-char-count');
  const intentionFeedbackMessage = document.getElementById('intention-feedback-message');
  const intentionMessage = document.getElementById('intention-message');


  // intention logic 
  const minLength = 20;
  const requiredWords = ["i am", "i'm", "i want", "i just want", "im "];
  intentionInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const intention = intentionInput.value.trim().toLowerCase();

      if (intention.length >= minLength && requiredWords.some(word => intention.includes(word))) {
        // if input is good length 
        // Hide the intention instructions
        intentionMessage.style.display = 'none'; 
        // Show the remove greyscale button
        removeGreyButton.style.display = 'block'; 
        intentionFeedbackMessage.textContent = `Your intention is: "${intention}" you may now use the remove greyscale filter button below.`;
        intentionInputContainer.style.display = 'none';
      } else {
        // if input is too short
        // Show the intention instructions
        intentionMessage.style.display = 'block'; 
        // Hide the remove greyscale button 
        removeGreyButton.style.display = 'none'; 
        intentionFeedbackMessage.textContent = '';
        intentionInputContainer.style.display = 'block';
      }
    }
  });

  // update the char count for intention input 
  intentionInput.addEventListener('input', () => {
      const intention = intentionInput.value.trim().toLowerCase();
      intentionCharCount.textContent = `${intention.length} characters`;
  });
  
  // remove the greyscale filter
  removeGreyButton.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.removeCSS({
        target: {tabId: tabs[0].id},
        css: 'html { filter: grayscale(100%) !important; }'
      });

      // display the message grey is off
      greyMessage.textContent = "Grey scale filter is: OFF";
    });
  });

  // apply the greyscale filter
  applyGreyButton.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.insertCSS({
        target: {tabId: tabs[0].id},
        css: 'html { filter: grayscale(100%) !important; }'
      });
        
      // display the message grey is on
      greyMessage.textContent = "Grey scale filter is: ON";
    });
  });
});