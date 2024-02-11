export interface NestedCategory {
  uuid: string;
  translation: string;
}

export interface Category {
  uuid: string;
  translation: string;
  nested?: NestedCategory[];
}
