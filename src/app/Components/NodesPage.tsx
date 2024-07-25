import React, { useState, ChangeEvent } from 'react';
import { getConnectedNodes } from '../service/specifications';

interface Node {
    positionId: number;
    description: string;
    quantityPerParent: number | null;
}

interface ResponseData {
    nodes: Node[];
    totalNodes: number;
    totalWeight: number | null;
}

const NodesPage = () => {
    const [id, setId] = useState('');
    const [nodesData, setNodesData] = useState<Node[]>([]);
    const [totalWeight, setTotalWeight] = useState<number | null>(null);

    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };

    const handleSubmit = async () => {
        const data: ResponseData = await getConnectedNodes(parseInt(id));
        if (data) {
            setNodesData(data.nodes);
            setTotalWeight(data.totalWeight);
        }
    };

    return (
        <div>
            <h1>Подсчет узлов</h1>
            <input className='input-form' type="number" value={id} onChange={handleIdChange} placeholder="Введите ID узла" />
            <button className='button-form' onClick={handleSubmit}>Отправить</button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Номер позиции</th>
                        <th>Номер родительской позиции</th>
                        <th>Количество необходимо </th>
                    </tr>
                </thead>
                <tbody>
                    {nodesData.map((node, index) => (
                        <tr key={index}>
                            <td>{node.positionId}</td>
                            <td>{node.description}</td>
                            <td>{node.quantityPerParent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NodesPage;
