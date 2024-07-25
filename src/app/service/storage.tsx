export interface StorageRequest{
    id?:number;
    specificationId?:number;
    storageDate?: string;
    description?:string;
    count?:number;
    measureUnit?:string;
   }

   export const getAllStorages = async() =>{
    const response = await fetch("https://localhost:7275/Storage")

    return response.json();
};

export const createStorage = async (storageRequest: StorageRequest) =>{
    await fetch("https://localhost:7275/Storage",{
    method: "POST",
    headers: {
        "content-type": "application/json",
    },
        body: JSON.stringify(storageRequest),
    });
};

export const updateStorage = async(id: number,storageRequest: StorageRequest ) =>
{
    await fetch("https://localhost:7275/Storage/"+ id, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(storageRequest),
    });
};

export const deleteStorage = async(id: number ) =>
{
    await fetch("https://localhost:7275/Storage/"+ id,{
    method: "DELETE", 
    });

};

export const getTotalCountByDate = async (storageDate: string) => {
    try {
        const response = await fetch(`https://localhost:7275/Storage/GetTotalCountByDate?date=${storageDate}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data && data.StorageItems) {
            const products = data.StorageItems.map((item: any) => ({
                id: item.SpecificationId,
                name: item.Description,
                quantity: item.TotalCount
            }));
            return products;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
    
}

export const getConnectedNodesByDate = async (dateStorage: string) => {
    try {
        const response = await fetch(`https://localhost:7275/Storage/GetConnectedNodes?dateDecomposition=${dateStorage}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const dataI = await response.json();
        if (dataI && Array.isArray(dataI.nodes)) {
            const groupedNodes = dataI.nodes.reduce((acc: any[], curr: any) => {
                const existingNode = acc.find((item: any) => item.positionId === curr.positionId);
                if (existingNode) {
                    existingNode.quantityPerParent += curr.quantityPerParent;
                } else {
                    acc.push(curr);
                }
                return acc;
            }, []);
            
            const connectedNodes = groupedNodes.map((item: any) => ({
                positionId: item.positionId,
                description: item.description,
                quantityPerParent: item.quantityPerParent
            }));
            return connectedNodes;
        } else {
            console.error("Invalid data format:", dataI);
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
