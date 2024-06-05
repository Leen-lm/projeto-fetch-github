import { baseUrl, eventsQuantity} from "../variable.js"

async function getEvents(userName){
    const response = await fetch (`${baseUrl}/${userName}/events?per_page=${eventsQuantity}` )
    return await response.json()
}

export { getEvents }