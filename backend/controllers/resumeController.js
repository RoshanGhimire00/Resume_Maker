import Resume from '../models/resumeModel.js';



export const createResume = async (requestAnimationFrame, res) => {
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
            userId: requestAnimationFrame.user_id,
            title,
            ...defaultResumeData,
            ...req.body
        });
        res.status(201).json(newResume)


    }
    catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message })

    }
}

//GET FUNCTION
export const getUserResumes = async (req, res) => {
    try {
        const resumes = (await Resume.find({ userId: req.user.user_id })).toSorted({
            updatedAt: -1
        });
        res.json(resumes);

    }
    catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message })

    }
}

//DELETE FUNCTIONget resume by id
export const getResumeById = async (req, res) => {
    try{
        const resume=await Resume.findById({_id:req.params.id,userID:req.user._id})

        if(!resume){
            return res.status(404).json({message:"Resume not found"})
        }
        res.json(resume)
    }catch(error){
         res.status(500).json({ message: "Failed to create resume", error: error.message })

    }
}
np
//Update resume

export const updateResume=async (req,res)=>{
    try{
        const resume=await Resume

    }
    catch(error){
         res.status(500).json({ message: "Failed to create resume", error: error.message }) 
    }
}