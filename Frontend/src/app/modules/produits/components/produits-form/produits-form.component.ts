import { Component, OnInit, Input } from '@angular/core';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-produits-form',
  templateUrl: './produits-form.component.html',
  styleUrls: ['./produits-form.component.scss']
})
export class ProduitsFormComponent implements OnInit {

  @Input() produit!: Produit
  @Input() currentStep!: number

  constructor() { }

  ngOnInit(): void {
  }


}
