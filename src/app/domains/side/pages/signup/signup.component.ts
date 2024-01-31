import { Component, Optional } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  createUser: FormGroup | undefined;
  constructor(
    @Optional() private auth: Auth,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createUser = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  async createAccount() {
    const data = await createUserWithEmailAndPassword(
      this.auth,
      this.createUser?.value.email,
      this.createUser?.value.password
    );
  }
}
