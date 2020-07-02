import { ContratId } from './contrat-id';


export class Contrat {
    pkContrat: ContratId;
    date_Debut: Date;
    date_Fin: Date;
    salaire_initial: number;
    motif: String;
    archive: Boolean;

}