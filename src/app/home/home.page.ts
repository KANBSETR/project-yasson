import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services-firebase/firestore.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private firestore: FirestoreService
  ) { }

  ngOnInit() {
  }

  getUsuarios(){
    this.firestore.getCollection();
  }

}
