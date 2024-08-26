import Partner from '@/models/Partner';
import db from '@/utils/db';

export default async (req, res) => {
    const {method} = req;
    await db.connect();
    try{
    if(method==='POST') {
        const { fullName, description, img} = req.body;
        const partner = new Partner({
            fullName,
            description,
            img,
        })
        const partners = await partner.save();
        res.status(200).json({message:' partner added successfully'});

    } else if(method==='DELETE') {

        const {fullName} = req.body;
        await Partner.deleteOne( {fullName: fullName});
        res.status(200).json({ message: 'Partner deleted successfully' });

    } else if (method === 'GET') {  // Check if the method is GET for fetching partners
        const partners = await Partner.find({});  // Fetch all partners from the database
        res.status(200).json(partners); 
    }
    else {
        res.status(200).json({ message: 'method not allowed' });
    }
    } catch(error){
    res.status(500).json({ message: 'Internal server error '});
  }
}