import { Component, OnInit, Input } from '@angular/core';
import { Fournisseur } from '../../models/fournisseur.model';

@Component({
  selector: 'app-fournisseurs-form',
  templateUrl: './fournisseurs-form.component.html',
  styleUrls: ['./fournisseurs-form.component.scss']
})
export class FournisseursFormComponent implements OnInit {

  @Input() fournisseur!: Fournisseur
  @Input() currentStep!: number

  constructor() { }

  ngOnInit(): void {
  }



}
