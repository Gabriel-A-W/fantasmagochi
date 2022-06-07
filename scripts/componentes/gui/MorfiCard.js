import { EmojiRepo } from "../../utiles/EmojiRepo.js";
import { HtmlElementBuilder } from "../../utiles/HtmlElementBuilder.js";

export class MorfiCard 
{
    constructor(morfi, nombre, id)
    {
        const template = `<div class="col"><div class="card" style="width:100%; height:100%" 
        title="${morfi.nombre}"
        data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content="Saciedad: ${morfi.saciedad} | Calorias: ${morfi.ocupa}">
            <img src="${EmojiRepo.getSvgUrl(morfi.grafico, true)}" class="card-img-top">
            <div class="card-body">
                <h6 class="card-title">Precio: </h6>
                <h6>${morfi.precio.toFixed(2)}</h6>
            </div>
            <div class="card-footer"> 
            <input type="radio" class="btn-check" name="${nombre}" id="${id}" autocomplete="off" value="${morfi.id}" >
            <label class="btn btn-outline-primary" for="${id}">Elegir</label>
          </div>
        </div></div>`;

        this.morfi = morfi;
        this.elementoHtml = HtmlElementBuilder.fromTemplate(template).get();
        this.checkBox = this.elementoHtml.querySelector(`#${id}`);
        new bootstrap.Popover(this.elementoHtml.firstChild);
    }

    addChangeListener(fn)
    {
        this.checkBox.addEventListener("change", ()=>fn(this.morfi, this.checkBox.checked, this));
    }
 
}