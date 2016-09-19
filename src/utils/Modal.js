import React from 'react'
import Modal from 'react-bootstrap'

class ModalWrapper extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        
        return  <div>
                    <div className="static-modal">
                        <Modal>
                            Hello
                        </Modal>
                    </div>
                </div>
    
    }
}

export default ModalWrapper