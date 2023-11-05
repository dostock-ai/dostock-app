import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChatgptService } from '../services/chatgpt.service'

@Component({
  selector: 'app-chat-ai',
  templateUrl: './chat-ai.page.html',
  styleUrls: ['./chat-ai.page.scss'],
})
export class ChatAIPage implements OnInit{
  @ViewChild('content') content: any;
  @ViewChild('writeMessageInput') writeMessageInput: any;

  messages: any[] = []; // Aquí defines una propiedad "messages" que será un arreglo para almacenar los mensajes.
  newMessage: string = ''; // Aquí defines una propiedad "newMessage" para almacenar el nuevo mensaje que el usuario escribirá.

  screenWidth: number;

  constructor(private chatgptSvc: ChatgptService) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    
  }

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
    this.messages.push({ sender: 'chat-ai-message', text: resChatGPT });
  }
}
