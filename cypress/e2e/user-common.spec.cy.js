import { userEmail, defaultPassword } from '../fixtures/example.json'
import HomePage from "../pages/homePage.js"
import UserCommonPage from '../pages/userCommonPage.js'

const homePage = new HomePage()
const userCommonPage = new UserCommonPage()

describe('Interaction with Action Buttons - Cypress Heroes', () => {
  beforeEach(() => {
    homePage.accessApp()
    homePage.loginWithAnyUser(userEmail, defaultPassword)
    cy.get("nav button.undefined").should('have.text', 'Logout')
  })

  describe('Check Like button functionality', () => {
    it('The number of fans should change when clicking the like button', () => {
      userCommonPage.checkChangeFans()
    })
  })

  describe('Check Hire button functionality', () => {
    it('The number of saves should change when clicking the money button', () => {
      userCommonPage.checkChangeSaves()
    })
  })
})