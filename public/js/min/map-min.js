!function(){var a={};a.displayMap={},a.displayMap.map={},a.displayMap.type="",a.displayMap.boundingbox=[],a.displayMap.pins=[],a.displayMap.pinNum=0,a.displayMap.flyout={},a.displayMap.locations=[{name:"Sacred Sanctuary - A Spiritual Center in Olde Town Arvada",address:{street:"5626 Olde Wadsworth Blvd.",city:"Arvada",state:"C0",postal:"80002"},geocode:{lat:39.799694,lng:-105.081447}}],a.displayMap.initialize=function(){a.displayMap.map=new google.maps.Map(document.getElementById("ajaxMap"),{center:new google.maps.LatLng(a.displayMap.locations[0].geocode.lat,a.displayMap.locations[0].geocode.lng),zoom:15,mapTypeId:google.maps.MapTypeId.ROADMAP}),a.displayMap.boundingbox=new google.maps.LatLngBounds;for(var p=0;p<a.displayMap.locations.length;p++){var o=new google.maps.LatLng(a.displayMap.locations[p].geocode.lat,a.displayMap.locations[p].geocode.lng);a.displayMap.boundingbox.extend(o),a.displayMap.addPins()}},a.displayMap.addPins=function(){var p=new google.maps.LatLng(a.displayMap.locations[a.displayMap.pinNum].geocode.lat,a.displayMap.locations[a.displayMap.pinNum].geocode.lng),o=new google.maps.Marker({position:p,map:a.displayMap.map,draggable:!1,title:a.displayMap.locations[a.displayMap.pinNum].name,datetime:a.displayMap.locations[a.displayMap.pinNum].datetime,animation:google.maps.Animation.DROP});a.displayMap.pins.push(o),google.maps.event.addListener(o,"click",function(){a.displayMap.flyout.close&&a.displayMap.flyout.close();var p="<a target='new' href='https://www.google.com/maps/place/Sacred+Sanctuary+Conscious+Gift+Store+%26+Spiritual+Center/@39.799686,-105.0814577,17z/data=!4m7!1m4!3m3!1s0x876b862cf19a1775:0x7b55826ce88e884d!2s5626+Olde+Wadsworth+Blvd,+Arvada,+CO+80002!3b1!3m1!1s0x876b862cf183867b:0x96f177d7f7f47b22'>"+o.title+"</a>";p="<h4>"+p+"</h4>",a.displayMap.flyout=new google.maps.InfoWindow({content:p}),a.displayMap.flyout.open(a.displayMap.map,o)}),a.displayMap.pinNum++},$(window).load(function(){a.displayMap.initialize()})}();