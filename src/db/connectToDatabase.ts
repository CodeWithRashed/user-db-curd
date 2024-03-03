// @ts-nocheck
// @ts-nocheck
import { MongoClient } from 'mongodb'

const uri = process.env.DATABASE_URI

let client = null
let clientPromise = null

if (!process.env.DATABASE_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise
