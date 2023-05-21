import { requirePage } from "./requirer";

export default function router() {
    const url = new URL(window.location.href);

    let page = url.pathname.replace("/", "");
    
    if (page === undefined || page === null || page === '') page = 'home';

    requirePage(page);
}