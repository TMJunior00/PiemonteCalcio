import { requirePartial } from "./requirer";

async function insertPartials(body) {
    [...body.querySelectorAll("div span[data-partial]")].forEach(async placeholder => {
        const partial_name = placeholder.getAttribute("data-partial");
        const partial_element = (await requirePartial(partial_name)).body.childNodes[0];
        
        replacePartialPlaceholders(partial_element, placeholder)
        insertPartialChildren(partial_element, placeholder)

        placeholder.insertAdjacentElement("afterend", partial_element);
        placeholder.remove();
    }) 
}

function replacePartialPlaceholders(partial_element, placeholder_element) {
    const placeholders = [...partial_element.innerHTML.matchAll(/(?<=\$\$)(.*)(?=\$\$)/gm)];
    if(placeholders.length === 0) return;
    
    placeholders.forEach(placeholder => partial_element.innerHTML = partial_element.innerHTML.replaceAll(`$$${placeholder[0]}$$`, placeholder_element.getAttribute(`data-${placeholder[0]}`)))
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