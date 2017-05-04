

function returnLastStudentSession() {
    window.osc = Object.create(objectStorageClass);
    osc.init('studentSession_6_NEW');
    osc.exist('jsonData');

    var TjsonData = osc.load('jsonData');
    console.log('returnLastStudentSession - TjsonData: ' + JSON.stringify(TjsonData));

    randomizeJsonDataForCheckboxesAndRadioBtns();

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
            $( ".generalInfo" ).trigger( "click" );  // Open the generalInfo text userMssageBox if you want to start over.
        });
    } else {
        // step_0_template();
        template();
        $( ".generalInfo" ).trigger( "click" );  // Open the generalInfo text userMssageBox if you load the program for the first time.
    }
}


// This function ajusts the position of the bootstrap glyphicon-chevron-left and glyphicon-chevron-right arrows so that they are 
// in the center position of the picture (leftColumn) on all screen-sizes.
function setSliderContolHeight(){

    // var carouselNo = $('.carousel:visible').prop('id').replace('carouselId_','');
    var carouselNo = $('.carousel:visible').prop('id');

    // var slideNo = $('.item:visible').prop('id').replace('slide_','');
    var slideNo = $('.item:visible').prop('id');

    console.log('setSliderContolHeight - detectBootstrapBreakpoints 1');

    if ((typeof(carouselNo)!=='undefined') && (typeof(slideNo)!=='undefined')) {
        carouselNo = carouselNo.replace('carouselId_','');
        slideNo = slideNo.replace('slide_','');

        var carouselNo = $('.carousel:visible').prop('id').replace('carouselId_','');
        var slideNo = $('.item:visible').prop('id').replace('slide_','');
        console.log('setSliderContolHeight - detectBootstrapBreakpoints 2 - carouselNo: ' + carouselNo + ', slideNo: ' + slideNo);

        if (bootstrapcolObj[bootstrapBreakpointSize] < bootstrapcolObj['md']) {
            // var h = $('.leftColumn').height();
            var h = $('#carouselId_'+carouselNo+' #slide_'+slideNo+' .leftColumn').height();
            console.log('setSliderContolHeight - h: ' + h);
            // $('.glyphicon-chevron-left, .glyphicon-chevron-right').css({'display': 'block', 'top': Math.round(h/2)+'px'});
            $('.glyphicon-chevron-left').css({'display': 'block', 'top': Math.round(h/2)+'px'});
            $('.glyphicon-chevron-right').css({'display': 'block', 'top': Math.round(h/2)+'px'});
            // $('.carousel-indicators').css({'position': 'relative', 'top': String(parseInt(h-0))+'px'});
        } else {
            // $('.glyphicon-chevron-left, .glyphicon-chevron-right').css({'display': 'block', 'top': '50%'});
            $('.glyphicon-chevron-left').css({'display': 'block', 'top': '50%'});
            $('.glyphicon-chevron-right').css({'display': 'block', 'top': '50%'});
            var h = $('#carouselId_'+carouselNo+' .carousel-inner').height();
            console.log('setSliderContolHeight - h: ' + h);
            // $('.carousel-indicators').css({'position': 'relative', 'top': String(parseInt(h+10))+'px'});
        }
    } else {  // This else-clause has been placed here to ensure that above condition runs when the DOM is loaded. Problem: the two perameters "carouselNo" and "slideNo" are not "present" before the DOM is fully loaded. 

        // setTimeout(function(){ setSliderContolHeight(); }, 500);
        
    }
}


function template() {

    console.log('template - jsonData: ' + JSON.stringify(jsonData));
    var HTML = '';
    HTML += '<h1>'+jsonData.mainHeader+'</h1>';
    HTML += instruction(jsonData.instruction);
    HTML += explanation(jsonData.explanation);
    HTML += '<div class="Clear"></div>';
    // HTML += '<span class="PagerContainer"></span>';          // <-------  PAGER
    HTML += '<span class="ctrlBtnContainer">'+initCtrlBtnContainer(jsonData)+'</span>';
    HTML += initCarouselObjs(jsonData);
    $('#DataInput').html(HTML);

    $('.ctrlBtnContainer').before('<div class="generalInfo btn btn-info">Generel info</div>');  // Insert general info btn.

    // var pagerObj = Object.create(pagerClass);                // <-------  PAGER
    // pagerObj.init(".PagerContainer", ".carouselPage");       // <-------  PAGER

    initElearningObj(jsonData);
    setEventListeners();

}


function initCtrlBtnContainer(jsonData){  // MARK
    var HTML = '';
    for (var n in jsonData.slideData){
        if (n == 0) {
            // HTML += '<div class="diagramBtn btn btn-info vuc-primary">'+jsonData.slideData[n].ctrlBtn+'</div>';  /* <----- TLY does not want this. 30/9-2016 */
            HTML += '<div class="diagramBtn btn btn-info">'+jsonData.slideData[n].ctrlBtn+'</div>';
        } else {
            HTML += '<div class="diagramBtn btn btn-info">'+jsonData.slideData[n].ctrlBtn+'</div>';
        }
    }
    return HTML;
}


