/* =========================================
   PROPERTY DATA
========================================= */

const properties = [

    {
        id: 1,

        title: "Modern Apartment",

        type: "apartment",

        purpose: "sale",

        location: "Tallinn, Estonia",

        price: 250000,

        area: 65,

        rooms: 2,

        bedrooms: 1,

        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85"
    },


    {
        id: 2,

        title: "Contemporary City Home",

        type: "apartment",

        purpose: "rent",

        location: "Tartu, Estonia",

        price: 950,

        area: 58,

        rooms: 2,

        bedrooms: 1,

        image:
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=85"
    },


    {
        id: 3,

        title: "Family House",

        type: "house",

        purpose: "sale",

        location: "Pärnu, Estonia",

        price: 320000,

        area: 145,

        rooms: 5,

        bedrooms: 3,

        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85"
    }

];


/* =========================================
   FORMAT EURO PRICE
========================================= */

function formatPrice(price, purpose) {

    const formatted =
        new Intl.NumberFormat(
            "et-EE",
            {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0
            }
        ).format(price);


    if (purpose === "rent") {

        return `${formatted} / month`;

    }


    return formatted;
}


/* =========================================
   DISPLAY PROPERTIES
========================================= */

function displayProperties(list) {

    const grid =
        document.getElementById(
            "propertyGrid"
        );


    grid.innerHTML = "";


    if (list.length === 0) {

        grid.innerHTML = `
            <p class="no-results">
                No properties found.
            </p>
        `;

        return;

    }


    list.forEach(property => {

        const card =
            document.createElement("article");


        card.className =
            "property-card";


        card.innerHTML = `

            <div class="property-image">

                <img
                    src="${property.image}"
                    alt="${property.title}"
                >

                <span class="property-badge">

                    ${
                        property.purpose === "sale"
                            ? "FOR SALE"
                            : "FOR RENT"
                    }

                </span>

            </div>


            <div class="property-info">

                <h3>
                    ${property.title}
                </h3>


                <div class="property-location">

                    📍 ${property.location}

                </div>


                <div class="property-price">

                    ${formatPrice(
                        property.price,
                        property.purpose
                    )}

                </div>


                <div class="property-details">

                    <span>
                        🛏 ${property.bedrooms} beds
                    </span>

                    <span>
                        🚪 ${property.rooms} rooms
                    </span>

                    <span>
                        📐 ${property.area} m²
                    </span>

                </div>

            </div>

        `;


        grid.appendChild(card);

    });

}


/* =========================================
   SEARCH PROPERTIES
========================================= */

function searchProperties() {

    const purpose =
        document
            .getElementById("purpose")
            .value;


    const type =
        document
            .getElementById("propertyType")
            .value;


    const location =
        document
            .getElementById("location")
            .value
            .trim()
            .toLowerCase();


    const maxPrice =
        Number(
            document
                .getElementById("price")
                .value
        );


    const results =
        properties.filter(property => {

            if (
                purpose &&
                property.purpose !== purpose
            ) {
                return false;
            }


            if (
                type &&
                property.type !== type
            ) {
                return false;
            }


            if (
                location &&
                !property.location
                    .toLowerCase()
                    .includes(location)
            ) {
                return false;
            }


            if (
                maxPrice &&
                property.price > maxPrice
            ) {
                return false;
            }


            return true;

        });


    displayProperties(results);


    document
        .getElementById("properties")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   SEARCH BUTTON
========================================= */

document
    .getElementById("searchButton")
    .addEventListener(
        "click",
        searchProperties
    );


/* =========================================
   CONTACT FORM
========================================= */

document
    .getElementById("contactForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            alert(
                "Thank you! We will contact you shortly."
            );

            this.reset();

        }
    );


/* =========================================
   INITIAL LOAD
========================================= */

displayProperties(properties);
