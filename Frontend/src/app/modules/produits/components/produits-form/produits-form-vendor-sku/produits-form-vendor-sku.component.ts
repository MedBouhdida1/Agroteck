import { Component, OnInit, Input } from '@angular/core';
import { Produit } from '../../../models/produit.model';

@Component({
  selector: 'app-produits-form-vendor-sku',
  templateUrl: './produits-form-vendor-sku.component.html',
  styleUrls: ['./produits-form-vendor-sku.component.scss']
})
export class ProduitsFormVendorSkuComponent implements OnInit {
  @Input() produit: Produit = {}
  vendors = [
    "Vendor 1",
    "Vendor 2",
    "Vendor 3"
  ]

  constructor() { }

  ngOnInit(): void {
    if(!this.produit.vendorSKU){
      this.produit.vendorSKU = {}
    }
  }

}
