import { Component, OnInit, Input } from '@angular/core';
import { Produit } from '../../../models/produit.model';

@Component({
  selector: 'app-produits-form-sales-sku',
  templateUrl: './produits-form-sales-sku.component.html',
  styleUrls: ['./produits-form-sales-sku.component.scss']
})
export class ProduitsFormSalesSkuComponent implements OnInit {
  @Input() produit: Produit = {}

  salesList = [
    "Sales 1",
    "Sales 2",
    "Sales 3"
  ]

  constructor() { }

  ngOnInit(): void {
    if(!this.produit.salesSKU){
      this.produit.salesSKU = {}
    }
  }

}
