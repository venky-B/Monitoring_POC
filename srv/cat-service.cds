using my.monitoring as my from '../db/schema';

service CatalogService {
    @readonly entity fieldvalueservices as projection on my.fieldvalueservices;
}
