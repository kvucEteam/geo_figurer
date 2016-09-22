

function returnLastStudentSession() {
    window.osc = Object.create(objectStorageClass);
    osc.init('studentSession_6');
    osc.exist('jsonData');

    var TjsonData = osc.load('jsonData');
    console.log('returnLastStudentSession - TjsonData: ' + JSON.stringify(TjsonData));

    // // IMPORTANT: 
    // // In this exercise, the user has to download a word-document in the last step. This is not possible when using Safari - this is why this if-clause has been added.
    // if ((isUseragentSafari()) && (typeof(safariUserHasAgreed) === 'undefined')){

    //     window.safariUserHasAgreed = false;

    //     UserMsgBox("body", '<h4>OBS</h4> <p>Du arbejder på en Mac og bruger browseren Safari. <br> Denne øvelse virker desværre ikke optimalt på Safari-platformen. Du vil ikke kunne downloade de udfyldte felter som wordfil til sidst i øvelsen.</p><br> <p>Brug i stedet <b>Chrome</b> (<a href="https://www.google.dk/chrome/browser/desktop/">Hent den her</a>) eller <b>Firefox</b>  (<a href="https://www.mozilla.org/da/firefox/new/">Hent den her</a>).</p><br> <p>Mvh <a href="https://www.vucdigital.dk">vucdigital.dk</a> </p>');
        
    //     $('#UserMsgBox').addClass('UserMsgBox_safari');
    //     $('.MsgBox_bgr').addClass('MsgBox_bgr_safari');

    //     $( document ).on('click', ".UserMsgBox_safari", function(event){
    //         $(".UserMsgBox_safari").fadeOut(200, function() {
    //             $(this).remove();
    //         });
    //         safariUserHasAgreed = true;
    //         returnLastStudentSession();
    //     });

    //     $( document ).on('click', ".MsgBox_bgr_safari", function(event){
    //         $(".MsgBox_bgr_safari").fadeOut(200, function() {
    //             $(this).remove();
    //         });
    //         safariUserHasAgreed = true;
    //         returnLastStudentSession();
    //     });

    //     return 0;
    // }
    
    if ((TjsonData !== null) && (typeof(TjsonData) !== 'undefined')){
        console.log('returnLastStudentSession - getTimeStamp: ' + osc.getTimeStamp());
    // if (TjsonData !== null){
        var HTML = '';
        HTML += '<h4>OBS</h4> Du har lavet denne øvelse før og indtastet data allerede.';
        HTML += '<div> <span id="objectStorageClass_yes" class="objectStorageClass btn btn-info">Jeg vil fortsætte, hvor jeg slap</span> <span id="objectStorageClass_no" class="objectStorageClass btn btn-info">Jeg vil starte forfra</span> </div>';
        UserMsgBox("body", HTML);

        $('.CloseClass').remove(); // <---- removes the "X" in the UserMsgBox.
        $('.container-fluid').hide();  // Hide all program-content.

        $('#UserMsgBox').unbind('click');
        $('.MsgBox_bgr').unbind('click');

        $( document ).on('click', "#objectStorageClass_yes", function(event){
            console.log("objectStorageClass.init - objectStorageClass_yes - CLICK" );
            $(".MsgBox_bgr").fadeOut(200, function() {
                $(this).remove();
                $('.container-fluid').fadeIn('slow');  // Fade in all program-content.
            });
           
            jsonData = TjsonData;
            // $('#DataInput').html(eval('step_'+TjsonData.currentStep+'_template()'));
            console.log('returnLastStudentSession - jsonData : ' + JSON.stringify(jsonData)); 
            template();
    
        });

        $( document ).on('click', "#objectStorageClass_no", function(event){
            // osc.stopAutoSave('test1');
            console.log("objectStorageClass.init - objectStorageClass_no - CLICK" );
            osc.delete(osc.localStorageObjName);
            $(".MsgBox_bgr").fadeOut(200, function() {
                $(this).remove();
                $('.container-fluid').fadeIn('slow');  // Fade in all program-content.
            });

            // step_0_template();
            template();
        });
    } else {
        // step_0_template();
        template();
    }
}

