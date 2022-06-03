export class HtmlElementBuilder
{
    constructor(v)
    {
        console.log(v);
        if(typeof(v) === "string")
        {
            this.elemento = document.createElement(v);
        }
        else
        {
            this.elemento = v;
        }
        
    }

    static fromTemplate(strTemplate)
    {
        const rv = document.createRange().createContextualFragment(strTemplate).firstChild;
        return new HtmlElementBuilder(rv);
    }


    setId(id)
    {
        this.elemento.id = id;
        return this;
    }

    setAttribute(attrName, attrVal)
    {
        this.elemento.setAttribute(attrName, attrVal);
        return this;
    }

    addClass(...className)
    {
        this.elemento.classList.add(...className);
        return this;
    }

    appendChild(nodo)
    {
        this.elemento.appendChild(nodo);
        return this;
    }

    setInnerText(texto)
    {
        this.elemento.innerText = texto;
        return this;
    }

    get()
    {
        return this.elemento;
    }

    
}