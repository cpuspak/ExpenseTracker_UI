import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantSearchTabComponent } from './participant-search-tab.component';

describe('ParticipantSearchTabComponent', () => {
  let component: ParticipantSearchTabComponent;
  let fixture: ComponentFixture<ParticipantSearchTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantSearchTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantSearchTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
