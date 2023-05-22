document.addEventListener('DOMContentLoaded', function () {
    function colorTableCells(data) {
        const table = document.getElementById("table");
        const headerCol = table.rows[0].cells;
        for (let i = 1; i < table.rows.length; i++) {
          const rowName = table.rows[i].cells[0].textContent;
          for (let j = 1; j < table.rows[i].cells.length; j++) {
            const colName = headerCol[j].title;
            console.log(data[rowName] && data[rowName].findIndex((item) => item.index === colName) !== -1);
            console.log(data[rowName].findIndex((item) => item.index === colName) !== -1);
            console.log(data[rowName]);
            if (data[rowName] && data[rowName].findIndex((item) => item.index === colName) !== -1) {
              const color = data[rowName].find((item) => item.index === colName).color;
              table.rows[i].cells[j].className = color;
              console.log(data[rowName].find((item) => item.index === colName))
            }
          }
        }
      }
      
      
    document.getElementById("clear").addEventListener("click", function() {
        let a = document.getElementsByTagName("td");
        console.log(a)
        for (let i=0;i<a.length;i++) {
            a[i].className = ""
        }
    })
    document.getElementById("saveNewPolicies").addEventListener("click", function() {

        const inputElement = document.getElementById('myInput');
        const inputId = inputElement.getAttribute('id');

        // Get the input element's value
        const inputValue = inputElement.value;

        // Save the value to Chrome Storage using the input ID as the key
        chrome.storage.local.set({
            [inputId]: inputValue
        }, function () {
            console.log(`Value saved for input ${inputId}: ${inputValue}`);
        });
    })

    chrome.storage.local.get('myInput', function(data) {
        let elements = JSON.parse(data.myInput);
        console.log(elements)
        const table = document.querySelector('table');
        const tbody = table.querySelector('tbody');
        const rows = elements.length;
        const cols = elements.length;
        const matrix = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
        const colors = ['red', 'blue', 'green', ''];
    
        // create header row
        const headerRow = document.createElement('tr');
        headerRow.appendChild(document.createElement('th'));
        for (let i = 0; i < cols; i++) {
            const cell = document.createElement('th');
            cell.textContent = i;
            cell.title = elements[i];
            headerRow.appendChild(cell);
        }
        table.querySelector('thead').appendChild(headerRow);
    
        // create cells
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('tr');
            const headerCell = document.createElement('th');
            headerCell.textContent = elements[i];
            row.appendChild(headerCell);
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('td');
                cell.addEventListener('click', () => {
                    let bgCol = cell.className;
                    let newCol = colors[(1 + colors.indexOf(bgCol)) % colors.length];
                    const symmetricCell = table.rows[j + 1].cells[i + 1];
                    matrix[j][i] = matrix[i][j];
                    cell.className = newCol;
                    symmetricCell.className = newCol;
                });
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }

        const table3 = document.getElementById("table");
        const cells3 = table3.getElementsByTagName("td");
        
        for (let w = 0; w < cells3.length; w++) {
          cells3[w].addEventListener("mouseenter", function(event) {
            const row3 = event.target.parentNode;
            const colIndex3 = event.target.cellIndex;
            const rows3 = table3.rows;
            
            // Highlight row
            row3.classList.add("highlight");
            
            // Highlight column
            for (let q = 0; q < rows3.length; q++) {
                if (rows3[q].cells[colIndex3].className === "") {
                    rows3[q].cells[colIndex3].classList.add("highlight");
                }
            }
          });
          
          cells3[w].addEventListener("mouseleave", function(event) {
            const ro24 = event.target.parentNode;
            const colIndex4 = event.target.cellIndex;
            const rows4 = table3.rows;
            
            // Remove row highlight
            ro24.classList.remove("highlight");
            
            // Remove column highlight
            for (let b = 0; b < rows4.length; b++) {
              rows4[b].cells[colIndex4].classList.remove("highlight");
            }
          });
        }
        
        // Remove all highlights when mouse leaves table
        table3.addEventListener("mouseleave", function(event) {
          const rows5 = table3.rows;
          
          for (let m = 0; m < rows5.length; m++) {
            rows5[m].classList.remove("highlight");
            
            for (let n = 0; n < rows5[m].cells.length; n++) {
              rows5[m].cells[n].classList.remove("highlight");
            }
          }
        });

        let obj = {
          "key1":[{
            "color": "asd",
            "index": "value1"
          }, 
          {
            "color": "asd2",
            "index": "value2"
          } 
          //... 
        ]
        }

        document.getElementById("save").addEventListener("click", function () {
            const allRows = document.getElementsByTagName("tr");
            const objRows = {};
            for (let k = 1; k < allRows.length; k++) {
                const values = [];
                for (let l = 0; l < allRows[k].children.length; l++) {
                    if (allRows[k].childNodes[l].className !== "") {
                        values.push({
                            "index": allRows[0].childNodes[l].title,
                            "color": allRows[k].childNodes[l].className
                        })
                    }
                    objRows[elements[k - 1]] = values
                }

            }
            console.log(objRows)
            chrome.storage.local.set({"savedPolicies": objRows});
        });
        chrome.storage.local.get('savedPolicies', function(x) {
            let obj = x.savedPolicies;
            colorTableCells(obj);
            console.log(x.savedPolicies)
        });
      });

});