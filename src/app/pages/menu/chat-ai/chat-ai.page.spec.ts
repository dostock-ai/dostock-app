import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatAIPage } from './chat-ai.page';

describe('ChatAIPage', () => {
  let component: ChatAIPage;
  let fixture: ComponentFixture<ChatAIPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(ChatAIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
