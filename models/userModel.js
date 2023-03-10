import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import validator from 'validator';
const {
  Schema
} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "UserName area is required"],
    lowercase: true, //büyük harf ile yazarsak küçük harfe çevirir
    validate: [validator.isAlphanumeric, "Only Alphanumeric characters"], //sadece harf ve rakamlardan oluşsun
  },
  email: {
    type: String,
    required: [true, "Email area is required"],
    unique: true,
    validate: [validator.isEmail, "Valid email is required"]
  },
  password: {
    type: String,
    required: [true, "Password area is required"],
    minlenght: [4, "At least 4 characters"]
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  followings: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }]
}, {
  timestamps: true,
});

userSchema.pre("save", function (next) {
  const user = this
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;

    next();
  })

})
const User = mongoose.model('User', userSchema);

export default User;