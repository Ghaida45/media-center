import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentSentReview } from './content-sent-review';

describe('ContentSentReview', () => {
  let component: ContentSentReview;
  let fixture: ComponentFixture<ContentSentReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentSentReview],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentSentReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
