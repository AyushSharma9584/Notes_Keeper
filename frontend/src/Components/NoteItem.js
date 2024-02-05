import React,{useContext} from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import noteContext from "../Components/Context/Notes/NoteContext"

const NoteItem = (props) => {
    const context = useContext(noteContext)
     const {deleteNote}=context
    const { note,updateNote } = props;
    return (
        <div className='col-md-3'>


            <div className="card my-3 " >
                <div className="card-body ">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <FaEdit className='iconn' size={20} color="blue" onClick={()=>{updateNote(note);}}/>
                    <FaTrash className='mx-2 iconn' size={20} color="red" onClick={()=>{deleteNote(note._id);  props.showAlert("Deleted successfully","success");}} /> 

                </div>
            </div>

        </div>
    )
}

export default NoteItem