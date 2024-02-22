import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  clickOnLinkShouldNavigateTo,
  clickOnButtonShouldNavigateTo,
} from '../../../tests-utils/cypress-utils/navigation.cy';
import { Router } from '@angular/router';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { matButtonShouldHaveText } from '../../../tests-utils/cypress-utils/material-utils.cy';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    router = fixture.componentInstance.router;
    loader = TestbedHarnessEnvironment.loader(fixture);
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
    matButtonShouldHaveText(
      HeaderComponent.ADD_EVENT_BUTTON_TEXT,
      '#add-event-button',
      loader
    );
  });

  it('should navigate to add event with the add event button', () => {
    clickOnButtonShouldNavigateTo('/events/add', '#add-event-button', router);
  });

  it('should have the history button', () => {
    matButtonShouldHaveText(
      HeaderComponent.HISTORY_BUTTON_TEXT,
      '#history-button',
      loader
    );
  });

  it('should navigate to history with the history button', () => {
    clickOnButtonShouldNavigateTo('/history', '#history-button', router);
  });
});
