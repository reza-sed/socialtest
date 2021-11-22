// types declerations

export enum SocialNetwork {
  LinkedIn,
  Instagram,
  Twitter,
  Facebook,
}

export interface SocialNetworkInfo {
  name?: string;
  value?: SocialNetwork.Instagram;
  icon?: JSX.Element;
  renderedValue: JSX.Element | string;
}

export interface SocialRoute {
  socialInfo: SocialNetworkInfo;
  link: string;
  id: string;
}
