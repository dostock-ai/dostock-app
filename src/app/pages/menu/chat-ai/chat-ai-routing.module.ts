import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatAIPage } from './chat-ai.page';

const routes: Routes = [
  {
    path: '',
    component: ChatAIPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatAIPageRoutingModule {}
