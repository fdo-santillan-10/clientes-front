import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  value!: string;

  @Output()
  buscarId: EventEmitter<any>;

  constructor() { 
    this.buscarId = new EventEmitter();
  }

  ngOnInit(): void {
  }

  buscar() {
    this.buscarId.emit(this.value);
  }
}
