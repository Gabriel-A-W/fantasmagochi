import { HtmlElementBuilder } from "../../../utiles/HtmlElementBuilder.js"; 
import { FantasmaCuerpo } from "../../fantasma/partes/FantasmaCuerpo.js";
import { FantasmaOjoCollection } from "../../fantasma/partes/FantasmaOjoCollection.js";
import { FantasmaPies } from "../../fantasma/partes/FantasmaPies.js";

export class FantasBtn 
{

    constructor(parent)
    {
        this.elementoHtml = new HtmlElementBuilder("div").addClass("fantasma", "mini").get();
        this.cuerpo = new FantasmaCuerpo(this.elementoHtml);
        this.ojos = new FantasmaOjoCollection(this.cuerpo.elementoHtml);
        this.pies = new FantasmaPies(this.elementoHtml);


        this.cuerpo.elementoHtml.classList.add("mini");
        this.ojos.elementoHtml.classList.add("mini");
        this.ojos.izquierdo.elementoHtml.classList.add("mini");
        this.ojos.derecho.elementoHtml.classList.add("mini");
        this.pies.elementoHtml.style = "height:10px";
        this.pies.addClass("mini");
        this.ojos.abrir(); 
        parent.appendChild(this.elementoHtml);
    }

    addClass(str)
    {
        this.cuerpo.addClass(str);
        this.pies.addClass(str);
    }

    removeClass(str)
    {
        this.cuerpo.removeClass(str);
        this.pies.removeClass(str);
    }


    



 


}