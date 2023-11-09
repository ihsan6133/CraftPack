import { downloadZip } from "https://cdn.jsdelivr.net/npm/client-zip/index.js"

const API_KEY = "$2a$10$JcPmO9ZShvIWdhe5DXQNEuYurKuQCThNVJSlh4afL4UHnQO3xGDJy";

const mod_search_input = document.querySelector('.mod-search-input');
const mod_container = document.querySelector('.mod-container');
const search_button = document.querySelector('.search-btn');


async function searchMods(searchTerm) {
    const response = await fetch(`https://api.curseforge.com/v1/mods/search?gameId=432&sortField=6&sortOrder=desc&searchFilter=${searchTerm}`, {
        headers: {
            'x-api-key': API_KEY
        }
    });
    const data = await response.json();
    return data.data;
}

function generateModElement(mod) {
    const container = document.createElement('div');
    container.classList.add('mod');

    const thumbnail = document.createElement('img');
    thumbnail.classList.add('mod-thumbnail');
    thumbnail.src = mod.logo.thumbnailUrl;

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('mod-info-container');

    const name = document.createElement('div');
    name.classList.add('mod-name');
    name.textContent = mod.name;

    const description = document.createElement('div');
    description.classList.add('mod-description');
    description.textContent = mod.summary;


    infoContainer.append(name, description);
    container.append(thumbnail, infoContainer);

    return container;
}

async function processSearch(searchTerm) {
    const mods = await searchMods(searchTerm);

    mod_container.replaceChildren();
    mods.forEach(element => {
        const mod = generateModElement(element);
        mod_container.appendChild(mod);        
    });
    console.log(mods);
}




mod_search_input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        processSearch(mod_search_input.value);
    }
});

search_button.addEventListener('click', (e) => {
    processSearch(mod_search_input.value);
});

