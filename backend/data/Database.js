import Sequelize from 'sequelize'

require("babel-polyfill");

const mysql_url =  process.env.PROD_URL || "localhost";
const mysql_schema =  process.env.PROD_SCHEMA || process.env.CLEARDB_DATABASE_SCHEMA || "atelier";
const mysql_user = process.env.PROD_USER || process.env.CLEARDB_DATABASE_USER || "greec";
const mysql_pass = process.env.PROD_PASS || process.env.CLEARDB_DATABASE_PASS || "test";

const connection = process.env.CLEARDB_DATABASE_URL !== undefined ? new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    pool: {
        max: 5,
        min: 1,
        idle: 10000
    },
})
    :  new Sequelize(mysql_schema, mysql_user, mysql_pass, {dialect: "mysql", host: mysql_url,
    logging: (param) => {param.indexOf("Executing (default):") !== -1 ? false : true}})


export const Contact = connection.define('contact', {
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            is: /^\S+@\S+$/i,
        },
        unique: true,
        required: true
    }
});

export const PlayLists = connection.define('playlist', {
    name: {type: Sequelize.STRING}
});


export const Songs = connection.define('song', {
        name: {type: Sequelize.STRING},
        author: {type: Sequelize.STRING},
        url: {type: Sequelize.STRING},
    }
);

Songs.belongsToMany(PlayLists, {through: 'songPlaylist'});
PlayLists.belongsToMany(Songs, {through: 'songPlaylist'});

export const User = connection.define('user', {
        login: {type: Sequelize.STRING, unique: true},
        password: Sequelize.STRING,
        enabled: Sequelize.BOOLEAN
    }
);

User.hasOne(PlayLists);

connection.sync({force: false})
    .then(async () => {

        // Songs.create({
        //     url: "https://soundcloud.com/muskacirca/diamonds",
        //         name: "Diamonds",
        //     author: "Atelier des Chansons"
        // });
        // Songs.create({
        //     url: "https://soundcloud.com/muskacirca/mr-tambourine-man",
        //         name: "Tambourine Man",
        //     author: "Atelier des Chansons"
        // });
        // Songs.create({
        //     url: "https://soundcloud.com/muskacirca/blowin-in-the-wind",
        //         name: "Blowin' in the Wind",
        //     author: "Atelier des Chansons"
        // });
        // Songs.create({
        //     url: "https://soundcloud.com/outofpeace/the-fall",
        //         name: "The Fall",
        //     author: "Out of Peace"
        // });
        // Songs.create({
        //     url: "https://soundcloud.com/outofpeace/the-key-is-somewhere-else",
        //         name: "The Key is Somewhere Else",
        //     author: "Out of Peace"
        // });
        // Songs.create({
        //     url: "https://soundcloud.com/djmadkat/kay-kessinger-kontakt",
        //         name: "Kontakt",
        //     author: "KAY KESSIINGER"
        // });
        // Songs.create({
        //     url: "https://soundcloud.com/djmadkat/double-m-kenun-kay-kessinger",
        //         name: "Double M Kenun",
        //     author: "KAY KESSIINGER"
        // });
    });

export default connection
