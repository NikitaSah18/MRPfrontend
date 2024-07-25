import { Modal } from "antd";
import {StorageRequest} from "../service/storage"
import { SetStateAction, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";


interface Props{
    mode: Mode;
    values: Storage;
    isModalOpen: boolean;
    handleCancel:()=> void;
    handleCreate:(request: StorageRequest)=> void;
    handleUpdate:(id:number, request:StorageRequest) => void;
}

export enum Mode{
    Create,
    Edit,
}


export const CreateUpdateStorage=({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate,
}:Props)=>{
    const[id,setId] = useState<number>();
    const[specificationId,setSpecificationId] = useState<number>(1);
    const[storageDate,setStorageDate] = useState<string>("");
    const[description,setDescription] = useState<string>("");
    const[count,setCount] = useState<number>();
    const[measureUnit,setMeasureUnit] = useState<string>("");
    useEffect(()=>{
        setId(values.id)
        setSpecificationId(values.specificationId)
        setStorageDate(values.storageDate)
        setDescription(values.description)
        setCount(values.count)
        setMeasureUnit(values.measureUnit)
    },[values])

    const handleOnOk = async () => {
     const storageRequest= {
     id,
     specificationId,
     storageDate,
     description,
     count,
     measureUnit}
        mode == Mode.Create ?
         handleCreate(storageRequest) : 
         handleUpdate(values.id,storageRequest)
         
    };
    return(
        <Modal 
        title={mode === Mode.Create ? "Добавить ": "Редактировать"  } 
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
                  type="date"
                value={String(storageDate)}
                onChange={(e)=>setStorageDate(e.target.value)}
                placeholder="Дата записи"
                />
                 <input
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="Описание"
                />
                <input
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
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