function template() {
    console.log('template - jsonData: ' + JSON.stringify(jsonData));
    var HTML = '';
    HTML += '<h1>'+jsonData.mainHeader+'</h1>';
    HTML += instruction(jsonData.instruction);
    // HTML += '<span class="PagerContainer"></span>';          // <-------  PAGER
    HTML += '<div class="ctrlBtnContainer">'+initCtrlBtnContainer(jsonData)+'</div>';
    HTML += initCarouselObjs(jsonData);
    $('#DataInput').html(HTML);

    // var pagerObj = Object.create(pagerClass);                // <-------  PAGER
    // pagerObj.init(".PagerContainer", ".carouselPage");       // <-------  PAGER

    initElearningObj(jsonData);
    setEventListeners();
}


function initCtrlBtnContainer(jsonData){
    var HTML = '';
    for (var n in jsonData.slideData){
        HTML += '<div class="diagramBtn btn btn-info">'+jsonData.slideData[n].ctrlBtn+'</div>';
    }
    return HTML;
}


function initCarouselObjs(jsonData){
    window.mco = {};
    var HTML = '';
    for (var n in jsonData.slideData){
        mco[n] = Object.create(carouselClass);
        mco[n].carouselId = 'carouselId_'+String(n);
        mco[n].bsColum = "col-12-center";
        HTML += '<div class="carouselPage">'+mco[n].init(jsonData.slideData[n])+'</div>';
    }
    return HTML;
}


function initElearningObj(jsonData){
    $('.carouselPage').hide();
    var carouselCount = 0;
    var activeCarouselFound = false;
    var activeSlideFound = false;
    for (var n in jsonData.slideData){
        console.log('initElearningObj - n: ' + n);
        if (jsonData.slideData[n].status.active){
            $('.carouselPage').eq(n).show();
            $('.diagramBtn').eq(n).toggleClass('vuc-info-active');
            activeCarouselFound = true;
        }
        var activeSlideFound = false;
        for (var k in jsonData.slideData[n].carouselData.slides){
            console.log('initElearningObj - k: ' + k);
            if (jsonData.slideData[n].carouselData.slides[k].status.active){
                $( '#carouselId_'+String(n)+' .carousel-indicators li' ).eq(k).trigger( "click" );
                activeSlideFound = true;
            }
        }
        if (!activeCarouselFound) {
            $( '#carouselId_'+String(n)+' .carousel-indicators li' ).eq(0).trigger( "click" );
        }
    }
    if (!activeCarouselFound) {
        $('.carouselPage').eq(0).show();
        $('.diagramBtn').eq(0).toggleClass('vuc-info-active');
    }
    insertContentInSlides(jsonData);
}


function setEventListeners(){

    // SAVE: Click on a diagramBtn:
    $( document ).on('click', ".diagramBtn", function(event){
        var index = $(this).index();
        console.log('index: ' + index);
        $('.diagramBtn').removeClass('vuc-info-active');
        $('.diagramBtn').eq(index).addClass('vuc-info-active');
        $('.carouselPage').hide();
        $('.carouselPage').eq(index).fadeIn('slow');
        setAtiveCarousel(index);
        goToAtiveSlide(index);

        osc.save('jsonData', jsonData);
    });

    // SAVE: Click on the carousel-indicators:
    $( document ).on('click', ".carousel-indicators li", function(event){
        var id = $(this).parent().parent().prop('id').replace('carouselId_', '');
        var index = $(this).index();
        console.log('id: ' + id + ', index: ' + index);
        setAtiveSlide(id, index);

        osc.save('jsonData', jsonData); 
    });

    // SAVE: Click on left and right arrows and underlining panel:
    $( document ).on('click', ".carousel-control", function(event){  
        var parentObj = $(this).parent();
        var id = parentObj.prop('id').replace('carouselId_', '');
        var index = $('.carousel-indicators .active', parentObj).index();
        console.log('CLICK - right or left - id: ' + id + ', index: ' + index);
        setAtiveSlide(id, index);

        osc.save('jsonData', jsonData); 
    });

}


function setAtiveCarousel(ativeCarouselNo){
    for (var n in jsonData.slideData){
        jsonData.slideData[n].status.active = (ativeCarouselNo==n)?true:false;
    }
    console.log('setAtiveCarousellate - jsonData: ' + JSON.stringify(jsonData));
}


function setAtiveSlide(ativeCarouselNo, ativeSlideNo){
    for (var k in jsonData.slideData[ativeCarouselNo].carouselData.slides){
        jsonData.slideData[ativeCarouselNo].carouselData.slides[k].status.active = (ativeSlideNo==k)?true:false;
    }
    console.log('setAtiveSlide - jsonData: ' + JSON.stringify(jsonData));
}


