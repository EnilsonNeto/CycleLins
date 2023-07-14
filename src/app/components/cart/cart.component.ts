import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/interfaces/item';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itensCarrinho: Item[] = [];
  totalPreco: number = 0;

  constructor(private carrinhoService: CartService) { }

  ngOnInit() {
    this.carrinhoService.carrinhoSubject.subscribe((itens: Item[]) => {
      this.itensCarrinho = itens;
      this.calcularTotal();
    });
  }

  excluirItemCarrinho(item: Item) {
    const index = this.itensCarrinho.indexOf(item);
    if (index !== -1) {
      this.itensCarrinho.splice(index, 1);
      this.carrinhoService.excluirItemDoCarrinho(item);
      this.calcularTotal();
    }
  }

  calcularTotal() {
    this.totalPreco = this.itensCarrinho.reduce((total, item) => total + item.preco, 0);
  }
}
