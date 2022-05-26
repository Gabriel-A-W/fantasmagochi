import { Actualizable } from "../../Actualizable.js";
import { FantasmaBoca } from "./partes/FantasmaBoca.js";
import { FantasmaCuerpo } from "./partes/FantasmaCuerpo.js";
import { FantasmaOjoCollection } from "./partes/FantasmaOjoCollection.js";
import { FantasmaPies } from "./partes/FantasmaPies.js";
import { EstadoIdle } from "./estados/EstadoIdle.js";
import { EstadoComiendo } from "./estados/EstadoComiendo.js";
import { EstadoDurmiendo } from "./estados/EstadoDurmiendo.js";
import { EstadoMuerto } from "./estados/EstadoMuerto.js";
import { EstadoCacona } from "./estados/EstadoCacona.js";
import { EmojiRepo } from "../../utiles/EmojiRepo.js";
import { Estadistica } from "./Estadistica.js";
import { HtmlElementBuilder } from "../../utiles/HtmlElementBuilder.js";

 
export class Fantasma extends Actualizable 
{

    constructor(parent, statsIniciales) 
    {
        super();
        
        this.tristezaRatio = -5 / 1000;
        
        this.felicidad = new Estadistica(statsIniciales.felicidad, 0);
        this.saciedad = new Estadistica(statsIniciales.saciedad, -1.5/1000);
        this.espacioEnPanza = new Estadistica(statsIniciales.espacioEnPanza, 0);
        this.energia = new Estadistica(statsIniciales.energia, -1/1000);
        this.guita = new Estadistica(statsIniciales.guita, 0);

        this.registrarHijo(this.felicidad, this.saciedad, this.espacioEnPanza, this.energia);

        this.elementoHtml = new HtmlElementBuilder("div").addClass("fantasma").get();
        this.cuerpo = new FantasmaCuerpo(this.elementoHtml);
        this.ojos = new FantasmaOjoCollection(this.cuerpo.elementoHtml);
        this.boca = new FantasmaBoca(this.cuerpo.elementoHtml);
        this.pies = new FantasmaPies(this.elementoHtml);

        this.popo = EmojiRepo.crearImgElement("💩", true);
        this.popo.className = "position-absolute cacona invisible";
        
        this.estado = null;

        this.elementoHtml.appendChild(this.popo);


        parent.appendChild(this.elementoHtml);
        
        this.idle();
    }

    togglePopo(visible)
    {
        if(visible)
        {
            this.popo.classList.remove("invisible");   
        }
        else
        {
            this.popo.classList.add("invisible");
        }
    }

    puedeTransicionar()
    {
        return !this.estado || this.estado.puedeTransicionar();
    }

    intentarAsignarEstado(nuevoEstado, forzar = false)
    {
        let rv = false;
        if(typeof(nuevoEstado) === "object" && (forzar || this.puedeTransicionar()))
        {
            this.estado && this.estado.finalizar();
            this.estado = nuevoEstado;
            this.estado.iniciar();
            rv = true;
        }        

        return rv;
    }

    idle()
    {
        return this.intentarAsignarEstado(new EstadoIdle(this));
    }

    alimentar(alimento)
    {
        return this.intentarAsignarEstado(new EstadoComiendo(this, alimento));
    }

    dormir()
    {
        return this.intentarAsignarEstado(new EstadoDurmiendo(this));
    }

    matar()
    {
        return this.intentarAsignarEstado(new EstadoMuerto(this));
    }

    hacerPopo()
    {
        if(this.espacioEnPanza.valor < this.espacioEnPanza.max)
        {
            return this.intentarAsignarEstado(new EstadoCacona(this));
        }
        return false;
    }

    estaVivo()
    {
        return this.estado.estaVivo();
    }

    actualizar(elapsed)
    {
        super.actualizar(elapsed);
        this.estado && this.estado.actualizar(elapsed);
    }
 

}