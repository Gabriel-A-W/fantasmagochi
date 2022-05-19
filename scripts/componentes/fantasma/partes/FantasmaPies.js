import { Actualizable } from "../../../Actualizable.js";

export class FantasmaPies extends Actualizable
{
    constructor(parent)
    {
        super();
        this.elementoHtml = document.createElement("div");
        this.elementoHtml.classList.add("pies");
        
        this.animadorPiesDelantero = document.createElement("div");
        this.animadorPiesTrasero = document.createElement("div");
        
        this.animadorPiesDelantero.classList.add("animador-delantero");
        this.animadorPiesTrasero.classList.add("animador-trasero");
      

        this.patitasDelanteras = [];
        this.patitasTraseras = [];
        
        for(let i = 0; i < 9; i++ )
        {
          let patitaDelantera = document.createElement("div");
          let patitaTrasera = document.createElement("div");
          
          patitaDelantera.classList.add("patita");
          patitaTrasera.classList.add("patita");
        
          this.animadorPiesDelantero.appendChild(patitaDelantera);
          this.animadorPiesTrasero.appendChild(patitaTrasera);

          this.patitasDelanteras.push(patitaDelantera);
          this.patitasTraseras.push(patitaTrasera);
        }

        this.elementoHtml.appendChild(this.animadorPiesTrasero);
        this.elementoHtml.appendChild(this.animadorPiesDelantero);

        parent.appendChild(this.elementoHtml);

    }
    
}