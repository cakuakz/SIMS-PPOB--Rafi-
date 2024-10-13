const CustomButton = ({ text, classname, type, onClick, width }) => {
    return ( 
        <button 
            type={type}
            onClick={onClick}
            className={classname ? classname : `bg-red-600 text-white ${width ? `w-[${width}]` : 'w-96'} py-2 rounded`}
        >
            {text}
        </button>
    );
}
 
export default CustomButton;