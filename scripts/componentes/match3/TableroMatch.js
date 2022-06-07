import { Enum } from "../../utiles/Enum.js";

const MIN_COINCIDENCIAS_HORIZONTAL = 3;
const MIN_COINCIDENCIAS_VERTICAL = 3;

const InternalFichaMatch = new Enum('Vacio', 'A', 'B', 'X', 'Y', 'O');



export class TableroMatch
{

    constructor(cantFilas, cantCols)
    {
        console.log(InternalFichaMatch);
        this.cantFilas = cantFilas;
        this.cantCols = cantCols;
        this.valoresUsables = Object.freeze([InternalFichaMatch.A, InternalFichaMatch.B, InternalFichaMatch.X, InternalFichaMatch.X, InternalFichaMatch.Y, InternalFichaMatch.O]);
        this.ValoresDisponibles = [];
        this.tablero = [];
        for(let f = 0; f < this.cantFilas; f++)
        {
            this.tablero[f] = [];
            for(let c = 0; c < this.cantCols; c++)
            { 
                this.tablero[f][c] = InternalFichaMatch.Vacio;  
            }
        }
    }

    reiniciarLetras()
    {
        this.ValoresDisponibles = [...this.valoresUsables];
    }

    quitarLetra(letra)
    {
        const i = this.ValoresDisponibles.indexOf(letra);
        if(i >= 0)
        {
            this.ValoresDisponibles.splice(i, 1);
        }
    }

    obtenerLetraAleatoria()
    {
        if(this.ValoresDisponibles.length === 0)
        {
            throw new Error("No se puede decolar de un arr vacio");
        }

        
        const i = _.random(0, this.ValoresDisponibles.length-1);
        return this.ValoresDisponibles[i];
    }

    limpiar(fila, col)
    {
        this.tablero[fila][col] = InternalFichaMatch.Vacio;
    }

    estaVacia(fila, col)
    {
        return this.tablero[fila][col] === InternalFichaMatch.Vacio;
    }

    intentarIntercambio(filOrigen, colOrigen, filDestino, colDestino)
    {
        if (filOrigen !== filDestino && colOrigen !== colDestino)
        {
            return false;
        }

        if ((colDestino < 0) || (colDestino > this.cantCols - 1))
        {
            return false;
        }

        if ((filDestino < 0) || (filDestino > this.cantFilas - 1))
        {
            return false;
        }

        if ((colOrigen < 0) || (colOrigen > this.cantCols - 1))
        {
            return false;
        }

        if ((filOrigen < 0) || (filOrigen > this.cantFilas))
        {
            return false;
        }

        if (Math.abs(filOrigen - filDestino) > 1 || Math.abs(colOrigen - colDestino) > 1)
        {
            return false;
        }

        if(this.tablero[filOrigen][colOrigen] === this.tablero[filDestino][colDestino])
        {
            return false;
        }

        const bfr = this.tablero[filOrigen][colOrigen];

        this.tablero[filOrigen ][colOrigen] = this.tablero[filDestino][colDestino];
        this.tablero[filDestino][colDestino] = bfr;

        return true;
    }


    contarCoincidenciasHorizontal(fila, col)
    {
        let n = 0;
        for (n = col + 1; n < this.cantCols && this.tablero[fila][col] === this.tablero[fila][n]; n++) 
        {
            //Nada
        }

        return n;
    }


    contarCoincidenciasVertical(fila, col)
    {
        let n = 0;
        for (n = fila + 1; n < this.cantFilas && this.tablero[fila][col] === this.tablero[n][col]; n++)
        {
            //Nada    
        }

        return n;
    }


    limpiarCoincidencias()
    {
        let encontradosFila = [];
        let encontradosCol = [];

        let encontrados = 0;


        /*Horizontal*/
        for (let fila = 0; fila < this.cantFilas; fila++)
        {
            let col = 0;
            let n = 0;

            while (col < this.cantCols - 2)
            {
                let rango;
                n = this.contarCoincidenciasHorizontal(fila, col);

                rango = n - col;

                if (rango >= MIN_COINCIDENCIAS_HORIZONTAL)
                {
                    for (let i = col; i < n; i++)
                    {
                        encontradosFila[encontrados] = fila;
                        encontradosCol[encontrados] = i;
                        encontrados++;
                    }
                }

                col += rango;
            }

        }

        /*Vertical*/
        for (let col = 0; col < this.cantCols; col++)
        {
            let fila = 0;
            let n = 0;
            while (fila < this.cantFilas - 2)
            {
                let rango;
                n = this.contarCoincidenciasVertical(fila, col);
                rango = (n - fila);
                if (rango >= MIN_COINCIDENCIAS_VERTICAL)
                {
                    for (let i = fila; i < n; i++)
                    {
                        encontradosFila[encontrados] = i;
                        encontradosCol[encontrados] = col;
                        encontrados++;
                    }
                }
                fila += rango;
            }

        }

        //limpieza de los casilleros encontrandos
        for (let i = 0; i < encontrados; i++)
        {
            this.limpiar(encontradosFila[i], encontradosCol[i]);
        }

        return encontrados;
    }


    intentarAplicarGravedad()
    {
        let huboIntercambio = false;
        for (let y = 0; y < this.cantFilas - 1; y++)
        {
            for (let x = 0; x < this.cantCols; x++)
            {
                if (!this.estaVacia(y + 1, x) && this.estaVacia( y, x))
                {
                    this.intentarIntercambio(y, x, y + 1, x);
                    return true;
                }
            }
        }

        return huboIntercambio;
    }


    completar()
    {
         
        /*Horizontal*/
        for (let y = 0; y < this.cantFilas; y++)
        {
            for (let x = 0; x < this.cantCols; x++)
            {
                if (this.estaVacia(y, x))
                {
                    this.reiniciarLetras();

                    if (y > 0)
                    {
                        //ValidarHaciaAbajo
                        this.quitarLetra(this.tablero[y - 1][x]);
                    }

                    if (y < this.cantFilas - 1)
                    {
                        //ValidarHaciaArriba
                        this.quitarLetra(this.tablero[y + 1][x]);
                    }

                    if (x > 0)
                    {
                        //ValidarHaciaIzquierda
                        this.quitarLetra(this.tablero[y][x - 1]);

                    }

                    if (x < this.cantCols - 1)
                    {
                        //ValidarHaciaDerecha
                        this.quitarLetra(this.tablero[y][x + 1]);
                    }

                    this.tablero[y][x] = this.obtenerLetraAleatoria();
                }
            }
        } 
    }




}

export const FichaMatch = InternalFichaMatch;