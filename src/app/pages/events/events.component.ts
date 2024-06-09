import { Component } from '@angular/core'
import { EventService } from 'src/app/services/event.service'
import { EventListing } from 'src/app/models/eventListing'
import { MatTableModule } from '@angular/material/table'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent {
  events: EventListing[] | null = null

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents()
  }

  async getEvents() {
    await this.eventService.getEvents().then((events) => {
      this.events = events as unknown as EventListing[]
      console.log('Events:', this.events)
    })
  }
}
