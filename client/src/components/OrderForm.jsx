import { useState } from 'react';

export default function OrderForm({ selectedDishId }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    if (selectedDishId == null) {
      setMessage('Please pick a dish from the menu first.');
      return;
    }
    const qty=Number(quantity);
    if(!Number.isInteger(qty)||qty<=0){
      setMessage("Please enter valid quantity");
      return;
    }
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishId: selectedDishId, quantity: qty })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Order placed! Total: ₹${data.total}`);
      } else {
        setMessage(`Could not place order: ${data.error}`);
      }
    } catch (err) {
      setMessage('Could not place order. Please try again.');
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Place an order</h2>
      <label htmlFor="quantity">Quantity</label>
      <input
        id="quantity"
        type="number"
        min="1"
        step="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Order</button>
      {message && <p className="order-message">{message}</p>}
    </form>
  );
}
