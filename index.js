const { Telegraf, Markup } = require ('telegraf');

const bot = new Telegraf('TOKEN');

// Example 1 - middleware
// bot.use(async (ctx, next) => {
//     await ctx.reply(JSON.stringify(ctx.update, null, 2));
//     //next();
// });

// Example 2 - commands, and content type handling
// bot.command('help', ctx => {
//     ctx.reply(`multi
//     linea
//     text`);
// });
// bot.hears('hello', ctx => { ctx. reply('no hello');});
// bot.on('text', ctx => ctx.reply(`Greeting ${ctx.update.message.text} not supported`));


// Example 3 - keyboards, 'Heads or Tails' or extend to random number bot
const headsOrTails = () => (Math.round(Date.now() / 1000) % 2 == 0) ? 'Heads' : 'Tails';

const inlineKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Flip again', 'flip_a_coin'),
]);
//console.log(`inlineKeyboard: ${JSON.stringify(inlineKeyboard)}`);

bot.hears('Flip a coin', ctx => ctx.reply(headsOrTails(), inlineKeyboard));
bot.action('flip_a_coin', async ctx => {
    // it breaks the bot if edit message and original message text is the same
    await ctx.editMessageText(`${headsOrTails()}\nEdited: ${new Date().toISOString()}`, inlineKeyboard);
});

const keyboard = Markup.keyboard([
    ['Flip a coin']
]).resize();
//console.log(`keyboard: ${JSON.stringify(keyboard)}`);

// default middleware, executed if no middleware has run
bot.use(async ctx => {
    await ctx.reply('What\'s next?', keyboard);
});


// start bot
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));