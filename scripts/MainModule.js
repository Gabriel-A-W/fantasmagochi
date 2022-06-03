import { GameManager } from "./GameManager.js";
import { Fantasma } from "./componentes/fantasma/Fantasma.js";
import { BarAttrTracker } from "./componentes/gui/BarAttrTracker.js";
import { GuitaAttrTracker } from "./componentes/gui/GuitaAttrTracker.js";
import { FantasDataService } from "./servicios/FantasDataService.js";
import { FantasDataSaver } from "./componentes/FantasDataSaver.js";
import { MorfiService } from "./servicios/MorfiService.js";
import { MorfiMenu } from "./componentes/gui/MorfiMenu.js";

export const Main = async ()=>
{

    const morfi = await MorfiService.get();
    const morfiMenu = new MorfiMenu(morfi);

    const data = await FantasDataService.get();
  
    const fantasma         = new Fantasma(document.getElementById("juancho"), data);
    const guitaTracker     = new GuitaAttrTracker(document.getElementById("guitatracker"), fantasma.guita);
    const morfiTracker     = new BarAttrTracker(document.getElementById("morfitracker"), fantasma.saciedad, {text:"🍴", tip:"Hambre"});
    const tualeTracker     = new BarAttrTracker(document.getElementById("tualetracker"), fantasma.espacioEnPanza, {text:"🚽", tip:"Ganas de ir"});
    const cansancioTracker = new BarAttrTracker(document.getElementById("cansanciotracker"), fantasma.energia, {text:"💤",  tip:"Energia"});
    const felicidadTracker = new BarAttrTracker(document.getElementById("felicidadtracker"), fantasma.felicidad,  {text:"🙂", tip:"Felicidad"});
    const fantasDataSaver  = new FantasDataSaver(fantasma);

    document.body.appendChild(morfiMenu.elementoHtml);

    tualeTracker.addEventListener("click", () => {
        fantasma.hacerPopo();
    });
    
    cansancioTracker.addEventListener("click", () => {
        fantasma.dormir();
    });
    
    morfiTracker.addEventListener("click", async () => {
       morfiMenu.show().then((seleccion) => {
            if(fantasma.guita.valor >= seleccion.precio)
            {
                fantasma.alimentar(seleccion);
                fantasma.guita.valor -= seleccion.precio;
                console.log(fantasma.guita);
            }
       }); 
    });

     
    GameManager.actualizables.push(fantasma,
        felicidadTracker,
        morfiTracker,
        tualeTracker,
        cansancioTracker,
        guitaTracker,
        fantasDataSaver
    );
    console.log(GameManager);
    GameManager.comenzar();

    return fantasma;
};