class RegisterForm {
  elements = {
    titleInput: () => cy.get('#title'),
    titleFeedBack: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    imageFeedBack: () => cy.get('#urlFeedback'),
    submitBtn: () => cy.get('#btnSubmit')
  }

  tipeTitle(text) {
    if (!text) return ;
    this.elements.titleInput().type(text);
  }

  tipeUrl(text) {
    if (!text) return ;
    this.elements.imageUrlInput().type(text);
  }
  clickSubmit() {
    this.elements.submitBtn().click();
  }
}

const registerForm = new RegisterForm();

const colors ={
  errors: 'rgb(220, 53, 69)',
  sucess: ''
}

describe('Image Registration', () => {

  describe('Submitting an image with invalid inputs', () => {
    after(() => {
      cy.clearAllLocalStorage()
    });
    const input = {
      title: '',
      url: ''
    }
    it('Given I am on the image registration page', () => {
      cy.visit('/')
    })

    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.tipeTitle(input.title);
    });

    it(`Then I enter ${input.url} in the URL field`, () => {
      registerForm.tipeUrl(input.url);
    });

    it('Then I click the submit button', () => {
      registerForm.clickSubmit();
    });

    it('Then I should see "Please type a title for the image" message above the title field', () => {
      registerForm.elements.titleFeedBack().should('contain.text','Please type a title for the image')
    });

    it('And I should see "Please type a valid URL" message above the imageUrl field', () => {
      registerForm.elements.imageFeedBack().should('contain.text','Please type a valid URL')
    });

    it('And I should see an exclamation icon in the title and URL fields', () => {
      registerForm.elements.titleInput().should('have.css','border-color',colors.errors)
      registerForm.elements.imageUrlInput().should('have.css','border-color',colors.errors)
    });
  });
})