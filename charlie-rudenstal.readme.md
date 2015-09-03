# TicktailHack V 2.2

It has been fun to work with Python and Redux. Neither of which I have really 
spent any time with before. I managed to implement most of the features. Given
more time I would give the Python server some more love, breaking things out into
separate modules and such. Would also be great to setup a persistent data store.

On the frontend I started to implement support for optimistic updates, but
it would need some more work in terms of progress indicators, reverting state on 
errors and error messages. Also the "Mark all as complete" feature 
is missing. The quick solution would have been to send one update request per task.
I didn't like that idea, some sort of batch update would have been necessary.

Let's discuss it further when we meet.

-- Charlie Rudenstål

## How to run this thing

Backend:
    
    $ cd backend
    $ pip install -r requirements.txt
    $ python server.py 
    
Check out the API at `http://localhost:5000/tasks`

Frontend:

    $ cd frontend
    $ npm install
    $ gulp
    
Try the TODO app at `http://localhost:5001`

---

These are the main technologies used

* React
* Redux
* Flask

These are some of the things I would like to implement given more time

* Implement "Mark all as complete" / Batch updates
* Make clickable area of items higher
* Edit task names
* Make the [Input] + [Add Todo]-button area more responsive
* Make the page isomorphic
* Implement a Database for the Backend server
