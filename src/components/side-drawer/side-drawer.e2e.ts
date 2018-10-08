import {newE2EPage, E2EElement, E2EPage} from '@stencil/core/testing';

describe('side-drawer', async () => {
  let element: E2EElement;
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({ html: `
      <side-drawer></side-drawer>
    `});
    element = await page.find('side-drawer');
  });

  it('should work without parameters', async () => {
    const drawerElm = await page.find('side-drawer >>> div');
    expect(drawerElm.outerHTML).toEqual('<div></div>');
  });

  it('should be open with openDrawer parameter', async () => {
    element.setProperty('openDrawer', true);
    await page.waitForChanges();

    const drawerElm = await page.find('side-drawer >>> div');
    expect(drawerElm.innerHTML.trim()).toEqual('<div class="drawer right"><slot></slot></div><div class="overlay" role="presentation"></div>');
  });
});
