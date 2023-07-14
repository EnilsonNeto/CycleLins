import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/interfaces/item';
import { CartService } from 'src/app/shared/services/cart.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      html: `Você tem certeza que deseja <b>${item.nome}</b> remover do seu carrinho?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remover item!',
      cancelButtonText: 'cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.itensCarrinho.indexOf(item);
        if (index !== -1) {
          this.itensCarrinho.splice(index, 1);
          this.carrinhoService.excluirItemDoCarrinho(item);
          this.calcularTotal();
        }
      }
    })
  }

  calcularTotal() {
    this.totalPreco = this.itensCarrinho.reduce((total, item) => total + item.preco, 0);
  }
}
