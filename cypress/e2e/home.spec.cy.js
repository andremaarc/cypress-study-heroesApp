import { userEmail, defaultPassword } from '../fixtures/example.json'
import HomePage from "../pages/homePage.js"

const homePage = new HomePage()

describe('Login - Cypress Heroes', () => {
  beforeEach(() => {
    homePage.accessApp()
  })

  describe('Login Success', () => {
    it('Login with valid email and password', () => {
      homePage.loginWithAnyUser(userEmail, defaultPassword)
    })
  })

  describe('Login Fail', () => {
    it('Login with invalid email and password', () => {
      homePage.loginWithAnyUser('other@test.com', defaultPassword)
    })
  })

  describe('Check required login message', () => {
    it('Pressing the like button without being logged in', () => {
      homePage.verifyRequiredLoginMessage()
    })
  })
})