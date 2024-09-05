'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/cart.css';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [profile, setProfile] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchCartItems();
    fetchUserProfile();
  }, []);

  const fetchCartItems = async () => {
    const storedEmail = localStorage.getItem('Email');
    try {
      const response = await axios.get('/api/cart', { params: { email: storedEmail } });
      setCartItems(response.data);
      localStorage.setItem('cartItems', JSON.stringify(response.data)); // Store the cart items as a JSON string
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    // Calculate the total amount by summing the course prices
    const total = cartItems.reduce((sum, item) => {
      if (item.courseId && item.courseId.length > 0 && item.courseId[0].coursePrice) {
        return sum + parseFloat(item.courseId[0].coursePrice); // Ensure coursePrice is a number
      }
      return sum;
    }, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const storedEmail = localStorage.getItem('Email');
      const response = await axios.get(`/api/profile?email=${storedEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleRemoveFromCart = async (courseId) => {
    try {
      const storedEmail = localStorage.getItem('Email');
      await axios.delete('/api/cart', { data: { email: storedEmail, courseId } });

      setCartItems(cartItems.filter((item) => item.courseId[0]._id !== courseId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handlePayment = async () => {
    setLoading(true); // Start loading
  
    const paymentData = {
      totalAmount: parseFloat(totalAmount), // Ensure totalAmount is a number
      email: profile.email,
      first_name: profile.firstName,
      last_name: profile.lastName,
      phoneNumber: "0900123456"
    };
  
    try {
      const response = await fetch('/api/initializePayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
  
      const data = await response.json();
  
      if (data.status === 'success') {
        // Delay the redirection to the Chapa payment page
        setTimeout(() => {
          window.location.href = data.data.checkout_url; // Redirect to Chapa payment page
        }, 30000); // Add a delay of 2 seconds before redirecting
        
        //save enrollment
        await saveEnrollment(cartItems, profile);
        // Clear cart after confirming the payment is successful
        await fetch('/api/cart', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: profile.email }),
        });
  
        // Clear the cart items in state after deleting
        setCartItems([]);
      } else {
        console.error('Payment initiation failed:', data.message);
      }
    } catch (error) {
      console.error('Error during payment initiation:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const saveEnrollment = async (cartItems, profile) => {
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: profile._id, // Use the logged-in user's ID
          courseIds: cartItems.map(item => item.courseId[0]._id), // Map all course IDs from the cart
          order_number: `ORDER-${Date.now()}`, // Generate a unique order number
          price: totalAmount,
          paymentId: 'some-payment-id', // Replace with actual payment ID if available
          payment_status: 'PAID' // Update the payment status to PAID
        }),
      });
  
      const data = await response.json();
      if (data.status === 'success') {
        console.log('Enrollment saved successfully');
      } else {
        console.error('Error saving enrollment:', data.message);
      }
    } catch (error) {
      console.error('Error saving enrollment:', error);
    }
  };
  
  

  return (
    <div className="cartPage">
      <h2 className="cartTitle">Cart</h2>
      {cartItems.length === 0 ? (
        <p className='emptyCartMessage'>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cartItemsList">
            {cartItems.map((item) => (
              <li key={item._id} className='cartItem'>
                {item.courseId && item.courseId.length > 0 ? 
                  item.courseId[0].courseName : 
                  'Course Name Not Available'
                }
                <button onClick={() => handleRemoveFromCart(item.courseId[0]._id)} 
                    className='removeButton'>Remove</button><br/>
                {item.courseId[0].coursePrice}
              </li>
            ))}
          </ul>
          <div className='paymentForm'>
            <h3 className='cartTitle'>Payment Form</h3>
            <label className="paymentLabel">Full name</label>
            <input
              type="text"
              name="name"
              value={`${profile.firstName || ''} ${profile.lastName || ''}`}
              className='paymentInput'
              readOnly
            />
            <label className="paymentLabel">Location</label>
            <input
              type="text"
              name="name"
              value={profile.location || ''}
              className='paymentInput'
              readOnly
            />
            <label className="paymentLabel">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={profile.email || ''}
              className='paymentInput'
              readOnly
            />
            <button onClick={handlePayment} className='paymentButton'>Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
}
