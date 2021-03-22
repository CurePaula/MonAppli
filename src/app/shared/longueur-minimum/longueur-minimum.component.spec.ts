import { AbstractControl } from "@angular/forms";
import { ZonesValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {
    it('une chaîne avec 10 espaces est invalide', ()=> {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: '          ' };
        // Faire l'appel du validateur
        let result = validator(valeurControle as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('Une phrase avec des mots est valide', ()=> {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: 'Vive angular' };
        // Faire l'appel du validateur
        let result = validator(valeurControle as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', ()=> {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: '   je le veux   ' };
        // Faire l'appel du validateur
        let result = validator(valeurControle as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('Une phrase avec 1 espace et 2 caractères est invalide', ()=> {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: ' xx' };
        // Faire l'appel du validateur
        let result = validator(valeurControle as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('Une phrase avec 2 espaces et 1 caractère est invalide', ()=> {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: '  x' };
        // Faire l'appel du validateur
        let result = validator(valeurControle as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('Une phrase avec 3 espaces et 3 caractères est valide', ()=> {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: '   xxx' };
        // Faire l'appel du validateur
        let result = validator(valeurControle as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', ()=> {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: '     xxxxx     ' };
        // Faire l'appel du validateur
        let result = validator(valeurControle as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('Une chaîne nulle est invalide', ()=> {
        // Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: null };
        // Faire l'appel du validateur
        let result = validator(valeurControle as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });
});