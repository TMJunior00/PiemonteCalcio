import getFileContentAsElement from "./file_reader";
import buildPageFromElement from "./page_builder";

export async function requirePage(page_name) {
    const PAGES_PATH = '/src/pages';
    const element = await getFileContentAsElement(`${PAGES_PATH}/${page_name}`, "page");
    buildPageFromElement(element);
} 

export function requirePartial(partial_name) {
    const PARTIALS_PATH = '/src/partials';
    return getFileContentAsElement(`${PARTIALS_PATH}/${partial_name}`, "partial");
} 