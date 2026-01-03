import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: HubConnection | undefined;
  public messages$ = new BehaviorSubject<{user: string, message: string}[]>([]);
  public connectionState$ = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private http: HttpClient) { }

  public async startConnection() {
    const token = this.authService.getToken();
    if (!token) return;

    // Load History from API FIRST
    this.loadHistory();

    // Then Connect to SignalR
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7244/chatHub', {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on('ReceiveMessage', (user, message) => {
      const current = this.messages$.value;
      this.messages$.next([...current, { user, message }]);
    });

    try {
      await this.hubConnection.start();
      console.log('✅ SignalR Connected!');
      this.connectionState$.next(true);
    } catch (err) {
      console.error('❌ SignalR Connection Error:', err);
      this.connectionState$.next(false);
    }
  }

  private loadHistory() {
    const token = this.authService.getToken();
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('https://localhost:7244/api/Chat/history', { headers })
      .subscribe({
        next: (data) => {
          const formatted = data.map(m => ({ user: m.user, message: m.message }));
          this.messages$.next(formatted);
        },
        error: (err) => console.error("Failed to load chat history", err)
      });
  }

    public async sendMessage(message: string) {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      const user = this.authService.getUserDetail()?.username ?? 'Anonymous';
      await this.hubConnection.invoke('SendMessage', user, message);
    }
  }
}