# -*- coding: utf-8 -*-
"""
Created on Thu May 19 20:18:03 2022

@author: juanp
"""
import pymongo
import pandas as pd
import dns

client = pymongo.MongoClient("mongodb+srv://Usuario:Contraseña@cluster0.w7eam.mongodb.net/?retryWrites=true&w=majority")
df =pd.read_csv("Nombre_archivo.csv", sep=";")

data = df.to_dict(orient= "records")

db = client["Nombre_base_de_datos"] # Para nuestro caso sería poliChatbot

db.Nombre_de_la_tabla.insert_many(data)
