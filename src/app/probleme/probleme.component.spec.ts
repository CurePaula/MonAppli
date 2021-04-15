import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers: [TypeproblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['nomProbleme'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 2 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.get('nomProbleme');
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(zone.valid).toBeFalsy(); //errors['minlength']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['nomProbleme'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.get('nomProbleme');
    //zone.setValue('a'.repeat(0));
    errors = zone.errors || {};
    expect(zone.valid).toBeFalsy();
  });

  it('Zone PRÉNOM invalide avec 10 espaces', () => {
    let zone = component.problemeForm.controls['nomProbleme'];
    zone.setValue(' '.repeat(10));
    expect(zone.valid).toBeFalsy();
  });

  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['nomProbleme'];
    zone.setValue(' '.repeat(2) + 'a');
    expect(zone.valid).toBeFalsy();
  });

  it('Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('ne pas me notifier');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  })

  it('Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('ne pas me notifier');

    let zone = component.problemeForm.get('telephone');
    //zone.setValue('');
    expect(zone.value).toBeNull();
  })

  it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('ne pas me notifier');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  })

  it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('ne pas me notifier');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  })

  it('Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('notifier par courriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  })
  
  it('Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('notifier par courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).not.toEqual('DISABLED');
  })

  it('Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('notifier par courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('DISABLED');
  })

  it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('notifier par courriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    //zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  })

  it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('notifier par courriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    //zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  })

  it('Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('notifier par courriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('adresse');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  })

  it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('notifier par courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneConfirmation.setValue('courriel@Test.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielsInvalides']).toBeUndefined();
  })

  it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('notifier par courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('courriel@Test.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielsInvalides']).toBeUndefined();
  })

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('notifier par courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('courriel2@Test.com');
    zoneConfirmation.setValue('courriel@Test.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielsInvalides']).toBeTruthy();
  })

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('notifier par courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('courriel@Test.com');
    zoneConfirmation.setValue('courriel@Test.com');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielsInvalides']).toBeUndefined();
  })

  it('Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifier par messagerie texte');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED');
  })
  
  it('Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifier par messagerie texte');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeTrue();
  })

  it('Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifier par messagerie texte');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.disabled).toBeTrue();
  })

  it('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifier par messagerie texte');
    let errors = {};
    let zone = component.problemeForm.get('telephone');
    //zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  })

  it('Zone TELEPHONE est invalide avec avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifier par messagerie texte');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('cinq');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  })

  it('Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifier par messagerie texte');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('2'.repeat(11));
    errors = zone.errors || {};
    expect(errors['maxlength']).toBeTruthy(); 
  });

  it('Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifier par messagerie texte');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('2'.repeat(9));
    errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy(); 
  });

  it('Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifier par messagerie texte');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('2'.repeat(10));
    expect(zone.valid).toBeTruthy();
  });

});
