import {
    Contact
} from './Database'

const UserFacade = {
    
    insertContact(name, email) {
        return Contact.create({name: name, email: email})
            .then(response => {
                console.log("success : " + JSON.stringify(response));
                return {
                    success: true,
                    data: response
                }
            })
            .catch(error => {
                console.log("error : " + JSON.stringify(error));
                return {
                    success: false,
                    data: error
                }
            })
    }
};

export default UserFacade
