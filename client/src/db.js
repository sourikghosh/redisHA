import { createClient } from 'redis'
import { promisify } from 'util'
export const client = createClient({

})

export const getAsync = promisify(client.get).bind(client)
export const setAsync = promisify(client.set).bind(client)

