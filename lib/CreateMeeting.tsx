import { Button } from '@mui/material'

export function Meeting() {
  const createEvent = () => {
        var event = {
            'summary': 'Stakeapp summary description',
            'location': 'labaticueva',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
                'dateTime': '2023-10-07T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles',
            },
            'end': {
                'dateTime': '2023-10-07T09:00:00-10:00',
                'timeZone': 'America/Los_Angeles',
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
                {'email': 'lpage@example.com'},
                {'email': 'sbrin@example.com'},
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
                ],
            },
            };

        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event,
            }, function(err, event) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }
            console.log('Event created: %s', event.htmlLink);
            });
    }
 
  return (
    <Button onClick={createEvent}>Create meeting</Button>
  )
}