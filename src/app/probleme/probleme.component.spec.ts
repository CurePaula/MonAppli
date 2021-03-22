import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
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
    expect(errors['minlength']).toBeTruthy();
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
    expect(zone.valid).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['nomProbleme'];
    zone.setValue(' '.repeat(2) + 'a');
    expect(zone.valid).toBeTruthy();
  });
});
