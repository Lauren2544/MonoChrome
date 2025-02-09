let specialDomains;

// list of special domains, the list in special_domains.json should be same as host_permissions list in mainfest.json
fetch(chrome.runtime.getURL('../../config/special_domains.json'))
.then(response => response.json())
.then(data => { specialDomains = data.specialDomains; })
.catch(error => console.error("Error loading allowed domains:", error));

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    // check if currently on a special domain 
    if (specialDomains.some(domain => tab.url.includes(domain))){
        chrome.scripting.insertCSS({
            target: {tabId: tabId},
            css: 'html { filter: grayscale(100%) !important; }'
        });
    }
  }
});
