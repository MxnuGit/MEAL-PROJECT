export interface Ricetta {
    titolo: string,
    ingredienti: string[],
    immagine: string,
    creatore: string,
    descrizione: string,
    difficolta: string,
    tempoPrep: number,
    portata: string
}

export interface Utente {
    ID: string
    immagine: string
}

export interface Ingrediente {
    nome: string
    ID: string
}

export interface Preparazioni {
    step: number
    passaggio: string
}