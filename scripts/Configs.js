export const Configs = Object.freeze(
    {
        /*****************************Estadisticas*******************************/
        //Velocidad de decrecimiento de la saciedad.
        DELTA_SACIEDAD: -1.5/1000,
        //Velocidad de decrecimiento de la energia
        DELTA_ENERGIA: -1/1000,
        //Velocidad de crecimiento de la guita
        DELTA_GUITA:  0.005/1000,
        //Velocidad de cacona
        DELTA_CACONA: 20/1000,
        //Velocidad de alimentacion
        DELTA_MASTICADO: 5/1000,
        //Velocidad de recuperacion de energia mientras duerme
        DELTA_DESCANSO: 3/1000,

        //Porcentaje de felicidad minimo necesario para estar feliz
        LIMITE_INFERIOR_FELIZ: 80,
        //Porcentaje de felicidad minimo necesario para estar normal
        LIMITE_INFERIOR_NORMAL: 50,
        

        /*****************************Visuales*******************************/
        //Cada cuantos ms debe cerrar los ojos
        DURACION_OJOS_ABIERTOS:5*1000, //5 segundos
        //Cada cuantos ms debe abrir los ojos
        DURACION_OJOS_CERRADOS: 0.2*1000, //0.2segundos
        //Cada cuantos ms debe masticar
        DURACION_MASTICADO:0.2*1000,
        //Cada cuantos ms ronca mientras duerme
        DURACION_RONQUIDO:0.8*1000,
    }
);
