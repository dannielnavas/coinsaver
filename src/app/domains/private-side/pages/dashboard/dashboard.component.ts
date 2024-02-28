import { NavbarComponent } from '@/app/shared/components/navbar/navbar.component';
import { IUserGoogle } from '@/app/shared/models/user-google.model';
import { Component, inject, signal } from '@angular/core';
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
  user = signal<IUserGoogle>({} as IUserGoogle);

  ngOnInit() {
    // this.addDoc();
    // this.getData();
    this.getDataUser();
  }

  getDataUser() {
    this.user.set(JSON.parse(sessionStorage.getItem('user') || '{}'));
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
