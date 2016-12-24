import Database from './Database'

const SongService = {

    findAll() {
        return Database.models.song.findAll()
            .then(response => response)
            .catch(error => {
                console.log("error : " + JSON.stringify(error));
            })
    }
};

export default SongService
