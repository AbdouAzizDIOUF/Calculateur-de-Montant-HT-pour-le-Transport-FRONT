import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {TransportService} from "../../../service/transport.service";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {Client} from "../../../api/client";
import {Tarif} from "../../../api/tarif";
import {ConditionTaxtations} from "../../../api/ConditionTaxtation";
import {Localite} from "../../../api/localite";

@Component({
    templateUrl: './saas.dashboard.component.html'
})
export class SaaSDashboardComponent implements OnInit, OnDestroy {

    clients: Client[] = [];
    tarifs: Tarif[] = [];
    taxtations: ConditionTaxtations[] = [];
    localites: Localite[] = [];


    client_size: number = 0;
    tarif_size: number = 0;
    localite_size: number = 0;
    taxtaion_size: number = 0;

    constructor(public layoutService: LayoutService, private transport: TransportService, private router: Router) {

    }

    ngOnInit() {
        this.getClients();
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    navigateToCreateUser(){
        this.router.navigate(['profile/create'])
    }


    get colorScheme(): string {
        return this.layoutService.config.colorScheme;
    }

    ngOnDestroy(): void {

    }

    getClients() {
        this.tarifs = [];
        this.taxtations = [];
        this.localites = [];
        this.transport.getAllClients().subscribe(data=>{
            console.log(data)
            this.clients = data;
            console.log(this.clients)
        })
    }

    getLocalites() {
        this.tarifs = [];
        this.taxtations = [];
        this.clients = [];
        this.transport.getLocalites().subscribe(data=>{
            this.localites = data;
        })
    }

    getTaxation() {
        this.tarifs = [];
        this.localites = [];
        this.clients = [];
        this.transport.getTaxation().subscribe(data=>{
            this.taxtations = data;
        })
    }

    getTarifs() {
        this.localites = [];
        this.taxtations = [];
        this.clients = [];
        this.transport.getTarifs().subscribe(data=>{
            console.log(data);
            this.tarifs = data;
        })
    }
}
