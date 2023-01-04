import mongoose from "mongoose";

/**
* Programmer: D'Riski Maulana
* Filename: user.js
* Contact: driskimaulana@upi.edu
* Date: 12/28/2022
* Description: user model
**/

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	telp: { type: String},
	password: { type: String, required: true },
	id: { type: String},
	role: { type: String, required: true },
	acceptOrder: { type: Boolean },
	ratings: { type: Number, default: 0 },
	ratingsCount: { type: Number, default: 0 },
	ratingsTotal: { type: Number, default: 0 },
	location: {
		type: {
			type: String,
		}, 
		coordinates: {
			type: [],
			defaul: [],
		}
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

userSchema.index({ location: "2dsphere" });
var User = mongoose.model("User", userSchema);

export default User;