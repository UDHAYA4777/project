
import {Job} from "../models/job.model.js";
//admin
export const postJob = async(req,res)=>{
  try{
    const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
    const userId = req.id;
    if(!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId){
      return res.status(400).json({
        message:"something is missing",
        success:false
      })
    }
    const job = await Job.create({
      title,
      description,
      requirements:requirements.split(","),
      salary:Number(salary),
      location,
      jobType,
      experienceLevel:experience,
      position,
      company:companyId,
      created_by:userId
    }) 
    return res.status(201).json({
      message:"New job created successfully",
      job,
      success:true
    })
  }catch(error){
     console.log(error);
  }
} 
//student
export const getAllJobs=async(req,res)=>{
  try{
      const Keyword = req.query.keyword || "";
       const query = {
        $or:[
          {title:{$regex:Keyword,$options:"i"}},
          {description:{$regex:Keyword,$options:"i"}},
               ]
       };
       const jobs = await Job.find(query).populate({
        path:"company"
       }).sort({createdAt:-1})
     
       if(!jobs){
        return res.status(404).json({
          message:"Job not found",
          success:false
        })
       }
       return res.status(200).json({
        jobs,
        success:true
       })
  }catch(error){
    console.log(error);
  }
}
//student
export const getJobById = async(req,res)=>{
  try{
     const jobId = req.params.id;
     const job = await Job.findById(jobId).populate({
      path:"applications"
     });
     if(!job){ 
      return res.status(404).json({
        message:"Job not found",
        success:false
     })
    }
    return res.status(200).json({
      job,
      success:true
     })
  }catch(error){
    console.log(error);
  }
}
//admin kitne job create kra hai abhi tk
export const getAdminJobs = async(req,res)=>{
  try{
       const adminId = req.id;
       const jobs = await Job.find({created_by:adminId}).populate({
        path:'company',
        createdAt:-1
       });
       if(!jobs){
        return res.status(404).json({
          message:"Job not found",
          success:false
       })
      };
      return res.status(200).json({
        jobs,
        success:true
      })
  }catch(error){
    console.log(error);
  }
}
// Delete Job by ID
export const deleteJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Try to find and delete the job
    const deletedJob = await Job.findByIdAndDelete(jobId);

    // If no job was found to delete
    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Successfully deleted job
    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
