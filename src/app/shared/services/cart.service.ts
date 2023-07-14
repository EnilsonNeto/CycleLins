import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private sessionStorageKey = 'carrinho';

  itensCarrinho: Item[] = [];
  carrinhoSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  quantidadeItensSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0); // Novo BehaviorSubject

  constructor() {
    const carrinho = sessionStorage.getItem(this.sessionStorageKey);
    if (carrinho) {
      this.itensCarrinho = JSON.parse(carrinho);
      this.carrinhoSubject.next(this.itensCarrinho);
      this.atualizarQuantidadeItens();
    }
  }

  adicionarItemAoCarrinho(item: Item) {
    this.itensCarrinho.push(item);
    this.carrinhoSubject.next(this.itensCarrinho);
    this.salvarCarrinhoNoSessionStorage();
    this.atualizarQuantidadeItens();
  }

  excluirItemDoCarrinho(item: Item) {
    this.itensCarrinho = this.itensCarrinho.filter((it) => it.id !== item.id);
    this.atualizarQuantidadeItens();
    this.carrinhoSubject.next(this.itensCarrinho);
    this.salvarCarrinhoNoSessionStorage();
  }

  private salvarCarrinhoNoSessionStorage() {
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(this.itensCarrinho));
  }

  private atualizarQuantidadeItens() {
    this.quantidadeItensSubject.next(this.itensCarrinho.length);
  }
}
