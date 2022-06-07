import { GameManager } from "./GameManager.js"; 
import { FantasModal } from "./componentes/gui/FantasModal.js";
import { EscenasManager } from "./escenas/EscenasManager.js";
import { EscenaPrincipal } from "./escenas/impl/EscenaPrincipal.js";
 

 function ObtenerMOTD()
 {
    return fetch("htmls/motd.html").then(r => r.text());
 }


export const Main = async ()=>
{
    EscenasManager.elementoHtml = document.getElementById("escenario");
    GameManager.actualizables.push(EscenasManager);
    EscenasManager.encolar(new EscenaPrincipal());

    FantasModal.show({
        titulo:"Bienvenido a Fantasmagochi",
        body: await ObtenerMOTD(),
        isStatic: true,
        onclose: ()=>{  GameManager.comenzar(); }
    });    
};