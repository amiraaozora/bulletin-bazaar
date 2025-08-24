export type PostCategory = "All" | "AR" | "SMG" | "Shotgun" | "LMG" | "Sniper Rifle" | "Marksman Rifle" | "Hand Gun";

export type DeviceTag = "PC" | "Mobile";

export interface Post {
  id: string;
  title: string;
  deviceTag: DeviceTag;
  category: PostCategory;
  copyableText: string;
  description: string;
  postedBy: string;
  imageUrl?: string;
  approved: boolean;
  createdAt: Date;
}

export interface AdminSettings {
  password: string;
  leftButtonUrl?: string;
  leftButtonText?: string;
  rightButtonUrl?: string;
  rightButtonText?: string;
  customColors: {
    background: string;
    buttonHeading: string;
    buttonTitle: string;
    buttonTitleHover: string;
    buttonContent: string;
    postBackground: string;
    postHeading: string;
    postText: string;
  };
}