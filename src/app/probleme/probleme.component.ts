import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

function courrielsValides(c: AbstractControl): { [key: string]: boolean } | null {
  let courriel = c.get('courriel');
  let courrielConfirmation = c.get('courrielConfirmation');

  if (!courriel.value || !courrielConfirmation.value) {
    return null;  
  }  
  if (courriel.value === courrielConfirmation.value) {
    return null;  
  } 
  return { 'courrielsInvalides': true };
};

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
      notification:['ne pas me notifier'],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: {value: Date(), disabled: true}
    
    });
    this.typeprobleme.obtenirTypeProblemes()
    .subscribe(prob => this.typesProblemes = prob,
               error => this.errorMessage = <any>error); 
               
    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.appliquerNotifications(value));
  }

  appliquerNotifications(typeNotification: string): void{
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationlControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationlControl.clearValidators();
    courrielConfirmationlControl.reset();
    courrielConfirmationlControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (typeNotification === 'notifier par courriel') {
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielControl.enable();
      courrielConfirmationlControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielConfirmationlControl.enable();
      courrielGroupControl.setValidators([Validators.compose([(courrielsValides)])]);
    } else if (typeNotification === 'notifier par messagerie texte') {
        telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(10), Validators.minLength(10)]);
        telephoneControl.enable();
    }  
    
  

    courrielControl.updateValueAndValidity();
    courrielConfirmationlControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
  }

}
