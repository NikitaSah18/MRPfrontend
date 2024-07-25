export interface OrderRequest{
 id?:number;
 specificationId?:number;
 orderDate?: string;
 clientName?:string;
 quantity?:number;
 measureUnit?:string;  
}

export const getAllOrders = async() =>{
    const response = await fetch("https://localhost:7275/Order")

    return response.json();
};

export const createOrder = async (orderRequest: OrderRequest) =>{
    await fetch("https://localhost:7275/Order",{
    method: "POST",
    headers: {
        "content-type": "application/json",
    },
        body: JSON.stringify(orderRequest),
    });
};

export const updateOrder = async(id: number, orderRequest: OrderRequest ) =>
{
    await fetch("https://localhost:7275/Order/"+ id, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(orderRequest),
    });
};

export const deleteOrder = async(id: number ) =>
{
    await fetch("https://localhost:7275/Order/"+ id,{
    method: "DELETE", 
    });

}
export const getConnectedNodesByDate = async (dateOrder: string) => {
    try {
        const response = await fetch(`https://localhost:7275/Order/GetConnectedNodes?dateDecomposition=${dateOrder}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data && Array.isArray(data.nodes)) {
            const groupedNodes = data.nodes.reduce((acc: any[], curr: any) => {
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
            console.error("Invalid data format:", data);
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}


