from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/hermanos/*": {"origins": "https://vymc-app.dev.ar"}})
CORS(app, resources={r"/reuniones/*": {"origins": "https://vymc-app.dev.ar"}})
""" CORS(app, resources={r"/hermanos/*": {"origins": "*"}}) """
""" CORS(app, resources={r"/reuniones/*": {"origins": "*"}}) """


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

# Mapeo de nombres de responsabilidades a IDs
responsabilidades_mapping = {
    'Anciano': 1,
    'Siervo Ministerial': 2,
    'Precursor': 3,
    'Publicador Bautizado': 4,
    'Publicador no Bautizado': 5
}

# Mapeo de nombres de asignaciones a IDs
asignaciones_mapping = {
    'Presidencia': 1,
    'Oración': 2,
    'Tesoros de la Biblia': 3,
    'Perlas Escondidas': 4,
    'Lectura de la Biblia': 5,
    'Empiece Conversaciones': 6,
    'Haga Revisitas': 7,
    'Haga Discípulos': 8,
    'Explique Creencias': 9,
    'Amo/a de casa': 10,
    'Discurso': 11,
    'Análisis Seamos Mejores Maestros': 12,
    'Nuestra Vida Cristiana': 13,
    'Estudio Bíblico de congregación': 14,
    'Lectura libro': 15,
    'Necesidades de la congregación': 16
}

@app.route('/hermanos', methods=['GET', 'POST'])
def gestionar_hermanos():
    if request.method == 'GET':
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
    elif request.method == 'POST':
        data = request.json
        nombre = data.get('Nombre_hermano')
        apellido = data.get('Apellido_hermano')
        genero = data.get('Genero')
        activo = data.get('Activo')
        comentarios = data.get('Comentarios')

        # Obtener las responsabilidades seleccionadas y mapearlas a sus respectivos IDs
        responsabilidades_seleccionadas = data.get('Responsabilidades', [])
        responsabilidades_ids = [responsabilidades_mapping[responsabilidad] for responsabilidad in responsabilidades_seleccionadas]

        # Obtener las asignaciones seleccionadas y mapearlas a sus respectivos IDs
        asignaciones_seleccionadas = data.get('Asignaciones', [])
        asignaciones_ids = [asignaciones_mapping[asignacion] for asignacion in asignaciones_seleccionadas]

        # Guardar los datos del hermano en la tabla Hermanos
        conn = sqlite3.connect('db/vymc.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO Hermanos (Nombre_hermano, Apellido_hermano, Genero, Activo, Comentarios) VALUES (?, ?, ?, ?, ?)', (nombre, apellido, genero, activo, comentarios))
        id_hermano = cursor.lastrowid

        # Insertar los registros en las tablas de relaciones
        for responsabilidad_id in responsabilidades_ids:
            cursor.execute('INSERT INTO Responsabilidades_hermanos (idHermano, idResp) VALUES (?, ?)', (id_hermano, responsabilidad_id))

        for asignacion_id in asignaciones_ids:
            cursor.execute('INSERT INTO Asignaciones_hermanos (idHermano, idAsign) VALUES (?, ?)', (id_hermano, asignacion_id))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Hermano creado correctamente'}), 201

@app.route('/hermanos/<int:id_hermano>', methods=['DELETE'])
def eliminar_hermano(id_hermano):
    conn = sqlite3.connect('db/vymc.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM Hermanos WHERE idHermano = ?', (id_hermano,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Hermano eliminado correctamente'}), 200

@app.route('/reuniones', methods=['GET'])
def obtener_reuniones():
    conn = sqlite3.connect('db/vymc.db')
    cursor = conn.cursor()
    cursor.execute("""SELECT Reuniones.Fecha, Reuniones.Sala, 
                    Asignaciones.Nombre_asign AS Asignacion, 
                    Hermanos_titular.Nombre_hermano || ' ' || Hermanos_titular.Apellido_hermano AS Titular, 
                    CASE WHEN Reuniones.Ayudante IS NULL THEN ' ' ELSE Hermanos_suplente.Nombre_hermano || ' ' || Hermanos_suplente.Apellido_hermano END AS Ayudante 
                    FROM Reuniones 
                    INNER JOIN Asignaciones ON Reuniones.IdAsign = Asignaciones.IdAsign 
                    INNER JOIN Hermanos AS Hermanos_titular ON Reuniones.IdHermano = Hermanos_titular.IdHermano 
                    LEFT JOIN Hermanos AS Hermanos_suplente ON Reuniones.Ayudante = Hermanos_suplente.IdHermano""")
    reuniones = cursor.fetchall()
    conn.close()

    reuniones_info = []
    for reunion in reuniones:
        reunion_info = {
            'Fecha': reunion[0],
            'Sala': reunion[1],
            'Asignacion': reunion[2],
            'Titular': reunion[3],
            'Ayudante': reunion[4]
        }
        reuniones_info.append(reunion_info)

    return jsonify(reuniones_info)



if __name__ == '__main__':
    app.run(debug=True)
