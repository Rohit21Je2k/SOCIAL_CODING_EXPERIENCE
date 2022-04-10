
import usermodel from "../../models/user.js";


export const getfollower=async(req,res,next)=>{
    const user1 = req.body.username;
    const user = await usermodel.findOne({username:user1});
    console.log(user +" "+ user.followers+" "+user.rank);
    const obj ={followers:user.followers,following:user.following};
   return res.status(200).json(obj);
}

