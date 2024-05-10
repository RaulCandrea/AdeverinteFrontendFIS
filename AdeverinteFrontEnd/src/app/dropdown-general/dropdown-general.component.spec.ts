import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownGeneralComponent } from './dropdown-general.component';

describe('DropdownGeneralComponent', () => {
  let component: DropdownGeneralComponent;
  let fixture: ComponentFixture<DropdownGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
