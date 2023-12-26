const apiUrl = " https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
/*Function that makes an api call to get the relevant data*/
async function getApi(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response) {
            throw new Error("Error");
        }
        const data = response.json();
        return data;
    }
    catch {
        console.log("Could not make api call.");
    }
}
export { getApi, apiUrl };
