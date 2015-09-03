import shortuuid
from flask import Flask, jsonify, request, abort, url_for
app = Flask(__name__)

tasks = {
    shortuuid.uuid(): { 'text': 'Discuss report with John', 'done': False },
    shortuuid.uuid(): { 'text': 'Get a haircut', 'done': True },
    shortuuid.uuid(): { 'text': 'Pay electricity bill', 'done': True },
    shortuuid.uuid(): { 'text': 'Check gym hours', 'done': False },
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
        abort(404, 'Task with id %s could not be found' % id)
    publicTask = getPublicTask(id)
    return jsonify(publicTask)

@app.route('/tasks', methods=['POST'])
def create():
    input = request.get_json()

    # Request body must contain a text attribute
    if input is None or not'text' in input:
        abort(400, 'A text attribute is required in the request body')

    # Build the task
    id = shortuuid.uuid()
    task = {
        'text': input.get('text'),
        'done': input.get('done', False),
    }

    # Store it
    tasks[id] = task;

    # Create a response
    resp = jsonify(getPublicTask(id))
    resp.status_code = 201
    resp.headers['location'] = url_for('get', id = id)
    return resp

@app.route('/tasks/<id>', methods=['PUT'])
def update(id):
    if id not in tasks:
        abort(404, 'Task with id %s could not be found' % id)
    
    input = request.get_json()

    # Request body must contain a text attribute
    if input is None or not'text' in input:
        abort(400, 'A text attribute is required in the request body')

    # Build the task
    task = {
        'text': input.get('text'),
        'done': input.get('done', False),
    }

    # Replace the old task
    tasks[id] = task;
    
    # Create a response
    resp = jsonify(getPublicTask(id))
    resp.status_code = 201
    resp.headers['location'] = url_for('get', id = id)
    return resp

@app.route('/tasks/<id>', methods=['DELETE'])
def delete(id):
    if id not in tasks:
        abort(404, 'Task with id %s could not be found' % id)
    del tasks[id]
    return '', 204

@app.errorhandler(404)
def not_found(error):
    resp = jsonify({'error': 'Not found: %s' % error.description})
    resp.status_code = 404
    return resp

@app.errorhandler(400)
def not_found(error):
    resp = jsonify({'error': 'Bad Request: %s' % error.description})
    resp.status_code = 400
    return resp


if __name__ == '__main__':
    app.run(debug=True)
