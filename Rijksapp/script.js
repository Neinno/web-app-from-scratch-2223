import { fetchData } from './api.js'
import { loader } from './loader.js'
import { render } from './render.js'

fetchData();
render();
loader();

function routeChanged() {
    console.log("Now viewing this art object...")
}

window.addEventListener("hashchange", routeChanged)