import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

import 'rxjs/Rx';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    xmldata:string = "<root><book><title>Book 1</title><author>bhaskar</author></book><book><title>Book 2</title><author>satish</author></book></root>"
    jsonData:any;

    /*materials: Array<any> = [
        {'id': 1, 'name': 'Acrylic (Transparent)', 'quantity': '25', 'price': '$2.90'},
        {'id': 2, 'name': 'Plywood (Birch)', 'quantity': '50', 'price': '$1.25'},
        {'id': 3, 'name': 'Laminate (Gold on Blue)', 'quantity': '10', 'price': '$2.35'}
    ]*/

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.jsonData =  JSON.parse(xml2json(this.xmldata,'  '));
        console.log("book 1  :: " + this.jsonData.root.book[0]);
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}