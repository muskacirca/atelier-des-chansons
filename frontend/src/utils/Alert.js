import React from 'react'
import Expire from './Expire'
import isEqual from 'lodash/isEqual'

class Alert extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            alert: this.props.alert,
            delay: this.props.delay
        }
    }

    onAlertDismiss() {
        this.setState({alert: undefined})
        this.props.onDismiss()
    }
    
    componentWillReceiveProps(newprops) {
        if(!isEqual(newprops, this.props)) {
            this.setState({alert: newprops.alert})
        }
    }
    
    renderAlert() {

        if(this.state.alert !== undefined) {

            let alertType = this.state.alert.type == "success" ? "success" : "danger";
            
            return  <Expire delay={this.state.delay} callback={this.onAlertDismiss.bind(this)}>
                        <div className={alertType}>
                            <span className="alert-message">
                                {this.state.alert.message}
                            </span>
                        </div>
                    </Expire>
        } else {
            return <div />
        }
    }

    render() {
        return this.renderAlert()
    }
}

Alert.propTypes = {
    delay: React.PropTypes.number,
};

Alert.defaultProps = { delay: 10000, alert: undefined };

export default Alert
