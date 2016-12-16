//remember to change file name to your model name
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

//remember to change shcema name
var UserSchema = new mongoose.Schema({
    //colum definition below
    email: {
        type: String,
        required: [true, "Please enter a valid email address"],
        trim: true,
        unique: [true, "This email has been used by someone"]
    },
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
        trim: true
    },
    userName: {
        type: String,
        required: [true, "Please enter your user name"],
        trim: true,
        minlength: [4, "Your user name should at least have 4 characters"],
        unique: [true, "This user name has been used by someone"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        trim: true,
        minlength: [8, "Your password should at least have 8 characters"]
    },
    buckets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bucket"
    }]
}, {timestamps: true});

// UserSchema.methods.encryptPassword = function(password){
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// }
//
// UserSchema.pre("save", function(done){
//     this.password = this.encryptPassword(this.password);
//     done();
// });

var BucketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"],
        minlength: [5, "The title should be at least 5 characters long"],
        trim: true
    },
    desc: {
        type: String,
        required: [true, "Please enter a description"],
        minlength: [10, "The description should be at least 10 characters long"],
        trim: true
    },
    status: {
        type: String,
        default: "pending"
    },
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true});

mongoose.model("User", UserSchema);
mongoose.model("Bucket", BucketSchema);
