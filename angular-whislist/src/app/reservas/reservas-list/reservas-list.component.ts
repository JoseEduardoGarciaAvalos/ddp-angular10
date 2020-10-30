import { Component, OnInit } from '@angular/core';
import { ReservasApiClientService } from '../reservas-api-client.service';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent implements OnInit {

  constructor(public api: ReservasApiClientService) { }

  ngOnInit(): void {
  }

}