function initCarouselObjs(jsonData){
    window.mco = {};
    var HTML = '';
    for (var n in jsonData.slideData){

        // if (typeof(jsonData.slideData[n].carouselData.text)!=='undefined') {
        //     HTML += '<div class="carouselPage">'+'DummyText'+'</div>';
        // } 


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
    initRadioAndCheckboxes();
    setPreviousCorrectOrWrongAnswers();
}


function setEventListeners(){

    $( document ).on('click', ".generalInfo", function(event){
        UserMsgBox('body', "<h3>Hvad er en figur?</h3><p>En figur er en grafisk fremstilling af data, så det er lettere at overskue en evt. udvikling og sammenhæng.</p><br><p>Den figurtype der vælges til at afbillede data afhænger af tradition, modtageren de er tænkt til og selvfølgelig den figurtype der egner sig bedst til netop den datatype.</p><br><p>Enhederne på en figur skal passe til datas størrelser, så det er muligt at se evt. variationer. Enhederne fortæller også hvad der undersøges f.eks. CO<sub>2</sub>-udledning /indbygger eller CO2-udledning /land eller ved et specifikt land eller verdensdel CO<sub>2</sub>-udledning /år.</p><br><p>Farver på figurer: Der er ikke konventioner på dette område, se derfor altid i signaturforklaringen der knytter sig til figuren.</p><h3>Hvordan anvender man en figur?</h3><p>Når man skal hente viden ud af en figur er det en god idé at gøre det ved at gennemgå punkterne, der er opstillet nedenfor.</p><h4>Overskriften</h4><p>Start altid med overskriften. Den fortæller hvad figuren beskriver.</p><h4>Figurtypen</h4><p>Identificer figurtypen. Den afgør hvordan man aflæser data, og om der er en eller flere variable i spil.</p><h4>Enheder og signaturer</h4><p>Se på hvilke enheder eller signaturer der bruges på figuren. De fortæller hvad der undersøges og skalaen der undersøges i. Signaturer kan være farver men også tegn som veje og søer er signaturer. Fælles for signaturer er, at de er fremhævet, så det netop er dem man skal have fokus på.</p><h4>Indhold - Beskrivelse</h4><p>Identificer og beskriv figurens indhold.  Angiv f.eks. en tendens med konkrete aflæsninger. Dette er det redegørende niveau.</p><h4>Indhold - Forklaring</h4><p>Forklar figurens indhold. Her skal teorien kobles på. Sammenlign, forklar, bedøm og argumenter for hvorfor indholdet ser ud som det gør. Dette er det analyserende niveau.</p>");      // Added 1-12-2016
        // UserMsgBox('body', "<h3>Hvad er en figur?</h3><p>En figur er en grafisk fremstilling af data, så det er lettere at overskue en evt. udvikling og sammenhæng.</p><ul><li>Den figurtype der vælges til at afbillede data afhænger af tradition, modtageren de er tænkt til og selvfølgelig den figurtype der egner sig bedst til netop den datatype.</li><li>Enhederne på en figur skal passe til datas størrelser, så det er muligt at se evt. variationer. </li><li>Enhederne fortæller også hvad der undersøges f.eks. CO<sub>2</sub>-udledning /indbygger eller CO2-udledning /land eller ved et specifikt land eller verdensdel CO<sub>2</sub>-udledning /år.</li><li>Farver på figurer: Der er ikke konventioner på dette område, se derfor altid i signaturforklaringen der knytter sig til figuren.</li></ul><h3>Hvordan anvender man en figur?</h3><p>Når man skal hente viden ud af en figur er det en god idé at gøre det ved at gennemgå punkterne, der er opstillet nedenfor.</p><h4>Overskriften</h4><p>Start altid med overskriften. Den fortæller hvad figuren beskriver.</p><h4>Figurtypen</h4><p>Identificer figurtypen. Den afgør hvordan man aflæser data, og om der er en eller flere variable i spil.</p><h4>Enheder og signaturer</h4><p>Se på hvilke enheder eller signaturer der bruges på figuren. De fortæller hvad der undersøges og skalaen der undersøges i. Signaturer kan være farver men også tegn som veje og søer er signaturer. Fælles for signaturer er, at de er fremhævet, så det netop er dem man skal have fokus på.</p><h4>Indhold - Beskrivelse</h4><p>Identificer og beskriv figurens indhold.  Angiv f.eks. en tendens med konkrete aflæsninger. Dette er det redegørende niveau.</p><h4>Indhold - Forklaring</h4><p>Forklar figurens indhold. Her skal teorien kobles på. Sammenlign, forklar, bedøm og argumenter for hvorfor indholdet ser ud som det gør. Dette er det analyserende niveau.</p>");      // Added 1-12-2016
    });

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
        setSliderContolHeight();

        osc.save('jsonData', jsonData);
    });

    // SAVE: Click on the carousel-indicators:
    $( document ).on('click', ".carousel-indicators li", function(event){
        var id = $(this).parent().parent().prop('id').replace('carouselId_', '');
        var index = $(this).index();
        console.log('id: ' + id + ', index: ' + index);
        setAtiveSlide(id, index);
        setSliderContolHeight();

        osc.save('jsonData', jsonData); 
    });

    // SAVE: Click on left and right arrows and underlining panel:
    $( document ).on('click', ".carousel-control", function(event){  
        var parentObj = $(this).parent();
        var id = parentObj.prop('id').replace('carouselId_', '');
        var index = $('.carousel-indicators .active', parentObj).index();
        console.log('CLICK - right or left - id: ' + id + ', index: ' + index);
        setAtiveSlide(id, index);
        setSliderContolHeight();

        osc.save('jsonData', jsonData); 
    });

    $( document ).on('click', ".CloseClass_new", function(event){
        $(".MsgBox_bgr_new").fadeOut(200, function() {
            $(this).remove();
        });
    });

    
    $( document ).on('click', ".enlargeBtn", function(event){
        console.log('leftColumn - CLICKED');
        var parentObj = $(this).parent();
        var imgUrl = $('> img', parentObj).prop('src');
        var imgAlt = $('> img', parentObj).prop('alt');
        var HTML = '<img class="centerImg img-responsive" src="'+imgUrl+'" alt="'+imgAlt+'">';
        UserMsgBox_mod(HTML, false);
    });


    $( document ).on('click', ".checkAnswer", function(event){
        console.log('checkAnswer - CLICKED');
        var carouselNo = $(this).closest('.carousel').prop('id').replace('carouselId_','');
        var slideNo = $(this).closest('.item').prop('id').replace('slide_','');
        checkAnswer(carouselNo, slideNo);
        saveRadioAndCheckboxValues(carouselNo, slideNo); // <--- NEEDS TO BE TESTED!!!
        setDiagramBtnCorrectOrWrong(carouselNo);

        osc.save('jsonData', jsonData);
    });


    $( document ).on('click', ".giveAnswer", function(event){
        var carouselNo = $(this).closest('.carousel').prop('id').replace('carouselId_','');
        var slideNo = $(this).closest('.item').prop('id').replace('slide_','');
        // checkAnswer(carouselNo, slideNo);
        var text = jsonData.slideData[carouselNo].carouselData.slides[slideNo].columnData_content.rightColumn.quiz.giveAnswer;
        UserMsgBox("body", text);

        osc.save('jsonData', jsonData);
    });
    
}


