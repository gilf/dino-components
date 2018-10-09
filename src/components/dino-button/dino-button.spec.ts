import { DinoButton } from './dino-button';

describe('DinoButton', () => {
  it('click event is working as expected', () => {
    const spy = jest.fn(),
      dinoBtn = new DinoButton();

    dinoBtn.btnClicked = spy;
    dinoBtn.btnClick();

    expect(spy).toHaveBeenCalled();
  });
});
