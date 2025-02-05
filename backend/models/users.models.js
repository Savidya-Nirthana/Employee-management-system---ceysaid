import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    address: {
        houseNo: {
            type: String,
            required: true
        },

        street1: {
            type: String,
            required: true
        },

        street2: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        district: {
            type: String,
            required: true
        },

        postalCode: {
            type: String,
            required: true
        },

        dsDivision: {
            type: String,
            required: true
        },

        gnDivision: {
            type: String,
            required: true
        },
    },

    telephone: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    dob: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        enum:["Male","Female","Other"],
        required: true
    },

    nic: {
        type: String,
        required: true,
        unique: true
    },

    natonality: {
        type: String,
        required: true
    },

    religion: {
        type: String,
        required: true
    },

    corporateDeatils: {
        corporateTitle: {
            type: String,
        },

        location: {
            type: String,
        },

        dateJoined: {
            type: Date,
            required: true
        },

        department: {
            type: String
        },

        employeeType: {
            type: String,
            enum:["Permanent","Temporary"],
            required: true
        },

    },

    attachments: {
        employeeImage: {
            type: String
        },

        nicImage: {
            type: String
        },

        gramaNiladhariCertificate:{
            type: String
        },

        letterOfAppointment:{
            type: String
        },
    },
},    
{
    timestamps:true
}
    
);


User = mongoose.model("users", userSchema);
export default User;