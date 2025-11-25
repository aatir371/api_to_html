var josnDataArray = [];
var currentlyProcessingJsonRowId;  // MDS  ***********************************


// function that will assign values in table

// sepatration on concern principle (each function should serld serve only one particular purposed)

// form - table (cloumn (actions)) 2 buttons (edit | delete) - reflect updated changes on table

// crerate a separate form (when edit is pressed  )

////////////////////////////////////////////////////////////////////////////////////////////////////
// function getJsonDataFromId(rowId){
//     josnDataArray.forEach(josnData => {
//         if (josnData.id == rowId){
//             console.log(josnData);
//             currentlyProcessingJsonData = josnData;
//             return currentlyProcessingJsonData;
//         }
//     });
//     return null;
// }

////// the above function failed bcz it always returns null and (for somer reason) forEach function does not stops at return (if the condition has meet)
////////////////////////////////////////////////////////////////////////////////////////////////////


document.getElementById('form-submit-btn').onclick = function() {

    const updatedTitle = document.getElementById('form-title').value;
    const updatedBody = document.getElementById('form-body').value;

    for (let i = 0; i < josnDataArray.length; i++) {
        if (josnDataArray[i].id == currentlyProcessingJsonRowId){
            josnDataArray[i].title = updatedTitle;
            josnDataArray[i].body = updatedBody;
            document.getElementById(currentlyProcessingJsonRowId).querySelector(".title").innerHTML = updatedTitle;
            document.getElementById(currentlyProcessingJsonRowId).querySelector(".api-body").innerHTML = updatedBody;
        }
    }

    document.getElementById('form-submit-btn').disabled = true;
    document.getElementById("update-form").reset();
}





function recreateTable(){
    document.querySelector("#api-table tbody").innerHTML = "";

    for (let i = 0; i < josnDataArray.length; i++) {
        addDataFieldInTable(i);
    }
}



function editFunc(btnId){
    document.getElementById(btnId).onclick = function(){
        // add values of ID in form
        const rowId = btnId.split("-").pop();
        currentlyProcessingJsonRowId = rowId;
        // const editableJsonData = getJsonDataFromId(rowId); 
        const editableJsonData = josnDataArray.find(josnData => josnData.id == rowId); 

        // if(editableJsonData == null){
        //     console.error(`Error: The ID: ${rowId} does not exists in the table.`);
        // }
        
        // josnDataArray.forEach(josnData => {
        //     if (josnData.id == rowId){
        //         editableJsonData = josnData;
        //     }
        // });

        console.log(editableJsonData);
        
        document.getElementById('form-id').setAttribute("value", editableJsonData.id);
        document.getElementById('form-userId').setAttribute("value", editableJsonData.userId);
        document.getElementById('form-title').value = editableJsonData.title;
        document.getElementById('form-body').value = editableJsonData.body;

        document.getElementById('form-submit-btn').disabled = false;
        return;
    }
}


function deleteFunc(btnId){
    document.getElementById(btnId).onclick = function () {
        const rowId = btnId.split("-").pop();
        const numRowId = Number(rowId)

        // delete the row from josnDataArray and html
        const tempJosnDataArray = josnDataArray.filter(item => item.id !== numRowId);
        josnDataArray = tempJosnDataArray;

        recreateTable();

        return;
    }
}


// function to reproducce teh table

async function createBtnElement(row, editBtnId, deleteBtnId) {
    const td = document.createElement("td");

    const div = document.createElement("div");
    div.setAttribute("class", "table-btn-container");
    td.appendChild(div);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit"
    editBtn.setAttribute("class", "edit-btn");
    editBtn.setAttribute("id", editBtnId);
    div.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete"
    deleteBtn.setAttribute("class", "delete-btn");
    deleteBtn.setAttribute("id", deleteBtnId);
    div.appendChild(deleteBtn);

    row.appendChild(td);
    return;
}

async function appendButton(row, rowId){
    const editBtnId = `edit-btn-${rowId}`;
    const deleteBtnId = `delete-btn-${rowId}`;

    await createBtnElement(row, editBtnId, deleteBtnId);

    editFunc(editBtnId);
    deleteFunc(deleteBtnId);

    return;
}

function addDataFieldInTable(index){

    const jsonObject = josnDataArray[index];

    const tableBody = document.querySelector("#api-table tbody");

    const row = document.createElement("tr");
    row.setAttribute("id", jsonObject.id);
    row.innerHTML = `
        <th scope="row" class="id">${jsonObject.id}</th>
        <td class="userId">${jsonObject.userId}</td>
        <td class="title">${jsonObject.title}</td>
        <td class="api-body">${jsonObject.body}</td>
    `;
    appendButton(row, jsonObject.id);

    tableBody.appendChild(row);
    return;
}

async function getData(i) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + ((i+1)*10));
        josnDataArray[i] = await response.json();
        // console.log(josnDataArray[i]);

        addDataFieldInTable(i);

        return josnDataArray[i];

    } catch (error) {
        console.error('Error:', error);
    }
}



for (let i = 0; i < 10; i++){
    getData(i);
}

