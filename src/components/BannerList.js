const BannerList = ({ data }) => {
    return ( 
        <div className="flex flex-row space-x-10 mt-5">
            {data.map((apiData, index) => (
                <div key={index} className="flex flex-col items-center">
                    <img src={apiData.banner_image} alt="banner pict"/>
                </div>
            ))}
        </div>
    );
}
 
export default BannerList;