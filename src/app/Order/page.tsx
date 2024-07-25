"use client";

import Button from "antd/es/button/button"
import { Order } from "../Components/Order"
import { useEffect, useState } from "react"
import Title from "antd/es/typography/Title";

import { OrderRequest, createOrder, deleteOrder, getAllOrders, getConnectedNodesByDate, updateOrder } from "../service/order";
import { CreateUpdateOrder, Mode } from "../Components/CreateUpdateOrder";

export default function OrderPage(){
    const defaultValues = {
     id: 0,
     specificationId:0,
     orderDate: "",
     clientName:"",
     quantity:0,
     measureUnit:"",
    } as Order;
    const [date, setDate] = useState<string>('');
    const [connectedNodes, setConnectedNodes] = useState<any[]>([]);
    const [values,setValues] = useState<Order>(defaultValues);
    const [orders,setOrders]=useState<Order[]>([]);
    const [loading,setLoading]=useState(true);
    const[isModalOpen,setIsModalOpen]=useState(false);
    const[mode, setMode] = useState(Mode.Create)

    useEffect(()=>{
        const getOrder = async()=>{
            const orders = await getAllOrders();
            setLoading(false);
            setOrders(orders);
        }
        getOrder();
 }, []);
    const handleCreateOrder = async (request:OrderRequest) =>{
    await createOrder(request);

    const orders = await getAllOrders();
    setOrders(orders);
    closeModal();
    }

    const handleUpdateOrder = async(id:number, request: OrderRequest)=>{
        await updateOrder(id,request);
        closeModal();

        const orders = await getAllOrders();
        setOrders(orders);
    }

    const handleDeleteOrder = async(id:number)=>{
    await deleteOrder(id);
        closeModal();
    
        const orders = await getAllOrders();
        setOrders(orders);

    };
    const openModal =() =>{
        setMode(Mode.Create);
        setIsModalOpen(true);
    }
    const closeModal=() =>{
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal= (order: Order)=>{
        setMode(Mode.Edit);
        setValues(order);
        setIsModalOpen(true);
    };
    const handleSearch = async () => {
        if (date.trim() !== '') {
            const data = await getConnectedNodesByDate(date);
            if (data) {
                setConnectedNodes(data);
            } else {
                console.log("No data found");
            }
        } else {
            console.log("Please enter a valid date");
        }
    };

    return(
    <div>

            <Button
            type="primary"
            style={{marginTop:"30px"}}
            size="large"
            onClick={openModal}
            >Добавить заказ</Button>
            <CreateUpdateOrder mode={mode} 
            values={values} isModalOpen={isModalOpen} 
            handleCreate={handleCreateOrder}
            handleUpdate={handleUpdateOrder}
            handleCancel={closeModal}
            />
            

            {loading ? <Title>Loading...</Title>:<Order orders={orders}
            handleOpen={openEditModal} handleDelete={handleDeleteOrder}/>}
               <hr style={{borderTop: '2px solid #1890ff', margin: '20px 0'}} /> 
      
            <div>
                <input
                    type="date"
                    className='input-form'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button className='button-form' onClick={handleSearch}>Поиск</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Номер спецификации</th>
                        <th>Описание</th>
                        <th>Количество</th>
                    </tr>
                </thead>
                <tbody>
                    {connectedNodes.map((node, index) => (
                        <tr key={index}>
                            <td>{node.positionId}</td>
                            <td>{node.description}</td>
                            <td>{node.quantityPerParent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}