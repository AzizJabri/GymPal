import mysql.connector

with open('Excercises.txt', 'r') as f:
    exercise_names = f.read().splitlines()


mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="root",
    database="gympal"
)

mycursor = mydb.cursor()

for exercise in exercise_names:
    name, ex_type = exercise.split("|")
    query = "INSERT INTO exercise (name, type) VALUES (%s, %s)"
    values = (name.strip(), ex_type.strip())
    mycursor.execute(query, values)
    mydb.commit()

mycursor.close()
mydb.close()
