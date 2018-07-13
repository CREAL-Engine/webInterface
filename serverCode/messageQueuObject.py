#!/usr/bin/env python
# -*- coding: utf-8 -*-
#make sure to add the libraries at the top of the source file, its not as advanced as Ada 
import pika
import json


# 
#
#
#
#
#
#
#
#
#


class psMq(object):
	
	#put all the libraries at the top of the object
	logList = [] #use this to keep a log of issues that arise out of everything
	
	#private data items
	_serverName = "localhost" #default to localhost 
	_queueName = "localQueue" #default to localQueue
	_connection = "" #the actual queue
	_channel = "" #the actual channel for the queue
	
	#public data items
	jsonBuffer = "" #this should be public in order to quickly check on everything 
	def __init__(self, name):
		self._serverName = name
	def show(self):
		print('name: %s' % (self._serverName, ))
	def printMsg(self):
		print('Server Name: %s' % (self._serverName, ))
		print('Queue Name: %s' % (self._queueName, ))
	def setServer(self,srvN):
		self._serverName = srvN
	def setQueue(self,queueN):
		self._queueName = queueN
	def disconnectFromServer(self):
		print("poof")
	def connectToServer(self):
		#put a try and catch statement here
		try:
			_connection = pika.BlockingConnection(pika.ConnectionParameters(host=self._serverName)) #connect to the server
			_channel = _connection.channel() #set the channel up right here
			_channel.queue_declare(queue=self._queueName)
		except(pika.exceptions.ConnectionClosed):
			print("a connection could not be mad to the given message queue")
		except(RuntimeError, TypeError, NameError):
			print("an error happened badly")
	def sendMessage(self,jsonObjectString):
		try:
			jsonInternalBuffer = json.loads(jsonObjectString)	
		except(ValueError):
			print("The string passed was not in proper json format")
		

		# ~ returnedString = json.loads(recvData) #encoding json



def main(args):
    return 0

if __name__ == '__main__':
    import sys
    
    #begin the code right here
    a = psMq("name")
    # ~ a.setServer("judy.creacompute.lbl.gov")
    # ~ a.setQueue("auth")
    
    a.printMsg() ##
    
    a.connectToServer()

    sys.exit(main(sys.argv))

