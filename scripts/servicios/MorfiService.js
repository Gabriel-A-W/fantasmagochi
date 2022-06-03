const MORFI_URL = "db.json";
class MorfiServiceSingleton
{

    constructor()
    {
           
    }

    async get()
    {
        const response = await fetch(MORFI_URL);
        const responseJson = await response.json();
        //GAW: Me dio ""flojera"" agregarle el id al json, va a mano.
        responseJson.morfi.forEach((element, i) => {
            element.id = i+1;
        });

        return responseJson.morfi;
    }
  
}


export const MorfiService = new MorfiServiceSingleton();