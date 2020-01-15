import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

export { UserSchema };
