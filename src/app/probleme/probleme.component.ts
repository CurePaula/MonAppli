import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  
  problemeForm: FormGroup;
  typesProblemes: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private typeprobleme: TypeproblemeService) { }
  save(): void {
  }
  ngOnInit() {
    this.problemeForm = this.fb.group({
      nomProbleme: ['',[ Validators.required, ZonesValidator.longueurMinimum(3)]],
      longueur: ['', [Validators.required, Validators.maxLength(50)]],
      typeProbleme: ['',[ Validators.required]]
    });

    this.typeprobleme.obtenirTypeProblemes()
    .subscribe(prob => this.typesProblemes = prob,
               error => this.errorMessage = <any>error);  


  }

}
