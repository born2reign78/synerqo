export interface Setting {
  id: string;

  key: string;

  value: string;

  category: string;

  description?: string;

  editable: boolean;

  createdAt: Date;

  updatedAt: Date;
}