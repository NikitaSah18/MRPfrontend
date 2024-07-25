import Card from "antd/es/card/Card";
import {CardTitleOrder } from "./CardTitleOrder"
import Button from "antd/es/button/button"

interface Props{
    orders: Order[];
    handleDelete:(id:number)=>void;
    handleOpen:(order:Order)=>void;
}
const handleConfirm = () => {
    alert('Операция подтверждена!');
};

export const Order=({orders,handleDelete,handleOpen}:Props)=>{
    
    return(
        <div className="cards">
            {orders.map((order : Order) =>(
            <Card 
            key={order.id} title={<CardTitleOrder Id={order.id}/>}
            bordered={false}
            >
            <p>Номер позиции: {order.id}</p>
            <p>Дата заказа: {order.orderDate}</p>
            <p>Имя заказчика: {order.clientName}</p>
            <p>Количество: {order.quantity}</p>
            <p>Единица измерения: {order.measureUnit}</p>
            <div>
               <Button onClick={()=>handleOpen(order)} style={{flex: 1}}>Edit</Button> 
               <Button onClick={()=>{handleDelete(order.id);handleConfirm}}
                danger style={{flex : 1}}>Delete</Button>
            </div>
            </Card>
            ))}
        </div>
);
}
