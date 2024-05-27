import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookObserverComponent } from './book-observer.component';

describe('BookObserverComponent', () => {
  let component: BookObserverComponent;
  let fixture: ComponentFixture<BookObserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookObserverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
