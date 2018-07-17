##
## This script is a hack to add things to the database easily
##
##
#!/usr/bin/env python
import pika
import pyArango
from pyArango.connection import *
import json


##Getting started

conn = Connection(username="root", password="ryuken1986")
db = conn["_system"]
textsCollection = db["texts"]




connection = pika.BlockingConnection(pika.ConnectionParameters(
        host='localhost'))
channel = connection.channel()


channel.queue_declare(queue='arangodb')

def callback(ch, method, properties, body):
    #print(" [x] Received %r" % body)
    tmpJsonDecObj = json.loads(body)
    tmpDoc = textsCollection.createDocument()
    tmpDoc["pubMedID"] = tmpJsonDecObj["pubMedID"]
    tmpDoc["year"] = tmpJsonDecObj["year"]
    tmpDoc["month"] = tmpJsonDecObj["month"]
    tmpDoc["day"] = tmpJsonDecObj["day"]
    tmpDoc["articleTitle"] = tmpJsonDecObj["articleTitle"]
    tmpDoc["journalTitle"] = tmpJsonDecObj["journalTitle"]
    tmpDoc["authors"] = tmpJsonDecObj["authors"]
    tmpDoc["abstractData"] = tmpJsonDecObj["abstractData"]
    tmpDoc["cleanedAbstractData"] = tmpJsonDecObj["cleanedAbstractData"]
    #setting the key and saving
    # ~ tmpDoc._key = tmpJsonDecObj["pubMedID"]
    tmpDoc.save()

channel.basic_consume(callback,
                      queue='arangodb',
                      no_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
