export type Vendor = {
    id: string;
    name: string;
    cuisine: string;
    city: string;
    rating: number;
    priceLevel: string;
    thumbnail: string;
};


export type MenuItem = { id: string; name: string; price: number; spicy: boolean; vegan: boolean };
export type Review = { id: string; rating: number; comment: string; date: string };
export type VendorDetail = Vendor & {
    description: string;
    menu: MenuItem[];
    reviews: Review[];
    isFavorite: boolean;
};