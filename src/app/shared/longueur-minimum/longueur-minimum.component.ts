import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZonesValidator {
    static longueurMinimum(longueur: number): ValidatorFn {
        // Sous ANGULAR dans les validateurs pour indiquer un succès retourner NULL autrement retourner une clé valeur json
        return (c: AbstractControl): {[key: string]: boolean } | null => {
            if (c.value != null && c.value.trim().length >= longueur){
                return null
            }
            return {'nbreCaracteresInsuffisants': true };

        };
    }
}

