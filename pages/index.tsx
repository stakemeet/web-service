import { useState, useEffect } from 'react'
import Head from 'next/head'

import { type ToDo } from '../lib/todos'

import styles from '../styles/Home.module.css'
import TextField from '@mui/material/TextField'
import { Button, Container, Grid, List, ListItem, ListItemText } from '@mui/material'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

  return (
    <div className={styles.container}>
      <Head>
        <title>postgres.js + next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h2>
          <a href="https://github.com/porsager/postgres">postgres.js</a> +{' '}
          <a href="https://nextjs.org">next.js</a> to dos
        </h2>
      </header>
      <main className={styles.main}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {/* Left Side */}
                <TextField label="Enter Email" fullWidth />
                <List>
                  {/* Use JavaScript to map and render the list of emails here */}
                  {/* Each ListItem should have a Remove button */}
                  <ListItem>
                    <ListItemText primary="example@example.com" />
                    <Button variant="outlined">Remove</Button>
                  </ListItem>
                  {/* Add more ListItems as needed */}
                </List>
                <TextField label="Set Number" fullWidth />
                <Button variant="contained" color="primary">
                  Send Invites
                </Button>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar defaultValue={dayjs('2022-04-17')} />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Container> 
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/vercel/next.js/tree/canary/examples/with-postgres"
          target="_blank"
          rel="noopener noreferrer"
        >
          powered by postgres.js & next.js
        </a>
      </footer>
    </div>
  )
}

/*
        <Paper >
          <TextField id="user-email" label="Email" variant="outlined" />
          <TextField id="user-secret" label="Password" variant="outlined" />

          <Button variant="contained">Login</Button>
          <Button variant="contained">Register</Button>
          <Button variant="contained">Connect wallet</Button>
        </Paper>


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