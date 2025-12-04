import fs from 'fs';
import path from 'path';
import Resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';

export const uploadResumeImages = async (req, res) => {
    try {
        // Use async/await with multer middleware
        const multerMiddleware = upload.fields([
            { name: "thumbnail", maxCount: 1 },
            { name: "profileImage", maxCount: 1 }
        ]);

        // Execute multer middleware
        multerMiddleware(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ 
                    message: "File upload failed", 
                    error: err.message 
                });
            }

            const resumeId = req.params.id; // Fixed: params not param
            const resume = await Resume.findOne({ 
                _id: resumeId, 
                userId: req.user._id // Fixed: req.user not req_user
            });

            if (!resume) {
                return res.status(404).json({ message: "Resume not found" });
            }

            // Use process.cwd() to locate the upload folder
            const uploadsFolder = path.join(process.cwd(), "uploads");
            const baseUrl = `${req.protocol}://${req.get("host")}`; // Fixed template string

            const newThumbnail = req.files?.thumbnail?.[0];
            const newProfileImage = req.files?.profileImage?.[0]; // Fixed: profileImage not profileImages

            let thumbnailUpdated = false;
            let profileImageUpdated = false;

            // Handle thumbnail update
            if (newThumbnail) {
                if (resume.thumbnailLink) {
                    const oldThumbnail = path.join(
                        uploadsFolder, 
                        path.basename(resume.thumbnailLink)
                    );

                    if (fs.existsSync(oldThumbnail)) {
                        fs.unlinkSync(oldThumbnail);
                    }
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
                thumbnailUpdated = true;
            }

            // Handle profile image update
            if (newProfileImage) {
                // Initialize profileInfo if it doesn't exist
                if (!resume.profileInfo) {
                    resume.profileInfo = {};
                }

                if (resume.profileInfo?.profilePreviewUrl) {
                    const oldProfile = path.join(
                        uploadsFolder, 
                        path.basename(resume.profileInfo.profilePreviewUrl)
                    );

                    if (fs.existsSync(oldProfile)) {
                        fs.unlinkSync(oldProfile);
                    }
                }
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`; // Fixed: assign to correct field
                profileImageUpdated = true;
            }

            // Save only if there were updates
            if (thumbnailUpdated || profileImageUpdated) {
                await resume.save();
            }

            res.status(200).json({
                message: "Images uploaded successfully",
                thumbnailLink: resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo?.profilePreviewUrl
            });
        });

    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}