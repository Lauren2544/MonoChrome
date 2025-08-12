# MonoChrome # 

Welcome to **MonoChrome**, a chrome extension that applies a greyscale filter on certain websites to make them less visually appealing, making your use of these websites more mindful and intentional. 

## Key Features

-- FEATURES --

* Automatic Activation: Automatically applies the greyscale filter on specific websites (youtube, facebook, x, linkedin, instagram, tiktok, pinterest) 

* Greyscale Transformation: Ability to toggle a greyscale filter on/off across any website at anytime, reducing visual noise and simulation. To toggle off the grayscale filter you need to set an intention of minimum length 20 characters and containing at least one of the required words ("i am", "im", "i'm", "i want", "i just want")

* Looks pretty 

## Justification for permissions 
tabs justification:
On certain websites ("specialDomains": [ "youtube.com", "facebook.com", "x.com", "linkedin.com", "instagram.com", "tiktok.com",  "pinterest.com" ]) I apply the grayscale filter to the website on load. The tabs permission is used to check if the current tab url is a "special domain" url. 

scripting justification: 
The scripting permission enables the extension to add or remove CSS on webpages, specifically to toggle a grayscale (100%) filter across the entire page.

active tab justification: 
If the user opens the monochrome extension and clicks the button to enable the greyscale filter, this permission enables the extension to inject CSS into any webpage the user visits, this allows the greyscale filter to be applied on all URLs.

host permission justification: 
Similar to the tabs justification, on certain websites ("specialDomains": [ "youtube.com", "facebook.com", "x.com", "linkedin.com", "instagram.com", "tiktok.com",  "pinterest.com" ]) I apply the grayscale filter to the website on load. The host permission is used so that these websites will load with the greyscale filter, without needing the user to interact with the extension. 
