const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const bookRef = require('./books/emeraldtablet.json');            //<----CHANGE THE BOOK REF

module.exports = {

    //-------------------------------------------------
	data: new SlashCommandBuilder()
		.setName('emeraldtablet')                                      //<----SET THE command name to be  the same as this file's name.js
		.setDescription('Lookup '+ bookRef.bookTitle),                   //this is how discord will describe the command to the user

    //-------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------
	async execute(interaction) {
        var bodyText =  bookRef.message;
    //Add the requested lookup text
    const embed =  new MessageEmbed()
        .setColor('#f15b40')
        .setDescription(bodyText)
        .setFooter({text: bookRef.bookTitle + ' | ' + "12th Century Latin Version"});

		return interaction.reply({ embeds: [embed]}); //return it all to index for passing


	},
};