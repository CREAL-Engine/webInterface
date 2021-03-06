#!/usr/bin/env python
# -*- coding: utf-8 -*-


# ~ # Main server that uses websockets on the backend. This is a single page application
# ~ # 

# ~ # 
# ~ # 

# ~ # 
# ~ # 
#put all the libraries at the top of the object

#import the system stuff right here 
import sys

#async io
import asyncio

#websocket
import websockets

#json
import json
# ~ import base64
# ~ import random

#using enumeration types 
from enum import Enum

#arango db driver
import pyArango
from pyArango.connection import *

#Crypto and encoding stuff right here
import base64
import random
#import pyskein

import pika


#global variables
defaultPortNum = 8080 #this is the default port for the server 
defaultAddress = '0.0.0.0' #this is the default address for the server

	# ~ logList = [] #use this to keep a log of issues that arise out of everything
	# ~ conn = "" #nullify it 
	#private data items
serverName = "localhost" #default to localhost 
userNameDb = ""
passWordDb = ""
connection = "" #the actual queue
channel = "" #the actual channel for the queue
dbName = "_system" #the default database
dataBase = ""

conn = Connection(username=userNameDb, password=passWordDb)
dataBase = conn[dbName] #main database right here


#the main texts right here
mainTextsToTraverse = dataBase["texts"]
# ~ mainGraphsToTraverse = dataBase["graphs"]

# ~ mainTextsToTraverse.fetchAll() #fetching all of the database right here

connected = set() #this is a list of connected clients 



# ~ def parseString(intString):

print("starting server\n") ##just a simple message right here
print("server version : 1.4 \n") ##just a simple message right here



async def mainServer(websocket, path):
	
	#making sure the variable is declared global in this context
	#global connected
	# Register.
	# ~ connected.add(websocket)    
	returnObject = {} #main objects within list #this resets the object
	returnList = [] #main list to return #this resets the list 
	# ~ recvData = null
	
	while True:
		print("hello")
		recvData = await websocket.recv()#recieving data 
		print(recvData)
		# ~ await websocket.send(recvData)#sending data
		try:
			returnCommandObject = json.loads(recvData) #encoding json	

			if returnCommandObject["command"] == "table":
				for prelimGraphData in mainTextsToTraverse.fetchAll():
					print(prelimGraphData["_key"])
					returnObject = {}
					returnObject["_key"] = prelimGraphData["_key"]
					returnObject["pubMedID"] = prelimGraphData["pubMedID"]
					returnObject["journalTitle"] = prelimGraphData["journalTitle"]
					returnObject["articleTitle"] = prelimGraphData["articleTitle"]
					returnList.append(returnObject)
				await websocket.send(json.dumps(returnList))
			elif returnCommandObject["command"] == "raw":
				p = 1
			elif returnCommandObject["command"] == "lda":
				p = 1
			elif returnCommandObject["command"] == "wordcloud":
				p = 2
			else: 
				print("We had an issue doing something pertinant")
				print(recvData)	
				await websocket.send(json.dumps(returnList))

			# ~ websocket.send("hello")

		except(ValueError):
			print("The string passed was not in proper json format")

		
		# ~ websocket.send()
		# ~ await websocket.send(json.dumps(returnList))
		

		##sleep for a small random time right here`
		await asyncio.sleep(random.random() * 3) #sleep to save the cpu
		


async def mainWsLoop(websocket, path):
	async for message in websocket:
		await websocket.send(message)



asyncio.get_event_loop().run_until_complete(
	websockets.serve(mainServer, '0.0.0.0', defaultPortNum))
asyncio.get_event_loop().run_forever()



######End of the program here 


		## ~ stuff I might use later 
		## ~ now = datetime.datetime.utcnow().isoformat() + 'Z'
		## ~ await websocket.send(recvData)#sending data

		# ~ #		# ~ base64.standard_b64decode(s)
		
		# ~ jobT = returnedString['jobType']
		# ~ subT = returnedString['jobSubType']
		# ~ payload = returnedString['payload']
		
		# ~ if jobT == 'login':
			# ~ ttt = 0
		# ~ if jobT == 'get':
			# ~ ttt = 0
		# ~ if jobT == 'set':
			# ~ ttt = 0
		
		
		# ~ print (returnedString)



# ~ def main(args):
    # ~ return 0

# ~ if __name__ == '__main__':
    # ~ import sys
    
    # ~ #begin the code right here
    # ~ a = psMq("name")
#    a.setServer("judy.creacompute.lbl.gov")
 #   a.setQueue("auth")
    
    # ~ a.printMsg() ##
    
    # ~ a.connectToServer()

    # ~ sys.exit(main(sys.argv))


		# ~ print('name: %s' % (self._serverName, ))
