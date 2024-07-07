import React from "react";

interface OrderCardProps {
    name: string;
    posterName: string;
    phoneNumber: string;
    orderedAt: string;
}

export default function OrderCard (props: OrderCardProps) {

    return (
        <div className="order-card">
            <span className="order-title">{props.name} ordered {props.posterName}</span>
            <ul>
                <li className="order-info">Contact: {props.phoneNumber}</li>
            </ul>
            <span className="order-footer">{props.orderedAt}</span>
        </div>
    );
}
