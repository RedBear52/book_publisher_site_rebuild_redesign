import { Injectable } from '@angular/core'
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  addDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from 'environments/environment'
import { EventListing } from 'src/app/models/eventListing'

@Injectable({
  providedIn: 'root',
})
export class EventService {
  events: EventListing[] = []

  async getEvents() {
    let q = query(collection(db, 'events'))
    const querySnapshot = await getDocs(q)
    const events: EventListing[] = []
    querySnapshot.forEach((doc) => {
      const eventData = doc.data() as EventListing
      events.push({ ...eventData, id: doc.id }) // Fix: Assign 'id' separately to the object
    })
    return events
  }

  async addEvent(event: any) {
    try {
      const docRef = await addDoc(collection(db, 'events'), event)
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  async removeEvent(eventId: string) {
    try {
      if (eventId) {
        console.log('Removing document with ID: ', eventId)
        const docRef = doc(db, 'events', eventId)
        await deleteDoc(docRef)
        console.log('Document successfully deleted!')
      }
    } catch (e) {
      console.error('Error removing document: ', e)
    }
  }
}
