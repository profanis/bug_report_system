import * as mongoose from "mongoose";

export class MongoDbConnetion {

    constructor() {  
    }

    public initialize() {
        let uri: string;
        if (process.env.NODE_ENV === "development") {
            uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
            mongoose.set("debug", true);
        } else {
            uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
        }
        const mongooseInstance = mongoose.connect(uri, {}, (err: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`mongodb connection is succesfully establised in port ${process.env.DB_PORT}!`);
            }
        });
    }
}
