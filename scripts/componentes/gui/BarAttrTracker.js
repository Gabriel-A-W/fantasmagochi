import { EmojiRepo } from "../../utiles/EmojiRepo.js";
import { HtmlElementBuilder } from "../../utiles/HtmlElementBuilder.js";
import { AttrTracker } from "./AttrTracker.js";

export class BarAttrTracker extends AttrTracker
{
    constructor(parenthtml, trackedObj, opts)
    {
       
        super(parenthtml, trackedObj);
        this.opts = {text:"", min:0, max:100, tip:"", limiteFader:20};
        
        this.asingnarOpts(opts);
  
        //Principal
         
        
        //Barra
        this.barraContent = new HtmlElementBuilder("div").appendChild(this.crearIcono(this.opts.text)).get();
        this.barra = new HtmlElementBuilder("div").addClass("bar").appendChild(this.barraContent).get();
  

        //Foreground
        this.foreground = new HtmlElementBuilder("div").addClass("fg").appendChild(this.crearIcono(this.opts.text)).get();
   
        new HtmlElementBuilder(this.elementoHtml)
        .addClass("statusTracker",
                  "sombreado",
                  "border-top",
                  "border-end",
                  "border-bottom",
                  "border-3",
                  "rounded-end")
        .setAttribute("data-bs-toggle", "tooltip")
        .setAttribute("data-bs-placement", "right")
        .setAttribute("title", this.opts.tip)
        .appendChild(this.barra)
        .appendChild(this.foreground);

        
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
            this.elementoHtml.classList.add("anim-fader");
        }
        else
        {
            this.elementoHtml.classList.remove("anim-fader");
        }
    }



}
