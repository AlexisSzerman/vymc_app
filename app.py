from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/hermanos/*": {"origins": "*"}})
  # Configurar CORS para permitir todas las solicitudes desde cualquier origen en la ruta /hermanos.

def obtener_responsabilidades_hermano(id_hermano):
    conn = sqlite3.connect('db/vymc.db')
    cursor = conn.cursor()
    cursor.execute('SELECT Responsabilidades.Nombre_resp FROM Responsabilidades INNER JOIN Responsabilidades_hermanos ON Responsabilidades.idResp = Responsabilidades_hermanos.idResp WHERE Responsabilidades_hermanos.idHermano = ?', (id_hermano,))
    responsabilidades = cursor.fetchall()
    conn.close()
    return [responsabilidad[0] for responsabilidad in responsabilidades]

def obtener_asignaciones_hermano(id_hermano):
    conn = sqlite3.connect('db/vymc.db')
    cursor = conn.cursor()
    cursor.execute('SELECT Asignaciones.Nombre_asign FROM Asignaciones INNER JOIN Asignaciones_hermanos ON Asignaciones.idAsign = Asignaciones_hermanos.idAsign WHERE Asignaciones_hermanos.idHermano = ?', (id_hermano,))
    asignaciones = cursor.fetchall()
    conn.close()
    return [asignacion[0] for asignacion in asignaciones]

@app.route('/hermanos')
def obtener_hermanos():
    conn = sqlite3.connect('db/vymc.db')
    cursor = conn.cursor()
    cursor.execute('SELECT idHermano, Nombre_hermano, Apellido_hermano, Activo, Comentarios FROM Hermanos ORDER BY Apellido_hermano')
    hermanos = cursor.fetchall()

    hermanos_con_responsabilidades = []
    for hermano in hermanos:
        id_hermano = hermano[0]
        responsabilidades = obtener_responsabilidades_hermano(id_hermano)
        asignaciones = obtener_asignaciones_hermano(id_hermano)
        hermano_con_responsabilidades = {
            'idHermano': hermano[0],
            'Nombre_hermano': hermano[1],
            'Apellido_hermano': hermano[2],
            'Activo': hermano[3],
            'Comentarios': hermano[4],
            'responsabilidades': responsabilidades,
            'asignaciones': asignaciones
        }
        hermanos_con_responsabilidades.append(hermano_con_responsabilidades)

    conn.close()
    return jsonify(hermanos_con_responsabilidades)

from flask import request

# ...

@app.route('/hermanos/<int:id_hermano>', methods=['DELETE'])
def eliminar_hermano(id_hermano):
    conn = sqlite3.connect('db/vymc.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM Hermanos WHERE idHermano = ?', (id_hermano,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Hermano eliminado correctamente'}), 200


if __name__ == '__main__':
    app.run(debug=True)



