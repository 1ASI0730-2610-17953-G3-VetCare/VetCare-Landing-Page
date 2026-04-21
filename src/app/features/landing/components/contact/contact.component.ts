import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

interface SubjectOption {
  value: string;
  label: string;
}

interface FAQ {
  questionKey: string;
  answerKey: string;
  isOpen: boolean;
}

declare var AOS: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  formStatus: 'idle' | 'success' | 'error' = 'idle';
  subjectOptions: SubjectOption[] = [];
  faqs: FAQ[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initSubjectOptions();
    this.initializeFaqs();
  }


  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['general', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  private initSubjectOptions(): void {
    this.subjectOptions = [
      { value: 'general', label: 'CONTACT.SUBJECT_GENERAL' },
      { value: 'support', label: 'CONTACT.SUBJECT_SUPPORT' },
      { value: 'sales', label: 'CONTACT.SUBJECT_SALES' },
      { value: 'partnership', label: 'CONTACT.SUBJECT_PARTNERSHIP' },
    ];
  }

  private initializeFaqs(): void {
    this.faqs = [
      {
        questionKey: 'CONTACT.FAQ1_QUESTION',
        answerKey: 'CONTACT.FAQ1_ANSWER',
        isOpen: false,
      },
      {
        questionKey: 'CONTACT.FAQ2_QUESTION',
        answerKey: 'CONTACT.FAQ2_ANSWER',
        isOpen: false,
      },
      {
        questionKey: 'CONTACT.FAQ3_QUESTION',
        answerKey: 'CONTACT.FAQ3_ANSWER',
        isOpen: false,
      },
      {
        questionKey: 'CONTACT.FAQ4_QUESTION',
        answerKey: 'CONTACT.FAQ4_ANSWER',
        isOpen: false,
      },
    ];
  }
  // TODO: Reemplaza con las URLs reales del nuevo proyecto
  socialLinks = [
    { name: 'Facebook',  url: 'https://TODO-FACEBOOK-URL' },
    { name: 'X/Twitter', url: 'https://TODO-TWITTER-URL' },
    { name: 'Instagram', url: 'https://TODO-INSTAGRAM-URL' },
    { name: 'LinkedIn',  url: 'https://TODO-LINKEDIN-URL' },
  ];

  openSocialLink(url: string): void {
    window.open(url, '_blank');
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.formStatus = 'idle';

      // Simulación de envío a API
      setTimeout(() => {
        // Simulamos un 90% de éxito
        const success = Math.random() > 0.1;

        if (success) {
          this.formStatus = 'success';
          this.contactForm.reset();
          // Restauramos el valor por defecto del subject
          this.contactForm.patchValue({ subject: 'general' });
        } else {
          this.formStatus = 'error';
        }

        this.isSubmitting = false;
      }, 1500);
    }
  }
}
