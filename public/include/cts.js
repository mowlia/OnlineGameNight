const CTS={
    SAMPLE:{
        STATE:{
            CANCELLED:-4,
            FAILED_DUPLICATE : -3,
            FAILED_DISPATCH : -2,
            FAILED_EMAIL: -1,
            CREATED: 0,
            SENT :1,
            VERIFIED :2,
            DISPATCHED :3
        }
    },
    USER: {
        BACKEND:{
            ADMIN_MACHINE_SEE:2,
            ADMIN_SUPER:1,
            ADMIN_REGULAR:0
        }
    },

    PROMO : {
        STATUS :{
            VOID : -1,
            READY : 0,
            USED : 1,
        }
    },
    
    AISLE : {
        STATUS :{
            JUST_MADE : -0x02,
            NOT_SYNCED: -0x01,
            NORMAL : 0x00,
            OUT_OF_STOCK: 0x01,
            DONT_EXIST:0x02,
            PAUSE:0x03
        }
    },

    SELLING : {
        STATUS :{
            CANCELLED_CANT_PAY : -8,
            CANCELLED_FROM_VMC : -7,
            TIME_OUT : -6,
            CANT_PAY : -5,    
            CANCELLED : -4,
            PRODUCT_IN_LIFT: -3,
            TEST : -2,
            ERR : -1,
            STARTING: 0,
            AISLE_IS_NORMAL : 1,
            CARD_READ : 2,
            DISPENSING : 3,
            DISPENSED : 4,
            DONE : 5
        }
    },

    COMMAND : {
        STATUS :{
            STARTING: 0,
            SEEN : 1,
            DONE : 2,
            RESET : 3,
            ERR : 10
        },
        NAME:{
            PING: 0,
            RESET_APP:1,
            RESET_ANDROID:2,
            UPDATE_APK:3,
            UPDATE_HOME : 4
        }
    },

    MACHINE : {
        STATUS :{
            OUT_OF_SERVICE: -1,
            STARTING: 0,
            ONLINE : 1,
            VMC_CONNECTING : 2,
            VMC_SETTING_PRICE : 3,
            VMC_READY : 4
        },
        CURRENCY:{
            CAD:0,
            USD:1
        },
        TYPE:{
            TEST_TABLET:0,
            HEALTHBOT:1,
            SMOKEBOT:2
        }
    },

    ACTION : {
        PAGE : {
            AD : 0,
            MAIN : 1,
            CATEGORY : 2,
            PRODUCT : 3,
            SELL : 4,
            HELP_PAY : 5,
            SETTINGS : 6,
            PASS : 7,
        }
    },

    COLOR : {
        PALETTE:['#F65D6C ',
        '#FEA261 ',
        '#3D9F92 ',
        '#68D451 ',
        '#FCAEB5 ',
        '#FFD1B0 ',
        '#98DDD3 ',
        '#B2F0A6 ',
        '#F9828D ',
        '#FFB785 ',
        '#63BFB2 ',
        '#259081 ',
        '#4ABF31 ',
        '#B91828 ',
        '#BF5E19 ',
        '#10786A ',
        '#2DA015 ']
    }

    
}

function addInPlace(arrayMain, data){
    if (arrayMain.length==0 || arrayMain[arrayMain.length-1].score>data.score || Number.isNaN(data.score)) // If the first element or smaller that smallest
        arrayMain.push(data)
    else{
        for (i=0;i<arrayMain.length;i++){
            if (data.score > arrayMain[i].score || Number.isNaN(arrayMain[i].score)){
                arrayMain.splice(i,0,data)
                break
            }
        }
    }
    return arrayMain;
}



function calcProductScore(productData){
    const weights = {number:20,margin:10,profit:1}
    score = 0 ;
    number_of_sales = 0;
    price_average = 0;
    productData.sales.forEach(sale => {
        if (sale.price>=100){ //Get rid of test transctions (less than a dollar)
            score += weights.number 
            +        weights.profit * (sale.price - productData.price_purchase)
            +        weights.margin * ((sale.price - productData.price_purchase) / sale.price) 

            price_average += sale.price;
            number_of_sales++

        }
    })
    productData.number_of_sales = number_of_sales;
    productData.price_average = price_average / number_of_sales;
    productData.score = score;
}


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};



function makeRandomPromo(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
 }

 function overlayLoading(start,duration){
    mainLoadingOverlay = document.querySelector('#main_loading_overlay');
    mainLoadingOverlay.style.transitionDuration = duration;
    if (start){
    
        mainLoadingOverlay.style.opacity = 1;
        mainLoadingOverlay.style.visibility = "visible";

    } else{
    
        mainLoadingOverlay.style.opacity = 0.1;
        mainLoadingOverlay.style.visibility = "hidden";
    }
 }