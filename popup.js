window.onload = function() {
    function findMatches(arr, obj) {
        for (var i = 0; i < arr.length; i++) {
          var element = arr[i];
      
          if (obj.hasOwnProperty(element)) {
            var matchingArray = obj[element];
      
            matchingArray.forEach(function(item) {
              if (arr.includes(item.index)) {
                console.log('Key:', element, 'Index:', item.index);
              }
            });
          }
        }
      }

    function createDivsWithText(object) {
        var container = document.getElementById('container'); // Replace 'container' with the ID of your container element
      
        // Clear existing content
        container.innerHTML = '';
      
        // Create div elements with paragraph elements
        for (var key in object) {
          if (object.hasOwnProperty(key)) {
            var div = document.createElement('div');
            var p = document.createElement('p');
            p.textContent = key +": " +object[key];
            div.appendChild(p);
            container.appendChild(div);
          }
        }
      }    
    
    chrome.storage.local.get('thisValue', function(x) {
        console.log(JSON.parse(x.thisValue));
        createDivsWithText(JSON.parse(x.thisValue));
        chrome.storage.local.get('savedPolicies', function(x) {
            let obj = x.savedPolicies;
            for (let key in obj) {
                if (obj[key].length === 0) {
                  delete obj[key];
                }
              }
            console.log(obj);
        });
    });



}