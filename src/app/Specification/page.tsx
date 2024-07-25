
"use client";
import Button from "antd/es/button/button"
import { Specification } from "../Components/Specification"
import { useEffect, useState } from "react"
import { SpecificationRequest, createSpecification, deleteSpecificate, getAllSpecifications, updateSpecificate } from "../service/specifications"
import Title from "antd/es/typography/Title";
import { CreateUpdateSpecification, Mode } from "../Components/CreateAupdateSpecification";

export default function SpecificationPage(){
    const defaultValues = {
        positionId: 1,
        parentsId: 1,
        description:"",
        quantityPerParent:1,
        unitMeasurement:""


    } as Specification;
    const [values,setValues] = useState<Specification>(defaultValues);
    const [specifications,setSpecifications]=useState<Specification[]>([]);
    const [loading,setLoading]=useState(true);
    const[isModalOpen,setIsModalOpen]=useState(false);
    const[mode, setMode] = useState(Mode.Create)

    useEffect(()=>{
        const getSpecification = async()=>{
            const specifications = await getAllSpecifications();
            setLoading(false);
            setSpecifications(specifications);
        }
        getSpecification();
 }, []);
    const handleCreateSpecificate = async (request:SpecificationRequest) =>{
    await createSpecification(request);

    const specifications = await getAllSpecifications();
    setSpecifications(specifications);
    closeModal();
    }

    const handleUpdateSpecificate = async(positionId:number, request: SpecificationRequest)=>{
        await updateSpecificate(positionId,request);
        closeModal();

        const specifications = await getAllSpecifications();
        setSpecifications(specifications);
    }

    const handleDeleteSpecification = async(positionId:number)=>{
    await deleteSpecificate(positionId);
        closeModal();
    
    const specifications = await getAllSpecifications();
    setSpecifications(specifications);

    };
    const openModal =() =>{
        setMode(Mode.Create);
        setIsModalOpen(true);
    }
    const closeModal=() =>{
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal= (specification: Specification)=>{
        setMode(Mode.Edit);
        setValues(specification);
        setIsModalOpen(true);
    };

    return(
        <div>
            <Button
            type="primary"
            style={{marginTop:"30px"}}
            size="large"
            onClick={openModal}
            >Добавить спецификацию</Button>
            <CreateUpdateSpecification mode={mode} 
            values={values} isModalOpen={isModalOpen} 
            handleCreate={handleCreateSpecificate}
            handleUpdate={handleUpdateSpecificate}
            handleCancel={closeModal}
            />
            {loading ? <Title>Loading...</Title>:<Specification specifications={specifications}
            handleOpen={openEditModal} handleDelete={handleDeleteSpecification}/>}

        </div>
    )
}