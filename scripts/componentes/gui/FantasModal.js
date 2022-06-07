import { HtmlElementBuilder } from "../../utiles/HtmlElementBuilder.js";

class FantasModalSingleton
{
    constructor()
    {
        const HEADER_SELECTOR = "fantas-modal-header";
        const TITULO_SELECTOR = "fantas-modal-titulo";
        const BTN_CERRAR_SELECTOR = "fantas-modal-cerrar";
        const BODY_SELECTOR = "fantas-modal-body";
        const FOOTER_SELECTOR = "fantas-modal-footer";

      
        
        const TEMPLATE = `<div class="modal fade" tabindex="-1"aria-hidden="true">
        <div class="modal-dialog  modal-dialog-scrollable modal-dialog-centered" style="max-width: 70vw;">
          <div class="modal-content">
            <div class="modal-header" ${HEADER_SELECTOR}>
              <h5 class="modal-title" ${TITULO_SELECTOR}></h5>
              <button ${BTN_CERRAR_SELECTOR} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" ${BODY_SELECTOR}>
            </div>
            <div class="modal-footer" ${FOOTER_SELECTOR}>
            </div>
          </div>
        </div>
      </div>`;


        this.elementoHtml = HtmlElementBuilder.fromTemplate(TEMPLATE).get();
        this.headerElement = this.elementoHtml.querySelector(`*[${HEADER_SELECTOR}]`);
        this.tituloElement = this.elementoHtml.querySelector(`*[${TITULO_SELECTOR}]`);
        this.bodyElement = this.elementoHtml.querySelector(`*[${BODY_SELECTOR}]`);
        this.footerElement = this.elementoHtml.querySelector(`*[${FOOTER_SELECTOR}]`);
        this.btnCerrarElement = this.elementoHtml.querySelector(`*[${BTN_CERRAR_SELECTOR}]`);
        this.onclose = ()=>{};

        this.elementoHtml.addEventListener("hidden.bs.modal", ()=>{
            if(typeof(this.onclose) === "function")
            {
                this.onclose(this);
            }
            this.elementoHtml.remove();
        });
        
        
    }

   
    internalSet(elem, val)
    {
        if(!val)
        {
            return;
        }

        elem.innerHTML = "";

        if(typeof(val) === "string")
        {
            elem.innerHTML = val;
        }
        else
        {
            elem.appendChild(val);
        } 
    }

    show(opts)
    {
        if(!opts)
        {
            return;
        }

        if(opts.isStatic)
        {
            this.elementoHtml.setAttribute("data-bs-backdrop", "static");
        }


        this.tituloElement.innerText = opts.titulo ?? "";
        this.internalSet(this.bodyElement, opts.body);
        this.internalSet(this.footerElement, opts.footer);
        
        const MODAL = new bootstrap.Modal(this.elementoHtml);
       
        this.onclose = opts.onclose;
       
        
        document.body.appendChild(this.elementoHtml);

        
        MODAL.show();

    }

}

export const FantasModal = new FantasModalSingleton();