import React from 'react'
import {Modal} from 'react-bootstrap'

class ModalWrapper extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        
        return  <div>
                    <div className="static-modal">
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                One fine body...
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-default">Close</button>
                                <button className="btn btn-primary">Save changes</button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </div>
    
    }
}

export default ModalWrapper