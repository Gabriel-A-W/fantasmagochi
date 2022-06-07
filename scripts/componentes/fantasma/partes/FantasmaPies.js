import { Actualizable } from "../../../Actualizable.js";
import { HtmlElementBuilder } from "../../../utiles/HtmlElementBuilder.js";

export class FantasmaPies extends Actualizable
{
    constructor(parent)
    {
        super();
        
        
        this.animadorPiesDelantero =  new HtmlElementBuilder("div").addClass("animador-delantero").get();
        this.animadorPiesTrasero =  new HtmlElementBuilder("div").addClass("animador-trasero").get();
 
        this.patitasDelanteras = [];
        this.patitasTraseras = [];
        
        for(let i = 0; i < 9; i++ )
        {
          let patitaDelantera = new HtmlElementBuilder("div").addClass("patita").get();
          let patitaTrasera = new HtmlElementBuilder("div").addClass("patita").get();
        
          this.animadorPiesDelantero.appendChild(patitaDelantera);
          this.animadorPiesTrasero.appendChild(patitaTrasera);

          this.patitasDelanteras.push(patitaDelantera);
          this.patitasTraseras.push(patitaTrasera);
        }


        this.elementoHtml = new HtmlElementBuilder("div").addClass("pies")
        .appendChild(this.animadorPiesTrasero)
        .appendChild(this.animadorPiesDelantero)
        .get();
        
        parent.appendChild(this.elementoHtml);
    }

    removeClass(str)
    {
        this.patitasDelanteras.forEach((p) => {
            p.classList.remove(str);

        });

        this.patitasTraseras.forEach((p) => {
            p.classList.remove(str); 
        });
    }

    addClass(str)
    {
        this.patitasDelanteras.forEach((p) => {
            p.classList.add(str);

        });

        this.patitasTraseras.forEach((p) => {
            p.classList.add(str); 
        });
    }
    
}