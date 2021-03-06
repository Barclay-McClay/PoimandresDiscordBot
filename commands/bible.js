const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const commandName = 'bible';                                   //<----SET THE command name to be  the same as this file's name.js
const bookRef = require(`./books/${commandName}.json`); 

module.exports = {

    //-------------------------------------------------
	data: new SlashCommandBuilder()
		.setName(commandName)                                      //<----SET THE command name to be  the same as this file's name.js
		.setDescription('Lookup '+ bookRef.bookTitle ) //this is how discord will describe the command to the user
        .addStringOption(option =>
            option.setName('book')
                .setDescription('ie. genesis')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('chapterverse')
            .setDescription('ie. 1.1')
            .setRequired(true)),
    //-------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------
	async execute(interaction) {
                                                                 
        let bookPart = interaction.options.getString('book');
        let bookSubPart = interaction.options.getString('chapterverse');
        bookPart = bookPart.toUpperCase();
        bookSubPart = bookSubPart.replace(':','.'); //automatically replaces semicolons with periods (genesis 1:1 and genesis 1.1 are now taken the same way)


        if (undefined !== bookRef[bookPart][bookSubPart]) { //look up the book part in the book.json
             var bodyText =  bookRef[bookPart][bookSubPart]; //dump the response in the body text of the message
        }else{
            var bodyText =  '**Not found**\ntry: `/bible genesis 1.1`'; ////<----CHANGE THE EXAMPLE of what a 'proper' call to this command looks like
        }

    //Add the requested lookup text
    const embed =  new MessageEmbed()
        .setColor('#f15b40')
        .setDescription(bodyText)
        .setFooter({text: bookRef.bookTitle + ' | ' + bookPart + '  '+ bookSubPart});
        
		return interaction.reply({ embeds: [embed]}); //return it all to index for passing
	},
};