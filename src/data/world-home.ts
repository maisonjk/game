import type { Scenario } from '../types';
import { c } from './helpers';

export const HOME: Scenario[] = [
  {
    id: 'home-1',
    world: 'home',
    title: 'Phone Confiscated',
    hook: 'Your mom takes your phone mid-conversation.',
    chaos: 4,
    mode: 'scene',
    place: 'Kitchen, 10:40 PM',
    lines: [
      { from: 'Mom', text: 'It’s 10:40. I said phones off at 10:30. Hand it over.' },
      { from: '', text: 'You were in the middle of planning tomorrow’s project with your group.' },
    ],
    beats: [
      {
        prompt: 'She’s holding out her hand. What do you do?',
        choices: [
          c('a', '“Okay. Can I send one ‘going offline’ text first?”', 'calm', 3, 'voice', 'She pauses, then nods. “One message.” Respect got you something.'),
          c('b', '“This is so unfair! You never let me do anything!”', 'heated', 0, 'control', 'Now it’s about your attitude. The phone is gone until the weekend.'),
          c('c', 'Hand it over and storm to your room.', 'ghost', 1, 'control', 'You follow the rule, but the door slam costs you.'),
          c('d', '“Can my phone at least get a goodnight kiss first?”', 'humor', 2, 'voice', 'She almost laughs. “Give it here, goofball.” Tension down.'),
        ],
      },
      {
        prompt: 'Next morning at breakfast. Things feel tense.',
        promptByTone: {
          heated: 'Next morning at breakfast. Mom is still upset about last night.',
        },
        choices: [
          c('a', '“Sorry about last night. Could the cutoff be 11 on project nights?”', 'reactive', 3, 'voice', 'She says she’ll think about it, and appreciates you asking like that. Real negotiation unlocked.'),
          c('b', 'Give her the silent treatment.', 'ghost', 0, 'voice', 'The tension lasts all day. Nothing changes.'),
          c('c', '“Everyone else gets to stay up later.”', 'heated', 1, 'empathy', 'Classic line. Classic response: “You’re not everyone else.”'),
          c('d', 'Make her coffee as a peace offering.', 'calm', 2, 'empathy', 'She smiles. The mood resets, even if the rule doesn’t.'),
        ],
      },
    ],
    lesson: {
      skill: 'control',
      title: 'Negotiate when it’s calm',
      body: 'The moment a rule gets enforced is the worst time to argue it. Comply now, then bring it up later when everyone’s calm. Adults say yes way more often to a calm ask.',
      tryThis: '“Can we talk about changing this rule? Here’s why it matters to me.”',
    },
  },
  {
    id: 'home-2',
    world: 'home',
    title: 'Sibling Raid',
    hook: 'Your little brother used your stuff without asking. Again.',
    chaos: 2,
    mode: 'scene',
    place: 'Your room',
    lines: [
      { from: '', text: 'Your charger is gone. Your hoodie is gone. Your snacks are gone.' },
      { from: '', text: 'Your brother walks past, wearing your hoodie, eating your snacks.' },
      { from: 'Max', text: 'what' },
    ],
    beats: [
      {
        prompt: 'He’s standing right there. What’s your move?',
        choices: [
          c('a', '“Hey, that’s mine. Ask me first next time, okay?”', 'reactive', 3, 'boundaries', 'He rolls his eyes but says “fine.” Clear and short.'),
          c('b', 'Yell for a parent.', 'heated', 1, 'control', 'Mom yells at both of you for yelling.'),
          c('c', 'Sigh and let it go. Again.', 'ghost', 0, 'boundaries', 'He learns he can take anything. He will.'),
          c('d', '“Nice hoodie. Rental fee is one snack back.”', 'humor', 2, 'boundaries', 'He laughs and hands back the snack. No fight, but he’ll probably take it again tomorrow.'),
        ],
      },
      {
        prompt: 'Two days later, your charger is missing again.',
        choices: [
          c('a', 'Deal: “Text me before you borrow it. Take it without asking and you lose a week.”', 'reactive', 3, 'boundaries', 'He texts you next time. The system works.'),
          c('b', 'Take his stuff to get even.', 'heated', 0, 'control', 'Now it’s a war, and you’re both in trouble.'),
          c('c', 'Buy a second charger and hide it.', 'ghost', 1, 'voice', 'Solves the charger. Doesn’t solve the brother.'),
          c('d', 'Ask a parent to help set a house rule about borrowing.', 'calm', 2, 'voice', 'It takes a family conversation, but now everyone knows the rule.'),
        ],
      },
    ],
    lesson: {
      skill: 'boundaries',
      title: 'A boundary needs a consequence',
      body: 'Saying “don’t do that” is step one. When it keeps happening, a calm, specific consequence turns a request into a real boundary.',
      tryThis: '“If you ask, it’s fine. If you take it without asking, you can’t borrow it for a week.”',
    },
  },
  {
    id: 'home-3',
    world: 'home',
    title: 'Curfew Clash',
    hook: 'Everyone’s staying out until 11. Your curfew is 9.',
    chaos: 3,
    mode: 'scene',
    place: 'Living room',
    lines: [
      { from: '', text: 'There’s a birthday hangout Saturday. It goes until 11.' },
      { from: 'Dad', text: 'Curfew is 9. You know that.' },
    ],
    beats: [
      {
        prompt: 'You really want to go. What do you say?',
        choices: [
          c('a', '“Could I stay till 10:30 if I share my location?”', 'reactive', 3, 'voice', 'Dad thinks. “Who’s driving?” That’s not a no.'),
          c('b', '“You’re literally ruining my life.”', 'heated', 0, 'control', 'Dad: “Then it’s 8:30.”'),
          c('c', 'Say “okay” and plan to sneak out later.', 'ghost', 0, 'awareness', 'If you get caught, you lose way more than one party. Trust is hard to rebuild.'),
          c('d', '“What if I bring you back cake? Is cake a valid currency?”', 'humor', 2, 'voice', 'Dad smiles. “Cake helps. Tell me more about this party.”'),
        ],
      },
      {
        prompt: 'Dad asks: “Who’s going to be there, and how are you getting home?”',
        choices: [
          c('a', 'Answer honestly and offer to have him pick you up.', 'calm', 3, 'voice', 'He agrees to 10:30. Being transparent earned you an extra 90 minutes.'),
          c('b', '“Why do you need to know everything?”', 'heated', 0, 'empathy', 'He takes that as a sign something’s off. Curfew stays at 9.'),
          c('c', 'Give vague answers.', 'ghost', 1, 'voice', '“Then it’s 9.”'),
          c('d', 'Answer, and ask what would help him feel okay about it.', 'calm', 2, 'empathy', 'He says “just text me at 10.” Good, but you didn’t offer a ride plan, so he only moves it to 10.'),
        ],
      },
    ],
    lesson: {
      skill: 'empathy',
      title: 'Solve their worry',
      body: 'Most rules come from worry. If you understand what your parent is actually afraid of, you can offer a plan that solves it. That’s how you earn more freedom.',
      tryThis: '“What would help you feel okay about this?”',
    },
  },
  {
    id: 'home-4',
    world: 'home',
    title: 'The Report Card',
    hook: 'You got a D in math. Your parents don’t know yet.',
    chaos: 3,
    mode: 'scene',
    place: 'Dinner table',
    lines: [
      { from: '', text: 'The grade portal updates tonight. Your parents check it every week.' },
      { from: 'Mom', text: 'How’s school going?' },
    ],
    beats: [
      {
        prompt: 'This is your chance. What do you say?',
        choices: [
          c('a', '“Math’s not going great. I got a D. I want to fix it.”', 'reactive', 3, 'voice', 'Your parents are surprised, but they’re glad you told them first.'),
          c('b', '“Fine.”', 'ghost', 0, 'voice', 'They find out from the portal. Now it’s the grade AND the hiding.'),
          c('c', '“Why are you always checking on me?”', 'heated', 0, 'control', 'They get suspicious. Then they check the portal.'),
          c('d', '“Math and I are going through a rough patch. We’re in couples counseling.”', 'humor', 3, 'voice', 'They laugh, then ask what’s going on. You tell them. The joke made the hard part easier to say.'),
        ],
      },
      {
        prompt: 'Your dad sighs. “What happened?”',
        choices: [
          c('a', 'Explain what’s hard, and ask about getting a tutor or going to office hours.', 'calm', 2, 'awareness', 'They set up extra help, but still wonder why it got this far.'),
          c('b', 'Blame the teacher.', 'heated', 1, 'awareness', 'Maybe the teacher is tough, but your parents want to hear your part.'),
          c('c', '“I don’t know.”', 'ghost', 1, 'awareness', 'They push harder. The conversation drags on.'),
          c('d', 'Admit you stopped doing homework when it got confusing.', 'reactive', 3, 'awareness', 'Honesty. They respect it, and now they can actually help.'),
        ],
      },
    ],
    lesson: {
      skill: 'awareness',
      title: 'Tell it before it’s found',
      body: 'Bad news gets worse when someone else discovers it. Telling first, with a plan, turns you from “the kid hiding something” into “the kid handling something.”',
      tryThis: '“I need to tell you something, and I already have an idea to fix it.”',
    },
  },
  {
    id: 'home-5',
    world: 'home',
    title: 'Loud Walls',
    hook: 'Your parents are arguing again. You can hear it from your room.',
    chaos: 4,
    mode: 'scene',
    place: 'Your room, 9 PM',
    lines: [
      { from: '', text: 'Voices through the wall. It’s about money again.' },
      { from: '', text: 'Your little sister knocks on your door. She looks worried.' },
    ],
    beats: [
      {
        prompt: 'Your stomach is tight. What do you do first?',
        choices: [
          c('a', 'Let your sister in. Put on a show together and say “this is grown-up stuff, it’s not our fault.”', 'calm', 3, 'empathy', 'She leans on you and relaxes a little. So do you.'),
          c('b', 'Go out there and yell at them to stop.', 'heated', 1, 'control', 'They stop, but now everyone is upset, including you.'),
          c('c', 'Put your headphones on and ignore everything, including your sister.', 'ghost', 0, 'empathy', 'You block it out. She sits alone in the hall.'),
          c('d', 'Make your sister laugh with your worst impression of the dog.', 'humor', 3, 'empathy', 'She giggles and stops shaking. Making someone laugh in a scary moment is real comfort.'),
        ],
      },
      {
        prompt: 'The next day, you still feel heavy about it.',
        choices: [
          c('a', 'Tell one parent: “When you argue, it stresses me out. Is everything okay?”', 'reactive', 3, 'voice', 'Your mom hugs you and explains a little. She didn’t realize you could hear.'),
          c('b', 'Keep it all inside.', 'ghost', 1, 'awareness', 'It sits with you for days.'),
          c('c', 'Talk to the school counselor or another adult you trust.', 'calm', 3, 'boundaries', 'It helps to say it out loud to someone outside the house.'),
          c('d', 'Try to fix their problems yourself.', 'heated', 0, 'boundaries', 'You can’t. It’s not your job, and trying makes you more stressed.'),
        ],
      },
    ],
    sensitive: true,
    careNote: 'This one is about stress at home when parents argue.',
    lesson: {
      skill: 'boundaries',
      title: 'Not yours to fix',
      body: 'Adult problems aren’t your responsibility, even when they affect you. Your job is to take care of yourself and talk to someone you trust. If arguing at home ever turns into someone getting hurt or feeling unsafe, tell a trusted adult right away.',
      tryThis: '“This is stressing me out. Can I talk to you about it?”',
    },
  },
  {
    id: 'home-6',
    world: 'home',
    title: 'Chore Wars',
    hook: 'You did the dishes. Your dad thinks you didn’t.',
    chaos: 2,
    mode: 'scene',
    place: 'Kitchen',
    lines: [
      { from: 'Dad', text: 'Why are there dishes in the sink? You said you did them.' },
      { from: '', text: 'You did. Then your sister made a snack and left everything there.' },
    ],
    beats: [
      {
        prompt: 'He looks annoyed. What do you say?',
        choices: [
          c('a', '“I did them at 6. These are from after. I can help clean them though.”', 'calm', 3, 'voice', 'Dad nods. “Okay, thanks.” Facts plus a helpful offer.'),
          c('b', '“It wasn’t ME! Why do I always get blamed?”', 'heated', 0, 'control', 'Now it’s a whole thing. The dishes are still there.'),
          c('c', 'Just wash them and say nothing.', 'ghost', 1, 'voice', 'Peace kept. But next time, same thing.'),
          c('d', '“The dishes have been framed, Dad. I have an alibi.”', 'humor', 2, 'voice', 'He laughs. “Okay, detective.” But he still thinks you might be dodging, until you explain.'),
        ],
      },
      {
        prompt: 'Your sister walks in and says “wasn’t me.”',
        promptByChoice: {
          c: 'Next night, same thing. Your sister walks in and says “wasn’t me.”',
        },
        choices: [
          c('a', '“It’s okay, let’s just do them together real quick.”', 'calm', 3, 'empathy', 'She grumbles, but helps. Dad is impressed.'),
          c('b', '“You’re literally such a liar.”', 'heated', 0, 'control', 'Big fight. Everyone loses screen time.'),
          c('c', 'Leave it for Dad to figure out.', 'ghost', 1, 'voice', 'Dad sighs and does them himself.'),
          c('d', 'Suggest a chore chart so it’s clear who does what.', 'calm', 2, 'voice', 'Dad likes the idea, but nobody follows the chart after week one.'),
        ],
      },
    ],
    lesson: {
      skill: 'voice',
      title: 'Timeline, then teamwork',
      body: 'When you’re wrongly blamed, leading with “it’s not fair” starts a fight. Leading with the timeline and an offer to help ends one.',
      tryThis: '“Here’s what actually happened. Want me to help fix it?”',
    },
  },
];
