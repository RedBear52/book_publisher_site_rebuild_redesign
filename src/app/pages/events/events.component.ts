import { Component } from '@angular/core'
import { EventService } from 'src/app/services/event.service'
import { EventListing } from 'src/app/models/eventListing'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent {
  events: EventListing[] | null = null

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // this.getEvents()
    // console.log('Events:', this.events)
    // rewrite the above two lines to use async/await
    this.getEvents()
  }

  async getEvents() {
    await this.eventService.getEvents().then((events) => {
      this.events = events as unknown as EventListing[]
      console.log('Events:', this.events)
    })
  }

  // deleteEvent(event: EventListing) {
  //   this.eventService.removeEvent(event).then(() => {
  //     this.getEvents()
  //   })
  // }
}
