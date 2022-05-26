import { GameManager } from "./GameManager.js";
import { Fantasma } from "./componentes/fantasma/Fantasma.js";
import { BarAttrTracker } from "./componentes/gui/BarAttrTracker.js";
import { GuitaAttrTracker } from "./componentes/gui/GuitaAttrTracker.js";
import { FantasDataService } from "./servicios/FantasDataService.js";
import { FantasDataSaver } from "./componentes/FantasDataSaver.js";

export const Main = ()=>
{
    FantasDataService.get().then((data) => {
        let fantasma = new Fantasma(document.getElementById("juancho"), data);
        document.getElementById("tualetracker").addEventListener("click", () => {
            fantasma.hacerPopo();
        });
    
        document.getElementById("cansanciotracker").addEventListener("click", () => {
            fantasma.dormir();
        });
    
        document.getElementById("morfitracker").addEventListener("click", () => {
            fantasma.alimentar({grafico:"🌭", saciedad: 50, ocupa: 80});
        });

        GameManager.actualizables.push(fantasma);
        GameManager.actualizables.push(
            new BarAttrTracker(document.getElementById("birratracker"), fantasma.felicidad,  {text:"🙂", tip:"Felicidad"}),
            new BarAttrTracker(document.getElementById("morfitracker"), fantasma.saciedad, {text:"🍴", tip:"Hambre"}),
            new BarAttrTracker(document.getElementById("tualetracker"), fantasma.espacioEnPanza, {text:"🚽", tip:"Ganas de ir"}),
            new BarAttrTracker(document.getElementById("cansanciotracker"), fantasma.energia, {text:"💤",  tip:"Energia"}),
            new GuitaAttrTracker(document.getElementById("guitaTracker"), fantasma.guita),
            new FantasDataSaver(fantasma)
        );
        console.log(GameManager);
        GameManager.comenzar();



    });
};