import {Component, Event, EventEmitter, Prop} from '@stencil/core';
import {SideDrawerDirection} from './side-drawer-consts';

@Component({
  tag: 'side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop() anchorDirection: SideDrawerDirection;
  @Prop() drawerWidth: number;
  @Prop() openDrawer: boolean;
  @Event() onOverlayClick: EventEmitter;

  constructor() {
    this.overlayClickHandler = this.overlayClickHandler.bind(this);
  }

  overlayClickHandler() {
    this.onOverlayClick.emit();
  }

  render() {
    const drawerStyle = {
      width: `${this.drawerWidth || 25}%`
    };

    return (
      <div>
        {
          this.openDrawer && [
            <div class={`drawer ${this.anchorDirection || SideDrawerDirection.right.toString()}`} style={drawerStyle}>
              <slot />
            </div>,
            <div class="overlay" role="presentation" onClick={this.overlayClickHandler}/>
          ]
        }
      </div>
    );
  }
}
