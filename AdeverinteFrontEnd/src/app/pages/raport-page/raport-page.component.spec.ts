import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportPageComponent } from './raport-page.component';

describe('RaportPageComponent', () => {
  let component: RaportPageComponent;
  let fixture: ComponentFixture<RaportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaportPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
