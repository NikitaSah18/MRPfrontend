interface Props{
    Id:number;
}

export const CardTitleOrder = ({Id}:Props)=>{
    return(
        <div style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
        }}>
            <p className="card_title">Номер заказа: {Id}</p>
        </div>
    )

}