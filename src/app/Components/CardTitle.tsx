interface Props{
    positionId:number;
}

export const CardTitle = ({positionId}:Props)=>{
    return(
        <div style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
        }}>
            <p className="card_title">Номер позиции: {positionId}</p>
        </div>
    )

}