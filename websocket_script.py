#!/usr/bin/env python

import asyncio
import websockets

async def hello(websocket, path):

    name = await websocket.recv()
    print("< {}".format(name))

    greeting = "Goodbye {}!".format(name)
    await websocket.send(greeting)
    print("> {}".format(greeting))

async def count(websocket, path):

	# use global variable for number and a callback 

	print("hello world")

	#signal = await websocket.recv()
	#print("< {}".format(signal))
	number = 0;

	while True:
		number+=1
		if(await websocket.recv()):
			await websocket.send(number)
			print("< {}".format(number))

	#await websocket.send(number)
	#print("< {}".format(number))

start_server = websockets.serve(count, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever() # try running w/ start_server as arg