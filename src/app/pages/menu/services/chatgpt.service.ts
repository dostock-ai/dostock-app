import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  constructor() { }

  async chatgpt(msg: any) {
    let res, data;
    const apiUrl = 'http://localhost:3000/chatgpt/chat';

    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message:msg
      })
    };
    try {
      res = await fetch(apiUrl, requestData);

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      data = await res.json();
  
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    return data.choices[0].message.content;
  }
}
