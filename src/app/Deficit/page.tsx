
"use client"
import { useState } from 'react';

const Deficit: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [deficit, setDeficit] = useState<{ positionId: string; deficit: number }[]>([]);

  const handleSearch = async () => {
    if (date.trim() !== '') {
      const orderData = await getConnectedNodesByDateOrder(date);
      const storageData = await getConnectedNodesByDateStorage(date);

      if (orderData && storageData) {
        const deficitResult = calculateDeficit(orderData, storageData);
        setDeficit(deficitResult);
      } else {
        setDeficit([]);
      }
    } else {
      setDeficit([]);
    }
  };

  const getConnectedNodesByDateOrder = async (dateOrder: string) => {
    try {
      const response = await fetch(`https://localhost:7275/Order/GetConnectedNodes?dateDecomposition=${dateOrder}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data && Array.isArray(data.nodes)) {
        return data.nodes;
      } else {
        console.error("Invalid data format:", data);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  const getConnectedNodesByDateStorage = async (dateStorage: string) => {
    try {
      const response = await fetch(`https://localhost:7275/Storage/GetConnectedNodes?dateDecomposition=${dateStorage}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data && Array.isArray(data.nodes)) {
        return data.nodes;
      } else {
        console.error("Invalid data format:", data);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  const calculateDeficit = (orderData: any[], storageData: any[]) => {
    const orderMap = orderData.reduce((map, item) => {
      map[item.positionId] = (map[item.positionId] || 0) + item.quantityPerParent;
      return map;
    }, {});

    const storageMap = storageData.reduce((map, item) => {
      map[item.positionId] = (map[item.positionId] || 0) + item.quantityPerParent;
      return map;
    }, {});

    const deficitResult = [];

    for (const positionId in orderMap) {
      const orderQuantity = orderMap[positionId];
      const storageQuantity = storageMap[positionId] || 0;
      const deficit = storageQuantity - orderQuantity ;
      
      if (deficit !== 0) {
        deficitResult.push({ positionId, deficit });
      }
    }

    return deficitResult;
  }

  return (
    <div>
      <input
        className='input-form'
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button className='button-form' onClick={handleSearch}>Calculate Deficit</button>
      {deficit.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Position ID</th>
              <th>Deficit</th>
            </tr>
          </thead>
          <tbody>
            {deficit.map((item, index) => (
              <tr key={index}>
                <td>{item.positionId}</td>
                <td>{item.deficit > 0 ? item.deficit : `${-item.deficit} (Не хватает)`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Deficit;
