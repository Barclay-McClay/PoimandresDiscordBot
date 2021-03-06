const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const commandName = 'quran';                                   //<----SET THE command name to be  the same as this file's name.js
const bookRef = require(`./books/${commandName}.json`); 

module.exports = {

	data: new SlashCommandBuilder()
		.setName(commandName)
		.setDescription('Lookup '+ bookRef.bookTitle)
        .addStringOption(option =>
            option.setName('part')
                .setDescription('Surah#.Ayah#')
                .setRequired(true)),
    
	async execute(interaction) {
        let bookPart = interaction.options.getString('part');
        bookPart = bookPart.replace(':','.'); //replace semicolons with periods

        if (undefined !== bookRef[bookPart]) {
             var bodyText =  bookRef[bookPart];
        }else{
            var bodyText =  '**Not found** Try: `/quran 1.1`';
        }
          
    //Add the requested lookup text
    const embed =  new MessageEmbed()
        .setColor('#f15b40')
        .setDescription(bodyText)
        .setFooter({text: bookRef.bookTitle + ' | ' + bookPart + ' | ' + bookRef.translator});
        
		return interaction.reply({ embeds: [embed]}); //return it all to index for passing
	},
};