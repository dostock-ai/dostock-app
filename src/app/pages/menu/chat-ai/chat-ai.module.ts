import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatAIPageRoutingModule } from './chat-ai-routing.module';

import { ChatAIPage } from './chat-ai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatAIPageRoutingModule
  ],
  declarations: [
    // ...otros componentes
    ChatAIPage
  ],
  
  
})
export class ChatAIPageModule {}


