
  describe('Drag and drop test', function(){

    beforeEach(() => {cy.configuration(); })

    it('drag and drop test', function() {
      cy.get('#trashcan').drag('#x1y1.dropzone', {force: true});
      cy.get('#foodStand').drag('#x3y1.dropzone', {force: true});
      cy.get('#drinkStand').drag('#x5y3.dropzone', {force: true});
      cy.get('#toilet').drag('#x7y6.dropzone', {force: true});
      cy.get('#tent').drag('#x9y2.dropzone', {force: true});
    })
  });

  describe('Move items test', function(){

    beforeEach(() => {cy.configuration(); })

    it('move items test', function() {
      cy.get('#toilet').drag('#x7y6', {force: true});
      cy.get('#tent').drag('#x9y2', {force: true});
  
      cy.get('#x7y6').children().drag('#x7y7', {force: true});
      cy.get('#x9y2').children().drag('#x9y3', {force: true});
    });
});

  describe('Drop back test', function(){
    
    beforeEach(() => {cy.configuration(); })

    it('drop back items test', function() {
      cy.get('#trashcan').drag('#x1y1', {force: true});

      cy.get('#x1y1').find('.draggable-item').drag('#dropbackzone', {force: true});
    });
  });

  describe('Lock region test', function(){
    
    beforeEach(() => {cy.configuration(); })

    it('lock region test', function() {
      cy.get('#trashcan').drag('#x1y1', {force: true});

      cy.get('#lock_button').click({force: true});

      cy.get('#x1y1').children().drag('#x1y2', {force: true});
      cy.get('#x1y1').children().drag('#x1y2', {force: true});
    });
  });

  describe('Configure item test', function(){
    
    beforeEach(() => {cy.configuration(); })

    it('configure item test', function() {
      cy.get('#trashcan').drag('#x1y1', {force: true});
      cy.get('#tent').drag('#x9y2.dropzone', {force: true});

      cy.get('#lock_button').click({force: true});

      cy.get('#x1y1').children().click({force: true});
      cy.get('#firstInput').clearThenType('10').should('have.value', '10');
      cy.get('#secondInput').clearThenType('11:00').should('have.value', '11:00');
      cy.get('#save-button').click({force: true});

      cy.get('#x9y2').children().click({force: true});
      cy.get('#firstInput').clearThenType('20').should('have.value', '20');
      cy.get('#secondInput').clearThenType('13:00').should('have.value', '13:00');
      cy.get('#save-button').click({force: true});
    });
  });