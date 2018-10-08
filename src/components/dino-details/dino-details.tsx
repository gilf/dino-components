import {Component, Prop, State} from '@stencil/core';
import { Dino } from "../../classes/Dino";

const contentClass = 'dino-content';

@Component({
  tag: 'dino-details',
  styleUrl: 'dino-details.css',
  shadow: true
})
export class DinoDetails {
  @Prop() dinosaur: Dino;
  @State() collapsed: boolean;

  constructor() {
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  render() {
    if (!this.dinosaur) {
      return '';
    }
    return (
      <div>
        <header onClick={this.toggle}>
          <h2>{this.dinosaur.name}</h2>
        </header>
        <div class={this.collapsed ? contentClass + ' hide-content' : contentClass }>
          <img alt={this.dinosaur.name} src={this.dinosaur.imageSrc} />
          <p>{this.dinosaur.description}</p>
        </div>
      </div>
    );
  }
}
