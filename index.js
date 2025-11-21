const josnDataArray = [];

async function getData(i) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + ((i+1)*10));
        const data = await response.json();
        josnDataArray[i] = data;
        document.getElementById("api-content").innerHTML = josnDataArray[i];
        console.log(data);


        document.getElementById("")

        return;

    } catch (error) {
        console.error('Error:', error);
    }
}


for (let i = 0; i < 10; i++){
    getData(i);
}


