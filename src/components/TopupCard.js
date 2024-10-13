const TopupCard = ({ key, price, onClick }) => {
    return ( 
        <div
            key={key}
            className="p-2 border border-slate-400 rounded text-center cursor-pointer"
            onClick={onClick}
        >
            <p className="text-black">{price}</p>
        </div>
    );
}
 
export default TopupCard;