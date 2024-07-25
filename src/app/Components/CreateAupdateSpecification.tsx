import { Modal } from "antd";
import {SpecificationRequest} from "../service/specifications"
import { SetStateAction, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";


interface Props{
    mode: Mode;
    values: Specification;
    isModalOpen: boolean;
    handleCancel:()=> void;
    handleCreate:(request: SpecificationRequest)=> void;
    handleUpdate:(positionId:number, request:SpecificationRequest) => void;
}

export enum Mode{
    Create,
    Edit,
}


export const CreateUpdateSpecification=({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate,
}:Props)=>{
    const[positionId,setPositionId] = useState<number>();
    const[parentsId,setParentsId] = useState<number>(1);
    const[description,setDescription] = useState<string>("");
    const[quantityPerParent,setQuantityPerParent] = useState<number>(1);
    const[unitMeasurement,setUnitMeasurement] = useState<string>("");
    useEffect(()=>{
        setPositionId(values.positionId)
        setParentsId(values.parentsId)
        setDescription(values.description)
        setQuantityPerParent(values.quantityPerParent)
        setUnitMeasurement(values.unitMeasurement)

    },[values])

    const handleOnOk = async () => {
     const specificationRequest= {
     positionId,
     parentsId,
     description,
     quantityPerParent,
     unitMeasurement}
        mode == Mode.Create ?
         handleCreate(specificationRequest) : 
         handleUpdate(values.positionId,specificationRequest)
         
    };
    return(
        <Modal 
        title={mode === Mode.Create ? "Добавить спецификацию": "Редактировать"  } 
        open={isModalOpen} 
        onOk={handleOnOk}
        onCancel={handleCancel}
        cancelText={"Отмена"}
        >
            <div className="specifaction_model">
                <input
                className='input-form'
                value={String(positionId)}
                onChange={(e)=>setPositionId(Number(e.target.value))}
                placeholder="Код позиции"

                />
                <input
                className='input-form'
                value={String(parentsId)}
                onChange={(e)=>setParentsId(Number(e.target.value))}
                placeholder="Код позиции родителя"
                />
                <TextArea
                value={description}
                onChange={(e: { target: { value: SetStateAction<string>; }; })=> setDescription(e.target.value)}
                autoSize={{minRows:3,maxRows:3}}
                placeholder="Описание"
                />
                <input
                className='input-form'
                value={quantityPerParent}
                onChange={(e) => setQuantityPerParent(Number(e.target.value))}
                placeholder="Количество"
                />
                <input
                className='input-form'
                value={unitMeasurement}
                onChange={(e) => setUnitMeasurement(e.target.value)}
                placeholder="Единица измерения"
                />

            </div>
        </Modal>
        )
}


