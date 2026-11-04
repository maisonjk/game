import type { Scenario } from '../types';
import { c } from './helpers';

export const CHAT: Scenario[] = [
  {
    id: 'chat-1',
    world: 'chat',
    title: 'Blamed in the Chat',
    hook: 'Someone says you leaked the surprise party. You didn’t.',
    chaos: 3,
    mode: 'chat',
    place: 'bday squad 🎉',
    lines: [
      { from: 'Kai', text: 'ok who told Maya about the party' },
      { from: 'Jordan', text: 'she literally knows everything now' },
      { from: 'Kai', text: 'pretty sure it was you lol. you were talking to her after class' },
      { from: '', text: 'You never said a word. Your face gets hot. Four people are typing.' },
    ],
    beats: [
      {
        prompt: 'Everyone is watching the chat. What’s your first move?',
        choices: [
          c('a', '“Wasn’t me. I talked to her about the bio test. Happy to figure out what happened though.”', 'calm', 3, 'voice', 'The typing dots stop. Jordan replies “ok fair.” You stated the facts without attacking anyone.'),
          c('b', '“Are you serious?? You always blame me for everything 🙄”', 'reactive', 0, 'control', 'Kai fires back. Now the chat is about your attitude, not the party. Two people mute the thread.'),
          c('c', 'Leave the chat without saying anything.', 'avoid', 1, 'boundaries', 'Your silence reads as guilt. Someone posts “yikes, guess that confirms it.”'),
          c('d', '“If I leaked it I’d at least have made it dramatic. Wasn’t me tho.”', 'humor', 2, 'voice', 'A couple of laughs. The tension drops, but Kai isn’t fully convinced you’re serious.'),
        ],
      },
      {
        prompt: 'An hour later, Kai DMs you privately: “my bad if it wasn’t you. I was just stressed.” What now?',
        promptByTone: {
          reactive: 'An hour later, Kai DMs you: “you didn’t have to come at me like that.” What now?',
          avoid: 'An hour later, Kai DMs you: “so was it you or not?” What now?',
        },
        choices: [
          c('a', '“All good. It sucked to get blamed in front of everyone, so next time just ask me first?”', 'calm', 3, 'boundaries', 'Kai sends a 🫡. You kept the friendship and set a clear expectation for next time.'),
          c('b', '“Whatever. Doesn’t matter.”', 'avoid', 1, 'awareness', 'It does matter to you, and it sits in your chest the rest of the night.'),
          c('c', 'Screenshot the DM and post it in the group: “see? told you.”', 'reactive', 0, 'empathy', 'Kai feels exposed. You were right about the party, but now you’re the one who made it public.'),
          c('d', '“Apology accepted. You’re buying the cake now tho 🎂”', 'humor', 2, 'empathy', 'Kai laughs and agrees. It’s fixed, though you never said it actually hurt.'),
        ],
      },
    ],
    lesson: {
      skill: 'voice',
      title: 'Facts first, feelings second',
      body: 'When you’re accused in public, a short factual reply shuts down drama faster than a defense speech. Save the “that hurt” for a private message, where it actually lands.',
      tryThis: '“That wasn’t me. Here’s what I actually did. Happy to help figure it out.”',
    },
  },
  {
    id: 'chat-2',
    world: 'chat',
    title: 'Left on Read',
    hook: 'You sent your best friend a long message. Read 3 hours ago. Nothing.',
    chaos: 2,
    mode: 'chat',
    place: 'Riley 💙',
    lines: [
      { from: 'You', text: 'ok I need to tell you something kinda big. I didn’t make the team and I’m honestly really upset about it. can we talk later?', me: true },
      { from: '', text: 'Read 3:14 PM' },
      { from: '', text: 'It’s 6:20 PM. Riley just posted a story at the mall.' },
    ],
    beats: [
      {
        prompt: 'Your brain is writing a whole story about why they ignored you. What do you do?',
        choices: [
          c('a', 'Notice the spiral. Tell yourself: “I don’t actually know why yet.”', 'calm', 3, 'awareness', 'The knot in your stomach loosens a little. You still want an answer, but you’re not at war.'),
          c('b', '“wow ok. nice to know where I stand.”', 'reactive', 0, 'control', 'Riley sees it at the mall and feels attacked for something they didn’t know was urgent.'),
          c('c', 'Post a vague sad song on your story so they’ll notice.', 'avoid', 1, 'voice', 'Three people react. Riley isn’t one of them. You’re still waiting.'),
          c('d', '“hellooo did my message get abducted by aliens 👽”', 'humor', 2, 'voice', 'Light nudge. Riley replies “omg sorry!! one sec.”'),
        ],
      },
      {
        prompt: 'Riley finally replies: “sorry I was with my cousin and forgot to answer. what happened?”',
        choices: [
          c('a', 'Tell them about the team, and that it stung a little to wait.', 'calm', 3, 'voice', 'Riley calls you right away. Being honest about both things made the conversation real.'),
          c('b', '“never mind, it’s fine.”', 'avoid', 1, 'awareness', 'Riley believes you. Now you’re upset about the team AND feel unheard.'),
          c('c', '“forgot? cool. guess I’m not a priority.”', 'reactive', 0, 'empathy', 'Riley gets defensive. The talk you needed turns into a fight about texting.'),
          c('d', 'Tell them about the team, skip the part about waiting.', 'calm', 2, 'voice', 'You get the support you needed. The waiting thing still bugs you a bit, but it’s small.'),
        ],
      },
    ],
    lesson: {
      skill: 'awareness',
      title: 'Spot the story',
      body: 'When someone goes quiet, your brain fills the silence with the worst explanation. Catching that story, and remembering it’s a guess, keeps you from reacting to something that didn’t happen.',
      tryThis: 'Ask yourself: “What do I actually know, and what am I guessing?”',
    },
  },
  {
    id: 'chat-3',
    world: 'chat',
    title: 'The Screenshot',
    hook: 'A joke you made in a private chat just got screenshotted to a bigger one.',
    chaos: 4,
    mode: 'chat',
    place: 'period 4 chat',
    lines: [
      { from: 'Sam', text: '[screenshot] 💀💀💀 look what they said about Devon' },
      { from: 'Alex', text: 'nahhh thats crazy' },
      { from: '', text: 'It’s your message. You said Devon’s presentation was “a crime against PowerPoint.” Devon is in this chat.' },
      { from: 'Devon', text: '…cool' },
    ],
    beats: [
      {
        prompt: 'Devon saw it. The chat is waiting to see what you do.',
        choices: [
          c('a', 'DM Devon: “That was a dumb joke and I’m sorry you saw it. Your presentation wasn’t a crime.”', 'calm', 3, 'empathy', 'Devon replies “thanks for saying that.” It doesn’t erase it, but it helps.'),
          c('b', 'In the chat: “Sam why would you post that?? snake behavior”', 'reactive', 1, 'control', 'Sam did break your trust, but now there are two fights and Devon is still hurt.'),
          c('c', 'Say nothing and hope it blows over.', 'avoid', 0, 'empathy', 'Devon assumes you meant it and still think it. Things are awkward for weeks.'),
          c('d', '“in my defense PowerPoint transitions are a crime for everyone”', 'humor', 1, 'empathy', 'Some laughs, but Devon is still the punchline. The joke dodges the apology.'),
        ],
      },
      {
        prompt: 'Later, Sam DMs you: “bro it was just a joke, why are you mad at me?”',
        choices: [
          c('a', '“I said something mean, that’s on me. But screenshotting private chats isn’t cool. Please don’t do that with my stuff.”', 'calm', 3, 'boundaries', 'Sam says “fair.” You owned your part and named theirs.'),
          c('b', 'Screenshot something embarrassing Sam said and post it back.', 'reactive', 0, 'control', 'Now everyone’s stuff is getting posted. The chat turns into a war.'),
          c('c', 'Stop talking to Sam completely without explaining.', 'avoid', 1, 'voice', 'Sam doesn’t know what happened. Things get weird and never really get fixed.'),
          c('d', '“It’s fine.” (It’s not fine.)', 'avoid', 1, 'awareness', 'Sam thinks screenshots are okay. It’ll probably happen again.'),
        ],
      },
    ],
    lesson: {
      skill: 'empathy',
      title: 'Repair beats defend',
      body: 'When something you said hurts someone, explaining why you said it rarely helps. A fast, specific apology to the person who got hurt does more than any comeback in the group.',
      tryThis: '“I said something unfair about you. I’m sorry. You didn’t deserve that.”',
    },
  },
  {
    id: 'chat-4',
    world: 'chat',
    title: 'Plans Without You',
    hook: 'Your whole friend group is at the movies. Nobody told you.',
    chaos: 3,
    mode: 'chat',
    place: 'the crew 🍿',
    lines: [
      { from: '', text: 'Saturday, 8 PM. You open your phone and see four stories from the same theater.' },
      { from: 'Jess', text: 'that movie was SO good omg' },
      { from: 'Marcus', text: 'popcorn was mid tho' },
      { from: '', text: 'They’re talking about it in the chat you’re in. Like it’s nothing.' },
    ],
    beats: [
      {
        prompt: 'You feel left out and kind of embarrassed. What’s your move?',
        choices: [
          c('a', 'Put the phone down. Name it: “I feel left out, and that’s allowed.” Text them tomorrow.', 'calm', 3, 'awareness', 'You sleep on it. The sting is still there, but you’re thinking clearly.'),
          c('b', '“glad yall had fun without me 🙂”', 'reactive', 1, 'voice', 'Jess replies “wait we thought you were busy??” Turns out there was a mix-up, but now it’s awkward.'),
          c('c', 'Mute the chat and decide they never liked you anyway.', 'avoid', 0, 'awareness', 'You spend Sunday convinced you have no friends. That story isn’t true, but it feels true.'),
          c('d', '“wow the popcorn critic has spoken 🍿 what’d you see?”', 'humor', 2, 'voice', 'Marcus answers. Jess adds “wait you should’ve come!” You’re back in the convo.'),
        ],
      },
      {
        prompt: 'Next day, Jess says: “we figured you were at your dad’s, that’s why we didn’t ask.”',
        promptByTone: {
          reactive: 'Next day, Jess says: “we thought you were at your dad’s. didn’t have to be passive aggressive about it.”',
        },
        choices: [
          c('a', '“Ah ok. Next time just ask anyway? I’d rather say no than not get asked.”', 'calm', 3, 'voice', 'Jess adds you to the next plan before it’s even set. Clear ask, easy fix.'),
          c('b', '“yeah sure, ‘thought.’”', 'reactive', 0, 'empathy', 'Jess gets defensive. A misunderstanding turns into an actual problem.'),
          c('c', '“oh it’s whatever I didn’t even want to go.”', 'avoid', 1, 'awareness', 'They believe you, so nothing changes next time either.'),
          c('d', '“ok but now you owe me a movie and I’m picking it”', 'humor', 2, 'voice', 'They agree. Fun fix, though you didn’t say the “please ask me” part.'),
        ],
      },
    ],
    lesson: {
      skill: 'awareness',
      title: 'Feel it, then check it',
      body: 'Feeling left out is real and normal. Before you decide what it means, check the facts. A lot of “they hate me” moments turn out to be “they assumed.”',
      tryThis: '“Hey, I saw you all went out. Did I miss something? I’d love to come next time.”',
    },
  },
  {
    id: 'chat-5',
    world: 'chat',
    title: 'The Pile-On',
    hook: 'The chat is roasting Noah. It started funny. It isn’t anymore.',
    chaos: 4,
    mode: 'chat',
    place: 'gym class survivors',
    lines: [
      { from: 'Tyler', text: 'noah really tripped over NOTHING today 😭' },
      { from: 'Bri', text: 'he does that every day tho' },
      { from: 'Tyler', text: 'bro walks like a newborn giraffe' },
      { from: 'Tyler', text: 'someone make it a sticker' },
      { from: '', text: 'Noah is in this chat. He hasn’t said anything in 20 minutes.' },
    ],
    beats: [
      {
        prompt: 'Nobody’s stopping it. What do you do?',
        choices: [
          c('a', '“ok I think we got the joke. moving on, did anyone do the math hw?”', 'calm', 3, 'voice', 'The chat shifts. Tyler sends one more emoji, then drops it. Noah reacts to the math question.'),
          c('b', '“Tyler you’re literally so annoying, leave him alone”', 'reactive', 1, 'control', 'Now it’s you vs. Tyler. It stops the roast but starts a new fight.'),
          c('c', 'Send a laughing emoji so you don’t look weird.', 'avoid', 0, 'empathy', 'Noah sees your reaction too. That one stings him the most.'),
          c('d', 'Make the sticker, but of yourself tripping.', 'humor', 2, 'empathy', 'Everyone laughs at you instead. The heat comes off Noah, and your choice of target says a lot.'),
        ],
      },
      {
        prompt: 'After the chat quiets down, you think about Noah.',
        choices: [
          c('a', 'DM him: “that went too far. you good?”', 'calm', 3, 'empathy', 'He replies after a while: “ya. thanks. kinda sucked.” One message mattered more than you thought.'),
          c('b', 'Do nothing. It’s over, so why bring it up?', 'avoid', 1, 'empathy', 'Probably fine. But Noah never finds out anyone noticed.'),
          c('c', 'Tell Tyler privately: “not trying to start anything, but that was a lot for Noah.”', 'calm', 2, 'voice', 'Tyler shrugs it off, but he goes easier next time.'),
          c('d', 'Screenshot the roast and send it to a teacher anonymously.', 'reactive', 1, 'boundaries', 'Telling an adult can be the right call when it’s serious or ongoing. For one bad night, talking to Noah first might help more.'),
        ],
      },
    ],
    lesson: {
      skill: 'voice',
      title: 'The redirect',
      body: 'You don’t have to give a speech to stop a pile-on. Changing the subject or saying “ok, enough” is often all it takes. If roasting someone keeps happening, that’s bullying, and a trusted adult should know.',
      tryThis: '“Alright, we got it. Moving on.”',
    },
  },
  {
    id: 'chat-6',
    world: 'chat',
    title: 'The 1 A.M. Message',
    hook: 'A friend sends something heavy late at night.',
    chaos: 5,
    mode: 'chat',
    place: 'Ava 🌙',
    lines: [
      { from: 'Ava', text: 'are you up' },
      { from: 'Ava', text: 'idk everything just feels really bad lately' },
      { from: 'Ava', text: 'like nobody would even notice if I disappeared' },
      { from: '', text: 'Your heart drops. You’re not sure what to say.' },
    ],
    beats: [
      {
        prompt: 'Ava is hurting. What’s your first reply?',
        choices: [
          c('a', '“I’m here. I would 100% notice. Can you tell me what’s been going on?”', 'calm', 3, 'empathy', 'Ava starts typing. She tells you about a lot of stuff she’s been keeping in.'),
          c('b', '“don’t say that!! you’re being dramatic”', 'reactive', 0, 'empathy', 'Ava replies “nvm forget it.” She shuts down.'),
          c('c', 'Wait until morning. You don’t know what to say.', 'avoid', 0, 'empathy', 'Ava doesn’t hear from anyone tonight. Not knowing what to say is normal. Saying something simple matters more than saying something perfect.'),
          c('d', '“who do I need to fight 😤”', 'humor', 1, 'empathy', 'Ava sends a small “lol.” It helps for a second, but she still needs someone to listen.'),
        ],
      },
      {
        prompt: 'Ava says: “please don’t tell anyone. I’m fine, I just needed to say it.”',
        choices: [
          c('a', '“I care about you too much to keep this to myself. Can we tell your mom or the school counselor together tomorrow? If you feel unsafe tonight, you can call or text 988 anytime.”', 'calm', 3, 'boundaries', 'Ava is quiet, then says “ok. tomorrow.” You didn’t carry it alone, and neither does she.'),
          c('b', 'Promise to keep it secret no matter what.', 'avoid', 0, 'boundaries', 'You want to be loyal. But a secret like this is too heavy for one friend to hold, and Ava deserves real support.'),
          c('c', 'Tell her you’ll keep listening, and tell a trusted adult yourself in the morning.', 'calm', 2, 'boundaries', 'Ava might be upset at first. Getting her help still matters more than keeping her happy with you.'),
          c('d', 'Post about it on your story so people check on her.', 'reactive', 0, 'empathy', 'Ava feels exposed in front of everyone. Help should come from trusted people, not your followers.'),
        ],
      },
    ],
    lesson: {
      skill: 'empathy',
      title: 'Listen, then loop in',
      body: 'When a friend says they feel like disappearing, take it seriously. Listen without judging, then bring in a trusted adult. That’s not betrayal. It’s what being a real friend looks like when things get this heavy.',
      tryThis: 'If you or a friend ever feel unsafe, call or text 988 (US) any time. It’s free and confidential.',
    },
  },
];
