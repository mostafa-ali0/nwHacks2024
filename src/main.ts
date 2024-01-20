import {
    E_SDK_EVENT,
    getVenueMaker,
    showVenue,
    TGetVenueMakerOptions,
} from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options: TGetVenueMakerOptions = {
    mapId: "659efcf1040fcba69696e7b6",
    key: "65a0422df128bbf7c7072349",
    secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4",
};

async function init() {
    const venue = await getVenueMaker(options);
    // @ts-ignore
    const mapView = await showVenue(document.getElementById("app")!, venue);
    //Making polygons interactive allows them to respond to click and hover events.
    mapView.addInteractivePolygonsForAllLocations();

    //Capture when the user clicks on a polygon.
    //The polygon that was clicked on is passed into the on method.
    mapView.on(E_SDK_EVENT.CLICK, ({ polygons }) => {
        //If no polygon was clicked, an empty array is passed.
        //Check the length to verify if the user cliked on one.
        //If they clicked on a polygon, change its color to orange,
        //otherwise reset them to their default color.
        const location = mapView.getPrimaryLocationForPolygon(polygons[0]);
        if (polygons.length > 0) {
            // @ts-ignore
            location.name = window.prompt("Enter Name: ")
            // document.window.alert("name the building: ")
            mapView.FloatingLabels.add(polygons[0], location.name, {
                appearance: {
                    marker: {
                        size: 20
                    },
                    text: {
                        size: 32,
                        foregroundColor: "#ffb702",
                        backgroundColor: "#0a0a0a"
                    }
                }
            });            mapView.setPolygonColor(polygons[0], "#BF4320");
        } else {
            mapView.clearAllPolygonColors();
        }
    });
}




init();