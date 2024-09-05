import Testomonial from '@/models/Testomonial';
import db from '@/utils/db';

export default async (req, res) => {
    const {method} = req;
    await db.connect();
    try{
    if(method==='POST') {
        const { name, message, img} = req.body;
        const testimony = new Testomonial({
            name,
            message,
            img,
        })
        const testimonies = await testimony.save();
        res.status(200).json({message:' testomny added successfully'});

    } else if(method==='DELETE') {

        const {name} = req.body;
        await Testomonial.deleteOne( {fullName: fullName});
        res.status(200).json({ message: 'Partner deleted successfully' });

    } else if (method === 'GET') {  
        const testimonies = await Testomonial.find({}); 
        res.status(200).json(testimonies); 
    }
    else {
        res.status(200).json({ message: 'method not allowed' });
    }
    } catch(error){
    res.status(500).json({ message: 'Internal server error '});
  }
}