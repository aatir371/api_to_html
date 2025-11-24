const josnDataArray = [];

// function that will assign values in table

// sepatration on concern principle (each function should serld serve only one particular purposed)

// form - table (cloumn (actions)) 2 buttons (edit | delete) - reflect updated changes on table

//crerate a separate foprm (when edit is pressed - )


function appendButton(row){
    var td = document.createElement("td");

    var div = document.createElement("div");
    div.setAttribute("class", "table-btn-container");
    td.appendChild(div);

    var editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit"
    editBtn.setAttribute("class", "edit-btn");
    div.appendChild(editBtn);

    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete"
    deleteBtn.setAttribute("class", "delete-btn");
    div.appendChild(deleteBtn);

    row.appendChild(td);
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
    appendButton(row);

    tableBody.appendChild(row);

}

async function getData(i) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + ((i+1)*10));
        josnDataArray[i] = await response.json();
        console.log(josnDataArray[i]);

        addDataFieldInTable(i);

        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}


for (let i = 0; i < 10; i++){
    getData(i);
    // addDataFieldInTable(josnDataArray[i]);
}





