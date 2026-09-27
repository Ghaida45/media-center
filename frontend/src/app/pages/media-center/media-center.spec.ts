import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaCenter } from './media-center';

describe('MediaCenter', () => {
  let component: MediaCenter;
  let fixture: ComponentFixture<MediaCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCenter],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaCenter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
