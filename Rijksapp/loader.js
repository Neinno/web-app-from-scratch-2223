export function loader() {
    const artContainer = document.querySelector('main > section:nth-of-type(2)')

    artContainer.textContent="";

    const createLoading = document.createElement("div")
    createLoading.setAttribute("id", "loading")
    artContainer.appendChild(createLoading);
};