import { Actualizable } from "../../../Actualizable.js";
import { EmojiRepo } from "../../../utiles/EmojiRepo.js";
import {Enum} from "../../../utiles/Enum.js";

export const EstadoBocaFantasma = new Enum("Abierta", "Cerrada", "Triste", "Sonrisa", "Sorpresa");

export class FantasmaBoca extends Actualizable
{
    constructor(parent)
    {
        super();
        let placeHolderDiv = document.createElement("div");
        
        placeHolderDiv.className = "position-absolute top-0 start-100 translate-middle";
        

        this.estado = EstadoBocaFantasma.Cerrada;
        this.elementoHtml = document.createElement("div");
        this.elementoHtml.appendChild(placeHolderDiv);
        this.placeHolder = document.createElement("img");
        this.placeHolder.className = "bocaPlaceHolder invisible";
        placeHolderDiv.appendChild(this.placeHolder);
        
        parent.appendChild(this.elementoHtml);
        this.reset();
    }

    setPlaceHolder(txt, mostrar=false)
    {
        this.placeHolder.src = EmojiRepo.getSvgUrl(txt, true);

        if(mostrar)
        {
            this.mostrarPlaceHolder();
        }    
    }


    mostrarPlaceHolder()
    {
        if(this.placeHolder.classList.contains("invisible"))
        {
            this.placeHolder.classList.remove("invisible");
        }
    }

    esconderPlaceHolder()
    {
        if(!this.placeHolder.classList.contains("invisible"))
        {
            this.placeHolder.classList.add("invisible");
        }
    }

    reset()
    {
        this.elementoHtml.className = "";
        this.elementoHtml.classList.add("boca");
        this.estado = EstadoBocaFantasma.Abierta;
    }

    cerrar()
    {
        if(this.estado !== EstadoBocaFantasma.Cerrada)
        {
            this.reset();
            this.estado = EstadoBocaFantasma.Cerrada;
            this.elementoHtml.classList.add("cerrada");
        }
    }

    abrir()
    {
        if(this.estado !== EstadoBocaFantasma.Abierta)
        {
            this.reset();
        }
    }

    sonreir()
    {
        if(this.estado !== EstadoBocaFantasma.Sonrisa)
        {
            this.reset();
            this.estado = EstadoBocaFantasma.Sonrisa;
            this.elementoHtml.classList.add("sonrisa");
        }
    }

    entristecer()
    {
        if(this.estado !== EstadoBocaFantasma.Triste)
        {
            this.reset();
            this.estado = EstadoBocaFantasma.Triste;
            this.elementoHtml.classList.add("triste");
        }
    }

    sorprender()
    {
        if(this.estado !== EstadoBocaFantasma.Sorpresa)
        {
            this.reset();
            this.estado = EstadoBocaFantasma.Sorpresa;
            this.elementoHtml.classList.add("sorpresa");
        }
    }

}