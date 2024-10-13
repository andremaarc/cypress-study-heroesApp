import 'cypress-file-upload';

export default class UserAdminPage {
    selectorList() {
        return {
            heroCard: "[data-cy='hero-card']",

            buttonCreateCard: "[href='/heroes/new']",
            buttonEditCard: "[data-cy='pencil']",
            editForm: "[novalidate='']",
            requiredField: "div.text-red-500",

            // Form
            nameInput: "[name='name']",
            priceInput: "[name='price']",
            fansInput: "[name='fans']",
            savesInput: "[name='saves']",
            powersSelect: "[data-cy='powersSelect']",
            avatarInput: "[data-cy='avatarFile']",
            submitButton: "[novalidate=''] button",
            buttonDeleteEditPage: ".bg-red-600[type='button']",
            buttonYesEditModal: "button.bg-red-600.undefined",

            // Delete Itens Card
            buttonDeleteCard: "[data-cy='trash']",
            buttonYesDeleteModal: "button.bg-red-600"
        }
    }

    createHeroCardFail() {
        cy.get(this.selectorList().buttonCreateCard).click()
        cy.location('pathname').should('equal', '/heroes/new')
        cy.get(this.selectorList().editForm).should('be.visible')
        cy.get(this.selectorList().submitButton).click()

        cy.get(this.selectorList().requiredField).each((e) => {
            cy.wrap(e).should('be.visible');
        })
    }

    createHeroCard(infoCard) {
        cy.get(this.selectorList().buttonCreateCard).click()
        cy.location('pathname').should('equal', '/heroes/new')
        cy.get(this.selectorList().editForm).should('be.visible')
        
        this.fillFormFields(infoCard)

        cy.get(this.selectorList().submitButton).click()
        cy.location('pathname').should('equal', '/heroes')
    }

    editHeroCard(infoCard) {
        this.checkHeroCardGreaterThanZero()
        cy.get(this.selectorList().buttonEditCard).eq(0).click()
        cy.get(this.selectorList().editForm).should('be.visible')

        this.fillFormFields(infoCard)

        cy.get(this.selectorList().submitButton).click()
        cy.location('pathname').should('equal', '/heroes')
    }

    checkDeleteButtonEditPage() {
        this.checkHeroCardGreaterThanZero()
        cy.get(this.selectorList().buttonEditCard).eq(0).click()
        cy.get(this.selectorList().editForm).should('be.visible')

        cy.get(this.selectorList().buttonDeleteEditPage).should('be.visible')
        cy.get(this.selectorList().buttonDeleteEditPage).click()
        cy.get(this.selectorList().buttonYesEditModal).click()
        cy.location('pathname').should('equal', '/heroes')
    }

    checkDeleteButtonCard() {
        this.checkHeroCardGreaterThanZero()
        cy.get(this.selectorList().heroCard).its('length').then((count) => {

            const initialCount = count

            cy.get(this.selectorList().buttonDeleteCard).eq(-1).click()
            cy.get(this.selectorList().buttonYesDeleteModal).click()

            cy.get(this.selectorList().heroCard).its('length').should('be.lessThan', initialCount)
        }) 
    }

    checkHeroCardGreaterThanZero() {
        cy.get(this.selectorList().heroCard).should('have.length.greaterThan', 0)
    }

    fillFormFields({name, price, fans, saves, power, avatarFilename}) {
        cy.get(this.selectorList().nameInput).clear().type(name)
        cy.get(this.selectorList().priceInput).clear().type(price)
        cy.get(this.selectorList().fansInput).clear().type(fans)
        cy.get(this.selectorList().savesInput).clear().type(saves)
        cy.get(this.selectorList().powersSelect).select(power)
        cy.get(this.selectorList().avatarInput).attachFile(avatarFilename)
    }
}