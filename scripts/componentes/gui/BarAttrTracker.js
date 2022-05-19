import { Actualizable } from "../../Actualizable.js";
import { EmojiRepo } from "../../utiles/EmojiRepo.js";
import { AttrTracker } from "./AttrTracker.js";

export class BarAttrTracker extends AttrTracker
{
    constructor(parenthtml, trackedObj, opts)
    {
       
        super(parenthtml, trackedObj);
        this.opts = {text:"", min:0, max:100, tip:"", limiteFader:20};
        
        this.asingnarOpts(opts);
  
        //Principal
        this.elementoHtml.className = "statusTracker sombreado  border-top border-end border-bottom border-3 rounded-end";
        
        //Barra
        this.barra = document.createElement("div");
        this.barra.className = "bar";
        this.barraContent = document.createElement("div");
        this.barra.appendChild(this.barraContent);

        //Foreground
        this.foreground = document.createElement("div");
        this.foreground.className = "fg";

        this.foreground.appendChild(this.crearIcono(this.opts.text));
        this.barraContent.appendChild(this.crearIcono(this.opts.text));
        
        
        this.elementoHtml.appendChild(this.barra);
        this.elementoHtml.appendChild(this.foreground);
        
        this.elementoHtml.setAttribute("data-bs-toggle","tooltip");
        
        this.elementoHtml.setAttribute("data-bs-placement","right");
        this.elementoHtml.setAttribute("title",this.opts.tip);

        
        new bootstrap.Tooltip(this.elementoHtml);
    }


    crearIcono(text)
    {
        let rv = EmojiRepo.crearImgElement(text);
        rv.classList.add("statusTrackerIcon");

        return rv;
    }
   

    actualizar(elapsed)
    {
        let curVal = this.valor;
        this.barra.style.height = `${curVal}%`;
        if(curVal < this.opts.limiteFader )
        {
            if( !this.elementoHtml.classList.contains("anim-fader"))
            {
                this.elementoHtml.classList.add("anim-fader");
            }
        }
        else
        {
            if(this.elementoHtml.classList.contains("anim-fader"))
            {
                this.elementoHtml.classList.remove("anim-fader");
            }
        }
    }



}
