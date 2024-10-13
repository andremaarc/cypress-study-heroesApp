export default class UserCommonPage {
    selectorList() {
        return {
            spanTextFans: "[data-cy='fans']",
            spanTextSaves: "[data-cy='saves']",
            buttonLike: "[data-cy='like']",
            buttonMoney: "[data-cy='money']",
            buttonYesHireModal: "button.bg-red-600"
        }
    }

    checkChangeFans() {
        this.checkNumberChange(this.selectorList().spanTextFans, this.selectorList().buttonLike)
    }

    checkChangeSaves() {
        this.checkNumberChange(this.selectorList().spanTextSaves, this.selectorList().buttonMoney, this.selectorList().buttonYesHireModal)
    }

    checkNumberChange(componentText, componentButton, modalConfirmButton = null) {
        cy.get(componentText).eq(0).invoke('text').then((count) => {
            const initialCount = parseInt(count)

            cy.get(componentButton).eq(0).click()

            if(modalConfirmButton) cy.get(modalConfirmButton).click()

            cy.get(componentText).eq(0).should('have.text', (initialCount + 1).toString());
        })
    }
}