export class newDeck{

    createNewDeck(){
        return cy.request("GET", "api/deck/new/")
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.deck_id).to.be.a('string');
            expect(response.body.deck_id).to.not.be.null;
            expect(response.isOkStatusCode).to.eq(true);
            expect(response.body.success).to.eq(true);
            return response.body.deck_id;
        })
    }
    shuffleNewDeck(deck_id){
    cy.request("GET", `api/deck/${deck_id}/shuffle/?remaining=true`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.deck_id).to.be.a('string');
            expect(response.body.remaining).to.eq(52);
            expect(response.body.shuffled).to.eq(true);
            expect(response.body.success).to.eq(true);
        });
    }
    listDrawCards(deck_id){
    cy.request("GET", `api/deck/${deck_id}/draw/?count=52`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.deck_id).to.be.a('string');
            expect(response.isOkStatusCode).to.eq(true);
            expect(response.body.cards).to.be.an("array");
            expect(response.body.cards).to.have.lengthOf(52); 
            expect(response.body.cards.some(card => card.code === '9S')).to.be.true;
            expect(response.body.remaining).to.eq(0);
            expect(response.body.success).to.eq(true);
        });
    }
    partialDeck(deck_id){
        cy.request("GET", `api/deck/${deck_id}/shuffle/?cards=AS,2S,KS,AD,2D,KD,AC,2C,KC,AH,2H,KH`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.deck_id).to.be.a('string');
            expect(response.isOkStatusCode).to.eq(true);
            expect(response.body.remaining).to.eq(12);
            expect(response.body.shuffled).to.eq(true);
            expect(response.body.success).to.eq(true);
        });
    }
    addCardToSpecificPileName(deck_id, pile_name){
        cy.request("GET", `api/deck/${deck_id}/pile/${pile_name}/add/?cards=AS,2S`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.deck_id).to.be.a('string');
            expect(response.body.piles['my_pile']).to.have.property('remaining', 0);
            expect(response.isOkStatusCode).to.eq(true);
            expect(response.body.remaining).to.eq(12);
            expect(response.body.success).to.eq(true);
        });
    }
    shuffleSpecificPileNameTest(deck_id, pile_name){
        cy.request("GET", `api/deck/${deck_id}/pile/${pile_name}/shuffle`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.deck_id).to.be.a('string');
            expect(response.body.piles['my_pile']).to.have.property('remaining', 0);
            expect(response.isOkStatusCode).to.eq(true);
            expect(response.body.remaining).to.eq(12);
            expect(response.body.success).to.eq(true);
        });
    }
    listCardsinPile(deck_id, pile_name){
        cy.request("GET", `api/deck/${deck_id}/pile/${pile_name}/list`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.deck_id).to.be.a('string');
            expect(response.body.piles['my_pile']).to.have.property('remaining', 0);
            expect(response.isOkStatusCode).to.eq(true);
            expect(response.body.remaining).to.eq(12);
            expect(response.body.success).to.eq(true);
        });
    }
    drwaingFromPiles(deck_id){
        cy.request("GET", `api/deck/${deck_id}/draw/?count=1`)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.deck_id).to.be.a('string');
            expect(response.body).to.have.property('cards').that.is.an('array').and.has.lengthOf(1);
            expect(response.isOkStatusCode).to.eq(true);
            expect(response.body.remaining).to.eq(11);
            expect(response.body.success).to.eq(true);
        });
    }
    returingCardsToDeck(deck_id, pile_name){
    cy.request("GET", `api/deck/${deck_id}/pile/${pile_name}/return`) 
    .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.deck_id).to.be.a('string');
        expect(response.body.piles['my_pile']).to.have.property('remaining', 0);
        expect(response.isOkStatusCode).to.eq(true);
        expect(response.body.remaining).to.eq(11);
        expect(response.body.success).to.eq(true);
        });
    }
    showBackOfCard(){
    cy.request("GET", "static/img/back.png") 
    .then((response) => {
        console.log(response)
        expect(response.status).to.eq(200);
        expect(response.isOkStatusCode).to.eq(true);
        expect(response.statusText).to.eq('OK');
        });
    }
}
