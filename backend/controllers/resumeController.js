import Resume from '../models/resumeModel.js';
import fs from 'fs';
import path from 'path';

// CREATE RESUME
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };
        
        const newResume = await Resume.create({
            userId: req.user._id, // Changed from requestAnimationFrame.user_id
            title,
            ...defaultResumeData,
            ...req.body
        });
        res.status(201).json(newResume);

    } catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message });
    }
}

// GET USER RESUMES
export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 }); // Fixed: toSorted() is not a mongoose method
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message });
    }
}

// GET RESUME BY ID
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ 
            _id: req.params.id, 
            userId: req.user._id 
        });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: "Failed to get resume", error: error.message });
    }
}

// UPDATE RESUME
export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        
        if (!resume) {
            return res.status(404).json({ message: "Resume not found or not authorized." });
        }
        
        // Merge updated resume
        Object.assign(resume, req.body);

        // Save the updated resume
        const savedResume = await resume.save();
        res.json(savedResume);

    } catch (error) {
        res.status(500).json({ message: "Failed to update resume", error: error.message });
    }
}

// DELETE RESUME
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id, // Fixed: req.params.id (not req_params.id)
            userId: req.user._id // Fixed: req.user._id (not req._id)
        });
        
        if (!resume) {
            return res.status(404).json({ message: "Resume not found or not authorized." });
        }
        
        // Create uploads folder path
        const uploadsFolder = path.join(process.cwd(), 'uploads');

        // Delete thumbnail function
        if (resume.thumbnailLink) {
            const thumbnailPath = path.join(uploadsFolder, path.basename(resume.thumbnailLink));

            if (fs.existsSync(thumbnailPath)) { // Fixed: thumbnailPath (not oldThumbnail)
                fs.unlinkSync(thumbnailPath);
            }
        }
        
        if (resume.profileInfo?.profilePreviewUrl) {
            const profilePath = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl)); // Fixed variable name
            
            if (fs.existsSync(profilePath)) {
                fs.unlinkSync(profilePath);
            }
        }

        // Delete Resume document
        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });
        
        if (!deleted) {
            return res.status(500).json({ message: "Failed to delete resume or you are not authorized." });
        }
        
        res.json({ message: "Resume deleted successfully." });

    } catch (error) {
        res.status(500).json({ message: "Failed to delete resume", error: error.message });
    }
}