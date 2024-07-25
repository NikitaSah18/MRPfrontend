interface Props{
    Id:number;
}

export const CardTitleStorage = ({Id}:Props)=>{
    return(
        <div style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
        }}>
            <p className="card_title">Номер на складе: {Id}</p>
        </div>
    )

}