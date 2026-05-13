import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

interface PlanFeature {
  key: string;
  highlighted: boolean;
}

interface Plan {
  nameKey: string;
  descriptionKey: string;
  icon: string;
  price: number;
  features: PlanFeature[];
  ctaKey: string;
  popular: boolean;
}

interface FAQ {
  questionKey: string;
  answerKey: string;
  isOpen: boolean;
}

declare var AOS: any;

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit, AfterViewInit, OnDestroy {
  /** Precios en `initializePlans` están en USD. Para ES se muestran en PEN. */
  private readonly penPerUsd = 3.75;

  plans: Plan[] = [];
  faqs: FAQ[] = [];
  billingPeriod: 'monthly' | 'yearly' = 'monthly';
  currentLang = 'es';
  private langSubscription: Subscription | null = null;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.currentLang =
      this.translate.currentLang ||
      this.translate.getDefaultLang() ||
      'es';
    this.langSubscription = this.translate.onLangChange.subscribe((e) => {
      this.currentLang = e.lang;
    });
    this.initializePlans();
    this.initializeFaqs();
  }

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    // AOS se inicializa centralmente en LandingComponent
  }

  changeBillingPeriod(period: 'monthly' | 'yearly'): void {
    this.billingPeriod = period;
  }

  calculateYearlyPrice(monthlyPrice: number): number {
    // Apply 20% discount and multiply by 12 months
    return monthlyPrice * 0.8 * 12;
  }

  calculateSavings(monthlyPrice: number): number {
    // Calculate how much they save per year with the discount
    const regularYearlyPrice = monthlyPrice * 12;
    const discountedYearlyPrice = this.calculateYearlyPrice(monthlyPrice);
    return regularYearlyPrice - discountedYearlyPrice;
  }

  get currencyCode(): string {
    return this.currentLang === 'en' ? 'USD' : 'PEN';
  }

  get displayLocale(): string {
    return this.currentLang === 'en' ? 'en-US' : 'es-PE';
  }

  /** Convierte un monto en USD al que se muestra según idioma (PEN si ES). */
  toDisplayAmount(usdAmount: number): number {
    return this.currentLang === 'es' ? usdAmount * this.penPerUsd : usdAmount;
  }

  getDisplayPrice(plan: Plan): number {
    if (plan.price === 0) {
      return 0;
    }
    const usd =
      this.billingPeriod === 'yearly'
        ? this.calculateYearlyPrice(plan.price)
        : plan.price;
    return this.toDisplayAmount(usd);
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
  readonly appUrl = 'https://vtcare.netlify.app';

   openApp(): void {
    window.open(this.appUrl, '_blank');
  }
  private initializePlans(): void {
    this.plans = [
      {
        nameKey: 'PLANS.PLAN1_NAME',
        descriptionKey: 'PLANS.PLAN1_DESCRIPTION',
        icon: 'person',
        price: 0,
        features: [
          { key: 'PLANS.PLAN1_FEATURE1', highlighted: false },
          { key: 'PLANS.PLAN1_FEATURE2', highlighted: false },
          { key: 'PLANS.PLAN1_FEATURE3', highlighted: false },
        ],
        ctaKey: 'PLANS.PLAN1_CTA',
        popular: false,
      },
      {
        nameKey: 'PLANS.PLAN2_NAME',
        descriptionKey: 'PLANS.PLAN2_DESCRIPTION',
        icon: 'star',
        price: 29,
        features: [
          { key: 'PLANS.PLAN2_FEATURE1', highlighted: true },
          { key: 'PLANS.PLAN2_FEATURE2', highlighted: true },
          { key: 'PLANS.PLAN2_FEATURE3', highlighted: false },
          { key: 'PLANS.PLAN2_FEATURE4', highlighted: false },
        ],
        ctaKey: 'PLANS.PLAN2_CTA',
        popular: true,
      },
      {
        nameKey: 'PLANS.PLAN3_NAME',
        descriptionKey: 'PLANS.PLAN3_DESCRIPTION',
        icon: 'workspace_premium',
        price: 79,
        features: [
          { key: 'PLANS.PLAN3_FEATURE1', highlighted: true },
          { key: 'PLANS.PLAN3_FEATURE2', highlighted: true },
          { key: 'PLANS.PLAN3_FEATURE3', highlighted: true },
          { key: 'PLANS.PLAN3_FEATURE4', highlighted: false },
          { key: 'PLANS.PLAN3_FEATURE5', highlighted: false },
        ],
        ctaKey: 'PLANS.PLAN3_CTA',
        popular: false,
      },
    ];
  }

  private initializeFaqs(): void {
    this.faqs = [
      {
        questionKey: 'PLANS.FAQ1_QUESTION',
        answerKey: 'PLANS.FAQ1_ANSWER',
        isOpen: false,
      },
      {
        questionKey: 'PLANS.FAQ2_QUESTION',
        answerKey: 'PLANS.FAQ2_ANSWER',
        isOpen: false,
      },
      {
        questionKey: 'PLANS.FAQ3_QUESTION',
        answerKey: 'PLANS.FAQ3_ANSWER',
        isOpen: false,
      },
      {
        questionKey: 'PLANS.FAQ4_QUESTION',
        answerKey: 'PLANS.FAQ4_ANSWER',
        isOpen: false,
      },
    ];
  }
}
