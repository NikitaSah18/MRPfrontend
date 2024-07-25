
import React, { ReactElement } from 'react';
import '../globals.css';
interface ModalProps {
    visible: boolean;
    title: string;
    content: ReactElement[];
    footer: ReactElement;
    onClose: () => void;
}

const Modal = ({ visible = false, title = '', content = [], footer, onClose }: ModalProps) => {
    if (!visible) return null;
    return (
        <div className='modal'>
            <div className='modal-dialog'>
                <div className='modal-header'>
                    <h3>{title}</h3>
                    <button className='modal-close-button' onClick={onClose}>✖️</button>
                </div>
                <div className='modal-body' style={{ paddingLeft: '20px' }}>
                    {content.map((item, index) => (
                        <div key={index} className='modal-item'>
                            {item}
                        </div>
                    ))}
                </div>
                <div className='modal-footer'>{footer}</div>
            </div>
        </div>
    );
};

export default Modal;
