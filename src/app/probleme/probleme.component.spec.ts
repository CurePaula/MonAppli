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
    component.appliquerNotifications();
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  })

  it('Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications();

    let zone = component.problemeForm.get('telephone');
    //zone.setValue('');
    expect(zone.value).toBeNull();
  })

  it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications();
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  })

  it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications();
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  })


});
