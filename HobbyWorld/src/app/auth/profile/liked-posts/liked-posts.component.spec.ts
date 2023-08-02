import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedPostsComponent } from './liked-posts.component';

describe('LikedPostsComponent', () => {
  let component: LikedPostsComponent;
  let fixture: ComponentFixture<LikedPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikedPostsComponent]
    });
    fixture = TestBed.createComponent(LikedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
