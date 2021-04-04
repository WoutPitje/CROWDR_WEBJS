
  describe('Reset configuration test', function(){

    beforeEach(() => {cy.configuration(); })

    it('reset configuration test', function() {
      cy.get('#resetConfig').click();

      cy.get('#nameInput');
      cy.get('#visitorInput');
      cy.get('#step1-button');
    });
  });

  
  describe('Drag and drop test', function(){

    it('configure item test', function() {
      cy.visit('../dist/index.html');
      cy.get('#addLocation').click();

      cy.get('#navButton2');
      cy.get('#navButton1').click();
      cy.get('#deleteButton1').click();
    });
  });


