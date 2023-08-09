import { Injectable } from '@angular/core';
import { Observable, Subject, timer, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  private idleTimeoutMs = 5000; // 5 minutes
  private idleTimer$: Observable<number>;
  private hasTriggeredAlert = false;

  private resetTimerSubject = new Subject<void>();

  constructor() {
    this.idleTimer$ = timer(this.idleTimeoutMs);
  }

  get idleTimer(): Observable<number> {
    return this.idleTimer$;
  }

  get resetTimer(): Observable<void> {
    return this.resetTimerSubject.asObservable();
  }

  startIdleTimer(): void {
    this.idleTimer$
      .pipe(debounceTime(10000)) // Debounce to avoid multiple rapid triggers
      .subscribe(() => {
        // Emit an event indicating idle time has passed
        if (!this.hasTriggeredAlert) {
          this.resetTimerSubject.next(); // Emit the event to trigger the alert
          this.hasTriggeredAlert = true; // Set the flag to indicate alert triggered
        }
      });
  }

  resetAlertTrigger(): void {
    this.hasTriggeredAlert = false; // Reset the flag to allow triggering again
  }
}
