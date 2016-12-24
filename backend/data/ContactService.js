import {
    Contact
} from './Database'

const UserFacade = {
    
    insertContact(name, email) {
        return Contact.create({name: name, email: email})
            .then(response => response)
            .catch(error => {
                console.log("error : " + JSON.stringify(error));
            })
    }
};

export default UserFacade
