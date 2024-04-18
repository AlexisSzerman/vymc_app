import sqlite3

# Conexión a la base de datos
conn = sqlite3.connect('db/vymc.db')
cursor = conn.cursor()

# Consulta para obtener la lista de hermanos
cursor.execute('SELECT * FROM Hermanos')
hermanos = cursor.fetchall()

# Imprimir la lista de hermanos
for hermano in hermanos:
    print(", ".join(str(elemento) for elemento in hermano))

# Cerrar la conexión
conn.close()
