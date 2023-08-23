import { Component, OnInit, Input } from '@angular/core';
import { Produit } from '../../../models/produit.model';

@Component({
  selector: 'app-produits-form-usage',
  templateUrl: './produits-form-usage.component.html',
  styleUrls: ['./produits-form-usage.component.scss']
})
export class ProduitsFormUsageComponent implements OnInit {
  @Input() produit: Produit = {}

  constructor() { }

  ngOnInit(): void {
    if(!this.produit.methodeutilisation){
      this.produit.methodeutilisation = {}
    }
  }

}
