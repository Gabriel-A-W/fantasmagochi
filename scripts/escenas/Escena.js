import { Actualizable } from "../Actualizable.js";
import { HtmlElementBuilder } from "../utiles/HtmlElementBuilder.js";

export class Escena extends Actualizable
{
    constructor()
    {
        super();
        this.nombreHtml = "";
        this.elementoHtml = null;
        this.enPausa = false;
    }

    async cargarHtml()
    {
        const r = await fetch(`htmls/escenas/${this.constructor.name.toLowerCase()}.html`);
        this.elementoHtml = HtmlElementBuilder.fromTemplate(await r.text()).get();     
    }

    async inicializar()
    {
        throw new Error("inicializar es un metodo abstracto, implementar");  
    }

    async cargar()
    {
        try
        {
            await this.cargarHtml();
            await this.inicializar();    
        }
        catch(err)
        {
            throw err;
        }
        
        return this;   
    }

    actualizar(elapsed)
    {
        super.actualizar(elapsed);
    }
}