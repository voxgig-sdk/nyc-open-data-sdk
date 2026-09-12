export interface Catalog {
    resource?: Record<string, any>;
}
export interface CatalogListMatch {
    agency?: string;
    category?: string;
    limit?: number;
    offset?: number;
    q?: string;
    sort?: string;
    $action?: string;
    [action: string]: any;
}
