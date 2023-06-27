import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../api/client";
import {Localite} from "../api/localite";
import {ConditionTaxtations} from "../api/ConditionTaxtation";
import {Tarif} from "../api/tarif";
import {Result} from "../api/Result";

@Injectable({
  providedIn: 'root'
})
export class TransportService {

    constructor(private http: HttpClient) { }


    getAllClients(){
        return this.http.get<Client[]>('http://localhost:8080/clients')
    }

    getLocalites(){
        return this.http.get<Localite[]>('http://localhost:8080/localites')
    }

    getTaxation(){
        return this.http.get<ConditionTaxtations[]>('http://localhost:8080/ctaxtations')
    }
    getTarifs(){
        return this.http.get<Tarif[]>('http://localhost:8080/tarifs')
    }

    getSize(url: string){
        return this.http.get<any[]>('http://localhost:8080/'+url)
    }

    /**
     *
     * @param idExp
     * @param idDest
     * @param nombreColis
     * @param poids
     * @param portPaye
     */
    calculerMontantTransport(idExp: number, idDest: number, nombreColis: number | undefined, poids: number | undefined, portPaye: string){

        const url = `http://localhost:8080/calcul-montant?idExp=${idExp}&idDest=${idDest}&nombreColis=${nombreColis}&poids=${poids}&portPaye=${portPaye}`;
        //console.log(url);
        return this.http.get(url);
    }


    resultsCalculs(){
        return this.http.get<Result>('http://localhost:8080/resultCalculs');
    }
}
