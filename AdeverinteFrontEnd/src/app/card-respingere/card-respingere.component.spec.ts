import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRespingereComponent } from './card-respingere.component';

describe('CardRespingereComponent', () => {
  let component: CardRespingereComponent;
  let fixture: ComponentFixture<CardRespingereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRespingereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardRespingereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
