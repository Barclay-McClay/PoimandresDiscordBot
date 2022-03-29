const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const bookRef = require('./books/mead-ch.json');            //<----CHANGE THE BOOK REF

module.exports = {

    //-------------------------------------------------
	data: new SlashCommandBuilder()
		.setName('ch')                                      //<----SET THE command name to be  the same as this file's name.js
		.setDescription('Lookup '+ bookRef.bookTitle) //this is how discord will describe the command to the user
        .addStringOption(option =>
            option.setName('part')
                .setDescription('book#.verse#')                   //<----SET THE DESCRIPTION (How is the book divided?)
                .setRequired(true)),
    
    //-------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------
	async execute(interaction) {

        let bookPart = interaction.options.getString('part');
        bookPart = bookPart.replace(':','.'); //automatically replaces semicolons with periods (genesis 1:1 and genesis 1.1 are now taken the same way)

        if (undefined !== bookRef[bookPart]) { //look up the book part in the book.json
             var bodyText =  bookRef[bookPart]; //dump the response in the body text of the message
        }else{
            var bodyText =  '**Not found**\ntry: `/ch  1.2`'; ////<----CHANGE THE EXAMPLE of what a 'proper' call to this command looks like
        }

     //Forward/Back labels======
     let backLabel = '';
     let fwdLabel = '';
 
        if (Number.isInteger(Number(bookPart))) { //is it whole number ref (1...2...3)
         let fwdInt = Number(bookPart) + 1;
         let backInt = Number(bookPart) - 1;
         backLabel = String(Number(bookPart) - 1);
             if ((undefined !== bookRef[backLabel])&&(Number(backLabel) > 0)) { //we are not at start of book
                 backLabel = '< ' + String(backInt);
             }else{
                 backLabel = '|';
             }
             fwdLabel = String(fwdInt);
             if (undefined !== bookRef[fwdLabel]) { //look up the next part of the book in the book.json
                 fwdLabel = fwdLabel + ' >';
             }else{
                 fwdLabel = '|';
             }
        }else if (!isNaN(Number(bookPart))){ //its not a whole number  (1.1 ... 1.2 ... 1.3)
        
            const bookRef = bookPart.split('.');
            const chapStr = bookRef[0];
            const verseStr = bookRef[1];
            let backVerseStr = String((Number(verseStr) - 1));
            backLabel = chapStr+'.'+backVerseStr;
            console.log('is number, chap: '+chapStr+', verse: '+verseStr+'// backLabel: '+backLabel);
            if (undefined !== bookRef[backLabel]) { //we are not at end of book
             backLabel = '< ' + backLabel;
             console.log('is number, chap: '+chapStr+', verse: '+verseStr+'// NOT END backLabel: '+backLabel);
            }else{ //if that doesnt work,  we'll change the chapter instead.
                const backChapStr = String(Number(chapStr) - 1);
                backVerseStr= "1"; //go to the beginning
                backLabel = chapStr+'.'+backVerseStr;
                console.log('is number, chap: '+chapStr+', verse: '+verseStr+'//RESTART backLabel: '+backLabel);
                if (undefined !== bookRef[backLabel]) { //look up the previous chapter
                    backLabel =  '< '+backLabel; //present it if available
                }else{
                    backLabel = '';
                }
            }
            let fwdVerseStr = String((Number(verseStr) + 1));
            fwdLabel = chapStr+'.'+fwdVerseStr;
            if (undefined !== bookRef[fwdLabel]) { //look up the next part of the book in the book.json
                fwdLabel = fwdLabel + ' >';
            }else{ //if that doesnt work,  we'll change the chapter instead.
                const fwdChapStr = String(Number(chapStr) + 1);
                fwdVerseStr = "1"; //go to the beginning
                fwdLabel = fwdChapStr+'.'+fwdVerseStr;
                if (undefined !== bookRef[fwdLabel]) { //look up the next chapter
                    fwdLabel = fwdLabel + ' >'; //present it if available
                }else{
                    fwdLabel = '';
                }
            }//
        }else{//else its a word
      backLabel = bookPart;
     }//

    //Add the requested lookup text
    const embed =  new MessageEmbed()
        .setColor('#f15b40')
        .setAuthor({name: bookRef.translator})
        .setTitle(bookRef.bookTitle + ' ' + bookPart)
        .setDescription(bodyText)
        .setFooter({text: backLabel + '  <'+bookPart+'>  '+ fwdLabel+ ' | '+bookRef.bookTitle});
        
		return interaction.reply({ embeds: [embed]}); //return it all to index for passing
	},
};