import {newE2EPage, E2EElement, E2EPage} from '@stencil/core/testing';
import { Dino } from "../../classes/Dino";

const dinos: Array<Dino> = [new Dino('Stegosaur'), new Dino('T-Rex')];

describe('dino-tiles', async () => {
  let element: E2EElement;
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({ html: `
      <dino-tiles></dino-tiles>
    `});
    element = await page.find('dino-tiles');
  });

  it('should work without parameters', async () => {
    const ulElm = await page.find('dino-tiles >>> ul');
    expect(ulElm.outerHTML).toEqual('<ul></ul>');
  });

  it('should work with array of dinosaurs', async () => {
    element.setProperty('dinosaurs', dinos);
    await page.waitForChanges();

    expect(await element.getProperty('dinosaurs')).toEqual(dinos);
    const ulElm = await page.find('dino-tiles >>> ul');

    expect(ulElm.outerHTML.trim()).toEqualHtml('<ul><dino-tile class="hydrated"></dino-tile><dino-tile class="hydrated"></dino-tile></ul>');
  });

  it('should selected dinosaur when dinosaurSelected is emitted', async () => {
    element.setProperty('dinosaurs', dinos);
    await page.waitForChanges();

    const ulElm = await page.findAll('dino-tiles >>> dino-tile');
    await ulElm[0].callMethod('dinosaurSelectedHandler');
    await page.waitForChanges();

    const liElms = await page.findAll('dino-tiles >>> dino-tile');
    expect(await liElms[0].getProperty('selected')).toEqual(true);
  });
});
