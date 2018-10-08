import {Component, Prop, Method} from '@stencil/core';

@Component({
  tag: 'dino-button',
  styleUrl: 'dino-button.css',
  shadow: true
})
export class DinoButton {
  @Prop() text: string;
  @Prop() onBtnClick: () => void;

  constructor() {
    this.btnClick = this.btnClick.bind(this);
  }

  @Method()
  btnClick() {
    this.onBtnClick();
  }

  render() {
    return (
      <a onClick={this.btnClick} role="button">
        <img src="assets/t-rex-icon.jpg" alt="t-rex icon" />
        <span>{this.text}</span>
      </a>
    );
  }
}