// FUNCTION NOT IN USE:
function goToAtiveCarousel(){ 
    for (var n in jsonData.slideData){
        if (jsonData.slideData[n].status.active){
            $('.diagramBtn').removeClass('vuc-info-active');
            $('.diagramBtn').eq(n).addClass('vuc-info-active');
        }
    }
    console.log('setAtiveCarousellate - jsonData: ' + JSON.stringify(jsonData));
}

function goToAtiveSlide(ativeCarouselNo){
    for (var k in jsonData.slideData[ativeCarouselNo].carouselData.slides){
        if (jsonData.slideData[ativeCarouselNo].carouselData.slides[k].status.active){
            $( '#carouselId_'+String(ativeCarouselNo)+' .item' ).removeClass('active'); 
            $( '#carouselId_'+String(ativeCarouselNo)+' .item' ).eq(k).addClass('active');
            $( '#carouselId_'+String(ativeCarouselNo)+' .carousel-indicators li' ).removeClass('active'); 
            $( '#carouselId_'+String(ativeCarouselNo)+' .carousel-indicators li' ).eq(k).addClass('active');
        }
    }
}


function leftColumnMarkup(columnData){
    console.log('leftColumnMarkup - columnData: ' + JSON.stringify(columnData));
    var HTML = '';
    switch (columnData.type) {
        case "img":
            HTML += '<img class="img-responsive" src="' + columnData.src + '" alt="' + columnData.alt + '"/>';
            break;
        case "text":
            HTML += '<div class="TextHolder">' + columnData.text + '</div>';
            break;
        case "video":
            HTML += '<div class="embed-responsive embed-responsive-16by9 col-xs-12 col-md-12">' +
                '<iframe class="embed-responsive-item" src="' + columnData.src + '?rel=0&iv_load_policy=3" allowfullscreen="1"></iframe>' +
                '</div>';
            break;
        default:
            alert('Invalid "type" in leftColumnMarkup');
    }
    return HTML;
}


function rightColumnMarkup(columnData){
    console.log('rightColumnMarkup - columnData: ' + JSON.stringify(columnData));
    var HTML = '';
    switch (columnData.type) {
        case "info":
            HTML += '<div class="TextHolder">' + columnData.info + '</div>';
            break;
        case "quiz":
            HTML += '<div class="quizHolder">' + columnData.quiz + '</div>';
            break;
        default:
            alert('Invalid "type" in rightColumnMarkup');
    }
    return HTML;
}


function insertContentInSlides(jsonData){
    for (var n in jsonData.slideData){
        for (var k in jsonData.slideData[n].carouselData.slides){
            var slideDataObj = jsonData.slideData[n].carouselData.slides[k];
            var slideJQobj = $( '#carouselId_'+String(n)+' .item' ).eq(k);
            console.log('insertContentInSlides - slideJQobj: ' + JSON.stringify(slideJQobj));
            if (typeof(slideDataObj.columnData_content) !== 'undefined') {
                $('.leftColumn', slideJQobj).html(leftColumnMarkup(slideDataObj.columnData_content.leftColumn));
                $('.rightColumn', slideJQobj).html(rightColumnMarkup(slideDataObj.columnData_content.rightColumn));
            }
        }
    }
}


function detectBootstrapBreakpoints(){
    if (typeof(bootstrapBreakpointSize) === 'undefined') {
        console.log('detectBootstrapBreakpoints - bootstrapBreakpointSize defined.');
        window.bootstrapBreakpointSize = null;
        window.bootstrapcolObj = {xs:0,sm:1,md:2,lg:3};
    }

    $(document).ready(function() {
        console.log('detectBootstrapBreakpoints - document.ready.');
        $('body').append('<div id="bootstrapBreakpointWrapper"> <span class="visible-xs-block"> </span> <span class="visible-sm-block"></span> <span class="visible-md-block"> </span> <span class="visible-lg-block"> </span> </div>');
        bootstrapBreakpointSize = $( "#bootstrapBreakpointWrapper>span:visible" ).prop('class').split('-')[1];
        console.log('detectBootstrapBreakpoints - bootstrapBreakpointSize: ' + bootstrapBreakpointSize);
    });

    $(window).on('resize', function () {
        console.log('detectBootstrapBreakpoints - window.resize.');
        bootstrapBreakpointSize = $( "#bootstrapBreakpointWrapper>span:visible" ).prop('class').split('-')[1];
        console.log('detectBootstrapBreakpoints - bootstrapBreakpointSize: ' + bootstrapBreakpointSize + ', typeof(bootstrapBreakpointSize): ' + typeof(bootstrapBreakpointSize));
    });
}


