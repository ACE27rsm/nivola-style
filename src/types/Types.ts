export interface IAnnouncementImages {
  href: string;
  type: string;
  thumbnail: string;
}

export interface IAnnouncement {
  id: string;
  brand: string;
  title: string;
  year: number;
  price: number;
  km: number;
  img: string;
  images: IAnnouncementImages[];
  description: string;
  registered: boolean;
  offerType: string;
  optionals: string;
  warranty: string;
  emissionClass: string;
  sellConditions: string;
  displacement: number;
  crashed: boolean;
  depowered: boolean;
  ABS: boolean;
  ev: boolean;
  color: string;
}

export interface IInfiniteScrollItem {
  src: string;
  alt: string;
  className: string;
  href: string;
}

export interface IContactsFormErrors {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  message: boolean;
}
