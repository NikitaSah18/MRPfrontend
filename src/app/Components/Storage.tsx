import Card from "antd/es/card/Card";
import Button from "antd/es/button/button"
import { CardTitleStorage } from "./CardTitleStorage";

interface Props{
    storages: Storage[];
    handleDelete:(id:number)=>void;
    handleOpen:(storage:Storage)=>void;
}
const handleConfirm = () => {
    alert('Операция подтверждена!');
};

export const Storage=({storages,handleDelete,handleOpen}:Props)=>{
    
    return(
        <div className="cards">
            {storages.map((storage : Storage) =>(
            <Card 
            key={storage.id} title={<CardTitleStorage Id={storage.id}/>}
            bordered={false}
            >
            <p>Номер позиции: {storage.specificationId}</p>
            <p>Дата записи: {storage.storageDate}</p>
            <p>Описание: {storage.description}</p>
            <p>Количество: {storage.count}</p>
            <p>Единица измерения: {storage.measureUnit}</p>
            <div>
               <Button onClick={()=>handleOpen(storage)} style={{flex: 1}}>Edit</Button> 
               <Button onClick={()=>{handleDelete(storage.id);handleConfirm}}
                danger style={{flex : 1}}>Delete</Button>
                
            </div>
            
            </Card>
            ))}
        </div>
);
}