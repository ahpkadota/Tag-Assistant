(function () {

    addNewOptions();
    let obj1 = JSON.parse(document.getElementById("pid").innerText)

    function checkArrayForMatches(arr, obj) {
        let matchedValues = new Set();

        // create toast element
        let toast = document.createElement("div");
        toast.style.position = "fixed";
        toast.style.top = "10px";
        toast.style.right = "10px";
        toast.style.backgroundColor = '#f08080';
        toast.style.border = 'solid';
        toast.style.borderColor = '#ff0000';
        toast.style.fontSize = "large"
        toast.style.color = '#fff';
        toast.style.padding = "10px";
        toast.style.borderRadius = "5px";
        toast.style.zIndex = "9999";
        toast.style.display = "none";
        document.body.appendChild(toast);
        for (let i = 0; i < arr.length; i++) {
          let current = arr[i];
          if (obj[current]) {
            let currentArray = obj[current];
            for (let j = 0; j < currentArray.length; j++) {
              let innerArray = currentArray[j];
              if (arr.includes(innerArray.index) && !matchedValues.has(innerArray.index)) {
                
                setTimeout(() => {
                  // display toast with animation
                  toast.textContent = "You multitagged: '" +   current + "' AND '" + innerArray.index + "'.";
                  console.log("You multitagged: '" +   current + "' AND '" + innerArray.index + "'.");
                  toast.style.display = "block";
                  toast.style.opacity = "0";
                  let opacity = 0;
                  let interval = setInterval(() => {
                    if (opacity >= 1) {
                      clearInterval(interval);
                      setTimeout(() => {
                        // hide toast with animation
                        toast.style.opacity = "1";
                        let opacity = 1;
                        let interval2 = setInterval(() => {
                          if (opacity <= 0) {
                            clearInterval(interval2);
                            toast.style.display = "none";
                            toast.parentNode.removeChild(toast); // remove toast element
                          } else {
                            opacity -= 0.1;
                            toast.style.opacity = opacity;
                          }
                        }, 50);
                      }, 3000);
                    } else {
                      opacity += 0.1;
                      toast.style.opacity = opacity;
                    }
                  }, 50);
                }, 100);
    
                matchedValues.add(innerArray.index);
                console.log(innerArray.index);
              }
            }
          }
        }
      }
      



    function addNewOptions() { // if the page is loaded...
        document.body.addEventListener("click", function () { // whenever the body is clicked, if there are no "newOptions" elements...
            if (document.getElementById("pid").getAttribute("boolean") == "true") {
              let parent = document.querySelector("#app > div")
              console.log(parent.children)
              for (let i=0;i< parent.children.length;i++) {
                const targetElement = document.querySelector("#app > div > div:nth-child("+(i+1)+") > form > div:nth-child(7) > div > div > div.cms-selected.cms-selected_bottom > div.card-wrapper");
                console.log(i)
                let newDiv = document.createElement("div");
                let cluster = document.getElementById("clusterData");
                newDiv.id = "Task " +(i+1);
                cluster.appendChild(newDiv);
                let previousState = {
                    textContent: targetElement.textContent,
                    childCount: targetElement.childElementCount
                };
                console.log(previousState)
                setInterval(() => {
                    const currentState = {
                        textContent: targetElement.textContent,
                        childCount: targetElement.childElementCount
                    };
                    if (currentState.textContent !== previousState.textContent || currentState.childCount !== previousState.childCount) {
                        let arr = currentState.textContent.split("   ").map((str) => str.trim());
                        console.log(arr);
                        document.getElementById("Task "+(i+1)).title = arr.join(";");
                        checkArrayForMatches(arr, obj1);
                        previousState = currentState;
                    }
                }, 100);
              }
              document.getElementById("pid").setAttribute("boolean", false);
            } else {
                console.log("nada")
            }
        });
    }
})();