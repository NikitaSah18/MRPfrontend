export interface SpecificationRequest{
    positionId?:number;
    parentsId?:number;
    description?:string;
    quantityPerParent?:number;
    unitMeasurement?:string;
}
export const getAllSpecifications = async() =>{
    const response = await fetch("https://localhost:7275/Specification")

    return response.json();
};

export const createSpecification = async (specificationRequest: SpecificationRequest) =>{
    await fetch("https://localhost:7275/Specification",{
    method: "POST",
    headers: {
        "content-type": "application/json",
    },
        body: JSON.stringify(specificationRequest),
    });
};

export const updateSpecificate = async(positionId: number, specificationRequest: SpecificationRequest ) =>
{
    await fetch("https://localhost:7275/Specification/" + positionId, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(specificationRequest),
    });
};

export const deleteSpecificate = async(positionId: number ) =>
{
    await fetch("https://localhost:7275/Specification/"+positionId,{
    method: "DELETE", 
    });
}

export const getConnectedNodes = async (id:number) => {
    try {
        const response = await fetch(`https://localhost:7275/Specification/GetConnectedNodes?id=${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data; 

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};




