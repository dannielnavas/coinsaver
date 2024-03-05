import { NavbarComponent } from '@/app/shared/components/navbar/navbar.component';
import { IUserGoogle } from '@/app/shared/models/user-google.model';
import { SessionService } from '@/app/shared/services/session.service';
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
  private sessionService = inject(SessionService);
  user = signal<IUserGoogle>({} as IUserGoogle);

  ngOnInit() {
    this.getDataUser();
    this.addDoc();
    this.filterIncomeUser();
  }

  getDataUser() {
    const user = this.sessionService.getUser();
    this.user.set(user);
  }

  async getData() {
    const data = (
      await getDocs(query(collection(this.firestore, 'income')))
    ).docs.map((data) => data.data());
    console.log(data);
  }

  async filterIncomeUser() {
    await getDocs(collection(this.firestore, 'income')).then(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
        });
      }
    );
  }

  async addDoc() {
    const user = this.sessionService.getUser();
    const docRef = await addDoc(collection(this.firestore, 'income'), {
      name: 'Salario',
      amount: 1000,
      user: this.user().user.uid,
    });
  }
}
