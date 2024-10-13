export default class HomePage {
    selectorList() {
        return {
            loginButton: "nav button.undefined",
            formLogin: "[novalidate='']",
            inputEmail: "[data-cy='email']",
            inputPassword: "[data-cy='password']",
            buttonLogin: "[novalidate=''] button.undefined",
            errorMessage: ".text-red-500",
            buttonLike: "[data-cy='like']",
            buttonMoney: "[data-cy='money']",
            buttonModalMessage: ".modal.open button"
        }
    }

    accessApp() {
        cy.visit('/heroes')
        cy.get(this.selectorList().loginButton).should('have.text', 'Login')
    }

    loginWithAnyUser(email, password) {
        cy.get(this.selectorList().loginButton).click()
        cy.get(this.selectorList().formLogin)
        cy.get(this.selectorList().inputEmail).type(email)
        cy.get(this.selectorList().inputPassword).type(password)
        cy.get(this.selectorList().buttonLogin).click()
    }

    verifyErrorMessage() {
        cy.get(this.selectorList().errorMessage).should('be.visible')
    }

    verifyRequiredLoginMessage() {
        cy.get(this.selectorList().buttonLike).eq(0).click()
        cy.get(this.selectorList().buttonModalMessage).should('be.visible')
        cy.get(this.selectorList().buttonModalMessage).click()

        cy.get(this.selectorList().buttonMoney).eq(0).click()
        cy.get(this.selectorList().buttonModalMessage).should('be.visible')
        cy.get(this.selectorList().buttonModalMessage).click()
    }
}