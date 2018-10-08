import {newE2EPage, E2EElement, E2EPage} from '@stencil/core/testing';

describe('dino-button', async () => {
  let element: E2EElement;
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({ html: `     
      <dino-button></dino-button>
    `});
    element = await page.find('dino-button');
  });

  it('should set the text attribute', async () => {
    element.setProperty('text', 'TEXT');

    await page.waitForChanges();

    const elm = await page.find('dino-button >>> span');
    expect(elm).toEqualText('TEXT');
  });
});
