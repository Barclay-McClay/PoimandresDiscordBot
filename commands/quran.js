const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const bookRef = require('./books/sahih-quran.json');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('quran')
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
            var bodyText =  '**Not found**';
        }
          
        embed =  new MessageEmbed()
        .setColor('#f15b40')
        .setAuthor({name: bookRef.translator})
        .setTitle(bookRef.bookTitle + ' ' + bookPart)
        .setDescription(bodyText)
        .setFooter({text: bookRef.bookTitle+' - '+ bookRef.translator});

		return interaction.reply({embeds: [embed]});
	},
};