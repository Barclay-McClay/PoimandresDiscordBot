const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const commandName = 'sepher-yetzirah';                                   //<----SET THE command name to be  the same as this file's name.js
const bookRef = require(`./books/${commandName}.json`); 

module.exports = {

    //-------------------------------------------------
	data: new SlashCommandBuilder()
		.setName(commandName)                                      //<----SET THE command name to be  the same as this file's name.js
		.setDescription('Lookup '+ bookRef.bookTitle) //this is how discord will describe the command to the user
        .addStringOption(option =>
            option.setName('part')
                .setDescription('chapter#.line#')                   //<----SET THE DESCRIPTION (How is the book divided?)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('path')
                .setDescription('(optional) 1-32')
                .setRequired(false)),
    
    //-------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------
	async execute(interaction) {

        let bookPart = interaction.options.getString('part');
        let bookSubPart = interaction.options.getString('path');
        bookPart = bookPart.replace(':','.'); //automatically replaces semicolons with periods (genesis 1:1 and genesis 1.1 are now taken the same way)

        if (bookPart === "path"){
            if (undefined !== bookRef[bookPart][bookSubPart]) { //look up the book part in the book.json
                var bodyText =  bookRef[bookPart][bookSubPart]; //dump the response in the body text of the message
           }else{
                var bodyText =  '**Not found**\ntry: `/sepher-yetzirah  1.1`\nor: `/sepher-yetzirah path 1`'; 
           }
        }else if (undefined !== bookRef[bookPart]) { //look up the book part in the book.json
             var bodyText =  bookRef[bookPart]; //dump the response in the body text of the message
        }else{
            var bodyText =  '**Not found**\ntry: `/sepher-yetzirah  1.1`\nor: `/sepher-yetzirah path 1`'; ////<----CHANGE THE EXAMPLE of what a 'proper' call to this command looks like
        }

    //Add the requested lookup text
    const embed =  new MessageEmbed()
        .setColor('#f15b40')
        .setDescription(bodyText)
        .setFooter({text: bookRef.bookTitle + ' | ' + bookPart + ' ' + bookSubPart+' | ' + bookRef.translator});
        
		return interaction.reply({ embeds: [embed]}); //return it all to index for passing
	},
};