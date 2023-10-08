import { useState, useEffect } from 'react'
import Head from 'next/head'

import { type ToDo } from '../lib/todos'

import styles from '../styles/Home.module.css'
import TextField from '@mui/material/TextField'
import { Button, Container, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { DateCalendar, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Profile } from '../lib/profile'
import { Meeting } from '../lib/CreateMeeting'
import { useAccount } from 'wagmi'

interface ToDoComponentProps {
  key: number
  text: string
  done: boolean
  onChange: () => void
  onRemove: () => void
}

const ToDoComponent = ({
  text,
  done,
  onChange,
  onRemove,
}: ToDoComponentProps) => {
  const cards = ['card', 'card2', 'card3', 'card4', 'card5']

  return (
    <div className={styles[cards[Math.floor(Math.random() * cards.length)]]}>
      <div
        className={styles.text}
        style={{ textDecoration: done ? 'line-through' : '' }}
      >
        {text}
      </div>
      <div className={styles.reverseWrapper}>
        <input
          type="checkbox"
          className={styles.check}
          checked={done}
          onChange={onChange}
        />
        <button className={styles.removeBtn} onClick={onRemove}>
          &#10005;
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const [newText, setNewText] = useState('')
  const [toDos, setToDos] = useState<ToDo[]>([])

  const getToDos = async () => {
    const resp = await fetch('api/todos')
    const toDos = await resp.json()
    setToDos(toDos)
  }

  const createToDo = async () => {
    await fetch('api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText }),
    })

    setNewText('')

    await getToDos()
  }

  const updateToDo = async (todo: ToDo) => {
    const newBody = {
      id: todo.id,
      done: !todo.done,
    }

    await fetch('api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBody),
    })

    await getToDos()
  }

  const removeToDo = async (todo: ToDo) => {
    const newBody = {
      id: todo.id,
    }

    await fetch('api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBody),
    })

    await getToDos()
  }

  useEffect(() => {
    getToDos()
  }, [])

  const done = toDos.filter((todo) => todo.done)
  const undone = toDos.filter((todo) => !todo.done)
  const [hsFrom, setHsFrom] = useState<Dayjs | null>(dayjs());
  const [hsTo, setHsTo] = useState<Dayjs | null>(dayjs());
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [stake, setStake] = useState();
  const [organizerEmail, setOrganizerEmail] = useState();

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
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Paper >
                        <Typography>Meeting details</Typography>
                        <TextField id="attendees-1" label="Attendee email" variant="standard" fullWidth />
                        <TextField id="attendees-2" label="Attendee email" variant="standard" fullWidth />
                        <TextField id="attendees-3" label="Attendee email" variant="standard" fullWidth />
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
                    {Meeting(organizerEmail, date, hsFrom, hsTo)}
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

/*



        <Paper >
          <TextField id="recipients" label="Recipients" variant="outlined" />
          <TextField id="field-value" label="Field value" variant="outlined" />
          <TextField id="date" label="Date" variant="outlined" />

          <Button variant="contained">Send</Button>
        </Paper>
*/

/*
        <div className={styles.undone}>
          <div className={styles.firstRow}>
            <div className={styles.title}>to dos</div>
            <div className={styles.reverseWrapper}>
              <input
                className={styles.input}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={(e) => e.code === 'Enter' && createToDo()}
              ></input>
              <button className={styles.createBtn} onClick={createToDo}>
                &#10011;
              </button>
            </div>
          </div>
          <div className={styles.scrollable}>
            {undone.map((todo, index) => (
              <ToDoComponent
                key={todo.id}
                text={`${index + 1}. ${todo.text}`}
                done={todo.done}
                onChange={() => updateToDo(todo)}
                onRemove={() => removeToDo(todo)}
              />
            ))}
          </div>
        </div>

        <div className={styles.done}>
          <div className={styles.firstRow}>
            <div className={styles.title}>done</div>
          </div>
          <div className={styles.scrollable}>
            {done.map((todo, index) => (
              <ToDoComponent
                key={todo.id}
                text={`${index + 1}. ${todo.text}`}
                done={todo.done}
                onChange={() => updateToDo(todo)}
                onRemove={() => removeToDo(todo)}
              />
            ))}
          </div>
        </div>
*/