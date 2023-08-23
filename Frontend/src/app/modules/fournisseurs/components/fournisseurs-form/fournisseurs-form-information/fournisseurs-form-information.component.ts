import { Component, OnInit, Input } from '@angular/core';
import { Fournisseur } from '../../../models/fournisseur.model';

@Component({
  selector: 'app-fournisseurs-form-information',
  templateUrl: './fournisseurs-form-information.component.html',
  styleUrls: ['./fournisseurs-form-information.component.scss']
})
export class FournisseursFormInformationComponent implements OnInit {

  @Input() fournisseur!: Fournisseur
  constructor() { }

  ngOnInit(): void {
  }

}
