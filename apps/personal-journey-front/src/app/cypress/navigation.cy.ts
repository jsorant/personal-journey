import { Router } from '@angular/router';

export function clickOnButtonShouldNavigateTo(
  url: string,
  buttonId: string,
  router: Router
) {
  let calledUrl = '';
  cy.stub(router, 'navigateByUrl').callsFake((arg) => {
    calledUrl = arg.toString();
  });

  cy.get(buttonId)
    .click()
    .then(() => {
      expect(router.navigateByUrl).to.be.called;
      expect(calledUrl).to.eq(url);
    });
}

export function clickOnLinkShouldNavigateTo(
  url: string,
  linkId: string,
  router: Router
) {
  let calledUrl = '';
  cy.stub(router, 'navigateByUrl').callsFake((arg) => {
    calledUrl = arg.toString();
  });

  cy.get(linkId)
    .click()
    .then(() => {
      expect(router.navigateByUrl).to.be.called;
      expect(calledUrl).to.eq(url);
    });
}
