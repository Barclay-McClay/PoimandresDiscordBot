const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const lib = require('./books/LIBRARY.json');
const commandName = 'contents';

module.exports = {

    //-------------------------------------------------
	data: new SlashCommandBuilder()
		.setName(commandName)                                      //<----SET THE command name to be  the same as this file's name.js
		.setDescription('Get a "contents page" of the available texts'), //this is how discord will describe the command to the user
    
    //-------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------
	async execute(interaction) {

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('contentsSelect')
                .setPlaceholder('Select a text...')
                .addOptions(lib),
        );


    //const embed =  new MessageEmbed()
    //.setColor('#f15b40')
    //.setDescription(bodyText);
    //.setFooter({text: bookRef.bookTitle + ' | ' + bookPart+ ' | ' + bookRef.translator});
                                    //embeds: [embed],

		return interaction.reply({ components: [row], ephemeral: true}); //return it all to index for passing

	},
};