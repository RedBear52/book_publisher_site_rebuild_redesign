import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedBookComponent } from './featured-book.component';

describe('FeaturedBookComponent', () => {
  let component: FeaturedBookComponent;
  let fixture: ComponentFixture<FeaturedBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
