

async function getData(i) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + (i*10));
        const data = await response.json();
        console.log(data);
        document.getElementById("api-content").innerHTML = data.userId;
        return;

    } catch (error) {
        console.error('Error:', error);
    }
}


for (let i = 1; i < 11; i++){
    getData(i);
}


