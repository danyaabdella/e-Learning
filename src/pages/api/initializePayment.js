
export default async function handler(req, res) {
  if (req.method === 'POST') {
      const { totalAmount, email, first_name, last_name } = req.body;
      
      const chapaSecretKey = process.env.chapaSecretKey;
      console.log('Using Chapa Secret Key:', chapaSecretKey);
      const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${chapaSecretKey}`);
        myHeaders.append("Content-Type", "application/json");

        const txRef = (email) =>{
          return `chewatatest-${email}-${Date.now()}`;
        }
      const raw = JSON.stringify({
          "amount": totalAmount.toString(),
          "currency": "ETB",
          "email": email,
          "phone_number": '0900123456', // Include phone number here
          "first_name": first_name,
          "last_name": last_name,
          "tx_ref": txRef,
          "callback_url": "https://5bd7-196-188-81-70.ngrok-free.app/api/webhook",  
          "return_url": "http://localhost:3000/mylearning",  
          "customization[title]": "Payment for Courses",
          "customization[description]": "E-learning Course Payment",
          "meta[hide_receipt]": "true"
      });
      
      try {
          const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
              method: 'POST',
              headers: myHeaders,
              body: raw,
          });
          console.log('response: ', response);

          const data = await response.json();
          console.log("data: ", data);
          res.status(200).json(data);
      } catch (error) {
          res.status(500).json({ message: "Payment initiation failed", error });
      }
  } else {
      res.status(405).json({ message: "Method not allowed" });
  }
}