class EmojiRepoSingleton
{
    constructor()
    {
        this.cache = {};
    }

    getSvgUrl(emojistr, usarColor)
    {
          let codepointstr = emojistr.codePointAt(0).toString(16).toUpperCase();
        return `https://openmoji.org/data/${usarColor?"color":"black"}/svg/${codepointstr}.svg`;
    }

    crearImgElement(emojistr, usarColor = false)
    {
        let img = document.createElement("img");
        img.src = this.getSvgUrl(emojistr, usarColor);
        return  img;
    }
}

export const EmojiRepo = new EmojiRepoSingleton();