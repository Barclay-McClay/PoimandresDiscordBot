const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('node:fs');

module.exports = {

    //-------------------------------------------------
	data: new SlashCommandBuilder()
		.setName('help')                                      //<----SET THE command name to be  the same as this file's name.js
		.setDescription('List the texts Poimandres can access'),                   //this is how discord will describe the command to the user

    //-------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------
	async execute(interaction) {
    const embed =  new MessageEmbed()
    .setColor('#f15b40')
    .setDescription('The Poimandres Discord bot quotes a variety of texts themed around religion, the occult, and the esoteric.\nYou can access them with the following slash commands:')
    .addFields(
    
    { name: '\u200B', value: "**Hermetic Texts:**" },
    { name: '`/ch`', value: 'The Corpus Hermeticum\nfrom `1.1` to `18.16`\nTaken from *Thrice-Greatest Hermes Vol. 2*\nTranslated by G.R.S Mead (1906)', inline: true },
    { name: '`/ah`', value: 'Asclepius\nfrom `1` to `42`\nTaken from *Thrice-Greatest Hermes Vol. 2*\nTranslated by G.R.S Mead (1906)', inline: true  },
    { name: '`/emeraldtablet`', value: 'The Emerald Tablet\n*12th Century Latin version*\nTranslated by Steele and Singer (1928)', inline: true },

    { name: '\u200B', value: '**Other Religious/Occult/Esoteric Texts:**'},
    { name: '`/quran`', value: "The Qur'an\nfrom `1.1` to `114.6`\nTranslated by Sahih International", inline: true },
    { name: '`/bible`', value: 'The Bible\nfrom `genesis 1.1` to `revelation 22.21`\nKing James Version', inline: true },
    { name: '`/sepher-yetzirah`', value: 'Sepher Yetzirah\nfrom `1.1` to `6.4`\n*or* `/sepher-yetzirah path` from `1` to `32`\nTranslated by W.W. Wescott (1887)', inline: true },
    { name: '`/al`', value: 'Liber AL vel Legis or, *The Book of the Law*\nfrom `1.1` to `3.75`\nBook by Aiwass, Aleister Crowley, and Rose Edith Kelly (1904)', inline: true },
    { name: '`/enchiridion`', value: "Epictetus' Enchiridion\nfrom `1` to `51`\nTranslated by Thomas W. Higginson", inline: true },
    { name: '`/aurelius`', value: "Marcus Aurelius' Meditations\nfrom `1.1` to `12.27`\nTranslated by Meric Casaubon", inline: true },

    { name: '\u200B', value: '**Other tools:**'},
    { name: '`/tarot', value: 'Rider-Waite-Smith Tarot Card pull\n`/tarot` for a random card\n`tarot 0-77` for a specific card'}
    )

    .setFooter({ text:'Poimandres Discord Bot • /help' })
    .setTimestamp();

	return interaction.reply({ embeds: [embed]}); //return it all to index for passing
	},
};