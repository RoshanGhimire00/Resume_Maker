import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    thumbnailLink: {
        type: String,
    },
    template: {
        theme: String,
        colorPalette: [String],
    },
    profileInfo: {
        profileProviewUrl: String,
        fullName: String,
        designation: String,
        summary: String,
    },
    contactInfo: {
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String,
        website: String,
    },
    //WorkExperience
    workExperience: [
        {
            company: String,
            role: String,
            startDate: String,
            endDate: String,
            description: String,
        },
    ],
    //Education
    education: [
        {
            degree: String,
            institution: String,
            startDate: String,
            endDate: String,
        },
    ],
    skills: [
        {
            name: String,
            progress: Number,

        },
    ],
    //PROJECTS
    projects: [
        {
            title: String,
            description: String,
            github: String,
            liveDemo: String,
        },
    ],

    //CERTIFICATIONS
    certifications: [
        {
            title: String,
            issuer: String,
            year: String,
        },
    ],
    languages: [
        {
            name: String,
            progress: Number,

        },
    ],
    interests: [String],
},
 { 
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at' } 
}
);

export default mongoose.model('Resume', ResumeSchema);