import { Actualizable } from "../../Actualizable.js";

export class AttrTracker extends Actualizable
{

    constructor(parentHtml, trackedObj)
    {
        super();
        this.trackedObj = trackedObj;
        this.opts = {};

       
        this.elementoHtml = document.createElement("div");
        parentHtml.appendChild(this.elementoHtml);
    }

    asingnarOpts(opts)
    {
        if(typeof(opts) !== "object")
        {
            return;
        }
            
        Object.assign(this.opts, opts);
        for(let k of Object.keys(opts))
        {
            this.opts[k] = opts[k];
        }
    }

    get valor()
    {
        return this.trackedObj.valor;
    }
    
 

}