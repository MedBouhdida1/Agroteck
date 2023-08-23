import { Component, OnInit, Input } from '@angular/core';
import { Fournisseur } from 'app/modules/fournisseurs/models/fournisseur.model';
import { FournisseursService } from 'app/modules/fournisseurs/services/fournisseurs.service';
import { Produit } from '../../../models/produit.model';

@Component({
  selector: 'app-produits-form-group',
  templateUrl: './produits-form-group.component.html',
  styleUrls: ['./produits-form-group.component.scss']
})
export class ProduitsFormGroupComponent implements OnInit {

  @Input() produit: Produit = {}
  vendors: Array<Fournisseur> = []

  constructor(
    private fournisseursService: FournisseursService
  ) { }

  ngOnInit(): void {
    if(!this.produit.fournisseur){
      this.produit.fournisseur = {}
    }
    this.getAllVendors()
  }

  getAllVendors(){
    this.fournisseursService.findAll().subscribe({
      next: result => this.vendors = result,
      error: error => console.error(error)
    })
  }

  onVendorChange(){
    if(this.produit.fournisseur!.id){
      this.produit.fournisseur = this.vendors.find(elem => elem.id === this.produit.fournisseur!.id)
    }
  }

}
