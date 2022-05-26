import { Actualizable } from "../../../Actualizable.js";
import { EmojiRepo } from "../../../utiles/EmojiRepo.js";
import {Enum} from "../../../utiles/Enum.js";
import { HtmlElementBuilder } from "../../../utiles/HtmlElementBuilder.js";

export const EstadoBocaFantasma = new Enum("Abierta", "Cerrada", "Triste", "Sonrisa", "Sorpresa");

export class FantasmaBoca extends Actualizable
{
    constructor(parent)
    {
        super();
 
        this.placeHolder = new HtmlElementBuilder("img").addClass("bocaPlaceHolder", "invisible").get();
        this.elementoHtml = new HtmlElementBuilder("div").appendChild(new HtmlElementBuilder("div").addClass("position-absolute", 
                                                                    "top-0", 
                                                                    "start-100", 
                                                                    "translate-middle")
                                                                    .appendChild(this.placeHolder).get()).get();

        this.estado = EstadoBocaFantasma.Cerrada;
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
        this.placeHolder.classList.remove("invisible");
    }

    esconderPlaceHolder()
    {
        this.placeHolder.classList.add("invisible");
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