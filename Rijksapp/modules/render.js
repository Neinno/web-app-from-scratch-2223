const detailSection = document.getElementById("detail-page");
const mainContainer = document.querySelector('main');
const headerContainer = document.querySelector('header')


export function render(filterData) {   
    detailSection.innerHTML = "";
    const artContainer = document.querySelector('main > section:nth-of-type(1)');
    const objects = filterData;
    artContainer.style.display = "grid";
    detailSection.classList.remove("detail-slide")

    objects.forEach(art => {
        const createLink = document.createElement("a");
        createLink.setAttribute("href", "#detail/" + art.number)
        artContainer.appendChild(createLink)

        const createFigure = document.createElement("figure");
        createLink.appendChild(createFigure);

        const createFigcaption = document.createElement("figcaption");
        createFigcaption.textContent = art.title;
        createFigure.appendChild(createFigcaption);

        const createImage = document.createElement("img");
        createImage.src = art.image;
        createFigure.appendChild(createImage);
    })
};

export function renderDetail(id) {
    const urlApi = "https://www.rijksmuseum.nl/api/nl/collection";
    const apikey = "0TyrFANJ";
    const url = `${urlApi}/${id}?key=${apikey}`
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const object = data.artObject;
        const title = object.title;
        const image = object.webImage.url;
        const description = object.description;
        mainContainer.style.display = "none";
        headerContainer.style.display = "none";

        const createTitle = document.createElement("h1");
        createTitle.textContent = title;
        detailSection.appendChild(createTitle)
  
        const createImg = document.createElement("img");
        createImg.src = image;
        detailSection.appendChild(createImg)
  
        const createDescription = document.createElement("p");
        createDescription.textContent = description;
        detailSection.appendChild(createDescription)

        const createButton = document.createElement("button")
        createButton.textContent = "sluiten";
        createButton.addEventListener("click", () => {
          history.back();
          detailSection.classList.remove("detail-slide")
          detailSection.innerHTML = "";
          mainContainer.style.display = "block";
          headerContainer.style.display = "block";
        })
        detailSection.appendChild(createButton)

        detailSection.classList.add("detail-slide")
      })
      .catch((error) => {
        console.log(error);
    })
  }