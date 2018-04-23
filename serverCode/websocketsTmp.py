#!/usr/bin/env python

#async io
import asyncio
#websocket
import websockets
#json
import json
import base64
import random
#using enumeration types 
from enum import Enum



#from StringIO import StringIO


#define enumeration types for control of things 
class serverDirectives(Enum):
	retrieveRecord = 1
	sendRecord = 2
	decodeJson = 3




directiveStrings = ["retrieveRecord", "sendRecord","decodeJson"]
###This is the main websocket server right here 

connected = set() #this is a list of connected clients 

# ~ def parseString(intString):

async def echo(websocket, path):
	#making sure the variable is declared global in this context
	#global connected
	# Register.
	# ~ connected.add(websocket)    
	while True:
		# ~ now = datetime.datetime.utcnow().isoformat() + 'Z'
		recvData = await websocket.recv()#recieving data 
		await websocket.send(recvData)#sending data
		returnedString = json.loads(recvData) #encoding json
		print(returnedString['jobType'])
		
		
		# ~ base64.standard_b64decode(s)
		
		jobT = returnedString['jobType']
		subT = returnedString['jobSubType']
		payload = returnedString['payload']
		
		if jobT == 'login':
			ttt = 0 
		
		await asyncio.sleep(random.random() * 3)
		
		# ~ print (returnedString)


async def mainWsLoop(websocket, path):
	async for message in websocket:
		await websocket.send(message)



asyncio.get_event_loop().run_until_complete(
	websockets.serve(echo, 'localhost', 8799))
asyncio.get_event_loop().run_forever()




##End of the program here 


