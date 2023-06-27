import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {TransportService} from "../../../service/transport.service";
import {Client} from "../../../api/client";
import {Result} from "../../../api/Result";
import {Dataoutput} from "../../../api/Dataoutput";


interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService, ConfirmationService],
    encapsulation: ViewEncapsulation.None,
})
export class CrudComponent implements OnInit {


    stateOptions: any[] = [{label: 'Off', value: 'false'}, {label: 'On', value: 'true'}];

    value: string = 'false';

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;


    submitted: boolean = false;

    cols: any[] = [];
    countries: any[] | undefined;

    countries2: any[] | undefined;

    selectedCountry: any;

    filteredCountries: any[] = [];

    filteredCountries2: any[] = [];


    clients : Client[] = [];
    clients2 : Client[] = [];

    results : Result[] = [];

    result : Dataoutput = {};

    error?: string;

    constructor(private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private transportService : TransportService
                ) { }

    ngOnInit() {

        this.transportService.resultsCalculs().subscribe(res=>{
            // @ts-ignore
            this.results = res['_embedded']['resultCalculs'];
            console.log(this.results)
        })

        this.transportService.getAllClients().subscribe(client=>{
            this.clients = client;
            this.clients2 = client;
        });
    }

    openNew() {
        this.result = {};
        this.submitted = false;
        this.productDialog = true;
    }


    deleteProduct(result: Result) {
        this.deleteProductDialog = true;
        this.result = { ...result };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.result = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {

        // @ts-ignore
        let idDestinataire = this.result['idDestinataire']['idClient']
        // @ts-ignore
        let idExpediteur = this.result['idExpediteur']['idClient']

        let nombreColis  = this.result.nombreColis;
        let poids = this.result.poids;

        /*this.transportService.calculerMontantTransport(idExpediteur, idDestinataire, nombreColis, poids, this.value)*/

        if (
            idExpediteur !== null &&
            idExpediteur !== undefined &&
            idDestinataire !== null &&
            idDestinataire !== undefined &&
            nombreColis !== null &&
            nombreColis !== undefined &&
            poids !== null &&
            poids !== undefined
        ) {
            this.transportService.calculerMontantTransport(
                idExpediteur,
                idDestinataire,
                nombreColis,
                poids,
                this.value
            );
            // Toutes les données sont bien renseignées
            this.transportService.calculerMontantTransport(idExpediteur, idDestinataire, nombreColis, poids, this.value).subscribe(data=>{
                console.log(data);
            });
            this.submitted = true;

            this.results = [...this.results];
            this.productDialog = false;
            this.result = {};
            this.error = '';
            location.reload();
        } else {
            // Au moins une donnée est manquante ou invalide
            // Effectuer une action appropriée, comme afficher un message d'erreur ou empêcher l'appel au service
            this.error = "les données renseignés ne sont pas correctes"
            console.log(this.error);
        }


    }



    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    filterClient(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.clients as any[]).length; i++) {
            let country = (this.clients as any[])[i];
            if (country.raisonSociale.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.filteredCountries = filtered;
    }


    filterClient2(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.clients2 as any[]).length; i++) {
            let country = (this.clients2 as any[])[i];
            if (country.raisonSociale.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries2 = filtered;
    }



}
