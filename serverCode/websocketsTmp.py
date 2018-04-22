#!/usr/bin/env python

#async io
import asyncio
#websocket
import websockets
#json
import json

#using enumeration types 
from enum import Enum

#define enumeration types for control of things 
class serverDirectives(Enum):
	retrieveRecord = 1
	sendRecord = 2
	decodeJson = 3




directiveStrings = ["retrieveRecord", "sendRecord","decodeJson"]
###This is the main websocket server right here 



async def echo(websocket, path):
    async for message in websocket:
        await websocket.send(message)

asyncio.get_event_loop().run_until_complete(
    websockets.serve(echo, 'localhost', 8799))
asyncio.get_event_loop().run_forever()




##End of the program here 


