import { Injectable } from '@angular/core';
import { IAnnouncement, IAnnouncementImages } from '../types/Types';

@Injectable({
  providedIn: 'root',
})
export class MotoItService {
  private baseURL = 'https://dealer.moto.it/nivolastyle';

  constructor() {}

  // y *********************************************************
  // y *********************************************************
  // y *********************************************************
  async getAnnouncementDetails(announcementId: string): Promise<IAnnouncement> {
    const url =
      this.baseURL +
      '/detail/detail?' +
      new URLSearchParams({ ID: announcementId });

    const response = await fetch(url);

    const htmlString = await response.text();

    const parser = new DOMParser();

    const DOM = parser.parseFromString(htmlString, 'text/html');

    const body = DOM.querySelector('body');

    const id = announcementId;
    let images: IAnnouncementImages[] = [];
    const scriptText = body!.querySelector('script')?.textContent || '';

    if (scriptText) {
      const match = scriptText.match(/(\[.*\])/);
      if (match?.[1]) {
        const data = JSON.parse(match[1]);
        images = data;
      }
    }

    const brand =
      body!.querySelector('.dlr-modal__print__header__title')?.textContent ||
      '';

    const title =
      body!.querySelector('.dlr-modal__print__header__subtitle')?.textContent ||
      '';

    const description =
      body!.querySelector('.dlr-modal__description__content')?.textContent ||
      '';

    const price = Number(
      body!
        .querySelector('[itemprop="price"]')
        ?.textContent?.replace('.', '') || 0
    );

    const listElements = body!.querySelectorAll('tbody>*');
    let year = 0;
    let km = 0;
    let registered = false;
    let offerType = '';
    let optionals = '';
    let warranty = '';
    let emissionClass = '';
    let sellConditions = '';
    let displacement = 0;
    let crashed = false;
    let depowered = false;
    let ABS = false;
    let ev = false;
    let color = '';
    console.log(listElements);
    listElements.forEach((element) => {
      const key = element.querySelector('th')?.textContent || '';
      const value = element.querySelector('td')?.textContent || '';
      console.log({ key, value });

      if (/km/i.test(key)) {
        km = Number(value?.replace('.', '') || 0);
      } else if (/immatricolata/i.test(key)) {
        registered = value === 'Si';
      } else if (/incidentata/i.test(key)) {
        crashed = value === 'Si';
      } else if (/depotenziata/i.test(key)) {
        depowered = value === 'Si';
      } else if (/abs/i.test(key)) {
        ABS = value === 'Si';
      } else if (/elettrica/i.test(key)) {
        ev = value === 'Si';
      } else if (/offerta/i.test(key)) {
        offerType = value;
      } else if (/accessori/i.test(key)) {
        optionals = value;
      } else if (/garanzia/i.test(key)) {
        warranty = value;
      } else if (/normativa/i.test(key)) {
        emissionClass = value;
      } else if (/condizioni/i.test(key)) {
        sellConditions = value;
      } else if (/cilindrata/i.test(key)) {
        displacement = Number(value.replace(' cc', '').replace('.', '') || 0);
      } else if (/colore/i.test(key)) {
        color = value;
      }
    });

    const announcement = {
      id,
      brand,
      title,
      year: 0,
      price,
      km,
      optionals,
      img: images[0]?.href || '',
      description,
      images,
      registered,
      offerType,
      warranty,
      emissionClass,
      sellConditions,
      displacement,
      crashed,
      depowered,
      ABS,
      ev,
      color,
    };

    return announcement;
  }

  // y *********************************************************
  // y *********************************************************
  // y *********************************************************
  private async getPageAnnouncements(pageIndex: number): Promise<{
    announcementsAmount: number;
    newAnnouncements: IAnnouncement[];
  }> {
    let url = this.baseURL + '/Usato';

    if (pageIndex > 1) {
      url += `/pagina-${pageIndex}`;
    }

    const response = await fetch(url);

    const htmlString = await response.text();

    const parser = new DOMParser();

    const DOM = parser.parseFromString(htmlString, 'text/html');

    const body = DOM.querySelector('body');

    const announcementsAmount = Number(
      body!
        .querySelector('.dlr-plp-header__results')
        ?.innerHTML.replaceAll(/\D/g, '')
    );

    const newAnnouncements: IAnnouncement[] = [];

    const announcements = body!.querySelectorAll('.dlr-card');

    announcements.forEach((announcement) => {
      const brand =
        announcement.querySelector('.dlr-card__info__title__brand')
          ?.textContent || '';
      const title =
        announcement.querySelector('.dlr-card__info__title__model')
          ?.textContent || '';
      const km = Number(
        announcement
          .querySelector('.dlr-card__meta :nth-child(1)')
          ?.textContent?.replace(' km', '')
      );
      const year = Number(
        announcement
          .querySelector('.dlr-card__meta :nth-child(2)')
          ?.textContent?.replace('del ', '')
      );
      const price = Number(
        announcement
          .querySelector('.dlr-card__extrainfo__price')
          ?.textContent?.replace(' euro', '')
          .replace('.', '')
      );
      const img =
        announcement
          .querySelector('.dlr-card__image__imagefile,.img-responsive')
          ?.getAttribute('src') || '';
      const description =
        announcement.querySelector('.dlr-card__info__content')?.textContent ||
        '';
      const id =
        announcement
          .querySelector('.dlr-card__link')
          ?.getAttribute('data-target')
          ?.replaceAll(/\D/g, '') || '';

      newAnnouncements.push({
        id,
        brand,
        title,
        year,
        price,
        km,
        img,
        description,
        images: [],
        registered: true,
        offerType: '',
        warranty: '',
        emissionClass: '',
        sellConditions: '',
        displacement: 0,
        crashed: false,
        depowered: false,
        ABS: false,
        ev: false,
        optionals: '',
        color: '',
      });
    });

    return {
      announcementsAmount,
      newAnnouncements,
    };
  }

  // y *********************************************************
  // y *********************************************************
  // y *********************************************************
  async getAnnouncements(): Promise<IAnnouncement[]> {
    let page = 1;
    let announcementsAmount: null | number = null;
    const announcements: IAnnouncement[] = [];

    while (
      announcementsAmount === null ||
      announcements.length < announcementsAmount
    ) {
      const result = await this.getPageAnnouncements(page);
      announcementsAmount = result.announcementsAmount;
      announcements.push(...result.newAnnouncements);
      page++;
    }

    console.log(announcements);

    return announcements;
  }
}
