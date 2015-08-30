import shortuuid
from flask import Flask, jsonify, request, abort, url_for
app = Flask(__name__)

tasks = {
    shortuuid.uuid(): { 'text': 'Discuss report with John', 'done': True },
    shortuuid.uuid(): { 'text': 'Get a haircut', 'done': True },
    shortuuid.uuid(): { 'text': 'Pay electricity bill', 'done': True },
    shortuuid.uuid(): { 'text': 'Check gym hours', 'done': True },
}

def getPublicTask(id):
    return {         
        'uri': url_for('get', id = id),         
        'text': tasks[id].get('text'),
        'done': tasks[id].get('done'),
    }

@app.route('/tasks', methods=['GET'])
def index():
    publicTasks = map(getPublicTask, tasks)
    return jsonify({'tasks': publicTasks})

@app.route('/tasks/<id>', methods=['GET'])
def get(id):
    if id not in tasks:
        abort(404)
    publicTask = getPublicTask(id)
    return jsonify(publicTask)

@app.route('/tasks', methods=['POST'])
def create():
    input = request.get_json()

    # Request body must contain a text attribute
    if input is None or not 'text' in input:
        abort(400)

    # Build the task
    id = shortuuid.uuid()
    task = {
        'text': input.get('text'),
        'done': input.get('done'),
    }

    # Store it
    tasks[id] = task;

    # Create a response
    resp = jsonify(task)
    resp.status_code = 201
    resp.headers['location'] = '/tasks/%s' % id
    return resp

@app.route('/tasks/<id>', methods=['DELETE'])
def delete(id):
    if id not in tasks:
        abort(404)
    del tasks[id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
