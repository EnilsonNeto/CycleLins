import { Component } from '@angular/core';
import { Item } from 'src/app/shared/interfaces/item';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private carrinhoService: CartService) { }

  adicionarItemAoCarrinho(item: Item) {
    this.carrinhoService.adicionarItemAoCarrinho(item);
    console.log(item);
  }

  generateRandomId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

}
