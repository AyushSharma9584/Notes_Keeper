import React, { useContext,useState, useEffect, useRef } from 'react'
import noteContext from "../Components/Context/Notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext)
    const { note, getNotes,editNote } = context;
    const ref = useRef(null)
    const navigate=useNavigate();
    const refClose = useRef(null)
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login")

        }
      
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
      
    }

    const handleClick = () => {
        editNote(notee.id,notee.etitle,notee.edescription,notee.etag)
        refClose.current.click()
        props.showAlert("Updated successfully","success")

    }
    const [notee, setNote] = useState({id:"" ,etitle: "", edescription: "", etag: "default" })

    const onChange = (e) => {
        setNote({ ...notee, [e.target.name]: e.target.value })

    }


    return (
        <div>
            <AddNote showAlert={props.showAlert} />
            <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Demo button
            </button>



            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div class="form-group">
                                    <label htmlFor="title">title</label>
                                    <input type="text" class="form-control" id="etitle" value={notee.etitle} name="etitle" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" class="form-control" id="edescription" value={notee.edescription} name="edescription" placeholder="description" onChange={onChange} />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" class="form-control" id="etag" name="etag" value={notee.etag} placeholder="tag" onChange={onChange} />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row my-3'>
                <h2>Your Notes</h2>
                {
                    note.map((item) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={item} showAlert={props.showAlert} />
                    })
                }
            </div>
        </div>
    )
}

export default Notes