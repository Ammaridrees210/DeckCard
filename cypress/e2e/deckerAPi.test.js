import { newDeck } from "../support/pages/New Deck/deckapiPO";
const deck = new newDeck()
let deck_id;
let pile_name = "my_pile";

before(() => {
    deck.createNewDeck().then(response=>{
        deck_id = response
    });
});

describe("Decker Card API", () => {
    
    it("Should Reshuffle New Created Deck", () => {
        deck.shuffleNewDeck(deck_id)
    });

    it("List of Draw cards in Deck Cards", () => {
        deck.listDrawCards(deck_id)
    });

    it("Should Shuffle the New deck with specific cards", ()=>{
        deck.partialDeck(deck_id)
    });

    it("Should Add Card to Specific Pile Name", ()=>{
        deck.addCardToSpecificPileName(deck_id, pile_name)
    });

    it("Should Shuffle Pile Name To Deck Card", ()=>{
        deck.shuffleSpecificPileNameTest(deck_id, pile_name)
    });

    it("Should Listing Cards in Piles", () => {
        deck.listCardsinPile(deck_id, pile_name)
    });

    it("Should Drawing from Piles", () => {
        deck.drwaingFromPiles(deck_id, pile_name)
    })

    it("Should Returning cards to the deck", () =>{
        deck.returingCardsToDeck(deck_id, pile_name)
    })

    it("Should Show Back Of The Card",() =>{
        deck.showBackOfCard()
    })

});