/**
 * DESCRIPTION: 
 * 
 */  
function UserMsgBox_mod(msg, showStandardYesNoBtns){
    var yesNoBtns = '<div><div class="btn btn-success" id="userMsgBox_yes">Ja</div><div class="btn btn-danger" id="userMsgBox_no">Nej</div></div>';
    UserMsgBox("body", msg+((showStandardYesNoBtns)?yesNoBtns:''));

    $('#UserMsgBox').unbind('click');
    $('.MsgBox_bgr').unbind('click');

    $('.CloseClass').addClass('CloseClass_new').removeClass('CloseClass');
    $('#UserMsgBox').attr('id', 'UserMsgBox_new');
    $('.MsgBox_bgr').addClass('MsgBox_bgr_new').removeClass('MsgBox_bgr');

    // UserMsgBox_callbackOnComplete = function(){  // This callback 
    //     $(".MsgBox_bgr").fadeOut(200, function() {
    //         $(this).remove();
    //         // $('.container-fluid').fadeIn('slow');  // Fade in all program-content.
    //     });
    // }
    
    // callback(UserMsgBox_callbackOnComplete);

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
            // HTML += '<div class="glyphicon glyphicon-search"></div>';
            HTML += '<div class="enlargeBtn btn btn-sm btn-info"><div class="glyphicon glyphicon-search"></div></div>';
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


// "<h3>Befolkningstal på Læsø 1</h3><p> Figuren viser befolkningstallet på Læsø i perioden 2008-2016. Tallene er fra første kvartal de pågældende år. <br><br> <b>Hvad er enheden på y-aksen?</b> <br><br> <input type='radio' name='xxx' value='yyy'> Antal indbyggere<br> <input type='radio' name='xxx' value='yyy'> Årstal<br> <input type='radio' name='xxx' value='yyy'> Antal indbyggere pr. kvadratmeter<br> </p> <span class='btn btn-primary'>TJEK SVAR</span>"
function rightColumnMarkup(columnData){
    console.log('rightColumnMarkup - columnData: ' + JSON.stringify(columnData));
    var HTML = '';
    switch (columnData.type) {
        case "info":
            HTML += '<div class="TextHolder">' + columnData.info + '</div>';
            break;
        case "quiz":
            HTML += '<div class="quizHolder">';
            HTML +=     '<h3>'+columnData.quiz.header+'</h3>';
            HTML +=     '<p>'+columnData.quiz.caption+'</p>';
            HTML +=     '<b>'+columnData.quiz.question+'</b>';
            HTML +=     '<div class="answerWrap">';
            HTML +=         quizMarkup(columnData.quiz);
            HTML +=     '</div>';
            HTML +=     '<br>';
            HTML +=     '<span class="checkAnswer btn btn-primary">TJEK SVAR</span>';
            HTML +=     '<span class="Clear"></span>';
            HTML +=     (typeof(columnData.quiz.giveAnswer)!=='undefined')?'<span class="giveAnswer btn btn-info">SE SVAR</span>':'';
            HTML += '</div>';
            break;
        default:
            alert('Invalid "type" in rightColumnMarkup');
    }
    return HTML;
}


function quizMarkup(quizData){
    console.log('quizMarkup - quizData: ' + JSON.stringify(quizData));
    var HTML = '';
    switch (quizData.type) {
        case "inputfield":
            HTML += '<input class="inputfield" type="text" value="'+quizData.inputfield.value+'" placeholder="'+quizData.inputfield.placeholder+'">';
            break;
        case "radio":
            for (var n in quizData.radio){
                // HTML += '<div class="answerChoice radioWrap"> <input type="radio" name="'+n+'" value="'+n+'">'+quizData.radio[n].text+'</div>';
                HTML += '<div class="answerChoice radioWrap"> <label><input type="radio" name="'+n+'" value="'+n+'">'+quizData.radio[n].text+'</label></div>';
            }
            break;
        case "checkbox":
            for (var n in quizData.checkbox){
                // HTML += '<div class="answerChoice checkboxWrap"> <input type="checkbox" name="'+n+'" value="'+n+'">'+quizData.checkbox[n].text+'</div>';
                HTML += '<div class="answerChoice checkboxWrap"> <label><input type="checkbox" name="'+n+'" value="'+n+'">'+quizData.checkbox[n].text+'</label></div>';
            }
            break;
        default:
            alert('Invalid "type" in quizMarkup');
    }
    return HTML;
}


function initRadioAndCheckboxes(){
    $( ".answerWrap" ).each(function( index, element ) {
        // $('>.answerChoice input', element).attr('name', index);
        $('>.answerChoice label input', element).attr('name', index);
    });
}


function setPreviousCorrectOrWrongAnswers(){
    for (var n in jsonData.slideData){
        var answered1 = jsonData.slideData[n].status.answered;
        console.log('setPreviousCorrectOrWrongAnswers - answered1: ' + answered1);
        // if (typeof(answered1) !== 'undefined') {  // This check is due to the zero'th carousel consisting of info-slides - these does not have an "answered" state.
            if ((typeof(answered1) !== 'undefined') && (answered1!== null)){  // This "undefined" check is due to the zero'th carousel consisting of info-slides - these does not have an "answered" state.
                if (answered1){
                    $('.diagramBtn').eq(n).addClass('vuc-correct'); 
                } else {
                    $('.diagramBtn').eq(n).addClass('vuc-wrong');   // <--------  NOTE (#1): This will not be in effect... - see NOTE (#2) below!
                }
            }
            for (var k in jsonData.slideData[n].carouselData.slides){
                var answered2 = jsonData.slideData[n].carouselData.slides[k].status.answered;
                console.log('setPreviousCorrectOrWrongAnswers - answered2: ' + answered2);
                if (typeof(answered2) !== 'undefined') {  // This check is due to the zero'th carousel consisting of info-slides - these does not have an "answered" state.
                    if (answered2!== null){
                        if (answered2){
                            $('#carouselId_'+n+' .carousel-indicators li').eq(k).addClass('answerCorrect');
                        } else {
                            $('#carouselId_'+n+' .carousel-indicators li').eq(k).addClass('answerWrong');
                        }
                        
                    }
                }
            }  // END FOR
        // }
    }

    for (var n in jsonData.slideData){
        for (var k in jsonData.slideData[n].carouselData.slides){
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            //
            //      NEDENSTÅENDE VIRKER IKKE - DET SÆTTER IKKE TILSTANDEN FOR RADIO OG CKECKBOXE VED START 
            //
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////

            if (typeof(jsonData.slideData[n].carouselData.slides[k].columnData_content)!=='undefined') {           // <--------------   Added 22-11-2016
                var quizObj = jsonData.slideData[n].carouselData.slides[k].columnData_content.rightColumn.quiz;
                console.log('setPreviousCorrectOrWrongAnswers - quizObj: ' + JSON.stringify(quizObj));
            }

            if (typeof(quizObj)!=='undefined'){  // "quiz" is undefined for info-slides..
            
                if (typeof(quizObj.radio)!=='undefined'){
                    for (var s in quizObj.radio){
                        console.log('setPreviousCorrectOrWrongAnswers - radio: ' + JSON.stringify(quizObj.radio[s]));
                        if (quizObj.radio[s].checked){
                            $('#carouselId_'+n+' #slide_'+k+' input').eq(s).prop("checked", true);
                        }
                    }
                }
                
                if (typeof(quizObj.checkbox)!=='undefined'){
                    for (var s in quizObj.checkbox){
                        if (quizObj.checkbox[s].checked){
                            $('#carouselId_'+n+' #slide_'+k+' input').eq(s).prop("checked", true);
                        }
                    }
                }
            }
        }
    }
}


function setDiagramBtnCorrectOrWrong(carouselNo){
    var allSlidesAnswered = true;
    for (var k in jsonData.slideData[carouselNo].carouselData.slides){
        if (k > 0) {  // The zero'th slide is the info-slide, which does not have an "answered" status.
            var answered = jsonData.slideData[carouselNo].carouselData.slides[k].status.answered;
            if (answered!== null){
                if (!answered){
                    allSlidesAnswered = false;
                    break;
                }
            } else {
                allSlidesAnswered = false;
                break;
            }
        }
    }
    if (allSlidesAnswered){
        jsonData.slideData[carouselNo].status.answered = true;
        $('.diagramBtn').eq(carouselNo).addClass('vuc-correct'); 
    } 
    // else {                                                       // <------ NOTE (#2): This works OK, but has been commented out since it looks "strange" that a correct answer to a slide gives a wrong/fail diagramBtn color (e.g. "vuc-wrong"). See NOTE (#1) above!
    //     jsonData.slideData[carouselNo].status.answered = false;
    //     $('.diagramBtn').eq(carouselNo).addClass('vuc-wrong');   
    // }
}


function checkAnswer(carouselNo, slideNo){
    var quizObj = jsonData.slideData[carouselNo].carouselData.slides[slideNo].columnData_content.rightColumn.quiz;
    console.log('checkAnswer - quizObj: ' + JSON.stringify(quizObj));
    switch (quizObj.type) {

        case "inputfield":
            var answerType = quizObj.answerType;
            console.log('checkAnswer - carouselNo: '+carouselNo+', slideNo: '+slideNo+', answerType: '+answerType);

            switch (answerType) {
                
                case "interval":
                    var intervalObj = quizObj.interval;
                    var value = $('#carouselId_'+carouselNo+' #slide_'+slideNo+' .inputfield').val();
                    console.log('checkAnswer - carouselNo: '+carouselNo+', slideNo: '+slideNo+', intervalObj: '+ JSON.stringify(intervalObj)+', value: '+value);
                    value = value.replace(',','.').trim();
                    var regexPatt = /(^-\d+$|^-\d+.\d+$|^\d+$|^\d+.\d+$)/g;  // Test for posetive and negative integers and real numbers, e.g: "x", "-x", "x.y", "-x.y"
                    if (regexPatt.test(value)){
                        value = parseFloat(value);
                        if ((intervalObj.min <= value) && (value <= intervalObj.max)) {
                            actions_answerCorrect(carouselNo, slideNo);
                        } else {
                            actions_answerWrong(carouselNo, slideNo);
                        }
                        quizObj.inputfield.value = value; // Save the value.
                    } else {
                        UserMsgBox('body', '<h4>OBS</h4> <p> Den intastede værdi: "'+value+'" indeholder andre tegn end tal!</p>');
                    }

                break;

                case "strInterval":
                    var strIntervalObj = quizObj.strInterval;
                    var strDataInterval = quizObj.strDataInterval;
                    var value = $('#carouselId_'+carouselNo+' #slide_'+slideNo+' .inputfield').val();
                    console.log('checkAnswer - carouselNo: '+carouselNo+', slideNo: '+slideNo+', strIntervalObj: '+ JSON.stringify(strIntervalObj)+', value: '+value+', strDataInterval: '+strDataInterval);
                    value = value.toLowerCase().trim();
                    var regexPatt = /(^\w+$)/g;  // Test for word chars.
                    if (regexPatt.test(value)){
                        var sdi = arrToObj(jsonData.strDataInterval[strDataInterval]);  // sdi = strDataInterval
                        console.log('checkAnswer - sdi[strIntervalObj.min]: '+sdi[strIntervalObj.min]+' <= sdi[value]: '+sdi[value]+' <= sdi[strIntervalObj.max]: '+sdi[strIntervalObj.max]);
                        console.log('checkAnswer - sdi: ' + JSON.stringify(sdi));
                        if ((sdi[strIntervalObj.min] <= sdi[value]) && (sdi[value] <= sdi[strIntervalObj.max])) {
                            actions_answerCorrect(carouselNo, slideNo);
                        } else {
                            actions_answerWrong(carouselNo, slideNo);
                        }
                        quizObj.inputfield.value = value; // Save the value. 
                    } else {
                        UserMsgBox('body', '<h4>OBS</h4> <p> Den intastede værdi: "'+value+'" indeholder andre tegn end bogstaver!</p>');
                    }
                break;

                case "string":
                    var AnswerString = quizObj.string;
                    var value = $('#carouselId_'+carouselNo+' #slide_'+slideNo+' .inputfield').val();
                    console.log('checkAnswer - carouselNo: '+carouselNo+', slideNo: '+slideNo+', AnswerString: '+ AnswerString+', value: '+value);
                    value = value.toLowerCase().trim();
                    if (value == AnswerString) {
                        actions_answerCorrect(carouselNo, slideNo);
                    } else {
                        actions_answerWrong(carouselNo, slideNo);
                    }
                    quizObj.inputfield.value = value; // Save the value. 
                break;

                case "strArray":
                    var answerStrArray = quizObj.strArray;
                    var value = $('#carouselId_'+carouselNo+' #slide_'+slideNo+' .inputfield').val();
                    console.log('checkAnswer - carouselNo: '+carouselNo+', slideNo: '+slideNo+', answerStrArray: '+ answerStrArray+', value: '+value);
                    value = value.toLowerCase().trim();
                    if (elementInArray(answerStrArray, value)) {
                        actions_answerCorrect(carouselNo, slideNo);
                    } else {
                        actions_answerWrong(carouselNo, slideNo);
                    }
                    quizObj.inputfield.value = value; // Save the value. 
                break;

                default:
                    alert('Invalid "type" in quizMarkup');
            }

            break;

        case "radio":
            var answerNo = quizObj.answer;
            console.log('checkAnswer - carouselNo: '+carouselNo+', slideNo: '+slideNo+', answerNo: '+answerNo);

            if ($('#carouselId_'+carouselNo+' #slide_'+slideNo+' input').eq(answerNo).is(':checked')){
                actions_answerCorrect(carouselNo, slideNo);
            } else {
                actions_answerWrong(carouselNo, slideNo);
            }
            console.log('checkAnswer - status: ' + JSON.stringify(jsonData.slideData[carouselNo].carouselData.slides[slideNo].status));
            break;

        case "checkbox":
            var answerArr = quizObj.answer;
            var answerFound = false;
            var elementArr = [];
            for (var n in quizObj.checkbox){
                if ($('#carouselId_'+carouselNo+' #slide_'+slideNo+' input').eq(n).is(':checked')){
                    elementArr.push(parseInt($('#carouselId_'+carouselNo+' #slide_'+slideNo+' input').eq(n).val()));
                }
            }
            console.log('checkAnswer - answerArr: '+answerArr+', elementArr: '+elementArr);
            if (hasSimilarElements(answerArr, elementArr).similar){
                actions_answerCorrect(carouselNo, slideNo);
            } else {
                actions_answerWrong(carouselNo, slideNo);
            }
            break;
        default:
            alert('Invalid "type" in quizMarkup');
    }
}


function arrToObj(arr){
    var obj = {}; var key;
    for (var n in arr){
        obj[arr[n].toLowerCase()] = parseInt(n);
    }
    return obj;
}
console.log('arrToObj(["a", "b", "c", "d"]): ' + JSON.stringify(arrToObj(["a", "b", "c", "d"])));


function saveRadioAndCheckboxValues(carouselNo, slideNo){   // <------------------------------------------------------- NEEDS TO BE TESTED!!!
    var quizObj = jsonData.slideData[carouselNo].carouselData.slides[slideNo].columnData_content.rightColumn.quiz;
    $('#carouselId_'+carouselNo+' #slide_'+slideNo+' input').each(function( index, element ) {
        if (typeof(quizObj.radio)!=='undefined'){
            if ($(element).is(':checked')){
                quizObj.radio[index].checked = true; // Save the value - "checked" is NOT a property of jsonData to begin with...
            } else {
                quizObj.radio[index].checked = false; // Save the value - "checked" is NOT a property of jsonData to begin with...
            }
        }
        if (typeof(quizObj.checkbox)!=='undefined'){
            if ($(element).is(':checked')){
                quizObj.checkbox[index].checked = true; // Save the value - "checked" is NOT a property of jsonData to begin with...
            } else {
                quizObj.checkbox[index].checked = false; // Save the value - "checked" is NOT a property of jsonData to begin with...
            }
        }
    });
    console.log('saveRadioAndCheckboxValues - quizObj: '+ JSON.stringify(quizObj));
}

/**
 * DESCRIPTION:
 *  This function "tells" if two arrays are similar or not (similar = true/false), and if they are not similar, does "elementArr" contain more, same or less elements
 *  than "answerArr".
 *
 *  similar:
 *      similar = true if "elementArr" contain exactly the same elements as "answerArr", otherwise similar = false.
 *  
 *  sizeDiff:
 *      if sizeDiff < 0, the student has given less answers than requried.
 *      if sizeDiff = 0, the student has given the number of answers as requried.
 *      if sizeDiff > 0, the student has given more answers than requried.
 */  
function hasSimilarElements(answerArr, elementArr){
    console.log('hasSimilarElements - answerArr: '+answerArr+', elementArr: '+elementArr);
    var elemObj = {sizeDiff: null, similar: false};
    elemObj.sizeDiff = elementArr.length - answerArr.length; // , 
    if (elemObj.sizeDiff == 0) {
        answerArr.sort(); 
        elementArr.sort(); 
        for (var n in answerArr){
            if (answerArr[n] !== elementArr[n]){
                return elemObj; // returns similar = false
            }
        }
        elemObj.similar = true;
    }
    return elemObj;  // can return similar = true/false, NOTE: similar = true if sizeDiff = 0
}


function actions_answerCorrect(carouselNo, slideNo){
    jsonData.slideData[carouselNo].carouselData.slides[slideNo].status.answered = true;
    $('#carouselId_'+carouselNo+' .carousel-indicators li').eq(slideNo).removeClass('answerWrong').addClass('answerCorrect');
    var feedbackObj = jsonData.slideData[carouselNo].carouselData.slides[slideNo].columnData_content.rightColumn.quiz.feedback;
    if (typeof(feedbackObj) !== 'undefined') {  // Only if the teachers have supplied specific feedback for this studentanswer, then...
        UserMsgBox("body", '<h3>Du har svaret <span class="label label-success">Korrekt!</span></h3><p>'+feedbackObj.correct+'</p>');
    } else { // ... else give the student the general answer. 
        UserMsgBox("body", '<h3>Du har svaret <span class="label label-success">Korrekt!</span></h3><p>'+jsonData.slideData[carouselNo].carouselData.feedback.correct+'</p>');
    }
}

function actions_answerWrong(carouselNo, slideNo){
    jsonData.slideData[carouselNo].carouselData.slides[slideNo].status.answered = false;
    $('#carouselId_'+carouselNo+' .carousel-indicators li').eq(slideNo).removeClass('answerCorrect').addClass('answerWrong');
    var feedbackObj = jsonData.slideData[carouselNo].carouselData.slides[slideNo].columnData_content.rightColumn.quiz.feedback;
    if (typeof(feedbackObj) !== 'undefined') {  // Only if the teachers have supplied specific feedback for this specific studentanswer, then...

        // UserMsgBox("body", '<h3>Du har svaret <span class="label label-danger">Forkert!</span></h3><p>'+feedbackObj.wrong+'</p>');  // <---------  COMMENTED OUT 21-11-2016
        
        if (Array.isArray(feedbackObj.wrong)){  // If an array of feedback posibilities is present, then...   // <---------  ADDED 21-11-2016
            var ansIndex = null;
            $( '#carouselId_'+carouselNo+' #slide_'+slideNo+' input' ).each(function( index, element ) {
                if ($(element).is(':checked')){
                    ansIndex = index;
                }
            });
            
            UserMsgBox("body", '<h3>Du har svaret <span class="label label-danger">Forkert!</span></h3><p>'+feedbackObj.wrong[ansIndex]+'</p>');
        } else {
            UserMsgBox("body", '<h3>Du har svaret <span class="label label-danger">Forkert!</span></h3><p>'+feedbackObj.wrong+'</p>');
        }
    } else { // ... else give the student the general answer. 
        UserMsgBox("body", '<h3>Du har svaret <span class="label label-danger">Forkert!</span></h3><p>'+jsonData.slideData[carouselNo].carouselData.feedback.wrong+'</p>');
    }
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
        $('.diagramBtn, .generalInfo').addClass('diagramBtn_ekstra');
        console.log('reduceInputWidth - ON');
    } else {
        $('.diagramBtn, .generalInfo').removeClass('diagramBtn_ekstra');
        console.log('reduceInputWidth - OFF');
    }
}


