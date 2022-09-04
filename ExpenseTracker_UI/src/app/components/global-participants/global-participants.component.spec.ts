import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalParticipantsComponent } from './global-participants.component';

describe('GlobalParticipantsComponent', () => {
  let component: GlobalParticipantsComponent;
  let fixture: ComponentFixture<GlobalParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
