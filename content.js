// adds p (policy data), p2 (cluster data), p3 (form data) elements to body
// ------------------------------------------------
let a = document.body;
let ab = window.location.href;
let p = document.createElement("p");
let p2 = document.createElement("div");
let p3 = document.createElement("p");
p.style.display = "none";
p.id = "policyData";
p2.style.display = "none";
p2.id = "clusterData";
p3.style.display = "none";
p3.id = "pid";
a.appendChild(p);
a.appendChild(p2);
a.appendChild(p3);
let toast = document.createElement('div');
toast.id = "toast";
toast.style.position = 'fixed';
toast.style.top = '10px';
toast.style.right = '10px';
toast.style.backgroundColor = '#f08080';
toast.style.border = 'solid';
toast.style.borderColor = '#ff0000';
toast.style.fontSize = "x-large"
toast.style.color = '#fff';
toast.style.padding = '10px';
toast.style.borderRadius = '5px';
toast.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
toast.style.zIndex = '9999';
toast.style.display = "none";
toast.textContent = 'This is a toast notification';
a.appendChild(toast);
// ------------------------------------------------


chrome.storage.local.get('savedPolicies', function(x) {
    let obj = x.savedPolicies;
    for (let key in obj) {
        if (obj[key].length === 0) {
          delete obj[key];
        }
      }
    console.log(obj);
    document.getElementById("pid").innerText = JSON.stringify(obj)
});

function observeDOMChanges() {
    var targetNode = document.body;
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if ((mutation.target.id === "framework" 
                    && (document.getElementById("pid").getAttribute("boolean") === null 
                        || document.getElementById("pid").getAttribute("boolean") === "false"))) {
                document.getElementById("pid").setAttribute("boolean", true)
                // appends script "inject.js" to body
                // ------------------------------------------------
                let s = document.createElement('script');
                s.src = chrome.runtime.getURL('inject.js');
                s.setAttribute("id", "inject");
                document.body.appendChild(s);
                // ------------------------------------------------
            }
        });
    });
    var config = {
        attributes: false,
        childList: true,
        subtree: true
    };
    observer.observe(targetNode, config);
}
observeDOMChanges();

let superObj = {};
function observeClusterData() {
    var targetNode = document.getElementById("clusterData");
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.target.id !== "clusterData") {
                let a1 = mutation.target.parentElement;
                for (let i = 0;i<a1.children.length;i++) {
                    superObj[a1.children[i].id] = a1.children[i].title;
                }
                console.log(mutation.target.id);
                console.log(mutation.target.title);
                console.log(mutation);
            }
        });
        console.log(superObj);
        chrome.storage.local.set({"thisValue":JSON.stringify(superObj)}, function() {
            console.log("saved")
        })

    });
    var config = {
        attributes: true,
        childList: true,
        subtree: true
    };
    observer.observe(targetNode, config);
}
observeClusterData();


// Sets policy data in element p (id=policyData)
// --------------------------------------------------
let data = [];
chrome.storage.local.get(['key'], function (result) {
    if (result.key) {
        data = JSON.parse(result.key);
        p.innerText = (JSON.stringify(data));
    }
});
// --------------------------------------------------


// Sends message to background script when the body is clicked, with the URL, form data and cluster data
// --------------------------------------------------
function sendMessageToBackground() {
    let dataToSend = {};
    if (ab.includes("https://tcs-sg.bytedance.net/workprocess/")) {
        dataToSend["url"] = ab.split("?")[0].substring(ab.split("?")[0].length - 19, ab.split("?")[0].length);
    }
    dataToSend["pidData"] = document.getElementById("pid").innerText;
    dataToSend["clusterData"] = document.getElementById("clusterData").getAttribute("clusterdata");
    chrome.runtime.sendMessage({data: dataToSend});
    console.log(dataToSend)
}

document.body.addEventListener("click", function () {
    sendMessageToBackground();
})
// ---------------------------------------------------



