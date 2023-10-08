import { useState, useEffect } from 'react'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import TextField from '@mui/material/TextField'
import {  Button, Container, Grid,  Paper, Typography } from '@mui/material'
import { DateCalendar, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Profile } from '../lib/profile'
import { Meeting } from '../lib/CreateMeeting'
import { useAccount } from 'wagmi'

export default function Home() {
  const [hsFrom, setHsFrom] = useState<Dayjs | null>(dayjs());
  const [hsTo, setHsTo] = useState<Dayjs | null>(dayjs());
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [stake, setStake] = useState();
  const [organizerEmail, setOrganizerEmail] = useState();
  const [attendee, setAttendee] = useState();

  const { address, isConnected } = useAccount()
  
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 

  return (
      <div className={styles.container}>
        <Head>
          <title>StakeMeet</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className={styles.header}>
          <h2>
            StakeMeet
          </h2>
        </header>
        <main className={styles.main}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Paper >
                    <Typography>Login</Typography>
                    <TextField id="user-email" label="Organizer email" variant="outlined" fullWidth onChange={(event: React.ChangeEvent<HTMLInputElement>) => setOrganizerEmail(event.target.value)} />
                    {Profile()}
                    <Button onClick={async () => {
                      // Here we would interact with the create(user) from the DB but due to laste minute issues we couldn't finishe
                      // The idea is to associate the wallet address with anemail
                    }}> Register </Button>
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Paper >
                        <Typography>Meeting details</Typography>
                        <TextField id="attendees-1" label="Attendee email" variant="standard" fullWidth onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAttendee(event.target.value)}  />
                        <TextField id="stake" label="Amount to stake" variant="outlined" fullWidth onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStake(event.target.value)} />
                      </Paper>                    
                    </Grid>
                    <Grid item xs={4}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker label="From" 
                          value={hsFrom}
                          onChange={(hsFrom) => setHsFrom(hsFrom)} />
                        <TimePicker label="To" 
                          value={hsFrom}
                          onChange={(hsTo) => setHsTo(hsTo)} />
                        <DateCalendar defaultValue={dayjs()} onChange={(date) => setDate(date)} />
                      </LocalizationProvider>
                    </Grid>
                    {Meeting(organizerEmail, date, hsFrom, hsTo, address, stake, [attendee])}
                  </Grid>
                </Grid>
              </Grid>
              <Paper>
                <Typography>Details</Typography>
                <Typography>Organizer Email: {organizerEmail ?? ""} </Typography>
                <Typography>Organizer Wallet: {isClient ? address?.toString() : ""}</Typography>
                <Typography>To stake: {stake ?? 0}</Typography>
                <Typography>Meeting date: {date?.format("DD/MM/YYYY").toString() ?? ""}</Typography>
                <Typography>From: {hsFrom?.format("HH:mm").toString() ?? ""}</Typography>
                <Typography>To: {hsTo?.format("HH:mm").toString() ?? ""}</Typography>
              </Paper>
            </Container> 
          </div>
        </main>
        
        <footer className={styles.footer}>

        </footer>
      </div>
  )
}