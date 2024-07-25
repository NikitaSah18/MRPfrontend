import { Modal } from "antd";
import {OrderRequest} from "../service/order"
import { SetStateAction, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";


interface Props{
    mode: Mode;
    values: Order;
    isModalOpen: boolean;
    handleCancel:()=> void;
    handleCreate:(request: OrderRequest)=> void;
    handleUpdate:(id:number, request:OrderRequest) => void;
}

export enum Mode{
    Create,
    Edit,
}


export const CreateUpdateOrder=({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate,
}:Props)=>{
    const[id,setId] = useState<number>();
    const[specificationId,setSpecificationId] = useState<number>(1);
    const[orderDate,setOrderDate] = useState<string>("");
    const[clientName,setClientName] = useState<string>("");
    const[quantity,setQuantity] = useState<number>();
    const[measureUnit,setMeasureUnit] = useState<string>("");
    useEffect(()=>{
        setId(values.id)
        setSpecificationId(values.specificationId)
        setOrderDate(values.orderDate)
        setClientName(values.clientName)
        setQuantity(values.Quantity)

    },[values])

    const handleOnOk = async () => {
     const orderRequest= {
     id,
     specificationId,
     orderDate,
     clientName,
     quantity,
     measureUnit}
        mode == Mode.Create ?
         handleCreate(orderRequest) : 
         handleUpdate(values.id,orderRequest)
         
    };
    return(
        <Modal 
        title={mode === Mode.Create ? "Добавить заказать": "Редактировать"  } 
        open={isModalOpen} 
        onOk={handleOnOk}
        onCancel={handleCancel}
        cancelText={"Отмена"}
        >
            <div className="specifaction_model">
                <input
                value={String(id)}
                onChange={(e)=>setId(Number(e.target.value))}
                placeholder="Номер заказа"

                />
                <input
                value={String(specificationId)}
                onChange={(e)=>setSpecificationId(Number(e.target.value))}
                placeholder="Код позиции спецификации"
                />
                 <input
                value={String(orderDate)}
                onChange={(e)=>setOrderDate(e.target.value)}
                placeholder="Дата заказа"
                />
                 <input
                value={clientName}
                onChange={(e)=>setClientName(e.target.value)}
                placeholder="Имя заказчика"
                />
                <input
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Количество"
                />
                <input
                value={measureUnit}
                onChange={(e) => setMeasureUnit(e.target.value)}
                placeholder="Единица измерения"
                />

            </div>
        </Modal>
        )
}