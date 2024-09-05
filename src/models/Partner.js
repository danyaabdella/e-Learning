import mongoose from 'mongoose';
 const PartnerSchema = new mongoose.Schema({
    fullName: { type:String, required:true},
    description: String,
    img:{
        type:String,
        // ContentType: String
    }
 });
  const Partner = mongoose.models.Partner || mongoose.model('Partner', PartnerSchema);
  export default Partner;