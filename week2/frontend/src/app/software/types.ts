export type SoftwareItemCreateModel = {
  title: string;
  vendor: string;
  isOpenSource: boolean;
};

export type SoftwareItemModel = SoftwareItemCreateModel & { id: string };
