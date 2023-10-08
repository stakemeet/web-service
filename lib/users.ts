import sql from './db'

export interface User{
    email: string
    secret: string
}

export async function list(){
    return await sql<User[]>`
        SELECT user_id, email, secret FROM users
        ORDER BY user_id
    `
}

export async function create(user: User){
    return await sql<User[]>`
        INSERT INTO users (email, secret) VALUES (${user.email}, ${user.secret})
        RETURNING user_id, email, secret
    `
}

// I want a function that returns an user if the email and secret matches the input
export async function login(user: User){
    return await sql<User[]>`
        SELECT user_id, email, secret FROM users WHERE email=${user.email} AND secret=${user.secret}
    `
}
