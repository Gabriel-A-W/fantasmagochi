import { HtmlElementBuilder } from "../../../utiles/HtmlElementBuilder.js";
import {FichaMatch} from "../TableroMatch.js";
import { FantasBtn } from "./FanstamaBtn.js";

export class TableroMatchView
{
    constructor(tablero, tabla)
    {
        this.colores = ["invisible", "bg-primary", "bg-success", "bg-danger", "bg-warning", "bg-light"];
        this.tableroModel = tablero;
        this.botones = [];
        this.fantasmas = [];
        this.elementoHtml = tabla;
        

        for (let y = 0; y < this.tableroModel.cantFilas; y++)
        {
            let fila = new HtmlElementBuilder("tr").get();
            console.log(fila);
            this.elementoHtml.prepend(fila);
            this.botones[y] = [];
            this.fantasmas[y] = [];
            for (let x = 0; x < this.tableroModel.cantCols; x++)
            {
                
                let col = new HtmlElementBuilder("td").addClass("text-center").get();
                const btnTemplate = `<div class="d-flex justify-content-center" style="width:100%"></div>`;
                const boton = HtmlElementBuilder.fromTemplate(btnTemplate).get();
                

                col.appendChild(boton);
                fila.appendChild(col);
                this.botones[y][x] = boton;
                this.fantasmas[y][x] = new FantasBtn(boton);
            }
        }
    }

    onBlockClick(fn)
    {
        for (let y = 0; y < this.tableroModel.cantFilas; y++)
        {
            for (let x = 0; x < this.tableroModel.cantCols; x++)
            {
                const fila = y;
                const col = x;
                this.botones[y][x].onclick = () => { fn(fila, col); };
            }
        }
    }


    limpiarSeleccion()
    {
        for (let y = 0; y < this.tableroModel.cantFilas; y++)
        {
            for (let x = 0; x < this.tableroModel.cantCols; x++)
            {
                this.botones[y][x].classList.remove("match-selccionado");
            }
        }
    }

    setSeleccion(fila, col)
    {
        
        this.limpiarSeleccion();
        this.botones[fila][col].classList.add("match-selccionado");
    }

    setearClass(boton, valor)
    {
        this.colores.forEach((c) => {
            boton.removeClass(c);
        });

        boton.addClass(this.colores[valor]);
    }

    setearHabilitacionDeBotones(v)
    {
        for (let y = 0; y < this.tableroModel.cantFilas; y++)
        {
            for (let x = 0; x < this.tableroModel.cantCols; x++)
            {
                if(v)
                {
                    this.botones[y][x].classList.add("bloque-match");
                }
                else
                {
                    this.botones[y][x].classList.remove("bloque-match");
                }
                
            }
        }
    }




    actualizar()
    {
        for (let y = 0; y < this.tableroModel.cantFilas; y++)
        {
            for (let x = 0; x < this.tableroModel.cantCols; x++)
            {
               // this.botones[y][x].innerText = `${this.tableroModel.tablero[y][x]}`;
                this.setearClass( this.fantasmas[y][x], this.tableroModel.tablero[y][x]);
                
            }
        }
    }

}