import { Button } from '@mui/material'
import axios from 'axios';
import { createMeetContract } from './createMeetContract';

export function Meeting(organizerEmail, date, hsFrom, hsTo, address, stake, attendeesEmail) {

    const createCalendarEvent = async () => {
        const url = `https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDAR_ID ?? ""}/events`;
      
        const eventData = {
          end: {
            date: date?.format("YYYY-DD-MM").toString,
            dateTime: hsTo?.toString(), 
            timezone: "America/Argentina/Buenos_Aires"
          },
          start: {
            date: date?.format("YYYY-DD-MM").toString,
            dateTime: hsFrom?.toString(),
            timezone: "America/Argentina/Buenos_Aires"
          },
          attendees: [
            {
                email: attendeesEmail[0], 
            },
          ],
          organizer: {
            email: organizerEmail,
          },
          description: 'StakeMeet event', 
        };

        const token = process.env.GOOGLE_OAUTH_TOKEN ?? ""; 

        try {
          const response = await axios.post(url, eventData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
          });
          console.log('Event created successfully:', response.data);
        } catch (error) {
          console.error('Error creating event:', error);
          throw error
        }
    }
    
    // TOIDO connect to dat4e picker
    const createEvent = async () => {
        createMeetContract(stake, attendeesEmail, address)
            .then(() => createCalendarEvent())
            .catch(error => console.log("[ERROR] ", error))
    };
 
  return (
    <Button onClick={createEvent} variant="contained" fullWidth>Create meeting</Button>
  )
}