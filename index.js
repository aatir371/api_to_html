var josnDataArray = [];

// function that will assign values in table

// sepatration on concern principle (each function should serld serve only one particular purposed)

// form - table (cloumn (actions)) 2 buttons (edit | delete) - reflect updated changes on table

// crerate a separate form (when edit is pressed  )



function recreateTable(){
    

    for (let i = 0; i < josnDataArray.length; i++) {
        addDataFieldInTable(i);
    }
}




function editFunc(btnId){
    document.getElementById(btnId).onclick = function(){
        // add values of ID in form
        console.log(btnId);
    }
}


function deleteFunc(btnId){
    document.getElementById(btnId).onclick = function () {
        const rowId = btnId.split("-").pop();
        const numRowId = Number(rowId)

        // delete a row from html and josnDataArray
        const tempJosnDataArray = josnDataArray.filter(item => item.id !== numRowId);
        josnDataArray = tempJosnDataArray;

        document.querySelector("#api-table tbody").innerHTML = "";
        recreateTable();

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

