
   
//---------------------------------------------------------------------   
   //Forward/Back buttons
    let backLabel = "back";
    let fwdLabel = "forward";
    let fwdStr = bookPart;
    let backStr = bookPart;
    let backDisable = true;
    let fwdDisable = true;

    if (Number.isInteger(Number(bookPart))){ //is it whole number ref (1...2...3)
        let fwdInt = Number(bookPart) + 1;
        let backInt = Number(bookPart) - 1;
        backStr = String(Number(bookPart) - 1);
            if (undefined !== bookRef[backStr]) { //we are not at start of book
                backLabel = '< ' + String(backInt);
                backDisable = false;
            }else{ //there is no further back we can go
                backLabel = 'At beginning';
                backDisable = true;
            }
            fwdStr = String(fwdInt);
            if (undefined !== bookRef[fwdStr]) { //look up the next part of the book in the book.json
                fwdLabel = fwdStr + ' >';
                fwdDisable = false;
            }else{
                fwdLabel = "At end";
                fwdDisable = true;
            }
    }else if (!isNaN(Number(bookPart))){ //its not a whole number  (1.1 ... 1.2 ... 1.3)
        const bookRef = bookPart.split('.');
        const chapStr = bookRef[0];
        const verseStr = bookRef[1];
        let backVerseStr = String(Number(verseStr) - 1);
        if (undefined !== bookRef[backStr]) { //we are not at start of book
            backLabel = '< ' + String(backInt);
            backDisable = false;
        }else{ //if that doesnt work,  we'll change the chapter instead.
            const backChapStr = String(Number(chapStr) - 1);
            backVerseStr= "1"; //go to the beginning
            backStr = backChapStr+'.'+backVerseStr;
            if (undefined !== bookRef[backStr]) { //look up the previous chapter
                backLabel =  + '< '+backStr; //present it if available
                backDisable = false;
            }else{
                backLabel = 'At beginning';
                backDisable = true;
            }
        }
        let fwdVerseStr = String(Number(verseStr) + 1);
        fwdStr = chapStr+'.'+fwdVerseStr;
        if (undefined !== bookRef[fwdStr]) { //look up the next part of the book in the book.json
            fwdLabel = fwdStr + ' >';
            fwdDisable = false;
        }else{ //if that doesnt work,  we'll change the chapter instead.
            const fwdChapStr = String(Number(chapStr) + 1);
            fwdVerseStr = "1"; //go to the beginning
            fwdStr = fwdChapStr+'.'+fwdVerseStr;
            if (undefined !== bookRef[fwdStr]) { //look up the next chapter
                fwdLabel = fwdStr + ' >'; //present it if available
                fwdDisable = false;
            }else{
                fwdLabel = "At end"; //at end if not
                fwdDisable = true;
            }
        }//
    }//else its a word


        //add action row with forward/backbuttons       
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('goBack')
                .setLabel(backLabel)
                .setStyle('SECONDARY')
                .setDisabled(backDisable),

            new MessageButton()
                .setCustomId('goFwd')
                .setLabel(fwdLabel)
                .setDisabled(fwdDisable)
                .setStyle('SECONDARY'),
    );
//------------------------------------------------------------------------------------------------