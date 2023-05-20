import { requirePartial } from "./requirer";

async function insertPartials(body) {
    [...body.querySelectorAll("div span[data-partial]")].forEach(async placeholder => {
        const partial_name = placeholder.getAttribute("data-partial");
        const partial_element = await requirePartial(partial_name);
        placeholder.insertAdjacentElement("afterend", partial_element.body.childNodes[0]);
        placeholder.remove();
    }) 
}

export default async function buildPageFromElement(element) {
    await insertPartials(element.body);
    document.querySelector("#root").insertAdjacentElement("beforeend", element.body.childNodes[0]);
}