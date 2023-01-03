import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	id: { type: String},
	role: { type: String, required: true },
	location: {
		type: [],
		default: [],
	},
	nomor_kendaraan: {
		type: String,
	},
	image_profile: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	}
});

var User = mongoose.model("User", userSchema);

export default User;