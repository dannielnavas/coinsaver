import { NavbarComponent } from '@/app/shared/components/navbar/navbar.component';
import { Component, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  firestore = inject(Firestore);

  ngOnInit() {
    // this.addDoc();
    // this.getData();
  }

  async getData() {
    const data = (
      await getDocs(query(collection(this.firestore, 'testPath')))
    ).docs.map((data) => data.data());

    console.log(data);
  }

  async addDoc() {
    const docRef = await addDoc(collection(this.firestore, 'testPath'), {
      test: 'test',
    });
    console.log('Document written with ID: ', docRef.id);
  }
}
