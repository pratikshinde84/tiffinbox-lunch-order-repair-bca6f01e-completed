import { useState } from 'react';
import MenuList from './components/MenuList.jsx';
import OrderForm from './components/OrderForm.jsx';

export default function App() {
  const [selectedDishId, setSelectedDishId] = useState(null);

  return (
    <div className="page">
      <h1>TiffinBox</h1>
      <p className="subtitle">Today's lunch menu</p>
      <MenuList selectedDishId={selectedDishId} onSelectDish={setSelectedDishId} />
      <hr />
      <OrderForm selectedDishId={selectedDishId} />
    </div>
  );
}
