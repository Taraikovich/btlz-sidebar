export function test() {
    console.log(document.URL);
    console.log(document.baseURI);
    google.script.run.withSuccessHandler((data) => {
        console.log(data);
    }).getID();
}
