import React from 'react'
import {Modal} from 'react-bootstrap'

class ModalWrapper extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isModalOpen: this.props.isOpen
        }
    }
    
    // componentWillReceiveProps(newprops) {
    //     if(newprops.isOpen != this.props.isOpen) {
    //         this.setState({isModalOpen: this.props.isOpen})
    //     }
    // }

    toggleOpening() {
       // this.setState({isModalOpen: !this.state.isModalOpen})
    }
    
    onClose() {
        this.props.onClose()
    }
    
    onSubmit() {
        let name = this.refs.subscriptionName.value;
        let email = this.refs.subscriptionEmail.value;
        this.props.onSubmit(name, email)
    }
    
    render() {
        
        if (!this.props.isOpen) {
            return <span/>;
        }
        
        return  <div>
                    <div className="static-modal">
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>Subscribe</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>
                                    If you want to be inform of all upcoming event of l'Atelier des chansons. Please subscribe.    
                                </p>
                                <p>
                                    You will have access to exclusive content such as songs and nice video.    
                                </p>
                                <div className="form-group">
                                    <label htmlFor="subscriptionName">Your name</label>
                                    <input
                                        id="subscriptionName"
                                        ref="subscriptionName"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        type="text"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subscriptionEmail">Email address</label>
                                    <input
                                        id="subscriptionEmail"
                                        ref="subscriptionEmail"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                </div>
                               
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={this.onClose.bind(this)} className="btn btn-default">Close</button>
                                <button onClick={this.onSubmit.bind(this)} className="btn btn-primary">Subscribe</button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </div>
    
    }
}

ModalWrapper.propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
};


export default ModalWrapper
