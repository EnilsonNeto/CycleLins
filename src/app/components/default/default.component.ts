import { Component } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
  sideBarOpen = true;
  sideBarOpenCart = false;

  constructor() { }

  ngOnInit() {
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  toggleSideCart() {
    this.sideBarOpenCart = !this.sideBarOpenCart;
  }
}
