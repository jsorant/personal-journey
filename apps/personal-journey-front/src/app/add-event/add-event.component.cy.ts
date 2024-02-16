import {AddEventComponent} from "./add-event.component";
import {MountConfig} from "cypress/angular";
import {InMemoryEventsRepository} from "../in-memory-events-repository";

const config: MountConfig<AddEventComponent> = {
  providers: [{provide: "EventsRepository", useClass: InMemoryEventsRepository}],
}
describe("AddEventComponent", () => {
  it("should initialize with default values", () => {
    cy.mount(AddEventComponent, config)
    cy.get('#add-event-thoughts').should('have.text', '')
    cy.get('#add-event-thoughts').should('have.attr', 'placeholder', 'Describe how you feel')
  })

  it("should add an event", () => {
    cy.mount(AddEventComponent, config)
    cy.get('#add-event-thoughts').type('Cold').should('have.value', 'Cold')
  })
})
