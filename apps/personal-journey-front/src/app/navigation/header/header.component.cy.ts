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
import { matButtonShouldHaveText } from '../../../tests-utils/cypress-utils/harness-utils.cy';
import { HISTORY_ROUTE, SITUATION_PASS_THROUGH_ROUTE } from '../../app.routes';

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

  it('should have the add situation button', () => {
    matButtonShouldHaveText(
      HeaderComponent.ADD_SITUATION_BUTTON_TEXT,
      '#add-situation-button',
      loader
    );
  });

  it('should navigate to add situation with the add situation button', () => {
    clickOnButtonShouldNavigateTo(
      SITUATION_PASS_THROUGH_ROUTE,
      '#add-situation-button',
      router
    );
  });

  it('should have the my situations button', () => {
    matButtonShouldHaveText(
      HeaderComponent.MY_SITUATIONS_BUTTON_TEXT,
      '#my-situations-button',
      loader
    );
  });

  it('should navigate to history with the my situations button', () => {
    clickOnButtonShouldNavigateTo(
      HISTORY_ROUTE,
      '#my-situations-button',
      router
    );
  });
});
