
interface GeoApi {
    lat: string;
    lng: string;
}

interface AddressApi {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoApi;
}

interface CompanyApi {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface UserApi {
    id: number;
    name: string;
    username: string;
    email: string;
    address: AddressApi;
    phone: string;
    website: string;
    company: CompanyApi;
}