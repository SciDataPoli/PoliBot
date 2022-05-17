import pymongo
import dns # required for connecting with SRV
client = pymongo.MongoClient("mongodb+srv://dcastan93:<password>@cluster0.w7eam.mongodb.net/?retryWrites=true&w=majority")
db = client.test