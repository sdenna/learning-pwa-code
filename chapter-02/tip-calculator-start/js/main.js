// @ts-check

// https://flaviocopes.com/how-to-format-number-as-currency-javascript/
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

function updateTipAmounts() {
    // grab the meal cost from the page
    let mealCost = document.getElementById("mealCost").value;
    // populate the table with tip amounts
    document.getElementById('tip10').innerHTML = formatter.format(mealCost * 0.10);
    document.getElementById('tip15').innerHTML = formatter.format(mealCost * 0.15);
    document.getElementById('tip18').innerHTML = formatter.format(mealCost * 0.18);
    document.getElementById('tip20').innerHTML = formatter.format(mealCost * 0.20);
    document.getElementById('tip22').innerHTML = formatter.format(mealCost * 0.22);
}

// register the event listener for the input field
document.getElementById('mealCost').oninput = updateTipAmounts;

// did we launch a pWA?
var urlParams = new URLSearchParams(window.location.search);
// look for the source parameter, if it's 'pwa' then it's installed
if (urlParams.get('source') === 'pwa') {
    console.log("Launched as PWA");
    // add the PWA moniker to the title
    let theTitle = document.getElementById('title');
    theTitle.innerHTML = theTitle.innerHTML + ' (PWA)';
}
else {
    console.log("not launched as PWA");
}


// get a handle to the install button
let installButton = document.getElementById("installButton");
// now set up the click handler for ht einstall button
installButton.onclick = doInstall;

// create an object we'll use to hold the reference to the PWA
// install event
let deferredPrompt;

function doInstall() {
    // we've tapped the install button, so hide it
    installButton.style.display = "none";
    // execute the deferred installation prompt
    deferredPrompt.prompt();
    // wait for the response from thr deferred prompt
    deferredPrompt.userChoice.then((res) => {
      if (res.outcome === "accepted") {
        // did the user approve installation?
        console.log('doInstall: accepted');
    } else {
        console.log('doInstall: declined');
    }
    // clear the deferred prompt object so we can only do this once
    });
}


// now add an event listerner to respond to the event.
// Right before the browser installs the PWA, it fires the 
// beforeinstallprompt event.  Here we'll manage the installation ourselves
window.addEventListener('beforeinstallprompt', (event) => {
    // don't allow the browser to do its install now, we want to do it when user taps install button
    event.preventDefault();
    //stash the event object so we can use it later when user taps install button
    deferredPrompt = event;
    // now unhide the Install button so th euser can tap it!
    installButton.style.display = 'block'
});

// register an event listener for after the app installs
// this is called for any post-app installation cleanup
window.addEventListener('appinstalled', (event) => {
    console.log("App Installed");
});


