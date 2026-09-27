import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentSentReviewDetails } from './content-sent-review-details';

describe('ContentSentReviewDetails', () => {
  let component: ContentSentReviewDetails;
  let fixture: ComponentFixture<ContentSentReviewDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentSentReviewDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentSentReviewDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
