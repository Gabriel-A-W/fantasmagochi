import { Actualizable } from "../../../Actualizable.js";
import { HtmlElementBuilder } from "../../../utiles/HtmlElementBuilder.js";

export class FantasmaCuerpo extends Actualizable
{

    constructor(parent)
    {
        super();
        this.elementoHtml = new HtmlElementBuilder("div").addClass("cuerpo").get();

        parent.appendChild(this.elementoHtml);
    }


    toggleEnojo()
    {
        this.elementoHtml.classList.toggle("enojado");
    }

    toggleMuerto()
    {
        this.elementoHtml.classList.toggle("muerto");
    }

}