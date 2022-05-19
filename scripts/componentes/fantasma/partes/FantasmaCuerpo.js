import { Actualizable } from "../../../Actualizable.js";

export class FantasmaCuerpo extends Actualizable
{

    constructor(parent)
    {
        super();
        this.elementoHtml = document.createElement("div");
        this.elementoHtml.classList.add("cuerpo");
 
        parent.appendChild(this.elementoHtml);
    }


    toggleEnojo()
    {
        if(!this.elementoHtml.classList.contains("enojado"))
        {
            this.elementoHtml.classList.add("enojado");
        }
        else
        {
            this.elementoHtml.classList.remove("enojado");
        }
    }

    toggleMuerto()
    {
        if(!this.elementoHtml.classList.contains("muerto"))
        {
            this.elementoHtml.classList.add("muerto");
        }
        else
        {
            this.elementoHtml.classList.remove("muerto");
        }
    }

}