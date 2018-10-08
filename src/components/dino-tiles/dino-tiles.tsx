import {Component, Listen, Prop, State} from '@stencil/core';
import { Dino } from "../../classes/Dino";

@Component({
  tag: 'dino-tiles',
  styleUrl: 'dino-tiles.css',
  shadow: true
})
export class DinoTiles {
  @State() selected: Dino;
  @Prop() dinosaurs: Array<Dino>;

  componentWillLoad() {
    this.selected = this.dinosaurs ? this.dinosaurs[0] : undefined;
  }

  @Listen('dinosaurSelected')
  dinosaurSelectedHandler(event: CustomEvent) {
    this.selected = event.detail;
  }

  renderItems() {
    if (this.dinosaurs) {
      return this.dinosaurs.map(dinosaur => {
        return <dino-tile selected={this.selected === dinosaur} dinosaur={dinosaur}></dino-tile>
      });
    }
  }

  render() {
    return (
      <ul>
        { this.renderItems() }
      </ul>
    );
  }
}
