let yTimer = null;
let yBrowsingTime = 0;
let yTimerFlash = null;
let yFlashTime = 0;

let iBrowsingTime = 0;
let iLastDate;
let iTimer = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //make youtube grey-scale on load 
  if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
    chrome.scripting.insertCSS({
      target: {tabId: tabId},
      css: 'html { filter: grayscale(100%) !important; }'
    });

    if (!yTimer) {
      yTimer = setInterval(() => {
        yBrowsingTime++;
        
        if (yBrowsingTime >= 5) { //5 mins

          //set a flasher to go off every second
          if (!yTimerFlash) {
            yTimerFlash = setInterval(() => {
              yFlashTime++;
              if (yFlashTime >= 9){
                clearInterval(yTimerFlash);
              }
              if (yFlashTime % 2 == 0) {
                chrome.scripting.removeCSS({
                  target: {tabId: tabId},
                  css: 'html { filter: grayscale(100%) !important; }'
                });
              } else {
                chrome.scripting.addCSS({
                  target: {tabId: tabId},
                  css: 'html { filter: grayscale(100%) !important; }'
                });
              }
            }, 1000);
          }

          //reset 5 min timer 
          yBrowsingTime = 0;
        }
      }, 60000); // Check every minute (60000 milliseconds)
    }
  }


  //make linkedin grey-scale on load 
  if (changeInfo.status === 'complete' && tab.url.includes('linkedin.com')) {
    chrome.scripting.insertCSS({
      target: {tabId: tabId},
      css: 'html { filter: grayscale(100%) !important; }'
    });
  }


  //make instagram grey-scale on after 10 mins
  if (changeInfo.status === 'complete' && tab.url.includes('instagram.com')) {
    const today = new Date().toDateString();
    
    // If the date has changed, reset the browsing time
    if (iLastDate !== today) {
      iBrowsingTime = 0;
      iLastDate = today;
      console.log("It's a new day! Resetting browsing time to", iBrowsingTime, "minutes");
    }

    if (!iTimer) {
      iTimer = setInterval(() => {
        iBrowsingTime++;
        
        if (iBrowsingTime >= 10) {
          console.log("You've spent too much time on Instagram! Applying grayscale filter.");
          chrome.scripting.insertCSS({
            target: {tabId: tabId},
            css: 'html { filter: grayscale(100%) !important; }'
          });
          clearInterval(iTimer); // Stop the timer after applying the filter
        }
      }, 60000); // Check every minute (60000 milliseconds)
    }
  }
});
