# Web App From Scratch @cmda-minor-web 2021 - 2022

# Table of contents
1. [Introductie](#introductie)
2. [How to Install](#HowToInstall)
3. [Proces](#proces)
3. [Checklist](#checklist)
3. [Bronnen](#bronnen)

## Introductie <a name="introductie"></a>
Tijdens Web App From Scratch ben ik begonnen met het maken van een visite kaartje. Voor mij was dit vooral weer even oefenen met HTML, CSS en JS. Dit had ik namelijk een lange tijd niet gedaan.


### Link naar demo:
https://neinno.github.io/rijksmuseumapp/Rijksapp/


<img src="/readmeimgs/frontend.png" height=300px>

## Rijksmusuem app
Voor de eindopdracht van dit vak was er een keuze uit een paar user stories. De user story die ik gekozen heb is:
```
Als kunstliefhebber, wil ik thuis kunst uit het Rijksmuseum kunnen zoeken en bekijken, zodat ik ten alle tijden van kunst kan genieten.
```

De bedoeling is dat er een Single Page App (SPA) word gemaakt aan de hand van deze user story.

Bij deze userstory hoort de API van het rijksmuseum. 
[Link met infomratie over de API](https://www.rijksmuseum.nl/nl/onderzoek/onderzoek-doen/data)

[Object meta data](https://data.rijksmuseum.nl/object-metadata/)


### How to install: <a name="HowToInstall"></a>
Om dit project te instaleren op je eigen computer moet je deze repository clonen. Dit kan je doen door gebruik te maken github desktop, of gebruik te maken van je terminal en de volgende command uit te voeren.
```
git clone https://github.com/Neinno/rijksmuseumapp.git
```

Open daarna het project in VS code en zet live server aan om het vervolgens te bekijken op je eigen computer.


## Proces <a name="proces"></a>

### Design
Ik ben begonnen met het maken van een simpel design wat ik kan aanhouden tijdens het maken van de opdracht. Dit zorgt ervoor dat een bepaalde structuur volg in mijn styling. Ik heb ervoor gekozen om een zoekbalk, categorieën en een discover sectie toe te voegen. Ook is het de bedoeling dat er een detail pagina komt, die meer informatie geeft over het object of schilderij als er op geklikt word.

<img src="/readmeimgs/design.png" height=300px>


### Fetch data
Met het gebruik van Fetch kan ik informatie ophalen uit de API en deze tonen op mijn Single Page Application.

```Javascript
function fetchData() {

    const artContainer = document.querySelector('main > section:nth-of-type(2)')
    
    loader();

    const apikey = "YOUR API KEY";
    const url = `https://www.rijksmuseum.nl/api/nl/collection?key=`+apikey+`&p=10`;
    
    const data = fetch(url)

        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then((data) => {
            artContainer.textContent="";
            render(data)    

    }).catch((error) => {
        console.log(error);
    })
}
```

Dit haalt de data op van de API en laat 10 resultaten zien. Vervolgens heb ik met de functie "render()" ervoor gezorgd dat dit in een loop word gezet, en de juist styling krijgt.

### UI Stack
Om ervoor te zorgen dat de applicatie beter word om te gebruiken heb ik geprobeerd een UI stack toe te voegen. Ik heb gebruik gemaakt van de loading, error en empty state. De error en empty state heb ik samengevoegd. De partial state is eigenlijk hier niet van toepassing, omdat de pagina stopt als er geen objecten meer gevonden zijn.

<img src="/readmeimgs/uistack.png" height=300px>

Om dit ook ik de pagina te krijgen heb ik gebruik gemaakt van de functie "loader()". Dit zorgt ervoor dat de loading, en error/empty state werken.

```javascript
function loader() {
    const artContainer = document.querySelector('main > section:nth-of-type(2)')

    artContainer.textContent="";

    const createLoading = document.createElement("div")
    createLoading.setAttribute("id", "loading")
    artContainer.appendChild(createLoading);
};
```

### Activity Diagram
Een Activity Diagram


<img src="/readmeimgs/activityDiagram.png" height=500px>


### Modules
Om mijn code meer structuur te geven heb ik gebruik gemaakt van modules. Dit zorgt ervoor dat ik mijn functies in aparte bestanden kan zetten en krijg ik meer overzicht. Modules kan je gebruiken door dit in je HTML te zetten:

```html
<script type="module" src="script.js"></script>
```

Vervolgens kan je functies exporten en aanroepen in je script.js

```javascript
import { fetchData } from './api.js'
import { loader } from './loader.js'
import { render } from './render.js'
```

Daarna ben ik alle modules in een aparte map gaan zetten zodat alles overzichtelijk is.

### Routes
Mijn volgende stap was het toevoegen van routes. Dit is iets wat ik niet voor elkaar kreeg in het begin. Ik heb geprobeerd om het zelf te maken via hashchange. Na veel proberen heb ik het geprobeerd met routie. Dit is iets wat wel werkte. Dit is de code die ik heb gebruikt voor de router zodat de home, en de detail pagina werkt.

```js
export function router() {

    routie({
        'home': () => {
            fetchData();
        },
        'detail/:id': id => {
            renderDetail(id);
        }
    });

}
```

###Data Filteren en sorteren
Bij de rijksmuseum API krijg ik een hoop data terug waar ik bij mijn applicatie niks aan heb. Ik heb ervoor gekozen om vier verschillende dingen uit de API te halen.
- De object number zodat ik dit kan gebruiken om een detail pagina te maken. Dit gebruik ik ook als de hash daarvan.
- De titel. Dit laat ik zien op de overzicht pagina
- Het plaatje, zodat je het kunst object ook kan zien.
- De beschrijving. Deze heb ik nodig op de detail pagina.

Om dit voor elkaar te krijgen heb ik een nieuwe variabele aangemaakt genaamd filterData.

```js
const filterData = data.artObjects.map(art => ({
                number: art.objectNumber,
                title: art.title,
                image: art.webImage.url,
                description: art.description,
            }));
```

Deze stuur ik vervolgens weer door naar mijn render.js

```js
render(filterData)   
```

### Checklist <a name="checklist"></a>
- [x] Opdracht kiezen
- [x] Data fetch uit de API
- [x] Data laten zien op het scherm
- [x] States aanmaken
- [x] Zoek functie
- [x] Modules aanmaken
- [x] Structuur aanpassen
- [x] Routes toevoegen
- [x] Data filteren
- [ ] Fetch opschonen
- [ ] Categorien toevoegen
- [ ] Progressive enhancements
- [ ] Design verbeteren
- [ ] CSS aanpassen

### Bronnen <a name="bronnen"></a>
- [Main repository van dit vak](https://github.com/cmda-minor-web/web-app-from-scratch-2223)
- [RijksMuseum API](https://data.rijksmuseum.nl/object-metadata/api/)
- [Data Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Routie](http://projects.jga.me/routie/)
- [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)