import Card from "antd/es/card/Card";
import { CardTitle } from "./CardTitle"
import Button from "antd/es/button/button"

interface Props{
    specifications: Specification[];
    handleDelete:(positionId:number)=>void;
    handleOpen:(specification:Specification)=>void;
}
const handleConfirm = () => {
    alert('Операция подтверждена!');
};

export const Specification=({specifications,handleDelete,handleOpen}:Props)=>{
    
    return(
        <div className="cards">
            {specifications.map((specification : Specification) =>(
            <Card 
            key={specification.positionId} title={<CardTitle positionId={specification.positionId}/>}
            bordered={false}
            >
            <p>Код родителя: {specification.parentsId}</p>
            <p>Описание: {specification.description}</p>
            <p>Количество: {specification.quantityPerParent}</p>
            <p>Единица измерения: {specification.unitMeasurement}</p>
            <div>
               <Button onClick={()=>handleOpen(specification)} style={{flex: 1}}>Edit</Button> 
               <Button onClick={()=>{handleDelete(specification.positionId);handleConfirm}}
                danger style={{flex : 1}}>Delete</Button>
            </div>
            </Card>
            ))}
        </div>
);
}
