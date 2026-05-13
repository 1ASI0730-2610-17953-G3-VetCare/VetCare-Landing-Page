import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

interface Stat {
  value: string;
  label: string;
}

interface SuccessCase {
  id: string;
  titleKey: string;
  categoryKey: string;
  image: string;
  descKey: string;
  stats: Stat[];
}

interface Brand {
  name: string;
  logo: string;
}

declare var AOS: any;

@Component({
  selector: 'app-success-cases',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    RouterModule,
  ],

  templateUrl: './success-cases.component.html',
  styleUrls: ['./success-cases.component.scss'],
})
export class SuccessCasesComponent implements OnInit, AfterViewInit {
  cases: SuccessCase[] = [];
  brands: Brand[] = [];
  readonly appUrl = 'https://vtcare.netlify.app';

   openApp(): void {
    window.open(this.appUrl, '_blank');
  }
  ngOnInit(): void {
    this.initializeCases();
    this.initializeBrands();
  }

  ngAfterViewInit(): void {
    // AOS se inicializa centralmente en LandingComponent
  }

  private initializeCases(): void {
    this.cases = [
      {
        id: 'case1',
        titleKey: 'SUCCESS_CASES.CASE1_TITLE',
        categoryKey: 'SUCCESS_CASES.CATEGORY_X',
        image: '../../../../../assets/images/case1.png',
        descKey: 'SUCCESS_CASES.CASE1_DESC',
        stats: [
        ],
      },
      {
        id: 'case2',
        titleKey: 'SUCCESS_CASES.CASE2_TITLE',
        categoryKey: 'SUCCESS_CASES.CATEGORY_Y',
        image: '../../../../../assets/images/case2.png',
        descKey: 'SUCCESS_CASES.CASE2_DESC',
        stats: [
        ],
      },
      {
        id: 'case3',
        titleKey: 'SUCCESS_CASES.CASE3_TITLE',
        categoryKey: 'SUCCESS_CASES.CATEGORY_Z',
        image: '../../../../../assets/images/case3.png',
        descKey: 'SUCCESS_CASES.CASE3_DESC',
        stats: [
        ],
      },
    ];
  }

  private initializeBrands(): void {
    // TODO: Agrega aquí las marcas/partners del nuevo proyecto
    // Ejemplo: { name: 'Empresa X', logo: 'assets/images/brand-x.png' }
    this.brands = [];
  }
}
