import { downloadZip } from "https://cdn.jsdelivr.net/npm/client-zip/index.js"

const API_KEY = "$2a$10$JcPmO9ZShvIWdhe5DXQNEuYurKuQCThNVJSlh4afL4UHnQO3xGDJy";

const mod_search_input = document.querySelector('.mod-search-input');
const mod_container = document.querySelector('.mod-container');
const search_button = document.querySelector('.search-btn');
const add_mod_card = document.querySelector('.add-mod-card');
const mod_menu_dialog = document.querySelector('.add-mod-menu');
const mod_menu_close = document.querySelector('.mod-menu-close');
const mod_list_container = document.querySelector('.mod-list');
let mod_list = [];

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

    // Check if mod is already in list
    const modAlreadyInList = mod_list.some((element) => {
        return element.id === mod.id;
    });

    const container = document.createElement('button');
    container.classList.add('mod');

    if (modAlreadyInList) {
        container.classList.add('mod-already-added');
        container.disabled = true;
        container.title = "Mod already added to modpack";
    }

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


    container.cp_modData = mod;
    container.addEventListener('click', onModClicked);

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


add_mod_card.addEventListener('click', (e) => {
    mod_menu_dialog.show();
});

mod_menu_close.addEventListener('click', (e) => {
    mod_menu_dialog.close();
});

function onModClicked(event) {
    mod_menu_dialog.close();
    const mod = event.currentTarget.cp_modData;

    event.currentTarget.classList.add('mod-already-added');
    event.currentTarget.disabled = true;
    event.currentTarget.title = "Mod already added to modpack";

    mod_list.push(mod);
}