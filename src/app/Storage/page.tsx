"use client";

import Button from "antd/es/button/button"
import { Storage } from "../Components/Storage"
import { useEffect, useState } from "react"
import Title from "antd/es/typography/Title";
import { StorageRequest, createStorage, deleteStorage, getAllStorages,  updateStorage } from "../service/storage";
import { getConnectedNodesByDate } from "../service/storage";
import { CreateUpdateStorage, Mode } from "../Components/CreateUpdateStorage";

import MyForm from "../Components/SearchBar";


export default function StoragePage(){
    const defaultValues = {
     id: 0,
     specificationId:0,
     storageDate: "",
     description:"",
     count:0,
     measureUnit:"",
    } as Storage 
    const [dateI, setDate] = useState<string>('');
    const [connectedNodes, setConnectedNodes] = useState<any[]>([]);
    const [value,setValue] = useState<Storage []| undefined>();
    const [values,setValues] = useState<Storage>(defaultValues);
    const [storages,setStorages]=useState<Storage[]>([]);
    const [loading,setLoading]=useState(true);
    const[isModalOpen,setIsModalOpen]=useState(false);
    const[mode, setMode] = useState(Mode.Create)

    useEffect(()=>{
        const getStorage = async()=>{
            const storages = await getAllStorages();
            setLoading(false);
            setStorages(storages);
        }
        getStorage();
 }, []);
    const handleCreateStorage = async (request:StorageRequest) =>{
    await createStorage(request);

    const storages = await getAllStorages();
    setStorages(storages);
    closeModal();
    }

    const handleUpdateStorage = async(id:number, request: StorageRequest)=>{
        await updateStorage(id,request);
        closeModal();

        const storages = await getAllStorages();
        setStorages(storages );
    }

    const handleDeleteStorage = async(id:number)=>{
    await deleteStorage(id);
        closeModal();
    
        const storages = await getAllStorages();
        setStorages(storages );

    };
    const openModal =() =>{
        setMode(Mode.Create);
        setIsModalOpen(true);
    }
    const closeModal=() =>{
        setValues(defaultValues);
        setIsModalOpen(false);
    };
    

    const openEditModal= (storage: Storage)=>{
        setMode(Mode.Edit);
        setValues(storage);
        setIsModalOpen(true);
    };
    const handleSearch = async () => {
        if (dateI.trim() !== '') {
            const data = await getConnectedNodesByDate(dateI);
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
            <div style={{flex: 1, textAlign: 'right', marginBottom: '20px'}}>
                <MyForm />
            </div>
            <Button
            type="primary"
            style={{marginTop:"30px"}}
            size="large"
            onClick={openModal}
            >Добавить</Button>
            <CreateUpdateStorage mode={mode} 
            values={values} isModalOpen={isModalOpen} 
            handleCreate={handleCreateStorage}
            handleUpdate={handleUpdateStorage}
            handleCancel={closeModal}
            />
             
            {loading ? <Title>Loading...</Title>:<Storage storages={storages}
            handleOpen={openEditModal} handleDelete={handleDeleteStorage}/>}
             <hr style={{borderTop: '2px solid #1890ff', margin: '20px 0'}} /> 
             <div>
             <div>
                <input
                    type="date"
                    className='input-form'
                    value={dateI}
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
    </div>
    )
}