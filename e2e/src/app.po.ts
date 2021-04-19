import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/probleme');
  }

  async getParagraphText() : Promise<string> {
    return element(by.css('app-root h5')).getText();
  }

  // Permet de vider toutes les zones.  A appeller dans chaque test.
  async viderToutesLesZones() : Promise<void> {
    element(by.id('prenomId')).clear();  
    element(by.id('nomId')).clear();     
    // Sélectionner le premier élément dans la zone de liste déroulante (Sélectionner un type de problème (obligatoire))
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(0).click();      
    // Cliquer sur le bouton radio par défaut (Pas de notification)
    element.all(by.id('notificationId')).get(0).click();
    element(by.id('courrielId')).clear();
    element(by.id('courrielConfirmationId')).clear();   
    element(by.id('telephoneId')).clear();       
    element(by.id('noUniteId')).clear();
    element(by.id('descriptionProblemeId')).clear();     
  }

  // Inscrire tous les renseignements obligatoires pour le scénario de base 
  async setChampsValidesScenarioNominal() : Promise<void> {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    element.all(by.id('notificationId')).get(0).click();  
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setChampsValidesScenarioAlternatifParMessageTexte() : Promise<void> {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom'); 
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(2).click(); 
    element.all(by.id('notificationId')).get(2).click();
    element(by.id('telephoneId')).sendKeys('1234567891');         
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setChampsValidesScenarioAlternatifParCourriel() : Promise<void> {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom'); 
    await element(by.id('typeProblemeId')).all(by.tagName('option')).get(2).click(); 
    element.all(by.id('notificationId')).get(1).click();
    element(by.id('courrielId')).sendKeys('courriel@test.com');  
    element(by.id('courrielConfirmationId')).sendKeys('courriel@test.com');        
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  // Permet d'obtenir toutes les propriétés et leurs valeurs du bouton Sauvegarder
  boutonSubmit() : ElementFinder { 
    return element(by.buttonText('Sauvegarder'));
  } 

  async setZoneDescriptionProblemeCaracteresInuffisants() : Promise<void> {
    element(by.id('descriptionProblemeId')).sendKeys('XX');
  }

  async setZoneDescriptionProblemeCaracteresSuffisants() : Promise<void> {
    element(by.id('descriptionProblemeId')).sendKeys('XXXXXX');
  }

  obtenirClasseZoneDescriptionProbleme()   { 
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  } 
}
