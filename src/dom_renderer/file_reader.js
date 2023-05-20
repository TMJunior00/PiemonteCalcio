import handleError from "./error_handler";

async function fetchFile(file_path){
    return await fetch(`${file_path}.html`);
}

async function parseFile(file_promise){
    let html = await file_promise.text()  
    return new DOMParser().parseFromString(html, "text/html");
}

export default async function getFileContentAsElement(path, type) {
    let file_promise = await fetchFile(path) ;
    if (!file_promise.ok) handleError(file_promise, type);

    return parseFile(file_promise);
}