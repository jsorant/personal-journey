import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  clickOnLinkShouldNavigateTo,
  clickOnButtonShouldNavigateTo,
} from '../../cypress/navigation.cy';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    router = fixture.componentInstance.router;
  });

  it('should have the home icon button', () => {
    cy.get('#home-icon-button').should('be.visible');
  });

  it('should navigate to home with the home icon button', () => {
    clickOnButtonShouldNavigateTo('/home', '#home-icon-button', router);
  });

  it('should have the home link', () => {
    cy.get('#home-link').should('be.visible');
    cy.get('#home-link').should('contain.text', 'Personal Journey');
    cy.get('#home-link').should('have.attr', 'routerLink', '/home');
  });

  it('should navigate to home with the home link', () => {
    clickOnLinkShouldNavigateTo('/home', '#home-link', router);
  });

  it('should have the add event button', () => {
    cy.get('#add-event-button').should('be.visible');
    cy.get('#add-event-button').should('contain.text', 'Add event');
  });

  it('should navigate to add event with the add event button', () => {
    clickOnButtonShouldNavigateTo('/events/add', '#add-event-button', router);
  });

  it('should have the history button', () => {
    cy.get('#history-button').should('be.visible');
    cy.get('#history-button').should('contain.text', 'Historique');
  });

  it('should navigate to history with the history button', () => {
    clickOnButtonShouldNavigateTo('/history', '#history-button', router);
  });
});
