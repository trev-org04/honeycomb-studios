import React, { useEffect, useState } from "react";
import firebaseVars from "../firebase.js";
import OrderCard from "./orderCard.tsx";

export interface Order {
    name: string;
    posterName: string;
    phoneNumber: string;
    orderedAt: string;
}

export default function OrderDisplay () {

    // Variables
    const [orders, setOrders] = useState<Array<Order>>([]);


    // Functions
    function getData() {
        firebaseVars.db.collection("orders").get().then((querySnapshot) => {
            const orders: Array<Order> = [];
            querySnapshot.forEach(async (element) => {
                const newOrder: Order = {
                    name: element.get("name"),
                    posterName: element.get("posterName"),
                    phoneNumber: element.get("phoneNumber"),
                    orderedAt: element.get("orderedAt"),
                }
                orders.push(newOrder);
                setOrders([...orders]);
            });
        });
    }

    // Effects
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div id="products" className="card-container" style={{ margin: 0, marginTop: "1em" }}>
                {orders.map((order, i) => (
                    <OrderCard key={i} name={order.name} posterName={order.posterName} phoneNumber={order.phoneNumber} orderedAt={order.orderedAt}></OrderCard>
                ))}
            </div>
        </>
    )
}