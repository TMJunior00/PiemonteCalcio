import { requirePage } from "./requirer";

export default function handleError(error, type) {
    if (type === "partial") throw new Error(`Partial Not Found: ${error.url}`);
    
    requirePage(`errors/${error.status}`)
}