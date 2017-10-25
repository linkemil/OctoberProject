
//You use 'one' to onl;y use this event once !!!!
//When the page is init !
$(document).one('pageinit', function(){
   
    showNotes();

    //Add handlern 
    $('#submitNote').on('tap', addNotes);

    //Edit handlern 
    $('#submitEditNote').on('tap', editNote);

    //Edit handler
    $('#note_List').on('tap','#editLink', setCurrentVals);

    //Delete handler
    $('#deleteNote').on('tap', deleteNote);

    /*
    * Get notes object 
    */
    function getNotesObject(){
        
        //Set runs array
        var tdnotes = new Array();

        //Get current runs from local storage
        var currentNotes = localStorage.getItem('tdnotes');

        //Checking the local storage
        if (currentNotes != null){

            //Set to runs
            var tdnotes = JSON.parse(currentNotes);
        }

        //Returns sorted object by data, the code bellow has to be done in order to sort by DATE 
        //This works, to test leave a minute after each post and then check the order !!!"!!"
        return tdnotes.sort(function(a,b) {return new Date(b.noteTime) - new Date(a.noteTime)});   
    }

    /*
    * Add notes function 
    */
    function addNotes(){
        
        //grabbing the values from form
        var noteDescription = $('#noteDescription').val();
        var noteText = $('#addNote').val();
        var currentdate = new Date(); 
        var noteDate = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() 
                
        var noteTime = currentdate.getHours() + ":" + currentdate.getMinutes()

        //Creating an object called note, and assigning its attriubtes
        var note = {
            noteDescription: noteDescription,
            noteText: noteText,
            noteDate: noteDate,
            noteTime: noteTime
            

        };

        var tdnotes = getNotesObject();

        //Add new run to runs array 
        tdnotes.push(note);

        //Stringef object to local storage (saving Json in to localstorage)
        localStorage.setItem('tdnotes', JSON.stringify(tdnotes));

        //Redriecting to index page 
        window.location.href = "index.html";

        return false;
    
    }
    

    /*
    * Show runs  
    */
    function showNotes(){
        var tdnotes = getNotesObject();

        if (tdnotes != '' && tdnotes != null ){

            for(var i=0; i<tdnotes.length; i++){
                
                $('#note_List').append('<li class="ui-body-inherit"><a href="#EditNotePage" id="editLink" data-1="'+ tdnotes[i]['noteDescription']+'" data-2="'+tdnotes[i]['noteText']+'" data-3="'+tdnotes[i]['noteTime']+'" data-4="'+tdnotes[i]['noteDate']+'"><h3>'+ tdnotes[i]['noteDescription']+'</h3>'+
                '<p>'+ tdnotes[i]['noteText'] +'</p> <p class="ui-li-aside">'+ tdnotes[i]['noteDate'] + " @ " + tdnotes[i]['noteTime'] +'</p></a></li>').listview('refresh');

            }

            //binding the home page (updating the listview)
            $('#home').bind('pageinit', function(){
                //This will updated the listview
                $('#note_List').listview('refresh');
            });

        }   
    
    }

    /*
    *   Setting current clicked note to be able to edit it
    */
    function setCurrentVals(){
        //Set local storage item
        localStorage.setItem('currentNoteDescription', $(this).data('1'));
        localStorage.setItem('currentNoteText', $(this).data('2'));
        localStorage.setItem('currentNoteTime', $(this).data('3'));
        localStorage.setItem('currentNoteDate', $(this).data('4'));
        

        //Populate the editPage with the selected date and miles
        $('#noteDescriptionEdit').val(localStorage.getItem('currentNoteDescription'));
        $('#noteEdit').val(localStorage.getItem('currentNoteText'));

    }

    function deleteNote (){
        var procceed = confirm("Are you sure?");
        if(procceed){


            //getting the currently selected note values 
            var currentNoteDescription = $('#noteDescriptionEdit').val();
            var currentNoteText = $('#noteEdit').val();

            //Getting all notes from the object 
            var tdnotes = getNotesObject();

            //looping through all notes in the object to find the selected one 
            for(var i=0; i<tdnotes.length; i++){
                if(tdnotes[i].noteDescription == currentNoteDescription && 
                    tdnotes[i].noteText == currentNoteText){

                    //Removing that object (find out how splice WORKS !!!)
                    tdnotes.splice(i, 1);



                }

                localStorage.setItem('tdnotes', JSON.stringify(tdnotes));


            }
            getNotesObject();
            //Redriecting to index page 
            window.location.href = "index.html";

            return false;
        }
        else
        {
            return false;
        }
    }


    /*
    * Delete note
    */

    /*
    *   Edit runs
    */
    function editNote(){
        //Get current data
        currentNoteDescription = localStorage.getItem('currentNoteDescription');
        currentNoteText = localStorage.getItem('currentNoteText');
        currentNoteTime = localStorage.getItem('currentNoteTime');
        currentNoteDate = localStorage.getItem('currentNoteDate');

        var tdnotes = getNotesObject();

        //Loop trhough all current runs 
        for (var i =0; i<tdnotes.length; i++){

            if(tdnotes[i].noteDescription == currentNoteDescription && tdnotes[i].noteText == currentNoteText && tdnotes[i].noteTime == currentNoteTime && tdnotes[i].noteDate == currentNoteDate){
                
                tdnotes.splice(i, 1);
            }

            localStorage.setItem('tdnotes', JSON.stringify(tdnotes));
        }

        //grabbing the values from form
        var noteDescription = $('#noteDescriptionEdit').val();
        var noteText = $('#noteEdit').val();
        var currentdate = new Date(); 
        var noteDate = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() 
                
        var noteTime = currentdate.getHours() + ":" + currentdate.getMinutes()

        //Creating an object called run, and assigning its attriubtes
        var update_notes = {
            noteDescription: noteDescription,
            noteText: noteText,
            noteDate: noteDate,
            noteTime: noteTime
        };

        

        //Add new run to runs array 
        tdnotes.push(update_notes);

        //Stringef object to local storage (saving Json in to localstorage)
        localStorage.setItem('tdnotes', JSON.stringify(tdnotes));

        //Redriecting to index page 
        window.location.href = "index.html";

        return false;

    }

    
});


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
