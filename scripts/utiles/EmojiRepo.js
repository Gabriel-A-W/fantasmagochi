import { HtmlElementBuilder } from "./HtmlElementBuilder.js";

class EmojiRepoSingleton
{
    constructor()
    {
        this.cache = {};
    }

    getSvgUrl(emojistr, usarColor)
    {
        let codepointstr = emojistr.codePointAt(0).toString(16).toUpperCase();
        console.log(codepointstr);
        return `https://openmoji.org/data/${usarColor?"color":"black"}/svg/${codepointstr}.svg`;
    }

    crearImgElement(emojistr, usarColor = false)
    {
        return new HtmlElementBuilder("img").setAttribute("src", this.getSvgUrl(emojistr, usarColor)).get();
    }
}

export const EmojiRepo = new EmojiRepoSingleton();