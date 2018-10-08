import {newE2EPage, E2EElement, E2EPage} from '@stencil/core/testing';
import {Dino} from "../../classes/Dino";

const tRex = new Dino('T-Rex');
tRex.description = 'some description';
tRex.imageSrc = 'imageSrc';

describe('dino-details', async () => {
  let element: E2EElement;
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({ html: `
      <dino-details></dino-details>
    `});
    element = await page.find('dino-details');
  });

  it('should work with a given dinosaur', async () => {
    element.setProperty('dinosaur', tRex);
    await page.waitForChanges();

    expect(element.shadowRoot).toEqualHtml('<div><header><h2>T-Rex</h2></header><div class="dino-content"><img alt="T-Rex" src="imageSrc"><p>some description</p></div></div>');
  });

  it('should toggle on click', async () => {
    element.setProperty('dinosaur', tRex);
    await page.waitForChanges();

    const headerMock = await page.find('dino-details >>> header');
    await headerMock.click();
    await page.waitForChanges();

    const content = element.shadowRoot.querySelector('div.dino-content');
    expect(content).toHaveClasses(['hide-content', 'dino-content']);
  });
});
