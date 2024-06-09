import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBooksComponent } from './loading-books.component';

describe('LoadingBooksComponent', () => {
  let component: LoadingBooksComponent;
  let fixture: ComponentFixture<LoadingBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
