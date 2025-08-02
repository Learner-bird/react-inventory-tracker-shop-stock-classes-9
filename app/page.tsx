
"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";

type InventoryType =
  {
    id: number,
    name: string,
    price: number,
    quantity: number
  }

export default function Home() {

  const [cashBox, setCashBox] = useState(0);

  const [inventory, setInventory] = useState([
    { id: 1, name: "Laptop", price: 200, quantity: 5 },
    { id: 2, name: "Phone", price: 100, quantity: 15 },
    { id: 3, name: "Router", price: 500, quantity: 2 },
    { id: 4, name: "Charger", price: 10, quantity: 20 },
  ])

  const [newInventory, setNewInventory] = useState({
    id: 0,
    name: "",
    price: 0,
    quantity: 0
  })

  function sellItem(inv: InventoryType) {
    if (inv.quantity < 1) {
      return
    }

    setInventory(current =>
      current.map(item =>
        item.id === inv.id ? { ...item, quantity: item.quantity - 1 } : item
      )
    )

    setCashBox(current => current + inv.price)
  }

  function deleteItem(id: number) {
    setInventory(current => current.filter(item => item.id !== id));
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">

      <h1 className="border-1 text-4xl mb-6 text-center bg-amber-400 py-2 rounded-10xl">Inventory Tracker</h1>

      <div className="text-2xl mb-6 text-center">Cash Box: {cashBox.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>

      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const itemToAdd = { ...newInventory, id: Date.now() };
          setInventory((current: InventoryType[]) => ([itemToAdd, ...current]));
          setNewInventory({ id: 0, name: "", price: 0, quantity: 0 });
        }}
        className="flex flex-col md:flex-row gap-2 mb-8 justify-center items-center"
      >
        <input type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={newInventory.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewInventory((current: typeof newInventory) =>
            ({ ...current, name: e.target.value })
          )}
        />

        <input type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={newInventory.price}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewInventory((current: typeof newInventory) =>
            ({ ...current, price: parseInt(e.target.value) || 0 })
          )}
        />

        <input type="number"
          placeholder="Quantity"
          className="border p-2 rounded"
          value={newInventory.quantity}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewInventory((current: typeof newInventory) =>
            ({ ...current, quantity: parseInt(e.target.value) || 0 })
          )}
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Add item
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          onClick={() => {
            setInventory([]);
            setCashBox(0);
          }}
        >
          Reset
        </button>
      </form>

c

      <table className="min-w-[350px] text-center bg-white shadow rounded-lg ">
        <thead>
          <tr>

            <th className="p-2">Name</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Price</th>
            <th className="p-2">Action</th>

          </tr>

        </thead>

        <tbody>
          {inventory.map(inv =>
            <tr key={inv.id}>
              <td>
                {inv.name}
              </td>
              <td>
                {inv.quantity}
              </td>
              <td>
                {inv.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </td>
              <td className="p-2 flex gap-2 justify-center">
                <button
                  disabled={inv.quantity < 1}
                  onClick={() => sellItem(inv)}
                  className="bg-blue-700 text-white p-2 rounded disabled:bg-gray-700">
                  Sell
                </button>
                <button
                  onClick={() => deleteItem(inv.id)}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition">
                  Delete
                </button>
              </td>
            </tr>
          )}
        </tbody>

      </table>
     

    </div>
  );
}
