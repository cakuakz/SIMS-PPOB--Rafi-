const CustomInput = ({ 
    name, 
    label, 
    width, 
    type, 
    logo, 
    register,
    valueAsNumber,
    error,
    onChange,
    ...inputProps
}) => {
    return ( 
        <div className="flex flex-col justify-start">
            <div className={`relative ${width ? `w-[${width}]` : 'w-96'}`}>
                <span className={`${logo ? 'flex pl-3' : 'hidden'} absolute inset-y-0 left-0 items-center`}>
                    {logo}
                </span>
                <input
                    {...register(name, { valueAsNumber })}
                    placeholder={label}
                    className={`${logo ? 'pl-10' : ''} p-2 border border-slate-400 w-full rounded`}
                    type={type ? type : "text"}
                    onChange={onChange}
                    {...inputProps}
                />
            </div>
            {error && <span className="text-red-600 text-xs text-start mt-1">{error.message}</span>}
        </div>
     );
}
 
export default CustomInput;