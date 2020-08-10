const Express = require("express");
const { graphqlHTTP } = require('express-graphql');
// var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// const ExpressGraphQL = require("express-graphql");
const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLID = require("graphql").GraphQLID;
const GraphQLString = require("graphql").GraphQLString;
const GraphQLList = require("graphql").GraphQLList;
const GraphQLSchema = require("graphql").GraphQLSchema;

var app = Express();

const mockAlbums = [
    {
        "id": "1",
        "title": "Fearless",
        "artist": "Taylor Swift"
    },
    {
        "id": "2",
        "title": "1984",
        "artist": "Van Halen"
    }
];

const mockSongs = [
    {
        "id": "1",
        "album": "1",
        "title": "Fearless"
    },
    {
        "id": "2",
        "album": "2",
        "title": "Jump"
    }
];

// const schema = new GraphQLSchema({});
const AlbumType = new GraphQLObjectType({
    name: "Album",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        artist: { type: GraphQLString }
    }
});

const SongType = new GraphQLObjectType({
    name: "Song",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        album: {
            type: AlbumType,
            resolve: (root, args, context, info) => {
                var album = mockAlbums.find(mockAlbum => mockAlbum.id == root.album);
                return album;
            }
        }
    }
});


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            songs: {
                type: GraphQLList(SongType),
                resolve: (root, args, context, info) => {
                    var songs = mockSongs.map(song => {
                        song.album = mockAlbums.find(album => album.id == song.album);
                        return song;
                    });
                    return songs;
                }
            },
            songs: {
                type: GraphQLList(SongType),
                resolve: (root, args, context, info) => {
                    return mockSongs;
                }
            },
            albums: {
                type: GraphQLList(AlbumType),
                resolve: (root, args, context, info) => {
                    return mockAlbums;
                }
            }
        }
    }),
    // const SongType = new GraphQLObjectType({
    //     name: "Song",
    //     fields: {
    //         id: { type: GraphQLID },
    //         title: { type: GraphQLString },
    //         album: {
    //             type: AlbumType,
    //             resolve: (root, args, context, info) => {
    //                 var album = mockAlbums.find(mockAlbum => mockAlbum.id == root.album);
    //                 return album;
    //             }
    //         }
    //     }
    // })
    
});



app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log("Listening at :3000");
});

// const Express = require("express");
// const ExpressGraphQL = require("express-graphql");
// const Mongoose = require("mongoose");
// const {
//     GraphQLID,
//     GraphQLString,
//     GraphQLList,
//     GraphQLNonNull,
//     GraphQLObjectType,
//     GraphQLSchema
// } = require("graphql");

// var app = Express();

// Mongoose.connect("mongodb://localhost/thepolyglotdeveloper");

// const PersonModel = Mongoose.model("person", {
//     firstname: String,
//     lastname: String
// });

// const PersonType = new GraphQLObjectType({
//     name: "Person",
//     fields: {
//         id: { type: GraphQLID },
//         firstname: { type: GraphQLString },
//         lastname: { type: GraphQLString }
//     }
// });

// const schema = new GraphQLSchema({});

// app.use("/graphql", ExpressGraphQL({
//     schema: schema,
//     graphiql: true
// }));

// app.listen(3000, () => {
//     console.log("Listening at :3000...");
// });

