import AuthenticatedLayout from "../components/AuthenticatedLayout";
import { BannerImages, ServiceImages } from "../components/static";
import ServiceList from "../components/ServiceList";
import { useGetBannerQuery, useGetServicesQuery, useGetUserPropertyQuery } from "../utils/services/general";
import BannerList from "../components/BannerList";
import { useGetBalanceQuery } from "../utils/services/transaction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../utils/slice/user";

const Homepage = () => {
    const dispatch = useDispatch()
    const { data: servicesData, error: servicesError, isLoading: isServicesLoading } = useGetServicesQuery()
    const { data: bannersData, error: bannersError, isLoading: isBannersLoading } = useGetBannerQuery()
    const { data: userData, error: userDataError, isLoading: isUserDataLoading } = useGetUserPropertyQuery()
    const { data: balanceData, error: balanceError, isLoading: isBalanceLoading } = useGetBalanceQuery()

    const users = userData && userData.data
    const balance = balanceData && balanceData.data
    const services = (servicesData && servicesData.data) || []
    const banners = (bannersData && bannersData.data) || []

    useEffect(() => {
        if (userData && balanceData) {
            dispatch(setUserData({
                email: userData.data && userData.data.email,
                first_name: userData.data && userData.data.first_name,
                last_name: userData.data && userData.data.last_name,
                profile_image: userData.data && userData.data.profile_image,
                balance: balanceData.data && balanceData.data.balance,
            }))
        }
    }, [balanceData, dispatch, userData])

    if (isServicesLoading || isBannersLoading || isUserDataLoading || isBalanceLoading) return <p>Loading...</p>

    if (servicesError) return <p>Error loading services</p>
    if (bannersError) return <p>Error loading banners</p>
    if (userDataError) return <p>Error loading user data</p>
    if (balanceError) return <p>Error loading balance</p>

    const updatedServiceData = services.map((service, index) => {
        if (service.service_icon === "https://nutech-integrasi.app/dummy.jpg") {
            return {
                ...service,
                service_icon: ServiceImages[index] ? ServiceImages[index].url : service.service_icon
            }
        }
        return service
    })

    const updatedBannerData = banners.map((banner, index) => {
        if (banner.banner_image === "https://nutech-integrasi.app/dummy.jpg") {
            return {
                ...banner,
                banner_image: BannerImages[index] ? BannerImages[index].url : banner.banner_image
            }
        }
        return banner
    })

    return ( 
        <AuthenticatedLayout
            users={users}
            balance={balance.balance}
        >
            <div className="flex flex-col px-20">
                <ServiceList data={updatedServiceData}/>
                <p className="pt-10 text-black font-semibold">Temukan promo menarik</p>
                <BannerList data={updatedBannerData}/>
            </div>
        </AuthenticatedLayout>
     );
}
 
export default Homepage;