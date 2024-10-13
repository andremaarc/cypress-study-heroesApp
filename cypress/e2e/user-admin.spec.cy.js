import { Chance } from 'chance'
import { adminEmail, defaultPassword } from '../fixtures/example.json'
import HomePage from "../pages/homePage.js"
import UserAdminPage from '../pages/userAdminPage.js'

const chance = new Chance()
const homePage = new HomePage()
const userAdminPage = new UserAdminPage()

describe('template spec', () => {
  beforeEach(() => {
    homePage.accessApp()
    homePage.loginWithAnyUser(adminEmail, defaultPassword)
    cy.get("[href='/heroes/new']")
  })

  describe('Create Hero Fail', () => {
    it('All fields filled in blank', () => {
      userAdminPage.createHeroCardFail()
    })
  })

  describe('Create Hero Success', () => {
    it('All fields filled in correctly', () => {
      userAdminPage.createHeroCard({
        name: chance.name(),
        price: chance.integer({ min: 1, max: 20 }),  
        fans: chance.integer({ min: 1, max: 100 }), 
        saves: chance.integer({ min: 1, max: 100 }), 
        power: chance.integer({ min: 0, max: 8 }),   
        avatarFilename: 'avatar.jpg',
      })
    })
  })

  describe('Edit Hero Success', () => {
    it('All fields filled in correctly', () => {
      userAdminPage.editHeroCard({
        name: chance.name(),
        price: chance.integer({ min: 1, max: 20 }),  
        fans: chance.integer({ min: 1, max: 100 }), 
        saves: chance.integer({ min: 1, max: 100 }), 
        power: chance.integer({ min: 0, max: 8 }),   
        avatarFilename: 'avatar.jpg',
      })
    })
  })

  describe('Check Delete button from Edit Page functionality', () => {
    it('the hero should be deleted and the page should be redirected to the heroes page', () => {
      userAdminPage.checkDeleteButtonEditPage()
    })
  })

  describe('Check Delete button card functionality', () => {
    it('The last hero card must be deleted', () => {
      userAdminPage.checkDeleteButtonCard()
    })
  })
})