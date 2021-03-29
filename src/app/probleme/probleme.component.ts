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
      typeProbleme: ['',[ Validators.required]],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
    
    });

    this.typeprobleme.obtenirTypeProblemes()
    .subscribe(prob => this.typesProblemes = prob,
               error => this.errorMessage = <any>error);  
  }

  appliquerNotifications(): void{
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationlControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephoneControl = this.problemeForm.get('telephone');

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationlControl.clearValidators();
    courrielConfirmationlControl.reset();
    courrielConfirmationlControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();



    courrielControl.updateValueAndValidity();
    courrielConfirmationlControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
    
  }

}
