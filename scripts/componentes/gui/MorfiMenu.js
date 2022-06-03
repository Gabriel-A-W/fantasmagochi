import { HtmlElementBuilder } from "../../utiles/HtmlElementBuilder.js";
import { MorfiCard } from "./MorfiCard.js";
export class MorfiMenu
{
    constructor(items)
    {
        const template = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-scrollable modal-dialog-centered" style="max-width: 70vw;">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Alimento</h5>
              <button morfi-close type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form morfi-form class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3"></form>
            </div>
            <div class="modal-footer">
            <p morfi-sel-data></p>
              <button morfi-confirm type="button" class="btn btn-primary" data-bs-dismiss="modal">Comprar y alimentar</button>
            </div>
          </div>
        </div>
      </div>`;

        this.items = items;
        this.elementoHtml = HtmlElementBuilder.fromTemplate(template).get();
        this.form = this.elementoHtml.querySelector("form[morfi-form]");
        this.confirmarBtn = this.elementoHtml.querySelector("button[morfi-confirm]");
        this.cerrarBtn = this.elementoHtml.querySelector("button[morfi-close]");
        this.morfiSpan = this.elementoHtml.querySelector("p[morfi-sel-data]");
        this.modal = new bootstrap.Modal(this.elementoHtml);
      
        this.cargarItems();
      
    }


    internalOnSelItemChng(selItem, check)
    {
        if(check)
        {
            this.morfiSpan.innerHTML = `<h5>${selItem.nombre}</h5> Total: ${selItem.precio.toFixed(2)}`;
        }
    }

    cargarItems()
    {
        this.items.forEach((element, i) => {
            const x = new MorfiCard(element, "morfi", `morfi${i}`);
            x.addChangeListener(this.internalOnSelItemChng.bind(this));
            this.form.appendChild(x.elementoHtml);
        }); 
    }


    get morfiSeleccionado()
    {
        const formData = new FormData(this.form);
        return this.items.find((itm)=>itm.id === parseInt(formData.get("morfi")));
    }
    

    show()
    {
        return new Promise((resolve, reject) => {
            this.modal.show();
            this.cerrarBtn.onclick = ()=>{ reject(); };
            this.confirmarBtn.onclick = ()=> {
                if(!this.morfiSeleccionado)
                {
                    reject();
                } 
                else
                {
                    resolve(this.morfiSeleccionado);
                }
            };
        }); 
    }
}