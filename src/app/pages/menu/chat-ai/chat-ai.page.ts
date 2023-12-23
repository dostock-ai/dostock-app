import { Component, ViewChild } from '@angular/core';
import { ChatgptService } from '../services/chatgpt.service'

@Component({
  selector: 'app-chat-ai',
  templateUrl: './chat-ai.page.html',
  styleUrls: ['./chat-ai.page.scss'],
})
export class ChatAIPage {
  @ViewChild('content') content: any;
  @ViewChild('writeMessageInput') writeMessageInput: any;

  messages: any[] = []; // Aquí defines una propiedad "messages" que será un arreglo para almacenar los mensajes.
  newMessage: string = ''; // Aquí defines una propiedad "newMessage" para almacenar el nuevo mensaje que el usuario escribirá.

  constructor(private chatgptSvc: ChatgptService) { }

  ionViewWillEnter() {
    localStorage.setItem('redirectUrl', 'chat-ai');
  }

  async sendMessage() {
    this.messages.push({ sender: 'chat-user-message', text: this.newMessage });
    const msg = this.newMessage;
    this.newMessage = '';

    // Enfocar el campo de entrada para poder escribir otro mensaje
    this.writeMessageInput.setFocus();

    setTimeout(() => {
      this.content.scrollToBottom(0);
    }, 0);

    this.getMessageChatGPT(msg);
  }

  async getMessageChatGPT(msg: any) {
    const resChatGPT = await this.chatgptSvc.chatgpt(msg);
    // this.messages.push({ sender: 'chat-ai-message', text: resChatGPT });
    this.messages.push({ sender: 'chat-ai-message', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' });
  }
}
