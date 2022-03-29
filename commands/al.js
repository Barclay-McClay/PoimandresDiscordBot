const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const bookRef = require('./books/liber-al-legis.json');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('al')
		.setDescription('Lookup '+ bookRef.bookTitle)
        .addStringOption(option =>
            option.setName('part')
                .setDescription('chapter#.line#')
                .setRequired(true)),
    
	async execute(interaction) {
        let bookPart = interaction.options.getString('part');
        bookPart = bookPart.replace(':','.'); //replace semicolons with periods

        if (undefined !== bookRef[bookPart]) {
             var bodyText =  bookRef[bookPart];
        }else{
            var bodyText =  '**Not found**';
        }
          
        const embed =  new MessageEmbed()
        .setColor('#f15b40')
        .setAuthor({name: bookRef.translator})
        .setTitle(bookRef.bookTitle + ' ' + bookPart)
        .setDescription(bodyText)
        .setFooter({text: bookRef.bookTitle+' - '+ bookRef.translator});

		return interaction.reply({embeds: [embed]});
	},
};