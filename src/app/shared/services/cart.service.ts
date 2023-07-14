import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../interfaces/item';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private sessionStorageKey = 'carrinho';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  itensCarrinho: Item[] = [];
  carrinhoSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  quantidadeItensSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0); // Novo BehaviorSubject

  constructor(private _snackBar: MatSnackBar) {
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
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open('Item adicionado', 'Fechar', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'custom-snackbar'
    });
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
