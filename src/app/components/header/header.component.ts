import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/interfaces/item';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideCartForMe: EventEmitter<any> = new EventEmitter();
  itensCarrinho: number = 0;

  constructor(private carrinhoService: CartService) { }

  ngOnInit() {
    this.carrinhoService.quantidadeItensSubject.subscribe((quantidade: number) => {
      this.itensCarrinho = quantidade;
    });
  }

  toggleSideCart() {
    this.toggleSideCartForMe.emit();
  }
}
