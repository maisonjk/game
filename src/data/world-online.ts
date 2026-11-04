import type { Scenario } from '../types';
import { c } from './helpers';

export const ONLINE: Scenario[] = [
  {
    id: 'online-1',
    world: 'online',
    title: 'The Hate Comment',
    hook: 'A stranger leaves a mean comment on your post.',
    chaos: 3,
    mode: 'chat',
    place: 'comments',
    lines: [
      { from: '', text: 'You posted a video of your dance practice. It has 43 likes.' },
      { from: '@xx_nobody_xx', text: 'this is embarrassing lol delete this' },
      { from: '', text: 'Your stomach drops. You were proud of that video.' },
    ],
    beats: [
      {
        prompt: 'What do you do with the comment?',
        choices: [
          c('a', 'Delete the comment and block the account.', 'avoid', 3, 'boundaries', 'Gone. Your page, your rules. That took two seconds.'),
          c('b', 'Reply: “at least I have a face on my profile, coward.”', 'reactive', 0, 'control', 'They reply back. Then their friends do. Now you have 30 mean comments.'),
          c('c', 'Delete your whole video.', 'avoid', 1, 'awareness', 'One stranger just decided what you get to post.'),
          c('d', 'Pin a comment: “thanks for the engagement 💅”', 'humor', 2, 'control', 'Your friends love it. Risky, but it worked this time.'),
        ],
      },
      {
        prompt: 'You still can’t stop thinking about it.',
        choices: [
          c('a', 'Remind yourself: 43 people liked it, 1 stranger didn’t. Text a friend about it.', 'calm', 2, 'awareness', 'Perspective helps, but you still check the comment three more times.'),
          c('b', 'Keep checking their profile to see who they are.', 'avoid', 0, 'awareness', 'An hour gone. Feeling worse.'),
          c('c', 'Post a long story about haters.', 'reactive', 1, 'control', 'It gets attention, but now the hater knows they got to you.'),
          c('d', 'Log off and go practice.', 'avoid', 3, 'control', 'Best revenge. Your next one hits 200 likes.'),
        ],
      },
    ],
    lesson: {
      skill: 'boundaries',
      title: 'Block, don’t battle',
      body: 'Arguing with strangers online gives them exactly what they want: your attention. Blocking is a boundary, not a loss. If comments ever turn into threats or harassment, report them and tell a trusted adult.',
      tryThis: 'Delete. Block. Text a real friend.',
    },
  },
  {
    id: 'online-2',
    world: 'online',
    title: 'Ratio’d',
    hook: 'A mutual quote-posts your take and dunks on it.',
    chaos: 3,
    mode: 'chat',
    place: 'notifications',
    lines: [
      { from: '', text: 'You posted: “pineapple on pizza is elite.”' },
      { from: '@jakeyb', text: '“elite” 💀 this is why your taste in music is also bad' },
      { from: '', text: 'His post has way more likes than yours. People you know are liking it.' },
    ],
    beats: [
      {
        prompt: 'Your face is hot. What’s the move?',
        choices: [
          c('a', 'Wait 10 minutes before doing anything.', 'avoid', 3, 'control', 'After 10 minutes it feels way less serious. It’s a pizza opinion.'),
          c('b', 'Fire back with a roast about his haircut.', 'reactive', 0, 'control', 'He has more followers. You lose round two too.'),
          c('c', 'Delete your post.', 'avoid', 1, 'awareness', 'It’s gone, but the screenshot isn’t.'),
          c('d', '“pineapple and I will not be silenced 🍍”', 'humor', 3, 'voice', 'People love it. You turned a dunk into a bit.'),
        ],
      },
      {
        prompt: 'Jake DMs you: “lol no hard feelings right?”',
        choices: [
          c('a', '“Nah we’re good. Just keep the music shots out of it 😂”', 'reactive', 3, 'boundaries', 'He says “fair.” Joke boundaries set, friendship fine.'),
          c('b', 'Leave him on read forever.', 'avoid', 1, 'voice', 'It’s awkward at school for a week.'),
          c('c', '“yes hard feelings.”', 'reactive', 1, 'voice', 'Honest, at least. He apologizes.'),
          c('d', '“None. But my playlist is elite and I’ll prove it.”', 'humor', 2, 'voice', 'You send him a song. He actually likes it.'),
        ],
      },
    ],
    lesson: {
      skill: 'control',
      title: 'The 10-minute rule',
      body: 'Online embarrassment feels huge in the moment and tiny a day later. Giving yourself 10 minutes before responding stops you from posting something you can’t take back.',
      tryThis: 'Set a 10-minute timer before you reply to anything that makes your face hot.',
    },
  },
  {
    id: 'online-3',
    world: 'online',
    title: 'The Collab Ask',
    hook: 'A friend with a big following wants you in a video you’re not comfortable with.',
    chaos: 3,
    mode: 'chat',
    place: 'Bella ✨',
    lines: [
      { from: 'Bella', text: 'ok I have the BEST idea for a video' },
      { from: 'Bella', text: 'we prank-call your ex-best-friend and post her reaction 😂' },
      { from: 'Bella', text: 'it’ll get SO many views' },
    ],
    beats: [
      {
        prompt: 'You don’t want to do this. What do you say?',
        choices: [
          c('a', '“I’ll pass on that one. Got other ideas?”', 'reactive', 3, 'boundaries', 'Bella: “ok fair, what about a dance trend?” Easy.'),
          c('b', '“That’s literally so mean, why would you even think of that?”', 'reactive', 1, 'empathy', 'Bella gets embarrassed and defensive.'),
          c('c', '“Maybe… let me think about it.”', 'avoid', 0, 'voice', 'Bella hears “yes.” She starts planning it.'),
          c('d', '“What if we prank-call my dog instead? He’ll be way more dramatic.”', 'humor', 3, 'boundaries', 'Bella laughs. The dog video gets 2K views and nobody gets hurt.'),
        ],
      },
      {
        prompt: 'Bella says: “you’re no fun. It’s just a joke.”',
        promptByChoice: {
          d: 'Next day Bella texts: “the dog vid was cute but the prank would’ve gone viral. you’re no fun.”',
          c: 'Bella texts: “set it up for tomorrow!!” You still don’t want to do it.',
        },
        choices: [
          c('a', '“Still a no for me. I’m down for anything else though.”', 'reactive', 3, 'boundaries', 'She drops it. Holding steady kept you from something you’d regret.'),
          c('b', 'Give in so she won’t be annoyed.', 'avoid', 0, 'boundaries', 'The video goes up. Your ex-friend sees it. It gets ugly.'),
          c('c', '“It’s only a joke if she’s laughing too.”', 'calm', 2, 'empathy', 'Bella pauses: “…ok yeah. fair.” She drops it for now, but brings it up again next week.'),
          c('d', '“Then find someone else.”', 'reactive', 1, 'voice', 'True, but now Bella is annoyed at you.'),
        ],
      },
    ],
    lesson: {
      skill: 'boundaries',
      title: 'No is a full sentence',
      body: 'You don’t need a perfect argument to say no. Repeating your “no” calmly, and offering something else, is the strongest move. Views fade. Screenshots don’t.',
      tryThis: '“Not for me. I’m down for something else though.”',
    },
  },
  {
    id: 'online-4',
    world: 'online',
    title: 'Scroll Hole',
    hook: 'It’s 1 A.M. You have a test at 8. You can’t stop scrolling.',
    chaos: 2,
    mode: 'scene',
    place: 'Your bed, 1:07 AM',
    lines: [
      { from: '', text: '“One more video” was 90 minutes ago.' },
      { from: '', text: 'Your group chat is sending memes. Your eyes burn.' },
    ],
    beats: [
      {
        prompt: 'What do you do?',
        choices: [
          c('a', 'Phone across the room. You’re done.', 'avoid', 3, 'awareness', 'You fall asleep in 10 minutes. Your brain thanks you at 8 AM.'),
          c('b', 'Get mad at yourself and keep scrolling anyway.', 'reactive', 0, 'control', 'Guilt-scrolling is the worst kind. It’s now 2 AM.'),
          c('c', 'Tell yourself “just 5 more minutes.”', 'avoid', 1, 'control', 'It’s never 5 minutes.'),
          c('d', 'Send the chat “goodnight losers 💤” and log off.', 'humor', 3, 'boundaries', 'They send hearts. You sleep.'),
        ],
      },
      {
        prompt: 'The next night, you want to avoid this again.',
        choices: [
          c('a', 'Charge your phone outside your room.', 'avoid', 3, 'boundaries', 'Out of reach, out of mind. Sleep improves.'),
          c('b', 'Set a screen time limit on the apps.', 'calm', 2, 'control', 'You tap “ignore limit” a few times. It helps a bit, but the phone’s still right there.'),
          c('c', 'Do nothing. You’ll just be more disciplined.', 'avoid', 1, 'awareness', 'Willpower at 1 AM is pretty much zero.'),
          c('d', 'Delete every app forever.', 'reactive', 1, 'control', 'Lasts 2 days. Extreme rules usually break.'),
        ],
      },
    ],
    lesson: {
      skill: 'awareness',
      title: 'Design beats willpower',
      body: 'Apps are built to keep you scrolling. Instead of fighting yourself at 1 AM, change your setup: phone out of reach, timers on, chat muted at night.',
      tryThis: 'Tonight, charge your phone somewhere you can’t reach from bed.',
    },
  },
  {
    id: 'online-5',
    world: 'online',
    title: 'Stranger DM',
    hook: 'Someone you don’t know messages you. They’re very friendly.',
    chaos: 5,
    mode: 'chat',
    place: '@sk8r_kyle_17',
    lines: [
      { from: '@sk8r_kyle_17', text: 'hey! saw your skate videos, you’re really good' },
      { from: '@sk8r_kyle_17', text: 'what school do you go to? maybe we skate at the same park' },
      { from: '@sk8r_kyle_17', text: 'send a pic of you so I know who to look for 😊' },
      { from: '', text: 'You’ve never seen this account before. It was made last week.' },
    ],
    beats: [
      {
        prompt: 'Something feels off. What do you do?',
        choices: [
          c('a', 'Block and report. Share nothing.', 'avoid', 3, 'boundaries', 'Done. Your gut was right to notice: new account, personal questions, asking for photos.'),
          c('b', 'Tell them your school but not your name.', 'avoid', 0, 'boundaries', 'Your school is enough to find you. Never share location details with strangers.'),
          c('c', '“Who even are you? Creep.”', 'reactive', 1, 'control', 'You’re right to be suspicious, but replying keeps the conversation going. Blocking ends it.'),
          c('d', 'Joke around with them a bit to see if they’re legit.', 'humor', 0, 'boundaries', 'People who mean harm are often friendly on purpose. You don’t owe them a test.'),
        ],
      },
      {
        prompt: 'Later, you’re still thinking about that account.',
        promptByChoice: {
          a: 'You blocked them, but you still feel weird about it.',
        },
        choices: [
          c('a', 'Tell a parent or trusted adult.', 'reactive', 3, 'voice', 'They thank you for telling them and help you check your privacy settings.'),
          c('b', 'Keep it to yourself. Nothing happened, right?', 'avoid', 1, 'voice', 'It was right to block, and telling someone helps you feel less alone with the weird feeling.'),
          c('c', 'Set your account to private.', 'avoid', 3, 'boundaries', 'Strangers can’t see your videos anymore. Smart.'),
          c('d', 'Post about it to warn your friends.', 'calm', 2, 'voice', 'Thoughtful, though it’s best to also tell an adult who can help report it.'),
        ],
      },
    ],
    sensitive: true,
    careNote: 'This one is about staying safe when a stranger messages you.',
    lesson: {
      skill: 'boundaries',
      title: 'Trust the weird feeling',
      body: 'Strangers asking where you go to school, where you live, or for photos is a red flag, even if they’re nice. Block, report, and tell a trusted adult. You’re never in trouble for telling.',
      tryThis: 'Never share your school, address, or photos with someone you haven’t met in real life.',
    },
  },
  {
    id: 'online-6',
    world: 'online',
    title: 'Lobby Rage',
    hook: 'Your teammate trash-talks you in the game lobby after you lose.',
    chaos: 3,
    mode: 'chat',
    place: 'squad voice chat',
    lines: [
      { from: 'Vex', text: 'bro you’re SO bad, you cost us the whole match' },
      { from: 'Vex', text: 'uninstall' },
      { from: '', text: 'You did miss a few shots. But this feels like a lot.' },
    ],
    beats: [
      {
        prompt: 'The lobby is listening. What do you say?',
        choices: [
          c('a', '“Yeah I was off that round. Let’s run it back.”', 'calm', 2, 'control', 'Vex: “yeah you were trash.” Owning it is mature, but he just used it as ammo.'),
          c('b', '“You literally went 2 and 14, sit down.”', 'reactive', 1, 'control', 'The lobby goes “ooooh.” Now it’s a whole fight for the next match too.'),
          c('c', 'Leave the lobby.', 'avoid', 3, 'boundaries', 'You don’t owe a stranger a debate. The next lobby is chill.'),
          c('d', '“Uninstalling my aim, keeping the vibes.”', 'humor', 3, 'control', 'The lobby laughs. Nothing for Vex to grab.'),
        ],
      },
      {
        prompt: 'Next match, Vex is still being toxic.',
        promptByChoice: {
          c: 'A week later you get matched with Vex again. He starts right away.',
        },
        choices: [
          c('a', 'Mute him and focus on your game.', 'avoid', 3, 'boundaries', 'Your next match is your best one. Peace and quiet helps.'),
          c('b', 'Trash talk him all match.', 'reactive', 0, 'control', 'You both play worse. You lose again.'),
          c('c', 'Report him if it keeps going.', 'reactive', 3, 'boundaries', 'That’s what the report button is for. You don’t have to take abuse to play a game.'),
          c('d', 'Quit gaming for the night.', 'avoid', 2, 'awareness', 'Fair. If it’s not fun anymore, logging off is a good choice.'),
        ],
      },
    ],
    lesson: {
      skill: 'control',
      title: 'Don’t feed the lobby',
      body: 'Toxic players want a reaction. Owning a bad round, muting, or reporting all work better than fighting. Your peace is worth more than winning an argument with a stranger.',
      tryThis: 'Mute first, think later.',
    },
  },
];
