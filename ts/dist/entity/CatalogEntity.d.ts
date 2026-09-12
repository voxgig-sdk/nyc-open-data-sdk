import { NycOpenDataEntityBase } from '../NycOpenDataEntityBase';
import type { NycOpenDataSDK } from '../NycOpenDataSDK';
import type { Control } from '../types';
import type { Catalog, CatalogListMatch } from '../NycOpenDataTypes';
declare class CatalogEntity extends NycOpenDataEntityBase<Catalog> {
    constructor(client: NycOpenDataSDK, entopts: any);
    make(this: CatalogEntity): CatalogEntity;
    list(this: any, reqmatch?: CatalogListMatch, ctrl?: Control): Promise<CatalogEntity[]>;
}
export { CatalogEntity };
