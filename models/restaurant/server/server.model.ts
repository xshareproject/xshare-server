import { Schema } from "mongoose";

const serverSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const SERVER = serverSchema;

export default SERVER;