function elementInArray(tArray, element){
    for (x in tArray){
        if (tArray[x] == element) return true 
    }
    return false;
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
                        HTML += '<div class="analysis column col-xs-12 col-md-8 columnLeft">' + slideData[slideNum].columnData[j].column + '</div>';
                    }
                    if (j == 1) {
                        HTML += '<div class="analysis column col-xs-12 col-md-4 columnRight">' + slideData[slideNum].columnData[j].column + '</div>';
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



function shuffelArray (ItemArray) {
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
}


function randomizeJsonDataForCheckboxesAndRadioBtns(){
    // console.log("randomizeJsonDataForCheckboxesAndRadioBtns - jsonData: " + JSON.stringify(jsonData));
    for (var k in jsonData.slideData) {
        for (var m in jsonData.slideData[k].carouselData.slides) {
            if (jsonData.slideData[k].carouselData.slides[m].columnData_content.rightColumn.type == 'quiz'){
                var quiz = jsonData.slideData[k].carouselData.slides[m].columnData_content.rightColumn.quiz;
                if (quiz.type == 'radio'){
                    console.log("randomizeJsonDataForCheckboxesAndRadioBtns - quiz 1 - question: " + quiz.question + ", quiz: " + JSON.stringify(quiz));
                    var qArr = [];
                    for (var s in quiz.radio){
                        qArr.push({index: s, text: quiz.radio[s].text});
                    }
                    var randArr = shuffelArray(qArr);
                    for (var s in randArr){
                        quiz.radio[s].text = randArr[s].text;
                        if (parseInt(randArr[s].index) == quiz.answer) {
                            quiz.answer = parseInt(s);
                        }
                    }
                    console.log("randomizeJsonDataForCheckboxesAndRadioBtns - quiz 2 - question: " + quiz.question + ", quiz: " + JSON.stringify(quiz));
                }
                if (quiz.type == 'checkbox'){

                }
            }
        }
    }
}



//=============================================================================================================================
//      VERSIONERING: tilføjet d. 4/5-2017
//      
//      Opgave: "Beskær JSON data på baggrund af URL variable/kommandoer, således at Ida Maria Kloster
//=============================================================================================================================


function ReturnURLPerameters(UlrVarObj){
    var UrlVarStr = window.location.search.substring(1);
    console.log("ReturnURLPerameters - UrlVarStr: " + UrlVarStr);
    var UrlVarPairArray = decodeURIComponent(UrlVarStr).split("&");  // decodeURIComponent handles %26" for the char "&" AND "%3D" for the char "=".
    console.log("ReturnURLPerameters - UrlVarPairArray: " + UrlVarPairArray);
    for (var i in UrlVarPairArray){
        var UrlVarSubPairArray = UrlVarPairArray[i].split("=");  // & = %3D
        if (UrlVarSubPairArray.length == 2){
            UlrVarObj[UrlVarSubPairArray[0]] = UrlVarSubPairArray[1];
        }
    }
    console.log("ReturnURLPerameters - UlrVarObj: " + JSON.stringify( UlrVarObj ));
    return UlrVarObj;
}


var UlrVarObj = {};   // Define UlrVarObj
UlrVarObj = ReturnURLPerameters(UlrVarObj);  // Get URL file perameter. 


// DESCRIPTION:
// ============
// This function "acts" based on two INDEPENDANT URL-variables: "slides" and "startSlide" - e.g. "slides" and "startSlide" can be given in the URL either together or individually 
//
//      slides: The URL-variable "slides" defines an array that holds the indexes of the slides of the ORIGINAL JSON data. It determines which sides from the original JSON data that goes into 
//      the e-learning object when it loades AND the order. E.g. slides=[0,1,2,3] takes the first 4 slides while slides=[3,0,1,2] takes the same 4 slides but also redefines the order of the slides.
//
//      startSlide: The URL-variable "startSlide" defines which slide will be the defalut loaded slide. If "startSlide" is not defined in the URL, then the first slide will be the first index in 
//      the URL-variable "slides". E.g: 
//              geo_figurer/figurer.html?slides=[3,2,4]&startSlide=2 
//      loades slide 3,2 and 4 in that order and sets defalut loaded slide as silde 2. The following
//              geo_figurer/figurer.html?startSlide=2 
//      takes the entire original JSON data set at set slide 2 as the default load slide.
function ajustNumOfSlidesByUrl(UlrVarObj) {
    console.log("ajustNumOfSlidesByUrl - UlrVarObj: " + JSON.stringify( UlrVarObj ));

    var urlSlideArr = [];
    var urlSlideArr_defined = false;

    if (UlrVarObj.hasOwnProperty('slides')) {
        console.log("ajustNumOfSlidesByUrl - A0 ");
        urlSlideArr = JSON.parse(UlrVarObj.slides);
        if (Array.isArray(urlSlideArr)) {
            console.log("ajustNumOfSlidesByUrl - A1 ");
            var newSlideData = [];
            // for (var n in jsonData.slideData) {
            for (var n in urlSlideArr) {
                console.log("ajustNumOfSlidesByUrl - n: " + n);
                if ((0 <= urlSlideArr[n]) && (urlSlideArr[n] < jsonData.slideData.length)) {
                    console.log("ajustNumOfSlidesByUrl - A2 ");
                    newSlideData.push(jsonData.slideData[urlSlideArr[n]]);
                }
            }
            jsonData.slideData = newSlideData;
            urlSlideArr_defined = true;
        }
    }

    if ((UlrVarObj.hasOwnProperty('startSlide')) ) {
        console.log("ajustNumOfSlidesByUrl - A3 ");

        if ((urlSlideArr_defined) && (elementInArray(urlSlideArr, UlrVarObj.startSlide))) {  // parseInt(UlrVarObj.startSlide)
            // jsonData.slideData[Object.keys(urlSlideArr)[UlrVarObj.startSlide]].status.active = true;
            console.log("ajustNumOfSlidesByUrl - A4 ");
            for (var n in urlSlideArr) {
                if (urlSlideArr[n] == UlrVarObj.startSlide) {
                    console.log("ajustNumOfSlidesByUrl - A5 ");
                    jsonData.slideData[n].status.active = true;
                }
            }
        } else {
            console.log("ajustNumOfSlidesByUrl - A6 ");
            jsonData.slideData[UlrVarObj.startSlide].status.active = true;
        }
    }
}


//=======================================================================================
//                  Run code
//=======================================================================================


$(window).on('resize', function() {
    reduceInputWidth();  

    setSliderContolHeight();
});


detectBootstrapBreakpoints();



$(document).ready(function() {
    console.log("document.ready - detectBootstrapBreakpoints ");


    // getAjaxData("GET", "json/carouselDataTest5.json", false, "json");        //  Commented out 22-11-2016
    getAjaxData("GET", "json/carouselData_quiz.json", false, "json");           //  Added 22-11-2016
    // getAjaxData("GET", "json/carouselDataTest_4_small.json", false, "json");
    console.log("jsonData: " + JSON.stringify(jsonData));

    ajustNumOfSlidesByUrl(UlrVarObj);

    returnLastStudentSession();

    // $('.ctrlBtnContainer').before('<div class="generalInfo btn btn-info">Generel info XXX</div>');

    setSliderContolHeight();

    // var cObj = Object.create(carouselClass);
    // cObj.carouselId = 'carouselId';
    // $('#DataInput').html(cObj.init(jsonData));

    // osc.save('jsonData', jsonData);  // <---- OK


});


// $( window ).load(function() {
//   setSliderContolHeight();
// });
