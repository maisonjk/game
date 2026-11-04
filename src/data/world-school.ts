import type { Scenario } from '../types';
import { c } from './helpers';

export const SCHOOL: Scenario[] = [
  {
    id: 'school-1',
    world: 'school',
    title: 'Group Project Ghost',
    hook: 'Presentation is tomorrow. One teammate hasn’t done anything.',
    chaos: 3,
    mode: 'chat',
    place: 'history project',
    lines: [
      { from: 'Lena', text: 'slides 1-4 done ✅' },
      { from: 'You', text: 'slides 5-8 done too', me: true },
      { from: 'Lena', text: '@Chris where are 9-12??' },
      { from: '', text: 'Chris was last online two days ago. The presentation is at 9 AM.' },
    ],
    beats: [
      {
        prompt: 'It’s 7 PM. What do you do?',
        choices: [
          c('a', 'Text Chris: “You okay? We need 9-12 by 9. Can you, or should we split it?”', 'reactive', 3, 'voice', 'Chris replies 20 minutes later: “sorry, family stuff. can I do 2 of them?” A plan forms.'),
          c('b', 'Post in the chat: “Chris is useless, as usual.”', 'reactive', 0, 'control', 'Chris sees it and goes fully silent. Now nobody’s doing 9-12.'),
          c('c', 'Quietly do all of Chris’s slides yourself and say nothing.', 'avoid', 1, 'boundaries', 'The slides get done. You’re up until midnight and kind of furious.'),
          c('d', '“@Chris blink twice if you’ve been kidnapped”', 'humor', 3, 'voice', 'Chris laughs and replies right away. It got his attention without shaming him.'),
        ],
      },
      {
        prompt: 'Chris says: “I can do 2 slides. Sorry, stuff’s been rough at home.”',
        promptByTone: {
          avoid: 'It’s the next morning. The teacher asks the group: “Who did which slides?”',
        },
        choices: [
          c('a', '“That’s fine, thanks for telling us. Lena and I can split the other two.”', 'calm', 3, 'empathy', 'You hit the deadline and Chris feels like part of the team instead of a problem.'),
          c('b', '“Everyone has stuff. You still should’ve said something.”', 'reactive', 1, 'empathy', 'True, but Chris shuts down. The slides get done, the team feels tense.'),
          c('c', 'Tell the truth about who did what, without trashing anyone.', 'reactive', 2, 'voice', 'The grade reflects the real work. You were honest without being cruel.'),
          c('d', 'Cover for everyone and say it was split evenly.', 'avoid', 1, 'boundaries', 'Nobody gets in trouble, but you learn your effort can disappear without anyone noticing.'),
        ],
      },
    ],
    lesson: {
      skill: 'voice',
      title: 'Ask before you assume',
      body: 'When someone drops the ball, there’s usually a reason you can’t see. A direct, kind message with a deadline gets better results than a public callout or silent resentment.',
      tryThis: '“Hey, we need X by [time]. Can you do it, or should we change the plan?”',
    },
  },
  {
    id: 'school-2',
    world: 'school',
    title: 'Called Out in Class',
    hook: 'The teacher blames you for talking. It was the kid behind you.',
    chaos: 3,
    mode: 'scene',
    place: 'Room 214',
    lines: [
      { from: '', text: 'Someone behind you has been whispering for ten minutes.' },
      { from: 'Mr. Patel', text: 'Okay, that’s enough. You, up front. Lunch detention.' },
      { from: '', text: 'He’s pointing at you. The whole class turns around.' },
    ],
    beats: [
      {
        prompt: 'Everyone is staring. What do you do right now?',
        choices: [
          c('a', 'Take a breath. Say calmly: “Can I talk to you after class about this?”', 'calm', 3, 'control', 'Mr. Patel pauses, then nods. You didn’t get louder and he noticed.'),
          c('b', '“It wasn’t even me! This is so unfair!”', 'reactive', 1, 'control', 'You’re right, but it comes out loud. Now you’re in trouble for “attitude” too.'),
          c('c', 'Say nothing and take the detention.', 'avoid', 1, 'voice', 'You avoid a scene, but you serve a detention you didn’t earn.'),
          c('d', 'Point at the kid behind you: “Ask him, he’s the podcast host.”', 'humor', 0, 'empathy', 'The class laughs. The other kid is mad, and Mr. Patel is less sure who to believe.'),
        ],
      },
      {
        prompt: 'After class, you get a minute with Mr. Patel.',
        promptByTone: {
          reactive: 'After class, Mr. Patel says: “Want to try that again, calmly?”',
        },
        choices: [
          c('a', '“It wasn’t me talking. Could I move seats so it’s clearer?”', 'reactive', 3, 'voice', 'He drops the detention and moves your seat. Respectful and specific wins.'),
          c('b', '“You always pick on me.”', 'reactive', 0, 'awareness', 'He gets defensive. The detention stays.'),
          c('c', '“Never mind, it’s fine.”', 'avoid', 1, 'voice', 'You serve the detention. Next time it might happen again.'),
          c('d', 'Ask a parent to email the teacher about it later.', 'calm', 2, 'boundaries', 'It gets sorted out, slower. Speaking up yourself first is a skill worth building.'),
        ],
      },
    ],
    lesson: {
      skill: 'control',
      title: 'Win the second conversation',
      body: 'In front of a crowd, nobody backs down. Asking to talk later lets you skip the showdown and have the real conversation when people can actually listen.',
      tryThis: '“Can I talk to you about this after class?”',
    },
  },
  {
    id: 'school-3',
    world: 'school',
    title: 'No Seat at the Table',
    hook: 'You walk up to your lunch table. Every seat is taken.',
    chaos: 2,
    mode: 'scene',
    place: 'Cafeteria',
    lines: [
      { from: '', text: 'You’re holding your tray. Your usual seat has a new kid in it.' },
      { from: 'Mia', text: 'oh hey! we kinda ran out of room today' },
      { from: '', text: 'Nobody moves. A few people look at their food.' },
    ],
    beats: [
      {
        prompt: 'You’re standing there. What’s the move?',
        choices: [
          c('a', '“No stress, I’ll grab a chair.” Pull one over from the next table.', 'calm', 3, 'voice', 'People scoot. It was a space problem, not a “you” problem.'),
          c('b', '“Wow, okay. Didn’t realize I got replaced.”', 'reactive', 0, 'control', 'It gets quiet and awkward. The new kid looks mortified.'),
          c('c', 'Mumble “it’s fine” and eat in the library.', 'avoid', 1, 'awareness', 'You get through lunch, but you replay it all afternoon.'),
          c('d', '“I’ll just eat standing like a medieval king then.”', 'humor', 3, 'voice', 'Laughs. Someone says “lol sit here” and scoots over. It was never about you.'),
        ],
      },
      {
        prompt: 'The new kid in your old seat says: “Sorry, I didn’t know this was your spot.”',
        choices: [
          c('a', '“Oh, you’re good! I’m {name}. Where’d you transfer from?”', 'calm', 3, 'empathy', 'They light up. You gained a new person instead of losing a seat.'),
          c('b', '“It’s fine I guess.”', 'avoid', 1, 'empathy', 'Technically polite. They still feel like they did something wrong.'),
          c('c', 'Ignore them and talk to everyone else.', 'avoid', 0, 'empathy', 'They spend the rest of lunch feeling like an intruder.'),
          c('d', '“Rent is due by Friday, but I’ll allow it.”', 'humor', 3, 'empathy', 'They crack up. Instant ice-breaker, and they tell you their name.'),
        ],
      },
    ],
    lesson: {
      skill: 'awareness',
      title: 'Not everything is about you',
      body: 'Social pain hits fast, and your brain jumps to rejection. Most of the time, it’s logistics. Acting like it’s solvable makes it solvable.',
      tryThis: 'Before reacting, ask: “Is this about me, or is it just a situation?”',
    },
  },
  {
    id: 'school-4',
    world: 'school',
    title: 'Score Reveal',
    hook: 'Your friend bombed the test. You aced it. They ask your score.',
    chaos: 2,
    mode: 'scene',
    place: 'Hallway after chem',
    lines: [
      { from: 'Zoe', text: 'I got a 58. I studied SO hard. I’m gonna be grounded forever.' },
      { from: 'Zoe', text: 'what’d you get?' },
      { from: '', text: 'You got a 94.' },
    ],
    beats: [
      {
        prompt: 'Zoe is upset and asking. What do you say?',
        choices: [
          c('a', '“I did okay, but that doesn’t matter right now. That sounds really stressful. Want to talk about it?”', 'calm', 3, 'empathy', 'Zoe exhales. She needed someone to notice how she felt more than she needed your number.'),
          c('b', '“94!! Wait, you studied? What did you even study?”', 'reactive', 0, 'empathy', 'Zoe’s face falls. That landed like a punch.'),
          c('c', 'Lie and say you got a 60 too.', 'avoid', 1, 'voice', 'She feels less alone for a moment, but she’ll probably find out.'),
          c('d', '“Honestly chem tests are designed by villains.”', 'humor', 2, 'empathy', 'She laughs a little. It helps, though she still needs to talk about it.'),
        ],
      },
      {
        prompt: 'Zoe says: “Can you help me study for the retake?”',
        choices: [
          c('a', '“Yes. Thursday after school? Let’s figure out what tripped you up.”', 'calm', 3, 'empathy', 'Zoe gets a 79 on the retake. You both feel good about it.'),
          c('b', '“I’m kinda busy but you could watch videos?”', 'avoid', 1, 'empathy', 'Fair if you really are busy. Zoe feels a little brushed off.'),
          c('c', '“Sure, but you have to actually focus this time.”', 'reactive', 1, 'voice', 'She agrees, but feels judged the whole session.'),
          c('d', 'Say yes, but set a time limit: “I can do an hour Thursday.”', 'reactive', 3, 'boundaries', 'Helpful and honest about your time. That’s a strong combo.'),
        ],
      },
    ],
    lesson: {
      skill: 'empathy',
      title: 'Read the room',
      body: 'Sometimes a question isn’t really about the question. Zoe wasn’t asking for your score, she was asking if she’s okay. Answer the feeling first.',
      tryThis: '“That sounds rough. How are you feeling about it?”',
    },
  },
  {
    id: 'school-5',
    world: 'school',
    title: 'The Rumor',
    hook: 'Someone says you cheated on the quiz. People are whispering.',
    chaos: 4,
    mode: 'scene',
    place: 'Lockers',
    lines: [
      { from: '', text: 'You hear your name and the word “cheated” as you pass a group.' },
      { from: 'Leo', text: 'heard you had the answers on your phone lol' },
      { from: '', text: 'You didn’t. You studied for two days.' },
    ],
    beats: [
      {
        prompt: 'Leo is grinning. What’s your move?',
        choices: [
          c('a', '“Nope. Where’d you hear that?”', 'reactive', 3, 'voice', 'Leo shrugs: “someone in 3rd period.” Calm denial plus a question puts the rumor on the defensive.'),
          c('b', '“Whoever said that is a liar and I’ll find them.”', 'reactive', 0, 'control', 'Big reaction = more interesting rumor. Now people are talking about your meltdown too.'),
          c('c', 'Shrug and keep walking. Don’t feed it.', 'avoid', 2, 'voice', 'No reaction, nothing to repeat. It fades a bit, though one person keeps it going.'),
          c('d', '“If I could cheat I’d have gotten a 100, not an 88.”', 'humor', 2, 'voice', 'Leo laughs: “fair.” Kind of convincing, honestly.'),
        ],
      },
      {
        prompt: 'Your teacher asks to talk after class. She’s heard the rumor.',
        choices: [
          c('a', 'Stay calm, explain how you studied, and offer to retake it with her watching.', 'calm', 3, 'voice', 'She says “I believe you, but thanks for offering.” The rumor loses all its power.'),
          c('b', '“So you believe random gossip now?”', 'reactive', 0, 'control', 'She gets more suspicious, not less.'),
          c('c', 'Get quiet and just say “I didn’t.”', 'avoid', 1, 'voice', 'She’s not sure. It gets dropped, but it lingers.'),
          c('d', 'Show her your study notes and flashcards.', 'calm', 2, 'awareness', 'Receipts help. She believes you, though she still wants to watch the retake.'),
        ],
      },
    ],
    lesson: {
      skill: 'control',
      title: 'Boring kills rumors',
      body: 'Rumors feed on reactions. A calm, boring “nope” gives people nothing to repeat. Save your energy for the people who actually matter, like the teacher.',
      tryThis: '“That’s not true. Where’d you hear it?”',
    },
  },
  {
    id: 'school-6',
    world: 'school',
    title: 'The New Kid',
    hook: 'A new student is eating alone. Your friends are making jokes.',
    chaos: 3,
    mode: 'scene',
    place: 'Courtyard',
    lines: [
      { from: '', text: 'The new kid, Omar, is sitting alone with headphones on.' },
      { from: 'Ethan', text: 'bro’s been listening to the same song for 3 days' },
      { from: 'Kayla', text: 'maybe he doesn’t speak English lol' },
      { from: '', text: 'He does. You heard him answer in English class.' },
    ],
    beats: [
      {
        prompt: 'Your friends are laughing. What do you do?',
        choices: [
          c('a', '“He’s actually funny. I’m gonna go say hi.”', 'reactive', 3, 'empathy', 'Your friends shrug. One of them follows you over.'),
          c('b', '“You guys are so mean, it’s embarrassing.”', 'reactive', 1, 'voice', 'They roll their eyes. Point made, but nobody moves.'),
          c('c', 'Laugh along so it’s not weird.', 'avoid', 0, 'empathy', 'Omar glances over. He saw.'),
          c('d', '“Maybe he’s just avoiding your music taste, Ethan.”', 'humor', 3, 'voice', 'Everyone laughs at Ethan instead. The jokes stop, and nobody feels lectured.'),
        ],
      },
      {
        prompt: 'You walk up to Omar. He takes off one headphone, a little guarded.',
        choices: [
          c('a', '“Hey, I’m in your English class. What are you listening to?”', 'calm', 3, 'empathy', 'He shows you. It’s actually good. You have something in common.'),
          c('b', '“My friends were being weird, sorry about them.”', 'calm', 1, 'empathy', 'Kind, but now he knows they were talking about him.'),
          c('c', '“You should come sit with us.”', 'reactive', 2, 'voice', 'He hesitates, then comes. It’s a little awkward, but it’s a start.'),
          c('d', 'Lose your nerve and walk past.', 'avoid', 0, 'control', 'He puts the headphone back on. Next time.'),
        ],
      },
    ],
    lesson: {
      skill: 'empathy',
      title: 'One person changes the room',
      body: 'Groups follow the first person who acts. You don’t have to lecture anyone. Just going over there tells everyone what kind of person you are.',
      tryThis: '“Hey, I’m ___. What are you listening to?”',
    },
  },
];
