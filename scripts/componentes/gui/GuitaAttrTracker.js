import { AttrTracker } from "./AttrTracker.js";
import {EmojiRepo } from "../../utiles/EmojiRepo.js";

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

        let divElem = document.createElement("div");
        divElem.className = "d-inline-flex bd-highlight mb-1";
        this.elementoHtml.className = "sombreado guitaBox p-2 mb-5 bg-warning border-bottom border-start border-end border-dark rounded-bottom";
    
        this.guitaHolder = document.createElement("span");
        this.guitaHolder.className = "badge bg-black";

        let otroDiv = document.createElement("div");
        otroDiv.appendChild(this.crearIcono("💲"));
        divElem.appendChild(otroDiv);
        otroDiv = document.createElement("div");
        
        otroDiv.appendChild(this.guitaHolder);
        divElem.appendChild(otroDiv);

        this.cachedValue = this.valor;
        this.guitaHolder.innerText = this.opts.numberformatter.format(this.cachedValue);
        this.elementoHtml.appendChild(divElem);

        this.elementoHtml.setAttribute("data-bs-toggle","tooltip");
        
        this.elementoHtml.setAttribute("data-bs-placement","left");
        this.elementoHtml.setAttribute("title","Guita");

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