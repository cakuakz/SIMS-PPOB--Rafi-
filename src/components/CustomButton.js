import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const CustomButton = ({ text, classname, type, onClick, width, isLoading, disabled }) => {
    return ( 
        <button 
            type={type}
            onClick={onClick}
            className={classname ? classname : `bg-red-600 text-white ${width ? `w-${width}` : 'w-96'} py-2 rounded ${disabled ? 'opacity-50' : ''}`}
            disabled={disabled}
        >
            {isLoading ? <Spin indicator={<LoadingOutlined spin />}/> : text}
        </button>
    );
}
 
export default CustomButton;