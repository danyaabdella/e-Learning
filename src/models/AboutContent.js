import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    img: { type: String }, // Image URL or path
    content: [
      {
        title: { type: String, required: true }, // Each content must have a title
        description: { type: String, required: true }, // Each content must have a description
      },
    ],
  });
  const AboutContent = mongoose.models.AboutContent || mongoose.model('AboutContent', aboutSchema);
  export default AboutContent;