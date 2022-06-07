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

    removeClass(str)
    {
        this.elementoHtml.classList.remove(str);
    }

    addClass(str)
    {
        this.elementoHtml.classList.add(str);
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