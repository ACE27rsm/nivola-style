import { Injectable } from '@angular/core';
import { IAnnouncement } from '../../types/Types';

@Injectable({
  providedIn: 'root',
})
export class MotoItService {
  private baseURL = 'https://dealer.moto.it/nivolastyle';

  constructor() {}

  // y *********************************************************
  // y *********************************************************
  // y *********************************************************
  private async getAnnouncementDetails(
    announcementId: string
  ): Promise<IAnnouncement> {
    const details =
      this.baseURL +
      '/detail/detail?' +
      new URLSearchParams({ ID: announcementId });

    console.log(details);

    return {
      brand: '',
      title: '',
      year: 0,
      price: 0,
      km: 0,
      img: '',
      description: '',
    };
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

      newAnnouncements.push({
        brand,
        title,
        year,
        price,
        km,
        img,
        description,
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

    return [];
  }
}