function reduceInputWidth() {
    console.log('reduceInputWidth - CALLED');
    if (bootstrapcolObj[bootstrapBreakpointSize] > bootstrapcolObj['sm']) {
        $('.diagramBtn').addClass('diagramBtn_ekstra');
        console.log('reduceInputWidth - ON');
    } else {
        $('.diagramBtn').removeClass('diagramBtn_ekstra');
        console.log('reduceInputWidth - OFF');
    }
}


//==============================================================================
//          Datatypes for text, images and video
//==============================================================================
// {
//     "type": "img",
//     "src": "img/06_Elna_Statistisk_aarbog_1920_side_27_js.jpg",
//     "alt": "Lokalt billede..."
// }, {
//     "type": "text",
//     "text": "Mødeindkaldelse ledsaget af artikel skrevet af Louis Pio..."
// }, {
//     "type": "video",
//     "src": "https://player.vimeo.com/video/129639593"
// }
// {   
//     "type" : "columnData",
//     "columnData": [
//         {"column":"<b>CASE 1</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"}
//     ]
// }
// {   
//     "type" : "columnData",
//     "columnData": [          <-----------------  It takes 1 to N columns: columns 1 to 3 gets their own columns, 4 columns and up stacks in one column.
//         {"column":"<b>CASE 1</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"}
//     ]
// }
carouselClass = {
    randomSlides: false,
    carouselId : 'questionCarousel',  // 20-09-2016 : This is the only change needed in the carouselClass in shared_functions.js
    bsColum: "col-10-center", // OPTIONS: "col-XX-center", "col-XX". NOTE: XX has to an even number if "center" has to work properly.
    init: function(jsonCarouselData) {
        if (this.randomSlides) {
            jsonCarouselData.carouselData.slides = this.shuffelArray(jsonCarouselData.carouselData.slides);
        }
        this.setEventListeners(jsonCarouselData);
        return this.returnCarouselHtml(jsonCarouselData);;
    },
    returnCarouselHtml: function(jsonCarouselData) {

        var HTML = '';

        var center = (this.bsColum.indexOf('center') !== -1) ? true : false;
        var colMain = parseInt(this.bsColum.split('-')[1]);
        var colSide = Math.round((12 - colMain) / 2);
        console.log("returnCarouselHtml - , center: " + center + ", colMain: " + colMain + ",colSide: " + colSide);

        HTML += (center) ? '<div class="col-md-' + colSide + '"></div>' : '';
        HTML += '<div id="'+this.carouselId+'" class="carousel slide col-xs-12 col-md-' + colMain + '" data-ride="carousel" data-interval="false">' +
            '<ol class="carousel-indicators hidden-xs">' +
            this.returnCarouselIndicators(jsonCarouselData) +
            '</ol>' +
            '<div class="carousel-inner" role="listbox">' +
            this.returnCarouselSlide(jsonCarouselData) +
            '</div>' +
            '<a class="left carousel-control" href="#'+this.carouselId+'" role="button" data-slide="prev">' +
            '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
            '<span class="sr-only">Previous</span>' +
            '</a>' +
            '<a class="right carousel-control" href="#'+this.carouselId+'" role="button" data-slide="next">' +
            '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
            '<span class="sr-only">Next</span>' +
            '</a>' +
            '</div>';
        HTML += (center) ? '<div class="col-md-' + colSide + '"></div>' : '';
        return HTML;
    },


    returnCarouselIndicators: function(jsonCarouselData) {
        var HTML = '';
        for (var i in jsonCarouselData.carouselData.slides) {
            HTML += '<li data-target="#'+this.carouselId+'" data-slide-to="' + i + '"' + ((i == 0) ? ' class="active"' : '') + '></li>';
        };
        console.log("returnCarouselIndicators: " + HTML);

        return HTML;
    },
    returnCarouselSlide: function(jsonCarouselData) {
        console.log("returnCarouselItem2 - jsonCarouselData: " + JSON.stringify(jsonCarouselData));
        var slideData = jsonCarouselData.carouselData.slides;
        console.log("returnCarouselItem2 - slideData: " + slideData.length);
        var HTML = '';

        for (var i = 0; i < slideData.length; i++) {
            HTML += '<div id="slide_' + i + '" class="item' + ((i == 0) ? ' active' : '') + '">';

            HTML += (slideData[i].hasOwnProperty('header')) ? '<h2 class="columnHeading">' + slideData[i].header + '</h2>' : '';

            HTML += this.returnCarouselItem(i, slideData);

            HTML += '</div>';
        }

        console.log("returnCarouselItem2: " + HTML);

        return HTML;
    },
    returnCarouselItem: function(slideNum, slideData) {

        var HTML = '';

        HTML += (slideData[slideNum].hasOwnProperty('overlay')) ? '<div class="carouselOverlay">' + slideData[slideNum].overlay + '</div>' : '';

        HTML += '<div id="question_' + slideNum + '" class="question">'; // <------ ADDED 2/5-2016

        switch (slideData[slideNum].type) {
            case "img":
                HTML += '<img class="img-responsive" src="' + slideData[slideNum].src + '" alt="' + slideData[slideNum].alt + '"/>';
                break;
            case "text":
                HTML += '<div class="TextHolder">' + slideData[slideNum].text + '</div>';
                break;
            case "video":
                HTML += '<div class="embed-responsive embed-responsive-16by9 col-xs-12 col-md-12">' +
                    '<iframe class="embed-responsive-item" src="' + slideData[slideNum].src + '?rel=0&iv_load_policy=3" allowfullscreen="1"></iframe>' +
                    '</div>';
                break;
            // case "columnData":
            //     console.log("SLIDE TEST 1");
            //     for (var j in slideData[slideNum].columnData) {
            //         console.log("SLIDE TEST 2");
            //         var l = slideData[slideNum].columnData.length;
            //         var bsColNum = ((l == 1) ? '12' : ((l == 2) ? '6' : ((l == 3) ? '4' : '12')));
            //         HTML += '<div class="analysis column col-xs-12 col-md-' + bsColNum + '">' + slideData[slideNum].columnData[j].column + '</div>';
            //     }
            //     break;
            case "columnData":
                console.log("SLIDE TEST 1");
                for (var j in slideData[slideNum].columnData) {
                    if (j == 0) {
                        HTML += '<div class="analysis column col-xs-12 col-md-8">' + slideData[slideNum].columnData[j].column + '</div>';
                    }
                    if (j == 1) {
                        HTML += '<div class="analysis column col-xs-12 col-md-4">' + slideData[slideNum].columnData[j].column + '</div>';
                    }
                }
                break;
            default:
                alert('Invalid "type"');
        }

        HTML += '</div>';

        console.log("returnCarouselItem: " + HTML);

        return HTML;
    },
    shuffelArray: function(ItemArray) {
        var NumOfItems = ItemArray.length;
        var NewArray = ItemArray.slice(); // Copy the array...
        var Item2;
        var TempItem1;
        var TempItem2;
        for (var Item1 = 0; Item1 < NumOfItems; Item1++) {
            Item2 = Math.floor(Math.random() * NumOfItems);
            TempItem1 = NewArray[Item1];
            TempItem2 = NewArray[Item2];
            NewArray[Item2] = TempItem1;
            NewArray[Item1] = TempItem2;
        }
        return NewArray;
    },
    setEventListeners: function(jsonCarouselData) {
        $(document).on('click', "#"+this.carouselId+" .item", function(event) {
            console.log('setEventListeners - CLICK - #'+this.carouselId+' .item - index: ' + $(this).prop('id'));

            // document.location.href = jsonCarouselData.carouselData.slides[$(this).index()].slideLink;        // Opens in the same window and tab

            // var win = window.open(jsonCarouselData.carouselData.slides[$(this).index()].slideLink, '_blank'); // Opens in the same window, but a new tab
            // win.focus();
        });
    }
}





//=======================================================================================
//                  Run code
//=======================================================================================


$(window).on('resize', function() {
    reduceInputWidth();  
});

detectBootstrapBreakpoints();

$(document).ready(function() {

    getAjaxData("GET", "json/carouselDataTest3.json", false, "json");
    console.log("jsonData: " + JSON.stringify(jsonData));

    returnLastStudentSession();

    // var cObj = Object.create(carouselClass);
    // cObj.carouselId = 'carouselId';
    // $('#DataInput').html(cObj.init(jsonData));

    // osc.save('jsonData', jsonData);  // <---- OK

});

