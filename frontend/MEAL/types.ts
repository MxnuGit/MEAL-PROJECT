export interface Ricetta {
    titolo: string,
    ingredienti: string[],
    creatore: string
    descrizione: string
    difficolta: string,
    tempoPrep: number,
    portata: string
}

export interface Utente {
    id: string
}