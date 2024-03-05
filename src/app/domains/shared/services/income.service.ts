import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

const PATH = 'income';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private firebase = inject(Firestore);
  private collection = collection(this.firebase, PATH);

  getContacts() {
    return collectionData(this.collection, { idField: 'id' }) as Observable<[]>;
  }

  async getContact(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as unknown as {};
    } catch (error) {
      //catch error
      return undefined;
    }
  }

  async searchContactByQuery(name: string) {
    const q = query(
      this.collection,
      where('fullName', '>=', name),
      where('fullName', '<=', name + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    let contacts: [] = [];
    querySnapshot.forEach((doc) => {
      contacts = [...contacts, { id: doc.id, ...doc.data() }] as unknown as [];
    });
    return contacts;
  }

  createContact(contact: {}) {
    return addDoc(this.collection, contact);
  }

  updateContact(id: string, contact: {}) {
    return updateDoc(this.document(id), { ...contact });
  }

  deleteContact(id: string) {
    return deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this.firebase, `${PATH}/${id}`);
  }
}
