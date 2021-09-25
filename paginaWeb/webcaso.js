$('head').append("<link href='http://fonts.googleapis.com/css?family=Oswald:400,300,700' rel='stylesheet' type='text/css'/>");

$('head').append('<meta name="apple-mobile-web-app-capable" content="yes"/>');

$('head').append('<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.5, user-scalable=yes"/>');

// handlebar methods
Handlebars.registerHelper('diamondRating', function(rating, outOf) {
    var ratingDom = "";
    for(var i=1; i <= rating; i++) {
        ratingDom = ratingDom + "<span class=\"tst-icon-diamond\"></span>";
    }
    for (var o=rating; o < outOf; o++) {
        ratingDom = ratingDom + "<span class=\"tst-icon-diamond disabled\"></span>";
    }
  return new Handlebars.SafeString(ratingDom);
});

// load card template
var cardTemplate = Handlebars.compile($("#card-template").html());
var hotelTemplate = Handlebars.compile($("#hotel-description").html());

// cards
var cards = [
    {imgUrl: "https://i.imgur.com/bBjVIfL.png",  //foto
     price: "10000/10000",  //precio incial y actual
     attributes: "featured",
     featureMsg: "2011", //year of article
     currency: "USD",
     title: "Gold Trophy", //titulo
     description: new Handlebars.SafeString(hotelTemplate({
         diamondRating: "",
         tripAdvisorUrl: "",
         tripAdvisor: "",
         address: "A very shiny golden trophy",  //descripcion
         street: " ",
         cityState: " ",
         zipcode: " ",
         country: " ",
         phone: "2021-09-21/2021-10-21" //fecha inicial y final
     }))
    },
    
    {imgUrl: "https://i.imgur.com/rn4Ehz9.jpeg",  //foto
     price: "8000/9500",  //precio incial y actual
     attributes: "featured",
     featureMsg: "2009", //year of article
     currency: "USD",
     title: "PlayStation 3 Slim", //titulo
     description: new Handlebars.SafeString(hotelTemplate({
         diamondRating: "",
         tripAdvisorUrl: "",
         tripAdvisor: "",
         address: "One of the first playstation 3 slim consoles",  //descripcion
         street: " ",
         cityState: " ",
         zipcode: " ",
         country: " ",
         phone: "2021-09-21/2021-09-30" //fecha inicial y final
     }))
    },
    
   {imgUrl: "https://www.mytrendyphone.eu/images/Apple-Airpods-2-with-Charging-Case-MV7N2ZM-A-0190199098572-13092019-01-p.jpg",  //foto
     price: "5000/5100",  //precio incial y actual
     attributes: "featured",
     featureMsg: "2018", //year of article
     currency: "USD",
     title: "Airpods", //titulo
     description: new Handlebars.SafeString(hotelTemplate({
         diamondRating: "",
         tripAdvisorUrl: "",
         tripAdvisor: "",
         address: "Very little use",  //descripcion
         street: "",
         cityState: " ",
         zipcode: " ",
         country: " ",
         phone: "2021-09-21/2021-11-21" //fecha inicial y final
     }))
    },
    
    
    
    

   {imgUrl: "https://noticias.coches.com/wp-content/uploads/2015/07/Fiat-500-2015-22-700x440.jpg",  //foto
     price: "20000/30000",  //precio incial y actual
     attributes: "featured",
     featureMsg: "2015", //year of article
     currency: "USD",
     title: "Fiat 500", //titulo
     description: new Handlebars.SafeString(hotelTemplate({
         diamondRating: "",
         tripAdvisorUrl: " ",
         tripAdvisor: "",
         address: "Very clean, good condition",  //descripcion
         street: " ",
         cityState: " ",
         zipcode: " ",
         country: " ",
         phone: "2021-09-21/2021-12-31" //fecha inicial y final
     }))
    },

    {imgUrl: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6461/6461987_sd.jpg",  //foto
     price: "4999/10999",  //precio incial y actual
     attributes: "featured",
     featureMsg: "2021", //year of article
     currency: "USD",
     title: "HP Laptop", //titulo
     description: new Handlebars.SafeString(hotelTemplate({
         diamondRating: "",
         tripAdvisorUrl: " ",
         tripAdvisor: "",
         address: "Brand new laptop",  //descripcion
         street: " ",
         cityState: " ",
         zipcode: " ",
         country: " ",
         phone: "2021-09-21/2021-10-22" //fecha inicial y final
     }))
    },
    {imgUrl: "https://m.media-amazon.com/images/I/71t3cPd5dgL._AC_SY606_.jpg",  //foto
     price: "15000/17050",  //precio incial y actual
     attributes: "featured",
     featureMsg: "2006", //year of article
     currency: "USD",
     title: "iPod Shuffle", //titulo
     description: new Handlebars.SafeString(hotelTemplate({
         diamondRating: "",
         tripAdvisorUrl: " ",
         tripAdvisor: " ",
         address: "Discontinued iPod Shuffle, 1GB",  //descripcion
         street: " ",
         cityState: " ",
         zipcode: " ",
         country: " ",
         phone: "2021-09-21/2021-11-15" //fecha inicial y final
     }))
    }
];

$.each(cards, function(index, card) {
    $(".cards").append(cardTemplate(card)); 
});