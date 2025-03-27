sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'uipocnamespace/uipocmodule/test/integration/FirstJourney',
		'uipocnamespace/uipocmodule/test/integration/pages/fieldvalueservicesList',
		'uipocnamespace/uipocmodule/test/integration/pages/fieldvalueservicesObjectPage'
    ],
    function(JourneyRunner, opaJourney, fieldvalueservicesList, fieldvalueservicesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('uipocnamespace/uipocmodule') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThefieldvalueservicesList: fieldvalueservicesList,
					onThefieldvalueservicesObjectPage: fieldvalueservicesObjectPage
                }
            },
            opaJourney.run
        );
    }
);