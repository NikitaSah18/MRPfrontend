import React, { useState } from 'react';
import { getTotalCountByDate } from '../service/storage';
import Modal from './Modal';

const MyForm = () => {
    const [storageDate, setStorageDate] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    const onCloseModal = () => {
        setModalVisible(false);
        setProducts([]); 
    };

    const handleOpenModal = async () => {
        try {
            const data = await getTotalCountByDate(storageDate);
            if (data && data.length > 0) {
                setProducts(data);
                setModalVisible(true);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <input
                type="date"
                className='input-form'
                value={storageDate}
                onChange={(e) => setStorageDate(e.target.value)}
            />
            <button className='button-form' onClick={handleOpenModal}>Поиск</button>
            {isModalVisible && (
                <Modal
                    visible={isModalVisible}
                    title='Товары на складе'
                    content={
                        products.map(product => (
                          <div key={product.id}>
                            <p>Наименование: {product.name}</p>
                            <p>Количество: {product.quantity}</p>
                          </div>
                        ))
                    }
                    footer={<button className='button-form' onClick={onCloseModal}>Закрыть</button>}
                    onClose={onCloseModal}
                />
            )}
        </div>
    );
};

export default MyForm;