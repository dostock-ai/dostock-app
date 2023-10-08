import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-ai',
  templateUrl: './chat-ai.page.html',
  styleUrls: ['./chat-ai.page.scss'],
})
export class ChatAIPage implements OnInit{
  messages: any[] = []; // Aquí defines una propiedad "messages" que será un arreglo para almacenar los mensajes.
  newMessage: string = ''; // Aquí defines una propiedad "newMessage" para almacenar el nuevo mensaje que el usuario escribirá.

  screenWidth: number;

  constructor() {
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

  enviarMensaje() {
    // Aquí defines el método "enviarMensaje" que se ejecutará al hacer clic en el botón de enviar.
    // Puedes agregar la lógica para enviar el mensaje y recibir una respuesta aquí.
    // Por ejemplo, puedes agregar el mensaje del usuario al arreglo de mensajes.
    this.messages.push({ sender: 'Tu', text: this.newMessage });
    // Luego, puedes llamar a un servicio para obtener la respuesta de la IA y agregarla al arreglo de mensajes.
    // Finalmente, puedes borrar el contenido de "newMessage" si lo deseas.
    this.newMessage = '';
  }
}