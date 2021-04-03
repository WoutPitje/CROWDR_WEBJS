describe('My first test', function(){
    it('Tests steps', function(){
        cy.visit('../dist/index.html');

        cy.get('#nameInput').type('Region 1').should('have.value', 'Region 1');
        cy.get('#visitorInput').type('500').should('have.value', '500');
        cy.get('#step1-button').click();

        cy.get('#tentInput').type('6').should('have.value', '6');
        cy.get('#step2-button').click();

        cy.get('#eatingStallInput').type('3').should('have.value', '3');
        cy.get('#step3-button').click();

        cy.get('#drinkStallInput').type('2').should('have.value', '2');
        cy.get('#step4-button').click();

        cy.get('#highTreeInput').type('2').should('have.value', '2');
        cy.get('#wideTreeInput').type('3').should('have.value', '3');
        cy.get('#shadowTreeInput').type('1').should('have.value', '1');
        cy.get('#step5-button').click();

        cy.get('#toiletBuildingsInput').type('3').should('have.value', '3');
        cy.get('#step6-button').click();

        cy.get('#trashCanInput').type('4').should('have.value', '4');
        cy.get('#step7-button').click();
    });
});