import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for 'async' pipe
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class ChatComponent implements OnInit {
  
  newMessage: string = '';

  // Inject the service public (so HTML can see it)
  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.startConnection();
  }

  sendMessage() {
    if (this.newMessage.trim() === '') return;

    this.chatService.sendMessage(this.newMessage)
      .then(() => this.newMessage = '')
      .catch(err => console.error(err));
  }
}