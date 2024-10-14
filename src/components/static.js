import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

export const LoginInputAttribute = [
    {
        name: "email",
        label: "masukkan email anda",
        type: "text",
        logo: <MdOutlineAlternateEmail className="text-slate-400"/>,
    },
    {
        name: "password",
        label: "masukkan password anda",
        type: "password",
        logo: <FaLock className="text-slate-400"/>
    }
]

export const RegisterInputAttribute = [
    {
        name: "email",
        label: "masukkan email anda",
        type: "text",
        logo: <MdOutlineAlternateEmail className="text-slate-400"/>
    },
    {
        name: "first_name",
        label: "nama depan",
        type: "text",
        logo: <FaRegUser className="text-slate-400"/>
    },
    {
        name: "last_name",
        label: "nama belakang",
        type: "text",
        logo: <FaRegUser className="text-slate-400"/>
    },
    {
        name: "password",
        label: "buat password",
        type: "password",
        logo: <FaLock className="text-slate-400"/>
    },
    {
        name: "confirm_password",
        label: "konfirmasi password",
        type: "password",
        logo: <FaLock className="text-slate-400"/>
    }
]

export const ServiceImages = [
    {
        url: "/PBB.png",
        alt: "PBB"
    },
    {
        url: "/Listrik.png",
        alt: "PLN"
    },
    {
        url: "/PDAM.png",
        alt: "PDAM"
    },
    {
        url: "/Pulsa.png",
        alt: "Pulsa"
    },
    {
        url: "/PGN.png",
        alt: "PGN"
    },
    {
        url: "/Musik.png",
        alt: "Musik"
    },
    {
        url: "/televisi.png",
        alt: "Televisi"
    },
    {
        url: "/paket_data.png",
        alt: "Paket Data"
    },
    {
        url: "/voucher_makan.png",
        alt: "Voucher Makan"
    },
    {
        url: "/Kurban.png",
        alt: "Kurban"
    },
    {
        url: "/Zakat.png",
        alt: "Zakat"
    }
]

export const BannerImages = [
    {
        url: "/Banner_1.png",
        alt: "Banner 1"
    },
    {
        url: "/Banner_2.png",
        alt: "Banner 2"
    },
    {
        url: "/Banner_3.png",
        alt: "Banner 3"
    },
    {
        url: "/Banner_4.png",
        alt: "Banner 4"
    },
    {
        url: "/Banner_5.png",
        alt: "Banner 5"
    },
]

export const TopupPriceCard = [
    {
        key: "1",
        price: "Rp.10.000",
        value: 10000
    },
    {
        key: "2",
        price: "Rp.20.000",
        value: 20000
    },
    {
        key: "3",
        price: "Rp.50.000",
        value: 50000
    },
    {
        key: "4",
        price: "Rp.100.000",
        value: 100000
    },
    {
        key: "5",
        price: "Rp.250.000",
        value: 250000
    },
    {
        key: "5",
        price: "Rp.500.000",
        value: 500000
    },
]

export const defaultProfPic = "https://minio.nutech-integrasi.com/take-home-test/null"