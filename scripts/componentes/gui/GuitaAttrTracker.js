import { AttrTracker } from "./AttrTracker.js";
import {EmojiRepo } from "../../utiles/EmojiRepo.js";
import { HtmlElementBuilder } from "../../utiles/HtmlElementBuilder.js";

export class GuitaAttrTracker extends AttrTracker
{
    constructor(parenthtml, trackedObj, trackedAttr, opts)
    {
        super(parenthtml, trackedObj, trackedAttr);
        this.opts = {
            numberformatter: new Intl.NumberFormat(window.navigator.userLanguage || window.navigator.language, 
                {    
                    maximumFractionDigits:2,
                    minimumFractionDigits: 2,
                    useGrouping: false
                })
        };
        
        this.asingnarOpts(opts);

        this.cachedValue = this.valor;

     
        this.guitaHolder = new HtmlElementBuilder("span").addClass("badge", "bg-black")
                           .setInnerText(this.opts.numberformatter.format(this.cachedValue)).get();
        
        let divElem = new HtmlElementBuilder("div").addClass("d-inline-flex", "bd-highlight", "mb-1")
                        .appendChild(new HtmlElementBuilder("div").appendChild(this.crearIcono("💲")).get())
                        .appendChild(new HtmlElementBuilder("div").appendChild(this.guitaHolder).get())
                        .get();
 
        new HtmlElementBuilder(this.elementoHtml)
        .addClass("sombreado",
                  "guitaBox", 
                  "p-2", 
                  "mb-5", 
                  "bg-warning", 
                  "border-bottom", 
                  "border-start", 
                  "border-end", 
                  "border-dark",
                  "rounded-bottom")
         .setAttribute("data-bs-toggle","tooltip")
         .setAttribute("data-bs-placement","left")
         .setAttribute("title","Guita")
         .appendChild(divElem);

        new bootstrap.Tooltip(this.elementoHtml);
    }


    
    crearIcono(text)
    {
        let rv = EmojiRepo.crearImgElement(text);
        rv.classList.add("guitSigno");

        return rv;
    }

    actualizar(elapsed)
    {
        let val = this.valor;
        if(this.cachedValue !== val)
        {
            this.cachedValue = val;
            this.guitaHolder.innerText = this.opts.numberformatter.format(this.cachedValue);
        }
       
    }
   

}