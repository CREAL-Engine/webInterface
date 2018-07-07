#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pyArango
from pyArango.connection import *
import json

# This is for the database stuff
# make sure to add the libraries at the top of the source file, its not as advanced as Ada 


class psArango(object):
	#put all the libraries at the top of the object
	# ~ logList = [] #use this to keep a log of issues that arise out of everything
	conn = "" #nullify it 
	#private data items
	_serverName = "localhost" #default to localhost 
	_queueName = "localQueue" #default to localQueue
	_uName = ""
	_pWord = ""
	_connection = "" #the actual queue
	_channel = "" #the actual channel for the queue
	_dbName = ""
	dataBase = ""

	def connectToServer(self,dbName):
		conn = Connection(username=self._uName, password=self._pWord)
		print('name: %s' % (self._serverName, ))
		self.dataBase = conn[dbName]



def main(args):
    return 0

if __name__ == '__main__':
    import sys
    
    #begin the code right here
    # ~ a = psMq("name")
    # ~ a.setServer("judy.creacompute.lbl.gov")
    # ~ a.setQueue("auth")
    
    # ~ a.printMsg() ##
    
    # ~ a.connectToServer()



    sys.exit(main(sys.argv))

