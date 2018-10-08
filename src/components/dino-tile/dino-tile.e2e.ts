import { E2EPage, newE2EPage, E2EElement } from '@stencil/core/testing';
import { Dino } from "../../classes/Dino";

const tRex = new Dino('T-Rex');
tRex.description = 'some description';
tRex.imageSrc = 'imageSrc';

describe('dino-tile', async () => {
  let element: E2EElement;
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({ html: `
      <dino-tile></dino-tile>
    `});
    element = await page.find('dino-tile');
  });

  it('should work without parameters', async () => {
    expect(element).toEqualHtml('<dino-tile class="hydrated"></dino-tile>');
  });

  it('should work with a dinosaur', async () => {
    element.setProperty('dinosaur', tRex);
    await page.waitForChanges();

    let liElm = element.shadowRoot.querySelector('li');
    expect(liElm.outerHTML.trim()).toEqual('<li><img src="imageSrc" alt="T-Rex"><h2>T-Rex</h2></li>');
  });

  it('should work with a dinosaur and a selected props', async () => {
    element.setProperty('dinosaur', tRex);
    element.setProperty('selected', true);
    await page.waitForChanges();

    let liElm = await page.find('dino-tile >>> li');
    expect(liElm).toHaveClasses(['dino-selected']);
  });

  it('Event emitter should emit a dinosaurSelected when clicked', async () => {
    element.setProperty('dinosaur', tRex);
    await page.waitForChanges();

    const eventSpy = await element.spyOnEvent('dinosaurSelected');
    await element.callMethod('dinosaurSelectedHandler');

    const receivedEvent = eventSpy.lastEvent;
    expect(receivedEvent.detail).toEqual(tRex);
    expect(receivedEvent.type).toEqual('dinosaurSelected');
  });
});
