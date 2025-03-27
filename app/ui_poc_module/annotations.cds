using CatalogService as service from '../../srv/cat-service';
annotate service.fieldvalueservices with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'sno',
                Value : sno,
            },
            {
                $Type : 'UI.DataField',
                Label : 'tablename',
                Value : tablename,
            },
            {
                $Type : 'UI.DataField',
                Label : 'nullcount',
                Value : nullcount,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'sno',
            Value : sno,
        },
        {
            $Type : 'UI.DataField',
            Label : 'tablename',
            Value : tablename,
        },
        {
            $Type : 'UI.DataField',
            Label : 'nullcount',
            Value : nullcount,
        },
    ],
);

