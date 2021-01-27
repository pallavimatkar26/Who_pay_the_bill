import React, {useState, useRef, useContext} from 'react';
import {Button, Alert, Form } from 'react-bootstrap';

import { MyContext } from '../context';
const Stage1 = () => {
    const [error, setError] = useState([false, ''])
    const textInput = useRef();
    const context = useContext(MyContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = textInput.current.value;
        const validate = validateInput(value);
        if(validate){
            setError([false, ''])
            context.addPlayer(value)
            textInput.current.value = ''
        }
        
    }

    const validateInput = (value) => {
       if(value === ''){
           setError([true, 'Sorry you need to add something']);
           return false
       }
       if(value.length <= 2){
        setError([true, 'Add ateast 3 character']);
        return false
       }
       return true;
    }

   

  return(
    <>
   <Form onSubmit ={handleSubmit} className = "mt-4">
       <Form.Group>
           <Form.Control 
           type = "text"
           placeholder = "Add player Name"
           name="player"
           ref={textInput}/>
         
       </Form.Group>
       {error[0] ? <Alert variant ="danger">{error[1]}</Alert>: null}
       <Button className="miami" type="submit" variant = "primary">
           Add Players
       </Button>
       {context.state.players && context.state.players.length > 0 ?
       <>
       <hr/>
       <div>
           <ul className = "list-group">
               {context.state.players.map((item, id) => {
                   return <li  className ="list-group-item d-flex justify-content-between 
                   align-items-center list-group-item-action" key={id}> {item}
                   <span className="badge badge-danger" onClick={() => context.removeHandler(id)}>X</span></li>
               })}
           </ul>
           <div className="action_button" onClick={() => context.next()}>NEXT</div>
       </div>
       </>
       :null 
       }
   </Form>

    </>
  );
}

export default Stage1;