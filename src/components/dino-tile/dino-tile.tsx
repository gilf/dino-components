import {Component, Event, EventEmitter, Method, Prop} from '@stencil/core';
import { Dino } from "../../classes/Dino";

@Component({
  tag: 'dino-tile',
  styleUrl: 'dino-tile.css',
  shadow: true
})
export class DinoTile {
  @Prop() selected: boolean;
  @Prop() dinosaur: Dino;
  @Event() dinosaurSelected: EventEmitter<Dino>;

  constructor() {
    this.dinosaurSelectedHandler = this.dinosaurSelectedHandler.bind(this);
  }

  @Method()
  dinosaurSelectedHandler() {
    this.dinosaurSelected.emit(this.dinosaur);
  }

  render() {
    if (!this.dinosaur) {
      return '';
    }
    return (
      <li onClick={ this.dinosaurSelectedHandler } class={this.selected ? 'dino-selected' : ''} >
        <img src={this.dinosaur.imageSrc} alt={this.dinosaur.name} />
        <h2>{this.dinosaur.name}</h2>
      </li>
    );
  }
}
