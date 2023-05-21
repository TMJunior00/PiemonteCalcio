import { requirePartial } from "./requirer";

async function insertPartials(body) {
    [...body.querySelectorAll("div span[data-partial]")].forEach(async placeholder => {
        const partial_name = placeholder.getAttribute("data-partial");
        const partial_element = (await requirePartial(partial_name)).body.childNodes[0];
        
        insertPartialChildren(partial_element, placeholder)

        placeholder.insertAdjacentElement("afterend", partial_element);
        placeholder.remove();
    }) 
}

function insertPartialChildren(partial_element, placeholder) {
    const partial_slot = partial_element.querySelector("span[data-slot]");
    if(partial_slot === null || partial_slot.length === 0) return;
        
    [...placeholder.children].forEach(e => partial_slot.insertAdjacentElement('afterend', e));
    partial_slot.remove();
}

export default async function buildPageFromElement(element) {
    await insertPartials(element.body);
    document.querySelector("#root").insertAdjacentElement("beforeend", element.body.childNodes[0]);
}