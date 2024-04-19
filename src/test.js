export async function test() {
    console.log(document.URL);
    console.log(document.baseURI);
    return new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler((res) => {
                resolve(res);
            })
            .withFailureHandler((err) => {
                reject(err);
            })
            .getID();
    });
}
